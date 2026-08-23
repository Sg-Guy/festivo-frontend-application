import FeaturesSection from "../Components/landingPage/FeatureSection";
import { FinalCTA } from "../Components/landingPage/FinalCTA";
import HeroSection from "../Components/landingPage/HeroSection";
import HowItWorks from "../Components/landingPage/HowItWorks";
import StatsAndCategories from "../Components/landingPage/StatsAndCategories";
import TrendingEvents from "../Components/landingPage/TrendingEvents";
import Footer  from "../Components/layout/Footer";
import NavBar from "../Components/layout/NavBar";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0f17] text-gray-900 dark:text-white transition-colors duration-200">
      <main>
        <HeroSection />
        <StatsAndCategories />
        <FeaturesSection />
        <HowItWorks />
        <TrendingEvents />
        <FinalCTA />
      </main>
    </div>
  );
}