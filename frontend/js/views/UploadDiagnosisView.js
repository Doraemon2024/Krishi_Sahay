/**
 * AI Crop Leaf Diagnosis & Live Camera View Component
 */
async function renderUploadDiagnosisView() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="live-pill" style="margin-bottom: var(--space-3); display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(34, 197, 94, 0.12); color: var(--color-success); border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700;">
            <span class="live-pulse-dot"></span>
            <span>${t('model_active', 'Neural Vision Model Active')}</span>
          </div>
          <h2 class="section-title">${t('scanner_main_title', 'AI Leaf Disease Diagnostics')}</h2>
          <p class="section-subtitle">${t('scanner_main_sub', 'Take a live photo or upload an image of the affected crop leaf for instant neural network disease detection and treatment recommendations.')}</p>
        </div>

        <div style="max-width: 800px; margin: 0 auto;">
          <!-- AI Scanner Upload Card -->
          <div id="scanner-card" class="scanner-card">
            <!-- Hidden File Input for Device Gallery -->
            <input type="file" id="file-input" accept="image/*" style="display: none;">
            
            <!-- Hidden Native Camera Fallback Input with capture="environment" -->
            <input type="file" id="camera-file-input" accept="image/*" capture="environment" style="display: none;">

            <div class="upload-icon-circle">
              ${svgIcons.camera(40)}
            </div>

            <h3 class="scanner-title">${t('scanner_title', 'Upload or Capture Crop Leaf')}</h3>
            <p class="scanner-subtitle">
              ${t('scanner_sub', 'Take a live photo using your camera or choose an image from your device gallery.')}
            </p>

            <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
              <button id="camera-btn" class="btn btn-primary" style="box-shadow: 0 4px 14px rgba(27,77,62,0.35);">
                ${svgIcons.camera(20)}
                <span>${t('btn_take_photo', 'Take Photo (Live Camera)')}</span>
              </button>

              <button id="browse-btn" class="btn btn-secondary">
                ${svgIcons.upload(20)}
                <span>${t('btn_gallery', 'Choose from Gallery')}</span>
              </button>
            </div>

            <!-- Built-in Sample Leaf Test Buttons -->
            <div class="sample-library-wrap">
              <div class="sample-library-title">${t('sample_title', 'Or Test with Built-in Disease Leaf Samples:')}</div>
              <div class="sample-buttons-grid">
                <button class="sample-chip-btn" data-sample="rice_blast">
                  <img src="/samples/rice_blast.jpg" alt="Rice Blast">
                  <span>🌾 Rice Blast Leaf</span>
                </button>
                
                <button class="sample-chip-btn" data-sample="tomato_early_blight">
                  <img src="/samples/tomato_blight.jpg" alt="Tomato Blight">
                  <span>🍅 Tomato Blight Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="wheat_yellow_rust">
                  <img src="/samples/wheat_rust.jpg" alt="Wheat Rust">
                  <span>🌾 Wheat Rust Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="cotton_bacterial_blight">
                  <img src="/samples/cotton_blight.jpg" alt="Cotton Blight">
                  <span>🌱 Cotton Blight Leaf</span>
                </button>

                <button class="sample-chip-btn" data-sample="healthy_crop">
                  <img src="/samples/healthy_leaf.jpg" alt="Healthy Leaf">
                  <span>✨ Healthy Crop Leaf</span>
                </button>
              </div>
            </div>

            <!-- Laser Scanner Animation Overlay (Hidden by default) -->
            <div id="scanning-overlay" class="scanning-overlay" style="display: none;">
              <div class="laser-beam"></div>
              <div class="scanning-spinner"></div>
              <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">
                ${t('analyzing_foliage', 'Analyzing Crop Foliage...')}
              </h4>
              <p id="scan-step-text" style="font-size: 0.9rem; color: var(--text-secondary);">
                ${t('extracting_features', 'Extracting leaf vein and color features...')}
              </p>
            </div>
          </div>

          <!-- Image Preview & Submit Card (Hidden initially) -->
          <div id="preview-card" class="card" style="display: none; margin-top: var(--space-6);">
            <div class="card-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-low">${t('photo_ready', 'Photo Ready')}</span>
                <h3 class="card-title" style="margin: 0;">${t('leaf_ready_title', 'Leaf Image Ready for Diagnosis')}</h3>
              </div>
              <button id="change-img-btn" class="btn btn-sm btn-secondary">
                ${svgIcons.x(16)} <span>${t('btn_retake', 'Retake / Change')}</span>
              </button>
            </div>
            
            <div style="text-align: center; margin-bottom: var(--space-6); position: relative;">
              <img id="preview-img" src="" alt="Uploaded Leaf Preview" style="max-height: 320px; width: auto; max-width: 100%; border-radius: var(--radius-md); margin: 0 auto; box-shadow: var(--shadow-md); border: 2px solid var(--primary-green);">
            </div>

            <button id="analyze-btn" class="btn btn-primary btn-block" style="padding: 16px; font-size: 1.1rem; box-shadow: var(--shadow-lg);">
              ${svgIcons.leaf(22)}
              <span>${t('btn_run_diagnosis', 'Run AI Disease Diagnosis')}</span>
            </button>
          </div>

          <!-- Result Container (Appears after diagnosis) -->
          <div id="result-container" style="margin-top: var(--space-8);"></div>
        </div>
      </div>
    </section>

    <!-- Interactive Live Camera Viewfinder Modal -->
    <div id="camera-modal" class="camera-modal" role="dialog" aria-modal="true" style="display: none;">
      <div class="camera-modal-backdrop"></div>
      <div class="camera-modal-dialog">
        <!-- Camera Header Bar -->
        <div class="camera-modal-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="live-dot-pulse"></div>
            <span style="font-weight: 700; font-size: 1rem; color: #FFFFFF;">${t('camera_modal_title', 'Live Crop Leaf Camera')}</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="camera-flip-btn" class="camera-icon-btn" title="Switch Camera" aria-label="Switch Camera">
              ${svgIcons.cameraFlip ? svgIcons.cameraFlip(20) : svgIcons.camera(20)}
            </button>
            <button id="camera-modal-close" class="camera-icon-btn" title="Close Camera" aria-label="Close Camera">
              ${svgIcons.x(22)}
            </button>
          </div>
        </div>

        <!-- Camera Viewport / Stream Container -->
        <div class="camera-viewport-wrap">
          <video id="camera-video" playsinline autoplay muted></video>
          <canvas id="camera-canvas" style="display: none;"></canvas>
          <img id="camera-snapshot-preview" style="display: none;" alt="Captured Leaf Snapshot">

          <!-- Viewfinder Alignment Reticle & Grid -->
          <div id="camera-reticle" class="camera-reticle">
            <div class="reticle-corner corner-tl"></div>
            <div class="reticle-corner corner-tr"></div>
            <div class="reticle-corner corner-bl"></div>
            <div class="reticle-corner corner-br"></div>
            <div class="reticle-label">Align Leaf Within Frame</div>
          </div>

          <!-- Camera Flash Overlay Effect -->
          <div id="camera-flash" class="camera-flash"></div>

          <!-- Loading Indicator before Stream Starts -->
          <div id="camera-loading" class="camera-loading">
            <div class="scanning-spinner"></div>
            <p style="color: #FFFFFF; font-size: 0.9rem; margin-top: 12px; font-weight: 600;">Accessing Device Camera...</p>
          </div>
        </div>

        <!-- Camera Bottom Action Bar -->
        <div class="camera-modal-footer">
          <!-- Streaming State: Shutter Button -->
          <div id="camera-stream-controls" style="display: flex; justify-content: center; align-items: center; width: 100%;">
            <button id="camera-capture-btn" class="camera-shutter-btn" title="Take Photo" aria-label="Take Photo">
              <div class="shutter-inner">
                ${svgIcons.camera(26)}
              </div>
            </button>
          </div>

          <!-- Review State: Retake / Confirm Buttons (Hidden initially) -->
          <div id="camera-review-controls" style="display: none; width: 100%; justify-content: space-between; gap: var(--space-4);">
            <button id="camera-retake-btn" class="btn btn-secondary" style="flex: 1; justify-content: center; background: rgba(255,255,255,0.15); color: #FFF; border-color: rgba(255,255,255,0.3);">
              ${svgIcons.refresh(18)}
              <span>Retake Photo</span>
            </button>

            <button id="camera-confirm-btn" class="btn btn-primary" style="flex: 1; justify-content: center; background: var(--secondary-green); border-color: var(--secondary-green);">
              ${svgIcons.check(18)}
              <span>Use Photo for Diagnosis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Attaches event listeners for Upload/Diagnosis View & Camera Modal
 */
function initUploadDiagnosisListeners() {
  const scannerCard = document.getElementById('scanner-card');
  const fileInput = document.getElementById('file-input');
  const cameraFileInput = document.getElementById('camera-file-input');
  const browseBtn = document.getElementById('browse-btn');
  const cameraBtn = document.getElementById('camera-btn');
  const previewCard = document.getElementById('preview-card');
  const previewImg = document.getElementById('preview-img');
  const analyzeBtn = document.getElementById('analyze-btn');
  const changeImgBtn = document.getElementById('change-img-btn');
  const scanningOverlay = document.getElementById('scanning-overlay');
  const scanStepText = document.getElementById('scan-step-text');
  const resultContainer = document.getElementById('result-container');

  // Camera Modal Elements
  const cameraModal = document.getElementById('camera-modal');
  const cameraVideo = document.getElementById('camera-video');
  const cameraCanvas = document.getElementById('camera-canvas');
  const cameraSnapshotPreview = document.getElementById('camera-snapshot-preview');
  const cameraCaptureBtn = document.getElementById('camera-capture-btn');
  const cameraModalClose = document.getElementById('camera-modal-close');
  const cameraFlipBtn = document.getElementById('camera-flip-btn');
  const cameraRetakeBtn = document.getElementById('camera-retake-btn');
  const cameraConfirmBtn = document.getElementById('camera-confirm-btn');
  const cameraLoading = document.getElementById('camera-loading');
  const cameraFlash = document.getElementById('camera-flash');
  const cameraReticle = document.getElementById('camera-reticle');
  const cameraStreamControls = document.getElementById('camera-stream-controls');
  const cameraReviewControls = document.getElementById('camera-review-controls');

  let activeStream = null;
  let currentFacingMode = 'environment'; // Prefer rear camera on mobile
  let capturedBlob = null;
  let selectedFile = null;
  let selectedSampleId = null;

  // Browse File Trigger (Gallery)
  browseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Camera Button Trigger -> Opens Live Camera Modal
  cameraBtn?.addEventListener('click', async (e) => {
    e.stopPropagation();
    openCameraModal();
  });

  // Native camera fallback input change
  cameraFileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  });

  // Gallery file input change
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
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

  const sampleImgMap = {
    'rice_blast': '/samples/rice_blast.jpg',
    'tomato_early_blight': '/samples/tomato_blight.jpg',
    'wheat_yellow_rust': '/samples/wheat_rust.jpg',
    'cotton_bacterial_blight': '/samples/cotton_blight.jpg',
    'healthy_crop': '/samples/healthy_leaf.jpg'
  };

  // Built-in Sample Buttons Listener
  document.querySelectorAll('.sample-chip-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const sample = btn.getAttribute('data-sample');
      if (!sample) return;

      document.querySelectorAll('.sample-chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      selectedSampleId = sample;
      selectedFile = null;
      
      previewImg.src = sampleImgMap[sample] || '/samples/rice_blast.jpg';
      previewCard.style.display = 'block';

      showToast(`Testing ${btn.textContent.trim()}... Running AI diagnosis!`, 'info');
      await executeDiagnosis();
    });
  });

  function handleFileSelected(file) {
    selectedFile = file;
    selectedSampleId = null;
    document.querySelectorAll('.sample-chip-btn').forEach(b => b.classList.remove('active'));
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewCard.style.display = 'block';
      previewCard.scrollIntoView({ behavior: 'smooth' });
      showToast('Photo selected! Click "Run AI Disease Diagnosis".', 'success');
    };
    reader.readAsDataURL(file);
  }

  changeImgBtn?.addEventListener('click', () => {
    previewCard.style.display = 'none';
    selectedFile = null;
    selectedSampleId = null;
    document.querySelectorAll('.sample-chip-btn').forEach(b => b.classList.remove('active'));
    fileInput.value = '';
    cameraFileInput.value = '';
    resultContainer.innerHTML = '';
  });

  // --- CAMERA MODAL IMPLEMENTATION ---
  async function openCameraModal() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Fallback for browsers without WebRTC or insecure context
      showToast('Opening native device camera...', 'info');
      cameraFileInput.click();
      return;
    }

    cameraModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    resetCameraViews();
    await startCameraStream(currentFacingMode);
  }

  function closeCameraModal() {
    stopCameraStream();
    cameraModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function resetCameraViews() {
    cameraVideo.style.display = 'block';
    cameraSnapshotPreview.style.display = 'none';
    cameraReticle.style.display = 'block';
    cameraStreamControls.style.display = 'flex';
    cameraReviewControls.style.display = 'none';
    cameraLoading.style.display = 'flex';
    cameraCaptureBtn.disabled = true;
    capturedBlob = null;
  }

  async function startCameraStream(facingMode) {
    stopCameraStream();
    cameraLoading.style.display = 'flex';
    cameraCaptureBtn.disabled = true;

    const constraints = {
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    try {
      activeStream = await navigator.mediaDevices.getUserMedia(constraints);
      cameraVideo.srcObject = activeStream;

      cameraVideo.onloadedmetadata = () => {
        cameraVideo.play();
        cameraLoading.style.display = 'none';
        cameraCaptureBtn.disabled = false;
        showToast('Camera active! Frame the leaf and tap capture.', 'info');
      };
    } catch (err) {
      console.warn('getUserMedia error, falling back:', err);
      // Try relaxed constraint without facingMode
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        cameraVideo.srcObject = activeStream;
        cameraVideo.onloadedmetadata = () => {
          cameraVideo.play();
          cameraLoading.style.display = 'none';
          cameraCaptureBtn.disabled = false;
        };
      } catch (fallbackErr) {
        console.error('All camera attempts failed:', fallbackErr);
        closeCameraModal();
        showToast('Camera permission needed. Opening native camera...', 'info');
        cameraFileInput.click();
      }
    }
  }

  function stopCameraStream() {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      activeStream = null;
    }
    if (cameraVideo) {
      cameraVideo.srcObject = null;
    }
  }

  // Camera Flip button
  cameraFlipBtn?.addEventListener('click', async () => {
    currentFacingMode = (currentFacingMode === 'environment') ? 'user' : 'environment';
    await startCameraStream(currentFacingMode);
  });

  // Close Camera
  cameraModalClose?.addEventListener('click', closeCameraModal);
  cameraModal?.querySelector('.camera-modal-backdrop')?.addEventListener('click', closeCameraModal);

  // Capture Button
  cameraCaptureBtn?.addEventListener('click', () => {
    if (!activeStream || !cameraVideo.videoWidth) {
      showToast('Camera stream is initializing...', 'info');
      return;
    }

    // Trigger flash animation
    cameraFlash.classList.add('flash-active');
    setTimeout(() => cameraFlash.classList.remove('flash-active'), 300);

    // Draw frame to canvas
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    const ctx = cameraCanvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);

    // Display captured snapshot
    const dataUrl = cameraCanvas.toDataURL('image/jpeg', 0.92);
    cameraSnapshotPreview.src = dataUrl;
    cameraSnapshotPreview.style.display = 'block';
    cameraVideo.style.display = 'none';
    cameraReticle.style.display = 'none';

    // Switch controls to Review mode
    cameraStreamControls.style.display = 'none';
    cameraReviewControls.style.display = 'flex';

    // Convert canvas to blob
    cameraCanvas.toBlob((blob) => {
      capturedBlob = blob;
    }, 'image/jpeg', 0.92);
  });

  // Retake Photo
  cameraRetakeBtn?.addEventListener('click', () => {
    resetCameraViews();
    cameraLoading.style.display = 'none';
    cameraCaptureBtn.disabled = false;
    cameraVideo.play();
  });

  // Use Photo for Diagnosis
  cameraConfirmBtn?.addEventListener('click', () => {
    if (!capturedBlob && !cameraSnapshotPreview.src) {
      showToast('Please capture a photo first!', 'error');
      return;
    }

    const filename = `leaf_camera_${Date.now()}.jpg`;
    let file = null;

    if (capturedBlob) {
      file = new File([capturedBlob], filename, { type: 'image/jpeg' });
    } else {
      // Fallback from dataUrl
      const arr = cameraSnapshotPreview.src.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      file = new File([u8arr], filename, { type: mime });
    }

    closeCameraModal();
    handleFileSelected(file);
  });

  // Run AI Diagnosis Trigger
  analyzeBtn?.addEventListener('click', executeDiagnosis);

  async function executeDiagnosis() {
    if (!selectedFile && !selectedSampleId) {
      showToast('Please select or capture a leaf photo first!', 'error');
      return;
    }

    // Show Scanning Animation
    scanningOverlay.style.display = 'flex';
    scanningOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Step text updates
    setTimeout(() => { if (scanStepText) scanStepText.textContent = 'Extracting leaf vein & color features...'; }, 300);
    setTimeout(() => { if (scanStepText) scanStepText.textContent = 'Evaluating pathogen severity index...'; }, 600);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('leafImage', selectedFile);
      }
      if (selectedSampleId) {
        formData.append('sampleId', selectedSampleId);
      }
      const locKey = localStorage.getItem('krishi_location') || 'punjab';
      const customCoordsStr = localStorage.getItem('krishi_custom_coords');
      let locationDisplay = 'Punjab, India';

      if (customCoordsStr) {
        try {
          const parsed = JSON.parse(customCoordsStr);
          if (parsed && parsed.name) locationDisplay = parsed.name;
        } catch (e) {}
      } else {
        const locMap = {
          punjab: 'Ludhiana, Punjab',
          haryana: 'Karnal, Haryana',
          uttar_pradesh: 'Lucknow, Uttar Pradesh',
          himachal_pradesh: 'Shimla, Himachal Pradesh',
          uttarakhand: 'Pantnagar, Uttarakhand',
          jammu_kashmir: 'Srinagar, Jammu & Kashmir',
          ladakh: 'Leh, Ladakh',
          delhi: 'New Delhi, Delhi',
          chandigarh: 'Chandigarh',
          maharashtra: 'Nashik, Maharashtra',
          gujarat: 'Anand, Gujarat',
          rajasthan: 'Kota, Rajasthan',
          goa: 'Panaji, Goa',
          karnataka: 'Shimoga, Karnataka',
          andhra_pradesh: 'Guntur, Andhra Pradesh',
          telangana: 'Warangal, Telangana',
          tamil_nadu: 'Thanjavur, Tamil Nadu',
          kerala: 'Wayanad, Kerala',
          puducherry: 'Puducherry',
          madhya_pradesh: 'Indore, Madhya Pradesh',
          chhattisgarh: 'Raipur, Chhattisgarh',
          bihar: 'Muzaffarpur, Bihar',
          west_bengal: 'Burdwan, West Bengal',
          odisha: 'Cuttack, Odisha',
          jharkhand: 'Ranchi, Jharkhand',
          assam: 'Jorhat, Assam',
          arunachal_pradesh: 'Itanagar, Arunachal Pradesh',
          meghalaya: 'Shillong, Meghalaya',
          manipur: 'Imphal, Manipur',
          mizoram: 'Aizawl, Mizoram',
          nagaland: 'Kohima, Nagaland',
          tripura: 'Agartala, Tripura',
          sikkim: 'Gangtok, Sikkim',
          andaman_nicobar: 'Port Blair, Andaman & Nicobar',
          lakshadweep: 'Kavaratti, Lakshadweep'
        };
        locationDisplay = locMap[locKey] || `${locKey.replace(/_/g, ' ').toUpperCase()}, India`;
      }
      formData.append('location', locationDisplay);

      const result = await ApiClient.diagnoseCrop(formData);

      scanningOverlay.style.display = 'none';
      showToast('AI Diagnosis Completed!', 'success');

      const currentLang = typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en';
      const supportedLangs = typeof I18nService !== 'undefined' ? I18nService.getSupportedLanguages() : [];
      const currentLangObj = supportedLangs.find(l => l.code === currentLang) || { native: 'English', name: 'English' };

      // Render Result Card with Native Voice Audio Player
      resultContainer.innerHTML = `
        <div class="diagnosis-result-card animate-fadeIn">
          <div class="diagnosis-header-banner">
            <div>
              <span class="badge ${result.severityBadgeClass}">${result.severityDisplay || result.severity} ${t('risk_level', 'SEVERITY')}</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; margin-top: 4px;">${result.disease}</h3>
              <p style="font-size: 0.9rem; opacity: 0.9;">${t('target_crop', 'Target Crop:')} ${result.crop} | ${result.location || 'India'}</p>
            </div>
            
            <div style="text-align: right;">
              <div style="font-size: 2.2rem; font-weight: 800; color: #4ADE80;">${result.confidence}%</div>
              <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">${t('ai_confidence', 'AI Confidence')}</div>
            </div>
          </div>

          <!-- Native Voice Response Audio Player Box -->
          <div class="voice-advisory-banner">
            <div class="voice-advisory-left">
              <div class="voice-audio-icon">
                ${svgIcons.volume2(22)}
              </div>
              <div>
                <div class="voice-advisory-title">
                  <span>${t('listen_voice', 'Listen Voice Advisory')}</span>
                  <span class="voice-lang-pill" id="result-voice-lang-badge">${currentLangObj.native}</span>
                </div>
                <div class="voice-advisory-subtitle">${t('voice_subtitle', 'AI audio diagnosis spoken natively in your regional language.')}</div>
              </div>
            </div>

            <div class="voice-advisory-controls">
              <select id="result-voice-lang-select" class="voice-lang-picker" aria-label="Select Voice Response Language">
                ${supportedLangs.map(l => `
                  <option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>
                    ${l.native} (${l.name})
                  </option>
                `).join('')}
              </select>

              <button id="result-voice-play-btn" class="btn btn-sm btn-primary voice-toggle-btn">
                ${svgIcons.volume2(16)}
                <span id="result-voice-play-text">🔊 Listen in ${currentLangObj.native}</span>
              </button>
            </div>
          </div>

          <div class="diagnosis-body">
            <div style="display: flex; gap: var(--space-6); flex-wrap: wrap; margin-bottom: var(--space-6);">
              <img src="${result.uploadedImage}" alt="${result.disease}" style="width: 140px; height: 140px; object-fit: cover; border-radius: var(--radius-md); border: 2px solid var(--primary-green); box-shadow: var(--shadow-sm);">
              <div style="flex: 1;">
                <h4 style="font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">${t('field_symptoms', 'Field Symptoms & Pathogen')}</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${result.summary}</p>
                <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-light);">${t('diagnosis_log_id', 'Diagnosis Log ID:')} ${result.id} | ${t('recorded', 'Recorded:')} ${result.formattedDate}</div>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4); justify-content: flex-end; flex-wrap: wrap;">
              <button id="diagnose-another-btn" class="btn btn-secondary">
                ${svgIcons.camera(18)}
                <span>${t('btn_check_another', 'Check Another Leaf')}</span>
              </button>
              <a href="#problem" class="btn btn-primary">
                ${svgIcons.leaf(20)}
                <span>${t('btn_view_report', 'View Full Treatment Report')}</span>
              </a>
            </div>
          </div>
        </div>
      `;

      // Voice Audio Player Listeners
      const voicePlayBtn = document.getElementById('result-voice-play-btn');
      const voiceLangSelect = document.getElementById('result-voice-lang-select');
      const voicePlayText = document.getElementById('result-voice-play-text');
      const voiceLangBadge = document.getElementById('result-voice-lang-badge');

      const triggerVoiceSpeech = (targetLang) => {
        if (typeof VoiceEngine === 'undefined') return;
        const lObj = supportedLangs.find(l => l.code === targetLang);
        if (voiceLangBadge && lObj) voiceLangBadge.textContent = lObj.native;
        
        VoiceEngine.speakDiagnosis(result, targetLang);
        if (voicePlayText && lObj) voicePlayText.textContent = `⏹ Stop Voice (${lObj.native})`;
        voicePlayBtn?.classList.add('voice-active');
      };

      voicePlayBtn?.addEventListener('click', () => {
        if (typeof VoiceEngine === 'undefined') return;
        if (VoiceEngine.isSpeaking()) {
          VoiceEngine.stop();
          const curLang = voiceLangSelect ? voiceLangSelect.value : currentLang;
          const lObj = supportedLangs.find(l => l.code === curLang);
          if (voicePlayText && lObj) voicePlayText.textContent = `🔊 Listen in ${lObj.native}`;
          voicePlayBtn.classList.remove('voice-active');
        } else {
          const chosen = voiceLangSelect ? voiceLangSelect.value : currentLang;
          triggerVoiceSpeech(chosen);
        }
      });

      voiceLangSelect?.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (typeof I18nService !== 'undefined') I18nService.setLanguage(selected);
        triggerVoiceSpeech(selected);
      });

      document.getElementById('diagnose-another-btn')?.addEventListener('click', () => {
        if (typeof VoiceEngine !== 'undefined') VoiceEngine.stop();
        changeImgBtn.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Auto-translate any newly injected text nodes in resultContainer
      if (typeof I18nService !== 'undefined' && typeof I18nService.translateDOM === 'function') {
        I18nService.translateDOM(resultContainer);
      }

      resultContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      scanningOverlay.style.display = 'none';
      showToast(err.message || 'Diagnosis failed. Please try again.', 'error');
    }
  }
}
