import { motion } from 'framer-motion';
import { Gamepad2, Users, Trophy, Star, Play } from 'lucide-react';

const GAMES = [
  {
    id: 'valorant',
    title: 'VALORANT',
    genre: 'Tactical Shooter',
    developer: 'Riot Games',
    image: 'bg-gradient-to-br from-red-600 to-rose-900',
    players: '14M+',
    rating: '4.8/5'
  },
  {
    id: 'gta5',
    title: 'Grand Theft Auto V',
    genre: 'Open World Action',
    developer: 'Rockstar Games',
    image: 'bg-gradient-to-br from-green-600 to-emerald-900',
    players: '150M+',
    rating: '4.9/5'
  },
  {
    id: 'rdr2',
    title: 'Red Dead Redemption 2',
    genre: 'Action-Adventure',
    developer: 'Rockstar Games',
    image: 'bg-gradient-to-br from-orange-600 to-red-900',
    players: '50M+',
    rating: '5.0/5'
  },
  {
    id: 'fortnite',
    title: 'Fortnite',
    genre: 'Battle Royale',
    developer: 'Epic Games',
    image: 'bg-gradient-to-br from-blue-500 to-purple-900',
    players: '80M+',
    rating: '4.6/5'
  },
  {
    id: 'cs2',
    title: 'Counter-Strike 2',
    genre: 'Tactical Shooter',
    developer: 'Valve',
    image: 'bg-gradient-to-br from-amber-500 to-yellow-900',
    players: '30M+',
    rating: '4.7/5'
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    genre: 'Sandbox Survival',
    developer: 'Mojang Studios',
    image: 'bg-gradient-to-br from-green-500 to-lime-900',
    players: '140M+',
    rating: '4.9/5'
  }
];

export function Games() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-indigo-400" />
          Gaming Lounge
        </h1>
        <p className="text-zinc-400">Take a break. Explore top titles for your free time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`h-40 w-full ${game.image} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <Gamepad2 className="w-16 h-16 text-white/50 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {game.rating}
              </div>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-xl font-black text-white italic tracking-tight uppercase group-hover:text-indigo-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mt-1">{game.developer}</p>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                  {game.genre}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {game.players}
                </span>
              </div>
              
              <button className="w-full bg-zinc-800 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
