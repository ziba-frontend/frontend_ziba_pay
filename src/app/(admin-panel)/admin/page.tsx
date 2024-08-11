import AdminHome from '@/components/admin/AdminHome';
import DashboardHome from '@/components/pages/DashboardHome'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
   title: "Dashboard - Zibapay",
   description: "Zibapay dashboard",
};

const page = () => {
  return (
    <AdminHome/>
  )
}

export default page
