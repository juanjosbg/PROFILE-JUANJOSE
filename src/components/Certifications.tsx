import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

type Language = 'es' | 'en';

interface CertificationsProps {
  language: Language;
}

type CertificateDoc = {
  title: string;
  fileName: string;
  url: string;
  imagen: string;
};

const certificateDocs: CertificateDoc[] = [
  {
    title: 'Backend',
    fileName: 'diploma-backend.pdf',
    url: '/images/Certificados/diploma-backend.pdf',
    imagen: '',
  },
  {
    title: 'Bootstrap',
    fileName: 'diploma-bootstrap.pdf',
    url: '/images/Certificados/diploma-bootstrap.pdf',
    imagen: '',
  },
  {
    title: 'CSS Grid Layout',
    fileName: 'diploma-css-grid-layout.pdf',
    url: '/images/Certificados/diploma-css-grid-layout.pdf',
    imagen: '',
  },
  {
    title: 'Frontend Developer',
    fileName: 'diploma-frontend-developer.pdf',
    url: '/images/Certificados/diploma-frontend-developer.pdf',
    imagen: '',
  },
  {
    title: 'Git y GitHub',
    fileName: 'diploma-git-github.pdf',
    url: '/images/Certificados/diploma-git-github.pdf',
    imagen: '',
  },
  {
    title: 'HTML y CSS',
    fileName: 'diploma-html-css-2020.pdf',
    url: '/images/Certificados/diploma-html-css-2020.pdf',
    imagen: '',
  },
  {
    title: 'Laboratorio JavaScript',
    fileName: 'diploma-laboratorio-javascript-prueba.pdf',
    url: '/images/Certificados/diploma-laboratorio-javascript-prueba.pdf',
    imagen: '',
  },
  {
    title: 'n8n Low-Code',
    fileName: 'diploma-n8n-lowcode.pdf',
    url: '/images/Certificados/diploma-n8n-lowcode.pdf',
    imagen: '',
  },
  {
    title: 'Tailwind CSS',
    fileName: 'diploma-tailwind-css-2020.pdf',
    url: '/images/Certificados/diploma-tailwind-css-2020.pdf',
    imagen: '',
  },
  {
    title: 'WooCommerce Temas',
    fileName: 'diploma-woocommerce-temas.pdf',
    url: '/images/Certificados/diploma-woocommerce-temas.pdf',
    imagen: '',
  },
];

const Certifications = ({ language }: CertificationsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const text =
    language === 'es'
      ? {
        label: 'Certificaciones',
        title: 'Formación y Certificaciones',
        subtitle: 'Una recopilación de certificaciones que respaldan mi crecimiento profesional continuo.',
        view: 'Ver certificado',
      }
      : {
        label: 'Certifications',
        title: 'Education & Certifications',
        subtitle: 'A collection of certifications that support my continuous professional growth.',
        view: 'View certificate',
      };

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            {text.label}
          </span>
          <h2 className="section-title mb-4">{text.title}</h2>
          <p className="section-subtitle mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificateDocs.map((doc, index) => (
            <motion.article
              key={doc.fileName}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className="glass-card border border-primary/20 overflow-hidden"
            >
              <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/30 h-64">
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`${doc.url}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                    title={doc.title}
                    className="pointer-events-none absolute -left-1 -top-1 w-[calc(100%+18px)] h-[calc(100%+18px)] border-0"
                  />
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <span className="btn-primary text-sm py-2 px-4">
                    <ExternalLink size={14} />
                    {text.view}
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
