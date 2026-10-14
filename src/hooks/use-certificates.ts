import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { localCertificates } from '@/data/certificates';
import type { Certificate } from '@/types/certificate';
export const certificateQueryKey = ['certificates'];
export function sortCertificates(rows: Certificate[]) {
 return [...rows].sort((a,b) => (b.issued_at ?? '').localeCompare(a.issued_at ?? '') || a.sort_order-b.sort_order || a.id.localeCompare(b.id));
}
export function useCertificates() {
 return useQuery({ queryKey: certificateQueryKey, queryFn: async () => {
  if (!supabase) return sortCertificates(localCertificates);
  const { data, error } = await supabase.from('certificates').select('*');
  if (error) throw error;
  return sortCertificates(data as Certificate[]);
 }, retry: 1, staleTime: 60000 });
}
