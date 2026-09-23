"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "@/components/Scene3D";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "TEXT EDITOR",
    category: "C / DATA STRUCTURES",
    year: "2026",
    description:
      "A command-line text editor built in C with dynamic memory management, file handling, searching, editing and document statistics.",
    tags: ["C", "Pointers", "Dynamic Memory", "File I/O", "Git"],
    type: "editor",
  },
  {
    number: "02",
    title: "LEETCODE JOURNEY",
    category: "PROBLEM SOLVING / DSA",
    year: "2026",
    description:
      "A growing collection of algorithmic problem-solving work focused on building strong foundations in data structures and competitive programming.",
    tags: ["C", "DSA", "Algorithms", "LeetCode"],
    type: "leetcode",
  },
  {
    number: "03",
    title: "SMART INDIA HACKATHON",
    category: "HACKATHON / TEAM PROJECT",
    year: "2026",
    description:
      "Participated in Smart India Hackathon, working with a team to understand a real-world problem, develop a solution and present the approach.",
    tags: ["Teamwork", "Problem Solving", "Research", "Presentation"],
    type: "sih",
  },
];

const skills = [
  {
    title: "LANGUAGES",
    items: ["C", "C++", "Python", "JavaScript"],
  },
  {
    title: "DEVELOPMENT",
    items: ["HTML", "CSS", "React", "Next.js", "TypeScript"],
  },
  {
    title: "TOOLS",
    items: ["Git", "GitHub", "VS Code", "Linux"],
  },
  {
    title: "CURRENTLY LEARNING",
    items: ["DSA", "Three.js", "GSAP", "Backend Development"],
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "editor") {
    return (
      <div className="project-visual editor-visual">
        <div className="editor-window">
          <div className="editor-top">
            <div className="window-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="window-title">editor.c</span>
          </div>

          <div className="editor-body">
            <div className="line-numbers">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div className="code-lines">
              <span>
                <b>#include</b> &lt;stdio.h&gt;
              </span>
              <span>
                <b>#include</b> &lt;stdlib.h&gt;
              </span>
              <span />
              <span>
                <em>typedef struct</em> Document
              </span>
              <span>{"{"}</span>
              <span>&nbsp;&nbsp;char **lines;</span>
              <span>&nbsp;&nbsp;int count;</span>
              <span>{"};"}</span>
              <span />
            </div>
          </div>
        </div>

        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
      </div>
    );
  }

  if (type === "leetcode") {
    return (
      <div className="project-visual leetcode-visual">
        <div className="leetcode-circle">
          <span>DSA</span>
        </div>

        <div className="leetcode-word">SOLVE</div>

        <div className="leetcode-lines">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="floating-number number-one">01</div>
        <div className="floating-number number-two">42</div>
        <div className="floating-number number-three">∞</div>
      </div>
    );
  }

  return (
    <div className="project-visual sih-visual">
      <div className="sih-grid" />

      <div className="sih-center">
        <span>SIH</span>
        <small>2026</small>
      </div>

      <div className="sih-ring ring-a" />
      <div className="sih-ring ring-b" />
      <div className="sih-ring ring-c" />

      <div className="sih-label label-a">IDEATE</div>
      <div className="sih-label label-b">BUILD</div>
      <div className="sih-label label-c">PRESENT</div>
    </div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --------------------------------
         HERO SCROLL PROGRESS
      -------------------------------- */

      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });
      }

      /* --------------------------------
         HERO ENTRANCE
      -------------------------------- */

      gsap.from(".hero-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-title-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".hero-actions", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

      /* --------------------------------
         GENERAL REVEALS
      -------------------------------- */

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* --------------------------------
         ABOUT STATS
      -------------------------------- */

      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((item, index) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* --------------------------------
         HORIZONTAL PROJECT SECTION
      -------------------------------- */

      const media = gsap.matchMedia();

      media.add("(min-width: 769px)", () => {
        const work = workRef.current;
        const track = trackRef.current;

        if (!work || !track) return;

        const getDistance = () => {
          return Math.max(0, track.scrollWidth - work.clientWidth);
        };

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
  trigger: work,
  start: "top+=180 top",
  end: () => `+=${getDistance() + 180}`,
  pin: true,
  scrub: 0.8,
  anticipatePin: 1,
  invalidateOnRefresh: true,
},
        });
      });

      /* --------------------------------
         SKILL CARDS
      -------------------------------- */

      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
      });

      /* --------------------------------
         NAVIGATION
      -------------------------------- */

      const sections = ["about", "work", "stack", "resume", "contact"];

      sections.forEach((id) => {
        const element = document.getElementById(id);

        if (!element) return;

        ScrollTrigger.create({
          trigger: element,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => updateNav(id),
          onEnterBack: () => updateNav(id),
        });
      });

      function updateNav(id: string) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("nav-link-active");
        });

        document
          .querySelector(`[data-nav="${id}"]`)
          ?.classList.add("nav-link-active");
      }

      ScrollTrigger.refresh();

      return () => {
        media.revert();
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div ref={pageRef} className="site">
      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav className="nav">
        <button
          className="nav-brand"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          BHUVANESH<span>.</span>
        </button>

        <div className="nav-links">
          {["about", "work", "stack", "resume", "contact"].map((item) => (
            <button
              key={item}
              data-nav={item}
              className={`nav-link ${
                item === "about" ? "nav-link-active" : ""
              }`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="nav-status">
          <span className="status-dot" />
          AVAILABLE TO BUILD
        </div>
      </nav>

      {/* =========================================
          HERO
      ========================================= */}

      <main>
        <section ref={heroRef} className="hero">
          <div className="hero-grid" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-content">
            <div className="hero-eyebrow">
              <span>01</span>
              COMPUTER SCIENCE STUDENT / DEVELOPER
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">BUILDING</span>
              <span className="hero-title-line hero-title-indent">
                DIGITAL
              </span>
              <span className="hero-title-line">
                EXPERIENCES<span className="hero-dot">.</span>
              </span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-description">
                I&apos;m Bhuvanesh — a computer science student exploring
                software development, problem solving and creative technology.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => scrollTo("work")}
                >
                  EXPLORE WORK
                  <span>↘</span>
                </button>

                <button
                  className="secondary-button"
                  onClick={() => scrollTo("contact")}
                >
                  LET&apos;S TALK
                </button>
              </div>
            </div>
          </div>

          <div className="hero-scene">
            <Scene3D progressRef={progressRef} />
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* =========================================
            ABOUT
        ========================================= */}

        <section id="about" className="about section">
          <div className="section-number">02 / ABOUT</div>

          <div className="about-layout">
            <div className="about-heading reveal">
              <p className="eyebrow">A LITTLE ABOUT ME</p>

              <h2>
                CURIOUS
                <br />
                BY NATURE.
              </h2>
            </div>

            <div className="about-content reveal">
              <p className="large-copy">
                I&apos;m a CSE student who enjoys understanding how things work
                and then trying to build them myself.
              </p>

              <p>
                My current journey is centered around strengthening my
                programming fundamentals, learning data structures and
                algorithms, building real projects and exploring modern web
                technologies.
              </p>

              <p>
                I like projects that sit somewhere between engineering and
                creativity — products that are useful, technically interesting
                and enjoyable to interact with.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <strong>03</strong>
                  <span>SEMESTER</span>
                </div>

                <div className="stat-item">
                  <strong>2029</strong>
                  <span>GRADUATION</span>
                </div>

                <div className="stat-item">
                  <strong>∞</strong>
                  <span>THINGS TO LEARN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            WORK
        ========================================= */}

        <section id="work" ref={workRef} className="work">
          <div className="work-header">
            <div>
              <div className="section-number light">03 / SELECTED WORK</div>
              <h2>THINGS I&apos;VE BUILT.</h2>
            </div>

            <p>
              Projects are where I turn concepts into something tangible.
              More experiments will keep appearing here.
            </p>
          </div>

          <div ref={trackRef} className="projects-track">
            {projects.map((project) => (
              <article
                key={project.number}
                className="project-card"
              >
                <div className="project-card-top">
                  <span>{project.number}</span>
                  <span>{project.year}</span>
                </div>

                <ProjectVisual type={project.type} />

                <div className="project-info">
                  <div>
                    <span className="project-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>
                  </div>

                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="work-footer">
            <span>01</span>
            <div />
            <span>03</span>
          </div>
        </section>

        {/* =========================================
            STACK
        ========================================= */}

        <section id="stack" className="stack section">
          <div className="section-number">04 / STACK</div>

          <div className="stack-intro reveal">
            <p className="eyebrow">TOOLS & TECHNOLOGIES</p>

            <h2>
              LEARNING.
              <br />
              BUILDING.
              <br />
              REPEATING.
            </h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.title}>
                <div className="skill-card-number">/</div>

                <h3>{skill.title}</h3>

                <div className="skill-list">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            RESUME
        ========================================= */}

        <section id="resume" className="resume section">
          <div className="section-number">05 / RESUME</div>

          <div className="resume-heading reveal">
            <p className="eyebrow">THE SHORT VERSION</p>

            <h2>
              A DEVELOPER
              <br />
              IN PROGRESS.
            </h2>

            <p className="resume-intro">
              I&apos;m currently building my foundation through coursework,
              personal projects, problem solving and collaborative experiences.
            </p>
          </div>

          <div className="resume-grid">
            <div className="resume-column reveal">
              <h3>EDUCATION</h3>

              <div className="resume-item">
                <div className="resume-year">2025 — 2029</div>

                <div>
                  <h4>B.Tech / B.E. — Computer Science & Engineering</h4>

                  <p>
                    Currently pursuing undergraduate studies with a focus on
                    programming, computer science fundamentals and software
                    development.
                  </p>
                </div>
              </div>
            </div>

            <div className="resume-column reveal">
              <h3>EXPERIENCE</h3>

              <div className="resume-item">
                <div className="resume-year">2026</div>

                <div>
                  <h4>Student Developer / Project Builder</h4>

                  <p>
                    Building academic and personal projects while developing
                    practical experience with C, Git, web technologies and
                    problem solving.
                  </p>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-year">2026</div>

                <div>
                  <h4>Hackathon Participant</h4>

                  <p>
                    Participated in Smart India Hackathon and collaborated with
                    teammates on a real-world problem-solving challenge.
                  </p>
                </div>
              </div>
            </div>

            <div className="resume-column reveal">
              <h3>FOCUS</h3>

              <div className="resume-item">
                <div className="resume-year">NOW</div>

                <div>
                  <h4>Data Structures & Algorithms</h4>

                  <p>
                    Strengthening problem-solving ability through regular
                    practice and learning fundamental data structures and
                    algorithms.
                  </p>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-year">NEXT</div>

                <div>
                  <h4>Full-Stack Development</h4>

                  <p>
                    Exploring modern frontend development while gradually
                    moving towards backend systems and complete applications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-download">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span>DOWNLOAD RESUME</span>
              <strong>↓</strong>
            </a>

            <small>
              Resume PDF can be connected here when the final version is ready.
            </small>
          </div>
        </section>

        {/* =========================================
            JOURNEY
        ========================================= */}

        <section className="journey section">
          <div className="section-number">06 / JOURNEY</div>

          <div className="journey-header reveal">
            <p className="eyebrow">WHAT&apos;S HAPPENING</p>

            <h2>
              STILL
              <br />
              BUILDING.
            </h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <span>01</span>

              <div>
                <small>FOUNDATIONS</small>
                <h3>Learning C & Computer Science Fundamentals</h3>
                <p>
                  Building a strong base in programming, memory, pointers,
                  arrays, strings and problem solving.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <span>02</span>

              <div>
                <small>PROBLEM SOLVING</small>
                <h3>Growing Through DSA Practice</h3>
                <p>
                  Working through algorithmic problems and gradually expanding
                  knowledge of data structures and algorithms.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <span>03</span>

              <div>
                <small>BUILDING</small>
                <h3>Turning Knowledge Into Projects</h3>
                <p>
                  Creating projects that combine programming, design,
                  collaboration and practical engineering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            CONTACT
        ========================================= */}

        <section id="contact" className="contact">
          <div className="contact-glow" />

          <div className="section-number light">07 / CONTACT</div>

          <div className="contact-content">
            <p className="eyebrow">HAVE AN IDEA?</p>

            <h2>
              LET&apos;S
              <br />
              BUILD
              <br />
              SOMETHING<span>.</span>
            </h2>

            <p className="contact-copy">
              Whether it&apos;s a project, collaboration, hackathon or just an
              interesting idea — I&apos;m always interested in building and
              learning something new.
            </p>

            <div className="contact-links">
              <a href="bhuvi170717@gmail.com">EMAIL ↗</a>
              <a
                href="https://github.com/bhuvi170717-netizen/"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
              <a
                href="www.linkedin.com/in/bhuvaneshd17/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>

          <footer>
            <span>BHUVANESH © 2026</span>
            <span>BUILT WITH CURIOSITY</span>
            <span>INDIA</span>
          </footer>
        </section>
      </main>
    </div>
  );
}