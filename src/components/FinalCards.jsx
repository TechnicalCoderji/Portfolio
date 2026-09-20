import './FinalCards.css';

const FinalCards = ({ onScrollClick }) => {
  return (
    <div className="final-cards-container">
      {/* Final impactful cards */}
      <div className="final-card">
        <h2 className="final-card-text">
          <span className="highlight-red">Strategist</span> by mindset.
        </h2>
      </div>

      <div className="final-card">
        <h2 className="final-card-text">
          Code is easy. <span className="highlight-red">Thinking</span> is rare.
        </h2>
      </div>

      {/* Scroll button */}
      <div className="scroll-button-container">
        <button className="scroll-button" onClick={onScrollClick}>
          <span className="scroll-button-text">
            Scroll More <span className="scroll-arrow">↓</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default FinalCards;