import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import HeroSection from "@/components/HeroSection";
import ProblemStatement from "@/components/ProblemStatement";
import GeneticAlgorithm from "@/components/GeneticAlgorithm";
import OptimizationCore from "@/components/OptimizationCore";
import DatasetFeatures from "@/components/DatasetFeatures";
import LivePredictor from "@/components/LivePredictor";
import ResultsOutcomes from "@/components/ResultsOutcomes";
import TeamFooter from "@/components/TeamFooter";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <BackToTop />
    <HeroSection />
    <ProblemStatement />
    <GeneticAlgorithm />
    <OptimizationCore />
    <DatasetFeatures />
    <LivePredictor />
    <ResultsOutcomes />
    <TeamFooter />
  </div>
);

export default Index;
