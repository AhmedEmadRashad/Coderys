import { motion } from 'framer-motion';
import { FolderGit2, Star, GitFork, Clock, MoreVertical, Github } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    name: 'coderys-dashboard',
    description: 'The main developer productivity dashboard application built with React and Tailwind.',
    language: 'TypeScript',
    stars: 128,
    forks: 32,
    updatedAt: '2 hours ago',
    visibility: 'Private',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'auth-microservice',
    description: 'Centralized authentication service using JWT, OAuth2, and Redis caching layer.',
    language: 'Go',
    stars: 45,
    forks: 12,
    updatedAt: '1 day ago',
    visibility: 'Public',
    color: 'bg-cyan-500'
  },
  {
    id: 3,
    name: 'react-design-system',
    description: 'A comprehensive component library for internal tools and client-facing apps.',
    language: 'TypeScript',
    stars: 312,
    forks: 89,
    updatedAt: '3 days ago',
    visibility: 'Public',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    name: 'data-pipeline-v2',
    description: 'ETL pipeline for processing analytics data from various sources into Snowflake.',
    language: 'Python',
    stars: 12,
    forks: 2,
    updatedAt: '1 week ago',
    visibility: 'Private',
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    name: 'mobile-app-sync',
    description: 'Offline-first synchronization engine for the React Native mobile client.',
    language: 'Rust',
    stars: 87,
    forks: 14,
    updatedAt: '2 weeks ago',
    visibility: 'Private',
    color: 'bg-orange-500'
  },
  {
    id: 6,
    name: 'infrastructure-as-code',
    description: 'Terraform configurations for AWS infrastructure provisioning and management.',
    language: 'HCL',
    stars: 56,
    forks: 8,
    updatedAt: '1 month ago',
    visibility: 'Private',
    color: 'bg-purple-500'
  }
];

export function Projects() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" />
            Projects
          </h1>
          <p className="text-zinc-400">Manage your repositories and active workspaces.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500">
            <option>All Repositories</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <button className="bg-white text-zinc-900 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" />
            Import Repo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/20 group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                  <FolderGit2 className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    project.visibility === 'Public' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}>
                    {project.visibility}
                  </span>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-zinc-400 mb-6 flex-1 line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${project.color}`}></span>
                  {project.language}
                </div>
                <div className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer transition-colors">
                  <Star className="w-3.5 h-3.5" />
                  {project.stars}
                </div>
                <div className="flex items-center gap-1 hover:text-zinc-300 cursor-pointer transition-colors">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {project.updatedAt}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
