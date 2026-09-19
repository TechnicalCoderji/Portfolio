import projectsData from '../data/projects.json';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const heroProject = projectsData[0];
  const otherProjects = projectsData.slice(1);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <h2 className="section-title">Projects</h2>

        {/* Hero Project: Logic-Craft */}
        {heroProject && (
          <div className="hero-project-card">
            <div className="hero-project-text">
              <div className="project-tag-pill">{heroProject.tag}</div>
              <h3 className="hero-project-title">{heroProject.title}</h3>
              <p className="hero-project-description">{heroProject.description}</p>
              
              <div className="project-highlight-box">
                <span className="highlight-icon">⚡</span>
                <span className="highlight-text">{heroProject.highlight}</span>
              </div>

              <div className="project-actions">
                <a
                  href={heroProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-btn"
                >
                  <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="hero-project-image-container">
              <img
                src={heroProject.image}
                alt={heroProject.title}
                className="hero-project-image"
              />
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="projects-grid">
          {otherProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <span className="project-tag-pill">{project.tag}</span>
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              
              {project.role && (
                <div className="project-role-box">
                  <span className="role-text">{project.role}</span>
                </div>
              )}

              <div className="project-card-footer">
                <span className="project-highlight-badge">{project.highlight}</span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-btn-sm"
                >
                  <svg className="github-icon-sm" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;