'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Package, Search, Trash2, Edit2, Loader2, Image as ImageIcon,
  Bell, HelpCircle, TrendingUp, Sparkles, Box, Wrench, PenTool, Layers, ChevronDown
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price_ht: number
  unit: string
  category: string
  brand: string
  image_url: string
  packaging: string
}

export default function ProductsClientPage({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price_ht: '',
    unit: 'u',
    category: 'Materiaux',
    brand: '',
    image_url: '',
    packaging: ''
  })

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    setUploadingImage(true)
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: data.publicUrl })
    } catch (error) {
      alert('Erreur lors du téléchargement de l\'image !')
      console.error(error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          price_ht: parseFloat(formData.price_ht),
          unit: formData.unit,
          category: formData.category,
          brand: formData.brand,
          image_url: formData.image_url,
          packaging: formData.packaging,
          consumption_rule_type: 'fixed', // Default for simplified admin
          consumption_rule_factor: 1.0
        }])
        .select()
        .single()

      if (error) throw error

      setProducts([data, ...products])
      setIsModalOpen(false)
      setFormData({
        name: '',
        price_ht: '',
        unit: 'u',
        category: 'Materiaux',
        brand: '',
        image_url: '',
        packaging: ''
      })
      router.refresh()
    } catch (err) {
      alert('Erreur lors de l\'ajout du produit : ' + (err as any).message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      setProducts(products.filter(p => p.id !== id))
      router.refresh()
    } catch (err) {
      alert('Erreur lors de la suppression du produit')
    }
  }

  const getCategoryIcon = (cat: string) => {
    const c = cat?.toLowerCase() || ''
    if (c.includes('outil')) return <Wrench className="w-[52px] h-[52px] text-gray-300 stroke-[#CBD5E1] opacity-70 stroke-[1.5]" />
    if (c.includes('pein')) return <PenTool className="w-[52px] h-[52px] text-gray-300 stroke-[#CBD5E1] opacity-70 stroke-[1.5]" />
    if (c.includes('mat')) return <Box className="w-[52px] h-[52px] text-gray-300 stroke-[#CBD5E1] opacity-70 stroke-[1.5]" />
    return <Layers className="w-[52px] h-[52px] text-gray-300 stroke-[#CBD5E1] opacity-70 stroke-[1.5]" />
  }

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Header Row (Mirroring Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-[#0E172C] font-outfit leading-none">Gestion des Produits</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur..." 
              className="pl-11 pr-4 py-2.5 bg-gray-100/80 rounded-full text-[14px] font-medium text-gray-700 placeholder-gray-400 border-transparent focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all w-72 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-6">
        <div>
          <h2 className="text-[16px] font-bold text-[#0E172C] mb-1">Produits</h2>
          <p className="text-[14px] font-medium text-gray-500">
            Gestion du catalogue éditorial et inventaire.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1D5FE1] hover:bg-blue-700 text-white px-5 py-2.5 rounded-[0.6rem] font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all text-[14px]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Ajouter un Produit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-[#0E172C]">
        <div className="bg-white rounded-[1.2rem] p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-center">
          <span className="text-[12px] font-bold text-gray-600 tracking-wider uppercase mb-3">Total</span>
          <span className="text-[34px] font-bold text-[#1D5FE1] font-outfit leading-none mb-3">1,284</span>
          <div className="flex items-center gap-1 text-[#10B981]">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="text-[11px] font-bold tracking-wide">+12% ce mois</span>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-[#1b62f8] bg-gradient-to-r from-[#1753d1] to-[#2573ff] rounded-[1.2rem] p-8 shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 w-full max-w-lg">
            <h3 className="text-[18px] font-bold leading-tight mb-2 tracking-tight text-white shadow-sm">Optimisez votre inventaire</h3>
            <p className="text-[13px] text-blue-50 leading-relaxed font-medium mb-5 backdrop-blur-sm max-w-md opacity-90">
              Utilisez l'analyse IA pour prédire les besoins en matériaux et réduire les coûts de stockage de 15%.
            </p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-full px-5 py-2 transition-colors text-[11px] shadow-sm whitespace-nowrap inline-block border-transparent">
              Découvrir l'analyse IA
            </button>
          </div>
          {/* Decorative network graphic */}
          <div className="absolute right-0 top-0 w-64 h-full pointer-events-none opacity-40">
            <div className="w-full h-full relative" style={{ transform: 'translate(20%, 20%)', strokeWidth: '1.5px' }}>
              <svg viewBox="0 0 120 120" stroke="currentColor" fill="currentColor">
                {/* Dots and lines imitating a neural/graph network */}
                <circle cx="20" cy="80" r="4" fill="white" stroke="none" />
                <circle cx="50" cy="40" r="4" fill="white" stroke="none" />
                <circle cx="70" cy="65" r="4" fill="white" stroke="none" />
                <circle cx="100" cy="30" r="4" fill="white" stroke="none" />
                <path d="M20 80 L50 40 L70 65 L100 30" fill="none" stroke="white" />
                
                <circle cx="45" cy="5" r="2.5" fill="none" stroke="white" />
                <path d="M45 5 L50 40" fill="none" stroke="white" strokeDasharray="3 3"/>
                
                <circle cx="85" cy="15" r="2.5" fill="none" stroke="white" />
                <path d="M100 30 L85 15" fill="none" stroke="white" strokeDasharray="3 3" />
                
                <path d="M70 65 L90 85" fill="none" stroke="white" strokeDasharray="3 3" />
                <circle cx="90" cy="85" r="2.5" fill="none" stroke="white" />
                
                <path d="M20 80 L10 110" fill="none" stroke="white" strokeDasharray="3 3" />
                <circle cx="10" cy="110" r="2.5" fill="none" stroke="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[1.2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all group flex flex-col p-6 cursor-pointer relative">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
              <button onClick={(e) => handleDelete(e, product.id)} className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Link href={`/dashboard/products/${product.id}`} className="flex-1 flex flex-col">
              <div className="flex justify-end mb-6 text-[#0E172C]">
                <span className="text-[9px] font-bold tracking-widest text-[#0E172C] uppercase bg-gray-50 px-2 py-0.5 rounded-sm">{product.category || 'PRODUIT'}</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-4 mb-6">
                {product.image_url ? (
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  getCategoryIcon(product.category)
                )}
              </div>

              <div className="mt-auto">
                <h3 className="font-bold text-[#0E172C] text-[15px] leading-tight mb-1.5 line-clamp-2 min-h-[36px]">{product.name}</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed h-[40px] mb-4 font-medium">
                  {product.packaging || product.brand || 'Détails de produit non spécifiés'}
                </p>
                
                <div className="flex items-end justify-between mt-6 border-t border-gray-50 pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-outfit font-bold text-[20px] text-[#1D5FE1] leading-none">
                      {Number(product.price_ht || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">/{product.unit}</span>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-[#1D5FE1] hover:text-[#1D5FE1] transition-colors shadow-sm bg-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Add Product Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="border-[2px] border-dashed border-gray-200 rounded-[1.2rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#1D5FE1] hover:bg-blue-50/20 transition-all p-8 min-h-[340px] group bg-gray-50/30"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#1D5FE1] mb-5 shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="font-bold text-[#0E172C] text-[15px] mb-1.5">Nouveau Produit</span>
          <span className="text-[13px] font-medium text-gray-500 text-center px-4 leading-relaxed">Cliquez pour ajouter manuellement</span>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] px-6 py-2.5 rounded-full text-[13px] font-bold transition-colors">
          Afficher plus de produits
          <ChevronDown className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Add Product Modal (Unchanged Layout mostly, just matching styles loosely if ever opened) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0E172C]/40 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
              <h2 className="text-xl font-bold font-outfit text-[#0E172C]">Ajouter un Nouveau Produit</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#0E172C]">
                <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">✕</div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Nom du Produit</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]" placeholder="ex. Peinture Blanche" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Catégorie</label>
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]">
                      <option value="MATÉRIAUX">Matériaux</option>
                      <option value="PEINTURE">Peinture</option>
                      <option value="ENDUIT">Enduit</option>
                      <option value="OUTILLAGE">Outillage</option>
                      <option value="ACCESSOIRES">Accessoires</option>
                      <option value="SOL">Sol</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Marque</label>
                    <input value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]" placeholder="ex. Tollens" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Prix (HT)</label>
                      <input type="number" step="0.01" required value={formData.price_ht} onChange={e => setFormData({ ...formData, price_ht: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Unité</label>
                      <select value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]">
                        <option value="u">Unité (u)</option>
                        <option value="kit">Kit</option>
                        <option value="l">Litre (l)</option>
                        <option value="m2">m²</option>
                        <option value="ml">Mètre Linéaire (ml)</option>
                        <option value="kg">Kilogramme (kg)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Conditionnement / Détails</label>
                    <input value={formData.packaging} onChange={e => setFormData({ ...formData, packaging: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D5FE1]/20 focus:border-[#1D5FE1] text-[14px]" placeholder="ex. Pot de 5L" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0E172C] mb-1.5">Image du Produit</label>
                    <div className="flex gap-2 items-center">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-xl text-gray-500 hover:bg-[#F0F4FF] hover:border-[#1D5FE1] transition-colors flex items-center justify-center gap-2">
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#1D5FE1]" />
                              <span className="text-[13px] font-medium text-[#1D5FE1]">Chargement...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-[13px] font-medium">Cliquer pour charger</span>
                            </>
                          )}
                        </div>
                      </label>

                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden relative shadow-sm">
                        {formData.image_url ? (
                          <img src={formData.image_url} alt="Aperçu" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white z-10 border-t border-gray-50 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-[#0E172C] font-bold hover:bg-gray-100 rounded-xl transition-colors text-[14px]">Annuler</button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="bg-[#1D5FE1] hover:bg-blue-700 text-white px-7 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 disabled:opacity-70 transition-all flex items-center gap-2 text-[14px]"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Ajouter Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
