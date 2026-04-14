import { 
  Search, Bell, HelpCircle, Rocket, Zap, 
  Settings, Building2, Tag, Percent, History, 
  MoreVertical, Check, Plus, RefreshCw, Edit2
} from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none mb-2">Offres & Tarifs</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
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
                <div className="w-full h-full bg-[#10B981] flex items-end justify-center pt-2">
                   <div className="w-6 h-6 rounded-t-full bg-black/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div>
          <h2 className="text-[24px] font-bold text-[#1D5FE1] mb-1 font-outfit tracking-tight">Configurez votre Stratégie de Revenus</h2>
          <p className="text-[13px] font-medium text-gray-500 tracking-wide max-w-sm leading-relaxed">
            Gérez vos abonnements, les frais d'inscription et les offres promotionnelles depuis un centre de contrôle unique.
          </p>
        </div>
        <button className="bg-[#1b62f8] hover:bg-[#1753d1] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all text-[14px] md:mt-2">
          <Plus className="w-4 h-4 stroke-[3]" />
          Créer une Nouvelle Offre
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Pack 1 */}
        <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col h-[400px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
              <Rocket className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">Actif</span>
          </div>
          <h3 className="font-bold text-[#0E172C] text-[20px] font-outfit mb-1">Pack Découverte</h3>
          <p className="text-[13px] text-gray-500 font-medium mb-6">Idéal pour les créateurs débutants</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-[36px] font-outfit font-bold text-[#0E172C] leading-none">19,99€</span>
            <span className="text-[14px] font-bold text-gray-400 ml-1 block">/ mois</span>
          </div>

          <div className="space-y-3 mb-auto">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">500 Crédits Editoriaux</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">Support par Email 24h</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">Accès API Standard</span>
            </div>
          </div>

          <button className="w-full mt-6 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-[#0E172C] font-bold text-[14px] transition-colors flex items-center justify-center gap-2">
            <Edit2 className="w-4 h-4" /> Modifier les tarifs
          </button>
        </div>

        {/* Pack 2 */}
        <div className="bg-white rounded-[1.5rem] p-8 border-[2px] border-[#1D5FE1] shadow-xl shadow-blue-500/10 flex flex-col h-[400px] relative">
          <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-[#1D5FE1] shadow-[0_0_12px_rgb(29,95,225)]"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#1D5FE1] flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5 stroke-[2] fill-white" />
            </div>
          </div>
          <h3 className="font-bold text-[#0E172C] text-[20px] font-outfit mb-1">Pro Intelligence</h3>
          <p className="text-[13px] text-gray-500 font-medium mb-6">Pour les agences de contenu</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-[36px] font-outfit font-bold text-[#0E172C] leading-none">49,99€</span>
            <span className="text-[14px] font-bold text-gray-400 ml-1 block">/ mois</span>
          </div>

          <div className="space-y-3 mb-auto">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">2500 Crédits Editoriaux</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">Support Prioritaire 1h</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#1D5FE1] stroke-[3]" />
              <span className="text-[13px] font-medium text-[#0E172C]">Collaborateurs Illimités</span>
            </div>
          </div>

          <button className="w-full mt-6 py-3.5 rounded-xl bg-[#1D5FE1] hover:bg-blue-700 text-white font-bold text-[14px] shadow-sm transition-colors flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" /> Configurer l'offre
          </button>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <h3 className="text-[16px] font-bold text-[#0E172C] mb-5 font-outfit">Actions Rapides</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent">
                <div className="flex items-center gap-3 text-[#0E172C] font-bold text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                    <Tag className="w-4 h-4" />
                  </div>
                  Frais d'inscription
                </div>
                <div className="text-gray-300 group-hover:text-gray-600 font-bold">›</div>
              </div>
              <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent">
                <div className="flex items-center gap-3 text-[#0E172C] font-bold text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                    <Percent className="w-4 h-4" />
                  </div>
                  Codes Promotionnels
                </div>
                <div className="text-gray-300 group-hover:text-gray-600 font-bold">›</div>
              </div>
              <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent">
                <div className="flex items-center gap-3 text-[#0E172C] font-bold text-[14px]">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                    <History className="w-4 h-4" />
                  </div>
                  Historique des prix
                </div>
                <div className="text-gray-300 group-hover:text-gray-600 font-bold">›</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1b62f8] bg-gradient-to-br from-[#1753d1] to-[#2573ff] rounded-[1.5rem] p-7 shadow-lg text-white flex-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm border border-white/10">
                Conseil Expert
              </div>
              <h3 className="font-bold text-[18px] font-outfit mb-3">Optimisez vos<br/>Conversions</h3>
              <p className="text-[13px] text-blue-100 font-medium leading-relaxed max-w-[90%]">
                Les offres annuelles augmentent la rétention de 30%. Pensez à proposer une remise de 2 mois gratuits pour le paiement annuel.
              </p>
            </div>
            
            <div className="mt-8 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <RefreshCw className="w-4 h-4 text-white" />
                 <span className="text-[12px] font-bold text-white leading-tight">Activer l'Auto-<br/>Discount</span>
               </div>
               <div className="w-10 h-5 bg-white/30 rounded-full flex items-center px-1">
                 <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise solution banner and ARPU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="font-bold text-[#0E172C] text-[20px] font-outfit">Solutions Enterprise</h3>
            </div>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed mt-1">
              Personnalisez chaque aspect de l'expérience Koji pour vos besoins spécifiques à grande échelle. Facturation annuelle et SLA garantis.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="bg-[#F0F4FF] text-[#1D5FE1] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide">Statut: En négociation</span>
              <span className="bg-[#F0F4FF] text-[#1D5FE1] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide">9 Clients Actifs</span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
             <span className="text-[12px] font-bold text-gray-400 mb-1 uppercase tracking-widest">À Partir De</span>
             <span className="text-[32px] font-outfit font-bold text-[#0E172C] leading-none mb-5">Sur Devis</span>
             <button className="bg-[#1b62f8] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors text-[14px]">
               Gérer les contrats
             </button>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase block">ARPU Moyen</span>
            <span className="text-[11px] font-bold text-[#10B981] tracking-wider uppercase bg-[#ECFDF5] px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <div className="relative z-10">
            <span className="text-[36px] font-bold text-[#0E172C] font-outfit leading-none mb-1 block">34,50€</span>
          </div>
          <div className="w-full h-1 mt-6 bg-gray-100 rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-[#1b62f8] rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[18px] text-[#0E172C] font-outfit flex items-center gap-2">
            Catalogue des Offres Archivées
          </h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors border border-transparent"><History className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors border border-transparent"><MoreVertical className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Nom de l'Offre</th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Ancien Prix</th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Dernière Modif</th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Raison Archivage</th>
                <th className="px-5 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"><Rocket className="w-4 h-4" /></div>
                    <span className="font-bold text-[#0E172C] text-[14px]">Beta Classic Pack</span>
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-gray-600 text-[14px]">9,99€</td>
                <td className="px-5 py-5 text-gray-500 font-medium text-[13px]">12 Oct 2023</td>
                <td className="px-5 py-5">
                  <span className="bg-[#F0F4FF] text-[#1D5FE1] px-3 py-1 rounded-full text-[11px] font-bold">Fin de Beta</span>
                </td>
                <td className="px-5 py-5 text-right flex justify-end">
                  <button className="text-[#1D5FE1] font-bold text-[13px] hover:text-blue-800 transition-colors">Restaurer</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"><Tag className="w-4 h-4" /></div>
                    <span className="font-bold text-[#0E172C] text-[14px]">Promo Noël 2023</span>
                  </div>
                </td>
                <td className="px-5 py-5 font-bold text-gray-600 text-[14px]">14,99€</td>
                <td className="px-5 py-5 text-gray-500 font-medium text-[13px]">05 Jan 2024</td>
                <td className="px-5 py-5">
                  <span className="bg-[#F0F4FF] text-[#1D5FE1] px-3 py-1 rounded-full text-[11px] font-bold">Offre expirée</span>
                </td>
                <td className="px-5 py-5 text-right flex justify-end">
                  <button className="text-[#1D5FE1] font-bold text-[13px] hover:text-blue-800 transition-colors">Restaurer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
