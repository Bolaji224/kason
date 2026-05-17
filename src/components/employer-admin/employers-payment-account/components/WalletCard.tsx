import React from 'react';
import { iProfileCompany } from '../../../../models/profle';

interface EmployersWalletCardProps {
  onAddFundsClick: () => void; // Called when Add Funds button is clicked
  onWithdrawClick: () => void; // Called when Withdraw button is clicked
  profile: iProfileCompany;
}

const EmployersWalletCard: React.FC<EmployersWalletCardProps> = ({
  onAddFundsClick,
  onWithdrawClick,
  profile,
}) => {
  // Ensure wallet is treated as number
  const balance = 0;

  return (
    <div className="lg:ml-64 bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Available Balance</h2>
      <p className="text-3xl font-bold text-green-500">
        N{balance.toLocaleString()}
      </p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={onAddFundsClick} // Trigger modal open
          className="bg-[#2AA100] text-white py-2 px-4 rounded-[5px] hover:bg-[#2AA100] transform transition-transform duration-300 hover:scale-105"
        >
          Add Funds
        </button>

        <button
          onClick={onWithdrawClick}
          className="bg-[#ee009d] text-white py-2 px-4 rounded-[5px] transform transition-transform duration-300 hover:scale-105"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default EmployersWalletCard;
