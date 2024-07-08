"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/svg/logo.svg";
import help2 from "../../../../public/images/help2.png";
import Link from "next/link";

// Define the search data type
interface SearchData {
  title: string;
  link: string;
}

// Sample search data

const WithoutSearchLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="border-b-none">
        <div className="flex justify-between items-center h-[100px] container">
          <Link href="/">
            <Image src={logo} alt="zibaPay" className="-z-10" />
          </Link>

          <Button>
            <Link href="/help-center/request">Submit a Request</Link>
          </Button>
        </div>
      </div>

      <section className="min-h-[75vh] border-b">{children}</section>
      <div className="flex items-start h-[80px] container mt-6">
        <Link href="/">
          <h4>Ziba Pay</h4>
        </Link>
      </div>
      <Image
        src={help2}
        alt="ziba help center"
        className="fixed right-0 -bottom-20 -z-20"
      />
    </>
  );
};

export default WithoutSearchLayout;
