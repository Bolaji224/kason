import React, { useState } from 'react';
import { iProfileCompany } from '../../../../models/profle';

interface WithdrawFundsModalProps {
  onClose: () => void;
  onWithdraw: (amount: number, bankCode: string, accountNumber: string, recipientName: string) => void;
  profile : iProfileCompany
}

const WithdrawFundsModal: React.FC<WithdrawFundsModalProps> = ({ onClose, onWithdraw }) => {
  const [amount, setAmount] = useState(0);
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const handleWithdrawClick = () => {
    onWithdraw(amount, bankCode, accountNumber, recipientName);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          className="w-full border rounded-lg p-2 mb-4"
        />
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="Recipient Name"
          className="w-full border rounded-lg p-2 mb-4"
        />
        <input
          type="text"
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
          placeholder="Bank Code"
          className="w-full border rounded-lg p-2 mb-4"
        />
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          className="w-full border rounded-lg p-2 mb-4"
        />
        <button
          onClick={handleWithdrawClick}
          className="text-white bg-[#ee009d] font-sans font-light text-[16px]  py-2 px-4 rounded-[5px] hover:bg-[#ee009d] transform transition-transform duration-300 hover:scale-105 w-full mb-2"
        >
          Withdraw
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WithdrawFundsModal;
