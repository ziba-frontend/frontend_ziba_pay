import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const VAccounts = () => {
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
                  <div className=' border-b pb-40'>
                     <h2>Virtual Account?</h2>
                     <span className='mx-2 text-blue-400'>1 months ago</span>
                     <span className='mx-2 text-blue-400'>Updated</span>
                     <div className='mt-10'>
                        <ul className='flex flex-col gap-6'>
                           <li>
                              <h4>What is a Virtual Account?</h4>
                              <p>
                                 A virtual account is a type of bank account
                                 that exists digitally and is typically used for
                                 specific purposes such as receiving payments,
                                 making transactions, or managing funds online.
                                 Unlike traditional bank accounts, virtual
                                 accounts often don't have physical counterparts
                                 like debit cards or checkbooks.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 How can I benefit from having a virtual account
                                 with Ziba Pay?
                              </h4>
                              <p>
                                 Having a virtual account with Ziba Pay offers
                                 several benefits, including increased
                                 flexibility in managing finances, enhanced
                                 security features, streamlined payment
                                 processes, improved cash flow management, and
                                 access to integrated banking services.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 Is it secure to use virtual accounts for my
                                 transactions?
                              </h4>
                              <p>
                                 Yes, virtual accounts offered by Ziba Pay are
                                 secure, with advanced security measures such as
                                 encryption, two-factor authentication, and
                                 real-time transaction monitoring to protect
                                 users' funds from unauthorized access and
                                 fraudulent activity.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 Can I send and receive payments using my
                                 virtual account?
                              </h4>
                              <p>
                                 Yes, you can send and receive payments using
                                 your virtual account, making it easy to conduct
                                 transactions with vendors, suppliers,
                                 customers, or other parties.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 How do I access and manage my virtual account?
                              </h4>
                              <p>
                                 You can access and manage your virtual account
                                 through the Ziba Pay platform, where you can
                                 view account balances, initiate transfers,
                                 track transactions, and perform other banking
                                 activities.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 Can I link my virtual account to my existing
                                 bank account?
                              </h4>
                              <p>
                                 Yes, you can link your virtual account to your
                                 existing bank account for easy transfers and
                                 withdrawals.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 Can I use my virtual account for both personal
                                 and business transactions?
                              </h4>
                              <p>
                                 Yes, you can use your virtual account for both
                                 personal and business transactions, depending
                                 on your needs and preferences.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 How quickly are transactions processed through
                                 a virtual account?
                              </h4>
                              <p>
                                 Transactions processed through a virtual
                                 account are typically processed quickly, with
                                 funds being transferred or received within a
                                 short timeframe.
                              </p>
                           </li>
                           <li>
                              <h4>
                                 Can I set up recurring payments or automatic
                                 transfers with my virtual account?
                              </h4>
                              <p>
                                 Yes, you can set up recurring payments or
                                 automatic transfers with your virtual account,
                                 making it easy to manage regular expenses or
                                 payments.
                              </p>
                           </li>
                        </ul>
                     </div>
                  </div>

                  <div className='flex flex-col gap-4 items-center justify-center py-10 border-b'>
                     <p>Was this article helpful?</p>
                     <div>
                        <Button
                           variant='outline'
                           className='mx-2'
                        >
                           Yes
                        </Button>
                        <Button
                           variant='outline'
                           className='mx-2'
                        >
                           No
                        </Button>
                     </div>
                     <p>0 out of 0 found it helpful</p>
                     <p>
                        Have more questions ?{" "}
                        <Link href='request-form'>Submit a request</Link>
                     </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                     <h3>Related article</h3>
                     <Link href='/ziba-pay-apis'>Ziba pay APIs</Link>
                     <Link href='/ziba-pay-apis'>Getting Started</Link>
                     <Link href='/ziba-pay-apis'>Pricing </Link>
                     <Link href='/ziba-pay-apis'>Disputes</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VAccounts;
