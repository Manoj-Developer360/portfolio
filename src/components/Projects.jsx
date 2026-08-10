import { useRef } from "react";
import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    delayClass: "d2",
    num: "01",
    title: "SSV Higher Secondary School Website",
    desc: "A modern, responsive frontend website developed for SSV Higher Secondary School as a freelance project. Designed with a clean and user-friendly UI/UX, the website provides an engaging experience across all screen sizes while showcasing the school’s information, academics, facilities, and contact details.",
    tags: [
      { cls: "accent", label: "React.js" },
      { cls: "purple", label: "React Router" },
      { cls: "teal", label: "Vite" },
      { cls: "", label: "JavaScript" },
      { cls: "", label: "CSS3" },
      { cls: "", label: "Vercel" },
    ],
    type: "Freelance Frontend Project",
    link: "https://ssvphs.vercel.app/",
  },

  {
    delayClass: "d2",
    num: "02",
    title: "Sri Vari Temple Booking Management System",
    desc: "A Django-based full-stack web application designed to streamline temple operations through online booking, devotee management, and administrative controls. The system provides a responsive user interface, secure database integration, and efficient booking management workflows.",
    tags: [
      { cls: "accent", label: "Python" },
      { cls: "purple", label: "Django" },
      { cls: "teal", label: "MySQL" },
      { cls: "", label: "HTML/CSS" },
      { cls: "", label: "JavaScript" },
    ],
    type: "Django Full Stack Project",
    link: "https://srivari-booking.onrender.com/",
  },
  {
    delayClass: "d1",
    num: "03",
    title: "Faculty Feedback System",
    desc: "A full-stack web application for collecting and analysing faculty feedback. Features automated dashboards, data cleaning pipelines, and report generation to improve workflow efficiency.",
    tags: [
      { cls: "accent", label: "Python" },
      { cls: "purple", label: "Django" },
      { cls: "teal", label: "Data Analysis" },
      { cls: "", label: "HTML/CSS" },
    ],
    type: "Full Stack Project",
    link: "https://feedback.ssmiet.ac.in/",
  },
  // {
  //   delayClass: 'd2',
  //   num: '03',
  //   title: 'Data Dashboard',
  //   desc: 'An interactive Power BI / Python-powered analytics dashboard for real-time data visualisation. Add your project description here when ready.',
  //   tags: [
  //     { cls: 'teal', label: 'Power BI' },
  //     { cls: 'accent', label: 'Python' },
  //     { cls: '', label: 'Excel' },
  //   ],
  //   type: 'Data Analytics',
  //   link: 'https://github.com/Manoj-Developer360',
  // },
  // {
  //   delayClass: 'd3',
  //   num: '04',
  //   title: 'Portfolio Website',
  //   desc: 'This responsive 3D-animated portfolio built with HTML5, CSS3, and Vanilla JavaScript — showcasing skills, projects, and experience.',
  //   tags: [
  //     { cls: 'accent', label: 'HTML/CSS' },
  //     { cls: 'teal', label: 'JavaScript' },
  //     { cls: '', label: 'CSS Animations' },
  //   ],
  //   type: 'Frontend Project',
  //   link: 'https://github.com/Manoj-Developer360',
  // },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 9; // ±9° horizontal
    const rotX = -((y - cy) / cy) * 6; // ±6° vertical
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  }

  return (
    <Reveal
      as="div"
      className={`glass project-card reveal ${project.delayClass}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="proj-num">{project.num}</div>
      <div className="proj-title">{project.title}</div>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-tags">
        {project.tags.map((t) => (
          <span className={`tag ${t.cls}`.trim()} key={t.label}>
            {t.label}
          </span>
        ))}
      </div>
      <div className="proj-footer">
        <span className="proj-type">{project.type}</span>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="proj-link"
        >
          View Live ↗
        </a>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section bg2">
      <div className="container">
        <Reveal className="reveal" style={{ marginBottom: "56px" }}>
          <p className="section-label">What I've built</p>
          <h2 className="section-title">
            Featured <span className="grad">Projects</span>
          </h2>
          <p className="section-sub">
            A selection of projects built during studies and internships. More
            on GitHub.
          </p>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>

        <Reveal className="projects-cta reveal">
          <a
            href="https://github.com/Manoj-Developer360"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            View All Projects on GitHub ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
