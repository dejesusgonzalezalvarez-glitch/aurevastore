import { Seo } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import WinnerProduct from "@/components/home/WinnerProduct";
import HowItWorks from "@/components/home/HowItWorks";
import Storytelling from "@/components/home/Storytelling";
import Bundles from "@/components/home/Bundles";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Seo
        title="AUREVA — Personalized Jewelry That Tells Your Story"
        description="Personalized jewelry made to be worn, layered and loved. Design a charm necklace that represents the people, memories and moments that matter most."
        canonicalPath="/"
      />
      <Hero />
      <WinnerProduct />
      <HowItWorks />
      <Storytelling />
      <Bundles />
      <Testimonials />
    </>
  );
}