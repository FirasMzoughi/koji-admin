
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { FileText, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

export default async function QuotesPage() {
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

  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepte':
      case 'accepted':
      case 'signed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
            <CheckCircle className="w-3.5 h-3.5" />
            Signé
          </span>
        )
      case 'refuse':
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            <XCircle className="w-3.5 h-3.5" />
            Refusé
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <Clock className="w-3.5 h-3.5" />
            En attente
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-outfit">Devis</h1>
          <p className="text-gray-500 mt-2">Suivez et gérez toutes les propositions clients.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
          Total: {quotes?.length || 0}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Montant</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Date d'émission</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Date de signature</th>
                {/* <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes?.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{quote.client_name || 'Prospect'}</div>
                        <div className="text-xs text-gray-500">{quote.client_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 font-outfit">
                    €{Number(quote.total_amount || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(quote.status)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {quote.signed_at
                      ? new Date(quote.signed_at).toLocaleDateString('fr-FR')
                      : <span className="text-gray-300">-</span>
                    }
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 font-medium transition-colors">View</button>
                  </td> */}
                </tr>
              ))}
              {(!quotes || quotes.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun devis trouvé.
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
