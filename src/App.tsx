// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoryPage } from './pages/CategoryPage';
import { CustomCursor } from './components/CustomCursor';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen cursor-none text-gray-800">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;