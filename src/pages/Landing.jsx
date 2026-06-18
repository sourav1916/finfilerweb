import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, TrendingUp, Star, Sparkles, LayoutDashboard, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

const featureStyles = {
  indigo: {
    card: 'border-indigo-200/70 bg-gradient-to-br from-indigo-500/10 to-secondary dark:border-indigo-900/50',
    icon: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
  },
  purple: {
    card: 'border-purple-200/70 bg-gradient-to-br from-purple-500/10 to-secondary dark:border-purple-900/50',
    icon: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  },
  blue: {
    card: 'border-blue-200/70 bg-gradient-to-br from-blue-500/10 to-secondary dark:border-blue-900/50',
    icon: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  },
}

const features = [
  {
    icon: ShieldCheck,
    title: 'Bank-level Security',
    desc: 'Your tax data is protected with 256-bit AES encryption. We are IRS compliant and SOC 2 certified.',
    color: 'indigo',
  },
  {
    icon: TrendingUp,
    title: 'Maximize Your Refund',
    desc: 'Our expert CPAs and AI-powered engine find every deduction you qualify for — guaranteed.',
    color: 'purple',
  },
  {
    icon: Clock,
    title: 'File in 15 Minutes',
    desc: 'Streamlined document upload and automated form filling gets your return filed in record time.',
    color: 'blue',
  },
]

const stats = [
  { value: '$4,250', label: 'Avg. Refund per Client' },
  { value: '98.4%', label: 'Accuracy Rate' },
  { value: '50K+', label: 'Happy Clients' },
  { value: '15 min', label: 'Avg. Filing Time' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } }
}

export default function Landing() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="bg-primary overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed w-full top-0 z-50 border-b border-border bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <ShieldCheck size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary-foreground">
              fin<span className="text-indigo-600 font-light dark:text-indigo-400">filer</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-secondary-foreground">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</a>
            <a href="#how" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">How It Works</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-secondary-foreground transition hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <Link to="/home" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-200 dark:shadow-none transition hover:bg-indigo-700">
                <LayoutDashboard size={15} /> Go to Home
              </Link>
            ) : (
              <>
                <Link to="/login" className="rounded-xl border border-border px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground transition hover:bg-secondary">
                  Log in
                </Link>
                <Link to="/register" className="rounded-xl bg-indigo-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-200 dark:shadow-none transition hover:bg-indigo-700">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-950/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100 dark:bg-purple-950/30 rounded-full blur-[80px] opacity-50 pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles size={13} /> Trusted by 50,000+ taxpayers
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
            File your taxes <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              smarter & faster.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mx-auto mt-5 sm:mt-6 max-w-2xl text-base sm:text-xl text-secondary-foreground">
            Expert CPAs, bank-level security, and a 15-minute filing process. Maximize your refund — guaranteed.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {user ? (
              <Link to="/home">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-indigo-300/40 transition hover:bg-indigo-700">
                  <LayoutDashboard size={20} /> Go to Home
                </motion.span>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-indigo-300/40 transition hover:bg-indigo-700">
                    Start Filing Free <ArrowRight size={18} />
                  </motion.span>
                </Link>
                <Link to="/login">
                  <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-border bg-secondary px-7 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary">
                    Sign In
                  </motion.span>
                </Link>
              </>
            )}
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-secondary-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> IRS Authorized E-filer</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> 256-bit Encryption</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> No Hidden Fees</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> Audit Support Included</span>
          </motion.div>
        </motion.div>

        {/* Hero Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, type: 'spring', stiffness: 180 }}
          className="relative z-10 mx-auto mt-14 sm:mt-20 max-w-4xl"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-border bg-secondary p-4 sm:p-6 shadow-2xl shadow-slate-200/60 dark:shadow-none">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary to-primary p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-primary border border-border p-3 sm:p-4 shadow-sm text-center">
                    <p className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                    <p className="text-xs text-secondary-foreground mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
                <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">Federal Return Accepted</p>
                  <p className="text-xs text-secondary-foreground">Estimated refund of <span className="font-bold text-emerald-600 dark:text-emerald-400">$4,250</span> arriving in 3–5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-border bg-secondary py-8 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                <p className="text-xs sm:text-sm text-secondary-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-900 dark:text-indigo-300">Why finfiler</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">Everything you need to file with confidence</h2>
            <p className="mt-3 text-secondary-foreground max-w-xl mx-auto text-sm sm:text-base">No jargon, no surprises. Just expert guidance and a seamless experience from start to refund.</p>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 sm:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon
              const styles = featureStyles[f.color] || featureStyles.indigo
              return (
                <motion.div key={f.title} variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className={`rounded-2xl sm:rounded-3xl border p-6 sm:p-8 shadow-soft ${styles.card}`}>
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="bg-secondary py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-purple-50 border border-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/50 dark:border-purple-900 dark:text-purple-300">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">File in 3 simple steps</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds. Securely link your financial accounts and upload your documents.' },
              { step: '02', title: 'Connect with a CPA', desc: 'Our certified tax professionals review your documents and identify every deduction.' },
              { step: '03', title: 'Get Your Refund', desc: 'We e-file directly with the IRS. Track your status in real time and get your refund fast.' },
            ].map((item) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none">
                  {item.step}
                </div>
                <h3 className="font-bold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-secondary-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-amber-400 fill-amber-400" />)}
          </div>
          <blockquote className="text-xl sm:text-2xl font-semibold text-primary-foreground leading-snug mb-6">
            "finfiler got me a $3,800 refund I never knew I was owed. The process was shockingly easy. My CPA found deductions my old accountant missed for years."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">M</div>
            <div className="text-left">
              <p className="text-sm font-semibold text-primary-foreground">Maya Krishnan</p>
              <p className="text-xs text-secondary-foreground">Freelance Designer, Chicago</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 sm:px-16 py-12 sm:py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Ready to maximize your refund?</h2>
          <p className="text-indigo-100 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Join 50,000+ taxpayers who trust finfiler. Set up in under 2 minutes. No credit card required.
          </p>
          <Link to="/register">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-lg transition hover:shadow-xl">
              Get Started Free <ArrowRight size={18} />
            </motion.span>
          </Link>
          <p className="mt-4 text-xs text-indigo-200">No hidden fees · IRS authorized · Cancel anytime</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <ShieldCheck size={15} />
            </div>
            <span className="font-bold text-primary-foreground">Fin<span className="text-indigo-600 font-light dark:text-indigo-400">Filer</span></span>
          </div>
          <p className="text-xs text-secondary-foreground">© 2025 finfiler. All rights reserved. IRS Authorized E-file Provider.</p>
          <div className="flex gap-5 text-xs text-secondary-foreground">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</Link>
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms</Link>
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
