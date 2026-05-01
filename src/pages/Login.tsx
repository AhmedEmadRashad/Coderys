import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username)) {
      navigate('/app');
    } else {
      setError('Username must be at least 2 characters long.');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors z-20">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Coderys Logo" className="w-20 h-20 rounded-2xl shadow-xl shadow-indigo-500/20" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          Welcome to Coderys
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Choose your developer handle to get started
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-zinc-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-zinc-800 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
                Developer Username
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-xl bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                  placeholder="e.g. shadowcoder99"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors"
              >
                Enter Workspace
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
