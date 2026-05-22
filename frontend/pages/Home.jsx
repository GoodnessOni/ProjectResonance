import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
