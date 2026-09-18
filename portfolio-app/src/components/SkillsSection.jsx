import './SkillsSection.css';

const skills = [
  'Logic Engineering',
  'Backend Systems',
  'Problem Solving',
  'Critical Thinking',
  'Creative Development'
];

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">Core Strengths</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-block">
              <span className="skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;