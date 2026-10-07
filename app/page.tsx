import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academics from "@/components/Academics";
import Admissions from "@/components/Admissions";
import Disclosure from "@/components/Disclosure";
import Footer from "@/components/Footer";
 
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Academics />
        <Admissions />
        <Disclosure />
      </main>
      <Footer />
    </>
  );
}