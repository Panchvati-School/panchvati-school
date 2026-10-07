import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurriculumView from "@/components/CurriculumView";

export const metadata = {
  title: "Curriculum | Panchvati English Medium School, Igatpuri",
  description: "Our CBSE curriculum, approach to learning and the stages of a child's journey at Panchvati.",
};

export default function CurriculumPage() {
  return (
    <>
      <Header />
      <main>
        <CurriculumView />
      </main>
      <Footer />
    </>
  );
}