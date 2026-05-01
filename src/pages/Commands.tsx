import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Search, ChevronRight } from 'lucide-react';

const COMMAND_CATEGORIES = [
  {
    category: 'Git',
    icon: '📦',
    commands: [
      { cmd: 'git init', desc: 'Initialize a new Git repository' },
      { cmd: 'git clone <url>', desc: 'Clone a repository into a new directory' },
      { cmd: 'git add .', desc: 'Add all current changes to the next commit' },
      { cmd: 'git commit -m "msg"', desc: 'Commit your staged changes' },
      { cmd: 'git push origin main', desc: 'Push commits to remote main branch' },
      { cmd: 'git pull', desc: 'Fetch and merge changes on the remote server' },
      { cmd: 'git stash', desc: 'Temporarily store modified, tracked files' },
      { cmd: 'git log --oneline', desc: 'View a compact commit history' },
    ]
  },
  {
    category: 'Docker',
    icon: '🐳',
    commands: [
      { cmd: 'docker build -t <name> .', desc: 'Build an image from a Dockerfile' },
      { cmd: 'docker run -p 8080:80 <image>', desc: 'Run a container from an image' },
      { cmd: 'docker ps', desc: 'List running containers' },
      { cmd: 'docker ps -a', desc: 'List all containers (running and stopped)' },
      { cmd: 'docker stop <id>', desc: 'Stop a running container' },
      { cmd: 'docker rm <id>', desc: 'Remove a stopped container' },
      { cmd: 'docker rmi <image>', desc: 'Remove an image' },
      { cmd: 'docker-compose up -d', desc: 'Start services in the background' },
    ]
  },
  {
    category: 'NPM / Node.js',
    icon: '🟢',
    commands: [
      { cmd: 'npm init -y', desc: 'Initialize a new package.json with defaults' },
      { cmd: 'npm install <pkg>', desc: 'Install a package and add to dependencies' },
      { cmd: 'npm install -D <pkg>', desc: 'Install a package as a devDependency' },
      { cmd: 'npm run <script>', desc: 'Run a script defined in package.json' },
      { cmd: 'npm update', desc: 'Update all packages to latest allowed versions' },
      { cmd: 'npx create-react-app <name>', desc: 'Scaffold a new React application' },
    ]
  },
  {
    category: 'Linux / Bash',
    icon: '🐧',
    commands: [
      { cmd: 'ls -la', desc: 'List files in detailed format including hidden' },
      { cmd: 'cd /path/to/dir', desc: 'Change directory' },
      { cmd: 'mkdir -p dir1/dir2', desc: 'Create nested directories' },
      { cmd: 'rm -rf <dir>', desc: 'Force remove a directory and its contents' },
      { cmd: 'grep -r "text" .', desc: 'Search for text recursively in current dir' },
      { cmd: 'chmod +x script.sh', desc: 'Make a file executable' },
      { cmd: 'tar -czvf arc.tar.gz dir', desc: 'Compress a directory' },
    ]
  }
];

export function Commands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredCategories = COMMAND_CATEGORIES.map(cat => ({
    ...cat,
    commands: cat.commands.filter(c => 
      c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.commands.length > 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-indigo-400" />
            Terminal Cheat Sheet
          </h1>
          <p className="text-zinc-400">Essential CLI commands for every developer.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search commands..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredCategories.map((cat, i) => (
          <motion.div 
            key={cat.category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>{cat.icon}</span> {cat.category}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cat.commands.map((cmd) => (
                <div key={cmd.cmd} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                  <div className="min-w-0 pr-4">
                    <div className="font-mono text-sm text-indigo-400 mb-1 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-zinc-600" />
                      <span className="truncate">{cmd.cmd}</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">{cmd.desc}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(cmd.cmd)}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedCmd === cmd.cmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            No commands found matching "{searchQuery}"
          </div>
        )}
      </div>
    </motion.div>
  );
}
