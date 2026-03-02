import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

interface IndexProps {
  language?: 'es' | 'en';
  onLanguageChange?: (language: 'es' | 'en') => void;
}

const Index = ({ language: controlledLanguage, onLanguageChange }: IndexProps) => {
  const [localLanguage, setLocalLanguage] = useState<'es' | 'en'>('es');
  const language = controlledLanguage ?? localLanguage;
  const handleLanguageChange = onLanguageChange ?? setLocalLanguage;

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} />
        <Projects language={language} />
        <Experience language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
