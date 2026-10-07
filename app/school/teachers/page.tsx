import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeachersView from "@/components/TeachersView";

export const metadata = {
  title: "Meet our teachers | Panchvati English Medium School, Igatpuri",
  description: "Faculty of Panchvati English Medium School with their positions and qualifications.",
};

export default function TeachersPage() {
  return (
    <>
      <Header />
      <main>
        <TeachersView />
      </main>
      <Footer />
    </>
  );
}