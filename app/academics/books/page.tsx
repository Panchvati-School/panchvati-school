import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BooksView from "@/components/BooksView";

export const metadata = {
  title: "Prescribed books | Panchvati English Medium School, Igatpuri",
  description: "List of books prescribed in various classes at Panchvati English Medium School.",
};

export default function BooksPage() {
  return (
    <>
      <Header />
      <main>
        <BooksView />
      </main>
      <Footer />
    </>
  );
}