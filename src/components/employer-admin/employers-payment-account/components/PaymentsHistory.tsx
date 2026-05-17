import React, { useEffect, useState } from 'react';
import { httpGetWithToken, httpPostWithToken } from '../../../../utils/http_utils';
import { useToast } from '@chakra-ui/react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  percentage: number;
  amount: number;
  status: string;
  work_status: 'pending' | 'submitted' | 'approved' | 'rejected';
  work_approved_at: string | null;
  employer_note: string | null;
}

interface Payment {
  id: number;
  candidate_id: number;
  amount: number;
  type: 'escrow' | 'milestone';
  status: 'pending' | 'completed' | 'failed';
  work_status: 'pending' | 'approved' | 'rejected';
  reference: string;
  payment_method: string;
  paid_at: string | null;
  created_at: string;
  work_approved_at: string | null;
  employer_note: string | null;
  candidate?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  milestones?: Milestone[];
}

interface PaginatedResponse {
  data: Payment[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

const PaymentsHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'escrow' | 'milestone'>('all');
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null);
  const [rejectModal, setRejectModal] = useState<{
    show: boolean;
    payment?: Payment;
    milestone?: Milestone;
    reason: string;
  }>({
    show: false,
    reason: '',
  });
  const toast = useToast();

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage, filterStatus, filterType]);

  const fetchPayments = async (page: number) => {
    setLoading(true);
    try {
      const response = await httpGetWithToken(
        `employer/payments?page=${page}&status=${filterStatus}&type=${filterType}`
      );

      if (response?.data) {
        const paginatedData = response as PaginatedResponse;
        setPayments(paginatedData.data);
        setCurrentPage(paginatedData.current_page);
        setLastPage(paginatedData.last_page);
        setTotalPayments(paginatedData.total);
      } else {
        toast({
          status: 'error',
          title: 'Error loading payments',
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        status: 'error',
        title: 'Failed to load payment history',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // For ESCROW payments - approve entire work
  const handleApproveWork = async (payment: Payment) => {
    if (!window.confirm(`Approve work completed by ${payment.candidate?.first_name} ${payment.candidate?.last_name}?\n\nThis will allow them to withdraw ₦${payment.amount.toLocaleString()}`)) {
      return;
    }

    setProcessingId(payment.id);
    try {
      const response = await httpPostWithToken('employer/approve-work', {
        payment_id: payment.id,
      });

      if (response?.status === 'success') {
        toast({
          status: 'success',
          title: 'Work Approved!',
          description: 'Candidate can now withdraw funds.',
          isClosable: true,
        });
        fetchPayments(currentPage);
      } else {
        toast({
          status: 'error',
          title: response?.error || 'Failed to approve work',
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error('Error approving work:', error);
      toast({
        status: 'error',
        title: error?.response?.data?.error || 'Failed to approve work',
        isClosable: true,
      });
    } finally {
      setProcessingId(null);
    }
  };

  // For MILESTONE payments - approve individual milestone
  const handleApproveMilestone = async (milestone: Milestone, payment: Payment) => {
    if (!window.confirm(`Approve milestone "${milestone.title}"?\n\nAmount: ₦${milestone.amount.toLocaleString()}\n\nThis will allow the candidate to withdraw these funds.`)) {
      return;
    }

    setProcessingId(milestone.id);
    try {
      const response = await httpPostWithToken('employer/approve-milestone', {
        milestone_id: milestone.id,
      });

      if (response?.status === 'success') {
        toast({
          status: 'success',
          title: 'Milestone Approved!',
          description: `"${milestone.title}" approved. Candidate can withdraw ₦${milestone.amount.toLocaleString()}.`,
          isClosable: true,
        });
        fetchPayments(currentPage);
      } else {
        toast({
          status: 'error',
          title: response?.error || 'Failed to approve milestone',
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error('Error approving milestone:', error);
      toast({
        status: 'error',
        title: error?.response?.data?.error || 'Failed to approve milestone',
        isClosable: true,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal.reason.trim()) {
      toast({
        status: 'error',
        title: 'Please provide a reason for rejection',
        isClosable: true,
      });
      return;
    }

    const isMilestone = !!rejectModal.milestone;
    const id = isMilestone ? rejectModal.milestone!.id : rejectModal.payment!.id;
    
    setProcessingId(id);
    try {
      const endpoint = isMilestone ? 'employer/reject-milestone' : 'employer/reject-work';
      const payload = isMilestone 
        ? { milestone_id: id, reason: rejectModal.reason }
        : { payment_id: id, reason: rejectModal.reason };

      const response = await httpPostWithToken(endpoint, payload);

      if (response?.status === 'success') {
        toast({
          status: 'success',
          title: isMilestone ? 'Milestone Rejected' : 'Work Rejected',
          description: 'Candidate has been notified.',
          isClosable: true,
        });
        setRejectModal({ show: false, reason: '' });
        fetchPayments(currentPage);
      } else {
        toast({
          status: 'error',
          title: response?.error || 'Failed to reject',
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error('Error rejecting:', error);
      toast({
        status: 'error',
        title: error?.response?.data?.error || 'Failed to reject',
        isClosable: true,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkStatusBadge = (workStatus: string) => {
    switch (workStatus) {
      case 'approved':
        return { color: 'bg-green-100 text-green-800', text: 'Approved' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', text: 'Rejected' };
      case 'submitted':
        return { color: 'bg-blue-100 text-blue-800', text: 'Submitted' };
      default:
        return { color: 'bg-amber-100 text-amber-800', text: 'Pending' };
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'escrow':
        return 'bg-blue-100 text-blue-800';
      case 'milestone':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="ml-0 lg:ml-60 bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Payments History</h2>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full border rounded-lg p-2"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Type
          </label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full border rounded-lg p-2"
          >
            <option value="all">All Types</option>
            <option value="escrow">Escrow</option>
            <option value="milestone">Milestone</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          Total Payments: <strong className="text-lg text-gray-900">{totalPayments}</strong>
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No payments found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                  Candidate
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const isExpanded = expandedPayment === payment.id;
                const hasMilestones = payment.type === 'milestone' && payment.milestones && payment.milestones.length > 0;

                return (
                  <React.Fragment key={payment.id}>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.candidate?.first_name} {payment.candidate?.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{payment.candidate?.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">
                          ₦{payment.amount.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                            payment.type
                          )}`}
                        >
                          {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            payment.status
                          )}`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600">{formatDate(payment.created_at)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* For ESCROW payments */}
                          {payment.type === 'escrow' && payment.status === 'completed' && payment.work_status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleApproveWork(payment)}
                                disabled={processingId === payment.id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded text-xs font-medium transition-colors"
                                title="Approve completed work"
                              >
                                <CheckCircle className="w-3 h-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectModal({ show: true, payment, reason: '' })}
                                disabled={processingId === payment.id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded text-xs font-medium transition-colors"
                                title="Reject work"
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </>
                          ) : payment.type === 'escrow' && payment.work_status === 'approved' ? (
                            <span className="text-xs text-green-600 font-medium">✓ Approved</span>
                          ) : payment.type === 'escrow' && payment.work_status === 'rejected' ? (
                            <span className="text-xs text-red-600 font-medium">✗ Rejected</span>
                          ) : payment.type === 'escrow' && payment.status === 'pending' ? (
                            <span className="text-xs text-amber-600 font-medium">⏳ Awaiting Admin Approval</span>
                          ) : payment.type === 'escrow' && payment.status === 'failed' ? (
                            <span className="text-xs text-red-600 font-medium">✗ Payment Failed</span>
                          ) : null}

                          {/* For MILESTONE payments - show expand button */}
                          {hasMilestones && payment.status === 'completed' && (
                            <button
                              onClick={() => setExpandedPayment(isExpanded ? null : payment.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-medium transition-colors"
                            >
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {isExpanded ? 'Hide' : 'View'} Milestones
                            </button>
                          )}

                          {payment.type === 'milestone' && payment.status === 'pending' && (
                            <span className="text-xs text-amber-600 font-medium">⏳ Awaiting Admin Approval</span>
                          )}
                          {payment.type === 'milestone' && payment.status === 'failed' && (
                            <span className="text-xs text-red-600 font-medium">✗ Payment Failed</span>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded milestones view */}
                    {isExpanded && hasMilestones && (
                      <tr>
                        <td colSpan={6} className="px-4 py-4 bg-purple-50">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 mb-3">Milestones</h4>
                            {payment.milestones!.map((milestone) => {
                              const milestoneStatus = getWorkStatusBadge(milestone.work_status || 'pending');
                              return (
                                <div
                                  key={milestone.id}
                                  className="bg-white rounded-lg border border-purple-200 p-4"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                                        <span
                                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${milestoneStatus.color}`}
                                        >
                                          {milestoneStatus.text}
                                        </span>
                                      </div>
                                      <div className="text-sm text-gray-600 space-y-1">
                                        <p>Amount: <span className="font-semibold">₦{milestone.amount.toLocaleString()}</span> ({milestone.percentage}%)</p>
                                        {milestone.work_approved_at && (
                                          <p className="text-green-600">Approved on {formatDate(milestone.work_approved_at)}</p>
                                        )}
                                        {milestone.employer_note && (
                                          <p className="text-red-600">Rejection reason: {milestone.employer_note}</p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Milestone actions */}
                                    <div className="flex items-center gap-2 ml-4">
                                      {/* Admin hasn't approved the payment yet — buttons stay hidden */}
                                      {payment.status !== 'completed' ? (
                                        <span className="text-xs text-amber-600 font-medium">⏳ Awaiting Admin Approval</span>
                                      ) : milestone.work_status === 'pending' ? (
                                        <>
                                          <button
                                            onClick={() => handleApproveMilestone(milestone, payment)}
                                            disabled={processingId === milestone.id}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded text-xs font-medium transition-colors"
                                          >
                                            <CheckCircle className="w-3 h-3" />
                                            Approve
                                          </button>
                                          <button
                                            onClick={() => setRejectModal({ show: true, milestone, reason: '' })}
                                            disabled={processingId === milestone.id}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded text-xs font-medium transition-colors"
                                          >
                                            <XCircle className="w-3 h-3" />
                                            Reject
                                          </button>
                                        </>
                                      ) : milestone.work_status === 'approved' ? (
                                        <span className="text-xs text-green-600 font-medium">✓ Approved</span>
                                      ) : milestone.work_status === 'rejected' ? (
                                        <span className="text-xs text-red-600 font-medium">✗ Rejected</span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {lastPage}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
              const page = currentPage + i - 2;
              return page > 0 && page <= lastPage ? (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ) : null;
            })}

            <button
              onClick={() => setCurrentPage(Math.min(lastPage, currentPage + 1))}
              disabled={currentPage === lastPage}
              className="px-4 py-2 border rounded-lg disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Reject {rejectModal.milestone ? 'Milestone' : 'Work'}
                </h3>
              </div>

              <p className="text-gray-600 mb-4">
                {rejectModal.milestone ? (
                  <>Rejecting milestone: <strong>{rejectModal.milestone.title}</strong></>
                ) : (
                  <>Rejecting work from <strong>{rejectModal.payment?.candidate?.first_name} {rejectModal.payment?.candidate?.last_name}</strong></>
                )}
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for rejection (required)
                </label>
                <textarea
                  value={rejectModal.reason}
                  onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
                  placeholder="Please explain why this is being rejected..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{rejectModal.reason.length}/500 characters</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setRejectModal({ show: false, reason: '' })}
                  disabled={!!processingId}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:bg-gray-100 font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!!processingId || !rejectModal.reason.trim()}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium"
                >
                  {processingId ? 'Processing...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsHistory;