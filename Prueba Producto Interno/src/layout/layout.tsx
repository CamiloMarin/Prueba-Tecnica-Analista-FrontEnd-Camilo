// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header/header";
import Footer from "@/components/ui/Footer/footer.tsx";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet /> {/* Aquí se renderiza cada página */}
      </main>
      <Footer />
    </>
  );
}