import { Rocket, Zap, Tag, Percent, History } from 'lucide-react'

// Refonte maquette (25 oct) — page toujours statique (aucune donnee reelle,
// aucune ecriture branchee ici), juste redessinee pour coller a l'artboard
// AdminOffres.dc.html. Memes 2 offres/memes chiffres que la version
// precedente (deja factices dans la version d'origine).
export default function PricingPage() {
  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#16233F] tracking-tight">Offres &amp; Tarifs</h1>
          <p className="text-[14px] text-gray-500 mt-1">Gérez les abonnements, les frais d’inscription et les promotions.</p>
        </div>
        <button className="h-11 px-5 rounded-xl bg-[#16233F] text-white text-[14px] font-bold">+ Créer une offre</button>
      </div>

      <div className="flex gap-5 items-stretch">
        <div className="flex-1 min-w-0 bg-white border border-[#EDEDF3] rounded-[20px] p-6 flex flex-col gap-3.5">
          <div className="flex justify-between items-start">
            <span className="w-[46px] h-[46px] rounded-[13px] bg-[#EDEFFB] flex items-center justify-center">
              <Rocket className="w-[22px] h-[22px] text-[#16233F]" strokeWidth={1.8} />
            </span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-xl bg-[#E6F5EE] text-[#1E8E5A]">Actif</span>
          </div>
          <div>
            <div className="text-[20px] font-extrabold text-[#16233F]">Offre Découverte</div>
            <div className="text-[13.5px] text-gray-500 mt-0.5">Pour les artisans qui démarrent</div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[34px] font-extrabold text-[#16233F] tracking-tight">19,99 €</span>
            <span className="text-[14px] text-gray-500">/ mois</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-[14px] text-[#1E2430]">
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>20 devis assistés par l’IA / mois</li>
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>Support par e-mail sous 24 h</li>
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>Bibliothèque de prix koji</li>
          </ul>
          <div className="flex-1" />
          <button className="h-11 rounded-xl border border-[#DADDE6] bg-white text-[#16233F] text-[14px] font-bold">Modifier les tarifs</button>
        </div>

        <div className="flex-1 min-w-0 bg-white border-2 border-[#16233F] rounded-[20px] p-6 flex flex-col gap-3.5">
          <span className="w-[46px] h-[46px] rounded-[13px] bg-[#16233F] flex items-center justify-center">
            <Zap className="w-[22px] h-[22px] text-white" strokeWidth={1.8} />
          </span>
          <div>
            <div className="text-[20px] font-extrabold text-[#16233F]">Offre Pro</div>
            <div className="text-[13.5px] text-gray-500 mt-0.5">Pour les entreprises avec plusieurs chantiers</div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[34px] font-extrabold text-[#16233F] tracking-tight">49,99 €</span>
            <span className="text-[14px] text-gray-500">/ mois</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-[14px] text-[#1E2430]">
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>Devis IA illimités</li>
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>Support prioritaire sous 1 h</li>
            <li className="flex items-center gap-2.5"><span className="text-[#1E8E5A]">✓</span>Collaborateurs illimités</li>
          </ul>
          <div className="flex-1" />
          <button className="h-11 rounded-xl bg-[#16233F] text-white text-[14px] font-bold">Configurer l’offre</button>
        </div>

        <div className="flex-none w-[320px] flex flex-col gap-5">
          <div className="bg-white border border-[#EDEDF3] rounded-[18px] p-6 flex flex-col gap-2.5">
            <span className="text-[16px] font-extrabold text-[#16233F] mb-1.5">Actions rapides</span>
            {[
              { icon: Tag, label: 'Frais d’inscription' },
              { icon: Percent, label: 'Codes promotionnels' },
              { icon: History, label: 'Historique des prix' },
            ].map((item) => (
              <button key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F7FB] text-left">
                <item.icon className="w-[18px] h-[18px] text-[#16233F]" strokeWidth={1.8} />
                <span className="flex-1 text-[14px] font-bold text-[#1E2430]">{item.label}</span>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
          <div className="bg-[#F3EEE6] rounded-[18px] p-6 flex flex-col gap-2">
            <span className="text-[11.5px] font-bold tracking-wide text-[#8A5A00]">CONSEIL</span>
            <span className="text-[14.5px] font-bold text-[#16233F] leading-relaxed">Testez un code promo de lancement avant de modifier les tarifs publics.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
