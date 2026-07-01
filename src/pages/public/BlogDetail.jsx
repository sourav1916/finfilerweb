import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../../components/public/SEO';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

export default function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBlog({
        blog_id: blogId || '1',
        title: 'Major GST Updates for 2024',
        cover_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
        createdAt: new Date().toISOString(),
        category: { name: 'Tax' },
        meta_description: 'Discover the latest GST updates and how they impact your small business this year.',
        content: '<p>The Goods and Services Tax (GST) council has recently introduced several major updates for the fiscal year 2024. These changes aim to simplify compliance for small businesses while closing loopholes for tax evasion.</p><h2>Key Highlights</h2><ul><li>Threshold limits for e-invoicing have been revised.</li><li>New forms for annual returns are now available.</li><li>Stricter penalties for late filing are being enforced.</li></ul><p>It is crucial for business owners to stay updated and ensure their accounting systems are ready for these changes. Failure to comply can result in significant financial penalties.</p>'
      });
      setLoading(false);
    }, 500);
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
         <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <Link to="/blog" className="text-emerald-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 relative">
      <SEO title={`${blog.title} | FinFiler`} description={blog.meta_description} />
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

      <article className="pt-32 pb-24">
        {/* HEADER */}
        <header className="max-w-4xl mx-auto px-6 text-center mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 font-semibold transition-colors">
            <ArrowLeft size={18} /> Back to insights
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-6">
              {blog.category?.name || 'Compliance Guide'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-slate-500 font-medium">
               <span className="flex items-center gap-2"><User size={18} /> FinFiler Editorial</span>
               <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </header>

        {/* COVER IMAGE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-5xl mx-auto px-6 mb-16">
           <div className="w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
             <img src={blog.cover_image || `https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200`} alt={blog.title} className="w-full h-full object-cover" />
           </div>
        </motion.div>

        {/* CONTENT */}
        <div className="max-w-3xl mx-auto px-6 relative">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg prose-slate prose-emerald max-w-none">
             {blog.content ? (
               <div dangerouslySetInnerHTML={{ __html: blog.content }} />
             ) : (
               <p className="text-slate-500 italic text-center">Content is being updated.</p>
             )}
           </motion.div>

           {/* SHARE BUTTON */}
           <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-900 font-bold">Share this article</span>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <Share2 size={18} />
              </button>
           </div>
        </div>
      </article>
    </div>
  );
}