import Link from "next/link";
import React from "react";

const ZibaSec = () => {
   return (
      <div className="container ">
       <div className="mt-6 mb-6 hidden sm:block">
            <p>
               <span className="hover:text-main cursor-default mr-2">
               {" "}<Link href="/zibapay-help-center">
                  Ziba pay
                  </Link>
               </span>
               {">"}
               <span className="hover:text-main cursor-default mx-2">
                  General
               </span>
               {">"}
               <span className="hover:text-main cursor-default ml-2">FAQ</span>
            </p>
         </div>
         <div>
            <div className="my-4 mt-20 flex gap-20 flex-col md:flex-row">
            <div className="mt-6 sm:mt-0 flex flex-col gap-3">
                  <h4 className="">Articles in this section</h4>
                  <p>
                     {" "}
                     <Link href="./ziba-pay-security">
                        How secure is Ziba pay?
                     </Link>
                  </p>
                  <p>
                     {" "}
                     <Link href="./virtual-accounts">Virtual Accounts </Link>
                  </p>{" "}
                  <p>
                     {" "}
                     <Link href="./ziba-pay-apis">Ziba pay APIs</Link>
                  </p>
               </div>
               <div className="w-full md:w-3/4">
                  <h2>How Secure is Ziba pay?</h2>
                  <span className="mx-2 text-blue-400">1 months ago</span>
                  <span className="mx-2 text-blue-400">Updated</span>
                  <div className="mt-8">
                     <ul className="flex flex-col gap-6 list-disc list-outside ">
                        <li>
                           At Ziba Pay, we understand the importance of security
                           when it comes to handling financial transactions.
                           That&apos;s why we&apos;ve implemented robust
                           security measures to protect our users&apos;
                           sensitive information and ensure a safe payment
                           environment
                        </li>
                        <li>
                           We use advanced encryption technology to safeguard
                           your data during transmission, making it virtually
                           impossible for unauthorized parties to intercept and
                           access your information.
                        </li>
                        <li>
                           {" "}
                           Ziba Pay complies with industry-standard security
                           regulations and best practices, including PCI DSS
                           (Payment Card Industry Data Security Standard), to
                           ensure the highest level of security for your payment
                           transactions.
                        </li>
                        <li>
                           Our system incorporates sophisticated fraud detection
                           algorithms and mechanisms to detect and prevent
                           fraudulent activities, safeguarding both businesses
                           and their customers from fraudulent transactions.
                        </li>
                        <li>
                           {" "}
                           We employ state-of-the-art infrastructure and
                           security protocols to protect our servers and
                           databases from unauthorized access, ensuring the
                           integrity and confidentiality of your data.
                        </li>
                        <li>
                           Our security team conducts regular monitoring and
                           audits of our systems to identify and address any
                           potential security vulnerabilities or threats
                           proactively.
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ZibaSec;
