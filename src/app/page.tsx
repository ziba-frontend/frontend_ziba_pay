import Home from '@/components/pages/Home'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Home - Ziba Pay",
   description: "Zibapay landing page",
};


const page = () => {
  return (
   <Home/>
  )
}

export default page
