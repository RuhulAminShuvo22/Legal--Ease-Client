import Banner from "@/components/shared/Banner";
import CTASection from "@/components/shared/CTASection";
import FeaturesSection from "@/components/shared/FeaturesSection";
import LatestLawyers from "@/components/shared/LatestLawyers";
import WhyChooseUs from "@/components/shared/WhyChooseUs";


export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Banner></Banner>
      <LatestLawyers></LatestLawyers>
      <FeaturesSection></FeaturesSection>
      <CTASection></CTASection>
      <WhyChooseUs></WhyChooseUs>
      
    </div>
  );
}