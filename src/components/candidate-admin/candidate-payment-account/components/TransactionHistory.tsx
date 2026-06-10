import React, { useEffect, useState } from 'react';
import { httpGetWithToken } from '../../../../utils/http_utils';
import { AlertCircle, TrendingDown, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: string;
  balance_after: string;
  source: string;
  source_id: number;
  description: string;
  created_at: string;
  job_amount?: number;
  platform_commission?: number;
  commission_rate?: number;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const fetchTransactions = async (page: number) => {
    setLoading(true);
    try {
      const response = await httpGetWithToken(`candidate/transactions?page=${page}`);
      if (response?.data) {
        setTransactions(response.data);
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
      }
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const isJobPayment = (tx: Transaction) =>
    tx.source === 'employer_payment' && tx.type === 'credit';

  const toggleExpand = (id: number) =>
    setExpandedId(prev => (prev === id ? null : id));

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="flex items-center gap-2 text-red-600 py-6">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No transactions yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase border-b">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Description</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <React.Fragment key={tx.id}>
                    <tr className="border-t hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap text-xs">
                        {formatDate(tx.created_at)}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {tx.type === 'credit'
                              ? <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                              : <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                            }
                          </div>
                          <span className="font-medium text-gray-800">{tx.description}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`font-semibold text-base ${
                          tx.type === 'credit' ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'}₦{Number(tx.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3">
                        {isJobPayment(tx) && tx.job_amount ? (
                          <button
                            onClick={() => toggleExpand(tx.id)}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            {expandedId === tx.id
                              ? <><ChevronUp className="w-3 h-3" /> Hide</>
                              : <><ChevronDown className="w-3 h-3" /> View breakdown</>
                            }
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>

                    {expandedId === tx.id && isJobPayment(tx) && tx.job_amount && (
                      <tr className="bg-blue-50 border-t border-blue-100">
                        <td colSpan={4} className="px-4 py-3">
                          <div className="max-w-xs">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Payment Breakdown</p>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex justify-between">
                                <span>Job Amount</span>
                                <span className="font-medium text-gray-800">
                                  ₦{Number(tx.job_amount).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>Platform Fee ({tx.commission_rate ?? 20}%)</span>
                                <span>−₦{Number(tx.platform_commission).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-semibold text-green-700 pt-1 border-t border-blue-200 mt-1">
                                <span>You Received</span>
                                <span>₦{Number(tx.amount).toLocaleString()}</span>
                              </div>
                            </div>
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
            {transactions.map((tx) => (
              <div key={tx.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="flex items-start justify-between p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {tx.type === 'credit'
                        ? <TrendingUp className="w-4 h-4 text-green-600" />
                        : <TrendingDown className="w-4 h-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{tx.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <span className={`font-bold text-base ${
                    tx.type === 'credit' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}₦{Number(tx.amount).toLocaleString()}
                  </span>
                </div>

                {isJobPayment(tx) && tx.job_amount && (
                  <>
                    <button
                      onClick={() => toggleExpand(tx.id)}
                      className="w-full flex items-center justify-center gap-1 py-2 text-xs text-blue-600 bg-blue-50 border-t border-blue-100"
                    >
                      {expandedId === tx.id
                        ? <><ChevronUp className="w-3 h-3" /> Hide breakdown</>
                        : <><ChevronDown className="w-3 h-3" /> View breakdown</>
                      }
                    </button>

                    {expandedId === tx.id && (
                      <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Job Amount</span>
                          <span className="font-medium text-gray-800">
                            ₦{Number(tx.job_amount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Platform Fee ({tx.commission_rate ?? 20}%)</span>
                          <span>−₦{Number(tx.platform_commission).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-green-700 pt-1 border-t border-blue-200">
                          <span>You Received</span>
                          <span>₦{Number(tx.amount).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {lastPage > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => fetchTransactions(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-sm text-gray-600">
                {currentPage} / {lastPage}
              </span>
              <button
                onClick={() => fetchTransactions(currentPage + 1)}
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
