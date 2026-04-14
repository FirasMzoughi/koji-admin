import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { 
  Search, Bell, HelpCircle, MoreHorizontal, TrendingUp, Filter, Sparkles 
} from 'lucide-react'

export default async function QuotesPage() {
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

  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepte':
      case 'accepted':
      case 'signed':
      case 'signé':
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#10B981] capitalize tracking-wide">
            Signé
          </span>
        )
      case 'refuse':
      case 'rejected':
      case 'refusé':
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#F3F4F6] text-gray-500 capitalize tracking-wide">
            Refusé
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F4FF] text-[#1D5FE1] capitalize tracking-wide">
            En attente
          </span>
        )
    }
  }

  const getInitials = (name: string) => {
    if (!name) return '?'
    const parts = name.split(' ')
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
  }

  const getAvatarColors = (name: string) => {
    if (!name) return 'bg-[#F0F4FF] text-[#1D5FE1]'
    const char = name.charCodeAt(0)
    if (char % 3 === 0) return 'bg-[#ECFDF5] text-[#10B981]' // Green tinted
    if (char % 3 === 1) return 'bg-[#F3F4F6] text-gray-600' // Grey tinted
    return 'bg-[#F0F4FF] text-[#1D5FE1]' // Blue tinted
  }

  // Calculate total volume (assuming we sum all, or just signed/pending depending on business logic. The image says 'volume total', we'll sum all for now)
  const totalVolume = quotes?.reduce((sum, q) => sum + Number(q.total_amount || 0), 0) || 0

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit">Gestion des Devis</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur..." 
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
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center gap-3 ml-2">
              <div className="flex flex-col text-right hidden lg:flex">
                <span className="text-[14px] font-bold text-[#0E172C]">Marc-Antoine</span>
                <span className="text-[12px] font-medium text-gray-400">Administrateur Senior</span>
              </div>
              <div className="w-[42px] h-[42px] rounded-full bg-[#10B981] overflow-hidden border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">MA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-[32px] font-bold text-[#0E172C] font-outfit mb-1 leading-none">Devis</h2>
            <p className="text-[15px] font-medium text-gray-500 mt-2">
              <span className="text-[#1D5FE1] font-bold">{quotes?.length || 0}</span> devis au total cette année
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[46px] h-[46px] rounded-full bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">volume total</span>
              <span className="text-[22px] font-bold text-[#0E172C] font-outfit leading-none mt-1">
                {totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(/,/g, ' ')} €
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mt-10 mb-6">
          <div className="flex items-center flex-wrap gap-2">
            <button className="px-6 py-2 rounded-full bg-[#1D5FE1] text-white text-[13px] font-bold shadow-md shadow-blue-500/20 transition-all">Tous</button>
            <button className="px-6 py-2 rounded-full text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-bold transition-all">En attente</button>
            <button className="px-6 py-2 rounded-full text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-bold transition-all">Signé</button>
            <button className="px-6 py-2 rounded-full text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-bold transition-all">Refusé</button>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-[13px] transition-colors">
            <Filter className="w-4 h-4" />
            Filtrer par date
          </button>
        </div>

        {/* Main Table Structure */}
        <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white border-b border-gray-100/80">
                <tr>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date d'émission</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date de signature</th>
                  <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes?.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`h-11 w-11 rounded-full border border-gray-100 flex items-center justify-center font-bold text-[13px] shadow-sm tracking-wider ${getAvatarColors(quote.client_name)}`}>
                          {getInitials(quote.client_name || 'Prospect')}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0E172C] text-[14px]">{quote.client_name || 'Nouveau Prospect'}</span>
                          <span className="text-[13px] font-medium text-gray-400 mt-0.5">{quote.client_email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-[#0E172C] text-[14px]">
                        {Number(quote.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(/,/g, ' ')} €
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="px-6 py-5 text-[13px] font-semibold text-gray-500">
                      {new Date(quote.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-5 text-[13px] font-semibold text-gray-500">
                      {quote.signed_at
                        ? new Date(quote.signed_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })
                        : '—'}
                    </td>
                    <td className="px-6 py-5 text-right flex justify-end">
                      <button className="text-gray-400 hover:text-[#1D5FE1] transition-colors p-1.5 rounded-lg hover:bg-blue-50 focus:outline-none">
                        <MoreHorizontal className="w-[18px] h-[18px]" />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!quotes || quotes.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Aucun devis trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <span className="text-[13px] font-medium text-gray-500">
              Affichage de <span className="font-bold text-[#0E172C]">1 à 4</span> sur <span className="font-bold text-[#0E172C]">{quotes?.length || 0}</span> devis
            </span>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors font-medium">{'<'}</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1D5FE1] text-white font-bold transition-shadow shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors font-bold">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors font-bold">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors font-medium">{'>'}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Conversion Tip + AI Assistant) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Left Card: Optimisez votre taux de conversion */}
        <div className="lg:col-span-2 bg-[#1b62f8] bg-gradient-to-r from-[#1753d1] to-[#2573ff] rounded-[1.5rem] p-10 shadow-lg text-white relative overflow-hidden flex flex-col justify-center min-h-[260px]">
          <div className="relative z-10 w-full max-w-lg">
            <h3 className="text-[26px] font-bold leading-tight mb-4 tracking-tight text-white shadow-sm">Optimisez votre taux de conversion</h3>
            <p className="text-[15px] text-blue-50 leading-relaxed font-medium mb-8 bg-blue-900/10 p-2 rounded-xl backdrop-blur-sm -ml-2">
              Les devis envoyés avec une description détaillée ont 40% de<br/>
              chances en plus d'être signés dans les 48 heures.
            </p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-xl px-7 py-3 transition-colors text-[14px] shadow-sm border border-white/10">
              Voir les conseils
            </button>
          </div>
        </div>

        {/* Right Card: Assistant intelligent */}
        <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center space-y-5">
          <div className="w-[52px] h-[52px] rounded-2xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
            <Sparkles className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#0E172C] mb-2 tracking-tight">Assistant intelligent</h3>
            <p className="text-[13px] font-medium text-gray-500 leading-relaxed px-2">
              Laissez l'IA générer vos montants basés sur vos prestations passées.
            </p>
          </div>
          <button className="text-[#1D5FE1] hover:text-blue-800 font-bold text-[14px] transition-colors pt-2">
            Activer l'assistant
          </button>
        </div>
      </div>

    </div>
  )
}
