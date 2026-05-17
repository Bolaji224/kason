import React from 'react';
import WalletCard from './components/WalletCard';
import TransactionHistory from './components/TransactionHistory';

const CandidateWallet: React.FC = () => {
  const userId = localStorage.getItem('userId') || '';
  const email = localStorage.getItem('email') || 'user@example.com';

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      <WalletCard email={email} userId={userId} />
      <TransactionHistory />
    </div>
  );
};

export default CandidateWallet;