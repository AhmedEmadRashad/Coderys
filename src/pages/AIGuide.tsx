import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, Sparkles, Code, Terminal, FileText, Check, Copy } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  isCode?: boolean;
  language?: string;
}

const SUGGESTIONS = [
  { icon: Code, text: "Write a React hook for fetching data" },
  { icon: Terminal, text: "Generate a Dockerfile for Node.js" },
  { icon: FileText, text: "Create a Python script to scrape a website" },
];

export function AIGuide() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: "Hello! I'm your AI Code Generator. Ask me to write scripts, components, or configurations for you." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response with code generation
    setTimeout(() => {
      let codeResponse = '';
      let lang = 'javascript';
      
      if (newMsg.content.toLowerCase().includes('react') || newMsg.content.toLowerCase().includes('hook')) {
        lang = 'typescript';
        codeResponse = `import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}`;
      } else if (newMsg.content.toLowerCase().includes('docker')) {
        lang = 'dockerfile';
        codeResponse = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`;
      } else {
        lang = 'python';
        codeResponse = `def hello_developer():
    print("Code generation ready!")
    return True

if __name__ == "__main__":
    hello_developer()`;
      }

      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, role: 'ai', content: "Here is the generated code based on your request:" },
        { id: Date.now() + 2, role: 'ai', content: codeResponse, isCode: true, language: lang }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Bot className="w-6 h-6 text-indigo-400" />
          AI Code Generator
        </h1>
        <p className="text-zinc-400">Instantly generate scripts, components, and boilerplate code.</p>
      </div>

      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'ai' && !msg.isCode && (
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              {msg.role === 'ai' && msg.isCode && <div className="w-8 h-8 shrink-0"></div>}
              
              <div className={`max-w-[85%] ${
                msg.isCode 
                  ? 'w-full bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden group relative'
                  : msg.role === 'user' 
                    ? 'rounded-2xl px-5 py-3.5 bg-indigo-600 text-white rounded-tr-sm' 
                    : 'rounded-2xl px-5 py-3.5 bg-zinc-800 text-zinc-200 rounded-tl-sm'
              }`}>
                {msg.isCode ? (
                  <>
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-400">{msg.language}</span>
                      <button 
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto custom-scrollbar">
                      <code>{msg.content}</code>
                    </pre>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                  <User className="w-5 h-5 text-zinc-400" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTIONS.map((sug, i) => {
                const Icon = sug.icon;
                return (
                  <button 
                    key={i}
                    onClick={() => setInput(sug.text)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-full border border-zinc-700 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    {sug.text}
                  </button>
                );
              })}
            </div>
          )}
          
          <div className="relative flex items-end gap-2">
            <div className="relative flex-1">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask AI to generate code..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none min-h-[52px] max-h-[200px] custom-scrollbar"
                rows={1}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-indigo-400 transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white p-3 rounded-xl transition-colors shadow-sm shadow-indigo-500/20 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}