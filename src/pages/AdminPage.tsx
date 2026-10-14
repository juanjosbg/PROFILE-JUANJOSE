import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ADMIN_EMAIL, supabase } from '@/lib/supabase';
import { removeCertificateFiles } from '@/lib/certificate-files';
import { certificateQueryKey } from '@/hooks/use-certificates';
import CertificateEditor from '@/components/CertificateEditor';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Certificate, Language } from '@/types/certificate';

export default function AdminPage() {
 const [language,setLanguage] = useState<Language>('es');
 const [session,setSession] = useState<Session | null>(null);
 const [loading,setLoading] = useState(true);
 const [authError,setAuthError] = useState(false);
 const [email,setEmail] = useState(ADMIN_EMAIL);
 const [busy,setBusy] = useState(false);
 const [editing,setEditing] = useState<Certificate | null | undefined>();
 const [deleting,setDeleting] = useState<Certificate | null>(null);
 const client = useQueryClient();
 const authorized = session?.user.email?.toLowerCase() === ADMIN_EMAIL;
 const text = language === 'es' ? { title:'Administrar certificados',login:'Enviar enlace de acceso',sent:'Revisa tu correo para entrar',out:'Cerrar sesión',denied:'Tu cuenta no tiene acceso a este panel.',config:'Configura las variables de Supabase para habilitar el panel.',add:'Nuevo certificado',edit:'Editar',remove:'Borrar',featured:'Destacado',order:'Orden',save:'Guardar',error:'Ocurrió un error',confirm:'¿Borrar este certificado y sus archivos?',cancel:'Cancelar',empty:'No hay certificados. Ejecuta el seed o crea el primero.',loading:'Cargando…',authError:'No se pudo verificar la sesión. Recarga la página.',reload:'Recargar',home:'Volver al portafolio',saved:'Cambios guardados',deleted:'Certificado borrado' } : {title:'Manage certificates',login:'Send sign-in link',sent:'Check your email to sign in',out:'Sign out',denied:'Your account cannot access this panel.',config:'Configure Supabase environment variables to enable the panel.',add:'New certificate',edit:'Edit',remove:'Delete',featured:'Featured',order:'Order',save:'Save',error:'An error occurred',confirm:'Delete this certificate and its files?',cancel:'Cancel',empty:'No certificates. Run the seed or create the first one.',loading:'Loading…',authError:'Could not verify the session. Reload the page.',reload:'Reload',home:'Back to portfolio',saved:'Changes saved',deleted:'Certificate deleted'};
 useEffect(() => {
  if (!supabase) { setLoading(false); return; }
  let active = true;
  void supabase.auth.getSession().then(({data,error}) => { if(active) {setSession(data.session);setAuthError(Boolean(error));setLoading(false);} }).catch(() => {if(active){setAuthError(true);setLoading(false);}});
  const {data} = supabase.auth.onAuthStateChange((_event,next) => {setSession(next);setEditing(undefined);});
  return () => {active=false;data.subscription.unsubscribe();};
 },[]);
 const query = useQuery({queryKey:['admin-certificates',session?.user.id],enabled:Boolean(authorized && supabase),queryFn:async () => {
  const {data,error} = await supabase!.from('certificates').select('*').order('sort_order').order('issued_at',{ascending:false});
  if(error) throw error;return data as Certificate[];
 }});
 async function refresh() {await Promise.all([client.invalidateQueries({queryKey:['admin-certificates']}),client.invalidateQueries({queryKey:certificateQueryKey})]);}
 async function login(e: React.FormEvent) {
  e.preventDefault();setBusy(true);
  try {const {error}=await supabase!.auth.signInWithOtp({email:email.trim(),options:{shouldCreateUser:false,emailRedirectTo:`${location.origin}/admin`}});if(error)throw error;toast.success(text.sent);}catch(error){toast.error(error instanceof Error ? error.message : text.error);}finally{setBusy(false);}
 }
 async function update(row: Certificate, values: Partial<Certificate>) {
  if(busy)return;setBusy(true);
  try {const {error}=await supabase!.from('certificates').update(values).eq('id',row.id);if(error)throw error;await refresh();toast.success(text.saved);}catch(error){toast.error(error instanceof Error ? error.message : text.error);}finally{setBusy(false);}
 }
 async function remove() {
  if(!deleting || busy)return;setBusy(true);
  try {
   const {error}=await supabase!.from('certificates').delete().eq('id',deleting.id);if(error)throw error;
   try {await removeCertificateFiles([deleting.file_url,deleting.thumbnail_url]);}catch {toast.error(language==='es' ? 'Registro borrado; no se pudieron limpiar sus archivos' : 'Record deleted; files could not be cleaned up');}
   setDeleting(null);await refresh();toast.success(text.deleted);
  }catch(error){toast.error(error instanceof Error ? error.message : text.error);}finally{setBusy(false);}
 }
 return <main className="container mx-auto px-4 py-12 max-w-5xl"><div className="flex flex-wrap justify-between gap-4 mb-8"><Link to="/" className="text-primary">← {text.home}</Link><button className="btn-secondary" onClick={()=>setLanguage(language==='es'?'en':'es')}>{language==='es'?'English':'Español'}</button></div><h1 className="section-title mb-8">{text.title}</h1>
  {!supabase ? <p>{text.config}</p> : loading ? <p role="status">{text.loading}</p> : authError ? <div role="alert">{text.authError}<button className="btn-secondary" onClick={()=>location.reload()}>{text.reload}</button></div> : !session ? <form className="glass-card p-6 grid gap-4 max-w-md" onSubmit={login}><label>Email<input className="admin-input mt-2 w-full" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><button className="btn-primary" disabled={busy}>{text.login}</button></form> : <>
   <button className="btn-secondary mb-6" disabled={busy} onClick={async()=>{const {error}=await supabase.auth.signOut();if(error)toast.error(error.message);else client.removeQueries({queryKey:['admin-certificates']});}}>{text.out}</button>
   {!authorized ? <p role="alert">{text.denied}</p> : <>
    {editing !== undefined ? <CertificateEditor certificate={editing} language={language} onCancel={()=>setEditing(undefined)} onSaved={()=>{setEditing(undefined);void refresh();}}/> : <button className="btn-primary mb-6" onClick={()=>setEditing(null)}>{text.add}</button>}
    {query.isPending ? <p role="status">{text.loading}</p> : query.isError ? <div role="alert">{text.error}<button className="btn-secondary" onClick={()=>void query.refetch()}>{text.reload}</button></div> : query.data?.length===0 ? <p>{text.empty}</p> : <div className="space-y-4 mt-6">{query.data?.map(row=><article key={row.id} className="glass-card p-5 flex flex-wrap gap-4 items-center"><div className="flex-1 min-w-48"><h2 className="font-semibold">{language==='es'?row.title_es:row.title_en}</h2><p className="text-muted-foreground">{row.issuer}</p></div><label className="flex gap-2"><input type="checkbox" checked={row.featured} disabled={busy} onChange={e=>void update(row,{featured:e.target.checked})}/>{text.featured}</label><form className="flex gap-2 items-center" onSubmit={e=>{e.preventDefault();const value=Number(new FormData(e.currentTarget).get('sort_order'));if(Number.isInteger(value)&&value>=0)void update(row,{sort_order:value});}}><label>{text.order}<input key={row.sort_order} className="admin-input w-20 ml-2" name="sort_order" type="number" min={0} step={1} required defaultValue={row.sort_order}/></label><button className="btn-secondary" disabled={busy}>{text.save}</button></form><button className="btn-secondary" disabled={busy} onClick={()=>setEditing(row)}>{text.edit}</button><button className="btn-secondary" disabled={busy} onClick={()=>setDeleting(row)}>{text.remove}</button></article>)}</div>}
   </>}
  </>}
  <Dialog open={Boolean(deleting)} onOpenChange={open=>{if(!open&&!busy)setDeleting(null);}}><DialogContent><DialogTitle>{text.confirm}</DialogTitle><DialogDescription>{deleting && (language==='es'?deleting.title_es:deleting.title_en)}</DialogDescription><div className="flex gap-3"><button className="btn-primary" disabled={busy} onClick={()=>void remove()}>{text.remove}</button><button className="btn-secondary" disabled={busy} onClick={()=>setDeleting(null)}>{text.cancel}</button></div></DialogContent></Dialog>
 </main>;
}
