import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, ShieldCheck, Clock, CheckCircle2, Phone, AtSign, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { apiCall } from '../utils/apiCall'
import { useToast } from '../contexts/ToastContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export default function Register() {
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const float1 = { animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } }
  const float2 = { animate: { y: [0, 12, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } } }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const showToast = (message, type = 'error') => {
    if (type === 'error') {
      toast.error(message)
    } else {
      toast.success(message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side validation
    if (!form.first_name.trim() || !form.last_name.trim()) {
      return showToast('First name and last name are required.')
    }
    if (!form.username.trim()) return showToast('Username is required.')
    if (!form.email.trim()) return showToast('Email address is required.')
    if (!form.password) return showToast('Password is required.')
    if (form.password.length < 6) return showToast('Password must be at least 6 characters.')

    setLoading(true)

    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        ...(form.middle_name.trim() && { middle_name: form.middle_name.trim() }),
        ...(form.mobile.trim() && { mobile: form.mobile.trim() }),
      }

      const response = await apiCall('/auth/register', 'POST', payload)

      if (response.status === 201) {
        showToast('Account created successfully! Redirecting to login…', 'success')
        setTimeout(() => navigate('/login'), 1800)
      } else if (response.status === 409) {
        showToast('Username or email already exists. Please try different credentials.')
      } else {
        let errMsg = 'Registration failed. Please try again.'
        try {
          const data = await response.json()
          if (data?.detail || data?.message) errMsg = data.detail || data.message
        } catch (_) {}
        showToast(errMsg)
      }
    } catch (err) {
      console.error('Register error:', err)
      showToast('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Left: Visual Panel ── */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" />

        <div className="relative z-10 w-full max-w-sm px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Fast &amp; Secure Filing</h2>
            <p className="text-indigo-200 text-sm">Join thousands organizing their tax life effortlessly.</p>
          </motion.div>

          <div className="space-y-4">
            <motion.div variants={float1} animate="animate"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Bank-level Security</p>
                  <p className="text-xs text-indigo-200">256-bit AES encryption</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={float2} animate="animate"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-indigo-300" />
                <p className="text-sm text-indigo-100">Average filing time</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-white">15</p>
                <p className="text-indigo-200 mb-1 text-sm">mins</p>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <p className="text-xs text-emerald-400 font-medium">100% Accuracy Guarantee</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center overflow-y-auto px-5 sm:px-10 lg:px-12 xl:px-16 bg-white flex-shrink-0">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-sm mx-auto py-8">

          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-5">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                fin<span className="text-indigo-600 font-light">filer</span>
              </span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Get Started</h1>
            <p className="mt-1 text-sm text-slate-500">Create an account to connect with top tax consultants.</p>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} className="space-y-3" onSubmit={handleSubmit} noValidate>

            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                  <User size={14} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                  <User size={14} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Middle Name (optional) */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Middle Name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                <User size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  name="middle_name"
                  value={form.middle_name}
                  onChange={handleChange}
                  placeholder="M"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                <AtSign size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="janedoe123"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                <Mail size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Mobile (optional) */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Mobile <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                <Phone size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                <Lock size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account…
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-slate-400">
              By registering, you agree to our{' '}
              <span className="text-indigo-600 cursor-pointer hover:underline">Terms</span> and{' '}
              <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </motion.form>

          <motion.p variants={itemVariants} className="mt-5 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Log in here</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
