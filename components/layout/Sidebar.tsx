
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  LogOut,
  Settings,
  Banknote,
  Tag,
  Mail,
  LifeBuoy,
  Truck,
  Boxes
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Gestion des Utilisateurs', href: '/dashboard/users', icon: Users },
  { label: 'Devis', href: '/dashboard/quotes', icon: FileText },
  { label: 'Produits', href: '/dashboard/products', icon: Package },
  { label: 'Fournisseurs', href: '/dashboard/fournisseurs', icon: Truck },
  { label: 'Fournitures', href: '/dashboard/fournitures', icon: Boxes },
  { label: 'Suivi du CA', href: '/dashboard/revenue', icon: Banknote },
  { label: 'Offres & Tarifs', href: '/dashboard/pricing', icon: Tag },
  { label: 'Communications', href: '/dashboard/communications', icon: Mail },
  { label: 'Support & Bugs', href: '/dashboard/support', icon: LifeBuoy },
]

export default function Sidebar({
  isOpen,
  onClose
}: {
  isOpen?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <div className={cn(
      "fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#0E172C] rounded-xl border border-gray-800 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.png" alt="Koji Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-[22px] text-[#0E172C] leading-none tracking-tight">Koji Admin</span>
            <span className="text-[13px] text-gray-500 font-medium mt-1">Editorial Admin</span>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5 rotate-45" /> {/* Using Settings as X for now or add X icon */}
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1.5 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onClose?.()}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-full text-[15px] font-semibold transition-all group",
              pathname === item.href
                ? "bg-[#0E172C] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn(
              "w-[22px] h-[22px] transition-colors",
              pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-gray-600"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-[15px] font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
          <Settings className="w-[22px] h-[22px] text-gray-400 group-hover:text-gray-600" />
          Paramètres
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-[15px] font-semibold text-[#D93036] hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-[22px] h-[22px] text-[#D93036] group-hover:text-red-700" />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
