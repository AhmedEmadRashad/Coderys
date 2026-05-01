import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Search, Star, GitFork, BookOpen, AlertCircle } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  open_issues_count: number;
}

export function GithubSearch() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const searchRepos = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=12`);
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      setRepos(data.items || []);
    } catch (err) {
      setError('An error occurred while searching GitHub.');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Github className="w-6 h-6 text-indigo-400" />
            GitHub Explorer
          </h1>
          <p className="text-zinc-400">Search and discover open-source repositories.</p>
        </div>
      </div>

      <form onSubmit={searchRepos} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories (e.g., 'react', 'machine learning')..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <button 
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-8 custom-scrollbar">
        {!loading && hasSearched && repos.length === 0 && !error && (
          <div className="text-center py-12 text-zinc-500">No repositories found for "{query}".</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex flex-col group"
            >
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5" />
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors break-words line-clamp-2">
                  {repo.full_name}
                </h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 flex-1 line-clamp-3">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-500 pt-4 border-t border-zinc-800/50 mt-auto">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {repo.stargazers_count.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {repo.forks_count.toLocaleString()}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
