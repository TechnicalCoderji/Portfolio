import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        <div className="about-content">
          <p className="about-text">
            I started coding because it was interesting.
          </p>
          <p className="about-text">
            I stayed because it challenged how I think.
          </p>
          <p className="about-text">
            I enjoy building systems that require logic, structure, and creativity.
          </p>
          <p className="about-text highlight">
            My goal is not just to write code — but to build solutions that make sense.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;