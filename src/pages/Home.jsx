import Hero from "@/components/home/Hero";
import WinnerProduct from "@/components/home/WinnerProduct";
import HowItWorks from "@/components/home/HowItWorks";
import Storytelling from "@/components/home/Storytelling";
import Bundles from "@/components/home/Bundles";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WinnerProduct />
      <HowItWorks />
      <Storytelling />
      <Bundles />
      <Testimonials />
    </>
  );
}