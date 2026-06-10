import React, { useEffect, useState } from 'react';
import { httpGetWithToken } from '../../../../utils/http_utils';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  amount: number;
  percentage: number;
  status: string;
}

interface Candidate {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

interface Payment {
  id: number;
  candidate_id: number;
  amount: number;
  type: string;
  employer_pays_total: number;
  platform_fee: number;
  freelancer_receives: number;
  platform_commission: number;
  platform_vat: number;
  status: string;
  work_status: string | null;
  reference: string;
  paid_at: string | null;
  created_at: string;
  candidate: Candidate | null;
  milestones: Milestone[];
}

const statusColor: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
};

const TransactionHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchPayments(1);
  }, []);

  const fetchPayments = async (page: number) => {
    setLoading(true);
    try {
      const response = await httpGetWithToken(`employer/payments?page=${page}`);
      if (response?.data) {
        setPayments(response.data);
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
      }
    } catch {
      setError('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const candidateName = (c: Candidate | null) =>
    c ? `${c.first_name} ${c.last_name}`.trim() : 'Unknown';

  const toggleExpand = (id: number) =>
    setExpandedId(prev => (prev === id ? null : id));

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="flex items-center gap-2 text-red-600 py-6">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No payments yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase border-b">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Freelancer</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Amount Paid</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <React.Fragment key={p.id}>
                    <tr className="border-t hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap text-xs">
                        {formatDate(p.paid_at || p.created_at)}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="font-medium text-gray-800">{candidateName(p.candidate)}</span>
                        {p.candidate?.email && (
                          <p className="text-xs text-gray-400">{p.candidate.email}</p>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="capitalize text-gray-600">{p.type}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="font-semibold text-base text-red-500">
                          −₦{Number(p.employer_pays_total).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          statusColor[p.status] ?? 'bg-gray-100 text-gray-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                          {expandedId === p.id
                            ? <><ChevronUp className="w-3 h-3" /> Hide</>
                            : <><ChevronDown className="w-3 h-3" /> Breakdown</>
                          }
                        </button>
                      </td>
                    </tr>

                    {expandedId === p.id && (
                      <tr className="bg-blue-50 border-t border-blue-100">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="max-w-sm">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Payment Breakdown</p>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex justify-between">
                                <span>Job Amount</span>
                                <span className="font-medium text-gray-800">₦{Number(p.amount).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Platform Fee</span>
                                <span className="font-medium text-gray-800">₦{Number(p.platform_fee).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>VAT</span>
                                <span className="font-medium text-gray-800">₦{Number(p.platform_vat).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-semibold text-red-600 pt-1 border-t border-blue-200 mt-1">
                                <span>Total Charged</span>
                                <span>₦{Number(p.employer_pays_total).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-green-700 pt-1">
                                <span>Freelancer Receives</span>
                                <span className="font-semibold">₦{Number(p.freelancer_receives).toLocaleString()}</span>
                              </div>
                            </div>
                            {p.milestones && p.milestones.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-700 mb-1">Milestones</p>
                                <div className="space-y-1">
                                  {p.milestones.map((m) => (
                                    <div key={m.id} className="flex justify-between text-xs text-gray-600">
                                      <span>{m.title} ({m.percentage}%)</span>
                                      <span className={`font-medium ${
                                        m.status === 'approved' ? 'text-green-700' : 'text-gray-700'
                                      }`}>
                                        ₦{Number(m.amount).toLocaleString()} · {m.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <p className="text-xs text-gray-400 mt-2">Ref: {p.reference}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="flex items-start justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{candidateName(p.candidate)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(p.paid_at || p.created_at)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                      statusColor[p.status] ?? 'bg-gray-100 text-gray-600'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <span className="font-bold text-base text-red-500">
                    −₦{Number(p.employer_pays_total).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => toggleExpand(p.id)}
                  className="w-full flex items-center justify-center gap-1 py-2 text-xs text-blue-600 bg-blue-50 border-t border-blue-100"
                >
                  {expandedId === p.id
                    ? <><ChevronUp className="w-3 h-3" /> Hide breakdown</>
                    : <><ChevronDown className="w-3 h-3" /> View breakdown</>
                  }
                </button>

                {expandedId === p.id && (
                  <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Job Amount</span>
                      <span className="font-medium text-gray-800">₦{Number(p.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee</span>
                      <span className="font-medium">₦{Number(p.platform_fee).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT</span>
                      <span className="font-medium">₦{Number(p.platform_vat).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-red-600 pt-1 border-t border-blue-200">
                      <span>Total Charged</span>
                      <span>₦{Number(p.employer_pays_total).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-700">
                      <span>Freelancer Receives</span>
                      <span className="font-semibold">₦{Number(p.freelancer_receives).toLocaleString()}</span>
                    </div>
                    {p.milestones && p.milestones.length > 0 && (
                      <div className="pt-2 border-t border-blue-200">
                        <p className="font-semibold text-gray-700 mb-1">Milestones</p>
                        {p.milestones.map((m) => (
                          <div key={m.id} className="flex justify-between">
                            <span>{m.title} ({m.percentage}%)</span>
                            <span className={m.status === 'approved' ? 'text-green-700 font-medium' : ''}>
                              ₦{Number(m.amount).toLocaleString()} · {m.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-400 pt-1">Ref: {p.reference}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {lastPage > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => fetchPayments(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-sm text-gray-600">
                {currentPage} / {lastPage}
              </span>
              <button
                onClick={() => fetchPayments(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
