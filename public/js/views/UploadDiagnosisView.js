/**
 * AI Crop Leaf Diagnosis & Upload View Component
 */
async function renderUploadDiagnosisView() {
  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">AI Leaf Disease Diagnostics</h2>
          <p class="section-subtitle">Upload or take a clear photo of the affected crop leaf for instant neural network disease detection and treatment recommendations.</p>
        </div>

        <div style="max-width: 800px; margin: 0 auto;">
          <!-- AI Scanner Upload Card -->
          <div id="scanner-card" class="scanner-card">
            <input type="file" id="file-input" accept="image/*" style="display: none;">
            
            <div class="upload-icon-circle">
              ${svgIcons.camera(40)}
            </div>

            <h3 class="scanner-title">Upload Crop Leaf Photo</h3>
            <p class="scanner-subtitle">
              Drag & drop your leaf image here, or browse from your device gallery.
            </p>

            <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
              <button id="browse-btn" class="btn btn-primary">
                ${svgIcons.upload(20)}
                <span>Choose Image</span>
              </button>
              
              <button id="camera-btn" class="btn btn-secondary">
                ${svgIcons.camera(20)}
                <span>Take Photo</span>
              </button>
            </div>

            <!-- Built-in Sample Leaf Test Buttons -->
            <div class="sample-library-wrap">
              <div class="sample-library-title">Or Try with Built-in Test Leaf Samples:</div>
              <div class="sample-buttons-grid">
                <button class="sample-chip-btn" data-sample="rice_blast">
                  <img src="/samples/rice_blast.svg" alt="Rice Blast">
                  <span>🌾 Rice Blast Leaf</span>
                </button>
                
                <button class="sample-chip-btn" data-sample="tomato_early_blight">
                  <img src="/samples/tomato_blight.svg" alt="Tomato Blight">
                  <span>🍅 Tomato Blight Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="wheat_yellow_rust">
                  <img src="/samples/wheat_rust.svg" alt="Wheat Rust">
                  <span>🌾 Wheat Rust Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="cotton_bacterial_blight">
                  <img src="/samples/cotton_blight.svg" alt="Cotton Blight">
                  <span>🌱 Cotton Blight Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="healthy_crop">
                  <img src="/samples/healthy_leaf.svg" alt="Healthy Leaf">
                  <span>✨ Healthy Crop Leaf</span>
                </button>
              </div>
            </div>

            <!-- Laser Scanner Animation Overlay (Hidden by default) -->
            <div id="scanning-overlay" class="scanning-overlay" style="display: none;">
              <div class="laser-beam"></div>
              <div class="scanning-spinner"></div>
              <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">
                Analyzing Crop Foliage...
              </h4>
              <p id="scan-step-text" style="font-size: 0.9rem; color: var(--text-secondary);">
                Cross-referencing disease pattern database...
              </p>
            </div>
          </div>

          <!-- Image Preview & Submit Card (Hidden initially) -->
          <div id="preview-card" class="card" style="display: none; margin-top: var(--space-6);">
            <div class="card-header">
              <h3 class="card-title">Image Ready for Diagnosis</h3>
              <button id="change-img-btn" class="btn btn-sm btn-secondary">
                ${svgIcons.x(16)} Change Image
              </button>
            </div>
            
            <div style="text-align: center; margin-bottom: var(--space-6);">
              <img id="preview-img" src="" alt="Uploaded Leaf Preview" style="max-height: 300px; border-radius: var(--radius-md); margin: 0 auto; box-shadow: var(--shadow-md);">
            </div>

            <button id="analyze-btn" class="btn btn-primary btn-block">
              ${svgIcons.leaf(20)}
              <span>Run AI Disease Diagnosis</span>
            </button>
          </div>

          <!-- Result Container (Appears after diagnosis) -->
          <div id="result-container" style="margin-top: var(--space-8);"></div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Attaches event listeners for Upload/Diagnosis View
 */
function initUploadDiagnosisListeners() {
  const scannerCard = document.getElementById('scanner-card');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const cameraBtn = document.getElementById('camera-btn');
  const previewCard = document.getElementById('preview-card');
  const previewImg = document.getElementById('preview-img');
  const analyzeBtn = document.getElementById('analyze-btn');
  const changeImgBtn = document.getElementById('change-img-btn');
  const scanningOverlay = document.getElementById('scanning-overlay');
  const scanStepText = document.getElementById('scan-step-text');
  const resultContainer = document.getElementById('result-container');

  let selectedFile = null;
  let selectedSampleId = null;

  // Browse File Trigger
  browseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Camera Trigger (simulation fallback)
  cameraBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Drag & Drop
  scannerCard?.addEventListener('dragover', (e) => {
    e.preventDefault();
    scannerCard.classList.add('drag-over');
  });

  scannerCard?.addEventListener('dragleave', () => {
    scannerCard.classList.remove('drag-over');
  });

  scannerCard?.addEventListener('drop', (e) => {
    e.preventDefault();
    scannerCard.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  });

  // Built-in Sample Buttons Listener
  document.querySelectorAll('.sample-chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sample = btn.getAttribute('data-sample');
      selectedSampleId = sample;
      selectedFile = null;
      
      const sampleImgMap = {
        'rice_blast': '/samples/rice_blast.svg',
        'tomato_early_blight': '/samples/tomato_blight.svg',
        'wheat_yellow_rust': '/samples/wheat_rust.svg',
        'cotton_bacterial_blight': '/samples/cotton_blight.svg',
        'healthy_crop': '/samples/healthy_leaf.svg'
      };

      previewImg.src = sampleImgMap[sample] || '/samples/rice_blast.svg';
      previewCard.style.display = 'block';
      previewCard.scrollIntoView({ behavior: 'smooth' });
      showToast('Sample leaf loaded! Click "Run AI Disease Diagnosis".', 'info');
    });
  });

  function handleFileSelected(file) {
    selectedFile = file;
    selectedSampleId = null;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewCard.style.display = 'block';
      previewCard.scrollIntoView({ behavior: 'smooth' });
    };
    reader.readAsDataURL(file);
  }

  changeImgBtn?.addEventListener('click', () => {
    previewCard.style.display = 'none';
    selectedFile = null;
    selectedSampleId = null;
    fileInput.value = '';
    resultContainer.innerHTML = '';
  });

  // Run AI Diagnosis Trigger
  analyzeBtn?.addEventListener('click', async () => {
    if (!selectedFile && !selectedSampleId) {
      showToast('Please select or upload a leaf photo first!', 'error');
      return;
    }

    // Show Scanning Animation
    scanningOverlay.style.display = 'flex';
    
    // Step text updates
    setTimeout(() => { scanStepText.textContent = 'Extracting leaf vein & color features...'; }, 400);
    setTimeout(() => { scanStepText.textContent = 'Evaluating pathogen severity index...'; }, 700);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('leafImage', selectedFile);
      }
      if (selectedSampleId) {
        formData.append('sampleId', selectedSampleId);
      }
      formData.append('location', 'Ludhiana, Punjab');

      const result = await ApiClient.diagnoseCrop(formData);

      scanningOverlay.style.display = 'none';
      showToast('AI Diagnosis Completed!', 'success');

      // Render Result Card
      resultContainer.innerHTML = `
        <div class="diagnosis-result-card animate-fadeIn">
          <div class="diagnosis-header-banner">
            <div>
              <span class="badge ${result.severityBadgeClass}">${result.severity} SEVERITY</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; margin-top: 4px;">${result.disease}</h3>
              <p style="font-size: 0.9rem; opacity: 0.9;">Target Crop: ${result.crop}</p>
            </div>
            
            <div style="text-align: right;">
              <div style="font-size: 2.2rem; font-weight: 800; color: #4ADE80;">${result.confidence}%</div>
              <div style="font-size: 0.75rem; uppercase; letter-spacing: 0.05em; opacity: 0.8;">AI Confidence</div>
            </div>
          </div>

          <div class="diagnosis-body">
            <div style="display: flex; gap: var(--space-6); flex-wrap: wrap; margin-bottom: var(--space-6);">
              <img src="${result.uploadedImage}" alt="${result.disease}" style="width: 140px; height: 140px; object-fit: cover; border-radius: var(--radius-md); border: 2px solid var(--primary-green);">
              <div style="flex: 1;">
                <h4 style="font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">Summary</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${result.summary}</p>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4); justify-content: flex-end;">
              <a href="#problem" class="btn btn-primary">
                ${svgIcons.leaf(20)}
                <span>View Full Treatment Report</span>
              </a>
            </div>
          </div>
        </div>
      `;

      resultContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      scanningOverlay.style.display = 'none';
      showToast(err.message || 'Diagnosis failed. Please try again.', 'error');
    }
  });
}
