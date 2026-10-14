import { useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import type { Certificate, Language } from '@/types/certificate';

export default function CertificateCard({ certificate: row, language, onView, large = false }: { certificate:Certificate; language:Language; onView:()=>void; large?:boolean }) {
 const [imageFailed,setImageFailed] = useState(false);
 const title = language==='es' ? row.title_es : row.title_en;
 const description = language==='es' ? row.description_es : row.description_en;
 const text = language==='es' ? { view:'Ver certificado',verify:'Verificar',pending:'Documento pendiente',date:'Fecha pendiente',preview:'Vista previa de',featured:'Destacado' } : {view:'View certificate',verify:'Verify',pending:'Document pending',date:'Date pending',preview:'Preview of',featured:'Featured'};
 return <article className={`glass-card overflow-hidden flex flex-col ${large?'border-primary/40':''}`}>
  <div className="aspect-[16/10] bg-gradient-to-br from-primary/15 via-muted to-background flex items-center justify-center overflow-hidden">
   {row.thumbnail_url && !imageFailed ? <img src={row.thumbnail_url} alt={`${text.preview} ${title}`} loading="lazy" decoding="async" width={800} height={500} className="w-full h-full object-contain" onError={()=>setImageFailed(true)}/> : <div className="text-center p-8"><Award className="text-primary mx-auto mb-4" size={48} aria-hidden="true"/><p className="font-display font-semibold text-xl">{title}</p><p className="text-muted-foreground text-sm mt-2">{row.issuer}</p></div>}
  </div>
  <div className="p-6 flex flex-col flex-1 gap-3">
   {row.featured && <span className="text-primary text-xs uppercase tracking-widest">{text.featured}</span>}
   <h3 className={large?'font-display font-bold text-2xl':'font-display font-semibold text-lg'}>{title}</h3>
   <p className="text-muted-foreground">{row.issuer}</p>
   {row.issued_at ? <time dateTime={row.issued_at} className="text-sm text-muted-foreground">{new Intl.DateTimeFormat(language==='es'?'es-CO':'en-US',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${row.issued_at}T00:00:00Z`))}</time> : <p className="text-sm text-muted-foreground">{text.date}</p>}
   {description && <p className="text-sm leading-relaxed">{description}</p>}
   {row.credential_id && <p className="text-xs text-muted-foreground break-all">ID: {row.credential_id}</p>}
   <div className="flex flex-wrap gap-2">{row.skills.map(skill=><span key={skill} className="skill-badge text-xs">{skill}</span>)}</div>
   <div className="flex flex-wrap gap-3 mt-auto pt-3">{row.file_url ? <button className="btn-primary text-sm" onClick={onView}>{text.view}</button> : <span className="text-sm text-muted-foreground">{text.pending}</span>}{row.verify_url && <a href={row.verify_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm"><ExternalLink size={14}/>{text.verify}</a>}</div>
  </div>
 </article>;
}
