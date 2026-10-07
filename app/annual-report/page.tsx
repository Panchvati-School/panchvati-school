import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnualReportView from "@/components/AnnualReportView";

export const metadata = {
  title: "Annual report | Panchvati English Medium School, Igatpuri",
  description: "Yearly results, key figures and highlights from Panchvati English Medium School.",
};

export default function AnnualReportPage() {
  return (
    <>
      <Header />
      <main>
        <AnnualReportView />
      </main>
      <Footer />
    </>
  );
}