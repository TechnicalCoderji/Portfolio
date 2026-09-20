import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <p className="about-text">
            I started coding in 2023 during my diploma.
          </p>
          <p className="about-text">
            At first, it was just interesting.<br />
            But I stayed because it challenged how I think.
          </p>
          <p className="about-text">
            I enjoy solving complex problems more than building typical full-stack apps.
          </p>
          <p className="about-text highlight">
            For me, coding is not just about output —<br />
            it's about understanding the program itself.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;