import React, { useState } from 'react';
import EmployersWalletCard from './WalletCard';
import AddFundsModal from './AddFundModal';
import { iProfileCompany } from '../../../../models/profle';
import PaymentsHistory from './PaymentsHistory';

interface Props {
  profile: iProfileCompany;
}

const EmployersWalletPage: React.FC<Props> = ({ profile }) => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(0);

  return (
    <div className="space-y-6">
      <EmployersWalletCard
        profile={profile}
        onAddFundsClick={() => setShowAddFunds(true)} // opens modal
        onWithdrawClick={() => console.log("Withdraw clicked")}
      />

      {showAddFunds && (
        <AddFundsModal
          profile={profile}
          onClose={() => setShowAddFunds(false)} // closes modal
          paymentDone={() => {
            console.log("Payment successful!");
            setShowAddFunds(false);
            setRefreshHistory(refreshHistory + 1); 
          }}
        />
      )}

      {/* Payments History */}
      <PaymentsHistory key={refreshHistory} />
    </div>
  );
};

export default EmployersWalletPage;
