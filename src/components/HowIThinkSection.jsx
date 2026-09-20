import './HowIThinkSection.css';

const steps = [
  {
    number: '01',
    title: 'Understand the system deeply'
  },
  {
    number: '02',
    title: 'Break complexity into logic units'
  },
  {
    number: '03',
    title: 'Design structured solutions'
  },
  {
    number: '04',
    title: 'Optimize for clarity and efficiency'
  }
];

const HowIThinkSection = () => {
  return (
    <section id="how-i-think" className="how-i-think-section">
      <div className="section-container">
        <h2 className="section-title">How I Think</h2>
        <p className="section-subtext">
          Most developers focus on output. <span className="highlight-text">I focus on the program.</span>
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIThinkSection;