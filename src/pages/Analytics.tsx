import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, GitCommit, Clock } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';

const COMMIT_DATA = [
  { name: 'Mon', commits: 12 },
  { name: 'Tue', commits: 19 },
  { name: 'Wed', commits: 15 },
  { name: 'Thu', commits: 22 },
  { name: 'Fri', commits: 28 },
  { name: 'Sat', commits: 5 },
  { name: 'Sun', commits: 2 },
];

const LANGUAGE_DATA = [
  { name: 'TypeScript', value: 65, color: '#3178c6' },
  { name: 'Python', value: 20, color: '#3776ab' },
  { name: 'Go', value: 10, color: '#00add8' },
  { name: 'Rust', value: 5, color: '#dea584' },
];

export function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-indigo-400" />
          Analytics
        </h1>
        <p className="text-zinc-400">Insights into your coding habits and productivity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <GitCommit className="w-5 h-5" />
            <span className="text-sm font-medium">Total Commits (This Week)</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-white">103</span>
            <span className="text-sm text-emerald-400 flex items-center mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +14%
            </span>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Deep Work Hours</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-white">28.5h</span>
            <span className="text-sm text-emerald-400 flex items-center mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +2.5h
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <BarChart2 className="w-5 h-5" />
            <span className="text-sm font-medium">Productivity Score</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-white">92/100</span>
            <span className="text-sm text-zinc-500 mb-1">Top 5%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commits Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Activity Timeline</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COMMIT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#71717a" 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#71717a" 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#18181b' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Languages Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Languages Used</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LANGUAGE_DATA} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#71717a" 
                  tick={{ fill: '#e4e4e7', fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {LANGUAGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
