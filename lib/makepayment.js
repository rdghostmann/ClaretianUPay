'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

// Dynamically import PaystackButton to ensure it only loads on the client
const PaystackButton = dynamic(
  () => import('react-paystack').then((module) => module.PaystackButton),
  { ssr: false }
);

const SchoolPay = () => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY; // Ensure the public key is available in your .env.local file
 
  const [paymentData, setPaymentData] = useState({
    email: '',
    amount: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const amountInKobo = parseFloat(paymentData.amount || 0) * 100; // Ensure amount is not NaN

  const paystackProps = {
    email: paymentData.email,
    amount: amountInKobo,
    publicKey,
    metadata: {
      name: paymentData.name,
    },
    text: 'Make Payment',
    onSuccess: (reference) => {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: `Transaction Reference: ${reference.reference}`,
      });
    },
    onClose: () => {
      Swal.fire({
        icon: 'info',
        title: 'Payment Cancelled',
        text: 'You closed the payment window.',
      });
    },
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-black rounded-lg">
      <h1 className="text-xl font-bold text-center mb-4">School Fees Payment</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="amount" className="block font-medium">
            School Fees Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="amount"
            className="w-full px-3 py-2 border rounded"
            required
            value={paymentData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-medium">
            Payer's Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-3 py-2 border rounded"
            required
            value={paymentData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Payer's Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border rounded"
            required
            value={paymentData.email}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="mt-4">
        {publicKey && (
          <PaystackButton
            {...paystackProps}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          />
        )}
      </div>
    </div>
  );
};

export default SchoolPay;
