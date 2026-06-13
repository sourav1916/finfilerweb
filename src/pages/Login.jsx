import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Lock, ArrowRight, ShieldCheck, FileText, CheckCircle2,
  Loader2, AlertCircle, X, Phone, RotateCcw, ChevronLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiCall } from '../utils/apiCall'

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.18 } })
}

/* ─── Toast ─── */
function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${
        type === 'error'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {type === 'error'
        ? <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
        : <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100"><X size={14} /></button>
    </motion.div>
  )
}

/* ─── OTP Input (6 boxes) ─── */
function OtpInput({ value, onChange }) {
  const digits = value.split('')
  const refs = useRef([])

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        const next = [...digits]
        next[i] = ''
        onChange(next.join(''))
      } else if (i > 0) {
        refs.current[i - 1]?.focus()
        const next = [...digits]
        next[i - 1] = ''
        onChange(next.join(''))
      }
    }
  }

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = val
    onChange(next.join(''))
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted.padEnd(6, '').slice(0, 6))
    refs.current[Math.min(pasted.length, 5)]?.focus()
    e.preventDefault()
  }

  return (
    <div className="flex gap-2 justify-between">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      ))}
    </div>
  )
}

/* ─── Main Component ─── */
export default function Login() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)        // 1 = send OTP, 2 = verify OTP
  const [direction, setDirection] = useState(1)

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  // Resend OTP countdown
  const [resendTimer, setResendTimer] = useState(0)
  const timerRef = useRef(null)

  const float1 = { animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } }
  const float2 = { animate: { y: [0, 12, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } } }

  const showToast = (message, type = 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  const startResendTimer = (seconds = 30) => {
    setResendTimer(seconds)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0 }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  /* Step 1 — Send OTP */
  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!mobile.trim()) return showToast('Mobile number is required.')
    if (!password) return showToast('Password is required.')

    setLoading(true)
    setToast(null)
    try {
      const res = await apiCall('/auth/login-send-otp', 'POST', {
        mobile: mobile.trim(),
        password,
      })

      if (res.status === 200) {
        setDirection(1)
        setStep(2)
        startResendTimer(30)
        showToast('OTP sent to your mobile number.', 'success')
      } else if (res.status === 401) {
        showToast('Invalid credentials. Please check your mobile and password.')
      } else {
        let msg = 'Something went wrong. Please try again.'
        try { const d = await res.json(); if (d?.detail || d?.message) msg = d.detail || d.message } catch (_) {}
        showToast(msg)
      }
    } catch {
      showToast('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  /* Step 2 — Verify OTP */
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp.replace(/\D/g, '').length < 6) return showToast('Please enter the complete 6-digit OTP.')

    setLoading(true)
    setToast(null)
    try {
      const res = await apiCall('/auth/login-verify-otp', 'POST', {
        mobile: mobile.trim(),
        password,
        otp: otp.trim(),
      })

      if (res.status === 200) {
        // Try to read token from response body or headers
        let token = res.headers.get('token') || res.headers.get('x-token')
        try {
          const data = await res.json()
          if (data?.token) token = data.token
          if (data?.username) localStorage.setItem('username', data.username)
        } catch (_) {}

        if (token) localStorage.setItem('token', token)
        localStorage.setItem('mobile', mobile.trim())

        showToast('Login successful! Redirecting…', 'success')
        setTimeout(() => navigate('/home'), 1500)
      } else if (res.status === 401) {
        showToast('Invalid credentials or OTP. Please try again.')
      } else {
        let msg = 'Verification failed. Please try again.'
        try { const d = await res.json(); if (d?.detail || d?.message) msg = d.detail || d.message } catch (_) {}
        showToast(msg)
      }
    } catch {
      showToast('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  /* Resend OTP */
  const handleResend = async () => {
    if (resendTimer > 0) return
    setLoading(true)
    setToast(null)
    try {
      const res = await apiCall('/auth/login-send-otp', 'POST', { mobile: mobile.trim(), password })
      if (res.status === 200) {
        setOtp('')
        startResendTimer(30)
        showToast('OTP resent to your mobile number.', 'success')
      } else {
        showToast('Failed to resend OTP. Please try again.')
      }
    } catch {
      showToast('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    setDirection(-1)
    setStep(1)
    setOtp('')
    setToast(null)
    clearInterval(timerRef.current)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Left: Visual Panel ── */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob" />

        <div className="relative z-10 w-full max-w-sm px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Expert Tax Solutions</h2>
            <p className="text-indigo-200 text-sm">Maximize your returns with dedicated professionals.</p>
          </motion.div>

          <div className="space-y-4">
            <motion.div variants={float1} animate="animate"
              className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-400">Status</p>
                  <p className="text-white font-bold text-sm">Return Accepted</p>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 w-full rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-indigo-200 text-right mt-1">100% Completed</p>
            </motion.div>

            <motion.div variants={float2} animate="animate"
              className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-indigo-300">Est. Refund</p>
                  <p className="text-2xl font-bold text-white">$4,250</p>
                </div>
              </div>
              <p className="text-xs text-indigo-200 border-t border-white/10 pt-2 mt-3">
                Based on your uploaded W-2s and deductions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center overflow-y-auto px-5 sm:px-10 lg:px-12 xl:px-16 bg-white flex-shrink-0">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-sm mx-auto">

          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-6">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                fin<span className="text-indigo-600 font-light">filer</span>
              </span>
            </Link>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 ? (
                <motion.div key="step1-heading" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                  <p className="mt-1 text-sm text-slate-500">Enter your mobile and password to receive an OTP.</p>
                </motion.div>
              ) : (
                <motion.div key="step2-heading" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Verify OTP</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the 6-digit code sent to{' '}
                    <span className="font-semibold text-slate-700">{mobile}</span>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4"
              >
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Step 1: Credentials ── */}
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.form
                key="step1-form"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3"
                onSubmit={handleSendOtp}
                noValidate
              >
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                    <Phone size={16} className="text-slate-400 flex-shrink-0" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300">
                    <Lock size={16} className="text-slate-400 flex-shrink-0" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending OTP…</>
                  ) : (
                    <>Send OTP <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* ── Step 2: OTP Verification ── */}
            {step === 2 && (
              <motion.form
                key="step2-form"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
                onSubmit={handleVerifyOtp}
                noValidate
              >
                <div>
                  <label className="mb-3 block text-xs font-semibold text-slate-700">Enter 6-digit OTP</label>
                  <OtpInput value={otp} onChange={setOtp} />
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Verifying…</>
                  ) : (
                    <>Verify &amp; Sign In <ArrowRight size={16} /></>
                  )}
                </motion.button>

                {/* Resend & Back */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <ChevronLeft size={14} /> Change number
                  </button>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendTimer > 0 || loading}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <RotateCcw size={12} />
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.p variants={itemVariants} className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:underline">Create account</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
