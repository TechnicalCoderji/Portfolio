import './PortfolioSection.css';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Analytics Platform',
    description: 'A comprehensive analytics dashboard that leverages machine learning to provide actionable insights for enterprise clients.',
    tags: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    icon: '📊'
  },
  {
    id: 2,
    title: 'Real-Time Collaboration Tool',
    description: 'WebSocket-based collaboration platform enabling teams to work together seamlessly across different time zones.',
    tags: ['Node.js', 'WebSocket', 'Redis', 'MongoDB'],
    icon: '🤝'
  },
  {
    id: 3,
    title: 'Cloud Infrastructure Manager',
    description: 'DevOps automation suite for managing multi-cloud deployments with intelligent cost optimization algorithms.',
    tags: ['Go', 'Kubernetes', 'AWS', 'Terraform'],
    icon: '☁️'
  }
];

const PortfolioSection = () => {
  return (
    <section id="portfolio-section" className="portfolio-section">
      <div className="portfolio-container">
        {/* Header */}
        <div className="portfolio-header">
          <h2 className="portfolio-title">Selected Work</h2>
          <p className="portfolio-subtitle">
            Crafting solutions that matter
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.icon}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
