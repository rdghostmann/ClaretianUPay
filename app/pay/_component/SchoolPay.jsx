'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import Image from 'next/image';
import HeaderImg from '../../../public/pexels-ifreestock-585752.jpg';

// Dynamically import PaystackButton to ensure it only loads on the client
const PaystackButton = dynamic(
  () => import('react-paystack').then((module) => module.PaystackButton),
  { ssr: false }
);

const SchoolPay = () => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY; // Ensure the public key is available in your .env.local file

  const fees = [
    { feeName: 'Tuition Fee', feeAmount: 50000 },
    { feeName: 'Library Fee', feeAmount: 15000 },
    { feeName: 'Hostel Fee', feeAmount: 25000 },
    { feeName: 'Lab Fee', feeAmount: 20000 },
    { feeName: 'Sports Fee', feeAmount: 10000 },
  ];

  const [paymentData, setPaymentData] = useState({
    email: '',
    amount: '',
    name: '',
    selectedFee: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'selectedFee' && {
        amount: fees.find((fee) => fee.feeName === value)?.feeAmount || '',
      }),
    }));
  };

  const amountInKobo = parseFloat(paymentData.amount || 0) * 100; // Ensure amount is not NaN

  const paystackProps = {
    email: paymentData.email,
    amount: amountInKobo,
    publicKey,
    metadata: {
      name: paymentData.name,
      selectedFee: paymentData.selectedFee,
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
    <div className="w-full flex flex-col lg:flex-row min-h-screen p-24">
      {/* Left Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={HeaderImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="max-w-xs rounded-2xl mx-auto border border-slate-500 bg-slate-100 text-sm text-center mb-4">seamless payment experience</h1>
          <h3 className="text-xl font-bold text-center mb-4">ClaretianUPay </h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="selectedFee" className="block font-medium">
                Select Fee
              </label>
              <select
                name="selectedFee"
                id="selectedFee"
                className="w-full px-3 py-2 border rounded"
                required
                value={paymentData.selectedFee}
                onChange={handleInputChange}
              >
                <option value="">-- Select Fee --</option>
                {fees.map((fee) => (
                  <option key={fee.feeName} value={fee.feeName}>
                    {fee.feeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block font-medium">
                Fee Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="w-full px-3 py-2 border rounded"
                value={paymentData.amount}
                disabled
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
      </div>
    </div>
  );
};

export default SchoolPay;
