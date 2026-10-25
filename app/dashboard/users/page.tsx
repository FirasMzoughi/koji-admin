import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type UserRow = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  profession: string | null
  is_pro: boolean | null
  business_info: { companyName?: string; siret?: string } | null
  created_at: string
}

function initials(user: UserRow) {
  const name = user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email
  const parts = name.split(/\s+/)
  return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

function displayName(user: UserRow) {
  return user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email.split('@')[0]
}

// Refonte maquette (25 oct, AdminUsers.dc.html) — meme requete reelle
// qu'avant (table `users`), juste redessinee (puces de filtre avec vrais
// comptes, tableau navy/dore).
export default async function UsersPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() { } } }
  )

  const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  const users = (data || []) as UserRow[]
  const proCount = users.filter((u) => u.is_pro).length

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#16233F] tracking-tight">Utilisateurs</h1>
          <p className="text-[14px] text-gray-500 mt-1">{users.length} comptes, dont {proCount} professionnels.</p>
        </div>
        <button className="h-11 px-5 rounded-xl bg-[#16233F] text-white text-[14px] font-bold">+ Ajouter un utilisateur</button>
      </div>

      <div className="flex gap-2">
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-[#16233F] text-white">Tous · {users.length}</span>
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-white text-gray-500 border border-[#EDEDF3]">Pro · {proCount}</span>
        <span className="text-[13px] font-semibold px-3.5 py-2.5 rounded-full bg-white text-gray-500 border border-[#EDEDF3]">Standard · {users.length - proCount}</span>
      </div>

      <div className="bg-white border border-[#EDEDF3] rounded-[18px] overflow-hidden">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#F1F2F6]">
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Utilisateur</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Profession</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Statut</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Entreprise</th>
              <th className="px-5 py-4 text-[11.5px] font-bold text-gray-400 uppercase tracking-wide">Inscription</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F6FA]">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EDEFFB] text-[#16233F] text-[13px] font-extrabold flex items-center justify-center shrink-0">
                      {initials(user)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1E2430] truncate">{displayName(user)}</div>
                      <div className="text-[12.5px] text-gray-500 truncate">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-[14px] font-semibold text-[#1E2430]">{user.profession || '—'}</td>
                <td className="px-5 py-4">
                  {user.is_pro ? (
                    <span className="text-[12px] font-bold px-3 py-1 rounded-xl bg-[#E8ECFD] text-[#3B5BDB]">PRO</span>
                  ) : (
                    <span className="text-[12px] font-bold px-3 py-1 rounded-xl bg-[#F0F1F5] text-gray-500">STANDARD</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {user.business_info?.companyName ? (
                    <div>
                      <div className="text-[14px] font-bold text-[#1E2430] truncate">{user.business_info.companyName}</div>
                      {user.business_info.siret && <div className="text-[12.5px] text-gray-500 mt-0.5">SIRET {user.business_info.siret}</div>}
                    </div>
                  ) : <span className="text-[14px] text-gray-400">—</span>}
                </td>
                <td className="px-5 py-4 text-[14px] text-gray-500">
                  {new Date(user.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-500">Aucun utilisateur trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
