
import { createClient } from '@/lib/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Users, FileText, Package, TrendingUp, DollarSign } from 'lucide-react'

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-outfit">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value={stats.usersCount}
          icon={Users}
          trend="+12% from last month"
          color="blue"
        />
        <StatCard
          label="Total Quotes"
          value={stats.quotesCount}
          icon={FileText}
          trend="+5 new this week"
          color="purple"
        />
        <StatCard
          label="Active Value"
          value={`€${stats.potentialValue.toLocaleString('fr-FR')}`}
          icon={DollarSign}
          trend="In pending quotes"
          color="green"
        />
        <StatCard
          label="Products"
          value={stats.productsCount}
          icon={Package}
          trend=" catalog items"
          color="orange"
        />
      </div>

      {/* Recent Activity or Quick Actions could go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-gray-700 flex items-center justify-between group">
              <span>Add New Product</span>
              <span className="text-gray-400 group-hover:text-blue-500">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-gray-700 flex items-center justify-between group">
              <span>Review Pending Quotes</span>
              <span className="text-gray-400 group-hover:text-blue-500">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-gray-700 flex items-center justify-between group">
              <span>Manage Users</span>
              <span className="text-gray-400 group-hover:text-blue-500">→</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
          <p className="text-blue-100 mb-4">You can now manage the entire product catalog directly from the Products tab. Changes reflect immediately in the mobile app.</p>
          <div className="h-32 bg-white/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-12 h-12 text-white/50" />
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
  color
}: {
  label: string,
  value: string | number,
  icon: any,
  trend: string,
  color: 'blue' | 'purple' | 'green' | 'orange'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {/* <span className="text-xs font-medium px-2 py-1 bg-gray-50 rounded-full text-gray-500">
          Last 30 days
        </span> */}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 font-outfit">{value}</h3>
        <p className="text-xs text-gray-400 mt-2 font-medium">{trend}</p>
      </div>
    </div>
  )
}
