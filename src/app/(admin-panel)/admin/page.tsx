import AdminHome from '@/components/admin/AdminHome';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Admin Dashboard - Zibapay",
   description: "Zibapay dashboard",
};

const page = () => {
  return (
    <AdminHome/>
  )
}

export default page
