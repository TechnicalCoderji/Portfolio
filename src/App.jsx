import { useState } from 'react';
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

  return (
    <div className="app" id="home">
      <Navbar showNavbar={showNavbar} />
      <HeroSection onIntroComplete={() => setShowNavbar(true)} />
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