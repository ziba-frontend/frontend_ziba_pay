import Link from "next/link";
import React from "react";

const ZibaSec = () => {
   return (
      <div className='container '>
         <div className='mt-6 mb-6'>
            <p>
               <span className='mr-2'> Ziba pay</span>
               {">"}
               <span className='mx-2'>General</span>
               {">"}
               <span className='ml-2'>FAQ</span>
            </p>
         </div>
         <div>
            <div className='my-4 mt-20 flex gap-20 flex-col md:flex-row'>
               <div>
                  <h4>Articles in this section</h4>
                  <Link href='./ziba-pay-security'>
                     <p>How secure is Ziba pay?</p>
                  </Link>
                  <Link href='./virtual-accounts'>
                     <p>Virtual Accounts</p>
                  </Link>
                  <Link href='./ziba-pay-apis'>
                     {" "}
                     <p>Ziba pay APIs</p>
                  </Link>
               </div>
               <div className='w-full md:w-3/4'>
                  <h2>How Secure is Ziba pay?</h2>
                  <span className='mx-2 text-blue-400'>1 months ago</span>
                  <span className='mx-2 text-blue-400'>Updated</span>
                  <div className="mt-8">
                     <ul className='flex flex-col gap-6'>
                        <li>
                           At Ziba Pay, we understand the importance of security
                           when it comes to handling financial transactions.
                           That's why we've implemented robust security measures
                           to protect our users' sensitive information and
                           ensure a safe payment environment
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
