'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronLeft, Edit2, Ban, Trash2, Search, Bell, HelpCircle, 
  Settings, Image as ImageIcon, Sparkles, Plus, User
} from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function ProductDetailClient({ product }: { product: any }) {
  const router = useRouter()
  const supabase = createClient()
  
  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return
    await supabase.from('products').delete().eq('id', product.id)
    router.push('/dashboard/products')
    router.refresh()
  }

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#0E172C] transition-colors shadow-sm">
             <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none">Gestion des Produits</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
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
      
      {/* Product Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mt-6">
        <div className="max-w-3xl">
          <div className="flex items-center flex-wrap gap-4 mb-3">
            <h2 className="text-[36px] font-bold text-[#0E172C] font-outfit leading-none tracking-tight">{product.name}</h2>
            <span className="bg-[#ECFDF5] text-[#10B981] px-2.5 py-1 rounded-sm text-[10px] font-extrabold tracking-widest uppercase">
              En Stock
            </span>
          </div>
          <p className="text-[15px] font-medium text-gray-500 leading-relaxed max-w-2xl mt-4">
            {product.packaging || "Papier haute qualité avec finition satinée, idéal pour les impressions artistiques et les portfolios professionnels de haut niveau."}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-2 lg:mt-0">
          <button className="flex items-center gap-2 bg-[#1D5FE1] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all text-[13px]">
            <Edit2 className="w-4 h-4" />
            Modifier
          </button>
          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors shadow-sm bg-white">
            <Ban className="w-[18px] h-[18px] stroke-[2.5]" />
          </button>
          <button onClick={handleDelete} className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-[#D93036] hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm bg-white">
            <Trash2 className="w-[18px] h-[18px] stroke-[2.5]" />
          </button>
        </div>
      </div>
      
      {/* Meta Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5">Catégorie</span>
          <span className="text-[15px] font-bold text-[#0E172C] capitalize">{product.category || 'Fournitures'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5">SKU / Marque</span>
          <span className="text-[14px] font-bold text-[#1D5FE1] tracking-wide uppercase">{product.brand || 'ED-PR-250-SATIN'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5">Prix Base (HT)</span>
          <span className="text-[15px] font-bold text-[#0E172C] font-outfit">{Number(product.price_ht).toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(/,/g, ' ')} €</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1.5">Promotion</span>
          <span className="text-[15px] font-bold text-[#1D5FE1]">{-15}%</span>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h3 className="font-bold text-[15px] text-[#0E172C] mb-4 tracking-tight">Description Technique</h3>
            <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
              Ce produit ({product.name}) offre une opacité exceptionnelle et une blancheur éclatante. 
              Sa texture ultra-lisse permet un séchage instantané des encres, garantissant des contrastes 
              saisissants et une fidélité colorimétrique de niveau galerie. Recommandé pour les impressions 
              photo et portfolios.
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="font-bold text-[17px] text-[#0E172C]">Ventes récentes</h3>
              <a href="#" className="font-bold text-[#1D5FE1] text-[13px] hover:underline">Rapport complet</a>
            </div>
            
            <div className="space-y-4">
              {/* Dummy Sales */}
              <div className="bg-white rounded-[1.2rem] p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                    <User className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0E172C] text-[14px]">Studio Graphique Alpha</h4>
                    <p className="text-[12px] font-medium text-gray-400 mt-0.5">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0E172C] text-[15px]">500 u.</div>
                  <div className="text-[13px] font-bold text-[#1D5FE1] mt-0.5">{(500 * product.price_ht).toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(/,/g, ' ')} €</div>
                </div>
              </div>
              
              <div className="bg-white rounded-[1.2rem] p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#1D5FE1]">
                    <User className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0E172C] text-[14px]">Agence Design & Co</h4>
                    <p className="text-[12px] font-medium text-gray-400 mt-0.5">Hier, 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0E172C] text-[15px]">120 u.</div>
                  <div className="text-[13px] font-bold text-[#1D5FE1] mt-0.5">{(120 * product.price_ht).toLocaleString('en-US', { minimumFractionDigits: 2 }).replace(/,/g, ' ')} €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="font-bold text-[14px] text-[#1D5FE1] uppercase tracking-wider">Stock</span>
              <Settings className="w-4 h-4 text-[#1D5FE1]" />
            </div>
            
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-[42px] font-bold font-outfit text-[#0E172C] leading-none tracking-tight">4,820</span>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">unités totales</p>
              </div>
              <div className="text-right pb-1">
                <span className="text-[18px] font-bold text-[#D93036] leading-none font-outfit">500</span>
                <p className="text-[10px] font-bold text-[#D93036]/80 uppercase tracking-widest mt-1">Alerte</p>
              </div>
            </div>
            
            <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-[#1D5FE1] rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#0E172C] font-bold text-[13px] transition-colors border border-gray-100">
              Ajuster l'inventaire
            </button>
          </div>
          
          <div>
            <h3 className="font-bold text-[13px] text-[#0E172C] tracking-widest uppercase mb-5 px-1">Galerie</h3>
            <div className="grid grid-cols-2 gap-4">
              {product.image_url ? (
                 <div className="aspect-square bg-gray-50 rounded-[1.2rem] flex items-center justify-center overflow-hidden border border-gray-100">
                   <img src={product.image_url} className="w-full h-full object-cover" />
                 </div>
              ) : (
                <div className="aspect-square bg-gray-50 rounded-[1.2rem] flex flex-col items-center justify-center border border-gray-100 text-gray-300">
                  <ImageIcon className="w-8 h-8 mb-2" />
                </div>
              )}
              
              <div className="aspect-square bg-[#727272] rounded-[1.2rem] flex items-center justify-center overflow-hidden border border-gray-600 relative overflow-hidden group hover:opacity-90 transition-opacity cursor-pointer">
                <div className="w-14 h-16 bg-[#F0F0F0] rounded-sm flex flex-col items-center p-2 shadow-2xl z-10 transform -rotate-6">
                   <div className="w-full h-1.5 bg-[#D1D1D1] rounded-full mb-1.5"></div>
                   <div className="w-10 h-1 bg-[#D1D1D1] rounded-full mb-1"></div>
                   <div className="w-12 h-1 bg-[#D1D1D1] rounded-full mb-1"></div>
                </div>
                <div className="w-16 h-20 bg-white rounded-sm flex flex-col items-center p-2 shadow-xl absolute z-20 group-hover:scale-105 transition-transform rotate-3">
                   <div className="w-full h-2 bg-[#1D5FE1]/20 rounded-full mb-2"></div>
                   <div className="w-10 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                   <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                   <div className="w-8 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                </div>
              </div>
              
              <div className="aspect-square bg-white border-2 border-dashed border-gray-200 hover:border-[#1D5FE1] rounded-[1.2rem] flex flex-col items-center justify-center text-gray-400 hover:bg-blue-50/20 transition-all cursor-pointer group">
                <Plus className="w-6 h-6 mb-2 text-gray-300 group-hover:text-[#1D5FE1] stroke-[2.5] transition-colors" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-[#1D5FE1] transition-colors">Ajouter</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F0F4FF] rounded-[1.2rem] p-6 border border-blue-100 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#1D5FE1] stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#1D5FE1] block mb-1">Analyse</span>
              <p className="text-[13px] font-medium text-blue-900/80 leading-relaxed">
                Réduisez vos coûts de stockage de 12% avec l'ajustement auto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
