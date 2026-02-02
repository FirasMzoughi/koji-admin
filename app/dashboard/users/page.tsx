
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { BadgeCheck, BadgeAlert, Building2 } from 'lucide-react'

export default async function UsersPage() {
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

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-outfit">Users</h1>
          <p className="text-gray-500 mt-2">Manage all registered professionals and clients.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
          Total: {users?.length || 0}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">User Details</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Profession</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Business Info</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Joined Date</th>
                {/* <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div>
                        {/* If we had a name column, use it, otherwise fallback to email handle */}
                        <div className="font-medium text-gray-900">{user.email}</div>
                        <div className="text-xs text-gray-500">{user.id.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {user.profession || 'Client'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_pro ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Pro
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.business_info ? (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="truncate max-w-[150px]">
                          {(user.business_info as any)?.companyName || 'Unknown Corp'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 font-medium transition-colors">Edit</button>
                  </td> */}
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
