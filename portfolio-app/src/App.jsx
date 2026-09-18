import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import HowIThinkSection from './components/HowIThinkSection';
import AboutSection from './components/AboutSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after hero section (after first viewport height)
      if (window.scrollY > window.innerHeight * 1.5 && !showNavbar) {
        setShowNavbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showNavbar]);

  return (
    <div className="app" id="home">
      <Navbar isVisible={showNavbar} />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <HowIThinkSection />
      <AboutSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}

export default App;