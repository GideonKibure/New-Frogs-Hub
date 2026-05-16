/* script.js - Student notes portal with modules, notes, search, modal viewer, and animated background */

// ==================== DATA STRUCTURE ====================
const modulesData = [
  { id: "fluid", title: "Fluid Mechanics", code: "ME 6213", description: "" },
  { id: "plc", title: "Programmable Logical Controller I (PLC)", code: "ME 6215", description: "" },
  { id: "electro", title: "Electro-Pneumatic", code: "ME 6216", description: "" },
  { id: "autoElec", title: "Auto Electrical System", code: "ME 6210", description: "" },
  { id: "solidworks", title: "Solid Works", code: "ME 6209", description: "" },
  { id: "transducer", title: "Transducers and Actuator Technology", code: "ME 6217", description: "" },
  { id: "eca", title: "Electrical Circuit Analysis", code: "EE 6274", description: "" },
  { id: "ie", title: "Industrial Electronics", code: "EE 6275", description: "" },
  { id: "math", title: "Applied Mathematics IV", code: "MS 6263", description: "" },
  { id: "machine", title: "Machine Element and Design", code: "MS 6212", description: "" }
];

// ==================== LOCAL FILE PATHS ====================
// UPDATE THESE PATHS to point to your actual local files
const localFiles = {
  fluid: [
    { title: "Tutorials 1 (Fluid Properties)", type: "pdf", url: "Fluid Mechanics/TUTORIALS-1 (Based on the Topic of Fluid Properties).pdf" },
    { title: "Tutorials 1 (Solutions)", type: "pdf", url: "Fluid Mechanics/TUTORIALS-1 Solutions.pdf" }
  ],
  plc: [
    { title: "Lecture 1_PLC", type: "pptx", url: "PLC/Lecture 1_PLC I.pptx" },
    { title: "Lecture 2_PLC Input and Output", type: "pptx", url: "PLC/Lecture 2_PLC Input and outputs.pptx" },
    { title: "Lecture 3_Ladder Programming", type: "pptx", url: "PLC/Lecture 3- Ladder Programming.pptx" },
    { title: "Lecture 3_PLC Programming", type: "pptx", url: "PLC/Lecture 3- PLC Programming.pptx" },
    { title: "PLC Fundamentals", type: "pptx", url: "PLC/PLC Fundamentals.pptx" },
    { title: "PLC INPUT-OUTPUTS", type: "pptx", url: "PLC/PLC INPUT-OUTPUTS.pptx" }
  ],
  electro: [
    { title: "Lecture 2_Introduction to Electro-Pneumatic Systems", type: "pptx", url: "Electro Pneumatic/Lecture 2; Introduction to Electro-pneumatics 2.pptx" },
    { title: "Lecture 3_Direct and Indirect Control in Electro-pneumatic", type: "pptx", url: "Electro Pneumatic/Lecture 3; Direct and indirect control in Electro-pneumatic - Copy [Autosaved].pptx" }
  ],
  autoElec: [
    { title: "Autoelectric", type: "pptx", url: "Auto Elecrical System/autoelectric.pptx" },
    { title: "Battery", type: "pptx", url: "Auto Elecrical System/Battery.pptx" },
    { title: "Starting", type: "pptx", url: "Auto Elecrical System/starting.pptx" }
  ],
  solidworks: [
    { title: "SolidWorks Tutorials", type: "link", url: "https://youtu.be/20etLaFJNSc?si=ez1BcWhenrvy7Gfn" }
  ],
  transducer: [
    { title: "Capacitive Transducers", type: "pptx", url: "Transducers/Capacitive Transducers.ppt" },
    { title: "Hall Effect Sensors", type: "pptx", url: "Transducers/Hall effect Sensor.ppt" },
    { title: "Inductive Transducers", type: "pptx", url: "Transducers/Inductive Transducers.ppt" },
    { title: "Introduction to Transducers", type: "pptx", url: "Transducers/Introduction to Transducers.pptx" },
    { title: "Photoelectric Transducers", type: "pptx", url: "Transducers/Photo electric Transducer - Copy.ppt" },
    { title: "Piezoelectric Transducers", type: "pptx", url: "Transducers/Piezoelectric Transducers.ppt" },
    { title: "Proximity Sensors", type: "pptx", url: "Transducers/Proximity Sensors.ppt" },
    { title: "Resistance transducer", type: "pptx", url: "Transducers/Resistance Transducers.ppt" },
    { title: "Thermistors and Resistance Thermometers", type: "pptx", url: "Transducers/Themistors and Resistance thermometers.ppt" },
    { title: "Thermoelectric Transducers", type: "pptx", url: "Transducers/Thermo electric Transducer.ppt" },
    { title: "Transducer-engineering-by-nagaraj", type: "pdf", url: "Transducers/Transducer-engineering-by-nagaraj.pdf" },
    { title: "Transducer-engineering-dr-s-renganathan", type: "pdf", url: "Transducers/Transducer-engineering-dr-s-renganathan.pdf" }
  ],
  eca: [
    { title: "Lecture 3_Transistor Bias Circuits", type: "pdf", url: "Circuit Analysis/Lecture 3 - Transistor Bias Circuits.pdf" },
    { title: "Lecture 1 & 2", type: "pptx", url: "Circuit Analysis/L 1& 2.ppt" },
    { title: "Lecture 2", type: "pptx", url: "Circuit Analysis/LECTURE TWO.ppt" },
    { title: "Lecrure 3", type: "pptx", url: "Circuit Analysis/LECTURE THREE.pptx" }
  ],
  ie: [
    { title: "Waiting for Notes...", type: "pdf", url: "" }
  ],
  math: [
    { title: "Waiting for Notes...", type: "pdf", url: "" }
  ],
  machine: [
    { title: "Lecture 1_Introduction to machine Element and Design", type: "pptx", url: "Machine Element/LECTURE 1. INTRODUCTION TO MACHINE ELEMENT AND DESIGN.pptx" },
    { title: "Machine and Mechanisms", type: "pptx", url: "Machine Element/MACHINE AND MECHANISMS (1).pptx" },
    { title: "Machine Elements and Design Contents", type: "docx", url: "Machine Element/MACHINE ELEMENTS AND DESIGN CONTETS - ME 62122.docx" },
    { title: "Machine Design Blueprint", type: "pptx", url: "Machine Element/Machine_Design_Blueprint.pptx" },
    { title: "Machine Design Framework", type: "pptx", url: "Machine Element/Machine_Design_Framework.pptx" },
    { title: "Stress in Composite Bars", type: "pptx", url: "Machine Element/STRESS IN COMPOSITE BARS.pptx" }
  ]
};

// Notes database
const notesDatabase = {};

// Build notes database from localFiles
for (let moduleId in localFiles) {
  notesDatabase[moduleId] = localFiles[moduleId].map(file => ({
    title: file.title,
    desc: "",
    type: file.type,
    pdfUrl: file.url
  }));
}

// Ensure every module has notes
for (let mod of modulesData) {
  if (!notesDatabase[mod.id] || notesDatabase[mod.id].length === 0) {
    notesDatabase[mod.id] = [
      { title: `${mod.title} Notes`, desc: "", type: "pdf", pdfUrl: `notes/${mod.id}_notes.pdf` }
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

// Detect mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

// ==================== UPDATED openModal FUNCTION WITH DOCX SUPPORT ====================
function openModal(fileUrl, title, fileType) {
  const modal = document.getElementById("pdfModal");
  const modalTitleSpan = document.getElementById("modalTitle");
  
  modalTitleSpan.innerText = title || "Document Viewer";
  
  // Check if this is an external link (type 'link' or URL starting with http:// or https://)
  const isExternalLink = fileType === 'link' || 
                        fileUrl.startsWith('http://') || 
                        fileUrl.startsWith('https://') ||
                        fileUrl.includes('youtu.be') ||
                        fileUrl.includes('youtube.com');
  
  // Handle External Links (YouTube, websites, etc.)
  if (isExternalLink) {
    showExternalContent(fileUrl, title);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }
  
  // Handle DOCX files - with mobile support
  if (fileType === 'docx' || fileUrl.toLowerCase().includes('.docx')) {
    if (isMobileDevice()) {
      showMobileDocxOptions(fileUrl, title);
    } else {
      showDocxMessage(fileUrl, title);
    }
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }
  
  // Handle PPT/PPTX files
  if (fileType === 'pptx' || fileType === 'ppt' || fileUrl.toLowerCase().includes('.pptx') || fileUrl.toLowerCase().includes('.ppt')) {
    showPowerPointMessage(fileUrl, title);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }
  
  // Handle PDF files - with mobile compatibility
  if (isMobileDevice()) {
    // On mobile devices, offer better options
    showMobilePdfOptions(fileUrl, title);
  } else {
    // On desktop, use iframe viewer
    showPdfInIframe(fileUrl, title);
  }
  
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// New function to handle DOCX files on mobile
function showMobileDocxOptions(fileUrl, title) {
  const modalBody = document.querySelector(".modal-body");
  
  modalBody.innerHTML = `
    <div style="padding: 1rem; background: white; height: 100%; overflow-y: auto;">
      <div style="text-align: center; padding: 2rem 1rem;">
        <i class="fas fa-file-word" style="font-size: 4rem; color: #2b5797; margin-bottom: 1rem; display: block;"></i>
        <h3 style="color: #0a1a2f; margin-bottom: 1rem;">${escapeHtml(title)}</h3>
        <p style="color: #666; margin-bottom: 2rem;">This is a Microsoft Word document (DOCX).</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
          <button id="mobileDocxDownloadBtn" class="btn" style="background: #0e2a3b; color: white; padding: 0.8rem; width: 100%;">
            <i class="fas fa-download"></i> Download DOCX
          </button>
          <button id="mobileDocxViewBtn" class="btn" style="background: #1e2a3e; color: white; padding: 0.8rem; width: 100%;">
            <i class="fas fa-external-link-alt"></i> Open in New Tab
          </button>
          <button id="mobileDocxGoogleBtn" class="btn" style="background: #2a3a4e; color: white; padding: 0.8rem; width: 100%;">
            <i class="fab fa-google"></i> Open with Google Docs
          </button>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
          <p style="font-size: 0.8rem; color: #666; margin: 0;">
            <i class="fas fa-info-circle"></i> Tip: Download the DOCX file and open with Microsoft Word, Google Docs, or your preferred document viewer.
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners for mobile DOCX options
  document.getElementById("mobileDocxDownloadBtn")?.addEventListener("click", () => {
    downloadFile(fileUrl, `${title}.docx`);
  });
  
  document.getElementById("mobileDocxViewBtn")?.addEventListener("click", () => {
    window.open(fileUrl, '_blank');
  });
  
  document.getElementById("mobileDocxGoogleBtn")?.addEventListener("click", () => {
    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + fileUrl)}&embedded=true`;
    window.open(googleDocsUrl, '_blank');
  });
}

// Show DOCX message for desktop
function showDocxMessage(fileUrl, title) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div style="padding: 2rem; background: white; height: 100%; display: flex; justify-content: center; align-items: center;">
      <div style="text-align: center; max-width: 400px;">
        <i class="fas fa-file-word" style="font-size: 4rem; color: #2b5797; margin-bottom: 1rem;"></i>
        <h3 style="color: #0a1a2f; margin-bottom: 1rem;">Microsoft Word Document</h3>
        <p style="color: #666; margin-bottom: 2rem;">This is a DOCX file. Click below to download and view it with Microsoft Word or Google Docs.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="desktopDocxDownloadBtn" class="btn" style="background: #0e2a3b; color: white; padding: 0.8rem 1.5rem;">
            <i class="fas fa-download"></i> Download
          </button>
          <button id="desktopDocxGoogleBtn" class="btn" style="background: #1e2a3e; color: white; padding: 0.8rem 1.5rem;">
            <i class="fab fa-google"></i> Open with Google Docs
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById("desktopDocxDownloadBtn")?.addEventListener("click", () => {
    downloadFile(fileUrl, `${title}.docx`);
  });
  
  document.getElementById("desktopDocxGoogleBtn")?.addEventListener("click", () => {
    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + fileUrl)}&embedded=true`;
    window.open(googleDocsUrl, '_blank');
  });
}

// New function to handle external content (YouTube, websites)
function showExternalContent(fileUrl, title) {
  const modalBody = document.querySelector(".modal-body");
  
  // Check if it's a YouTube link
  const isYouTube = fileUrl.includes('youtube.com/watch') || fileUrl.includes('youtu.be');
  
  if (isYouTube) {
    // Extract video ID for embedded player
    let videoId = '';
    if (fileUrl.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(fileUrl.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (fileUrl.includes('youtu.be')) {
      videoId = fileUrl.split('/').pop();
      // Remove any additional parameters
      videoId = videoId.split('?')[0];
    }
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
    modalBody.innerHTML = `
      <div style="background: white; height: 100%; display: flex; flex-direction: column;">
        <div style="flex: 1; position: relative; background: #000;">
          <iframe 
            src="${embedUrl}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div style="padding: 0.8rem; text-align: center; background: #f5f5f5; border-top: 1px solid #ddd;">
          <a href="${fileUrl}" target="_blank" class="btn" style="background: #0e2a3b; color: white; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-external-link-alt"></i> Open in YouTube
          </a>
        </div>
      </div>
    `;
  } else {
    // Regular external link (website, document link, etc.)
    modalBody.innerHTML = `
      <div style="padding: 2rem; background: white; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="text-align: center; max-width: 500px;">
          <i class="fas fa-external-link-alt" style="font-size: 4rem; color: #d4af37; margin-bottom: 1rem;"></i>
          <h3 style="color: #0a1a2f; margin-bottom: 1rem;">${escapeHtml(title)}</h3>
          <p style="color: #666; margin-bottom: 2rem;">This content is available online. Click the button below to access it.</p>
          <a href="${fileUrl}" target="_blank" class="btn" style="background: #0e2a3b; color: white; padding: 0.8rem 1.5rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-external-link-alt"></i> Open External Link
          </a>
        </div>
      </div>
    `;
  }
}

// Show PDF in iframe (desktop)
function showPdfInIframe(fileUrl, title) {
  const modal = document.getElementById("pdfModal");
  const modalBody = document.querySelector(".modal-body");
  const existingIframe = document.getElementById("pdfFrame");
  
  if (existingIframe) {
    existingIframe.src = fileUrl;
  } else {
    modalBody.innerHTML = `<iframe id="pdfFrame" src="${fileUrl}" title="${title}" style="width:100%; height:100%; border:none;"></iframe>`;
  }
}

// Show mobile-friendly PDF options
function showMobilePdfOptions(fileUrl, title) {
  const modalBody = document.querySelector(".modal-body");
  
  modalBody.innerHTML = `
    <div style="padding: 1rem; background: white; height: 100%; overflow-y: auto;">
      <div style="text-align: center; padding: 2rem 1rem;">
        <i class="fas fa-file-pdf" style="font-size: 4rem; color: #d4af37; margin-bottom: 1rem; display: block;"></i>
        <h3 style="color: #0a1a2f; margin-bottom: 1rem;">${escapeHtml(title)}</h3>
        <p style="color: #666; margin-bottom: 2rem;">Your mobile browser may have limited PDF preview capabilities.</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
          <button id="mobileDownloadBtn" class="btn" style="background: #0e2a3b; color: white; padding: 0.8rem; width: 100%;">
            <i class="fas fa-download"></i> Download PDF
          </button>
          <button id="mobileOpenNewBtn" class="btn" style="background: #1e2a3e; color: white; padding: 0.8rem; width: 100%;">
            <i class="fas fa-external-link-alt"></i> Open in New Tab
          </button>
          <button id="mobileGoogleViewerBtn" class="btn" style="background: #2a3a4e; color: white; padding: 0.8rem; width: 100%;">
            <i class="fab fa-google"></i> Open with Google Docs
          </button>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
          <p style="font-size: 0.8rem; color: #666; margin: 0;">
            <i class="fas fa-info-circle"></i> Tip: Download the PDF and open with your device's PDF reader for the best experience.
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners for mobile options
  document.getElementById("mobileDownloadBtn")?.addEventListener("click", () => {
    downloadFile(fileUrl, `${title}.pdf`);
  });
  
  document.getElementById("mobileOpenNewBtn")?.addEventListener("click", () => {
    window.open(fileUrl, '_blank');
  });
  
  document.getElementById("mobileGoogleViewerBtn")?.addEventListener("click", () => {
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + fileUrl)}&embedded=true`;
    window.open(googleViewerUrl, '_blank');
  });
}

// Show PowerPoint message
function showPowerPointMessage(fileUrl, title) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div style="padding: 2rem; background: white; height: 100%; display: flex; justify-content: center; align-items: center;">
      <div style="text-align: center; max-width: 400px;">
        <i class="fas fa-file-powerpoint" style="font-size: 4rem; color: #d4af37; margin-bottom: 1rem;"></i>
        <h3 style="color: #0a1a2f; margin-bottom: 1rem;">PowerPoint Presentation</h3>
        <p style="color: #666; margin-bottom: 2rem;">This is a PowerPoint file. Click below to download and view it.</p>
        <button id="pptDownloadBtn" class="btn" style="background: #0e2a3b; color: white; padding: 0.8rem 1.5rem;">
          <i class="fas fa-download"></i> Download PowerPoint
        </button>
      </div>
    </div>
  `;
  
  document.getElementById("pptDownloadBtn")?.addEventListener("click", () => {
    downloadFile(fileUrl, `${title}.pptx`);
  });
}

function closeModal() {
  const modal = document.getElementById("pdfModal");
  const modalBody = document.querySelector(".modal-body");
  modal.style.display = "none";
  
  // Reset modal body to default iframe view
  modalBody.innerHTML = `<iframe id="pdfFrame" src="about:blank" title="PDF Viewer" style="width:100%; height:100%; border:none;"></iframe>`;
  document.body.style.overflow = "auto";
}

// Enhanced Download File function with better error handling
function downloadFile(url, filename) {
  // Create a loading indicator
  const loadingToast = document.createElement('div');
  loadingToast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 40px;
    z-index: 10000;
    font-size: 14px;
    pointer-events: none;
  `;
  loadingToast.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  document.body.appendChild(loadingToast);
  
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('File not found');
      }
      return res.blob();
    })
    .then(blob => {
      const link = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
      
      loadingToast.innerHTML = '<i class="fas fa-check"></i> Download complete!';
      setTimeout(() => {
        loadingToast.remove();
      }, 2000);
    })
    .catch((error) => {
      console.error('Download error:', error);
      loadingToast.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Download failed. Trying alternative method...';
      
      // Fallback: direct link
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        loadingToast.remove();
      }, 1000);
    });
}

// Make downloadFile available globally
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
    alert("2ND Year Mechanical Department Engineering Notes Portal\n\nAccess all course materials in one place.\n\nFeatures:\n• 10 Engineering Modules\n• Search modules and notes\n• PDF, PowerPoint, and DOCX file support\n• Responsive design for all devices\n• Interactive animated background\n\nDeveloped for 2nd Year Mechanical Engineering Department Students");
  });
  
  initParticles();
  initHamburgerMenu();
  initScrollReveal();
});