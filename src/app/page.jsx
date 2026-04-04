import CustomCursor  from '@/components/CustomCursor';
import Loader        from '@/components/Loader';
import Navbar        from '@/components/Navbar';
import Hero          from '@/components/Hero';
import Intro         from '@/components/Intro';
import Stats         from '@/components/Stats';
import Experience    from '@/components/Experience';
import SkillsCarousel from '@/components/SkillsCarousel';
import Projects      from '@/components/Projects';
import Achievements  from '@/components/Achievements';
import Testimonials  from '@/components/Testimonials';
import Contact       from '@/components/Contact';
import Footer        from '@/components/Footer';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Intro />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <SkillsCarousel />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Achievements />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
