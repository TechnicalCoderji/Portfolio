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
      <div className="how-i-think-container">
        <h2 className="how-i-think-title">My approach to solving problems</h2>
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