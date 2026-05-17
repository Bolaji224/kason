import React, { useEffect, useState } from 'react';
import { httpGetWithToken, httpPostWithToken } from '../../../../utils/http_utils';
import WithdrawalModal from './WithdrawalModal';


interface WalletCardProps {
  email: string;
  userId: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ email, userId }) => {
  const [walletToken, setWalletToken] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchWalletData();
    }
  }, [userId]);

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const response = await httpGetWithToken(`candidate/wallet/${userId}`);
      console.log('Wallet Response:', response);
      
      if (response?.error) {
        console.error('API Error:', response.error);
        setIsLoading(false);
        return;
      }
      
      setBalance(response?.balance || 0);
      setWalletToken(response?.wallet_token || null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      setIsLoading(false);
    }
  };

  const generateWalletToken = async () => {
    setIsGeneratingToken(true);
    try {
      const response = await httpPostWithToken(`candidate/wallet/generate-token`, {});
      if (response?.error) {
        alert(response.error || 'Failed to generate wallet token');
        console.error('API Error:', response.error);
        return;
      }
      setWalletToken(response?.wallet_token || null);
      alert('Wallet token generated successfully!');
    } catch (error) {
      console.error('Error generating token:', error);
      alert('Failed to generate wallet token');
    } finally {
      setIsGeneratingToken(false);
    }
  };

  const copyToClipboard = () => {
    if (walletToken) {
      navigator.clipboard.writeText(walletToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleWithdrawalSuccess = () => {
    // Refresh wallet data after successful withdrawal
    fetchWalletData();
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold font-sans mb-4">Available Balance</h2>
        <p className="text-3xl font-bold text-green-500 font-merri">
          ₦{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        
        <button
          onClick={() => setShowWithdrawalModal(true)}
          disabled={balance <= 0}
          className="mt-4 bg-[#EE009D] text-white font-sans font-light text-[16px] py-2 px-4 rounded-[5px] hover:bg-[#2AA100] disabled:bg-gray-400 disabled:cursor-not-allowed transform transition-transform duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          Withdraw Funds
        </button>

        {/* Wallet Token Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Wallet Token</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share this token with employers to receive payments
          </p>

          {isLoading ? (
            <p className="text-sm text-gray-500 mb-4">Loading token...</p>
          ) : walletToken ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm font-mono break-all text-gray-700">
                  {walletToken}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-sans font-light text-[14px] py-2 px-3 rounded-[5px] transition-colors duration-200"
                >
                  {copiedToken ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">No token generated yet</p>
          )}

          <button
            onClick={generateWalletToken}
            disabled={isGeneratingToken}
            className="mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-sans font-light text-[16px] py-2 px-4 rounded-[5px] transform transition-transform duration-300 hover:scale-105"
          >
            {isGeneratingToken ? 'Generating...' : walletToken ? 'Regenerate Token' : 'Generate Token'}
          </button>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        onSuccess={handleWithdrawalSuccess}
        userId={userId}
      />
    </>
  );
};

export default WalletCard;