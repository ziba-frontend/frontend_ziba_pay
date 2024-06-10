import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import uber from "../../public/images/uber.png";
import mtn from "../../public/images/mtn.png";
import pigg from "../../public/images/pigg.png";
import microsoft from "../../public/images/microsoft.png";
import wise from "../../public/images/wise.png";
import chipper from "../../public/images/chipper.png";
import fr1 from "../../public/images/fr1.png";
import fr2 from "../../public/images/fr2.png";
import fr3 from "../../public/images/fr3.png";
import fr4 from "../../public/images/fr4.png";
import offer1 from "../../public/images/offer1.png";
import track from "../../public/images/track.png";
import smile from "../../public/images/smileman.png";
import send1 from "../../public/images/send1.png";
import send2 from "../../public/images/send2.png";
import oval from "../../public/images/oval.png";
import curvedImg from "../../public/images/rect1.png";
import Link from "next/link";
import phone from "../../public/images/phone.png";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import CheckList from "@/components/CheckList";
import Slider from "@/components/Slider";

const Home = () => {
   return (
      <>
         <Navbar />
         <div>
            {/* ===============HERO SECTION================== */}
            <div className='flex items-center mx-auto text-center flex-col py-4 prose container min-h-[60vh] justify-center'>
               <Image
                  src={oval}
                  alt='oval'
                  className='absolute top-[100px] -left-10 -z-10'
               />
               <h4>
                  Introducing Ziba <span className='text-main'>Pay</span>
               </h4>
               <h2 className='my-2'>
                  <span className='text-main'>Simplifying Payments</span> for{" "}
                  <br />
                  Businesses in Africa
               </h2>
               <p>
                  Ziba Pay offers businesses a streamlined and effective online
                  payment collection solution
               </p>
               <div className='flex gap-2 my-4'>
                  <Button variant='outline'>Login</Button>
                  <Button>Create Account</Button>
               </div>
            </div>
            <div className='flex flex-col container'>
               <p>We are trusted by 1Million+ businesses</p>
               <div className='flex gap-12 flex-wrap items-center my-10'>
                  <Image
                     src={uber}
                     alt='uber'
                  />
                  <Image
                     src={mtn}
                     alt='mtn'
                  />
                  <Image
                     src={chipper}
                     alt='chipper'
                  />
                  <Image
                     src={pigg}
                     alt='pigg'
                  />
                  <Image
                     src={wise}
                     alt='wise'
                  />
                  <Image
                     src={microsoft}
                     alt='microsoft'
                  />
               </div>
            </div>

            {/* =====FEATURES===== */}

            <div className='py-12 bg-br relative'>
               <Image
                  src={curvedImg}
                  alt='rect'
                  className='w-full absolute top-0 '
               />
               <div className='pt-40 flex items-center flex-col gap-6 container'>
                  <h1>Our Features</h1>
                  <p className='text-center'>
                     With features like customizable dashboards, real-time
                     alerts, and secure data encryption, you can effortlessly
                     manage your <br />
                     transactions and take control of your financial life.
                  </p>
                  <div className='flex items-center'>
                     <div className='flex flex-wrap w-5/6 gap-5 mx-auto items-end'>
                        <div className='flex flex-row gap-2 bg-submain p-8 h-fit rounded-lg text-white w-full md:w-[500px]'>
                           <div>
                              <h3 className='my-2'>Real-time Alerts</h3>
                              <p>
                                 Stay on top of your finances with our real-time
                                 alert feature! Get instant notifications about
                                 account activity, upcoming bills, and
                                 suspicious transactions so you can take action
                                 right away.
                              </p>
                           </div>
                           <Image
                              src={fr1}
                              alt='fr1'
                              width={200}
                              className='ml-2'
                           />
                        </div>
                        <div className='flex flex-row gap-2 bg-submain p-8 h-fit rounded-lg text-white w-full md:w-[500px]'>
                           <div>
                              <h3 className='my-2'>Customizable Dashboard</h3>
                              <p>
                                 Easily track spending, monitor balances, and
                                 view transaction history all in one place. Take
                                 control of your finances and see the
                                 information that matters most to you.
                              </p>
                           </div>
                           <Image
                              src={fr2}
                              alt='fr1'
                              width={200}
                              height={200}
                              className='ml-2'
                           />
                        </div>
                        <div className='flex flex-col gap-2 bg-submain p-8 h-fit rounded-lg text-white w-full md:w-[300px]'>
                           <Image
                              src={fr3}
                              alt='fr1'
                              width={90}
                              height={90}
                              className='ml-2'
                           />
                           <div>
                              <h3 className='my-2'>Ziba pay fraud detection</h3>
                              <p>
                                 Your money is 100% safe and secure on Ziba pay.
                                 No hassles, no glitches, get access to your
                                 money anytime.
                              </p>
                           </div>
                        </div>
                        <div className='flex flex-row gap-2 bg-submain p-6 h-fit rounded-xl text-white w-full md:w-[700px] items-center'>
                           <div>
                              <h3 className='my-2'>Friendly Interface</h3>
                              <p>
                                 Navigating through Ziba Pay is a breeze, thanks
                                 to our clean and clutter-free interface.
                                 Whether you're setting up payment workflows,
                                 customizing branding elements, or analyzing
                                 transaction data, you'll find everything you
                                 need right at your fingertips.
                              </p>
                           </div>
                           <Image
                              src={fr4}
                              alt='fr1'
                              width={200}
                              height={200}
                              className='ml-2 w-[80px] md:w-[200px]'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* =======OFFERS=========== */}

            <div className='py-12 relative'>
               <Image
                  src={curvedImg}
                  alt='rect'
                  className=' absolute left-0  top-0  -z-20 w-screen'
               />
               <h1 className='text-center mt-[7rem] mb-20'>
                  We have more offers for you
               </h1>
               <div className='flex flex-col gap-12 md:gap-5 md:flex-row items-center justify-center'>
                  <div>
                     <h2>Simplifying Payment Collection</h2>
                     <p>
                        Because starting a business is tough enough, but
                        collecting
                        <br /> money should be the easy part! At Ziba Pay, we're
                        here to <br />
                        streamline the process and make getting paid a breeze.
                     </p>
                  </div>
                  <Image
                     src={offer1}
                     alt='offers'
                     className='w-[200px] md:w-[500px]'
                  />
               </div>
            </div>
            {/* =======TRACKING=========== */}
            <div className=' py-6 relative'>
               <Image
                  src={curvedImg}
                  alt='rect'
                  className=' absolute left-0  top-0  -z-20 w-screen'
               />
               <div className='flex flex-col gap-12 md:gap-5 md:flex-row items-center justify-center mt-[8rem]'>
                  <div>
                     <h2 className='my-4'>Easy tracking</h2>
                     <p>
                        Easily track your payments with our payment tracking{" "}
                        <br />
                        feature. Monitor your bills and payments in one place,
                        and
                        <br /> get alerts when bills are due, so you never miss
                        a payment again.
                     </p>
                  </div>
                  <Image
                     src={track}
                     alt='offers'
                     className='w-[200px] md:w-[500px]'
                  />
               </div>
            </div>
            <div className='container py-6 '>
               <div className='flex flex-col gap-12 md:gap-5 md:flex-row items-center justify-center bg-submain text-white p-8'>
                  <div>
                     <h2 className='my-3'>
                        Ziba Pay offers well-documented and easy-to-use{" "}
                        <span className='text-main'>APIs for developers</span>{" "}
                     </h2>
                     <p>
                        Our comprehensive documentation and user-friendly APIs
                        empower developers to seamlessly integrate Ziba Pay's
                        payment solutions into their applications and platforms.
                        With clear and detailed documentation, developers can
                        quickly understand how to leverage our APIs to enhance
                        their payment experiences.
                     </p>
                     <div className='mt-6'>
                        <CheckList
                           items={[
                              "Rapid Fund Transfers",
                              "Simple and Recurring Payment Setup",
                              "Transaction Authetication",
                              "Customer Identity Verification",
                           ]}
                        />
                     </div>
                  </div>
                  <Image
                     src={smile}
                     alt='offers'
                     className='hidden md:block w-[500px]'
                  />
               </div>
            </div>

            <div className='bg-br py-6'>
               <div className='flex gap-4 mx-auto items-center justify-center container'>
                  <div className=' md:h-[600px] justify-center bg-white w-fit rounded-2xl p-2'>
                     <h4 className='my-4'>
                        Send and receive without borders with Mobile Money
                     </h4>
                     <Image
                        src={send1}
                        alt='momo'
                     />
                  </div>
                  <div className=' md:h-[600px] justify-center rounded-2xl bg-submain w-fit p-2 text-white '>
                     <h4 className='my-4'>Invoices that work smarter</h4>
                     <p className='my-4'>Learn more about invoices</p>
                     <Image
                        src={send2}
                        alt='smarter'
                     />
                  </div>
               </div>
            </div>

            {/* ===MOBILE MONEY INTEGRATION==== */}

            <div className='bg-main text-white flex flex-col gap-6 py-6'>
               <div className='container'>
                  <div>
                     <h2 className='my-4'>Mobile Money Integration</h2>
                     <p className='my-4'>
                        Expand your payment options with Ziba Pay by integrating
                        <span className='text-black'>
                           MTN Mobile Money
                        </span> and{" "}
                        <span className='text-black'>Airtel Mobile Money</span>.
                        Offer your customers the convenience of paying directly
                        from their mobile wallets.
                     </p>
                  </div>
                  <Link
                     href=''
                     className='underline text-black'
                  >
                     Learn more about MoMo{" "}
                  </Link>
                  <Image
                     src={phone}
                     alt='mobile integration'
                     className=' mx-auto'
                  />
               </div>
            </div>

            {/* =======REVIEWS=========== */}
            <div className=' py-6 relative'>
               <Image
                  src={curvedImg}
                  alt='rect'
                  className=' absolute left-0  top-0  -z-20 w-screen'
               />

               <div className='flex flex-col gap-6 container items-center justify-center py-40'>
                  <p className='mt-20'>5000+ Happy Ziba pay Users</p>
                  <h2>Don’t just take our words</h2>
                  {/* reviews */}
                  <Slider />
               </div>
            </div>

            {/* =======FAQs=========== */}
            <div className='bg-br'>
               <div className='container  flex gap-6 justify-between items-center flex-col md:flex-row'>
                  <h2>FAQ's</h2>
                  <div className='flex flex-col gap-4 items-center justify-center py-10 w-full md:w-3/4'>
                     <h3>Got questions?</h3>
                     <p>Get the answers to your questions about Ziba pay.</p>

                     <Accordion
                        type='single'
                        collapsible
                        className='w-full'
                     >
                        <AccordionItem
                           value='item-1'
                           className='border-b border-black/30 py-4'
                        >
                           <AccordionTrigger>
                              What is Ziba pay?
                           </AccordionTrigger>
                           <AccordionContent>
                              Ziba Pay is a payment processing platform designed
                              to streamline payment collection for businesses of
                              all sizes
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value='item-2'
                           className='border-b border-black/30 py-4'
                        >
                           <AccordionTrigger>
                              How does Ziba Pay work ?
                           </AccordionTrigger>
                           <AccordionContent>
                              Yes. It comes with default styles that matches the
                              other components&apos; aesthetic.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value='item-3'
                           className='border-b border-black/30 py-4'
                        >
                           <AccordionTrigger>
                              What payment methods does Ziba Pay support?
                           </AccordionTrigger>
                           <AccordionContent>
                              Yes. It's animated by default, but you can disable
                              it if you prefer.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value='item-3'
                           className='border-b border-black/30 py-4'
                        >
                           <AccordionTrigger>
                              Is Ziba Pay secure?
                           </AccordionTrigger>
                           <AccordionContent>
                              Yes. It's animated by default, but you can disable
                              it if you prefer.
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Home;
