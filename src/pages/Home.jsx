import { Seo } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import WinnerProduct from "@/components/home/WinnerProduct";
import HowItWorks from "@/components/home/HowItWorks";
import Storytelling from "@/components/home/Storytelling";
import Bundles from "@/components/home/Bundles";
import Testimonials from "@/components/home/Testimonials";
import { AnnouncementBar } from "@/components/AnnouncementBar";

export default function Home() {
  return (
    <>
      <Seo
        title="AUREVA — Personalized Jewelry That Tells Your Story"
        description="Personalized jewelry made to be worn, layered and loved. Design a charm necklace that represents the people, memories and moments that matter most."
        canonicalPath="/"
      />
      <AnnouncementBar config={{ text: "AHORRA HASTA 40% AL COMPRAR EN BUNDLE", buttonText: "VER BUNDLES", buttonLink: "/shop" }} />
      <Hero />
      <WinnerProduct />
      <HowItWorks />
      <Storytelling />
      <Bundles />
      <Testimonials />
    </>
  );
}