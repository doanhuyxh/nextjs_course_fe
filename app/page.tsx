
import Header from '@/components/HomePageSection/common/Header';
import Footer from '@/components/HomePageSection/common/Footer';

import Hero from '@/components/HomePageSection/Hero';
import ProblemsAndSolutions from '@/components/HomePageSection/ProblemsAndSolutions';
import LearningCenter from '@/components/HomePageSection/LearningCenter';
import IndustryTemplate from '@/components/HomePageSection/IndustryTemplate';
import Testimonials from '@/components/HomePageSection/Testimonials';
import CTA from '@/components/HomePageSection/CTA';
import ButtonOverlay from '@/components/HomePageSection/common/ButtonOverLay';


const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <Hero />
      {/* Problems vs Solutions Section */}
      <ProblemsAndSolutions />
      {/* Learning Center Section */}
      <LearningCenter />
      {/* Industry Templates Section */}
      <IndustryTemplate />
      {/* Testimonials Section */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />

      <ButtonOverlay />
    </div>
  );
};
export default Home;