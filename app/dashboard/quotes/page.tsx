import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type QuoteRow = {
  id: string
  client_name: string | null
  client_email: string | null
  total_amount: number | null
  status: string | null
  created_at: string
  signed_at: string | null
}

const STATUS_STYLE: Record<string, { label: string; bg: string; fg: string }> = {
  signed: { label: 'Signé', bg: '#E6F5EE', fg: '#1E8E5A' },
  signe: { label: 'Signé', bg: '#E6F5EE', fg: '#1E8E5A' },
  accepted: { label: 'Signé', bg: '#E6F5EE', fg: '#1E8E5A' },
  accepte: { label: 'Signé', bg: '#E6F5EE', fg: '#1E8E5A' },
  refused: { label: 'Refusé', bg: '#FBE9E5', fg: '#C4452D' },
  refuse: { label: 'Refusé', bg: '#FBE9E5', fg: '#C4452D' },
  rejected: { label: 'Refusé', bg: '#FBE9E5', fg: '#C4452D' },
}

function statusInfo(status: string | null) {
  const key = (status || '').toLowerCase()
  return STATUS_STYLE[key] || { label: 'En attente', bg: '#FDF3DC', fg: '#B7791F' }
}

function initials(name: string | null) {
  const value = (name || '').trim()
  if (!value) return '?'
  const parts = value.split(/\s+/)
  return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : value.slice(0, 2).toUpperCase()
}

function formatEuro(value: number) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}

function formatDate(value: string | null) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Refonte maquette (25 oct) — meme requete reelle qu'avant (table `quotes`),
// juste redessinee pour coller a l'artboard AdminDevis.dc.html (KPI,
// puces de filtre, tableau).
export default async function QuotesPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() { } } }
  )

  const { data } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
  const quotes = (data || []) as QuoteRow[]

  const pending = quotes.filter((q) => statusInfo(q.status).label === 'En attente').length
  const signed = quotes.filter((q) => statusInfo(q.status).label === 'Signé').length
  const refused = quotes.filter((q) => statusInfo(q.status).label === 'Refusé').length
  const totalVolume = quotes.reduce((sum, q) => sum + Number(q.total_amount || 0), 0)

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#16233F] tracking-tight">Devis</h1>
          <p className="text-[14px] text-gray-500 mt-1">Tous les devis créés par les entreprises sur koji.</p>
        </div>
        <button className="h-11 px-5 rounded-xl border border-[#DADDE6] bg-white text-[#16233F] text-[14px] font-bold">Exporter</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-[#EDEDF3] rounded-2xl p-4 flex flex-col gap-1">
          <span className="text-[12px] text-gray-400 font-semibold">Total devis</span>
          <span className="text-[26px] font-extrabold text-[#16233F]">{quotes.length}</span>
          <span className="text-[12px] text-gray-500">cette année</span>
        </div>
        <div className="bg-white border border-[#EDEDF3] rounded-2xl p-4 flex flex-col gap-1">
          <span className="text-[12px] text-gray-400 font-semibold">En attente</span>
          <span className="text-[26px] font-extrabold text-[#16233F]">{pending}</span>
          <span className="text-[12px] text-gray-500">à suivre</span>
        </div>
        <div className="bg-white border border-[#EDEDF3] rounded-2xl p-4 flex flex-col gap-1">
          <span className="text-[12px] text-gray-400 font-semibold">Signés</span>
          <span className="text-[26px] font-extrabold text-[#16233F]">{signed}</span>
          <span className="text-[12px] text-gray-500">taux {quotes.length ? Math.round((signed / quotes.length) * 100) : 0} %</span>
        </div>
        <div className="bg-white border border-[#EDEDF3] rounded-2xl p-4 flex flex-col gap-1">
          <span className="text-[12px] text-gray-400 font-semibold">Volume total</span>
          <span className="text-[26px] font-extrabold text-[#16233F]">{formatEuro(totalVolume)}</span>
          <span className="text-[12px] text-gray-500">HT</span>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-[#16233F] text-white">Tous · {quotes.length}</span>
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-white text-gray-500 border border-[#EDEDF3]">En attente · {pending}</span>
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-white text-gray-500 border border-[#EDEDF3]">Signés · {signed}</span>
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-white text-gray-500 border border-[#EDEDF3]">Refusés · {refused}</span>
      </div>

      <div className="bg-white border border-[#EDEDF3] rounded-[18px] overflow-hidden">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#F1F2F6]">
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Client</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Montant</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Statut</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Émission</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F6FA]">
            {quotes.map((quote) => {
              const status = statusInfo(quote.status)
              return (
                <tr key={quote.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EDEFFB] text-[#16233F] text-[13px] font-extrabold flex items-center justify-center shrink-0">
                        {initials(quote.client_name)}
                      </div>
                      <span className="text-[14px] font-bold text-[#1E2430]">{quote.client_name || 'Nouveau prospect'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[14px] font-extrabold text-[#16233F]">{formatEuro(Number(quote.total_amount || 0))}</td>
                  <td className="px-5 py-4">
                    <span className="text-[12px] font-bold px-3 py-1 rounded-xl" style={{ background: status.bg, color: status.fg }}>{status.label}</span>
                  </td>
                  <td className="px-5 py-4 text-[14px] text-gray-500">{formatDate(quote.created_at)}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-500">{formatDate(quote.signed_at)}</td>
                </tr>
              )
            })}
            {quotes.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-500">Aucun devis trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
