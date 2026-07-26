/* ==========================================================================
   MUHAMMAD FASEEH - PORTFOLIO INTERACTIVE CONTROLLER (LIGHT MODE & SCROLL ANIMATIONS)
   Features: IntersectionObserver Scroll Animations (Up/Down), Light Neural Canvas,
             Custom Cursor Trail, Side Progress Track, Section Menu, Project Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Scroll Reveal Animations (Triggered on Scroll Up & Down)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Remove active class when scrolling out of view to enable re-animation on scroll up
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('active');
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     2. Interactive Light Background Particle Canvas (Neural Network Effect)
     — Full enhanced animation is handled in Section 9 below.
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  /* --------------------------------------------------------------------------
     3. Custom Interactive Cursor Trail
     -------------------------------------------------------------------------- */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover scale effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-box, .edu-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = 'rgba(124, 58, 237, 0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(37, 99, 235, 0.45)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Scroll Progress Indicator & Active Section Tracker
     -------------------------------------------------------------------------- */
  const progressFill = document.getElementById('progressFill');
  const currentSectionLabel = document.getElementById('currentSectionLabel');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Toggle header scroll state
    const header = document.querySelector('.header');
    if (header) {
      header.classList.toggle('scrolled', scrollTop > 40);
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressFill) {
      progressFill.style.height = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Active Section Detection
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollTop >= top && scrollTop < top + height) {
        if (currentSectionLabel) {
          currentSectionLabel.textContent = id.toUpperCase();
        }
        // Highlight menu items
        document.querySelectorAll('.section-menu button').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-target') === `#${id}`);
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Bottom Left Section Menu Toggle & Smooth Scroll
     -------------------------------------------------------------------------- */
  const sectionLabel = document.getElementById('sectionLabel');
  const sectionMenu = document.getElementById('sectionMenu');
  const chev = sectionLabel ? sectionLabel.querySelector('.chev') : null;

  if (sectionLabel && sectionMenu) {
    sectionLabel.addEventListener('click', (e) => {
      e.stopPropagation();
      sectionMenu.classList.toggle('show');
      if (chev) chev.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!sectionNavContains(e.target)) {
        sectionMenu.classList.remove('show');
        if (chev) chev.classList.remove('open');
      }
    });

    function sectionNavContains(target) {
      return sectionLabel.contains(target) || sectionMenu.contains(target);
    }

    // Menu Item Clicks
    const menuButtons = sectionMenu.querySelectorAll('button');
    menuButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }
        sectionMenu.classList.remove('show');
        if (chev) chev.classList.remove('open');
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Project Case Study Modal (Drawer)
     -------------------------------------------------------------------------- */
  const projectsData = {
    'project-1': {
      index: '01',
      title: 'Phishing URL & Web Security Detector (PhieldGuard Enterprise)',
      category: 'Cybersecurity / Machine Learning • Production Deployed',
      description: 'Enterprise-grade security web application analyzing URLs to detect phishing attempts and malicious domain threats in real-time. Trained and evaluated a Random Forest Classifier on lexical and structural features. Built and deployed a production RESTful inference API using FastAPI on Vercel with sub-150ms prediction latency.',
      tech: ['Python', 'Scikit-Learn', 'FastAPI', 'Streamlit', 'Vercel', 'Git'],
      github: 'https://github.com/MuhammadFaseeh1/Phishing-URL-Detector',
      demo: 'https://phishing-url-detector-gfffhhmrgg7ta79jfilxyy.streamlit.app/'
    },
    'project-2': {
      index: '02',
      title: 'Jarvis / ADA Desktop Voice Assistant',
      category: 'Voice AI / Systems Automation • Local Hybrid Engine',
      description: 'Local-first desktop AI assistant featuring a multi-layer model architecture with local system control and offline fallback. Architected a triple-layer hybrid LLM system with sub-second automatic failover between Google Gemini API and local Ollama/Llama 3.2 models, guaranteeing 100% voice continuity. Engineered a custom NLU intent parser converting natural speech into structured JSON schemas.',
      tech: ['Python', 'Gemini API', 'Ollama / Llama 3.2', 'SpeechRecognition', 'PyQt', 'Multithreading'],
      github: 'https://github.com/MuhammadFaseeh1/Jarvis',
      demo: null
    },
    'project-3': {
      index: '03',
      title: 'Social Media Content Engine',
      category: 'Full-Stack AI Automation • GenAI Pipeline',
      description: 'End-to-end platform streamlining marketing workflows by synthesizing platform-optimized social media posts and campaign strategies using generative models. Developed a high-performance RESTful API using FastAPI with structured prompt engineering routines to output tailored content across multiple brand tones. Integrated with a responsive web interface featuring real-time post preview.',
      tech: ['FastAPI', 'Python', 'Streamlit', 'Gemini API', 'Next.js'],
      github: 'https://github.com/MuhammadFaseeh1/Social-Media-Agent',
      demo: null
    },
    'project-4': {
      index: '04',
      title: 'Superior Connect',
      category: 'Web & Cross-Platform • Real-Time Web',
      description: 'Real-time web communication platform designed for campus-wide interaction and academic collaboration. Powered by a WebSocket-driven instant message broadcasting pipeline and Node.js / Express backend with MongoDB data storage. Built a responsive Flutter Web client with provider state management.',
      tech: ['Flutter (Web)', 'Node.js', 'WebSockets', 'MongoDB', 'Provider'],
      github: 'https://github.com/MuhammadFaseeh1',
      demo: null
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalIndex = document.getElementById('modalIndex');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalText = document.getElementById('modalText');
  const modalTech = document.getElementById('modalTech');
  const modalGithub = document.getElementById('modalGithub');
  const modalDemo = document.getElementById('modalDemo');
  const modalClose = document.getElementById('modalClose');

  window.openProjectModal = function (id) {
    const data = projectsData[id];
    if (!data || !projectModal) return;

    if (modalIndex) modalIndex.textContent = data.index;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalMeta) modalMeta.textContent = data.category;
    if (modalText) modalText.textContent = data.description;

    if (modalTech) {
      modalTech.innerHTML = data.tech.map(t => `<span class="card-tag">${t}</span>`).join('');
    }

    if (modalGithub) {
      modalGithub.href = data.github;
      modalGithub.style.display = 'inline-flex';
    }

    if (modalDemo) {
      if (data.demo) {
        modalDemo.href = data.demo;
        modalDemo.style.display = 'inline-flex';
      } else {
        modalDemo.style.display = 'none';
      }
    }

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* --------------------------------------------------------------------------
     7. Magnetic Pull Effect — Buttons & Brand
     -------------------------------------------------------------------------- */
  const magneticEls = document.querySelectorAll(
    '.btn-dungyov, .top-action-btn, .brand, .status, .section-label'
  );

  magneticEls.forEach(el => {
    el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.willChange = 'transform';
    el.style.display = el.style.display || 'inline-flex';

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Pull toward cursor, max ±14px
      const strength = 0.38;
      const tx = Math.max(-14, Math.min(14, dx * strength));
      const ty = Math.max(-10, Math.min(10, dy * strength));
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'translate(0, 0)';
      // Restore fast transition after spring back
      setTimeout(() => {
        el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 650);
    });
  });

  /* --------------------------------------------------------------------------
     8. Mouse Spotlight & 3D Card Tilt (Project Cards + Skill Boxes)
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.project-card, .skill-box');
  const MAX_TILT = 12; // degrees

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      // Normalise -1 → +1
      const nx = (x - cx) / cx;
      const ny = (y - cy) / cy;
      const rotateX = (-ny * MAX_TILT).toFixed(2);
      const rotateY  = ( nx * MAX_TILT).toFixed(2);

      card.style.transition =
        'transform 0.1s ease, border-color 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;

      // Update spotlight CSS vars for ::before pseudo-element
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition =
        'transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });

  /* --------------------------------------------------------------------------
     9. Canvas Click Shockwave — Particle Ripple Burst
     -------------------------------------------------------------------------- */
  // Store active ripple waves
  const ripples = [];

  if (canvas) {
    canvas.style.pointerEvents = 'auto';
    document.addEventListener('click', e => {
      // Don't fire ripple if clicking on interactive elements
      if (e.target.closest('a, button, .project-card, .section-label, .top-action-btn')) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 180,
        strength: 60,
        alpha: 0.6,
        speed: 5
      });
    });
  }

  /* Patch the existing particle animation to handle ripple forces */
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    // Retrieve or reconstruct the particles array
    // We add a fresh hook by shadowing the animateParticles function
    // by replacing requestAnimationFrame-based loop with an extended one.
    const particleCount = Math.floor(Math.min(width, height) / 14);
    const particles = [];
    let mousePosX = width / 2;
    let mousePosY = height / 2;

    window.addEventListener('mousemove', e => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        ox: 0, // ripple offset x
        oy: 0, // ripple offset y
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
      });
    }


    function animateEnhanced() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint mouse aura glow
      const auraGrad = ctx.createRadialGradient(mousePosX, mousePosY, 0, mousePosX, mousePosY, 80);
      auraGrad.addColorStop(0, 'rgba(37,99,235,0.06)');
      auraGrad.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // Advance ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.alpha -= 0.012;
        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }
        // Draw ripple ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79,70,229,${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply ripple force
        for (const rip of ripples) {
          const dx = p.x - rip.x;
          const dy = p.y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripFront = Math.abs(dist - rip.radius);
          if (ripFront < 30) {
            const force = (1 - ripFront / 30) * rip.strength / (dist + 1);
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          }
        }

        // Dampen velocity to ambient motion
        p.vx *= 0.985;
        p.vy *= 0.985;
        // Ensure minimum ambient drift
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.2) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = p.x - mousePosX;
        const mdy = p.y - mousePosY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePosX, mousePosY);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.3 * (1 - mdist / 160)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateEnhanced);
    }

    animateEnhanced();
  }

  /* --------------------------------------------------------------------------
     10. Enhanced Custom Cursor — Ring Pulse on Click
     -------------------------------------------------------------------------- */
  if (cursorDot && cursorRing) {
    document.addEventListener('mousedown', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.6)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(0.75)';
      cursorRing.style.borderColor = 'rgba(124, 58, 237, 0.9)';
      cursorRing.style.borderWidth = '2.5px';
    });
    document.addEventListener('mouseup', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(37, 99, 235, 0.45)';
      cursorRing.style.borderWidth = '1.5px';
    });
  }

});
