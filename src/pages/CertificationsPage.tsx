import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

interface CertificationsPageProps {
  language?: 'es' | 'en';
  onLanguageChange?: (language: 'es' | 'en') => void;
}

const CertificationsPage = ({
  language: controlledLanguage,
  onLanguageChange,
}: CertificationsPageProps) => {
  const [localLanguage, setLocalLanguage] = useState<'es' | 'en'>('es');
  const language = controlledLanguage ?? localLanguage;
  const handleLanguageChange = onLanguageChange ?? setLocalLanguage;

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <main className="pt-20">
        <Certifications language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default CertificationsPage;
