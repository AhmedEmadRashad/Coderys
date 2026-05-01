import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Github, Bot, LayoutDashboard, ChevronRight } from 'lucide-react';
import { Hero3D } from '../components/Hero3D';

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'Centralized Workspace',
    description: 'Manage projects, tasks, and snippets in one beautiful, dark-themed dashboard designed for focus.'
  },
  {
    icon: Bot,
    title: 'AI Code Generator',
    description: 'Your personal pair programmer. Generate boilerplate, scripts, and components instantly.'
  },
  {
    icon: Github,
    title: 'Open Source Discovery',
    description: 'Search and explore the vast GitHub ecosystem directly from your command center.'
  },
  {
    icon: Terminal,
    title: 'Terminal Mastery',
    description: 'A built-in cheat sheet for Git, Docker, and Linux commands with one-click copy.'
  }
];

export function Landing() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Coderys Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-xl font-bold text-white tracking-tight">Coderys</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/login" className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 relative">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-indigo-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Coderys v2.0 is now live
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              The Ultimate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Developer Workspace
              </span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Stop context switching. Coderys brings your projects, tasks, AI assistance, terminal commands, and developer communities into one blazing-fast, beautiful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
              >
                Enter Workspace <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl font-medium flex items-center justify-center transition-colors"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            {/* 3D Canvas Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
              <Hero3D />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-zinc-500 font-medium tracking-widest uppercase">
                Drag to Interact
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0c0c0e] border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Built for maximum productivity</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Everything you need to write better code, faster. Integrated seamlessly into a single environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <img src="/logo.png" alt="Coderys" className="w-16 h-16 rounded-2xl mx-auto mb-8 shadow-2xl shadow-indigo-500/20" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to level up your workflow?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join developers who are building faster with Coderys.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Get Started for Free <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
