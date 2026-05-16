/* script.js - Student notes portal with modules, notes, search, modal viewer, and animated background */

// ==================== DATA STRUCTURE ====================
const modulesData = [
  { id: "fluid", title: "Fluid Mechanics", code: "ME 6213", description: "" },
  { id: "plc", title: "Programmable Logical Controller I (PLC)", code: "ME 6215", description: "" },
  { id: "electro", title: "Electro-Pneumatic", code: "ME 6216", description: "" },
  { id: "autoElec", title: "Auto Electrical System", code: "ME 6210", description: "" },
  { id: "cad", title: "Computer Aided Design II", code: "ME 6209", description: "" },
  { id: "transducer", title: "Transducers and Actuator Technology", code: "ME 6217", description: "" },
  { id: "eca", title: "Electrical Circuit Analysis", code: "EE 6274", description: "" },
  { id: "ie", title: "Industrial Electronics", code: "EE 6275", description: "" },
  { id: "math", title: "Applied Mathematics IV", code: "MS 6263", description: "" }
];

// Generate placeholder PDF
function generatePlaceholderPDF(title) {
  const pdfBase64 = 'JVBERi0xLjMKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDY2Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MDggVkQKKFNBTVBMRSBOT1RFOiAnKSBUagovRjEgMTIgVGYKLTIwIFZECihUaXRsZTogJykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTAgMDAwMDAgbg0KMDAwMDAwMDA1NyAwMDAwMCBuDQowMDAwMDAwMTAzIDAwMDAwIG4NCjAwMDAwMDAyMTEgMDAwMDAgbg0KMDAwMDAwMDI2OCAwMDAwMCBuDQp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjM1NQolJUVPRg==';
  return `data:application/pdf;base64,${pdfBase64}`;
}

// Notes database
const notesDatabase = {
  fluid: [
    { title: "Bernoulli Equation Notes", desc: "Detailed derivation and examples with practice problems", pdfUrl: generatePlaceholderPDF("Bernoulli") },
  ],
  plc: [
    { title: "Ladder Logic Basics", desc: "Programming fundamentals with timers and counters", pdfUrl: generatePlaceholderPDF("PLC Basics") },
  ],
  electro: [
    { title: "Electro-Pneumatic Circuits", desc: "Valve control design and wiring diagrams", pdfUrl: generatePlaceholderPDF("Electro-Pneumatic") },
  ],
  autoElec: [
    { title: "Automotive Wiring Diagrams", desc: "Understanding symbols and circuit tracing", pdfUrl: generatePlaceholderPDF("Wiring") },
  ],
  cad: [
    { title: "SolidWorks Assembly", desc: "Top-down design methodology", pdfUrl: generatePlaceholderPDF("CAD Assembly") },
  ],
  transducer: [
    { title: "Strain Gauges", desc: "Wheatstone bridge configurations", pdfUrl: generatePlaceholderPDF("Strain") },
  ],
  eca: [
    { title: "Mesh & Nodal Analysis", desc: "Step-by-step problem solving guide", pdfUrl: generatePlaceholderPDF("Circuit Analysis") },
  ],
  ie: [
    { title: "SCR & Triac", desc: "Power control applications", pdfUrl: generatePlaceholderPDF("SCR") },
  ],
  math: [
    { title: "Laplace Transforms", desc: "Complete table and properties", pdfUrl: generatePlaceholderPDF("Laplace") },
  ]
};

// Ensure every module has notes
for (let mod of modulesData) {
  if (!notesDatabase[mod.id] || notesDatabase[mod.id].length === 0) {
    notesDatabase[mod.id] = [
      { title: `${mod.title} Essentials`, desc: `Core concepts of ${mod.code} with examples`, pdfUrl: generatePlaceholderPDF(mod.title) },
      { title: `Advanced ${mod.title}`, desc: `Case studies and advanced problem solving`, pdfUrl: generatePlaceholderPDF(`${mod.title} Advanced`) }
    ];
  }
}

// ==================== DOM ELEMENTS ====================
let currentModuleId = null;

// Helper Functions
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Render Modules
function renderModules(filterText = "") {
  const grid = document.getElementById("modulesGrid");
  if (!grid) return;
  
  const filtered = modulesData.filter(mod => 
    mod.title.toLowerCase().includes(filterText.toLowerCase()) || 
    mod.code.toLowerCase().includes(filterText.toLowerCase())
  );
  
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results"><i class="fas fa-book-open"></i> No matching modules found.</div>`;
    return;
  }
  
  grid.innerHTML = filtered.map(mod => `
    <div class="module-card" data-id="${mod.id}">
      <h3><i class="fas fa-book"></i> ${escapeHtml(mod.title)}</h3>
      <p>${escapeHtml(mod.code)} — ${escapeHtml(mod.description)}</p>
      <span class="gold-badge"><i class="fas fa-sticky-note"></i> Click to access notes</span>
    </div>
  `).join("");
  
  document.querySelectorAll(".module-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      showNotesForModule(id);
    });
  });
}

// Show Notes for Module
function showNotesForModule(moduleId) {
  currentModuleId = moduleId;
  const moduleObj = modulesData.find(m => m.id === moduleId);
  if (!moduleObj) return;
  
  document.getElementById("homeSection").style.display = "none";
  const notesSection = document.getElementById("notesSection");
  notesSection.style.display = "block";
  
  document.getElementById("moduleTitleHeader").innerHTML = `<i class="fas fa-chalkboard"></i> ${escapeHtml(moduleObj.title)} (${escapeHtml(moduleObj.code)}) - Notes`;
  
  const notesList = notesDatabase[moduleId] || [];
  const container = document.getElementById("notesGridContainer");
  
  if (notesList.length === 0) {
    container.innerHTML = `<div class="no-results"><i class="fas fa-folder-open"></i> No notes uploaded yet. Check back soon!</div>`;
    return;
  }
  
  container.innerHTML = notesList.map((note, idx) => `
    <div class="note-card" data-noteidx="${idx}">
      <div class="note-title">${escapeHtml(note.title)}</div>
      <div class="note-desc">${escapeHtml(note.desc)}</div>
      <div class="button-group">
        <button class="btn btn-view" data-url="${note.pdfUrl}" data-title="${escapeHtml(note.title)}"><i class="fas fa-eye"></i> View</button>
        <button class="btn btn-download" data-url="${note.pdfUrl}" data-filename="${moduleObj.title}_${note.title}.pdf"><i class="fas fa-download"></i> Download</button>
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll(".btn-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(btn.getAttribute("data-url"), btn.getAttribute("data-title"));
    });
  });
  
  document.querySelectorAll(".btn-download").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      downloadFile(btn.getAttribute("data-url"), btn.getAttribute("data-filename"));
    });
  });
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modal Functions
function openModal(pdfUrl, title) {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfFrame");
  const modalTitleSpan = document.getElementById("modalTitle");
  modalTitleSpan.innerText = title || "Document Preview";
  iframe.src = pdfUrl;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfFrame");
  modal.style.display = "none";
  iframe.src = "about:blank";
  document.body.style.overflow = "auto";
}

// Download File
function downloadFile(url, filename) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch(() => {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

// Navigation
function backToHome() {
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("notesSection").style.display = "none";
  currentModuleId = null;
  renderModules(document.getElementById("searchInput").value);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Search Handler
function handleSearch() {
  const homeVisible = document.getElementById("homeSection").style.display !== "none";
  
  if (homeVisible) {
    renderModules(document.getElementById("searchInput").value);
  } else if (currentModuleId) {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const notes = notesDatabase[currentModuleId] || [];
    const filteredNotes = notes.filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.desc.toLowerCase().includes(query)
    );
    
    const container = document.getElementById("notesGridContainer");
    const moduleObj = modulesData.find(m => m.id === currentModuleId);
    
    if (filteredNotes.length === 0) {
      container.innerHTML = `<div class="no-results"><i class="fas fa-search"></i> No matching notes found</div>`;
      return;
    }
    
    container.innerHTML = filteredNotes.map((note, idx) => `
      <div class="note-card">
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-desc">${escapeHtml(note.desc)}</div>
        <div class="button-group">
          <button class="btn btn-view" data-url="${note.pdfUrl}" data-title="${escapeHtml(note.title)}"><i class="fas fa-eye"></i> View</button>
          <button class="btn btn-download" data-url="${note.pdfUrl}" data-filename="${moduleObj ? moduleObj.title : 'note'}_${note.title}.pdf"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
    `).join("");
    
    document.querySelectorAll(".btn-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(btn.getAttribute("data-url"), btn.getAttribute("data-title"));
      });
    });
    document.querySelectorAll(".btn-download").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        downloadFile(btn.getAttribute("data-url"), btn.getAttribute("data-filename"));
      });
    });
  }
}

// ==================== ANIMATED BACKGROUND ====================
function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const PARTICLE_COUNT = 60;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let touchActive = false;
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseVx: (Math.random() - 0.5) * 0.3,
      baseVy: (Math.random() - 0.5) * 0.3
    });
  }
  
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    touchActive = true;
    setTimeout(() => { touchActive = false; }, 150);
  });
  
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      touchActive = true;
      setTimeout(() => { touchActive = false; }, 150);
    }
  });
  
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    // Draw lines
    ctx.beginPath();
    ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
    ctx.lineWidth = 0.8;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, 0.08)`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      const glowIntensity = 0.4 + Math.sin(Date.now() * 0.002 + p.x * 0.01) * 0.15;
      ctx.fillStyle = `rgba(212, 175, 55, ${glowIntensity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(p.x - 0.5, p.y - 0.5, p.radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 235, 150, 0.7)";
      ctx.fill();
    }
    
    requestAnimationFrame(draw);
  }
  
  function updatePositions() {
    for (let p of particles) {
      if (touchActive) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - dist) / 200 * 0.8;
          p.vx -= Math.cos(angle) * force * 0.08;
          p.vy -= Math.sin(angle) * force * 0.08;
        }
      }
      
      p.vx = p.vx * 0.98 + p.baseVx * 0.02;
      p.vy = p.vy * 0.98 + p.baseVy * 0.02;
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
    }
    requestAnimationFrame(updatePositions);
  }
  
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  
  canvas.width = width;
  canvas.height = height;
  draw();
  updatePositions();
}

// ==================== HAMBURGER MENU ====================
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeUp 0.5s ease forwards";
        entry.target.style.opacity = "1";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  
  const observeCards = () => {
    document.querySelectorAll(".module-card, .note-card").forEach(card => {
      card.style.opacity = "0";
      observer.observe(card);
    });
  };
  
  observeCards();
  
  const notesContainer = document.getElementById("notesGridContainer");
  if (notesContainer) {
    const mutationObserver = new MutationObserver(() => {
      setTimeout(observeCards, 100);
    });
    mutationObserver.observe(notesContainer, { childList: true, subtree: true });
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  renderModules("");
  
  document.getElementById("searchInput").addEventListener("input", handleSearch);
  document.getElementById("backHomeBtn").addEventListener("click", backToHome);
  document.getElementById("homeLink").addEventListener("click", (e) => {
    e.preventDefault();
    backToHome();
  });
  
  document.querySelector(".close-modal").addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("pdfModal")) {
      closeModal();
    }
  });
  
  document.getElementById("aboutLink").addEventListener("click", (e) => {
    e.preventDefault();
    alert("2ND Year Mechanical Department Engineering Notes Portal\n\nAccess all course materials in one place.\n\nFeatures:\n• 9+ Engineering Modules\n• Search modules and notes\n• PDF viewer with download option\n• Responsive design for all devices\n• Interactive animated background\n\nDeveloped for 2nd Year Mechanical Engineering Department Students");
  });
  
  initParticles();
  initHamburgerMenu();
  initScrollReveal();
});