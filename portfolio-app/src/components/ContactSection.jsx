import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-links">
          <a
            href="https://github.com/TechnicalCoderji"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <div className="link-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-label">GitHub</div>
              <div className="link-url">github.com/TechnicalCoderji</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/dip-parmar-299792458-ms"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <div className="link-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-2.5 8.5v5h-2.75v-4.65c0-1.14-.411-1.92-1.44-1.92-.785 0-1.252.53-1.458 1.041-.075.182-.094.437-.094.692v4.837H8.008s.037-7.85 0-8.662h2.75v1.227c.365-.562 1.018-1.364 2.478-1.364 1.81 0 3.168 1.182 3.168 3.723zM6.5 8.5v5H3.75v-5H6.5zm.188-2.937c0 .778-.628 1.408-1.407 1.408-.778 0-1.406-.63-1.406-1.408S4.503 4.157 5.28 4.157c.78 0 1.408.628 1.408 1.406z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-label">LinkedIn</div>
              <div className="link-url">linkedin.com/in/dip-parmar</div>
            </div>
          </a>

          <a
            href="mailto:dipparmar4637@gmail.com"
            className="contact-link"
          >
            <div className="link-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-label">Email</div>
              <div className="link-url">dipparmar4637@gmail.com</div>
            </div>
          </a>
        </div>

        <div className="contact-footer">
          <p className="footer-text">© 2026 Dip Parmar. Built with logic and clarity.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;