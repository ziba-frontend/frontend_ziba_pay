import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <>
         <Navbar />
         <section>{children}</section>
         <Footer />
      </>
   );
};

export default layout;
