
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Plus, Package, Search, Trash2, Edit2, Loader2, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
      alert('Error uploading image!')
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
      alert('Error adding product: ' + (err as any).message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      setProducts(products.filter(p => p.id !== id))
      router.refresh()
    } catch (err) {
      alert('Error deleting product')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-outfit">Products</h1>
          <p className="text-gray-500 mt-2">Manage catalog items, pricing, and details.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products by name, brand, or category..."
          className="flex-1 outline-none text-gray-900 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all group">
            <div className="aspect-square bg-gray-50 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
              ) : (
                <Package className="w-12 h-12 text-gray-300" />
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 rounded-lg text-red-500 hover:text-red-600 shadow-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{product.brand}</span>
                <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{product.category}</span>
              </div>
              <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <p className="font-outfit font-bold text-lg text-blue-600">€{product.price_ht}</p>
                <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your search.
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
              <h2 className="text-xl font-bold font-outfit text-gray-900">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">✕</div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400" placeholder="e.g. White Paint" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                      <option value="Materiaux">Materiaux</option>
                      <option value="Peinture">Peinture</option>
                      <option value="Enduit">Enduit</option>
                      <option value="Outillage">Outillage</option>
                      <option value="Electricite">Electricite (Câbles, Prises...)</option>
                      <option value="Plomberie">Plomberie (Tuyaux, Robinets...)</option>
                      <option value="Sol">Sol (Carrelage, Parquet...)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400" placeholder="e.g. Tollens" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (HT)</label>
                      <input type="number" step="0.01" required value={formData.price_ht} onChange={e => setFormData({ ...formData, price_ht: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <select value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                        <option value="u">Unit (u)</option>
                        <option value="m2">m²</option>
                        <option value="ml">Linear Meter (ml)</option>
                        <option value="L">Liter (L)</option>
                        <option value="kg">Kilogram (kg)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Info</label>
                    <input value={formData.packaging} onChange={e => setFormData({ ...formData, packaging: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400" placeholder="e.g. Pot 15L" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="flex gap-2 items-center">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 border-dashed rounded-xl text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-4 h-4" />
                              <span>Click to upload</span>
                            </>
                          )}
                        </div>
                      </label>

                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden relative">
                        {formData.image_url ? (
                          <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
