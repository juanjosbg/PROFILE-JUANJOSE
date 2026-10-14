import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Certificate, Language } from '@/types/certificate';

export default function CertificateViewer({certificate,language,onClose}:{certificate:Certificate|null;language:Language;onClose:()=>void}) {
 const text = language==='es' ? {open:'Abrir o descargar certificado',description:'Documento original del certificado'} : {open:'Open or download certificate',description:'Original certificate document'};
 const title = certificate ? language==='es' ? certificate.title_es : certificate.title_en : '';
 const url = certificate?.file_url;
 const image = url ? /\.(png|jpe?g)(?:\?|$)/i.test(url) : false;
 return <Dialog open={Boolean(certificate)} onOpenChange={open=>{if(!open)onClose();}}><DialogContent className="max-w-5xl max-h-[95dvh] overflow-y-auto"><DialogTitle>{title}</DialogTitle><DialogDescription>{text.description}</DialogDescription>{url && <>{image ? <img src={url} alt={title} className="w-full max-h-[65dvh] object-contain"/> : <iframe src={url} title={title} className="w-full h-[65dvh] rounded-lg bg-white"/>}<a className="btn-secondary w-fit" href={url} target="_blank" rel="noopener noreferrer">{text.open}</a></>}</DialogContent></Dialog>;
}
