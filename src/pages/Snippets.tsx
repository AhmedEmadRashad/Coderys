import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, Search, Plus, Terminal } from 'lucide-react';

const SNIPPETS = [
  {
    id: 1,
    title: 'useDebounce Hook',
    description: 'A custom React hook for debouncing fast-changing values like search inputs.',
    language: 'TypeScript',
    tags: ['react', 'hooks', 'typescript'],
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: 2,
    title: 'Tailwind Glassmorphism',
    description: 'Utility classes for a clean, modern glassmorphism effect.',
    language: 'CSS',
    tags: ['tailwind', 'css', 'ui'],
    code: `.glass-panel {
  @apply bg-white/10 backdrop-blur-md border border-white/20 shadow-xl;
}

.glass-panel-dark {
  @apply bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl;
}`
  },
  {
    id: 3,
    title: 'Fetch Wrapper with Auth',
    description: 'A wrapper around native fetch that automatically handles JWT tokens and retries.',
    language: 'JavaScript',
    tags: ['api', 'fetch', 'auth'],
    code: `async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('jwt_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': \`Bearer \${token}\` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    // Handle token refresh or logout
    window.location.href = '/login';
  }
  
  return response.json();
}`
  },
  {
    id: 4,
    title: 'Docker Node.js Setup',
    description: 'Optimized multi-stage Dockerfile for Node.js production apps.',
    language: 'Dockerfile',
    tags: ['docker', 'devops', 'node'],
    code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]`
  }
];

export function Snippets() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSnippets = SNIPPETS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-400" />
            Snippets
          </h1>
          <p className="text-zinc-400">Your personal library of reusable code blocks.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search snippets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            New Snippet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => (
          <motion.div 
            key={snippet.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-zinc-800/50 bg-zinc-900/50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  {snippet.title}
                </h3>
                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md border border-zinc-700">
                  {snippet.language}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-4">{snippet.description}</p>
              <div className="flex gap-2">
                {snippet.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative group flex-1 bg-[#0d0d0f]">
              <button 
                onClick={() => handleCopy(snippet.id, snippet.code)}
                className="absolute top-3 right-3 p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-all z-10 border border-zinc-700"
                title="Copy code"
              >
                {copiedId === snippet.id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <pre className="p-5 text-sm font-mono text-zinc-300 overflow-x-auto h-full m-0 custom-scrollbar">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
