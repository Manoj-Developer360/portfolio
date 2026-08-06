import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          {/* Left */}
          <Reveal className="reveal-left">
            <p className="section-label">Who I am</p>
            <h2 className="section-title">
              About <span className="grad">Me</span>
            </h2>
            <div className="about-text">
              <p>
                I am a <strong>Computer Science graduate</strong> from SSM
                Institute of Engineering and Technology (Batch 2021–2025) with a
                CGPA of 7.94.
              </p>

              <p>
                {" "}
                I am currently open to <strong>
                  Full-time Opportunities
                </strong>{" "}
                and <strong>Freelance Projects</strong>, delivering efficient,
                user-focused, and high-quality solutions.{" "}
              </p>

              <p>
                I have experience in building web applications, creating
                dashboards, handling data, documentation, and workflow
                management, supported by <strong>strong leadership</strong> as
                President of the CSE Department.
              </p>

              <p>
                Outside of tech, I am a{" "}
                <strong>National-Level Silambam player</strong>, having
                represented at State & National Championships.
              </p>
            </div>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="hi-icon">👑</div>
                <div className="hi-text">
                  <strong>President – CSE Department</strong>
                  Leadership &amp; Team Coordination
                </div>
              </div>
              <div className="highlight-item">
                <div className="hi-icon">🏆</div>
                <div className="hi-text">
                  <strong>National-Level Silambam Player</strong>
                  State &amp; National Championships
                </div>
              </div>
              <div className="highlight-item">
                <div className="hi-icon">⚡</div>
                <div className="hi-text">
                  <strong>Smart India Hackathon Participant</strong>
                  Problem-solving under pressure
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right card */}
          <Reveal className="reveal-right">
            <div className="glass about-card">
              <div className="about-card-title">📋 Quick Info</div>
              <div className="about-info-row">
                <span className="label">Name</span>
                <span className="value">Manoj Kumar V</span>
              </div>
              <div className="about-info-row">
                <span className="label">Role</span>
                <span className="value">
                  Data Analyst • Full Stack Web Developer
                </span>
              </div>
              <div className="about-info-row">
                <span className="label">Education</span>
                <span className="value">B.E CSE — 7.94 CGPA</span>
              </div>
              <div className="about-info-row">
                <span className="label">Location</span>
                <span className="value">Dindigul, Tamilnadu</span>
              </div>
              <div className="about-info-row">
                <span className="label">Phone</span>
                <span className="value">+91 9500885468</span>
              </div>
              <div className="about-info-row">
                <span className="label">Email</span>
                <span className="value" style={{ wordBreak: "break-all" }}>
                  kumarvmanoj329@gmail.com
                </span>
              </div>
              <div className="about-info-row">
                <span className="label">Status</span>
                <span className="value" style={{ color: "var(--teal)" }}>
                  ✅ Open to Work
                </span>
              </div>
              <div style={{ marginTop: "24px" }}>
                {/* <a
                  href="https://drive.google.com/file/d/1mIGDtYbhPn0zhT2UwwmOZ4gSu9s79hMR/view?usp=sharing"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  ⬇ Download Resume
                </a> */}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
