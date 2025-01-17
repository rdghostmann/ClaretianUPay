import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { amount, payerName, payerEmail } = await req.json();

    if (!amount || !payerName || !payerEmail) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: payerEmail,
        amount: parseFloat(amount) * 100, // Paystack requires amount in kobo
        reference: `REF-${Date.now()}`,
        metadata: {
          payerName,

        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status) {
      return NextResponse.json({ message: 'Payment initialized', data: response.data.data });
    } else {
      return NextResponse.json({ message: 'Payment initialization failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
