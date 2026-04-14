import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Search, Bell, HelpCircle, MoreVertical, CheckCircle2, Clock, UserPlus } from 'lucide-react'

export default async function UsersPage() {
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

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit">Gestion des Utilisateurs</h1>
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

      {/* Main Table Structure */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100/80">
              <tr>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Détails utilisateur</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Profession</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Infos entreprise</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date d'inscription</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <div className="h-11 w-11 rounded-full bg-[#F0F4FF] border border-blue-100 flex items-center justify-center text-[#1D5FE1] font-bold text-[15px] shadow-sm">
                          {user.email?.[0].toUpperCase()}
                        </div>
                        {/* Status Dot */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-[2px] border-white rounded-full shadow-sm"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0E172C] text-[14px]">{(user as any).first_name ? `${(user as any).first_name} ${(user as any).last_name}` : user.email.split('@')[0]}</span>
                        <span className="text-[13px] font-medium text-gray-400 mt-0.5">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-gray-600 text-[13px]">{user.profession || "Client Particulier"}</span>
                  </td>
                  <td className="px-6 py-5">
                    {user.is_pro ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#F0F4FF] text-[#1D5FE1] uppercase tracking-wider">
                        Pro
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#F3F4F6] text-gray-500 uppercase tracking-wider">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {user.business_info ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-600 text-[13px]">
                          {(user.business_info as any)?.companyName || 'Unknown Corp'}
                        </span>
                        {(user.business_info as any)?.siret && (
                          <span className="text-[11px] text-gray-400 font-medium tracking-wide mt-0.5 uppercase">
                            SIRET: {(user.business_info as any)?.siret}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 font-semibold text-[13px]">Non applicable</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-[13px] font-bold text-[#0E172C]">
                    {new Date(user.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-5 text-right flex justify-end">
                    <button className="text-gray-400 hover:text-[#1D5FE1] transition-colors p-1.5 rounded-lg hover:bg-blue-50 focus:outline-none">
                      <MoreVertical className="w-[18px] h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
          <span className="text-[13px] font-medium text-gray-500">
            Affichage de <span className="font-bold text-[#0E172C]">1 à 10</span> sur <span className="font-bold text-[#0E172C]">{users?.length || 0}</span> résultats
          </span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors font-medium">{'<'}</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1D5FE1] text-white font-bold transition-shadow shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors font-medium">{'>'}</button>
          </div>
        </div>
      </div>

      {/* Bottom Section (Conseil Pro + Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1D5FE1] rounded-[1.5rem] p-10 shadow-lg text-white relative overflow-hidden flex flex-col justify-center min-h-[280px]">
          <div className="relative z-10 w-full max-w-lg">
            <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-[11px] font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
              Conseil Pro
            </div>
            <h3 className="text-[28px] font-bold font-outfit leading-tight mb-4 tracking-tight">Optimisez votre gestion de base.</h3>
            <p className="text-[15px] text-blue-100 leading-relaxed font-medium mb-8">
              Utilisez les filtres avancés pour identifier les comptes professionnels inactifs depuis plus de 30 jours et relancez-les avec un devis personnalisé.
            </p>
            <button className="bg-white text-[#1D5FE1] font-bold rounded-xl px-6 py-3.5 shadow-sm hover:bg-gray-50 transition-colors text-[14px]">
              Voir les statistiques
            </button>
          </div>
          {/* Decorative Elements */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none translate-x-1/4">
             <div className="w-48 h-64 rounded-full bg-blue-300 blur-3xl"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                <CheckCircle2 className="w-[22px] h-[22px] stroke-[2]" />
              </div>
              <span className="text-[12px] font-bold text-[#10B981]">+12%</span>
            </div>
            <div className="mt-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Vérifiés</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none">14</span>
                <span className="text-[14px] font-bold text-gray-400">/ 18</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                <Clock className="w-[22px] h-[22px] stroke-[2]" />
              </div>
              <span className="text-[12px] font-bold text-gray-400">Stable</span>
            </div>
            <div className="mt-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Actifs (24h)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Add Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="bg-[#1D5FE1] hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 font-bold px-6 py-4 rounded-full flex items-center gap-3 transition-all hover:scale-105">
          <UserPlus className="w-5 h-5" />
          Ajouter un utilisateur
        </button>
      </div>

    </div>
  )
}
