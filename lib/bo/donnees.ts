import { createAdminClient } from '@/lib/supabase-admin'
import type { Utilisateur } from './regles'

// Lecture des données de koji-web pour le back-office (clé service,
// serveur uniquement, pages protégées par le layout admin). Lecture seule,
// sauf les actions explicites (validation de documents).

const COLONNES = 'id,email,is_pro,created_at,updated_at,full_name,phone,profession,subscription_status,subscription_product,subscription_expires_at,trial_ends_at,business_info'

export async function utilisateurs(): Promise<Utilisateur[]> {
  const { data, error } = await createAdminClient().from('users').select(COLONNES).order('created_at', { ascending: false })
  if (error) throw new Error(`Lecture des comptes impossible : ${error.message}`)
  return (data || []) as Utilisateur[]
}

export async function utilisateur(id: string): Promise<Utilisateur | null> {
  const { data } = await createAdminClient().from('users').select(COLONNES).eq('id', id).maybeSingle()
  return (data as Utilisateur) || null
}

export type Devis = { id: string; user_id: string; status: string | null; created_at: string | null; signed_at: string | null; total_ttc: number | null; reference: string | null }

export async function devis(userId?: string): Promise<Devis[]> {
  let q = createAdminClient().from('quotes').select('id,user_id,status,created_at,signed_at,total_ttc,reference').order('created_at', { ascending: false })
  if (userId) q = q.eq('user_id', userId)
  const { data } = await q
  return (data || []) as Devis[]
}

// Base JSON de koji-web (table koji_web_state, ligne 1) : Radar,
// notifications, avis, factures, support…
export async function etatWeb(): Promise<Record<string, unknown[]>> {
  const { data } = await createAdminClient().from('koji_web_state').select('data').eq('id', 1).maybeSingle()
  return ((data as { data?: Record<string, unknown[]> } | null)?.data) || {}
}

export const estSigneDevis = (d: { status?: string | null; signed_at?: string | null }) => Boolean(d.signed_at) || ['signe', 'signé', 'signed', 'accepte'].includes(String(d.status || '').toLowerCase())
