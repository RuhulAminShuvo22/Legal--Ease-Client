import Banner from "@/components/shared/Banner";
import CTASection from "@/components/shared/CTASection";
import FeaturesSection from "@/components/shared/FeaturesSection";


export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Banner></Banner>

      <FeaturesSection></FeaturesSection>
      <CTASection></CTASection>
      
    </div>
  );
}