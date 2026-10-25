import { Sparkles, CheckCircle2, Bell, Megaphone } from 'lucide-react'

// Refonte maquette (25 oct) — page toujours statique (aucune donnee reelle,
// aucun envoi d'email branche ici), juste redessinee pour coller a
// l'artboard AdminCommunications.dc.html. Memes textes/chiffres que la
// version precedente (eux-memes deja factices dans la version d'origine).
const TEMPLATES = [
  { icon: Sparkles, title: 'E-mail de bienvenue', desc: "Envoyé après l'inscription d'un nouvel utilisateur.", status: 'Actif', updated: 'Modifié le 12 oct.' },
  { icon: CheckCircle2, title: 'Devis signé', desc: 'Confirmation envoyée à l’artisan et au client.', status: 'Actif', updated: 'Modifié hier' },
  { icon: Bell, title: 'Notifications', desc: 'Alertes sur les devis, messages et relances.', status: 'Brouillon', updated: 'Modifié par un admin' },
]

const SEGMENTS = [
  { icon: Megaphone, label: 'Tous les utilisateurs', sub: '1 240 membres' },
  { icon: Bell, label: 'Inactifs (+30 j)', sub: '452 membres' },
  { icon: Sparkles, label: 'Entreprises Pro', sub: '89 membres' },
]

const HISTORY = [
  { label: 'Mise à jour des CGU', sub: 'Envoyé il y a 2 h · 98 % délivré', dot: '#1E8E5A' },
  { label: 'Offre de lancement', sub: 'Envoyé hier · 92 % délivré', dot: '#1E8E5A' },
  { label: 'Rappel de maintenance', sub: 'Envoyé le 10 oct. · 85 % lu', dot: '#E0A44A' },
]

export default function CommunicationsPage() {
  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#16233F] tracking-tight">Communications</h1>
          <p className="text-[14px] text-gray-500 mt-1">Gérez les e-mails automatiques et les envois ciblés.</p>
        </div>
        <button className="h-11 px-5 rounded-xl bg-[#16233F] text-white text-[14px] font-bold">+ Nouveau modèle</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.title} className="bg-white border border-[#EDEDF3] rounded-[18px] p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-[11px] bg-[#EDEFFB] flex items-center justify-center">
                <tpl.icon className="w-[19px] h-[19px] text-[#16233F]" strokeWidth={1.8} />
              </div>
              <span className={`text-[12px] font-bold px-3 py-1 rounded-xl whitespace-nowrap ${tpl.status === 'Actif' ? 'bg-[#E6F5EE] text-[#1E8E5A]' : 'bg-[#F0F1F5] text-gray-500'}`}>
                {tpl.status}
              </span>
            </div>
            <div className="text-[16px] font-extrabold text-[#16233F]">{tpl.title}</div>
            <div className="text-[13.5px] text-gray-500 leading-relaxed min-h-[40px]">{tpl.desc}</div>
            <div className="flex items-center justify-between pt-2.5 border-t border-[#F1F2F6]">
              <span className="text-[12.5px] text-gray-400">{tpl.updated}</span>
              <button className="text-[13.5px] font-bold text-[#3B5BDB]">Modifier le contenu</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-5 items-start">
        <div className="flex-[1.7] min-w-0 bg-white border border-[#EDEDF3] rounded-[18px] p-6 flex flex-col gap-4">
          <span className="text-[16px] font-extrabold text-[#16233F]">Envoi manuel et ciblé</span>
          <div className="flex gap-3.5">
            <label className="flex-1 min-w-0 flex flex-col gap-1.5">
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Destinataires</span>
              <input className="h-[46px] rounded-xl border border-[#E5E5EC] bg-[#FBFBFD] px-3.5 text-[14.5px] outline-none" placeholder="Utilisateur, segment ou e-mail…" />
            </label>
            <label className="flex-1 min-w-0 flex flex-col gap-1.5">
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Objet</span>
              <input className="h-[46px] rounded-xl border border-[#E5E5EC] bg-[#FBFBFD] px-3.5 text-[14.5px] outline-none" placeholder="L’objet de votre message…" />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Message</span>
            <textarea className="h-[150px] rounded-xl border border-[#E5E5EC] bg-[#FBFBFD] p-3.5 text-[14px] outline-none resize-none" placeholder="Écrivez votre message ici…" />
          </label>
          <div className="flex items-center gap-3.5">
            <span className="flex-1 text-[13.5px] text-gray-500">14 utilisateurs sélectionnés</span>
            <button className="h-11 px-5 rounded-xl border border-[#DADDE6] bg-white text-[#16233F] text-[14px] font-bold">Enregistrer le brouillon</button>
            <button className="h-11 px-5 rounded-xl bg-[#16233F] text-white text-[14px] font-bold">Envoyer maintenant</button>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="bg-white border border-[#EDEDF3] rounded-[18px] p-6 flex flex-col gap-3">
            <span className="text-[16px] font-extrabold text-[#16233F]">Segments rapides</span>
            {SEGMENTS.map((seg) => (
              <div key={seg.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F7FB]">
                <div className="w-[38px] h-[38px] rounded-[11px] bg-[#EDEFFB] flex items-center justify-center shrink-0">
                  <seg.icon className="w-[19px] h-[19px] text-[#16233F]" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1E2430] truncate">{seg.label}</div>
                  <div className="text-[12.5px] text-gray-500 mt-0.5 truncate">{seg.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#EDEDF3] rounded-[18px] p-6 flex flex-col gap-1">
            <span className="text-[16px] font-extrabold text-[#16233F] mb-2">Historique récent</span>
            {HISTORY.map((item, idx) => (
              <div key={item.label} className={`flex items-center gap-3 py-2.5 ${idx < HISTORY.length - 1 ? 'border-b border-[#F4F4F8]' : ''}`}>
                <span className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: item.dot }} />
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1E2430] truncate">{item.label}</div>
                  <div className="text-[12.5px] text-gray-500 mt-0.5 truncate">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
