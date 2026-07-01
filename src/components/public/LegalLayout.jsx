import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function LegalLayout({ title, description, children, lastUpdated }) {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-24">
      <SEO title={`${title} | FinFiler`} description={description} />
      
      {/* Header */}
      <section className="bg-white pt-32 pb-16 border-b border-slate-200 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
         
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 font-semibold transition-colors">
             <ArrowLeft size={18} /> Back to Home
           </Link>
           
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={32} />
             </div>
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{title}</h1>
             <p className="text-lg text-slate-500">Last updated: {lastUpdated}</p>
           </motion.div>
         </div>
      </section>

      {/* Content */}
      <section className="pt-16">
         <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600">
               {children}
            </motion.div>
         </div>
      </section>
    </div>
  );
}
