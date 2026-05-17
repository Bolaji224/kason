import React, { useContext, useEffect, useState } from 'react';
import TransactionHistory from './components/TransactionHistory';
import AddFundsModal from './components/AddFundModal';

import axios from 'axios';
import WithdrawFundsModal from './components/WithDrawFundsModal';
import EmployersWalletCard from './components/WalletCard';
import { httpGetWithToken } from '../../../utils/http_utils';
import { AppContext } from '../../../global/state';
import { iProfileCompany } from '../../../models/profle';

const EmployersWallet: React.FC = () => {
  const [isAddFundsOpen, setAddFundsOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [profile, setProfile] = useState<iProfileCompany>({});
  const {updateUser}:any = useContext(AppContext)

  const openAddFundsModal = () => setAddFundsOpen(true);
  const closeAddFundsModal = () => setAddFundsOpen(false);

  const openWithdrawModal = () => setWithdrawOpen(true);
  const closeWithdrawModal = () => setWithdrawOpen(false);
  const getProfile = async () => {
    const res = await httpGetWithToken("employer/profile");
    updateUser(res.data)
    setProfile(res.data)
  }

  useEffect(()=> {
    getProfile();
  }, [])
  const handleWithdraw = async (amount: number, bankCode: string, accountNumber: string, recipientName: string) => {
    try {
      const response = await axios.post('/withdraw', {
        amount,
        bank_code: bankCode,
        account_number: accountNumber,
        recipient_name: recipientName,
      });

      console.log('Withdrawal successful:', response.data);
      closeWithdrawModal();
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert('There was an issue processing your withdrawal. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      <EmployersWalletCard 
        onAddFundsClick={openAddFundsModal}
        onWithdrawClick={openWithdrawModal}
        profile={profile}
      />
      <TransactionHistory />
      {isAddFundsOpen && <AddFundsModal paymentDone={()=> {
        setAddFundsOpen(false)
        getProfile()
      }} profile={profile} onClose={closeAddFundsModal} />}
      {isWithdrawOpen && <WithdrawFundsModal profile={profile} onWithdraw={handleWithdraw} onClose={closeWithdrawModal} />}
    </div>
  );
};

export default EmployersWallet;
