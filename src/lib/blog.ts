import { StaticImageData } from "next/image";
import blog1 from "../../public/images/blog1.png";
import blog2 from "../../public/images/blog2.png";
import blog3 from "../../public/images/blog3.png";
import blog4 from "../../public/images/blog4.png";
import blog5 from "../../public/images/blog5.png";
import blog6 from "../../public/images/blog6.png";
import blog7 from "../../public/images/blog7.png";
import blog8 from "../../public/images/blog8.png";
import blog9 from "../../public/images/blog9.png";
import blog10 from "../../public/images/blog10.png";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: StaticImageData;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "The Future of Online Payments in Africa",
    slug: "future-of-online-payments-in-africa",
    excerpt: "Discover the latest trends and innovations shaping the future of online payments in Africa. Learn how Ziba Pay is at the forefront of this exciting transformation.",
    image: blog1,
  },
  {
    id: 2,
    title: "Simplifying Payment Processes for Small Businesses",
    slug: "simplifying-payment-processes-for-small-businesses",
    excerpt: "Explore practical tips and strategies for small businesses to streamline their payment processes. See how Ziba Pay's solutions can help you save time and reduce manual effort.",
    image: blog2,
  },
  {
    id: 3,
    title: "How to Protect Your Business from Online Payment Fraud",
    slug: "protect-your-business-from-online-payment-fraud",
    excerpt: "Understand the best practices for safeguarding your business against online payment fraud. Learn about the robust security measures Ziba Pay has in place to protect your transactions.",
    image: blog3,
  },
  {
    id: 4,
    title: "Case Study: How Flannel Hub Transformed Their Payment System with Ziba Pay",
    slug: "case-study-flannel-hub-payment-system",
    excerpt: "Read about the success story of Flannel Hub and how they revolutionized their payment system using Ziba Pay's solutions. Get inspired by their journey and results.",
    image: blog4,
  },
  {
    id: 5,
    title: "Top 5 Benefits of Using Ziba Pay for Your E-commerce Store",
    slug: "benefits-of-ziba-pay-for-ecommerce",
    excerpt: "Discover the latest trends and innovations shaping the future of online payments in Africa. Learn how Ziba Pay is at the forefront of this exciting transformation.",
    image: blog5,
  },
  {
    id: 6,
    title: "Leveraging Ziba Pay's Invoicing Features for Better Cash Flow Management",
    slug: "leveraging-ziba-pay-invoicing-features",
    excerpt: "Find out the key advantages of integrating Ziba Pay with your e-commerce platform. From increased sales to better customer satisfaction, discover how Ziba Pay can help your online store thrive.",
    image: blog6,
  },
  {
    id: 7,
    title: "The Role of Mobile Money in Expanding Financial Inclusion in Africa",
    slug: "mobile-money-expanding-financial-inclusion",
    excerpt: "Explore how mobile money is driving financial inclusion across Africa. See how Ziba Pay supports mobile money transactions to empower more people to participate in the digital economy.",
    image: blog7,
  },
  {
    id: 8,
    title: "Integrating Ziba Pay's API: A Developer's Guide",
    slug: "integrating-ziba-pay-api-guide",
    excerpt: "For developers, get a step-by-step guide on how to integrate Ziba Pay's API into your applications. Unlock the potential to create seamless payment experiences for your users.",
    image: blog8,
  },
  {
    id: 9,
    title: "The Importance of Transparency in Payment Processing",
    slug: "importance-of-transparency-in-payment-processing",
    excerpt: "Understand why transparency is crucial in payment processing and how Ziba Pay ensures clear and honest transactions for all its users.",
    image: blog9,
  },
  {
    id: 10,
    title: "Upcoming Events and Webinars",
    slug: "upcoming-events-and-webinars",
    excerpt: "Stay updated on Ziba Pay's upcoming events, webinars, and workshops. Join us to learn more about the latest developments and network with industry experts.",
    image: blog10,
  },
];
