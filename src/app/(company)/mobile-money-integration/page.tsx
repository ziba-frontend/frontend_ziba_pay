import React from "react";
import Image from "next/image";
import integ1 from "../../../../public/images/integ1.png";
import rect from "../../../../public/images/rect1.png";
import integ2 from "../../../../public/images/integ2.gif";
import integ3 from "../../../../public/images/integ3.gif";
import integ4 from "../../../../public/images/integ4.gif";
import integ5 from "../../../../public/images/integ5.gif";
import integ6 from "../../../../public/images/integ6.png";
import airtel from "../../../../public/images/airtel.png";
import ball1 from "../../../../public/images/ball1.png";
import momo from "../../../../public/images/momo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Integration = () => {
    return (
        <div>
            <div className="container flex flex-col gap-6 items-center justify-center py-6">
                <h1 className="text-center">Send and Receive Money Easily</h1>
                <p className="text-center">
                    Send and receive money effortlessly with Ziba Pay&apos;s
                    integration of MTN Mobile Money and Airtel Mobile Money. Offer
                    your customers the convenience of seamless mobile wallet
                    payments.
                </p>
                <div className="relative">
                    <Image
                        src={integ1}
                        alt="ziba momo integration"
                    />
                    <Image
                        src={momo}
                        alt="ziba momo integration"
                        className="absolute bottom-10 -left-20 hidden lg:block"
                        width={200}
                    />
                    <Image
                        src={airtel}
                        alt="ziba momo integration"
                        className="absolute bottom-10 -right-20 hidden lg:block"
                        width={200}
                    />
                </div>
            </div>

            <div className="bg-br relative py-20">
                <Image
                    src={rect}
                    alt="ziba"
                    className="absolute top-0 left-0 w-full"
                />

                <div className="container pt-20 mt-10 relative z-20">
                    <Image
                        src={ball1}
                        alt="ball"
                        className="absolute z-10 top-40 left-80 hidden sm:block"
                    />
                    <Image
                        src={ball1}
                        alt="ball"
                        className="absolute z-10 top-40 right-80 hidden sm:block"
                    />
                    <Image
                        src={ball1}
                        alt="ball"
                        className="absolute z-10 top-[28rem] right-20 hidden sm:block"
                    />
                    <Image
                        src={ball1}
                        alt="ball"
                        className="absolute z-10 bottom-[28rem] left-80 hidden sm:block"
                    />
                    <Image
                        src={ball1}
                        alt="ball"
                        className="absolute z-10 bottom-[10rem] right-[38rem] hidden sm:block"
                    />
                    <h1 className="text-center my-12">How It Works</h1>
                    <div className="flex flex-col gap-0 items-center justify-center lg:items-start">
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-4 bg-white rounded sm:w-[388px] p-4">
                                <div>
                                    <h3>Sign Up</h3>
                                    <p>Create an account with Ziba pay</p>
                                </div>
                                <Image
                                    width={298}
                                    height={217}
                                    src={integ2}
                                    alt="sign up"
                                    className="ml-[50%] -translate-x-[50%]"
                                />
                            </div>
                            <h1>1</h1>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col gap-4 bg-white rounded sm:w-[388px] p-4 my-8 2xl:ml-[300px] xl:ml-[200px] lg:ml-[100px]">
                                <div>
                                    <h3>Choose Provider</h3>
                                    <p>
                                        Select MTN Mobile Money, Airtel Mobile Money, or
                                        both
                                    </p>
                                </div>
                                <Image
                                    width={298}
                                    height={217}
                                    src={integ3}
                                    alt="sign up"
                                    className="ml-[50%] -translate-x-[50%]"
                                />
                            </div>
                            <h1>2</h1>
                        </div>
                        <div className="flex items-center gap-8 2xl:ml-[600px] xl:ml-[400px] lg:ml-[200px]">
                            <h1>3</h1>
                            <div className="flex flex-col gap-4 bg-white rounded sm:w-[388px] p-4 my-8">
                                <div>
                                    <h3>Link Accounts</h3>
                                    <p>Link your mobile money number</p>
                                </div>
                                <Image
                                    width={217}
                                    height={217}
                                    src={integ4}
                                    alt="sign up"
                                    className="ml-[50%] -translate-x-[50%]"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-8 2xl:ml-[800px] xl:ml-[600px] lg:ml-[400px]">
                            <h1>4</h1>
                            <div className="flex flex-col gap-4 bg-white rounded sm:w-[388px] p-4 my-8">
                                <div>
                                    <h3>Start Transacting</h3>
                                    <p>Begin sending and receiving payments instantly</p>
                                </div>
                                <Image
                                    width={298}
                                    height={217}
                                    src={integ5}
                                    alt="sign up"
                                    className="ml-[50%] -translate-x-[50%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative py-20">
                <Image
                    src={rect}
                    alt="ziba"
                    className="absolute top-0 left-0 w-full"
                />

                <div className="container pt-20 mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
                    <Image
                        src={integ6}
                        alt="ziba pay"
                        className="w-5/6 md:w-[400px]"
                    />
                    <div>
                        <h2 className="my-8">
                            Get Started with Mobile Money <br />
                            Today
                        </h2>
                        <Link href="/sign-up">
                            <Button>Create a free account</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Integration;
