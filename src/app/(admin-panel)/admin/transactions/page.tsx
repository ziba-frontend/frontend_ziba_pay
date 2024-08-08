import Transactions from '@/components/pages/Transactions'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Transactions - Dashboard",
   description: "Transactions ",
};

const page = () => {
  return (
    <Transactions/>
  )
}

export default page
