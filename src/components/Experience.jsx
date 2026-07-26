import Reveal from './Reveal.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">

        <Reveal className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">My journey</p>
          <h2 className="section-title">Internship &amp; <span className="grad">Experience</span></h2>
          <p className="section-sub">Practical experience in Python Django web development, along with Data analysis, data
            workflows, and academic internship projects</p>
        </Reveal>

        <div className="timeline">

          {/* Item 1 */}
          <Reveal className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="glass tl-card">
              <div className="tl-header">
                <div>
                  <div className="tl-title">Django Full Stack Intern</div>
                  <div className="tl-company">Besant Technologies</div>
                </div>
                <span className="tl-date">2026</span>
              </div>

              <ul className="tl-desc">
                <li>Developed a complete temple booking management system using Django, Python, HTML, CSS, JavaScript, and
                  MySQL.
                </li>
                <li>Implemented online booking, devotee management, admin dashboard, and booking history features.</li>
                <li>Designed a responsive user interface and integrated secure database operations for efficient temple
                  management.</li>
                <li>Deployed the application online for real-time access and usage.</li>
                <li>
                  Live Project:{' '}
                  <a href="https://srivari-booking.onrender.com/" target="_blank" rel="noreferrer" className="tl-link">
                    View Live ↗
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Item 2 */}
          <Reveal className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="glass tl-card">
              <div className="tl-header">
                <div>
                  <div className="tl-title">Software Intern</div>
                  <div className="tl-company">SSM Institute of Engineering and Technology</div>
                </div>
                <span className="tl-date">2025</span>
              </div>
              <ul className="tl-desc">
                <li>Worked as part of a team to develop a Faculty Feedback System for the college using React, Node.js,
                  Express, and MySQL.</li>
                <li>Contributed to frontend development, data handling, and workflow processes, including data cleaning
                  and report generation.</li>
                <li>Live project: <a href="https://feedback.ssmiet.ac.in/" target="_blank" rel="noreferrer" className="tl-link">View Live ↗</a>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Item 3 */}
          <Reveal className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="glass tl-card">
              <div className="tl-header">
                <div>
                  <div className="tl-title">Web Development Intern</div>
                  <div className="tl-company">Pinnacle Labs</div>
                </div>
                <span className="tl-date">2024</span>
              </div>
              <ul className="tl-desc">
                <li>Developed and deployed frontend web interfaces using HTML, CSS, and JavaScript.</li>
                <li>Collaborated on project workflows and documented progress.</li>
                <li>Live project: <a href="https://mr-restaurant-static.vercel.app/" target="_blank" rel="noreferrer" className="tl-link">View
                    Live ↗</a></li>
              </ul>
            </div>
          </Reveal>

          {/* Item 4 */}
          <Reveal className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="glass tl-card">
              <div className="tl-header">
                <div>
                  <div className="tl-title">Frontend Web Intern</div>
                  <div className="tl-company">Seval Software Solutions</div>
                </div>
                <span className="tl-date">2024</span>
              </div>
              <ul className="tl-desc">
                <li>Designed UI layouts using Figma and developed responsive web pages using HTML and CSS.</li>
                <li>Deployed the project on Vercel, ensuring responsive design, clean interface, and smooth user
                  experience across devices.</li>
                <li>Live project: <a href="https://ecartstore.vercel.app/" target="_blank" rel="noreferrer" className="tl-link">View Live ↗</a>
                </li>
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
