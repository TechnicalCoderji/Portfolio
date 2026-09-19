import './SkillsSection.css';

const skills = [
  'Problem Solving',
  'Critical Thinking',
  'Creative Development'
];

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-accent-bar" />
              <span className="skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;