"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import uber from "../../../public/images/uber.png";
import mtn from "../../../public/images/mtn.png";
import pigg from "../../../public/images/pigg.png";
import microsoft from "../../../public/images/microsoft.png";
import wise from "../../../public/images/wise.png";
import chipper from "../../../public/images/chipper.png";
import fr1 from "../../../public/images/fr1.png";
import fr2 from "../../../public/images/fr2.png";
import fr3 from "../../../public/images/fr3.png";
import fr4 from "../../../public/images/fr4.png";
import offer1 from "../../../public/images/offer1.png";
import track from "../../../public/images/track.png";
import smile from "../../../public/images/smileman.png";
import send1 from "../../../public/images/send1.png";
import send2 from "../../../public/images/send2.png";
import zp from "../../../public/svg/zp.svg";
import curvedImg from "../../../public/images/rect1.png";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckList from "@/components/CheckList";
import Slider from "@/components/Slider";
import ball2 from "../../../public/images/ball2.png";
import elp1 from "../../../public/images/elp1.png";
import elp4 from "../../../public/images/elp4.png";
import elp5 from "../../../public/images/elp5.png";
import elp6 from "../../../public/images/elp6.png";
import elp7 from "../../../public/images/elp7.png";
import money from "../../../public/images/money.png";
import checkMark from "../../../public/images/checkmark.png";
import rect2 from "../../../public/images/rect2.png";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { ArrowDownRight } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);
  const checkListItems = [
    { text: "Rapid Fund Transfers", img: checkMark },
    { text: "Simple and Recurring Payment Setup", img: checkMark },
    { text: "Transaction Authetication", img: checkMark },
    { text: "Customer Identity Verification", img: checkMark },
  ];

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        {/* =============== Animated Oval Background =============== */}
        <div className="hidden md:block absolute top-0 left-0 -z-20 w-full rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
            <path
              fill="none"
              stroke="#2EC171"
              stroke-width="8"
              stroke-linecap="round"
              d="M0,200 C150,130 300,270 450,150 S700,250 800,100"
            >
              <animate
                attributeName="d"
                values="
        M0,200 C150,130 300,270 450,150 S700,250 800,100;
        M0,200 C150,150 300,250 450,170 S700,230 800,120;
        M0,200 C150,170 300,230 450,190 S700,210 800,140;
        M0,200 C150,150 300,250 450,170 S700,230 800,120;
        M0,200 C150,130 300,270 450,150 S700,250 800,100"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke"
                values="#2ECC714d;#27AE602d;#2ECC714d"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="8;9;8"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>

            <path
              fill="none"
              stroke="#27AE603d"
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="2,10"
              d="M0,250 C200,150 350,350 550,200 S750,300 800,220"
            >
              <animate
                attributeName="d"
                values="
        M0,250 C200,150 350,350 550,200 S750,300 800,220;
        M0,250 C200,190 350,310 550,230 S750,270 800,240;
        M0,250 C200,230 350,270 550,260 S750,240 800,260;
        M0,250 C200,190 350,310 550,230 S750,270 800,240;
        M0,250 C200,150 350,350 550,200 S750,300 800,220"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>

            <path
              fill="none"
              stroke="#A5D6A7"
              stroke-width="12"
              stroke-opacity="0.3"
              stroke-linecap="round"
              d="M0,300 C250,320 500,250 800,280"
            >
              <animate
                attributeName="d"
                values="
        M0,300 C250,320 500,250 800,280;
        M0,310 C250,290 500,270 800,290;
        M0,320 C250,260 500,290 800,300;
        M0,310 C250,290 500,270 800,290;
        M0,300 C250,320 500,250 800,280"
                dur="12s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        {/* =============== HERO SECTION ================== */}
        <div className="flex items-start text-start flex-col py-4 mx-auto container mt-16 md:min-h-[70vh] lg:min-h-[70vh] justify-center ">
          <div className="flex flex-col md:flex-col items-start justify-between p-6 w-1/2">
            <div className="flex flex-col gap-4">
              <h1 className="font-black leading-tight text-[32px] md:text-[54px]">
                <span className="text-main text-[24px] font-bold">
                  Seamless Payments,
                </span>{" "}
                <br /> Effortlessly Connecting Africa&apos;s Businesses
              </h1>
              <p className="text-lg md:text-xl font-light text-gray-600 md:w-2/3">
                Ziba Pay empowers businesses with a powerful, secure, and
                intuitive payment experience designed for efficiency.
              </p>
            </div>

            <Link href="/sign-up">
              <Button className="mt-12 p-8 rounded-full text-lg bg-main text-white hover:scale-105 transition">
                Get Started <ArrowDownRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* =============== TRUSTED PARTNERS SECTION ================== */}
        <div className="flex flex-col mt-[-2em] bg-white container">
          <p className="text-lg md:text-xl font-bold text-black text-center">
            Trusted by Leading Brands Across the Globe
          </p>

          {/* Animated Partner Logos Carousel */}
          <div className="relative overflow-hidden w-full my-12">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {[
                uber,
                mtn,
                chipper,
                pigg,
                wise,
                microsoft,
                uber,
                mtn,
                chipper,
              ].map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  alt="partner"
                  width={120}
                  height={50}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* =====FEATURES===== */}

        <div className="py-12 bg-white relative">
          <Image
            src={curvedImg}
            alt="rect"
            className="w-full absolute top-0 "
          />
          <div className="pt-40 flex items-center flex-col gap-6 container">
            <h1>Our Features</h1>
            <p className="text-center mb-6 text-slate-500 md:w-5/6">
              With features like customizable dashboards, real-time alerts, and
              secure data encryption, you can effortlessly manage your
              transactions and take control of your financial life.
            </p>
            <div className="flex items-center">
              <div className="flex flex-wrap  gap-5 mx-auto items-center lg:items-start justify-center">
                <div className="flex flex-row gap-2 bg-[#27AE602d] p-[35px] lg:h-[350px] rounded-[28px]  text-white w-full xl:w-[581px] items-center ">
                  <div>
                    <h3 className="text-black w-fit text-[16px] bg-white p-2 px-4 rounded-full">
                      Real-time Alerts
                    </h3>
                    <p className="text-black text-[1.2em] mt-4">
                      Stay on top of your finances with our real-time alert
                      feature! Get instant notifications about account activity,
                      upcoming bills, and suspicious transactions so you can
                      take action right away.
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
                <div className="flex flex-row gap-2 bg-[#27AE602d] p-[35px] lg:h-[350px] rounded-[28px]  text-white w-full  xl:w-[581px] items-center">
                  <div>
                    <h3 className="text-black w-fit text-[16px] bg-white p-2 px-4 rounded-full">
                      Customizable Dashboard
                    </h3>
                    <p className="text-black text-[1.2em] mt-4">
                      Easily track spending, monitor balances, and view
                      transaction history all in one place. Take control of your
                      finances and see the information that matters most to you.
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
                <div className="flex flex-col gap-2 bg-[#27AE602d] p-[35px] lg:h-[420px] rounded-[28px]  text-white w-full   xl:w-[375px] justify-center">
                  <Image
                    src={fr3}
                    alt="fr3"
                    width={90}
                    style={{ objectFit: "contain" }}
                    className="ml-2 hidden sm:block"
                  />
                  <div>
                    <h3 className="text-black w-fit text-[16px] bg-white p-2 px-4 rounded-full">
                      Ziba pay fraud detection
                    </h3>
                    <p className="text-black text-[1.2em] mt-4">
                      Your money is 100% safe and secure on Ziba pay. No
                      hassles, no glitches, get access to your money anytime.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 bg-[#27AE602d] p-6 lg:h-[380px] rounded-[28px]  text-white w-full  xl:w-[794px] items-center">
                  <div>
                    <h3 className="text-black w-fit text-[16px] bg-white p-2 px-4 rounded-full">
                      Friendly Interface
                    </h3>
                    <p className="text-black text-[1.2em] mt-4">
                      Navigating through Ziba Pay is a breeze, thanks to our
                      clean and clutter-free interface. Whether you&apos;re
                      setting up payment workflows, customizing branding
                      elements, or analyzing transaction data, you&apos;ll find
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

        <div className="pb-20 relative px-10">
          <div className="flex flex-col gap-12 md:gap-6 md:flex-row items-center justify-center">
            <div className="md:w-1/2">
              <div>
                <h3 className="text-white w-fit text-[16px] bg-main p-2 px-4 rounded-full">
                  Great offers on the table
                </h3>
              </div>
              <div>
                <h2 className="mb-6">Simplifying Payment Collection</h2>
                <p className="text-md w-full lg:w-5/6">
                  Because starting a business is tough enough, but collecting
                  money should be the easy part! At Ziba Pay, we&apos;re here to
                  streamline the process and make getting paid a breeze.
                </p>
              </div>
            </div>
            <Image src={offer1} alt="offers" width={500} />
          </div>
        </div>
        {/* =======TRACKING=========== */}
        <div className="pt-20 py-6 relative">
          <Image
            src={curvedImg}
            alt="rect"
            className=" absolute left-0 rotate-180 top-0  -z-20 w-screen"
          />
          <div className=" px-10">
            <div className="mt-0 sm:mt-24 h-[70vh] flex flex-col gap-12 md:gap-6 md:flex-row items-center justify-center">
              <div className="md:w-1/2">
                <div>
                  <h3 className="text-white w-fit text-[16px] bg-main p-2 px-4 rounded-full">
                    Great offers on the table
                  </h3>
                </div>
                <div>
                  <h2 className="mb-6">Easy tracking</h2>
                  <p className="text-md w-full lg:w-5/6">
                    Easily track your payments with our payment tracking
                    feature. Monitor your bills and payments in one place, and
                    get alerts when bills are due, so you never miss a payment
                    again.
                  </p>
                </div>
              </div>
              <Image src={track} alt="offers" width={500} />
            </div>
          </div>
        </div>
        <div className="container py-6 ">
          <div className="flex flex-col gap-12 md:gap-0 md:flex-row items-center md:items-start justify-center bg-[#27AE602d] text-black px-8 py-16 relative">
            <div>
              <h2 className="my-3">
                Ziba Pay offers well-documented and easy-to-use{" "}
                <span className="text-main">APIs for developers</span>{" "}
              </h2>
              <p>
                Our comprehensive documentation and user-friendly APIs empower
                developers to seamlessly integrate Ziba Pay&apos;s payment
                solutions into their applications and platforms. With clear and
                detailed documentation, developers can quickly understand how to
                leverage our APIs to enhance their payment experiences.
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

        <div className="bg-white py-20">
          <div className="flex flex-col md:flex-row gap-8 mx-auto items-center justify-center container">
            <div className=" md:h-[756px] justify-center bg-white  rounded-[25px] p-[30px] w-full sm:w-5/6 md:w-[613px] ">
              <h3 className="my-4 ">
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
              <h3 className="my-2">Invoices that work smarter</h3>

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

        {/* =======REVIEWS=========== */}
        <div className="my-10">
          <div className="flex flex-col gap-6  items-center justify-center ">
            <p className=" text-center">5000+ Happy Ziba pay Users</p>
            <h2 className="text-center">Don’t just take our words</h2>
            {/* reviews */}
            <Slider />
          </div>
        </div>

        {/* =======FAQs=========== */}
        <div className="bg-white">
          <div className="container  flex gap-2 justify-center items-center flex-col md:flex-row md:justify-between md:gap-6">
            <h2>FAQ&apos;s</h2>
            <div className="flex flex-col gap-4 items-center justify-center py-4 md:py-10 w-full md:w-3/4">
              <h3>Got questions?</h3>
              <p>Get the answers to your questions about Ziba pay.</p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border-b border-black/30 py-4"
                >
                  <AccordionTrigger>What is Ziba Pay?</AccordionTrigger>
                  <AccordionContent>
                    Ziba Pay is a payment processing platform designed to
                    streamline payment collection for businesses of all sizes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border-b border-black/30 py-4"
                >
                  <AccordionTrigger>How does Ziba Pay work?</AccordionTrigger>
                  <AccordionContent>
                    Ziba Pay integrates with various payment gateways, including
                    MTN MoMo and Airtel Money, to enable businesses to accept
                    payments from customers via mobile money. The platform
                    provides a seamless interface for managing transactions,
                    tracking payments, and generating reports.
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
                    Ziba Pay supports multiple payment methods, including credit
                    and debit cards, mobile money (MTN MoMo and Airtel Money),
                    and bank transfers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-4"
                  className="border-b border-black/30 py-4"
                >
                  <AccordionTrigger>Is Ziba Pay secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, Ziba Pay employs advanced security measures, including
                    encryption and fraud detection, to ensure that all
                    transactions are secure and that customer data is protected.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-[52px] w-5/6 bg-main/80 text-white mx-auto rounded-md my-2 relative items-center md:items-start">
        <h3 className="py-6 text-[32px]">Ready to get started ?</h3>
        <p className="text-center md:text-start md:w-5/6">
          Create an account instantly and start accepting payments. Feel free to
          reach out to us for tailored solutions designed specifically for your
          business needs.
        </p>
        <Link href="/sign-up">
          <Button className="mt-12 p-8 rounded-full text-lg bg-white text-main hover:scale-105 transition">
            Get Started <ArrowDownRight className="ml-2" />
          </Button>
        </Link>
        <Image
          src={zp}
          alt="zp"
          className="absolute w-[50px] md:w-[78px] top-2 right-2 md:top-16 md:right-16"
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
