/* script.js - Student notes portal with modules, notes, search, modal viewer, and animated background */

// ==================== DATA STRUCTURE ====================
const modulesData = [
  { id: "fluid", title: "Fluid Mechanics", code: "ME 6213", description: "" },
  { id: "plc", title: "Programmable Logical Controller I (PLC)", code: "ME 6215", description: "" },
  { id: "electro", title: "Electro-Pneumatic", code: "ME 6216", description: "" },
  { id: "autoElec", title: "Auto Electrical System", code: "ME 6210", description: "" },
  { id: "cad", title: "Solid Works", code: "ME 6209", description: "" },
  { id: "transducer", title: "Transducers and Actuator Technology", code: "ME 6217", description: "" },
  { id: "eca", title: "Electrical Circuit Analysis", code: "EE 6274", description: "" },
  { id: "ie", title: "Industrial Electronics", code: "EE 6275", description: "" },
  { id: "math", title: "Applied Mathematics IV", code: "MS 6263", description: "" },
  { id: "machine", title: "Machine Element and Design", code: "MS 6212", description: "" }
];

// ==================== LOCAL FILE PATHS ====================
// UPDATE THESE PATHS to point to your actual local files
// Place your PDF and PPT files in a folder named "notes" in the same directory as your HTML file
// Example file structure:
// - index.html
// - style.css
// - script.js
// - notes/
//   - fluid_mechanics.pdf
//   - plc_basics.pptx
//   - etc.

const localFiles = {
  fluid: [
    { title: "Fluid Mechanics Notes", type: "pdf", url: "Fluid Mechanics/TUTORIALS-1 (Based on the Topic of Fluid Properties).pdf" },
    { title: "Fluid Dynamics", type: "pdf", url: "notes/fluid_dynamics.pdf" }
  ],
  plc: [
    { title: "PLC Programming Basics", type: "pdf", url: "notes/plc_basics.pdf" },
    { title: "Advanced PLC", type: "pptx", url: "notes/advanced_plc.pptx" }
  ],
  electro: [
    { title: "Electro-Pneumatic Systems", type: "pdf", url: "notes/electro_pneumatic.pdf" },
    { title: "Valve Control", type: "pptx", url: "notes/valve_control.pptx" }
  ],
  autoElec: [
    { title: "Automotive Electrical Systems", type: "pdf", url: "notes/auto_electrical.pdf" },
    { title: "Wiring Diagrams", type: "pptx", url: "notes/wiring_diagrams.pptx" }
  ],
  cad: [
    { title: "SolidWorks Tutorial", type: "pdf", url: "notes/solidworks_tutorial.pdf" },
    { title: "3D Modeling Guide", type: "pptx", url: "notes/3d_modeling.pptx" }
  ],
  transducer: [
    { title: "Transducers & Actuators", type: "pdf", url: "notes/transducers.pdf" },
    { title: "Sensor Technology", type: "pptx", url: "notes/sensors.pptx" }
  ],
  eca: [
    { title: "Circuit Analysis", type: "pdf", url: "notes/circuit_analysis.pdf" },
    { title: "Network Theorems", type: "pptx", url: "notes/network_theorems.pptx" }
  ],
  ie: [
    { title: "Industrial Electronics", type: "pdf", url: "notes/industrial_electronics.pdf" },
    { title: "Power Electronics", type: "pptx", url: "notes/power_electronics.pptx" }
  ],
  math: [
    { title: "Applied Mathematics IV", type: "pdf", url: "notes/applied_math.pdf" },
    { title: "Laplace Transforms", type: "pptx", url: "notes/laplace_transforms.pptx" }
  ],
  machine: [
    { title: "Machine Element Design", type: "pdf", url: "notes/machine_design.pdf" },
    { title: "Mechanical Components", type: "pptx", url: "notes/mechanical_components.pptx" }
  ]
};

// Notes database (using local files, no descriptions)
const notesDatabase = {};

// Build notes database from localFiles
for (let moduleId in localFiles) {
  notesDatabase[moduleId] = localFiles[moduleId].map(file => ({
    title: file.title,
    desc: "", // Empty description as requested
    type: file.type,
    pdfUrl: file.url
  }));
}

// Ensure every module has notes (fallback for any missing modules)
for (let mod of modulesData) {
  if (!notesDatabase[mod.id] || notesDatabase[mod.id].length === 0) {
    notesDatabase[mod.id] = [
      { title: `${mod.title} Notes`, desc: "", type: "pdf", pdfUrl: `notes/${mod.id}_notes.pdf` }
    ];
  }
}

// Helper function to check if file is a PDF (for preview)
function isPdfFile(url) {
  return url.toLowerCase().endsWith('.pdf');
}

// Helper function to check if file is a PPT/PPTX
function isPptFile(url) {
  return url.toLowerCase().endsWith('.ppt') || url.toLowerCase().endsWith('.pptx');
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
      <p>${escapeHtml(mod.code)}</p>
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
      <div class="button-group">
        <button class="btn btn-view" data-url="${note.pdfUrl}" data-title="${escapeHtml(note.title)}" data-type="${note.type}"><i class="fas fa-eye"></i> View</button>
        <button class="btn btn-download" data-url="${note.pdfUrl}" data-filename="${moduleObj.title}_${note.title}.${note.type}"><i class="fas fa-download"></i> Download</button>
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll(".btn-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = btn.getAttribute("data-url");
      const title = btn.getAttribute("data-title");
      const fileType = btn.getAttribute("data-type");
      openModal(url, title, fileType);
    });
  });
  
  document.querySelectorAll(".btn-download").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = btn.getAttribute("data-url");
      const filename = btn.getAttribute("data-filename");
      downloadFile(url, filename);
    });
  });
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modal Functions with PPT support
function openModal(fileUrl, title, fileType) {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfFrame");
  const modalTitleSpan = document.getElementById("modalTitle");
  
  modalTitleSpan.innerText = title || "Document Viewer";
  
  // For PPT/PPTX files, show a message and download instead
  if (fileType === 'pptx' || fileType === 'ppt' || fileUrl.toLowerCase().includes('.pptx') || fileUrl.toLowerCase().includes('.ppt')) {
    modalTitleSpan.innerText = title + " (PowerPoint File)";
    // Display a message in the iframe for PPT files
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head><style>
        body {
          font-family: 'Inter', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #0a1a2f, #07121f);
          color: white;
          text-align: center;
        }
        .message-container {
          padding: 2rem;
        }
        i {
          font-size: 4rem;
          color: #d4af37;
          margin-bottom: 1rem;
        }
        h2 {
          margin-bottom: 1rem;
        }
        p {
          margin-bottom: 1.5rem;
          color: #b9c7d9;
        }
        .download-btn {
          background: linear-gradient(135deg, #0e2a3b, #1a3a4f);
          color: white;
          border: 1px solid #d4af37;
          padding: 0.8rem 1.5rem;
          border-radius: 40px;
          cursor: pointer;
          font-size: 1rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .download-btn:hover {
          background: linear-gradient(135deg, #1a3a4f, #2a4a62);
        }
      </style>
      </head>
      <body>
        <div class="message-container">
          <i class="fas fa-file-powerpoint"></i>
          <h2>PowerPoint Presentation</h2>
          <p>This is a PowerPoint file. Click the button below to download and view it.</p>
          <button class="download-btn" onclick="parent.downloadFile('${fileUrl}', '${title}.pptx')">
            <i class="fas fa-download"></i> Download PowerPoint
          </button>
        </div>
      </body>
      </html>
    `);
    iframeDoc.close();
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }
  
  // For PDF files, display normally
  iframe.src = fileUrl;
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

// Download File - supports both PDF and PPT
function downloadFile(url, filename) {
  // For local files, use fetch or direct download
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('File not found');
      }
      return res.blob();
    })
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
      // Fallback for local files or if fetch fails
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

// Make downloadFile available globally for the PPT modal
window.downloadFile = downloadFile;

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
      n.title.toLowerCase().includes(query)
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
        <div class="button-group">
          <button class="btn btn-view" data-url="${note.pdfUrl}" data-title="${escapeHtml(note.title)}" data-type="${note.type}"><i class="fas fa-eye"></i> View</button>
          <button class="btn btn-download" data-url="${note.pdfUrl}" data-filename="${moduleObj ? moduleObj.title : 'note'}_${note.title}.${note.type}"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
    `).join("");
    
    document.querySelectorAll(".btn-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(btn.getAttribute("data-url"), btn.getAttribute("data-title"), btn.getAttribute("data-type"));
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
    alert("2ND Year Mechanical Department Engineering Notes Portal\n\nAccess all course materials in one place.\n\nFeatures:\n• 10 Engineering Modules\n• Search modules and notes\n• PDF and PowerPoint file support\n• Responsive design for all devices\n• Interactive animated background\n\nDeveloped for 2nd Year Mechanical Engineering Department Students");
  });
  
  initParticles();
  initHamburgerMenu();
  initScrollReveal();
});