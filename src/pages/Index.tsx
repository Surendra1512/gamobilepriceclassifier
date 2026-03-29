import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import HeroSection from "@/components/HeroSection";
import ProblemStatement from "@/components/ProblemStatement";
import GeneticAlgorithm from "@/components/GeneticAlgorithm";
import OptimizationCore from "@/components/OptimizationCore";
import DatasetFeatures from "@/components/DatasetFeatures";
import MLModels from "@/components/MLModels";
import LivePredictor from "@/components/LivePredictor";
import EvaluationMetrics from "@/components/EvaluationMetrics";
import ResultsOutcomes from "@/components/ResultsOutcomes";
import TechStack from "@/components/TechStack";
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
    <MLModels />
    <LivePredictor />
    <EvaluationMetrics />
    <ResultsOutcomes />
    <TechStack />
    <TeamFooter />
  </div>
);

export default Index;
