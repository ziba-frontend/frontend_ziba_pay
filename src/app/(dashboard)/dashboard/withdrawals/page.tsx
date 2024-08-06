import Withdrawal from '@/components/pages/Withdrawals'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Withdrawals - Dashboard",
   description: "Withdrawals",
};
const page = () => {
  return (
    <Withdrawal/>
  )
}

export default page
