import React from 'react'
import successIm from "../../../../public/images/success.png"
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
    <Image src={successIm} alt="success"/>
    <p className="text-2xl">Payment Successful</p>
    <small className="text-gray-500">You paid RWF 350 to Kigali Mart</small>
    <Link href="/">Go Back to Homepage</Link>
</div>
  )
}

export default page
