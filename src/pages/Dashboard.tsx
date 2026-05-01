import { motion } from 'framer-motion';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  Activity,
  ArrowUpRight,
  GitCommit,
  Terminal
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const STATS = [
  { label: 'Active Projects', value: '12', icon: Terminal, color: 'text-[#0969da] dark:text-[#58a6ff]', bg: 'bg-[#0969da]/10 dark:bg-[#58a6ff]/10' },
  { label: 'Open PRs', value: '4', icon: GitPullRequest, color: 'text-[#8250df] dark:text-[#bc8cff]', bg: 'bg-[#8250df]/10 dark:bg-[#bc8cff]/10' },
  { label: 'Tasks Done', value: '28', icon: CheckCircle2, color: 'text-[#1a7f37] dark:text-[#3fb950]', bg: 'bg-[#1a7f37]/10 dark:bg-[#3fb950]/10' },
  { label: 'Hours Coded', value: '34h', icon: Clock, color: 'text-[#9a6700] dark:text-[#d29922]', bg: 'bg-[#9a6700]/10 dark:bg-[#d29922]/10' },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'commit', message: 'feat: add authentication middleware', repo: 'auth-service', time: '2h ago' },
  { id: 2, type: 'pr', message: 'Merged PR #42: Update dependencies', repo: 'frontend-core', time: '4h ago' },
  { id: 3, type: 'deploy', message: 'Production deployment successful', repo: 'api-gateway', time: '5h ago' },
  { id: 4, type: 'task', message: 'Completed "Refactor state management"', repo: 'mobile-app', time: '1d ago' },
];

const QUICK_TASKS = [
  { id: 1, title: 'Review PR #102 in core-ui', priority: 'High' },
  { id: 2, title: 'Update API documentation', priority: 'Medium' },
  { id: 3, title: 'Fix memory leak in worker', priority: 'High' },
];

export function Dashboard() {
  const { username } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Welcome back, {username || 'Developer'}</h1>
        <p className="text-zinc-500 dark:text-[#8b949e]">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl p-5 hover:border-zinc-300 dark:hover:border-[#8b949e] transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="flex items-center text-xs font-medium text-[#1a7f37] dark:text-[#3fb950] bg-[#1a7f37]/10 dark:bg-[#3fb950]/10 px-2 py-1 rounded-full">
                  +12% <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-zinc-500 dark:text-[#8b949e] font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0969da] dark:text-[#58a6ff]" />
                Recent Activity
              </h2>
              <button className="text-sm text-[#0969da] dark:text-[#58a6ff] hover:underline">View all</button>
            </div>
            
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-4 relative">
                  <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-zinc-200 dark:bg-[#30363d] last:hidden"></div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#21262d] border border-zinc-200 dark:border-[#30363d] flex items-center justify-center shrink-0">
                    {activity.type === 'commit' && <GitCommit className="w-4 h-4 text-[#1a7f37] dark:text-[#3fb950]" />}
                    {activity.type === 'pr' && <GitPullRequest className="w-4 h-4 text-[#8250df] dark:text-[#bc8cff]" />}
                    {activity.type === 'deploy' && <Activity className="w-4 h-4 text-[#0969da] dark:text-[#58a6ff]" />}
                    {activity.type === 'task' && <CheckCircle2 className="w-4 h-4 text-[#9a6700] dark:text-[#d29922]" />}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-700 dark:text-[#c9d1d9]">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-[#0969da] dark:text-[#58a6ff] bg-[#0969da]/10 dark:bg-[#58a6ff]/10 px-2 py-0.5 rounded">
                        {activity.repo}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-[#8b949e]">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Tasks */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1a7f37] dark:text-[#3fb950]" />
                Up Next
              </h2>
            </div>
            
            <div className="space-y-3">
              {QUICK_TASKS.map((task) => (
                <div key={task.id} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#21262d] transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-[#30363d] cursor-pointer">
                  <div className="mt-0.5 w-4 h-4 rounded border border-zinc-300 dark:border-[#8b949e] group-hover:border-[#0969da] dark:group-hover:border-[#58a6ff] transition-colors bg-white dark:bg-[#0d1117]"></div>
                  <div>
                    <p className="text-sm text-zinc-700 dark:text-[#c9d1d9] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{task.title}</p>
                    <span className={`inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                      task.priority === 'High' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-[#ff7b72]' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-[#d29922]'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-zinc-600 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-[#30363d] rounded-lg hover:bg-zinc-50 dark:hover:bg-[#21262d] transition-colors font-medium">
              Go to Tasks
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
