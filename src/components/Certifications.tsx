import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCertificates, sortCertificates } from '@/hooks/use-certificates';
import { localCertificates } from '@/data/certificates';
import CertificateCard from './CertificateCard';
import CertificateViewer from './CertificateViewer';
import type { Certificate, CertificateCategory, Language } from '@/types/certificate';

export default function Certifications({ language, recent = false }: { language: Language; recent?: boolean }) {
 const [category,setCategory] = useState<CertificateCategory | 'all'>('all');
 const [search,setSearch] = useState('');
 const [selected,setSelected] = useState<Certificate | null>(null);
 const query = useCertificates();
 const text = language === 'es' ? { title:recent?'Logros recientes':'Formación y certificaciones',subtitle:'Aprendizaje continuo en React, inteligencia artificial y desarrollo web.',all:'Todos',hackathon:'Hackathons',course:'Cursos',certification:'Certificaciones',award:'Premios',search:'Buscar por título, emisor o skill',loading:'Cargando certificados…',error:'No se pudo conectar con Supabase. Mostramos el respaldo local.',retry:'Reintentar',empty:'No hay certificados que coincidan con la búsqueda.',featured:'Logros destacados',more:'Ver todas las certificaciones',category:'Filtrar por categoría' } : {title:recent?'Recent achievements':'Education and certifications',subtitle:'Continuous learning in React, artificial intelligence and web development.',all:'All',hackathon:'Hackathons',course:'Courses',certification:'Certifications',award:'Awards',search:'Search by title, issuer or skill',loading:'Loading certificates…',error:'Could not connect to Supabase. Showing the local backup.',retry:'Retry',empty:'No certificates match your search.',featured:'Featured achievements',more:'View all certifications',category:'Filter by category'};
 const rows = query.data ?? (query.isError ? sortCertificates(localCertificates) : []);
 const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const matches = rows.filter(row => (category==='all'||row.category===category) && normalize([row.title_es,row.title_en,row.issuer,...row.skills].join(' ')).includes(normalize(search.trim())));
 const featured = recent ? [] : matches.filter(row=>row.featured);
 const grid = recent ? rows.slice(0,3) : matches.filter(row=>!row.featured);
 return <section id="certifications" className="py-20 md:py-28"><div className="container mx-auto px-4 md:px-6">
  <div className="text-center mb-12"><h2 className="section-title mb-4">{text.title}</h2><p className="section-subtitle mx-auto">{text.subtitle}</p></div>
  {query.isPending && <p role="status" className="text-center">{text.loading}</p>}
  {query.isError && <div role="alert" className="glass-card p-4 mb-6 flex flex-wrap gap-4 items-center"><p>{text.error}</p><button className="btn-secondary" onClick={()=>void query.refetch()}>{text.retry}</button></div>}
  {!recent && <div className="space-y-5 mb-10"><label className="grid gap-2 max-w-xl mx-auto">{text.search}<input type="search" className="admin-input" value={search} onChange={e=>setSearch(e.target.value)}/></label><div role="group" aria-label={text.category} className="flex flex-wrap gap-2 justify-center">{(['all','hackathon','course','certification','award'] as const).map(value=><button key={value} className={category===value?'btn-primary':'btn-secondary'} aria-pressed={category===value} onClick={()=>setCategory(value)}>{text[value]}</button>)}</div></div>}
  {featured.length>0 && <div className="mb-12"><h3 className="text-xl font-semibold mb-5">{text.featured}</h3><div className="grid lg:grid-cols-2 gap-6">{featured.map(row=><CertificateCard key={row.id} certificate={row} language={language} large onView={()=>setSelected(row)}/>)}</div></div>}
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{grid.map(row=><CertificateCard key={row.id} certificate={row} language={language} onView={()=>setSelected(row)}/>)}</div>
  {!query.isPending && matches.length===0 && <p role="status" className="text-center py-10">{text.empty}</p>}
  {recent && <div className="text-center mt-8"><Link to="/certifications" className="btn-secondary">{text.more} →</Link></div>}
  <CertificateViewer certificate={selected} language={language} onClose={()=>setSelected(null)}/>
 </div></section>;
}
