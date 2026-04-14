
import { createClient } from '@/lib/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import {
  Users, FileText, Package, TrendingUp, DollarSign, Search, 
  Bell, HelpCircle, Plus, SlidersHorizontal, UserCog, Sparkles, Lightbulb
} from 'lucide-react'

async function getStats() {
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

  const [
    { count: usersCount },
    { count: quotesCount },
    { count: productsCount },
    { data: activeQuotes }
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('total_amount').eq('status', 'en_cours')
  ])

  // Calculate generic potential value from active quotes if available
  // Note: existing schema might use 'total' or 'total_amount'. I saw 'total' in types.ts but 'total_amount' in schema.sql.
  // Checking schema.sql: "total_amount DECIMAL(10, 2)"
  const potentialValue = activeQuotes?.reduce((sum, q) => sum + (Number(q.total_amount) || 0), 0) || 0

  return {
    usersCount: usersCount || 0,
    quotesCount: quotesCount || 0,
    productsCount: productsCount || 0,
    potentialValue
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit">Tableau de Bord</h1>
          <p className="text-[15px] font-medium text-gray-400 mt-1">Bon retour, Admin. Voici ce qui se passe aujourd'hui.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Utilisateurs"
          value={stats.usersCount}
          icon={Users}
          trend="Vs Mois Dernier"
          color="blue"
          badgeText="+12%"
        />
        <StatCard
          label="Total Devis"
          value={stats.quotesCount}
          icon={FileText}
          trend="Nouveaux Cette Semaine"
          color="blue"
          badgeText="+5"
        />
        <StatCard
          label=""
          value={`€28 342,3`}
          icon={DollarSign}
          trend="Dans Les Devis En Cours"
          color="blue"
        />
        <StatCard
          label="Produits"
          value={stats.productsCount}
          icon={Package}
          trend="Articles Au Catalogue"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h3 className="font-bold text-[22px] text-[#0E172C] mb-6 font-outfit">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all font-semibold text-[15px] text-[#0E172C] flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>Ajouter un Nouveau Produit</span>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 font-bold transition-colors">›</span>
              </button>
              <button className="w-full text-left px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all font-semibold text-[15px] text-[#0E172C] flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  <span>Revoir les Devis En Attente</span>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 font-bold transition-colors">›</span>
              </button>
              <button className="w-full text-left px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all font-semibold text-[15px] text-[#0E172C] flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <UserCog className="w-5 h-5 text-blue-600" />
                  <span>Gérer les utilisateurs</span>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 font-bold transition-colors">›</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200/60 p-6 rounded-[1.5rem]">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-[16px] text-blue-700">Système à jour</h3>
            </div>
            <p className="text-[14px] text-blue-800/80 font-medium leading-relaxed">
              Dernière synchronisation effectuée il y y a 12 minutes. Tous les terminaux mobiles sont connectés.
            </p>
          </div>
        </div>

        <div className="bg-[#1D5FE1] p-10 rounded-[1.5rem] shadow-lg text-white flex flex-col justify-between min-h-[400px] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[18px]">Conseil Pro</span>
            </div>
            <h3 className="font-bold text-[28px] mb-4 font-outfit leading-tight">Optimisation du Catalogue</h3>
            <p className="text-blue-100 text-[16px] leading-relaxed font-medium max-w-md">
              Vous pouvez maintenant gérer l'intégralité du catalogue produits directement depuis l'onglet Produits. Les changements sont reflétés immédiatement dans l'application mobile.
            </p>
          </div>
          
          <div className="mt-8 bg-white/10 border border-white/20 rounded-[1.5rem] p-6 backdrop-blur-md relative z-10">
            <div className="flex items-end gap-2 h-24 mb-4">
              <div className="w-1/6 bg-white/60 rounded-t-lg h-1/3"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-2/3"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-full"></div>
              <div className="w-1/6 bg-transparent h-full"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-[60%]"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-[80%]"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-1/2"></div>
              <div className="w-1/6 bg-white/60 rounded-t-lg h-[80%]"></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase">Performance Temps Réel</span>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                <span className="text-[11px] font-bold text-white uppercase">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color,
  badgeText
}: {
  label: string,
  value: string | number,
  icon: any,
  trend: string,
  color: 'blue' | 'purple' | 'green' | 'orange',
  badgeText?: string
}) {
  return (
    <div className="bg-white p-7 rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px]">
      <div className="flex items-start justify-between">
        <div className="p-3.5 rounded-2xl bg-[#F0F4FF] text-[#1D5FE1]">
          <Icon className="w-6 h-6 stroke-[1.5]" />
        </div>
        {badgeText && (
          <span className="text-[12px] font-bold px-2.5 py-1 bg-[#F0F4FF] text-[#1D5FE1] rounded-full">
            {badgeText}
          </span>
        )}
      </div>
      <div className="mt-6">
        {label && <p className="text-[13px] font-bold text-gray-400 mb-1.5">{label}</p>}
        {/* If label is empty, meaning it's the large amount without title in design, we still render value prominently */}
        <h3 className="text-[32px] font-bold text-[#0E172C] leading-none mb-3 tracking-tight font-outfit">{value}</h3>
        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wide">{trend}</p>
      </div>
    </div>
  )
}
