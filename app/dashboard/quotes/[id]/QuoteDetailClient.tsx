'use client'

import Link from 'next/link'
import { ChevronLeft, Mail, Phone, MapPin, FileSignature } from 'lucide-react'

type Quote = {
  id: string
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  client_address: string | null
  status: string | null
  total_amount: number | null
  notes: string | null
  rooms: any[] | null
  tasks: any[] | null
  signature_url: string | null
  signature_data: string | null
  signed_at: string | null
  created_at: string
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

function formatDate(value: string | null) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatEuro(value: number) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}

// Les devis koji n'ont pas de table de lignes dediee : `rooms`/`tasks`
// (JSONB) contiennent deja la structure complete, avec plusieurs formes
// possibles selon la version de l'app qui a cree le devis (voir
// lib/quote-calculations.js cote koji-web) — lecture defensive, best-effort.
function roomItems(room: any): any[] {
  return room?.items || room?.tasks || room?.ouvrages || room?.works || []
}
function itemLabel(item: any): string {
  return item?.name || item?.designation || item?.label || item?.title || 'Ligne sans nom'
}
function itemAmount(item: any): number {
  const value = item?.total ?? item?.totalPrice ?? item?.price ?? item?.price_ht ?? item?.montant ?? 0
  return Number(value) || 0
}
function roomLabel(room: any): string {
  return room?.label || room?.name || room?.title || 'Chantier'
}

export default function QuoteDetailClient({ quote }: { quote: Quote }) {
  const status = statusInfo(quote.status)
  const rooms: any[] = Array.isArray(quote.rooms) && quote.rooms.length > 0
    ? quote.rooms
    : (Array.isArray(quote.tasks) && quote.tasks.length > 0 ? [{ label: 'Chantier', items: quote.tasks }] : [])

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard/quotes" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#EDEDF3] text-gray-500 hover:text-[#16233F] transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </Link>
        <h1 className="text-[26px] font-extrabold text-[#16233F] tracking-tight">Devis</h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mt-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-[30px] font-bold text-[#0E172C] font-outfit leading-none tracking-tight">{quote.client_name || 'Nouveau prospect'}</h2>
            <span className="text-[12px] font-bold px-3 py-1 rounded-xl" style={{ background: status.bg, color: status.fg }}>{status.label}</span>
          </div>
          <p className="text-[14px] text-gray-500">Émis le {formatDate(quote.created_at)}{quote.signed_at ? ` · Signé le ${formatDate(quote.signed_at)}` : ''}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Montant total (HT)</span>
          <span className="text-[30px] font-extrabold text-[#16233F] font-outfit">{formatEuro(Number(quote.total_amount || 0))}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-3">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[14px] font-semibold text-[#0E172C] truncate">{quote.client_email || '—'}</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-3">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[14px] font-semibold text-[#0E172C] truncate">{quote.client_phone || '—'}</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[14px] font-semibold text-[#0E172C] truncate">{quote.client_address || '—'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="font-bold text-[17px] text-[#0E172C] px-1">Détail du devis</h3>
          {rooms.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-[1.2rem] px-6 py-10 text-center text-gray-500 text-[14px]">Aucune ligne détaillée pour ce devis.</div>
          ) : (
            rooms.map((room, idx) => {
              const items = roomItems(room)
              return (
                <div key={idx} className="bg-white border border-gray-100 rounded-[1.2rem] overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h4 className="font-bold text-[14px] text-[#0E172C]">{roomLabel(room)}</h4>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {items.length === 0 ? (
                      <p className="px-6 py-6 text-center text-gray-400 text-[13px]">Aucune ligne.</p>
                    ) : items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3.5">
                        <span className="text-[14px] font-semibold text-[#0E172C]">{itemLabel(item)}</span>
                        <span className="text-[14px] font-bold text-[#16233F]">{formatEuro(itemAmount(item))}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}

          {quote.notes && (
            <div className="bg-white rounded-[1.2rem] p-6 border border-gray-100">
              <h4 className="font-bold text-[13px] text-[#0E172C] tracking-widest uppercase mb-3">Notes</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap">{quote.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[1.2rem] p-6 border border-gray-100">
            <h4 className="font-bold text-[13px] text-[#0E172C] tracking-widest uppercase mb-4 flex items-center gap-2">
              <FileSignature className="w-4 h-4" /> Signature
            </h4>
            {quote.signature_url ? (
              <img src={quote.signature_url} alt="Signature" className="w-full rounded-lg border border-gray-100 bg-gray-50" />
            ) : quote.signature_data ? (
              <img src={quote.signature_data} alt="Signature" className="w-full rounded-lg border border-gray-100 bg-gray-50" />
            ) : (
              <p className="text-[13px] text-gray-400">Pas encore signé.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
