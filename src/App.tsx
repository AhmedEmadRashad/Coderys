import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import { Snippets } from './pages/Snippets';
import { Login } from './pages/Login';
import { AIGuide } from './pages/AIGuide';
import { Analytics } from './pages/Analytics';
import { GithubSearch } from './pages/GithubSearch';
import { Communities } from './pages/Communities';
import { Commands } from './pages/Commands';
import { Games } from './pages/Games';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="snippets" element={<Snippets />} />
        <Route path="github" element={<GithubSearch />} />
        <Route path="communities" element={<Communities />} />
        <Route path="commands" element={<Commands />} />
        <Route path="ai-guide" element={<AIGuide />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="games" element={<Games />} />
      </Route>
      {/* Redirect old root to /app if logged in, otherwise landing handles it */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
