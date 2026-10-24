import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Search, Bell, HelpCircle, ChevronRight } from 'lucide-react'

type ConversationRow = {
  id: string
  kind: 'radar' | 'devis'
  conversation_id: string
  particulier_user_id: string | null
  entreprise_user_id: string | null
  turns: { role: 'user' | 'assistant'; text: string }[]
  started_at: string
  updated_at: string
}

export default async function ConversationsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() { }
      }
    }
  )

  const { data: conversations } = await supabase
    .from('ai_conversations')
    .select('*')
    .order('updated_at', { ascending: false })
    .returns<ConversationRow[]>()

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit">Conversations IA</h1>
          <p className="text-[14px] text-gray-500 font-medium mt-1">Discussions Radar des Chantiers (client) et "Avec l&apos;IA" (devis entreprise).</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              className="pl-11 pr-4 py-2.5 bg-gray-100/80 rounded-full text-[14px] font-medium text-gray-700 placeholder-gray-400 border-transparent focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all w-72 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors mr-2">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Structure */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100/80">
              <tr>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Compte</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Dernier message</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Messages</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Démarrée le</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Mise à jour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {conversations?.map((conv) => {
                const lastTurn = conv.turns?.[conv.turns.length - 1]
                const userId = conv.kind === 'radar' ? conv.particulier_user_id : conv.entreprise_user_id
                return (
                  <tr key={conv.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      {conv.kind === 'radar' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#F0F4FF] text-[#1D5FE1] uppercase tracking-wider">Client</span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#FDF3DC] text-[#B7791F] uppercase tracking-wider">Entreprise</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono text-[12px] text-gray-500">{userId ? `${userId.slice(0, 8)}…` : '—'}</span>
                    </td>
                    <td className="px-6 py-5 max-w-sm">
                      <span className="text-[13px] text-gray-600 line-clamp-1">{lastTurn?.text || '—'}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-600 text-[13px]">{conv.turns?.length || 0}</span>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#0E172C]">
                      {new Date(conv.started_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/dashboard/conversations/${conv.id}`}
                        className="inline-flex items-center gap-1 text-[#1D5FE1] font-bold text-[13px] hover:underline"
                      >
                        Voir <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {(!conversations || conversations.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucune conversation pour l&apos;instant.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
