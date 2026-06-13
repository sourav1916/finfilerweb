import React, { useState, useRef, useEffect } from 'react';
import { User, Shield, Bell, CreditCard, Camera, Loader2, Monitor, MapPin, Clock, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { uploadFile, apiCall } from '../utils/apiCall';

// ── Helpers ────────────────────────────────────────────────────────────────

const parseUserAgent = (ua = '') => {
  const browser = ua.includes('Chrome') ? 'Chrome'
    : ua.includes('Firefox') ? 'Firefox'
    : ua.includes('Safari') ? 'Safari'
    : ua.includes('Edge') ? 'Edge'
    : 'Unknown Browser';

  const os = ua.includes('Windows NT') ? 'Windows'
    : ua.includes('Mac OS') ? 'macOS'
    : ua.includes('Linux') ? 'Linux'
    : ua.includes('Android') ? 'Android'
    : ua.includes('iPhone') || ua.includes('iPad') ? 'iOS'
    : 'Unknown OS';

  return { browser, os };
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
};

// ── Session Card ───────────────────────────────────────────────────────────

const SessionCard = ({ session, onRevoke }) => {
  const { browser, os } = parseUserAgent(session.user_agent);
  const [revoking, setRevoking] = useState(false);

  const handleRevoke = async () => {
    setRevoking(true);
    await onRevoke(session.id);
    setRevoking(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className={`relative flex items-start gap-4 p-4 rounded-xl border transition-colors
        ${session.is_current
          ? 'bg-indigo-500/10 border-indigo-500/30'
          : 'bg-secondary border-border hover:border-border/80'
        }`}
    >
      {/* Icon */}
      <div className={`mt-0.5 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
        ${session.is_current ? 'bg-indigo-500/20 text-indigo-400' : 'bg-primary text-secondary-foreground'}`}>
        <Monitor size={18} />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-primary-foreground text-sm">{browser} on {os}</span>
          {session.is_current && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Current session
            </span>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-secondary-foreground">
          <span className="flex items-center gap-1">
            <MapPin size={11} className="opacity-60" />
            {session.last_used_ip || session.create_ip}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} className="opacity-60" />
            Last active: {formatDate(session.last_used_date)}
          </span>
          <span className="flex items-center gap-1 opacity-60">
            Expires: {formatDate(session.expire_date)}
          </span>
        </div>
      </div>

      {/* Revoke */}
      {!session.is_current && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRevoke}
          disabled={revoking}
          title="Revoke session"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
            text-red-400 border border-red-500/20 bg-red-500/5
            hover:bg-red-500/15 hover:border-red-500/40
            disabled:opacity-50 transition-colors"
        >
          {revoking
            ? <Loader2 size={12} className="animate-spin" />
            : <Trash2 size={12} />
          }
          Revoke
        </motion.button>
      )}
    </motion.div>
  );
};

// ── Security Tab ───────────────────────────────────────────────────────────

const SecurityTab = () => {
  const toast = useToast();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiCall('/accounts/session/list', 'GET');
      const data = await res.json();
      if (data.success) {
        // Sort: current first
        const sorted = [...data.data.sessions].sort((a, b) => b.is_current - a.is_current);
        setSessions(sorted);
      } else {
        setError('Could not load sessions.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleRevoke = async (id) => {
    const toastId = toast.loading('Revoking session…');
    try {
      const res = await apiCall('/accounts/session/terminate', 'POST', { id });
      const data = await res.json();
      if (data.success) {
        setSessions(prev => prev.filter(s => s.id !== id));
        toast.update(toastId, 'success', 'Session terminated.');
      } else {
        toast.update(toastId, 'error', data.message || 'Could not terminate session.');
      }
    } catch {
      toast.update(toastId, 'error', 'Something went wrong.');
    }
  };

  const handleRevokeAll = async () => {
    const others = sessions.filter(s => !s.is_current);
    if (!others.length) return;
    const toastId = toast.loading('Terminating all other sessions…');
    try {
      await Promise.all(others.map(s =>
        apiCall('/accounts/session/terminate', 'POST', { id: s.id })
      ));
      setSessions(prev => prev.filter(s => s.is_current));
      toast.update(toastId, 'success', 'All other sessions terminated.');
    } catch {
      toast.update(toastId, 'error', 'Something went wrong.');
    }
  };

  const otherCount = sessions.filter(s => !s.is_current).length;

  return (
    <div className="bg-primary rounded-2xl shadow-soft border border-border p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-base font-semibold text-primary-foreground">Active Sessions</h3>
          <p className="text-xs text-secondary-foreground mt-0.5">
            Devices currently signed in to your account.
          </p>
        </div>

        {otherCount > 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRevokeAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
              text-red-400 border border-red-500/20 bg-red-500/5
              hover:bg-red-500/15 hover:border-red-500/40 transition-colors"
          >
            <Trash2 size={12} />
            Revoke all others
          </motion.button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-secondary-foreground">
          <Loader2 size={22} className="animate-spin text-indigo-400" />
          <span className="text-sm">Loading sessions…</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
          <button onClick={fetchSessions} className="ml-auto text-xs underline underline-offset-2 hover:no-underline">
            Retry
          </button>
        </div>
      ) : sessions.length === 0 ? (
        <p className="text-center text-secondary-foreground text-sm py-8">No active sessions found.</p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {sessions.map(session => (
              <SessionCard key={session.id} session={session} onRevoke={handleRevoke} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer note */}
      {!loading && !error && sessions.length > 0 && (
        <p className="text-xs text-secondary-foreground/60 pt-1">
          Sessions expire automatically after 7 days of inactivity.
        </p>
      )}
    </div>
  );
};

// ── Main Profile Page ──────────────────────────────────────────────────────

const TABS = [
  { id: 'general', label: 'General Info', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const Profile = () => {
  const { user, login } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('general');

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [middleName, setMiddleName] = useState(user?.middle_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [imageUrl, setImageUrl] = useState(user?.image || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.image || '');

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setAvatarPreview(localPreview);
    setUploadingPhoto(true);
    const toastId = toast.loading('Uploading photo…');
    try {
      const url = await uploadFile(file);
      setImageUrl(url);
      setAvatarPreview(url);
      toast.update(toastId, 'success', 'Photo uploaded!');
    } catch {
      toast.update(toastId, 'error', 'Photo upload failed. Please try again.');
      setAvatarPreview(user?.image || '');
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!firstName.trim()) { toast.error('First name is required.'); return; }
    setSaving(true);
    const toastId = toast.loading('Saving changes…');
    try {
      const response = await apiCall('/accounts/profile/update', 'POST', {
        first_name: firstName.trim(),
        middle_name: middleName.trim(),
        last_name: lastName.trim(),
        image: imageUrl,
      });
      const result = await response.json();
      if (result.success) {
        login({ ...user, first_name: firstName.trim(), middle_name: middleName.trim(), last_name: lastName.trim(), image: imageUrl });
        toast.update(toastId, 'success', 'Profile updated successfully!');
      } else {
        toast.update(toastId, 'error', result.message || 'Update failed.');
      }
    } catch {
      toast.update(toastId, 'error', 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.first_name || '');
    setMiddleName(user?.middle_name || '');
    setLastName(user?.last_name || '');
    setImageUrl(user?.image || '');
    setAvatarPreview(user?.image || '');
  };

  return (
    <div className="mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-foreground">Profile Settings</h1>
        <p className="text-secondary-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Sidebar ── */}
        <div className="col-span-1 space-y-2">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors
                  ${active
                    ? 'bg-primary shadow-soft text-primary-foreground border border-indigo-500/20'
                    : 'hover:bg-secondary text-secondary-foreground'
                  }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-indigo-500' : ''}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Main content ── */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary rounded-2xl shadow-soft border border-border p-6">
                  {/* Avatar row */}
                  <div className="flex items-center space-x-4 mb-6">
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    <div className="relative group">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Profile" className="w-20 h-20 rounded-2xl shadow-lg object-cover" />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white text-3xl font-bold uppercase">
                          {firstName ? firstName.charAt(0) : 'U'}
                        </div>
                      )}
                      <motion.button
                        whileHover={{ opacity: 1 }}
                        onClick={handlePhotoClick}
                        disabled={uploadingPhoto}
                        className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        {uploadingPhoto ? <Loader2 size={20} className="text-white animate-spin" /> : <Camera size={20} className="text-white" />}
                      </motion.button>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold capitalize text-primary-foreground">{firstName} {lastName}</h2>
                      <p className="text-secondary-foreground text-sm capitalize">{user?.user_type || 'User'}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={handlePhotoClick} disabled={uploadingPhoto}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                    >
                      {uploadingPhoto ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : <><Camera size={14} /> Change Photo</>}
                    </motion.button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'First Name', value: firstName, setter: setFirstName, placeholder: 'First name' },
                        { label: 'Middle Name', value: middleName, setter: setMiddleName, placeholder: 'Middle name' },
                        { label: 'Last Name', value: lastName, setter: setLastName, placeholder: 'Last name' },
                      ].map(({ label, value, setter, placeholder }) => (
                        <div key={label}>
                          <label className="block text-sm font-medium text-secondary-foreground mb-1">{label}</label>
                          <input
                            type="text" value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-primary-foreground transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-1">Email Address</label>
                      <input type="email" defaultValue={user?.email || ''} readOnly className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-secondary-foreground cursor-not-allowed opacity-70" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-foreground mb-1">Phone Number</label>
                      <input type="tel" defaultValue={user?.mobile || ''} readOnly className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-secondary-foreground cursor-not-allowed opacity-70" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-border flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleCancel} disabled={saving}
                      className="px-5 py-2.5 bg-secondary border border-border text-primary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-60"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSave} disabled={saving || uploadingPhoto}
                      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-glow transition-all disabled:opacity-60"
                    >
                      {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : 'Save Changes'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <SecurityTab />
              </motion.div>
            )}

            {(activeTab === 'notifications' || activeTab === 'billing') && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary rounded-2xl shadow-soft border border-border p-6 flex flex-col items-center justify-center py-16 text-secondary-foreground gap-2">
                  <span className="text-4xl">🚧</span>
                  <p className="font-medium text-primary-foreground capitalize">{activeTab} settings</p>
                  <p className="text-sm">Coming soon.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;