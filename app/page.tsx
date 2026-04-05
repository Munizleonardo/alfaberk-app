import { CatalogPage } from "@/app/_components/catalog/catalog-page";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CatalogPage />
      <Footer />
    </main>
  );
}
