import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryView from "@/components/GalleryView";

export const metadata = {
  title: "Our gallery | Panchvati English Medium School, Igatpuri",
  description: "Photos and videos from life at Panchvati English Medium School.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryView />
      </main>
      <Footer />
    </>
  );
}