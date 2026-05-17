import React, { useState, useEffect } from 'react';
import { httpPostWithToken, httpGetWithToken } from '../../../../utils/http_utils';
import { X, AlertCircle, Banknote, Info } from 'lucide-react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

interface WithdrawalBalance {
  wallet_balance: number;
  approved_balance: number;
  withdrawn_or_pending: number;
  available_for_withdrawal: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userId,
}) => {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [iban, setIban] = useState('');
  const [loading, setLoading] = useState(false);
  const [balanceInfo, setBalanceInfo] = useState<WithdrawalBalance | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchAvailableBalance();
    }
  }, [isOpen]);

  const fetchAvailableBalance = async () => {
    setLoadingBalance(true);
    try {
      const response = await httpGetWithToken('candidate/withdrawal-balance');
      console.log('Full Wallet Response:', JSON.stringify(response)); // ← add this
      if (response) {
        setBalanceInfo({
          wallet_balance: response.wallet_balance ?? 0,
          approved_balance: response.total_approved ?? response.approved_balance ?? 0,
          withdrawn_or_pending: response.withdrawn_or_pending ?? 0,
          available_for_withdrawal: response.available_for_withdrawal ?? 0,
        });
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoadingBalance(false);
    }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!amount || parseFloat(amount) < 500) {
      setError('Minimum withdrawal amount is ₦500');
      return;
    }

    if (!balanceInfo) {
      setError('Unable to load balance information');
      return;
    }

    const availableAmount = balanceInfo.available_for_withdrawal || 0;
    if (parseFloat(amount) > availableAmount) {
      setError(`You can only withdraw ₦${availableAmount.toLocaleString()} from employer-approved work`);
      return;
    }

    if (!bankName.trim()) {
      setError('Please enter your bank name');
      return;
    }

    if (!accountName.trim()) {
      setError('Please enter your account name');
      return;
    }

    // Either account number OR IBAN must be provided
    if (!accountNumber.trim() && !iban.trim()) {
      setError('Please provide either an account number or IBAN');
      return;
    }

    // If account number provided and looks like Nigerian (10 digits), validate length
    if (accountNumber.trim() && /^\d+$/.test(accountNumber) && accountNumber.length !== 10) {
      setError('Nigerian account numbers must be exactly 10 digits. For international accounts, please use the IBAN field instead.');
      return;
    }

    // Basic SWIFT/BIC format check if provided (8 or 11 chars)
    if (swiftCode.trim() && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i.test(swiftCode.trim())) {
      setError('SWIFT/BIC code format is invalid. It should be 8 or 11 characters (e.g. GTBINGLA)');
      return;
    }

    setLoading(true);

    try {
      const response = await httpPostWithToken('candidate/withdrawals', {
        amount: parseFloat(amount),
        bank_name: bankName.trim(),
        account_number: accountNumber.trim() || null,
        account_name: accountName.trim(),
        swift_code: swiftCode.trim() || null,
        iban: iban.trim() || null,
      });

      if (response?.status === 'success') {
        alert(
          `✓ Withdrawal request submitted!\nReference: ${response.data.reference}\nAmount: ₦${parseFloat(amount).toLocaleString()}\n\nYour request is pending admin approval.`
        );
        onSuccess();
        handleClose();
      } else {
        setError(response?.error || 'Failed to submit withdrawal request');
      }
    } catch (error: any) {
      console.error('Error submitting withdrawal:', error);
      if (error?.response?.data?.error) {
        setError(error.response.data.error);
      } else if
(error?.
response?.data?.data?.message) {
        setError(error.response.data.data.message);
      } else {
        setError('Failed to submit withdrawal request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setBankName('');
    setAccountNumber('');
    setAccountName('');
    setSwiftCode('');
    setIban('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const isDisabled = !balanceInfo || (balanceInfo.available_for_withdrawal || 0) === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Banknote className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Withdraw Funds</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Balance Info */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-b border-gray-200">
          {loadingBalance ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600" />
              <p className="mt-2 text-sm text-gray-600">Loading balance...</p>
            </div>
          ) : balanceInfo ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Wallet Balance:</span>
                <span className="text-lg font-semibold text-gray-900">
                  ₦{(balanceInfo.wallet_balance || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approved by Employers:</span>
                <span className="text-lg font-semibold text-green-600">
                  ₦{(balanceInfo.approved_balance || 0).toLocaleString()}
                </span>
              </div>
              {(balanceInfo.withdrawn_or_pending || 0) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Withdrawal:</span>
                  <span className="text-sm font-medium text-amber-600">
                    −₦{(balanceInfo.withdrawn_or_pending || 0).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Available to Withdraw:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₦{(balanceInfo.available_for_withdrawal || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              {(balanceInfo.available_for_withdrawal || 0) === 0 && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      No funds available for withdrawal. Wait for employers to approve your completed work.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500"
>Unable to load balance information</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Withdrawal Amount (₦)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="500"
              max={balanceInfo?.available_for_withdrawal || 0}
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isDisabled}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Minimum: ₦500 · Maximum: ₦{(balanceInfo?.available_for_withdrawal || 0).toLocaleString()}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Bank Details
            </p>

            {/* Bank Name */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. GTBank, Barclays, Chase"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isDisabled}
                  required
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Full name as registered with your bank"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isDisabled}
                  required
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Account Number
                  <span className="ml-1 text-xs text-gray-400 font-normal">(required if no IBAN)</span>
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\s/g, ''))}
                  placeholder="e.g. 0123456789"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isDisabled}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Nigerian accounts: 10 digits. International: enter your account number as-is.
                </p>
              </div>

              {/* SWIFT / BIC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
SWIFT / BIC Code
                  <span className="ml-1 text-xs text-gray-400 font-normal">(for international transfers)</span>
                </label>
                <input
                  type="text"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value.toUpperCase().replace(/\s/g, ''))}
                  placeholder="e.g. GTBINGLA"
                  maxLength={11}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isDisabled}
                />
                <p className="mt-1 text-xs text-gray-400">8 or 11 characters</p>
              </div>

              {/* IBAN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  IBAN
                  <span className="ml-1 text-xs text-gray-400 font-normal">(for international transfers)</span>
                </label>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value.toUpperCase().replace(/\s/g, ''))}
                  placeholder="e.g. GB29NWBK60161331926819"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li>Withdrawal requests are processed within 24–48 hours</li>
                  <li>Ensure all bank details are correct to avoid delays</li>
                  <li>You can only withdraw from employer-approved work</li>
                  <li>For international transfers, SWIFT/BIC and IBAN are recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:bg-gray-100 font-medium text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isDisabled}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Processing...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalModal;