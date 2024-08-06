import Events from '@/components/pages/Events'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Events - Dashboard",
   description: "Events",
};
const page = () => {
  return (
    <Events/>
  )
}

export default page
