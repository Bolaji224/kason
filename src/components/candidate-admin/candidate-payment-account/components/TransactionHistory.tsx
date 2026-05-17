import React from 'react';

const transactions = [
  { id: 1, date: '2024-08-01', amount: 150, description: 'Job Payment' },
  { id: 2, date: '2024-07-28', amount: -50, description: 'Withdrawal' },
  { id: 3, date: '2024-07-20', amount: 200, description: 'Job Payment' },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Date</th>
            <th className="pb-2">Description</th>
            <th className="pb-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id} className="border-t">
              <td className="py-2">{transaction.date}</td>
              <td className="py-2">{transaction.description}</td>
              <td className={`py-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.amount < 0 ? '-' : '+'}₦{Math.abs(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
