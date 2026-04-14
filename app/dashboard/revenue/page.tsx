import { 
  Search, Bell, HelpCircle, Wallet, Box, FileBadge as Fingerprint, 
  TrendingUp, TrendingDown, Lightbulb, Download, BarChart2
} from 'lucide-react'

// Mock Data representing the 12 months in the image
const chartData = [
  { month: 'JAN', value: 45 },
  { month: 'FÉV', value: 65 },
  { month: 'MAR', value: 55 },
  { month: 'AVR', value: 85 },
  { month: 'MAI', value: 75 },
  { month: 'JUIN', value: 95 },
  { month: 'JUIL', value: 88 },
  { month: 'AOÛT', value: 124, active: true },
  { month: 'SEP', value: 75 },
  { month: 'OCT', value: 90 },
  { month: 'NOV', value: 80 },
  { month: 'DÉC', value: 105 },
]

export default function RevenuePage() {
  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none mb-2">Suivi du Chiffre d'Affaires</h1>
          <p className="text-[14px] font-medium text-gray-400">Analyse financière en temps réel</p>
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
                <span className="text-[14px] font-bold text-[#0E172C]">Alexandre D.</span>
                <span className="text-[12px] font-medium text-gray-400">super admin</span>
              </div>
              <div className="w-[42px] h-[42px] rounded-full bg-[#10B981] overflow-hidden border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                {/* For mock just put a generic colored circle matching the image profile icon shape */}
                <div className="w-full h-full bg-[#10B981] flex items-end justify-center pt-2">
                   <div className="w-6 h-6 rounded-t-full bg-black/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Total Revenue Card */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-[1rem] bg-[#1D5FE1] flex items-center justify-center text-white mb-6 shadow-sm">
              <Wallet className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Chiffre d'affaires total</span>
            <span className="text-[44px] font-bold text-[#0E172C] font-outfit leading-none tracking-tight block">1,284,000 €</span>
          </div>
          <div className="flex items-center gap-2 mt-4 text-[#10B981]">
            <TrendingUp className="w-4 h-4 stroke-[3]" />
            <span className="text-[13px] font-bold">+12.4% <span className="text-gray-400 font-medium">Vs Mois Dernier</span></span>
          </div>
        </div>

        {/* Right side metrics & growth target */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 content-between">
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-full">
            <div className="w-11 h-11 rounded-[0.8rem] bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] mb-5">
              <Box className="w-[20px] h-[20px] stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Part Kôji (Platform)</span>
            <span className="text-[32px] font-bold text-[#0E172C] font-outfit leading-none tracking-tight block mb-4">321,000 €</span>
            <div className="flex items-center gap-1.5 text-[#10B981] mt-auto">
              <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />
              <span className="text-[12px] font-bold tracking-wide">8.2%</span>
            </div>
          </div>
          
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-full">
            <div className="w-11 h-11 rounded-[0.8rem] bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] mb-5">
              <Fingerprint className="w-[20px] h-[20px] stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">ARPU (Moyen)</span>
            <span className="text-[32px] font-bold text-[#0E172C] font-outfit leading-none tracking-tight block mb-4">142.50 €</span>
            <div className="mt-auto flex items-center">
              <div className="inline-flex items-center gap-1.5 bg-[#1D5FE1] text-white px-2.5 py-1 rounded-full">
                <TrendingDown className="w-3 h-3 stroke-[3]" />
                <span className="text-[11px] font-bold tracking-widest">2.1%</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#1D5FE1] rounded-[1.2rem] p-6 shadow-lg flex items-center justify-between text-white mt-1">
            <div>
              <h3 className="font-bold text-[17px] mb-1 font-outfit">Objectif de Croissance Q4</h3>
              <p className="text-[13px] text-blue-100 font-medium">Nous sommes à 82% de l'objectif trimestriel</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-xl px-6 py-2.5 transition-colors text-[13px] shadow-sm whitespace-nowrap">
              Continuer l'analyse
            </button>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10">
          <div>
            <h3 className="font-bold text-[22px] text-[#0E172C] mb-1.5 font-outfit tracking-tight">Évolution Temporelle</h3>
            <p className="text-[13px] text-gray-500 font-medium tracking-wide">Revenus globaux vs commissions plateforme sur les 12 derniers mois.</p>
          </div>
          <div className="flex items-center gap-1 mt-4 md:mt-0 bg-gray-50/80 p-1.5 rounded-[1rem] border border-gray-100">
            <button className="px-5 py-2 bg-white text-[#1D5FE1] rounded-[0.8rem] text-[12px] font-bold shadow-sm border border-gray-100/50">Mensuel</button>
            <button className="px-5 py-2 text-gray-500 hover:text-gray-700 rounded-[0.8rem] text-[12px] font-bold transition-colors">Hebdomadaire</button>
          </div>
        </div>

        <div className="relative h-[280px] flex items-end justify-between gap-1.5 md:gap-4 px-2 md:px-6">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end group">
              {data.active && (
                <div className="absolute -top-12 bg-white border border-[#1D5FE1]/20 shadow-[0_4px_12px_rgb(29,95,225,0.12)] rounded-[0.6rem] px-3.5 py-1.5 z-10 hidden md:block">
                  <span className="text-[12px] font-bold text-[#1D5FE1]">124k €</span>
                </div>
              )}
              <div 
                className={`w-full max-w-[54px] rounded-t-[6px] transition-all duration-300 ${data.active ? 'bg-[#1D5FE1]' : 'bg-[#1b62f8]/30 hover:bg-[#1b62f8]/45'}`} 
                style={{ height: `${data.value}%` }} 
              />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5 px-1 pt-1">
            <h3 className="font-bold text-[18px] text-[#0E172C] font-outfit">Comptes Top Performance</h3>
            <a href="#" className="font-bold text-[#1D5FE1] text-[13px] hover:underline">Voir tout</a>
          </div>
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="bg-white rounded-[1.2rem] px-6 py-5 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-[#1D5FE1]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] font-bold text-[14px]">
                  MB
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[15px]">Maison Bleue r. .A.</h4>
                  <p className="text-[12px] font-medium text-gray-400 mt-0.5 tracking-wide">Retail • Lyon, FR</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#0E172C] text-[16px] font-outfit mb-0.5">42,500 €</div>
                <div className="text-[11px] font-bold text-[#10B981] tracking-wider uppercase">+18.5% CA</div>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="bg-white rounded-[1.2rem] px-6 py-5 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-[#1D5FE1]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] font-bold text-[14px]">
                  TL
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[15px]">TechLogistics Corp</h4>
                  <p className="text-[12px] font-medium text-gray-400 mt-0.5 tracking-wide">B2B SaaS • Paris, FR</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#0E172C] text-[16px] font-outfit mb-0.5">38,120 €</div>
                <div className="text-[11px] font-bold text-[#10B981] tracking-wider uppercase">+5.2% CA</div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="bg-white rounded-[1.2rem] px-6 py-5 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between group hover:border-[#1D5FE1]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] font-bold text-[14px]">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[15px]">Atelier Design Int.</h4>
                  <p className="text-[12px] font-medium text-gray-400 mt-0.5 tracking-wide">Creative • Marseille, FR</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#0E172C] text-[16px] font-outfit mb-0.5">29,400 €</div>
                <div className="text-[11px] font-bold text-[#D93036] tracking-wider uppercase">-1.4% CA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 rounded-[1.5rem] p-8 border border-gray-100 flex flex-col h-full mt-2 lg:mt-0">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-5 h-5 text-[#0E172C]" />
            <h3 className="font-bold text-[18px] text-[#0E172C] font-outfit">Aperçus Pro</h3>
          </div>
          
          <div className="mb-8">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">Observation</span>
            <p className="text-[13px] text-gray-600 font-medium leading-relaxed tracking-wide">
              Les revenus des comptes <span className="text-[#1D5FE1] font-bold">Retail</span> ont augmenté de 24% ce mois-ci, portés par la nouvelle tarification Premium.
            </p>
          </div>

          <div className="mb-10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">Recommandation</span>
            <p className="text-[13px] text-gray-600 font-medium leading-relaxed tracking-wide">
              Envisagez une campagne de "upselling" pour les clients en milieu de gamme avant la fin du trimestre.
            </p>
          </div>

          <div className="mt-auto pt-4">
            <button className="w-full bg-white hover:bg-gray-50 text-[#0E172C] border border-gray-200 px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-[13px]">
              Générer Rapport PDF
              <Download className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
