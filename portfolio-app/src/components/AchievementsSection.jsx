import './AchievementsSection.css';

const achievements = [
  'CodeWave Hackathon Winner',
  'Built multiple logic-driven systems',
  'Strong foundation in problem-solving'
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="achievements-section">
      <div className="section-container">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-list">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <div className="achievement-marker"></div>
              <p className="achievement-text">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;