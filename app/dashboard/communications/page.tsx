import { 
  Search, Bell, HelpCircle, Sparkles, CheckCircle2,
  Clock, Edit2, Send, Paperclip, LayoutTemplate, 
  History, Users, Plus, Mail
} from 'lucide-react'

export default function CommunicationsPage() {
  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none">Gestion des Emails</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
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

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-[#0E172C] mb-1 font-outfit tracking-tight">Emails Automatisés</h2>
          <p className="text-[13px] font-medium text-gray-500 tracking-wide">
            Gérez les flux transactionnels et les notifications système.
          </p>
        </div>
        <button className="bg-[#1b62f8] hover:bg-[#1753d1] text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all text-[13px]">
          <Plus className="w-4 h-4 stroke-[3]" />
          Nouveau Modèle
        </button>
      </div>

      {/* Cards 3 col */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                <Sparkles className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Actif</span>
            </div>
            <h3 className="font-bold text-[#0E172C] text-[16px] mb-2 font-outfit">Welcome Email</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              Envoyé immédiatement après l'inscription d'un nouvel utilisateur.
            </p>
          </div>
          <div className="flex items-center justify-between mt-8 border-t border-gray-50 pt-4">
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">Dernière modif: 12 Oct</span>
            <button className="text-[#1D5FE1] font-bold text-[12px] flex items-center gap-1.5 hover:text-blue-800 transition-colors">
              Modifier le contenu
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1] relative">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Actif</span>
            </div>
            <h3 className="font-bold text-[#0E172C] text-[16px] mb-2 font-outfit">Confirmation</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              Email de confirmation d'achat ou de souscription à un tarif.
            </p>
          </div>
          <div className="flex items-center justify-between mt-8 border-t border-gray-50 pt-4">
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">Dernière modif: Hier</span>
            <button className="text-[#1D5FE1] font-bold text-[12px] flex items-center gap-1.5 hover:text-blue-800 transition-colors">
              Modifier le contenu
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                <Bell className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Brouillon</span>
            </div>
            <h3 className="font-bold text-[#0E172C] text-[16px] mb-2 font-outfit">Notifications</h3>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              Alertes d'activité pour les commentaires ou les tags éditoriaux.
            </p>
          </div>
          <div className="flex items-center justify-between mt-8 border-t border-gray-50 pt-4">
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">Modifié par: Marie L.</span>
            <button className="text-[#1D5FE1] font-bold text-[12px] flex items-center gap-1.5 hover:text-blue-800 transition-colors">
              Modifier le contenu
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expert Tip Blue Banner */}
      <div className="bg-[#1b62f8] bg-gradient-to-r from-[#1753d1] to-[#2573ff] rounded-[1.5rem] p-8 md:p-10 shadow-lg text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-6 backdrop-blur-sm shadow-sm">
            Expert Tip
          </div>
          <h3 className="text-[26px] md:text-[32px] font-bold leading-tight mb-4 tracking-tight shadow-sm font-outfit">
            Améliorez votre Taux d'Ouverture
          </h3>
          <p className="text-[14px] text-blue-50 leading-relaxed font-medium backdrop-blur-sm max-w-lg shadow-sm">
            Les emails envoyés le mardi à 10h00 enregistrent un taux d'engagement 15% 
            supérieur. Essayez de programmer vos annonces importantes durant ce créneau.
          </p>
        </div>
        <div className="relative z-10 bg-white/10 p-6 rounded-[1.2rem] backdrop-blur-md border border-white/20 text-center flex flex-col items-center mt-8 md:mt-0 shadow-lg min-w-[200px]">
          <span className="text-[36px] font-bold font-outfit leading-none mb-1 shadow-sm">+24%</span>
          <span className="text-[10px] font-extrabold text-blue-100 tracking-widest uppercase mb-5 leading-tight">Croissance<br/>Hebdomadaire</span>
          <button className="bg-white text-[#1D5FE1] hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold text-[13px] shadow-sm transition-colors w-full">
            Voir Stats
          </button>
        </div>
        {/* Abstract shapes */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Bottom Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Envoi Manuel & Ciblé */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <Send className="w-7 h-7 text-[#1D5FE1]" />
            <h3 className="font-bold text-[22px] text-[#0E172C] font-outfit tracking-tight">Envoi Manuel & Ciblé</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col relative">
              <label className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2">Destinataire(s)</label>
              <input type="text" placeholder="Utilisateur, Segment ou Email..." className="w-full px-5 py-3.5 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl text-[14px] text-gray-900 placeholder-gray-400 outline-none transition-all" />
              <Search className="w-4 h-4 text-gray-400 absolute right-4 top-[38px]" />
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2">Objet de l'email</label>
              <input type="text" placeholder="L'objet de votre message..." className="w-full px-5 py-3.5 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl text-[14px] text-gray-900 placeholder-gray-400 outline-none transition-all" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">Message</label>
              <div className="flex items-center gap-4">
                <button className="text-[11px] font-bold text-[#1D5FE1] flex items-center gap-1.5 uppercase tracking-wide hover:text-blue-800 transition-colors">
                  <Paperclip className="w-3 h-3" /> Joindre
                </button>
                <button className="text-[11px] font-bold text-[#1D5FE1] flex items-center gap-1.5 uppercase tracking-wide hover:text-blue-800 transition-colors">
                  <LayoutTemplate className="w-3 h-3" /> Modèle
                </button>
              </div>
            </div>
            <textarea placeholder="Écrivez votre message ici..." className="w-full h-full min-h-[160px] p-5 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl text-[14px] text-gray-900 placeholder-gray-400 outline-none transition-all resize-none"></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 mt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="user" className="w-full h-full object-cover"/>
                 </div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                   <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Annie" alt="user" className="w-full h-full object-cover"/>
                 </div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F0F4FF] flex items-center justify-center shadow-sm">
                   <span className="text-[10px] font-bold text-[#1D5FE1]">+12</span>
                 </div>
              </div>
              <span className="text-[13px] text-gray-500 italic font-medium leading-tight">14 utilisateurs<br/>sélectionnés</span>
            </div>
            
            <div className="flex items-center justify-end gap-3 w-full md:w-auto">
              <button className="px-5 py-3 text-gray-500 font-bold text-[14px] hover:bg-gray-50 rounded-xl transition-colors">
                Enregistrer Brouillon
              </button>
              <button className="bg-[#1b62f8] hover:bg-[#1753d1] text-white px-8 py-3.5 rounded-[0.8rem] font-bold shadow-lg shadow-blue-500/20 transition-all text-[14px] flexItems-center">
                Envoyer Maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebars */}
        <div className="space-y-6 flex flex-col">
          {/* Segments Rapides */}
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-5">Segments Rapides</h3>
            <div className="space-y-3">
              <div className="bg-[#FAFAFA] hover:bg-[#F3F4F6] p-4 rounded-xl flex items-center gap-4 transition-colors cursor-pointer border border-gray-50">
                <div className="w-10 h-10 rounded-full bg-[#f1edfb] flex items-center justify-center text-[#9370DB]">
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[14px]">Tous les Utilisateurs</h4>
                  <p className="text-[12px] font-medium text-gray-500">1,240 membres</p>
                </div>
              </div>
              <div className="bg-[#FAFAFA] hover:bg-[#F3F4F6] p-4 rounded-xl flex items-center gap-4 transition-colors cursor-pointer border border-gray-50">
                <div className="w-10 h-10 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#F59E0B]">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[14px]">Inactifs (+30j)</h4>
                  <p className="text-[12px] font-medium text-gray-500">452 membres</p>
                </div>
              </div>
              <div className="bg-[#FAFAFA] hover:bg-[#F3F4F6] p-4 rounded-xl flex items-center gap-4 transition-colors cursor-pointer border border-gray-50">
                <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#10B981]">
                  <Edit2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0E172C] text-[14px]">Contributeurs Actifs</h4>
                  <p className="text-[12px] font-medium text-gray-500">89 membres</p>
                </div>
              </div>
            </div>
          </div>

          {/* Historique Récent */}
          <div className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex-1">
            <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-5">Historique Récent</h3>
            <div className="space-y-5">
              <div className="flex items-start justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-sm"></div>
                  <div>
                    <h4 className="font-bold text-[#0E172C] text-[13px] group-hover:text-[#1D5FE1] transition-colors">Mise à jour CGU</h4>
                    <p className="text-[11px] font-medium text-gray-400">Envoyé il y a 2h • 98% délivré</p>
                  </div>
                </div>
                <div className="text-gray-300">›</div>
              </div>
              <div className="flex items-start justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-sm"></div>
                  <div>
                    <h4 className="font-bold text-[#0E172C] text-[13px] group-hover:text-[#1D5FE1] transition-colors">Offre Early Bird</h4>
                    <p className="text-[11px] font-medium text-gray-400">Envoyé hier • 92% délivré</p>
                  </div>
                </div>
                <div className="text-gray-300">›</div>
              </div>
              <div className="flex items-start justify-between group cursor-pointer opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-sm"></div>
                  <div>
                    <h4 className="font-bold text-[#0E172C] text-[13px] group-hover:text-[#1D5FE1] transition-colors">Rappel de maintenance</h4>
                    <p className="text-[11px] font-medium text-gray-400">Envoyé 10 Oct • 85% lu</p>
                  </div>
                </div>
                <div className="text-gray-300">›</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
