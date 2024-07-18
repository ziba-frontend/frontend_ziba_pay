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
import phone from "../../public/images/phone.gif";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import CheckList from "@/components/CheckList";
import Slider from "@/components/Slider";
import momo1 from "../../public/images/momo1.png";
import ball from "../../public/images/ball.png";
import ball2 from "../../public/images/ball2.png";
import elp1 from "../../public/images/elp1.png";
import elp2 from "../../public/images/elp2.png";
import elp4 from "../../public/images/elp4.png";
import elp5 from "../../public/images/elp5.png";
import elp6 from "../../public/images/elp6.png";
import elp7 from "../../public/images/elp7.png";
import money from "../../public/images/money.png";
import checkMark from "../../public/images/checkmark.png";
import rect2 from "../../public/images/rect2.png";

const Home = () => {
   const checkListItems = [
      { text: "Rapid Fund Transfers", img: checkMark },
      { text: "Simple and Recurring Payment Setup", img: checkMark },
      { text: "Transaction Authetication", img: checkMark },
      { text: "Customer Identity Verification", img: checkMark },
   ];
   return (
      <>
         <Navbar />
         <div>
            {/* ===============HERO SECTION================== */}
            <div className="flex items-center mx-auto text-center flex-col py-4 prose container my-8 md:min-h-[80vh] justify-center pt-20">
               <Image
                  src={oval}
                  alt="oval"
                  className="hidden md:block absolute top-[100px] -left-10 -z-10"
               />
               <h4>
                  Introducing Ziba <span className="text-main">Pay</span>
               </h4>
               <h1 className="my-2 text-[48]">
                  <span className="text-main">Simplifying Payments</span> for{" "}
                  Businesses in Africa
               </h1>
               <p className="text-[20px] font-[600] text-black">
                  Ziba Pay offers businesses a streamlined and effective online
                  payment collection solution
               </p>
               <div className="flex gap-2 my-4">
                  <Link href="/login">
                     <Button
                        className="w-[107px] sm:w-[150px]"
                        variant="outline"
                     >
                        Login
                     </Button>
                  </Link>
                  <Link href="/sign-up">
                     {" "}
                     <Button className="w-[107px] sm:w-[150px]">
                        Create Account
                     </Button>
                  </Link>
               </div>
            </div>
            <div className="flex flex-col container">
               <p className="text-[28px]">
                  We are trusted by 1Million+ businesses
               </p>
               <div className="flex gap-12 flex-wrap items-center my-10">
                  <Image
                     src={uber}
                     alt="uber"
                  />
                  <Image
                     src={mtn}
                     alt="mtn"
                  />
                  <Image
                     src={chipper}
                     alt="chipper"
                  />
                  <Image
                     src={pigg}
                     alt="pigg"
                  />
                  <Image
                     src={wise}
                     alt="wise"
                  />
                  <Image
                     src={microsoft}
                     alt="microsoft"
                  />
               </div>
            </div>

            {/* =====FEATURES===== */}

            <div className="py-12 bg-br relative">
               <Image
                  src={curvedImg}
                  alt="rect"
                  className="w-full absolute top-0 "
               />
               <div className="pt-40 flex items-center flex-col gap-6 container">
                  <h1>Our Features</h1>
                  <p className="text-center mb-6 text-[#000000] text-[20px]">
                     With features like customizable dashboards, real-time
                     alerts, and secure data encryption, you can effortlessly
                     manage your transactions and take control of your financial
                     life.
                  </p>
                  <div className="flex items-center">
                     <div className="flex flex-wrap  gap-5 mx-auto items-center lg:items-start justify-center">
                        <div className="flex flex-row gap-2 bg-submain p-[35px] lg:h-[402px] rounded-[28px]  text-white w-full    xl:w-[581px] items-center ">
                           <div>
                              <h3 className="my-2">Real-time Alerts</h3>
                              <p className="text-xl">
                                 Stay on top of your finances with our real-time
                                 alert feature! Get instant notifications about
                                 account activity, upcoming bills, and
                                 suspicious transactions so you can take action
                                 right away.
                              </p>
                           </div>
                           <Image
                              src={fr1}
                              alt="fr1"
                              width={192}
                              style={{ objectFit: "contain" }}
                              className="ml-2 hidden sm:block"
                           />
                        </div>
                        <div className="flex flex-row gap-2 bg-submain p-[35px] lg:h-[400px] rounded-[28px]  text-white w-full  xl:w-[581px] items-center">
                           <div>
                              <h3 className="my-2">Customizable Dashboard</h3>
                              <p className="text-xl">
                                 Easily track spending, monitor balances, and
                                 view transaction history all in one place. Take
                                 control of your finances and see the
                                 information that matters most to you.
                              </p>
                           </div>
                           <Image
                              src={fr2}
                              alt="fr2"
                              width={192}
                              style={{ objectFit: "contain" }}
                              className="ml-2 hidden sm:block"
                           />
                        </div>
                        <div className="flex flex-col gap-2 bg-submain p-[35px] lg:h-[449px] rounded-[28px]  text-white w-full   xl:w-[375px] justify-center">
                           <Image
                              src={fr3}
                              alt="fr3"
                              width={90}
                              style={{ objectFit: "contain" }}
                              className="ml-2 hidden sm:block"
                           />
                           <div>
                              <h3 className="my-2">Ziba pay fraud detection</h3>
                              <p className="text-xl">
                                 Your money is 100% safe and secure on Ziba pay.
                                 No hassles, no glitches, get access to your
                                 money anytime.
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-row gap-2 bg-submain p-6 lg:h-[420px] rounded-[28px]  text-white w-full  xl:w-[794px] items-center">
                           <div>
                              <h3 className="my-2">Friendly Interface</h3>
                              <p className="text-xl">
                                 Navigating through Ziba Pay is a breeze, thanks
                                 to our clean and clutter-free interface.
                                 Whether you&apos;re setting up payment
                                 workflows, customizing branding elements, or
                                 analyzing transaction data, you&apos;ll find
                                 everything you need right at your fingertips.
                              </p>
                           </div>
                           <Image
                              src={fr4}
                              alt="fr4"
                              width={108}
                              style={{ objectFit: "contain" }}
                              className="ml-2 hidden sm:block "
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* =======OFFERS=========== */}

            <div className="py-12 relative">
               <Image
                  src={curvedImg}
                  alt="rect"
                  className=" absolute left-0  top-0  -z-20 w-screen"
               />
               <div className="container">
                  <h1 className="text-center mt-[8rem] mb-20 ">
                     We have more offers for you
                  </h1>
                  <div className="flex flex-col gap-12 md:gap-0 md:flex-row items-center justify-center">
                     <div className="md:w-1/2">
                        <h2 className="mb-2">Simplifying Payment Collection</h2>
                        <p className="text-[20px]">
                           Because starting a business is tough enough, but
                           collecting money should be the easy part! At Ziba
                           Pay, we&apos;re here to streamline the process and
                           make getting paid a breeze.
                        </p>
                     </div>
                     <Image
                        src={offer1}
                        alt="offers"
                        width={500}
                     />
                  </div>
               </div>
            </div>
            {/* =======TRACKING=========== */}
            <div className=" py-6 relative">
               <Image
                  src={curvedImg}
                  alt="rect"
                  className=" absolute left-0  top-0  -z-20 w-screen"
               />
               <div className="flex flex-col gap-12 md:gap-[1.5px] md:flex-row items-center justify-center mt-[8rem] container">
                  <div className="md:w-1/2">
                     <h2 className="my-4">Easy tracking</h2>
                     <p className="text-[20.49px]">
                        Easily track your payments with our payment tracking{" "}
                        feature. Monitor your bills and payments in one place,
                        and get alerts when bills are due, so you never miss a
                        payment again.
                     </p>
                  </div>
                  <Image
                     src={track}
                     alt="offers"
                     width={500}
                  />
               </div>
            </div>
            <div className="container py-6 ">
               <div className="flex flex-col gap-12 md:gap-0 md:flex-row items-center md:items-start justify-center bg-submain text-white px-8 py-16 relative">
                  <div>
                     <h2 className="my-3">
                        Ziba Pay offers well-documented and easy-to-use{" "}
                        <span className="text-main">APIs for developers</span>{" "}
                     </h2>
                     <p>
                        Our comprehensive documentation and user-friendly APIs
                        empower developers to seamlessly integrate Ziba
                        Pay&apos;s payment solutions into their applications and
                        platforms. With clear and detailed documentation,
                        developers can quickly understand how to leverage our
                        APIs to enhance their payment experiences.
                     </p>
                     <div className="mt-6">
                        <CheckList items={checkListItems} />
                     </div>
                  </div>
                  <Image
                     src={smile}
                     alt="offers"
                     className="hidden md:block w-[600px] -ml-40 "
                  />
                  <Image
                     src={elp4}
                     alt="offers"
                     className="hidden md:block absolute bottom-0 left-0"
                  />
                  <Image
                     src={elp1}
                     alt="ball"
                     className="absolute top-0 left-0 z-10"
                  />
               </div>
            </div>

            <div className="bg-br py-20">
               <div className="flex flex-col md:flex-row gap-8 mx-auto items-center justify-center container">
                  <div className=" md:h-[756px] justify-center bg-white  rounded-[25px] p-[30px] w-full sm:w-5/6 md:w-[613px] ">
                     <h3 className="my-4 text-[40px]">
                        Send and receive without borders with Mobile Money
                     </h3>
                     <Image
                        src={send1}
                        alt="momo"
                        width={450}
                        className="mt-8 ml-[50%] transform -translate-x-1/2"
                     />
                  </div>
                  <div className=" md:h-[756px] flex flex-col   bg-submain  text-white rounded-[25px] p-[30px] md:w-[548px] w-full sm:w-5/6 ">
                     <h3 className="my-2 text-[40px]">
                        Invoices that work smarter
                     </h3>

                     <p className="my-2">Learn more about invoices</p>

                     <Image
                        src={send2}
                        alt="smarter"
                        width={450}
                        className="mt-[100px] ml-[50%] transform -translate-x-1/2"
                     />
                  </div>
               </div>
            </div>

            {/* ===MOBILE MONEY INTEGRATION==== */}

            <div className="bg-main text-white flex flex-col gap-6 py-6 relative min-h-[900px]">
               <Image
                  src={ball2}
                  alt="ball"
                  className="absolute top-40 right-10"
               />
               <Image
                  src={ball2}
                  alt="ball"
                  className="absolute bottom-40 right-10"
               />
               <Image
                  src={ball2}
                  alt="ball"
                  className="absolute bottom-40 left-10"
               />
               <Image
                  src={elp6}
                  alt="ball"
                  className="absolute top-0 left-0 z-10"
               />
               <Image
                  src={elp7}
                  alt="ball"
                  className="absolute bottom-0 left-0 "
               />
               <Image
                  src={elp5}
                  alt="ball"
                  className="absolute top-0 right-0  w-[80px] md:w-[150px]"
               />

               <div className="container z-20">
                  <div className="text-black w-5/6">
                     <h2 className="my-4 text-[48px]">Mobile Money Integration</h2>
                     <p className="my-4 text-[20px]  font-[700]">
                        Expand your payment options with Ziba Pay by integrating
                        MTN Mobile Money and Airtel Mobile Money Offer your
                        customers the convenience of paying directly from their
                        mobile wallets.
                     </p>
                  </div>
                  <Link
                     href="/mobile-money-integration"
                     className=""
                  >
                     <h4 className="text-black underline text-[32px] font-[900] ">
                        Learn more about MoMo
                     </h4>{" "}
                  </Link>
               </div>
               <Image
                  src={money}
                  alt="mobile integration"
                  className=" mx-auto absolute top-[40%] md:top-60 w-full"
               />
            </div>

            {/* =======REVIEWS=========== */}
            <div className=" py-20 relative ">
               <Image
                  src={rect2}
                  alt="rect"
                  className=" absolute left-0  top-0  -z-20 w-screen"
               />

               <div className="flex flex-col gap-6  items-center justify-center pt-40 md:pt-80 ">
                  <p className="mt-40 text-center">
                     5000+ Happy Ziba pay Users
                  </p>
                  <h2 className="text-center text-[48px]">Don’t just take our words</h2>
                  {/* reviews */}
                  <Slider />
               </div>
            </div>

            {/* =======FAQs=========== */}
            <div className="bg-br py-20">
               <div className="container  flex gap-2 justify-center items-center flex-col md:flex-row md:justify-between md:gap-6">
                  <h2>FAQ&apos;s</h2>
                  <div className="flex flex-col gap-4 items-center justify-center   py-4 md:py-10 w-full md:w-3/4">
                     <h3>Got questions?</h3>
                     <p>Get the answers to your questions about Ziba pay.</p>

                     <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                     >
                        <AccordionItem
                           value="item-1"
                           className="border-b border-black/30 py-4"
                        >
                           <AccordionTrigger>
                              What is Ziba Pay?
                           </AccordionTrigger>
                           <AccordionContent>
                              Ziba Pay is a payment processing platform designed
                              to streamline payment collection for businesses of
                              all sizes.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value="item-2"
                           className="border-b border-black/30 py-4"
                        >
                           <AccordionTrigger>
                              How does Ziba Pay work?
                           </AccordionTrigger>
                           <AccordionContent>
                              Ziba Pay integrates with various payment gateways,
                              including MTN MoMo and Airtel Money, to enable
                              businesses to accept payments from customers via
                              mobile money. The platform provides a seamless
                              interface for managing transactions, tracking
                              payments, and generating reports.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value="item-3"
                           className="border-b border-black/30 py-4"
                        >
                           <AccordionTrigger>
                              What payment methods does Ziba Pay support?
                           </AccordionTrigger>
                           <AccordionContent>
                              Ziba Pay supports multiple payment methods,
                              including credit and debit cards, mobile money
                              (MTN MoMo and Airtel Money), and bank transfers.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                           value="item-4"
                           className="border-b border-black/30 py-4"
                        >
                           <AccordionTrigger>
                              Is Ziba Pay secure?
                           </AccordionTrigger>
                           <AccordionContent>
                              Yes, Ziba Pay employs advanced security measures,
                              including encryption and fraud detection, to
                              ensure that all transactions are secure and that
                              customer data is protected.
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
