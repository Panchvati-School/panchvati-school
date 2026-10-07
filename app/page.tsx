import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academics from "@/components/Academics";
import Admissions from "@/components/Admissions";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/Inquiryform";
import WhyChoose from "@/components/Whychoose";
import Importance from "@/components/Inportance";
 
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Academics />
        <Importance />
        <WhyChoose />
        <InquiryForm />
        <Admissions />
      </main>
      <Footer />
    </>
  );
}