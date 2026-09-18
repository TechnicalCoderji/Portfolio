import './ProjectsSection.css';

const projects = [
  {
    id: 'hero',
    title: 'Logic-Craft',
    tag: 'Visual Logic System Simulator',
    description: 'A system designed to simulate and understand real-time logic circuits, enabling deeper reasoning and structured thinking.',
    isHero: true
  },
  {
    id: 1,
    title: 'CallSense',
    tag: 'AI-driven insight system',
    highlight: 'Converts customer interactions into actionable insights.',
    award: 'Hackathon Winner'
  },
  {
    id: 2,
    title: 'Sudoku Canvas',
    tag: 'Algorithm + UI',
    highlight: 'Built with backtracking logic and state management.'
  },
  {
    id: 3,
    title: 'Minesweeper',
    tag: 'Logic-based system',
    highlight: 'Focused on reasoning and game-state validation.'
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Hero Project */}
        <div className="hero-project">
          <div className="project-tag">{projects[0].tag}</div>
          <h2 className="hero-project-title">{projects[0].title}</h2>
          <p className="hero-project-description">{projects[0].description}</p>
        </div>

        {/* Other Projects Grid */}
        <div className="projects-grid">
          {projects.slice(1).map((project) => (
            <div key={project.id} className="project-card">
              {project.award && <div className="project-award">{project.award}</div>}
              <h3 className="project-title">{project.title}</h3>
              <div className="project-tag-small">{project.tag}</div>
              <p className="project-highlight">{project.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;