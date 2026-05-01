import { motion } from 'framer-motion';
import { MessageSquare, Users, Link as LinkIcon, Hash } from 'lucide-react';

const COMMUNITIES = [
  { name: 'Reactiflux', desc: 'The official React Discord community.', platform: 'Discord', users: '200k+', link: 'https://discord.gg/reactiflux', color: 'bg-[#5865F2]' },
  { name: 'Python', desc: 'Largest Python community on Discord.', platform: 'Discord', users: '350k+', link: 'https://discord.gg/python', color: 'bg-[#5865F2]' },
  { name: 'Gophers', desc: 'The Go programming language Slack.', platform: 'Slack', users: '80k+', link: 'https://invite.slack.golangbridge.org/', color: 'bg-[#E01E5A]' },
  { name: 'Rust', desc: 'Official Rust programming Discord.', platform: 'Discord', users: '120k+', link: 'https://discord.gg/rust-lang', color: 'bg-[#5865F2]' },
  { name: 'Vue Land', desc: 'The official Vue.js Discord server.', platform: 'Discord', users: '90k+', link: 'https://chat.vuejs.org/', color: 'bg-[#5865F2]' },
  { name: 'Tailwind CSS', desc: 'Official Tailwind CSS community.', platform: 'Discord', users: '60k+', link: 'https://discord.gg/tailwindcss', color: 'bg-[#5865F2]' },
  { name: 'Next.js', desc: 'Vercel and Next.js community.', platform: 'Discord', users: '110k+', link: 'https://discord.gg/nextjs', color: 'bg-[#5865F2]' },
  { name: 'Docker', desc: 'Official Docker community Slack.', platform: 'Slack', users: '150k+', link: 'https://dockr.ly/slack', color: 'bg-[#E01E5A]' },
  { name: 'Kubernetes', desc: 'K8s official Slack workspace.', platform: 'Slack', users: '180k+', link: 'https://slack.k8s.io/', color: 'bg-[#E01E5A]' },
];

export function Communities() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          Developer Communities
        </h1>
        <p className="text-zinc-400">Join the official Discord and Slack servers for your favorite tech stacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMUNITIES.map((comm, i) => (
          <motion.div
            key={comm.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${comm.color}`}>
                  {comm.platform === 'Discord' ? <Hash className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{comm.name}</h3>
                  <p className="text-xs font-medium text-zinc-500">{comm.platform}</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 mb-6 flex-1">{comm.desc}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/50 px-2.5 py-1 rounded-full">
                <Users className="w-3.5 h-3.5" />
                {comm.users}
              </div>
              <a 
                href={comm.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Join Server <LinkIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
