import ApproavedNums from '@/components/pages/ApproavedNumbers'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Approaved Numbers - Dashboard",
   description: "Approaved numbers",
};


const page = () => {
  return (
    <ApproavedNums/>
  )
}

export default page
