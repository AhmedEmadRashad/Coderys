import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  CheckSquare, 
  Code2, 
  Settings, 
  LogOut,
  Github,
  MessageSquare,
  Terminal,
  Gamepad2,
  Bot,
  BarChart2,
  Sun,
  Moon,
  Search,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'Projects', path: '/app/projects', icon: FolderGit2 },
  { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
  { name: 'Snippets', path: '/app/snippets', icon: Code2 },
  { name: 'GitHub Search', path: '/app/github', icon: Github },
  { name: 'Terminal Commands', path: '/app/commands', icon: Terminal },
  { name: 'AI Code Gen', path: '/app/ai-guide', icon: Bot },
  { name: 'Communities', path: '/app/communities', icon: MessageSquare },
  { name: 'Analytics', path: '/app/analytics', icon: BarChart2 },
  { name: 'Gaming Lounge', path: '/app/games', icon: Gamepad2 },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#0d1117] text-zinc-900 dark:text-[#c9d1d9] font-sans overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-[#30363d] bg-zinc-50 dark:bg-[#010409] flex flex-col transition-colors duration-200">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-[#30363d]">
          <Link to="/app" className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            <img src="/logo.png" alt="Coderys" className="w-8 h-8 rounded-lg object-cover" />
            Coderys
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/app' && location.pathname === '/app/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${
                  isActive 
                    ? 'text-zinc-900 bg-zinc-200/50 dark:text-white dark:bg-[#21262d]' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-[#8b949e] dark:hover:text-[#c9d1d9] dark:hover:bg-[#21262d]/50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-[#0969da] dark:bg-[#58a6ff] rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0969da] dark:text-[#58a6ff]' : 'text-zinc-400 dark:text-[#8b949e] group-hover:text-zinc-600 dark:group-hover:text-[#c9d1d9]'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-[#30363d]">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-[#8b949e] dark:hover:text-[#c9d1d9] dark:hover:bg-[#21262d]/50 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-[#ff7b72] dark:hover:text-[#ff7b72] dark:hover:bg-red-900/10 transition-colors mt-1"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          
          <div className="mt-4 flex items-center gap-3 px-3">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'Developer'}&backgroundColor=0969da`} 
              alt="User" 
              className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-[#30363d]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">@{username || 'Developer'}</p>
              <p className="text-xs text-zinc-500 dark:text-[#8b949e] truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-200 dark:border-[#30363d] bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-sm z-10 sticky top-0 transition-colors duration-200">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-[#8b949e]" />
              <input 
                type="text" 
                placeholder="Search projects, tasks, or snippets (Cmd+K)" 
                className="w-full bg-zinc-100 border border-zinc-200 dark:bg-[#010409] dark:border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-900 dark:text-[#c9d1d9] placeholder-zinc-500 dark:placeholder-[#8b949e] focus:outline-none focus:border-[#0969da] dark:focus:border-[#58a6ff] focus:ring-1 focus:ring-[#0969da] dark:focus:ring-[#58a6ff] transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-[#8b949e] dark:hover:text-[#c9d1d9] transition-colors rounded-full dark:hover:bg-[#21262d]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0969da] dark:bg-[#58a6ff] rounded-full border-2 border-white dark:border-[#0d1117]"></span>
            </button>
            <button className="bg-[#2da44e] hover:bg-[#2c974b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              New Project
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
