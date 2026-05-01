import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, MoreHorizontal, Calendar, Flag } from 'lucide-react';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  project: string;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Implement OAuth2 Flow', description: 'Add Google and GitHub login providers.', status: 'todo', priority: 'high', dueDate: 'Today', project: 'auth-microservice' },
  { id: '2', title: 'Design System Documentation', description: 'Write usage guidelines for the new Button and Input components.', status: 'todo', priority: 'medium', dueDate: 'Tomorrow', project: 'react-design-system' },
  { id: '3', title: 'Fix Dashboard Layout Shift', description: 'Investigate and fix the CLS issue on the main dashboard load.', status: 'in-progress', priority: 'high', dueDate: 'Today', project: 'coderys-dashboard' },
  { id: '4', title: 'Update Dependencies', description: 'Bump React to v19 and resolve breaking changes.', status: 'in-progress', priority: 'low', dueDate: 'Next Week', project: 'core-ui' },
  { id: '5', title: 'Setup CI/CD Pipeline', description: 'Configure GitHub Actions for automated testing and deployment.', status: 'done', priority: 'high', dueDate: 'Yesterday', project: 'mobile-app-sync' },
];

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'bg-zinc-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

export function Tasks() {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-amber-400 bg-amber-400/10';
      case 'low': return 'text-emerald-400 bg-emerald-400/10';
      default: return 'text-zinc-400 bg-zinc-800';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            Tasks
          </h1>
          <p className="text-zinc-400">Track your progress and manage your sprint.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-8">
        {COLUMNS.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          
          return (
            <div key={column.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col h-full max-h-[calc(100vh-12rem)]">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${column.color}`}></div>
                  <h3 className="font-semibold text-zinc-200">{column.title}</h3>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {columnTasks.map(task => (
                  <motion.div 
                    layoutId={task.id}
                    key={task.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-grab hover:border-zinc-700 transition-colors shadow-sm group"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4 className="text-sm font-medium text-zinc-100 group-hover:text-indigo-300 transition-colors leading-snug">
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                        <Flag className="w-3 h-3" />
                        {task.priority}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 truncate max-w-[120px]">
                        {task.project}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800/50">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {task.dueDate}
                      </div>
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1" 
                        alt="Assignee" 
                        className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700"
                      />
                    </div>
                  </motion.div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-zinc-800 rounded-lg flex items-center justify-center text-sm text-zinc-500">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
