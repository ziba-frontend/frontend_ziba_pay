"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Zibapis = () => {
   const articleId = "ziba-pay-apis";
   const [helpfulCount, setHelpfulCount] = useState(0);
   const [notHelpfulCount, setNotHelpfulCount] = useState(0);
   const [userFeedback, setUserFeedback] = useState<
      "helpful" | "notHelpful" | null
   >(null);

   return (
      <div className="container ">
         <div className="mt-6 mb-6 ">
            <p>
               <span className="hover:text-main cursor-default mr-2">
                  {" "}
                  <Link href="/zibapay-help-center">Ziba pay</Link>
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
               <div className="mt-6 hidden md:flex flex-col gap-3">
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
               <div className="w-full md:w-3/4 mt-20 md:mt-0">
                  <div className=" border-b pb-40">
                     <h2>Ziba pay APIs</h2>
                     <span className="mx-2 text-blue-400">1 months ago</span>
                     <span className="mx-2 text-blue-400">Updated</span>
                     <div className="mt-10">
                        <ul className="flex flex-col gap-6">
                           <li>
                              <h4 className="my-2">
                                 What are Ziba Pay APIs, and how can they
                                 benefit my business?
                              </h4>
                              <p>
                                 Ziba Pay APIs (Application Programming
                                 Interfaces) are software interfaces that allow
                                 different systems or applications to
                                 communicate with and access Ziba Pay&apos;s
                                 services and functionalities. Integrating Ziba
                                 Pay APIs into your business systems can
                                 streamline payment processes, enhance customer
                                 experience, and provide access to advanced
                                 features such as payment processing, invoicing,
                                 and financial management tools.
                              </p>
                           </li>
                           <li>
                              <h4 className="my-2">
                                 How do I integrate Ziba Pay APIs into my
                                 existing systems or applications?
                              </h4>
                              <p>
                                 Integrating Ziba Pay APIs into your existing
                                 systems or applications is a straightforward
                                 process. Ziba Pay provides comprehensive
                                 documentation, developer resources, and sample
                                 code to guide you through the integration
                                 process. Additionally, our developer support
                                 team is available to assist you with any
                                 technical questions or issues that may arise
                                 during the integration process.
                              </p>
                           </li>
                           <li>
                              <h4 className="my-2">
                                 Are Ziba Pay APIs secure, and what measures are
                                 in place to protect my data and transactions?
                              </h4>
                              <p>
                                 Yes, Ziba Pay APIs are designed with security
                                 in mind, and we have implemented robust
                                 security measures to protect your data and
                                 transactions. Our APIs use industry-standard
                                 encryption protocols to secure data
                                 transmission, and we adhere to strict security
                                 standards such as PCI DSS (Payment Card
                                 Industry Data Security Standard) compliance.
                                 Additionally, we employ measures such as
                                 authentication, authorization, and access
                                 controls to ensure that only authorized users
                                 and applications can access our APIs and
                                 perform transactions.
                              </p>
                           </li>
                        </ul>
                     </div>
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-center py-10 border-b">
                     <p>Was this article helpful?</p>
                     <div>
                        <Button
                           variant="outline"
                           className="mx-2"
                           disabled={userFeedback === "helpful"}
                        >
                           Yes
                        </Button>
                        <Button
                           variant="outline"
                           className="mx-2"
                           disabled={userFeedback === "notHelpful"}
                        >
                           No
                        </Button>
                     </div>
                     <p>
                        {helpfulCount} out of {helpfulCount + notHelpfulCount}{" "}
                        found it helpful
                     </p>
                     <p>
                        Have more questions ?{" "}
                        <Link href="request">Submit a request</Link>
                     </p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <h3>Related article</h3>
                     <Link href="./ziba-pay-apis">Ziba pay APIs</Link>
                     <Link href="./help-center">Getting Started</Link>
                     <Link href="/ziba-pay-apis">Pricing </Link>
                     <Link href="/ziba-pay-apis">Disputes</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Zibapis;
