/**
 * KrishiSahay Comprehensive Multilingual Internationalization (i18n),
 * Dynamic Online Content Translator & Native Voice Response Engine
 * Supports: English, Telugu (తెలుగు), Hindi (हिन्दी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ),
 * Marathi (मराठी), Punjabi (ਪੰਜਾਬੀ), Bengali (বাংলা)
 */

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', speechLocale: 'en-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speechLocale: 'pa-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', speechLocale: 'bn-IN' }
];

const TRANSLATIONS = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_upload: 'Check Health',
    nav_dashboard: 'Dashboard',
    nav_weather: 'Weather & Risk',
    nav_recommendations: 'Advisories',
    nav_helplines: 'Helplines',
    nav_insurance: 'Insurance',
    nav_awareness: 'Awareness',
    nav_privacy: 'Privacy',

    // Global Banners & Buttons
    live_synced: 'Live Synced',
    sync_now: 'Sync Now',
    detect_gps: '📍 Detect My Farm (GPS)',
    select_state: 'Browse by State/UT:',
    listen_voice: 'Listen Voice Advisory',
    stop_voice: 'Stop Voice',
    voice_playing: 'Playing Voice Advisory...',
    voice_subtitle: 'AI audio spoken natively in your chosen language.',
    active_zone: 'Active Zone:',
    major_crops: 'Major Crops:',
    refresh_live: 'Refresh Live Data',
    recalibrate: 'Recalibrate Advisories',

    // Hero
    hero_badge: 'AI-Powered Agriculture Platform',
    hero_title: 'Smart Farming Starts Here.',
    hero_desc: 'Protect your crops from disease, access real-time weather advisories, receive targeted treatment steps, and connect with official government support services across all Indian states.',
    hero_btn_check: 'Check Crop Health',
    hero_btn_weather: 'View Weather Risk',
    stat_farmers: '10,000+ Farmers Assisted',
    stat_accuracy: '98.4% AI Diagnosis Accuracy',
    stat_helpline: '24/7 Helpline Support',
    farmers_assisted: 'Farmers Assisted',
    ai_diagnosis_accuracy: 'AI Diagnosis Accuracy',
    helpline_support: 'Helpline Support',
    live_field_safe: 'Live Field Status: Safe',
    humidity_low_risk: 'Humidity 82% | Low Rain Risk Today',

    // Core Features
    core_services_title: 'Comprehensive Farmer Support Services',
    core_services_sub: 'Designed specifically for daily agricultural decision-making with instant AI guidance.',
    card_health_title: 'Crop Health AI',
    card_health_desc: 'Upload or snap a leaf photo to detect fungal, bacterial, or pest diseases instantly with confidence scores.',
    card_health_btn: 'Scan Leaf Now',
    card_weather_title: 'Weather & Climate Risk',
    card_weather_desc: 'Agricultural weather forecast and regional Climate Risk Score (LOW/MED/HIGH) predicting spore outbreaks.',
    card_weather_btn: 'View Forecast',
    card_rec_title: 'AI Recommendations',
    card_rec_desc: 'Priority-based farming actions categorized into Immediate, Treatment, Prevention, and Spray timing.',
    card_rec_btn: 'View Action Plan',
    card_help_title: 'Farmer Helplines',
    card_help_desc: '24/7 direct telephone connections to Kisan Call Center and certified agricultural research scientists.',
    card_help_btn: 'View Helplines',
    card_ins_title: 'Crop Insurance',
    card_ins_desc: 'Detailed eligibility, premium calculations, and 72-hour claim guidelines for PMFBY and RWBCIS.',
    card_ins_btn: 'Explore Schemes',
    card_aware_title: 'Farmer Awareness',
    card_aware_desc: 'Upcoming agricultural workshops, ICAR training camps, webinars, and field demonstrations.',
    card_aware_btn: 'Join Events',

    // How it works
    how_title: 'How KrishiSahay Protects Your Field in 3 Steps',
    how_sub: 'Designed for effortless mobile operation directly inside Indian farm fields.',
    step1_title: '1. Capture Leaf Photo',
    step1_desc: 'Snap a live photo of diseased crop foliage using your phone camera or select a saved image.',
    step2_title: '2. Instant AI Diagnosis',
    step2_desc: 'Deep learning vision model diagnoses pathogen type, infection severity, and confidence in seconds.',
    step3_title: '3. Act with Voice Advisory',
    step3_desc: 'Receive weather-calibrated fungicide prescriptions, spray timings, and audio instructions in your native tongue.',

    // Scanner / Upload
    scanner_main_title: 'AI Leaf Disease Diagnostics',
    scanner_main_sub: 'Take a live photo or upload an image of the affected crop leaf for instant neural network disease detection and treatment recommendations.',
    scanner_title: 'Upload or Capture Crop Leaf',
    scanner_sub: 'Take a live photo using your camera or choose an image from your device gallery.',
    btn_take_photo: 'Take Photo (Live Camera)',
    btn_gallery: 'Choose from Gallery',
    btn_run_diagnosis: 'Run AI Disease Diagnosis',
    btn_retake: 'Retake / Change',
    btn_view_report: 'View Full Treatment Report',
    btn_check_another: 'Check Another Leaf',
    sample_title: 'Or Test with Built-in Disease Leaf Samples:',
    photo_ready: 'Photo Ready',
    leaf_ready_title: 'Leaf Image Ready for Diagnosis',
    analyzing_foliage: 'Analyzing Crop Foliage...',
    extracting_features: 'Extracting leaf vein and color features...',
    evaluating_severity: 'Evaluating pathogen severity index...',
    camera_modal_title: 'Live Crop Leaf Camera',
    camera_switch: 'Switch Camera',
    camera_close: 'Close Camera',
    camera_capture: 'Capture Leaf Photo',
    camera_tip: 'Align the leaf inside the frame and tap the green button to capture.',
    model_active: 'Neural Vision Model Active',

    // Diagnosis Result
    ai_confidence: 'AI Confidence',
    target_crop: 'Target Crop:',
    field_symptoms: 'Field Symptoms & Pathogen',
    diagnosis_log_id: 'Diagnosis Log ID:',
    recorded: 'Recorded:',

    // Weather
    weather_banner: 'Pan-India Agricultural Micro-Climate Mesh Online',
    weather_banner_sub: 'Covering All 28 States & 8 Union Territories',
    weather_title: 'Agricultural Weather & Climate Risk',
    weather_sub: 'Real-time micro-climate monitoring and fungal spore outbreak risk predictions tailored for any farm in India.',
    weather_risk_assessment: 'AI CLIMATE RISK ASSESSMENT',
    weather_action: 'Recommended Agricultural Action:',
    weather_temp: 'Live Temperature',
    weather_humidity: 'Relative Humidity',
    weather_wind: 'Wind & UV Index',
    weather_forecast: '7-Day Live Agricultural Weather Forecast',
    weather_search_ph: 'Search any district, city, or village in India (e.g. Guntur, Burdwan, Nagpur, Karnal, Shimoga...)',
    rain_probability: 'Rain Chance:',
    risk_level: 'Risk Level',
    biological_rationale: 'Biological Rationale:',
    outbreak_risk_in: 'Fungal Spore Outbreak Risk in',
    weather_voice_subtitle: 'Micro-climate summary & spore risk audio spoken in your selected regional language.',

    // Problem Detail
    sec1_title: "1. What's Wrong (Symptoms & Pathogen)",
    sec2_title: '2. How to Treat (Numbered Action Steps)',
    sec3_title: '3. Chemical & Organic Spray Prescriptions',
    sec4_title: '4. When to Act (Weather-Aware Spray Advisory)',
    symptoms_title: 'Identified Field Symptoms:',
    step_label: 'Step',
    recommended_spray: 'Recommended Spray Formulation:',
    dosage_label: 'Recommended Dosage:',
    safety_window: 'Recommended Action Window:',
    optimal_temp: '🌡️ Optimal Temperature: 20°C - 28°C',
    rain_likelihood: '🌧️ Rain Likelihood: Low (<20%)',
    native_treatment_voice: 'Native Treatment Voice Advisory',
    treatment_voice_sub: 'Spoken treatment plan & fungicide dosage guide in your native language.',

    // Dashboard
    dash_title: 'Crop Health Dashboard',
    dash_sub: 'Monitor seasonal crop performance, review historical AI diagnosis logs, and manage field health records.',
    kharif_season: 'KHARIF SEASON 2026',
    dash_status_title: 'Crop Health Monitoring & Field Status',
    overall_field_risk: 'Overall Field Risk',
    search_diagnoses_ph: 'Search diagnoses by crop or disease...',
    new_diagnosis: 'New Diagnosis',
    clear_logs: 'Clear Logs',
    no_diagnoses_title: 'No Diagnosis Logs Yet',
    no_diagnoses_sub: 'Scan your first crop leaf using the live camera or upload an image to start monitoring your field.',
    scan_first_leaf: 'Scan Your First Leaf',

    // Recommendations
    rec_banner: 'AI Agro-Climatic Recommendation Engine Live',
    rec_banner_sub: 'Dynamically Calibrated to Real-Time Weather & Leaf Diagnoses',
    rec_title: 'Smart Agricultural Recommendations',
    rec_sub: 'Categorized actionable guidance prioritized by live micro-climate risk, active leaf diagnostics, and field conditions.',
    filter_all: 'All Advisories',
    filter_immediate: 'Immediate Actions',
    filter_treatment: 'Treatment',
    filter_prevention: 'Prevention',
    filter_weather: 'Weather Advice',
    action_sequence: 'Recommended Action Sequence:',
    take_action: 'Take Action',

    // Helplines
    helpline_banner: 'National Kisan Call Center & Disease Hotline Telephony Mesh Online',
    helpline_banner_sub: 'Line Status: 100% Operational (Average Wait: < 1 min)',
    helpline_title: 'Emergency Farmer Helplines',
    helpline_sub: 'Instant 24/7 telephonic and messaging support from certified agricultural scientists and government departments across India.',
    kisan_call_center: 'Kisan Call Center (National)',
    toll_free_247: '24/7 TOLL FREE',
    state_agri_dept: 'State Agriculture Department',
    whatsapp_help: 'WhatsApp Agricultural Helpdesk',
    kisan_suvidha: 'Kisan Suvidha Portal Helpdesk',
    call_toll_free: 'Call Toll-Free',
    open_whatsapp: 'Open WhatsApp Chat',
    operating_hours: 'Operating Hours:',
    all_days: '24 Hours, 7 Days a Week (All Indian Languages)',
    verify_lines_now: 'Verify Lines Now',
    toll_free_verified: 'Toll-Free Verified Hotline',

    // Insurance
    insurance_banner: 'Official Ministry of Agriculture & Farmers Welfare (MoA&FW) Sync Live',
    insurance_banner_sub: 'Active Policy Cycle: Kharif / Rabi 2026',
    insurance_title: 'Government Crop Insurance Schemes',
    insurance_sub: 'Official Pradhan Mantri Fasal Bima Yojana (PMFBY) and Weather-Based Insurance protection for all Indian farmers.',
    pmfby_name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    wbci_name: 'Restructured Weather-Based Crop Insurance Scheme (RWBCIS)',
    up_relief_name: 'State Agricultural Relief & Disaster Fund',
    apply_claim_online: 'Apply / Claim Online',
    eligible_crops: 'Eligible Crops:',
    coverage_type: 'Coverage Type:',
    premium_farmer: 'Farmer Premium Share:',
    claim_steps: 'How to File a Loss Claim:',
    key_policy_benefits: 'Key Policy Benefits:',
    eligibility_enrollment: 'Eligibility & Enrollment:',
    sync_scheme_updates: 'Sync Scheme Updates',

    // Awareness
    awareness_banner: 'ICAR & Krishi Vigyan Kendra (KVK) Workshop Feed Live',
    awareness_banner_sub: 'Real-Time Training Schedule Synchronized',
    awareness_title: 'Farmer Awareness & Training Workshops',
    awareness_sub: 'Free agricultural workshops, biological pest control webinars, and seasonal field demonstrations across India.',
    free_entry: 'FREE ENTRY',
    register_workshop: 'Register / Join Online',
    register_online_free: 'Register Online Free',
    join_live_webinar: 'Join Live Webinar',
    organizer: 'Organizer:',
    topics_covered: 'Topics Covered:',
    upcoming_schedule: 'Upcoming Field Demonstrations & Online Webinars',
    sync_event_calendar: 'Sync Event Calendar',

    // Privacy
    privacy_title: 'Data Privacy & Farmer Rights Guarantee',
    privacy_sub: 'KrishiSahay is committed to safeguarding farmer data sovereignty, field GPS security, and image privacy.',
    privacy_badge: '100% On-Device & Zero Leakage Guarantee',
    take_control_data: 'Take Control of Your Farm Data',
    take_control_desc: 'Download a copy of your diagnostic history or wipe all data permanently.',
    export_json: 'Export My Data (JSON)',
    delete_records: 'Delete All My Records',
    verified_policy: 'Verified Policy',

    // Footer
    footer_desc: 'Empowering smallholder farmers across India with AI-driven crop disease diagnostics, real-time weather risk advisories, emergency helplines, and crop insurance guidance.',
    quick_links: 'Quick Links',
    support_govt: 'Support & Government',
    all_rights: '© 2026 KrishiSahay AgriTech Platform. All Rights Reserved. Built for Indian Farmers.',
    privacy_policy: 'Privacy Policy',
    helpline_247: '24/7 Helpline'
  },

  te: {
    // Nav
    nav_home: 'హోమ్',
    nav_upload: 'పంట ఆరోగ్యం',
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_weather: 'వాతావరణం & రిస్క్',
    nav_recommendations: 'వ్యవసాయ సలహాలు',
    nav_helplines: 'హెల్ప్‌లైన్లు',
    nav_insurance: 'పంట బీమా',
    nav_awareness: 'అవగాహన సదస్సులు',
    nav_privacy: 'గోప్యత',

    // Global Banners & Buttons
    live_synced: 'లైవ్ సింక్ చేయబడింది',
    sync_now: 'ఇప్పుడే సింక్ చేయండి',
    detect_gps: '📍 నా పొలం గుర్తించండి (GPS)',
    select_state: 'రాష్ట్రం వారీగా ఎంచుకోండి:',
    listen_voice: 'వాయిస్ సలహా వినండి',
    stop_voice: 'వాయిస్ ఆపు',
    voice_playing: 'వాయిస్ సలహా వినిపిస్తోంది...',
    voice_subtitle: 'మీ ప్రాంతీయ భాషలో AI ఆడియో సలహాలు.',
    active_zone: 'ప్రస్తుత జోన్:',
    major_crops: 'ప్రధాన పంటలు:',
    refresh_live: 'లైవ్ డేటా రీఫ్రెష్',
    recalibrate: 'సలహాలను రీకాలిబ్రేట్ చేయండి',

    // Hero
    hero_badge: 'AI-ఆధారిత వ్యవసాయ వేదిక',
    hero_title: 'స్మార్ట్ వ్యవసాయం ఇక్కడే ప్రారంభం.',
    hero_desc: 'మీ పంటలను వ్యాధుల నుండి రక్షించండి, నిజ సమయ వాతావరణ హెచ్చరికలు పొందండి, లక్ష్య చికిత్సలను పాటించండి మరియు భారతదేశంలోని అన్ని ప్రభుత్వ వ్యవసాయ సేవలను సులభంగా పొందండి.',
    hero_btn_check: 'పంట ఆరోగ్యం తనిఖీ చేయండి',
    hero_btn_weather: 'వాతావరణ రిస్క్ చూడండి',
    stat_farmers: '10,000+ రైతులకు సహాయం',
    stat_accuracy: '98.4% AI ఖచ్చితత్వం',
    stat_helpline: '24/7 హెల్ప్‌లైన్ మద్దతు',
    farmers_assisted: 'రైతులకు సహాయం అందించబడింది',
    ai_diagnosis_accuracy: 'AI నిర్ధారణ ఖచ్చితత్వం',
    helpline_support: '24/7 హెల్ప్‌లైన్ మద్దతు',
    live_field_safe: 'పొలం ప్రస్తుత స్థితి: సురక్షితం',
    humidity_low_risk: 'తేమ 82% | నేడు తక్కువ వర్ష సూచన',

    // Core Features
    core_services_title: 'సమగ్ర రైతు సహాయక సేవలు',
    core_services_sub: 'తక్షణ AI మార్గదర్శకత్వంతో రోజువారీ వ్యవసాయ నిర్ణయాల కోసం రూపొందించబడింది.',
    card_health_title: 'పంట ఆరోగ్య AI',
    card_health_desc: 'తెగుళ్లను తక్షణమే గుర్తించడానికి ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
    card_health_btn: 'ఆకును స్కాన్ చేయండి',
    card_weather_title: 'వాతావరణం & క్లైమేట్ రిస్క్',
    card_weather_desc: 'వాతావరణ సూచన మరియు శిలీంధ్రాల వ్యాప్తిని అంచనా వేసే క్లైమేట్ స్కోర్.',
    card_weather_btn: 'వాతావరణం చూడండి',
    card_rec_title: 'AI సిఫార్సులు',
    card_rec_desc: 'తక్షణ చర్యలు, చికిత్స మరియు పిచికారీ సమయాల వారీగా వర్గీకరించబడిన సలహాలు.',
    card_rec_btn: 'చర్యల ప్రణాళిక చూడండి',
    card_help_title: 'రైతు హెల్ప్‌లైన్లు',
    card_help_desc: 'కిసాన్ కాల్ సెంటర్ మరియు శాస్త్రవేత్తలతో 24/7 ప్రత్యక్ష టెలిఫోన్ సంభాషణ.',
    card_help_btn: 'హెల్ప్‌లైన్లు చూడండి',
    card_ins_title: 'పంట బీమా పథకాలు',
    card_ins_desc: 'PMFBY మరియు వాతావరణ ఆధారిత పంట బీమా నిబంధనలు మరియు దరఖాస్తు విధానం.',
    card_ins_btn: 'పథకాలను చూడండి',
    card_aware_title: 'రైతు అవగాహన సదస్సులు',
    card_aware_desc: 'ICAR మరియు కృషి విజ్ఞాన కేంద్రాల ప్రత్యక్ష వర్క్‌షాప్‌లు మరియు వెబినార్లు.',
    card_aware_btn: 'సదస్సుల్లో పాల్గొనండి',

    // How it works
    how_title: 'కృషి సహాయ్ 3 దశల్లో మీ పొలాన్ని ఎలా రక్షిస్తుంది',
    how_sub: 'భారతీయ వ్యవసాయ క్షేత్రాల్లో మొబైల్ ద్వారా సులభంగా ఉపయోగించడానికి రూపొందించబడింది.',
    step1_title: '1. ఆకు ఫోటో తీయండి',
    step1_desc: 'మీ ఫోన్ కెమెరా ద్వారా రోగగ్రస్తమైన పంట ఆకును లైవ్‌గా ఫోటో తీయండి లేదా గ్యాలరీ నుండి ఎంచుకోండి.',
    step2_title: '2. క్షణాల్లో AI నిర్ధారణ',
    step2_desc: 'డీప్ లెర్నింగ్ నెట్‌వర్క్ రోగకారక తెగులు, దాని తీవ్రత మరియు ఖచ్చితత్వాన్ని కొన్ని సెకన్లలో గుర్తిస్తుంది.',
    step3_title: '3. వాయిస్ సలహాతో చికిత్స చేయండి',
    step3_desc: 'వాతావరణానికి తగిన మందుల మోతాదు, పిచికారీ సమయాలు మరియు ఆడియో సూచనలను తెలుగులో వినండి.',

    // Scanner / Upload
    scanner_main_title: 'AI పంట ఆకు వ్యాధి నిర్ధారణ',
    scanner_main_sub: 'తెగుళ్ళను గుర్తించడానికి మరియు తక్షణ చికిత్స సలహాలు పొందడానికి పంట ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
    scanner_title: 'పంట ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి',
    scanner_sub: 'మీ కెమెరా ద్వారా లైవ్ ఫోటో తీయండి లేదా ఫోన్ గ్యాలరీ నుండి ఎంచుకోండి.',
    btn_take_photo: 'ఫోటో తీయండి (లైవ్ కెమెరా)',
    btn_gallery: 'గ్యాలరీ నుండి ఎంచుకోండి',
    btn_run_diagnosis: 'AI వ్యాధి నిర్ధారణ ప్రారంభించండి',
    btn_retake: 'మళ్ళీ తీయండి / మార్చండి',
    btn_view_report: 'పూర్తి చికిత్స నివేదిక చూడండి',
    btn_check_another: 'మరొక ఆకు తనిఖీ చేయండి',
    sample_title: 'లేదా ఇక్కడ నమూనా ఆకులతో పరీక్షించండి:',
    photo_ready: 'ఫోటో సిద్ధంగా ఉంది',
    leaf_ready_title: 'వ్యాధి నిర్ధారణకు ఆకు ఫోటో సిద్ధంగా ఉంది',
    analyzing_foliage: 'పంట ఆకును విశ్లేషిస్తోంది...',
    extracting_features: 'ఆకు ఈనెలు మరియు రంగు లక్షణాలను పరిశీలిస్తోంది...',
    evaluating_severity: 'తెగులు తీవ్రత సూచికను లెక్కిస్తోంది...',
    camera_modal_title: 'లైవ్ పంట ఆకు కెమెరా',
    camera_switch: 'కెమెరా మార్చండి',
    camera_close: 'కెమెరా మూసివేయండి',
    camera_capture: 'ఆకు ఫోటో తీయండి',
    camera_tip: 'ఆకును ఫ్రేమ్‌లో అమర్చి ఆకుపచ్చ బటన్‌ను నొక్కండి.',
    model_active: 'న్యూరల్ విజన్ మోడల్ క్రియాశీలంగా ఉంది',

    // Diagnosis Result
    ai_confidence: 'AI ఖచ్చితత్వం',
    target_crop: 'ఎంచుకున్న పంట:',
    field_symptoms: 'క్షేత్ర లక్షణాలు & తెగులు వివరణ',
    diagnosis_log_id: 'నిర్ధారణ లాగ్ ఐడీ:',
    recorded: 'నమోదైన సమయం:',

    // Weather
    weather_banner: 'అఖిల భారత వ్యవసాయ వాతావరణ మెష్ ఆన్‌లైన్',
    weather_banner_sub: 'అన్ని 28 రాష్ట్రాలు & 8 కేంద్రపాలిత ప్రాంతాలు అందుబాటులో ఉన్నాయి',
    weather_title: 'వ్యవసాయ వాతావరణం & క్లైమేట్ రిస్క్',
    weather_sub: 'భారతదేశంలోని ప్రతి క్షేత్రం కోసం నిజ-సమయ సూక్ష్మ వాతావరణ పర్యవేక్షణ మరియు తెగుళ్ల రిస్క్ సూచనలు.',
    weather_risk_assessment: 'AI క్లైమేట్ రిస్క్ అంచనా',
    weather_action: 'సిఫార్సు చేయబడిన వ్యవసాయ చర్య:',
    weather_temp: 'ప్రస్తుత ఉష్ణోగ్రత',
    weather_humidity: 'గాలిలో తేమ',
    weather_wind: 'గాలి వేగం & UV ఇండెక్స్',
    weather_forecast: '7 రోజుల వ్యవసాయ వాతావరణ సూచన',
    weather_search_ph: 'భారతదేశంలోని ఏదైనా జిల్లా, నగరం లేదా గ్రామాన్ని శోధించండి (ఉదా: గుంటూరు, వరంగల్, కర్నూలు...)',
    rain_probability: 'వర్ష సంభావ్యత:',
    risk_level: 'ప్రమాద తీవ్రత',
    biological_rationale: 'జీవసంబంధ కారణం:',
    outbreak_risk_in: 'శిలీంధ్రాల వ్యాప్తి రిస్క్:',
    weather_voice_subtitle: 'వాతావరణ వివరాలు మరియు రిస్క్ ఆడియో మీ ప్రాంతీయ భాషలో వినండి.',

    // Problem Detail
    sec1_title: "1. తెగులు లక్షణాలు & వివరణ",
    sec2_title: '2. ఎలా చికిత్స చేయాలి (దశలవారీ చర్యలు)',
    sec3_title: '3. రసాయన & సేంద్రీయ మందుల పిచికారీ ప్రిస్క్రిప్షన్',
    sec4_title: '4. పిచికారీ చేయడానికి సరైన సమయం (వాతావరణ సలహా)',
    symptoms_title: 'గుర్తించబడిన క్షేత్ర లక్షణాలు:',
    step_label: 'దశ',
    recommended_spray: 'సిఫార్సు చేయబడిన మందుల వివరాలు:',
    dosage_label: 'సిఫార్సు చేయబడిన మోతాదు:',
    safety_window: 'పిచికారీ చేయడానికి అనువైన సమయం:',
    optimal_temp: '🌡️ సరైన ఉష్ణోగ్రత: 20°C - 28°C',
    rain_likelihood: '🌧️ వర్ష సూచన: తక్కువ (<20%)',
    native_treatment_voice: 'తెలుగులో చికిత్స వాయిస్ సలహా',
    treatment_voice_sub: 'తెలుగులో మందుల మోతాదు మరియు పిచికారీ సూచనలను వినండి.',

    // Dashboard
    dash_title: 'పంట ఆరోగ్య డాష్‌బోర్డ్',
    dash_sub: 'సీజనల్ పంట పురోగతి, మునుపటి AI వ్యాధి లాగ్‌లను సమీక్షించండి మరియు రికార్డులను నిర్వహించండి.',
    kharif_season: 'ఖరీఫ్ సీజన్ 2026',
    dash_status_title: 'పంట ఆరోగ్య పర్యవేక్షణ & క్షేత్ర స్థితి',
    overall_field_risk: 'మొత్తం క్షేత్ర రిస్క్',
    search_diagnoses_ph: 'పంట లేదా వ్యాధి పేరుతో శోధించండి...',
    new_diagnosis: 'కొత్త నిర్ధారణ',
    clear_logs: 'లాగ్‌లను తొలగించు',
    no_diagnoses_title: 'ఇంకా ఎటువంటి నిర్ధారణలు నమోదు కాలేదు',
    no_diagnoses_sub: 'మీ పొలాన్ని పర్యవేక్షించడం ప్రారంభించడానికి మొదటి ఆకును స్కాన్ చేయండి.',
    scan_first_leaf: 'మీ మొదటి ఆకును స్కాన్ చేయండి',

    // Recommendations
    rec_banner: 'AI వ్యవసాయ వాతావరణ సిఫార్సు ఇంజిన్ లైవ్',
    rec_banner_sub: 'రియల్-టైమ్ వాతావరణం మరియు ఆకు నిర్ధారణలకు అనుగుణంగా సర్దుబాటు చేయబడింది',
    rec_title: 'స్మార్ట్ వ్యవసాయ సలహాలు',
    rec_sub: 'వాతావరణ రిస్క్ మరియు పంట పరిస్థితి ఆధారంగా ప్రాధాన్యతా క్రమంలో అందించిన సలహాలు.',
    filter_all: 'అన్ని సలహాలు',
    filter_immediate: 'తక్షణ చర్యలు',
    filter_treatment: 'చికిత్స విధానం',
    filter_prevention: 'నివారణ చర్యలు',
    filter_weather: 'వాతావరణ సలహాలు',
    action_sequence: 'సిఫార్సు చేయబడిన చర్యల క్రమం:',
    take_action: 'చర్య తీసుకోండి',

    // Helplines
    helpline_banner: 'జాతీయ కిసాన్ కాల్ సెంటర్ & వ్యాధి హెల్ప్‌లైన్ ఆన్‌లైన్',
    helpline_banner_sub: 'లైన్ స్థితి: 100% పనిచేస్తోంది (సగటు నిరీక్షణ: < 1 నిమిషం)',
    helpline_title: 'రైతు అత్యవసర హెల్ప్‌లైన్లు',
    helpline_sub: 'భారతదేశ వ్యాప్తంగా వ్యవసాయ శాస్త్రవేత్తలు మరియు ప్రభుత్వ విభాగాల నుండి 24/7 తక్షణ సహాయం.',
    kisan_call_center: 'కిసాన్ కాల్ సెంటర్ (జాతీయం)',
    toll_free_247: '24/7 టోల్ ఫ్రీ',
    state_agri_dept: 'రాష్ట్ర వ్యవసాయ శాఖ',
    whatsapp_help: 'వాట్సాప్ వ్యవసాయ హెల్ప్‌డెస్క్',
    kisan_suvidha: 'కిసాన్ సువిధ పోర్టల్ హెల్ప్‌డెస్క్',
    call_toll_free: 'ఉచిత కాల్ చేయండి',
    open_whatsapp: 'వాట్సాప్ చాట్ తెరవండి',
    operating_hours: 'పనివేళలు:',
    all_days: '24 గంటలు, వారంలో 7 రోజులు (అన్ని భారతీయ భాషలు)',
    verify_lines_now: 'లైన్లను తనిఖీ చేయండి',
    toll_free_verified: 'ధృవీకరించబడిన టోల్-ఫ్రీ హెల్ప్‌లైన్',

    // Insurance
    insurance_banner: 'వ్యవసాయ మంత్రిత్వ శాఖ అధికారిక పాలసీ లైవ్ సింక్',
    insurance_banner_sub: 'ప్రస్తుత పాలసీ సైకిల్: ఖరీఫ్ / రబీ 2026',
    insurance_title: 'ప్రభుత్వ పంట బీమా పథకాలు',
    insurance_sub: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY) మరియు వాతావరణ ఆధారిత బీమా రక్షణ.',
    pmfby_name: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)',
    wbci_name: 'పునర్నిర్మిత వాతావరణ ఆధారిత పంట బీమా పథకం (RWBCIS)',
    up_relief_name: 'రాష్ట్ర వ్యవసాయ విపత్తు సహాయ నిధి',
    apply_claim_online: 'ఆన్‌లైన్‌లో దరఖాస్తు / క్లెయిమ్ చేయండి',
    eligible_crops: 'అర్హతగల పంటలు:',
    coverage_type: 'కవరేజ్ రకం:',
    premium_farmer: 'రైతు చెల్లించాల్సిన ప్రీమియం:',
    claim_steps: 'నష్టపరిహారం క్లెయిమ్ చేసే విధానం:',
    key_policy_benefits: 'ప్రధాన పాలసీ ప్రయోజనాలు:',
    eligibility_enrollment: 'అర్హత మరియు నమోదు:',
    sync_scheme_updates: 'పథకాలను సింక్ చేయండి',

    // Awareness
    awareness_banner: 'ICAR & కృషి విజ్ఞాన కేంద్ర వర్క్‌షాప్ ఫీడ్ లైవ్',
    awareness_banner_sub: 'నిజ-సమయ శిక్షణ ప్రణాళిక నవీకరించబడింది',
    awareness_title: 'రైతు అవగాహన & శిక్షణ సదస్సులు',
    awareness_sub: 'సేంద్రీయ వ్యవసాయం, తెగుళ్ల నివారణ మరియు ఆధునిక సాంకేతికతలపై ఉచిత వర్క్‌షాప్‌లు.',
    free_entry: 'ఉచిత ప్రవేశం',
    register_workshop: 'నమోదు చేసుకోండి / ఆన్‌లైన్‌లో చేరండి',
    register_online_free: 'ఉచితంగా నమోదు చేయండి',
    join_live_webinar: 'లైవ్ వెబినార్‌లో చేరండి',
    organizer: 'నిర్వాహకులు:',
    topics_covered: 'కవర్ చేయబడే అంశాలు:',
    upcoming_schedule: 'రాబోయే వ్యవసాయ ప్రదర్శనలు మరియు వెబినార్లు',
    sync_event_calendar: 'క్యాలెండర్ సింక్ చేయండి',

    // Privacy
    privacy_title: 'రైతు డేటా గోప్యత & హక్కుల హామీ',
    privacy_sub: 'రైతుల పొలం జీపీఎస్ మరియు పంట చిత్రాల భద్రతకు కృషి సహాయ్ కట్టుబడి ఉంది.',
    privacy_badge: '100% ఆన్-డివైస్ & లీకేజ్-ఫ్రీ హామీ',
    take_control_data: 'మీ పొలం డేటాపై పూర్తి నియంత్రణ',
    take_control_desc: 'మీ వ్యాధి నిర్ధారణ లాగ్‌ల కాపీని డౌన్‌లోడ్ చేయండి లేదా శాశ్వతంగా తొలగించండి.',
    export_json: 'డేటాను డౌన్‌లోడ్ చేయండి (JSON)',
    delete_records: 'నా రికార్డులన్నీ తొలగించండి',
    verified_policy: 'ధృవీకరించబడిన విధానం',

    // Footer
    footer_desc: 'భారతీయ రైతులకు AI పంట తెగులు నిర్ధారణ, వాతావరణ హెచ్చరికలు మరియు ప్రభుత్వ పథకాల సేవలు అందించే వేదిక.',
    quick_links: 'త్వరిత లింకులు',
    support_govt: 'మద్దతు & ప్రభుత్వ సేవలు',
    all_rights: '© 2026 కృషి సహాయ్ అగ్రిటెక్ ప్లాట్‌ఫారమ్. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
    privacy_policy: 'గోప్యతా విధానం',
    helpline_247: '24/7 హెల్ప్‌లైన్'
  },

  hi: {
    // Nav
    nav_home: 'होम',
    nav_upload: 'फसल स्वास्थ्य',
    nav_dashboard: 'डैशबोर्ड',
    nav_weather: 'मौसम व जोखिम',
    nav_recommendations: 'कृषि सलाह',
    nav_helplines: 'हेल्पलाइन',
    nav_insurance: 'फसल बीमा',
    nav_awareness: 'जागरूकता शिविर',
    nav_privacy: 'गोपनीयता',

    // Global Banners & Buttons
    live_synced: 'लाइव सिंक हो गया',
    sync_now: 'अभी सिंक करें',
    detect_gps: '📍 मेरा खेत खोजें (GPS)',
    select_state: 'राज्य अनुसार चुनें:',
    listen_voice: 'वॉयस सलाह सुनें',
    stop_voice: 'आवाज रोकें',
    voice_playing: 'वॉयस सलाह चल रही है...',
    voice_subtitle: 'आपकी चुनी हुई भाषा में एआई ऑडियो सलाह।',
    active_zone: 'सक्रिय क्षेत्र:',
    major_crops: 'प्रमुख फसलें:',
    refresh_live: 'लाइव डेटा रीफ्रेश',
    recalibrate: 'सलाह को रीकैलिब्रेट करें',

    // Hero
    hero_badge: 'एआई-संचालित कृषि मंच',
    hero_title: 'स्मार्ट खेती की शुरुआत यहीं से।',
    hero_desc: 'अपनी फसलों को रोगों से बचाएं, रीयल-टाइम मौसम चेतावनी पाएं, वैज्ञानिक उपचार अपनाएं और भारत भर की सरकारी सेवाओं से जुड़ें।',
    hero_btn_check: 'फसल स्वास्थ्य जांचें',
    hero_btn_weather: 'मौसम जोखिम देखें',
    stat_farmers: '10,000+ किसानों की मदद',
    stat_accuracy: '98.4% एआई सटीकता',
    stat_helpline: '24/7 हेल्पलाइन सहायता',
    farmers_assisted: 'किसानों की मदद की गई',
    ai_diagnosis_accuracy: 'एआई निदान सटीकता',
    helpline_support: '24/7 हेल्पलाइन सहायता',
    live_field_safe: 'खेत की स्थिति: सुरक्षित',
    humidity_low_risk: 'नमी 82% | आज बारिश की संभावना कम',

    // Core Features
    core_services_title: 'व्यापक किसान सहायता सेवाएं',
    core_services_sub: 'दैनिक कृषि निर्णयों के लिए त्वरित एआई मार्गदर्शन के साथ विशेष रूप से तैयार।',
    card_health_title: 'फसल स्वास्थ्य एआई',
    card_health_desc: 'रोगों का तुरंत पता लगाने के लिए पत्ती की फोटो लें या अपलोड करें।',
    card_health_btn: 'पत्ती स्कैन करें',
    card_weather_title: 'मौसम व जलवायु जोखिम',
    card_weather_desc: 'कृषि मौसम पूर्वानुमान और फंगल बीजाणु प्रकोप का सटीक जोखिम स्कोर।',
    card_weather_btn: 'पूर्वानुमान देखें',
    card_rec_title: 'एआई कृषि सलाह',
    card_rec_desc: 'प्राथमिकता के आधार पर वर्गीकृत तत्काल कार्रवाई, उपचार और छिड़काव समय।',
    card_rec_btn: 'कार्य योजना देखें',
    card_help_title: 'किसान हेल्पलाइन',
    card_help_desc: 'किसान कॉल सेंटर और कृषि वैज्ञानिकों से 24/7 सीधा संपर्क।',
    card_help_btn: 'हेल्पलाइन देखें',
    card_ins_title: 'फसल बीमा योजनाएं',
    card_ins_desc: 'PMFBY और मौसम आधारित फसल बीमा की पात्रता और 72 घंटे में क्लेम की गाइडलाइन।',
    card_ins_btn: 'योजनाएं देखें',
    card_aware_title: 'किसान जागरूकता शिविर',
    card_aware_desc: 'ICAR और कृषि विज्ञान केंद्रों के आगामी प्रशिक्षण शिविर और वेबिनार।',
    card_aware_btn: 'शिविरों में भाग लें',

    // How it works
    how_title: 'कृषि सहाय 3 चरणों में आपके खेत की सुरक्षा कैसे करता है',
    how_sub: 'भारतीय खेतों में मोबाइल द्वारा अत्यंत सरलता से उपयोग हेतु डिज़ाइन किया गया।',
    step1_title: '1. पत्ती की फोटो लें',
    step1_desc: 'रोगग्रस्त फसल की पत्ती की लाइव फोटो खींचें या गैलरी से चुनें।',
    step2_title: '2. तुरंत एआई निदान',
    step2_desc: 'डीप लर्निंग मॉडल कुछ ही सेकंड में रोग का प्रकार और गंभीरता बताता है।',
    step3_title: '3. वॉयस सलाह से उपचार करें',
    step3_desc: 'मौसम के अनुसार दवा की मात्रा, छिड़काव का समय और ऑडियो निर्देश हिंदी में सुनें।',

    // Scanner / Upload
    scanner_main_title: 'एआई पत्ती रोग निदान',
    scanner_main_sub: 'फसल के रोग का तुरंत पता लगाने और उपचार प्राप्त करने हेतु पत्ती की फोटो लें या अपलोड करें।',
    scanner_title: 'पत्ती की फोटो लें या अपलोड करें',
    scanner_sub: 'कैमरे से लाइव फोटो खींचें या फोन गैलरी से छवि चुनें।',
    btn_take_photo: 'फोटो खींचें (लाइव कैमरा)',
    btn_gallery: 'गैलरी से चुनें',
    btn_run_diagnosis: 'एआई रोग निदान शुरू करें',
    btn_retake: 'दोबारा लें / बदलें',
    btn_view_report: 'पूरी उपचार रिपोर्ट देखें',
    btn_check_another: 'दूसरी पत्ती जांचें',
    sample_title: 'या पहले से मौजूद पत्तियों से परीक्षण करें:',
    photo_ready: 'फोटो तैयार है',
    leaf_ready_title: 'निदान के लिए पत्ती की फोटो तैयार है',
    analyzing_foliage: 'पत्ती का विश्लेषण जारी है...',
    extracting_features: 'पत्ती की नसों और रंग का अध्ययन हो रहा है...',
    evaluating_severity: 'रोग गंभीरता सूचकांक का मूल्यांकन...',
    camera_modal_title: 'लाइव पत्ती कैमरा',
    camera_switch: 'कैमरा बदलें',
    camera_close: 'कैमरा बंद करें',
    camera_capture: 'पत्ती की फोटो खींचें',
    camera_tip: 'पत्ती को फ्रेम में रखें और हरा बटन दबाएं।',
    model_active: 'न्यूरल विज़न मॉडल सक्रिय है',

    // Diagnosis Result
    ai_confidence: 'एआई सटीकता',
    target_crop: 'लक्षित फसल:',
    field_symptoms: 'खेत के लक्षण और रोग विवरण',
    diagnosis_log_id: 'निदान लॉग आईडी:',
    recorded: 'दर्ज समय:',

    // Weather
    weather_banner: 'अखिल भारतीय कृषि सूक्ष्म-जलवायु तंत्र ऑनलाइन',
    weather_banner_sub: 'सभी 28 राज्य और 8 केंद्र शासित प्रदेश शामिल',
    weather_title: 'कृषि मौसम एवं जलवायु जोखिम',
    weather_sub: 'भारत के किसी भी खेत के लिए रीयल-टाइम मौसम और फंगल बीजाणु प्रकोप का सटीक पूर्वानुमान।',
    weather_risk_assessment: 'एआई जलवायु जोखिम मूल्यांकन',
    weather_action: 'अनुशंसित कृषि कार्रवाई:',
    weather_temp: 'वर्तमान तापमान',
    weather_humidity: 'सापेक्ष आर्द्रता',
    weather_wind: 'हवा की गति व यूवी इंडेक्स',
    weather_forecast: '7-दिवसीय कृषि मौसम पूर्वानुमान',
    weather_search_ph: 'भारत का कोई भी जिला, शहर या गांव खोजें (उदा. करनाल, नागपुर, इंदौर, नासिक...)',
    rain_probability: 'बारिश की संभावना:',
    risk_level: 'जोखिम का स्तर',
    biological_rationale: 'जैविक कारण:',
    outbreak_risk_in: 'फंगल बीजाणु प्रकोप का जोखिम:',
    weather_voice_subtitle: 'मौसम सारांश और जोखिम ऑडियो अपनी क्षेत्रीय भाषा में सुनें।',

    // Problem Detail
    sec1_title: "1. क्या खराबी है (लक्षण व रोग विवरण)",
    sec2_title: '2. उपचार कैसे करें (चरणबद्ध कार्रवाई)',
    sec3_title: '3. रासायनिक व जैविक छिड़काव निर्देश',
    sec4_title: '4. छिड़काव का सही समय (मौसम आधारित सलाह)',
    symptoms_title: 'पहचाने गए खेत के लक्षण:',
    step_label: 'चरण',
    recommended_spray: 'अनुशंसित दवा छिड़काव सूत्र:',
    dosage_label: 'अनुशंसित खुराक:',
    safety_window: 'छिड़काव के लिए सुरक्षित समय:',
    optimal_temp: '🌡️ अनुकूल तापमान: 20°C - 28°C',
    rain_likelihood: '🌧️ बारिश की संभावना: कम (<20%)',
    native_treatment_voice: 'हिंदी में उपचार वॉयस सलाह',
    treatment_voice_sub: 'हिंदी में दवा की मात्रा और छिड़काव के नियमों की आवाज सुनें।',

    // Dashboard
    dash_title: 'फसल स्वास्थ्य डैशबोर्ड',
    dash_sub: 'मौसमी फसल प्रदर्शन, पुराने एआई निदान रिकॉर्ड की समीक्षा करें और खेत का स्वास्थ्य संभालें।',
    kharif_season: 'खरीफ मौसम 2026',
    dash_status_title: 'फसल स्वास्थ्य निगरानी एवं खेत की स्थिति',
    overall_field_risk: 'खेत का कुल जोखिम',
    search_diagnoses_ph: 'फसल या बीमारी के नाम से खोजें...',
    new_diagnosis: 'नया निदान',
    clear_logs: 'लॉग हटाएं',
    no_diagnoses_title: 'अभी तक कोई निदान दर्ज नहीं है',
    no_diagnoses_sub: 'अपने खेत की निगरानी शुरू करने के लिए पहली पत्ती स्कैन करें।',
    scan_first_leaf: 'अपनी पहली पत्ती स्कैन करें',

    // Recommendations
    rec_banner: 'एआई कृषि-मौसम अनुशंसा इंजन लाइव',
    rec_banner_sub: 'रीयल-टाइम मौसम और पत्तियों के निदान के अनुसार स्वतः कैलिब्रेट किया गया',
    rec_title: 'स्मार्ट कृषि सलाह व अनुशंसाएं',
    rec_sub: 'मौसम के जोखिम और खेत की स्थिति के अनुसार प्राथमिकता से तैयार की गई कार्रवाई।',
    filter_all: 'सभी सलाह',
    filter_immediate: 'तत्काल कार्रवाई',
    filter_treatment: 'उपचार',
    filter_prevention: 'रोकथाम',
    filter_weather: 'मौसम आधारित सलाह',
    action_sequence: 'अनुशंसित कार्रवाई क्रम:',
    take_action: 'कार्रवाई करें',

    // Helplines
    helpline_banner: 'राष्ट्रीय किसान कॉल सेंटर एवं रोग हेल्पलाइन नेटवर्क ऑनलाइन',
    helpline_banner_sub: 'लाइन स्थिति: 100% चालू (औसत प्रतीक्षा: < 1 मिनट)',
    helpline_title: 'आपातकालीन किसान हेल्पलाइन',
    helpline_sub: 'पूरे भारत में प्रमाणित कृषि वैज्ञानिकों और सरकारी विभागों से 24/7 सीधी सहायता।',
    kisan_call_center: 'किसान कॉल सेंटर (राष्ट्रीय)',
    toll_free_247: '24/7 टोल-फ्री',
    state_agri_dept: 'राज्य कृषि विभाग',
    whatsapp_help: 'व्हाट्सएप कृषि हेल्पडेस्क',
    kisan_suvidha: 'किसान सुविधा पोर्टल हेल्पडेस्क',
    call_toll_free: 'टोल-फ्री कॉल करें',
    open_whatsapp: 'व्हाट्सएप चैट खोलें',
    operating_hours: 'कार्य समय:',
    all_days: '24 घंटे, सातों दिन (सभी भारतीय भाषाएं)',
    verify_lines_now: 'लाइनों की जांच करें',
    toll_free_verified: 'सत्यापित टोल-फ्री हेल्पलाइन',

    // Insurance
    insurance_banner: 'कृषि एवं किसान कल्याण मंत्रालय आधिकारिक लाइव सिंक',
    insurance_banner_sub: 'सक्रिय पॉलिसी चक्र: खरीफ / रबी 2026',
    insurance_title: 'सरकारी फसल बीमा योजनाएं',
    insurance_sub: 'प्रधानमंत्री फसल बीमा योजना (PMFBY) और मौसम आधारित सुरक्षा का पूरा विवरण।',
    pmfby_name: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    wbci_name: 'पुनर्गठित मौसम आधारित फसल बीमा योजना (RWBCIS)',
    up_relief_name: 'राज्य कृषि आपदा राहत कोष',
    apply_claim_online: 'ऑनलाइन आवेदन / क्लेम करें',
    eligible_crops: 'पात्र फसलें:',
    coverage_type: 'कवरेज का प्रकार:',
    premium_farmer: 'किसान प्रीमियम अंश:',
    claim_steps: 'नुकसान का दावा दर्ज करने की प्रक्रिया:',
    key_policy_benefits: 'प्रमुख पॉलिसी लाभ:',
    eligibility_enrollment: 'पात्रता एवं नामांकन:',
    sync_scheme_updates: 'योजनाएं अपडेट करें',

    // Awareness
    awareness_banner: 'ICAR एवं कृषि विज्ञान केंद्र कार्यशाला फीड लाइव',
    awareness_banner_sub: 'रीयल-टाइम प्रशिक्षण कार्यक्रम अपडेटेड',
    awareness_title: 'किसान जागरूकता व प्रशिक्षण शिविर',
    awareness_sub: 'जैविक खेती, कीट नियंत्रण और आधुनिक तकनीकों पर निःशुल्क कार्यशालाएं और वेबिनार।',
    free_entry: 'निःशुल्क प्रवेश',
    register_workshop: 'पंजीकरण करें / ऑनलाइन जुड़ें',
    register_online_free: 'मुफ्त ऑनलाइन पंजीकरण',
    join_live_webinar: 'लाइव वेबिनार में भाग लें',
    organizer: 'आयोजक:',
    topics_covered: 'शामिल विषय:',
    upcoming_schedule: 'आगामी कृषि कार्यशालाएं एवं वेबिनार',
    sync_event_calendar: 'कैलेंडर सिंक करें',

    // Privacy
    privacy_title: 'डेटा गोपनीयता एवं किसान अधिकार',
    privacy_sub: 'कृषि सहाय किसानों के डेटा, खेत के जीपीएस और तस्वीरों की पूर्ण सुरक्षा की गारंटी देता है।',
    privacy_badge: '100% डिवाइस पर सुरक्षित एवं डेटा लीक-फ्री',
    take_control_data: 'अपने कृषि डेटा पर पूरा नियंत्रण',
    take_control_desc: 'अपने निदान इतिहास की प्रति डाउनलोड करें या सारा डेटा हमेशा के लिए मिटाएं।',
    export_json: 'डेटा डाउनलोड करें (JSON)',
    delete_records: 'मेरे सारे रिकॉर्ड मिटाएं',
    verified_policy: 'सत्यापित नीति',

    // Footer
    footer_desc: 'भारतीय किसानों को एआई फसल रोग निदान, मौसम चेतावनी और सरकारी योजनाओं से सशक्त बनाने वाला मंच।',
    quick_links: 'त्वरित लिंक',
    support_govt: 'सहायता एवं सरकारी सेवाएं',
    all_rights: '© 2026 कृषि सहाय एग्रीटेक प्लेटफॉर्म। सर्वाधिकार सुरक्षित।',
    privacy_policy: 'गोपनीयता नीति',
    helpline_247: '24/7 हेल्पलाइन'
  },

  ta: {
    nav_home: 'முகப்பு',
    nav_upload: 'பயிர் ஆரோக்கியம்',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_weather: 'வானிலை & ஆபத்து',
    nav_recommendations: 'விவசாய ஆலோசனைகள்',
    nav_helplines: 'உதவி எண்கள்',
    nav_insurance: 'பயிர் காப்பீடு',
    nav_awareness: 'விழிப்புணர்வு முகாம்கள்',
    nav_privacy: 'தனியுரிமை',
    live_synced: 'நேரலை ஒத்திசைவு',
    sync_now: 'இப்போது புதுப்பி',
    detect_gps: '📍 எனது பண்ணையைக் கண்டறி (GPS)',
    select_state: 'மாநிலத்தை தேர்வுசெய்க:',
    listen_voice: 'குரல் ஆலோசனை கேளுங்கள்',
    stop_voice: 'குரலை நிறுத்து',
    voice_playing: 'குரல் ஆலோசனை ஒலிக்கிறது...',
    voice_subtitle: 'உங்கள் தாய்மொழியில் ஏஐ குரல் வழிகாட்டுதல்.',
    active_zone: 'செயலில் உள்ள பகுதி:',
    major_crops: 'முக்கிய பயிர்கள்:',
    refresh_live: 'நேரலை தரவை புதுப்பி',
    recalibrate: 'ஆலோசனைகளை மறுசீரமைக்கவும்',
    hero_badge: 'AI-இயங்கும் விவசாய தளம்',
    hero_title: 'ஸ்மார்ட் விவசாயம் இங்கே தொடங்குகிறது.',
    hero_desc: 'பயிர் நோய்களைக் கண்டறியுங்கள், நேரலை வானிலை ஆலோசனைகளைப் பெறுங்கள், தகுந்த சிகிச்சை வழிகாட்டுதல்களைப் பெறுங்கள்.',
    hero_btn_check: 'பயிரை பரிசோதிக்கவும்',
    hero_btn_weather: 'வானிலை நிலவரம் பார்க்க',
    stat_farmers: '10,000+ விவசாயிகள் பயன்',
    stat_accuracy: '98.4% துல்லியம்',
    stat_helpline: '24/7 உதவி எண்கள்',
    farmers_assisted: 'விவசாயிகள் பயன் பெற்றுள்ளனர்',
    ai_diagnosis_accuracy: 'AI நோய் கண்டறிதல் துல்லியம்',
    helpline_support: '24/7 உதவி எண்கள்',
    live_field_safe: 'பண்ணை நிலை: பாதுகாப்பானது',
    humidity_low_risk: 'ஈரப்பதம் 82% | இன்று மழை வாய்ப்பு குறைவு',
    core_services_title: 'முழுமையான விவசாய ஆதரவு சேவைகள்',
    core_services_sub: 'அன்றாட விவசாய முடிவுகளுக்கு உடனடி AI வழிகாட்டுதல்.',
    scanner_main_title: 'AI பயிர் இலை நோய் கண்டறிதல்',
    scanner_main_sub: 'பயிர் இலை புகைப்படத்தை எடுத்து உடனடி சிகிச்சை ஆலோசனைகளைப் பெறுங்கள்.',
    scanner_title: 'இலை புகைப்படத்தை எடுக்கவும் அல்லது பதிவேற்றவும்',
    scanner_sub: 'கேமரா மூலம் படம் எடுக்கவும் அல்லது உங்கள் கேலரியில் இருந்து தேர்வு செய்யவும்.',
    btn_take_photo: 'படம் எடுக்கவும் (லைவ் கேமரா)',
    btn_gallery: 'கேலரியில் இருந்து தேர்வு',
    btn_run_diagnosis: 'AI நோய் கண்டறிதலைத் தொடங்கு',
    btn_retake: 'மீண்டும் எடுக்க / மாற்ற',
    btn_view_report: 'முழு சிகிச்சை அறிக்கை பார்க்க',
    btn_check_another: 'மற்றொரு இலையை சோதிக்க',
    photo_ready: 'புகைப்படம் தயார்',
    leaf_ready_title: 'நோய் கண்டறிதலுக்கு இலை தயார்',
    analyzing_foliage: 'இலையை ஆராய்கிறது...',
    camera_modal_title: 'லைவ் பயிர் கேமரா',
    weather_banner: 'அகில இந்திய விவசாய வானிலை நெட்வொர்க்',
    weather_banner_sub: 'அனைத்து மாநிலங்களும் இணைக்கப்பட்டுள்ளன',
    weather_title: 'விவசாய வானிலை & பருவநிலை ஆபத்து',
    weather_sub: 'இந்தியாவின் எந்தவொரு பண்ணைக்கும் நேரலை வானிலை மற்றும் நோய் ஆபத்து எச்சரிக்கைகள்.',
    weather_risk_assessment: 'AI வானிலை ஆபத்து மதிப்பீடு',
    weather_action: 'பரிந்துரைக்கப்பட்ட விவசாய நடவடிக்கை:',
    weather_temp: 'நேரலை வெப்பநிலை',
    weather_humidity: 'காற்றின் ஈரப்பதம்',
    weather_wind: 'காற்றின் வேகம் & புறஊதா குறியீடு',
    weather_forecast: '7 நாள் விவசாய வானிலை முன்னறிவிப்பு',
    weather_search_ph: 'இந்தியாவின் எந்தவொரு மாவட்டம் அல்லது ஊரைத் தேடுங்கள் (எ.கா. தஞ்சாவூர், மதுரை, கோவை...)',
    helpline_banner: 'தேசிய கிசான் கால் சென்டர் நேரலை',
    helpline_title: 'அவசர விவசாய உதவி எண்கள்',
    helpline_sub: 'விவசாய விஞ்ஞானிகளிடமிருந்து 24 மணி நேரமும் இலவச உதவி.',
    call_toll_free: 'இலவச அழைப்பு',
    toll_free_247: '24/7 கட்டணமில்லா எண்',
    open_whatsapp: 'வாட்ஸ்அப் உதவி',
    insurance_banner: 'அரசு பயிர் காப்பீட்டு நேரலை புதுப்பிப்பு',
    insurance_title: 'அரசு பயிர் காப்பீட்டுத் திட்டங்கள்',
    insurance_sub: 'பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY) மற்றும் வானிலை சார்ந்த பாதுகாப்பு.',
    apply_claim_online: 'விண்ணப்பிக்க / கோர',
    awareness_banner: 'ICAR & KVK நேரலை பயிற்சி முகாம்கள்',
    awareness_title: 'விவசாய விழிப்புணர்வு மற்றும் பயிற்சி முகாம்கள்',
    awareness_sub: 'இயற்கை விவசாயம், பூச்சி கட்டுப்பாடு குறித்த இலவச பயிற்சி முகாம்கள்.',
    free_entry: 'இலவச அனுமதி',
    register_online_free: 'இலவச பதிவு',
    join_live_webinar: 'வெபினாரில் சேரவும்',
    privacy_title: 'விவசாயி தரவு தனியுரிமை மற்றும் உரிமைகள்',
    privacy_sub: 'விவசாயிகளின் ஜிபிஎஸ் மற்றும் புகைப்படங்கள் முழுமையாக பாதுகாக்கப்படுகின்றன.',
    take_control_data: 'உங்கள் பண்ணை தரவு உங்கள் கைகளில்',
    export_json: 'தரவைப் பதிவிறக்கு (JSON)',
    delete_records: 'அனைத்து பதிவுகளையும் அழி',
    footer_desc: 'இந்திய விவசாயிகளுக்கான பயிர் நோய் கண்டறிதல் மற்றும் வானிலை எச்சரிக்கை தளம்.',
    quick_links: 'விரைவு இணைப்புகள்',
    support_govt: 'ஆதரவு & அரசு சேவைகள்',
    all_rights: '© 2026 கிருஷி சகாய். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
  },

  kn: {
    nav_home: 'ಮುಖಪುಟ',
    nav_upload: 'ಬೆಳೆ ಆರೋಗ್ಯ',
    nav_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    nav_weather: 'ಹವಾಮಾನ & ಅಪಾಯ',
    nav_recommendations: 'ಕೃಷಿ ಸಲಹೆಗಳು',
    nav_helplines: 'ಸಹಾಯವಾಣಿ',
    nav_insurance: 'ಬೆಳೆ ವಿಮೆ',
    nav_awareness: 'ಕಾರ್ಯಾಗಾರಗಳು',
    nav_privacy: 'ಗೌಪ್ಯತೆ',
    live_synced: 'ಲೈವ್ ಸಿಂಕ್ ಆಗಿದೆ',
    sync_now: 'ಈಗಲೇ ಸಿಂಕ್ ಮಾಡಿ',
    detect_gps: '📍 ನನ್ನ ಹೊಲ ಪತ್ತೆಹಚ್ಚಿ (GPS)',
    select_state: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ:',
    listen_voice: 'ಧ್ವನಿ ಸಲಹೆ ಕೇಳಿ',
    stop_voice: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    voice_playing: 'ಧ್ವನಿ ಸಲಹೆ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
    voice_subtitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಎಐ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ.',
    active_zone: 'ಸಕ್ರಿಯ ವಲಯ:',
    major_crops: 'ಪ್ರಮುಖ ಬೆಳೆಗಳು:',
    refresh_live: 'ಲೈವ್ ಡೇಟಾ ರಿಫ್ರೆಶ್',
    recalibrate: 'ಸಲಹೆಗಳನ್ನು ಮರುಮಾಪನ ಮಾಡಿ',
    hero_badge: 'ಎಐ-ಚಾಲಿತ ಕೃಷಿ ವೇದಿಕೆ',
    hero_title: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.',
    hero_desc: 'ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರೋಗಗಳಿಂದ ರಕ್ಷಿಸಿ, ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಸರ್ಕಾರಿ ಸೇವೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
    hero_btn_check: 'ಬೆಳೆ ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    hero_btn_weather: 'ಹವಾಮಾನ ಅಪಾಯ ವೀಕ್ಷಿಸಿ',
    stat_farmers: '10,000+ ರೈತರಿಗೆ ನೆರವು',
    stat_accuracy: '98.4% ನಿಖರತೆ',
    stat_helpline: '24/7 ಸಹಾಯವಾಣಿ',
    farmers_assisted: 'ರೈತರಿಗೆ ಸಹಾಯ ಒದಗಿಸಲಾಗಿದೆ',
    ai_diagnosis_accuracy: 'ಎಐ ರೋಗ ಪತ್ತೆ ನಿಖರತೆ',
    helpline_support: '24/7 ಸಹಾಯವಾಣಿ ಬೆಂಬಲ',
    live_field_safe: 'ಹೊಲದ ಸ್ಥಿತಿ: ಸುರಕ್ಷಿತ',
    humidity_low_risk: 'ತೇವಾಂಶ 82% | ಇಂದು ಮಳೆ ಸಾಧ್ಯತೆ ಕಡಿಮೆ',
    core_services_title: 'ಸಮಗ್ರ ರೈತ ಸಹಾಯ ಸೇವೆಗಳು',
    core_services_sub: 'ತ್ವರಿತ ಎಐ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ದೈನಂದಿನ ಕೃಷಿ ನಿರ್ಧಾರಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    scanner_main_title: 'ಎಐ ಬೆಳೆ ಎಲೆ ರೋಗ ಪತ್ತೆ',
    scanner_main_sub: 'ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ತಕ್ಷಣದ ಚಿಕಿತ್ಸೆ ಪಡೆಯಲು ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    scanner_title: 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    scanner_sub: 'ಲೈವ್ ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ.',
    btn_take_photo: 'ಫೋಟೋ ತೆಗೆಯಿರಿ (ಲೈವ್ ಕ್ಯಾಮೆರಾ)',
    btn_gallery: 'ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    btn_run_diagnosis: 'AI ರೋಗ ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ',
    btn_retake: 'ಮತ್ತೆ ತೆಗೆಯಿರಿ / ಬದಲಾಯಿಸಿ',
    btn_view_report: 'ಸಂಪೂರ್ಣ ಚಿಕಿತ್ಸಾ ವರದಿ ವೀಕ್ಷಿಸಿ',
    btn_check_another: 'ಇನ್ನೊಂದು ಎಲೆ ತಪಾಸಣೆ ಮಾಡಿ',
    photo_ready: 'ಫೋಟೋ ಸಿದ್ಧವಾಗಿದೆ',
    leaf_ready_title: 'ರೋಗ ಪತ್ತೆಗೆ ಎಲೆ ಸಿದ್ಧವಾಗಿದೆ',
    analyzing_foliage: 'ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    camera_modal_title: 'ಲೈವ್ ಬೆಳೆ ಕ್ಯಾಮೆರಾ',
    weather_banner: 'ಅಖಿಲ ಭಾರತ ಕೃಷಿ ಹವಾಮಾನ ಜಾಲ',
    weather_banner_sub: 'ಎಲ್ಲಾ 28 ರಾಜ್ಯಗಳು ಲಭ್ಯವಿವೆ',
    weather_title: 'ಕೃಷಿ ಹವಾಮಾನ & ಹವಾಮಾನ ಅಪಾಯ',
    weather_sub: 'ಭಾರತದ ಯಾವುದೇ ಹೊಲಕ್ಕೆ ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ.',
    weather_risk_assessment: 'AI ಹವಾಮಾನ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ',
    weather_action: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೃಷಿ ಕ್ರಮ:',
    weather_temp: 'ಪ್ರಸ್ತುತ ತಾಪಮಾನ',
    weather_humidity: 'ಸಾಪೇಕ್ಷ ತೇವಾಂಶ',
    weather_wind: 'ಗಾಳಿಯ ವೇಗ & UV ಸೂಚ್ಯಂಕ',
    weather_forecast: '7 ದಿನಗಳ ಕೃಷಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
    weather_search_ph: 'ಭಾರತದ ಯಾವುದೇ ಜಿಲ್ಲೆ ಅಥವಾ ಗ್ರಾಮ ಹುಡುಕಿ (ಉದಾ: ಶಿವಮೊಗ್ಗ, ಧಾರವಾಡ, ಬೆಳಗಾವಿ...)',
    helpline_banner: 'ರಾಷ್ಟ್ರೀಯ ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ ಆನ್‌ಲೈನ್',
    helpline_title: 'ತುರ್ತು ರೈತ ಸಹಾಯವಾಣಿ',
    helpline_sub: 'ಕೃಷಿ ತಜ್ಞರಿಂದ 24/7 ಉಚಿತ ಸಲಹೆ ಮತ್ತು ನೆರವು.',
    call_toll_free: 'ಟೋಲ್-ಫ್ರೀ ಕರೆ ಮಾಡಿ',
    toll_free_247: '24/7 ಉಚಿತ ಕರೆ',
    open_whatsapp: 'ವಾಟ್ಸಾಪ್ ಸಹಾಯ',
    insurance_banner: 'ಸರ್ಕಾರಿ ಬೆಳೆ ವಿಮೆ ಲೈವ್ ಸಿಂಕ್',
    insurance_title: 'ಸರ್ಕಾರಿ ಬೆಳೆ ವಿಮಾ ಯೋಜನೆಗಳು',
    insurance_sub: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY) ಮತ್ತು ಹವಾಮಾನ ಆಧಾರಿತ ವಿಮೆ.',
    apply_claim_online: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    awareness_banner: 'ICAR & KVK ಲೈವ್ ತರಬೇತಿ ಶಿಬಿರಗಳು',
    awareness_title: 'ರೈತ ಜಾಗೃತಿ ಮತ್ತು ತರಬೇತಿ ಕಾರ್ಯಾಗಾರಗಳು',
    awareness_sub: 'ಸಾವಯವ ಕೃಷಿ, ಕೀಟ ನಿಯಂತ್ರಣ ಕುರಿತು ಉಚಿತ ತರಬೇತಿ ಕಾರ್ಯಾಗಾರಗಳು.',
    free_entry: 'ಉಚಿತ ಪ್ರವೇಶ',
    register_online_free: 'ಉಚಿತ ನೋಂದಣಿ',
    join_live_webinar: 'ವೆಬಿನಾರ್‌ನಲ್ಲಿ ಭಾಗವಹಿಸಿ',
    privacy_title: 'ರೈತರ ಡೇಟಾ ಗೌಪ್ಯತೆ ಮತ್ತು ಹಕ್ಕುಗಳು',
    privacy_sub: 'ರೈತರ ಹೊಲದ ಜಿಪಿಎಸ್ ಮತ್ತು ಚಿತ್ರಗಳ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ.',
    take_control_data: 'ನಿಮ್ಮ ಕೃಷಿ ಡೇಟಾದ ಮೇಲೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ',
    export_json: 'ಡೇಟಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (JSON)',
    delete_records: 'ಎಲ್ಲ ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಿ',
    footer_desc: 'ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಎಐ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ವೇದಿಕೆ.',
    quick_links: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    support_govt: 'ಬೆಂಬಲ ಮತ್ತು ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    all_rights: '© 2026 ಕೃಷಿ ಸಹಾಯ್. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
  },

  mr: {
    nav_home: 'मुख्यपृष्ठ',
    nav_upload: 'पीक आरोग्य',
    nav_dashboard: 'डॅशबोर्ड',
    nav_weather: 'हवामान व जोखीम',
    nav_recommendations: 'सल्ले',
    nav_helplines: 'हेल्पलाइन',
    nav_insurance: 'पीक विमा',
    nav_awareness: 'कार्यशाळा',
    nav_privacy: 'गोपनीयता',
    live_synced: 'थेट सिंक',
    sync_now: 'आता सिंक करा',
    detect_gps: '📍 माझे शेत शोधा (GPS)',
    select_state: 'राज्य निवडा:',
    listen_voice: 'व्हॉइस सल्ला ऐका',
    stop_voice: 'व्हॉइस थांबवा',
    voice_playing: 'व्हॉइस सल्ला सुरू आहे...',
    voice_subtitle: 'आपल्या मातृभाषेत एआय ऑडिओ सल्ला.',
    active_zone: 'सक्रिय क्षेत्र:',
    major_crops: 'प्रमुख पिके:',
    refresh_live: 'थेट डेटा रीफ्रेश',
    recalibrate: 'सल्ला रीकॅलिब्रेट करा',
    hero_badge: 'एआय-संचलित कृषी व्यासपीठ',
    hero_title: 'स्मार्ट शेतीची सुरुवात येथून.',
    hero_desc: 'पिकांना रोगांपासून वाचवा, थेट हवामान सूचना मिळवा आणि सरकारी योजनांचा लाभ घ्या.',
    hero_btn_check: 'पीक आरोग्य तपासा',
    hero_btn_weather: 'हवामान जोखीम पहा',
    stat_farmers: '10,000+ शेतकऱ्यांना मदत',
    stat_accuracy: '98.4% अचूकता',
    stat_helpline: '24/7 हेल्पलाइन',
    farmers_assisted: 'शेतकऱ्यांना मदत केली',
    ai_diagnosis_accuracy: 'एआय अचूकता',
    helpline_support: '24/7 हेल्पलाइन सपोर्ट',
    live_field_safe: 'शेताची स्थिती: सुरक्षित',
    humidity_low_risk: 'आर्द्रता 82% | पावसाची शक्यता कमी',
    core_services_title: 'सर्वसमावेशक शेतकरी सेवा',
    core_services_sub: 'दैनंदिन कृषी निर्णयांसाठी त्वरित एआय मार्गदर्शन.',
    scanner_main_title: 'एआय पीक पान रोग निदान',
    scanner_main_sub: 'रोगाचे त्वरित निदान व उपचारांसाठी पानाचा फोटो काढा किंवा अपलोड करा.',
    scanner_title: 'पानाचा फोटो काढा किंवा अपलोड करा',
    scanner_sub: 'कॅमेऱ्याने थेट फोटो काढा किंवा गॅलरीतून निवडा.',
    btn_take_photo: 'फोटो काढा (थेट कॅमेरा)',
    btn_gallery: 'गॅलरीतून निवडा',
    btn_run_diagnosis: 'AI रोग निदान सुरू करा',
    btn_retake: 'पुन्हा घ्या / बदला',
    btn_view_report: 'पूर्ण उपचार अहवाल पहा',
    btn_check_another: 'दुसरे पान तपासा',
    photo_ready: 'फोटो तयार आहे',
    leaf_ready_title: 'निदानासाठी पान तयार आहे',
    analyzing_foliage: 'पानाचे विश्लेषण सुरू आहे...',
    camera_modal_title: 'थेट पीक कॅमेरा',
    weather_banner: 'अखिल भारतीय कृषी हवामान जाळे',
    weather_banner_sub: 'सर्व राज्ये समाविष्ट',
    weather_title: 'कृषी हवामान आणि जोखीम',
    weather_sub: 'शेतासाठी थेट हवामान आणि बुरशीजन्य रोगांच्या जोखमीचा अंदाज.',
    weather_risk_assessment: 'AI हवामान जोखीम मूल्यांकन',
    weather_action: 'शिफारस केलेली कृती:',
    weather_temp: 'वर्तमान तापमान',
    weather_humidity: 'सापेक्ष आर्द्रता',
    weather_wind: 'वाऱ्याचा वेग व यूव्ही निर्देशांक',
    weather_forecast: '7 दिवसांचा हवामान अंदाज',
    weather_search_ph: 'भारतातील कोणताही जिल्हा किंवा गाव शोधा (उदा. नाशिक, पुणे, नागपूर, कोल्हापूर...)',
    helpline_banner: 'राष्ट्रीय किसान कॉल सेंटर थेट',
    helpline_title: 'शेतकरी हेल्पलाइन',
    helpline_sub: 'कृषी शास्त्रज्ञांकडून 24 तास मोफत मार्गदर्शन.',
    call_toll_free: 'टोल-फ्री कॉल करा',
    toll_free_247: '24/7 टोल-फ्री',
    open_whatsapp: 'व्हॉट्सअॅप मदत',
    insurance_banner: 'सरकारी पीक विमा थेट अपडेट',
    insurance_title: 'पीक विमा योजना',
    insurance_sub: 'पंतप्रधान पीक विमा योजना (PMFBY) आणि हवामान आधारित विमा.',
    apply_claim_online: 'ऑनलाइन अर्ज / दावा करा',
    awareness_banner: 'ICAR आणि KVK थेट प्रशिक्षण',
    awareness_title: 'शेतकरी कार्यशाळा आणि प्रशिक्षण',
    awareness_sub: 'सेंद्रिय शेती, कीड नियंत्रण यावर मोफत कार्यशाळा.',
    free_entry: 'मोफत प्रवेश',
    register_online_free: 'मोफत नोंदणी करा',
    join_live_webinar: 'वेबिनारमध्ये सामील व्हा',
    privacy_title: 'शेतकरी डेटा गोपनीयता आणि हक्क',
    privacy_sub: 'शेतकऱ्यांचा जीपीएस आणि फोटोंची पूर्ण सुरक्षितता.',
    take_control_data: 'आपल्या शेतीच्या डेटावर पूर्ण नियंत्रण',
    export_json: 'डेटा डाउनलोड करा (JSON)',
    delete_records: 'सर्व नोंदी मिटवा',
    footer_desc: 'शेतकऱ्यांसाठी एआय पीक रोग निदान व हवामान सल्लागार मंच.',
    quick_links: 'जलद दुवे',
    support_govt: 'मदत व सरकारी सेवा',
    all_rights: '© 2026 कृषी सहाय. सर्व हक्क राखीव.'
  },

  pa: {
    nav_home: 'ਮੁੱਖ ਪੰਨਾ',
    nav_upload: 'ਫ਼ਸਲ ਦੀ ਸਿਹਤ',
    nav_dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    nav_weather: 'ਮੌਸਮ ਅਤੇ ਜੋਖਮ',
    nav_recommendations: 'ਸਲਾਹਾਂ',
    nav_helplines: 'ਹੈਲਪਲਾਈਨ',
    nav_insurance: 'ਫ਼ਸਲ ਬੀਮਾ',
    nav_awareness: 'ਜਾਗਰੂਕਤਾ ਕੈਂਪ',
    nav_privacy: 'ਗੋਪਨੀਯਤਾ',
    live_synced: 'ਲਾਈਵ ਸਿੰਕ',
    sync_now: 'ਹੁਣੇ ਸਿੰਕ ਕਰੋ',
    detect_gps: '📍 ਮੇਰਾ ਖੇਤ ਲੱਭੋ (GPS)',
    select_state: 'ਰਾਜ ਚੁਣੋ:',
    listen_voice: 'ਆਵਾਜ਼ੀ ਸਲਾਹ ਸੁਣੋ',
    stop_voice: 'ਆਵਾਜ਼ ਰੋਕੋ',
    voice_playing: 'ਆਵਾਜ਼ੀ ਸਲਾਹ ਚੱਲ ਰਹੀ ਹੈ...',
    voice_subtitle: 'ਪੰਜਾਬੀ ਵਿੱਚ ਏਆਈ ਆਡੀਓ ਸਲਾਹ।',
    active_zone: 'ਸਰਗਰਮ ਖੇਤਰ:',
    major_crops: 'ਮੁੱਖ ਫ਼ਸਲਾਂ:',
    refresh_live: 'ਲਾਈਵ ਡਾਟਾ ਰਿਫ੍ਰੈਸ਼',
    recalibrate: 'ਸਲਾਹਾਂ ਮੁੜ-ਕੈਲੀਬ੍ਰੇਟ ਕਰੋ',
    hero_badge: 'ਏਆਈ ਖੇਤੀਬਾੜੀ ਪਲੇਟਫਾਰਮ',
    hero_title: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਇੱਥੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।',
    hero_desc: 'ਆਪਣੀਆਂ ਫ਼ਸਲਾਂ ਨੂੰ ਬਿਮਾਰੀਆਂ ਤੋਂ ਬਚਾਓ, ਮੌਸਮ ਸੰਬੰਧੀ ਚੇਤਾਵਨੀਆਂ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਨਾਲ ਜੁੜੋ।',
    hero_btn_check: 'ਫ਼ਸਲ ਦੀ ਸਿਹਤ ਜਾਂਚੋ',
    hero_btn_weather: 'ਮੌਸਮ ਦਾ ਜੋਖਮ ਦੇਖੋ',
    stat_farmers: '10,000+ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ',
    stat_accuracy: '98.4% ਏਆਈ ਸ਼ੁੱਧਤਾ',
    stat_helpline: '24/7 ਹੈਲਪਲਾਈਨ',
    farmers_assisted: 'ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਕੀਤੀ ਗਈ',
    ai_diagnosis_accuracy: 'ਏਆਈ ਜਾਂਚ ਸ਼ੁੱਧਤਾ',
    helpline_support: '24/7 ਹੈਲਪਲਾਈਨ ਸਹਾਇਤਾ',
    live_field_safe: 'ਖੇਤ ਦੀ ਹਾਲਤ: ਸੁਰੱਖਿਅਤ',
    humidity_low_risk: 'ਨਮੀ 82% | ਅੱਜ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਘੱਟ',
    core_services_title: 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਸੇਵਾਵਾਂ',
    core_services_sub: 'ਰੋਜ਼ਾਨਾ ਖੇਤੀ ਫੈਸਲਿਆਂ ਲਈ ਤੁਰੰਤ ਏਆਈ ਮਾਰਗਦਰਸ਼ਨ।',
    scanner_main_title: 'ਏਆਈ ਪੱਤਾ ਰੋਗ ਜਾਂਚ',
    scanner_main_sub: 'ਬਿਮਾਰੀ ਦੀ ਤੁਰੰਤ ਜਾਂਚ ਲਈ ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚੋ ਜਾਂ ਅੱਪਲੋਡ ਕਰੋ।',
    scanner_title: 'ਫ਼ੋਟੋ ਖਿੱਚੋ ਜਾਂ ਅੱਪਲੋਡ ਕਰੋ',
    scanner_sub: 'ਕੈਮਰੇ ਨਾਲ ਲਾਈਵ ਫ਼ੋਟੋ ਖਿੱਚੋ ਜਾਂ ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ।',
    btn_take_photo: 'ਫ਼ੋਟੋ ਖਿੱਚੋ (ਲਾਈਵ ਕੈਮਰਾ)',
    btn_gallery: 'ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ',
    btn_run_diagnosis: 'AI ਬਿਮਾਰੀ ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ',
    btn_retake: 'ਦੁਬਾਰਾ ਲਵੋ / ਬਦਲੋ',
    btn_view_report: 'ਪੂਰੀ ਰਿਪੋਰਟ ਦੇਖੋ',
    btn_check_another: 'ਹੋਰ ਪੱਤਾ ਜਾਂਚੋ',
    photo_ready: 'ਫ਼ੋਟੋ ਤਿਆਰ ਹੈ',
    leaf_ready_title: 'ਜਾਂਚ ਲਈ ਪੱਤਾ ਤਿਆਰ ਹੈ',
    analyzing_foliage: 'ਪੱਤੇ ਦੀ ਜਾਂਚ ਜਾਰੀ ਹੈ...',
    camera_modal_title: 'ਲਾਈਵ ਕੈਮਰਾ',
    weather_banner: 'ਆਲ-ਇੰਡੀਆ ਖੇਤੀਬਾੜੀ ਮੌਸਮ ਨੈੱਟਵਰਕ',
    weather_banner_sub: 'ਸਾਰੇ ਰਾਜ ਸ਼ਾਮਲ ਹਨ',
    weather_title: 'ਖੇਤੀਬਾੜੀ ਮੌਸਮ ਅਤੇ ਜਲਵਾਯੂ ਜੋਖਮ',
    weather_sub: 'ਖੇਤ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅਤੇ ਉੱਲੀ ਦੇ ਰੋਗਾਂ ਦਾ ਜੋਖਮ ਅੰਦਾਜ਼ਾ।',
    weather_risk_assessment: 'AI ਜਲਵਾਯੂ ਜੋਖਮ ਮੁਲਾਂਕਣ',
    weather_action: 'ਸਿਫਾਰਸ਼ ਕੀਤੀ ਖੇਤੀਬਾੜੀ ਕਾਰਵਾਈ:',
    weather_temp: 'ਮੌਜੂਦਾ ਤਾਪਮਾਨ',
    weather_humidity: 'ਸਾਪੇਖਿਕ ਨਮੀ',
    weather_wind: 'ਹਵਾ ਦੀ ਗਤੀ ਅਤੇ ਯੂਵੀ ਇੰਡੈਕਸ',
    weather_forecast: '7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ',
    weather_search_ph: 'ਭਾਰਤ ਦਾ ਕੋਈ ਵੀ ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਪਿੰਡ ਖੋਜੋ (ਜਿਵੇਂ ਲੁਧਿਆਣਾ, ਅੰਮ੍ਰਿਤਸਰ, ਬਠਿੰਡਾ...)',
    helpline_banner: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ ਲਾਈਵ',
    helpline_title: 'ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ',
    helpline_sub: 'ਖੇਤੀ ਵਿਗਿਆਨੀਆਂ ਤੋਂ 24 ਘੰਟੇ ਮੁਫ਼ਤ ਸਲਾਹ।',
    call_toll_free: 'ਟੋਲ-ਫ੍ਰੀ ਕਾਲ ਕਰੋ',
    toll_free_247: '24/7 ਮੁਫ਼ਤ ਕਾਲ',
    open_whatsapp: 'ਵਟਸਐਪ ਸਹਾਇਤਾ',
    insurance_banner: 'ਸਰਕਾਰੀ ਫ਼ਸਲ ਬੀਮਾ ਲਾਈਵ',
    insurance_title: 'ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾਵਾਂ',
    insurance_sub: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY) ਅਤੇ ਮੌਸਮ ਆਧਾਰਿਤ ਬੀਮਾ।',
    apply_claim_online: 'ਆਨਲਾਈਨ ਅਪਲਾਈ / ਕਲੇਮ ਕਰੋ',
    awareness_banner: 'ICAR ਅਤੇ KVK ਸਿਖਲਾਈ ਕੈਂਪ',
    awareness_title: 'ਕਿਸਾਨ ਜਾਗਰੂਕਤਾ ਕੈਂਪ',
    awareness_sub: 'ਜੈਵਿਕ ਖੇਤੀ ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ ਸੰਬੰਧੀ ਮੁਫ਼ਤ ਵਰਕਸ਼ਾਪਾਂ।',
    free_entry: 'ਮੁਫ਼ਤ ਦਾਖ਼ਲਾ',
    register_online_free: 'ਮੁਫ਼ਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    join_live_webinar: 'ਵੈਬੀਨਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    privacy_title: 'ਕਿਸਾਨ ਡਾਟਾ ਸੁਰੱਖਿਆ ਅਤੇ ਅਧਿਕਾਰ',
    privacy_sub: 'ਕਿਸਾਨਾਂ ਦੇ ਜੀਪੀਐਸ ਅਤੇ ਫ਼ੋਟੋਆਂ ਦੀ ਪੂਰੀ ਸੁਰੱਖਿਆ।',
    take_control_data: 'ਆਪਣੇ ਡਾਟਾ ਤੇ ਪੂਰਾ ਕੰਟਰੋਲ',
    export_json: 'ਡਾਟਾ ਡਾਊਨਲੋਡ ਕਰੋ (JSON)',
    delete_records: 'ਸਾਰੇ ਰਿਕਾਰਡ ਮਿਟਾਓ',
    footer_desc: 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਏਆਈ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚ ਅਤੇ ਮੌਸਮ ਚੇਤਾਵਨੀ ਪਲੇਟਫਾਰਮ।',
    quick_links: 'ਜ਼ਰੂਰੀ ਲਿੰਕ',
    support_govt: 'ਸਹਾਇਤਾ ਅਤੇ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ',
    all_rights: '© 2026 ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਕ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।'
  },

  bn: {
    nav_home: 'হোম',
    nav_upload: 'ফসলের স্বাস্থ্য',
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_weather: 'আবহাওয়া ও ঝুঁকি',
    nav_recommendations: 'পরামর্শ',
    nav_helplines: 'হেল্পলাইন',
    nav_insurance: 'ফসল বীমা',
    nav_awareness: 'সচেতনতা শিবির',
    nav_privacy: 'গোপনীয়তা',
    live_synced: 'লাইভ সিঙ্ক',
    sync_now: 'এখনই সিঙ্ক করুন',
    detect_gps: '📍 আমার জমি খুঁজুন (GPS)',
    select_state: 'রাজ্য নির্বাচন করুন:',
    listen_voice: 'ভয়েস পরামর্শ শুনুন',
    stop_voice: 'ভয়েস থামান',
    voice_playing: 'ভয়েস পরামর্শ চলছে...',
    voice_subtitle: 'বাংলায় এআই ভয়েস অডিও পরামর্শ।',
    active_zone: 'সক্রিয় অঞ্চল:',
    major_crops: 'প্রধান ফসল:',
    refresh_live: 'লাইভ তথ্য রিফ্রেশ',
    recalibrate: 'পরামর্শ পুনর্নির্ধারণ করুন',
    hero_badge: 'এআই-চালিত কৃষি প্ল্যাটফর্ম',
    hero_title: 'স্মার্ট কৃষির সূচনা यहीं থেকেই।',
    hero_desc: 'ফসলকে রোগ থেকে বাঁচান, সঠিক আবহাওয়া সতর্কতা পান এবং সরকারি কৃষি সেবার সাথে যুক্ত থাকুন।',
    hero_btn_check: 'ফসলের স্বাস্থ্য পরীক্ষা',
    hero_btn_weather: 'আবহাওয়ার ঝুঁকি দেখুন',
    stat_farmers: '10,000+ কৃষকের সহায়তা',
    stat_accuracy: '98.4% এআই নির্ভুলতা',
    stat_helpline: '24/7 হেল্পলাইন',
    farmers_assisted: 'কৃষকদের সহায়তা প্রদান করা হয়েছে',
    ai_diagnosis_accuracy: 'এআই রোগ নির্ণয় নির্ভুলতা',
    helpline_support: '24/7 হেল্পলাইন সহায়তা',
    live_field_safe: 'জমির অবস্থা: নিরাপদ',
    humidity_low_risk: 'আর্দ্রতা 82% | আজ বৃষ্টির সম্ভাবনা কম',
    core_services_title: 'সার্বিক কৃষক সহায়তা সেবা',
    core_services_sub: 'দৈনন্দিন কৃষি সিদ্ধান্তের জন্য দ্রুত এআই দিকনির্দেশনা।',
    scanner_main_title: 'এআই পাতার রোগ নির্ণয়',
    scanner_main_sub: 'রোগের তাৎক্ষণিক নির্ণয় ও চিকিৎসার পরামর্শ পেতে আক্রান্ত পাতার ছবি তুলুন বা আপলোড করুন।',
    scanner_title: 'ছবি তুলুন বা আপলোড করুন',
    scanner_sub: 'ক্যামেরা দিয়ে ছবি তুলুন অথবা গ্যালারি থেকে নির্বাচন করুন।',
    btn_take_photo: 'ছবি তুলুন (লাইভ ক্যামেরা)',
    btn_gallery: 'গ্যালারি থেকে বাছুন',
    btn_run_diagnosis: 'AI রোগ নির্ণয় শুরু করুন',
    btn_retake: 'আবার তুলুন / বদলান',
    btn_view_report: 'সম্পূর্ণ রিপোর্ট দেখুন',
    btn_check_another: 'অন্য পাতা পরীক্ষা করুন',
    photo_ready: 'ছবি প্রস্তুত',
    leaf_ready_title: 'রোগ পরীক্ষার জন্য পাতা প্রস্তুত',
    analyzing_foliage: 'পাতার বিশ্লেষণ চলছে...',
    camera_modal_title: 'লাইভ ক্যামেরা',
    weather_banner: 'সর্বভারতীয় কৃষি আবহাওয়া নেটওয়ার্ক',
    weather_banner_sub: 'সকল রাজ্য সংযুক্ত',
    weather_title: 'কৃষি আবহাওয়া ও জলবায়ু ঝুঁকি',
    weather_sub: 'যেকোনো খামারের জন্য রিয়েল-টাইম আবহাওয়া ও ছত্রাকজনিত রোগের ঝুঁকি পূর্বাভাস।',
    weather_risk_assessment: 'AI জলবায়ু ঝুঁকি মূল্যায়ন',
    weather_action: 'প্রস্তাবিত কৃষি পদক্ষেপ:',
    weather_temp: 'বর্তমান তাপমাত্রা',
    weather_humidity: 'আপেক্ষিক আর্দ্রতা',
    weather_wind: 'বাতাসের গতি ও UV সূচক',
    weather_forecast: '7 দিনের আবহাওয়া পূর্বাভাস',
    weather_search_ph: 'ভারতের যে কোনো জেলা বা গ্রাম খুঁজুন (যেমন বর্ধমান, বীরভূম, নদীয়া...)',
    helpline_banner: 'জাতীয় কিষাণ কল সেন্টার লাইভ',
    helpline_title: 'জরুরি কৃষক হেল্পলাইন',
    helpline_sub: 'কৃষি বিজ্ঞানীদের কাছ থেকে 24 ঘণ্টা বিনামূল্যে সহায়তা।',
    call_toll_free: 'টোল-ফ্রি কল করুন',
    toll_free_247: '24/7 বিনামূল্যে কল',
    open_whatsapp: 'হোয়াটসঅ্যাপ সহায়তা',
    insurance_banner: 'সরকারি ফসল বীমা লাইভ সিঙ্ক',
    insurance_title: 'সরকারি ফসল বীমা প্রকল্প',
    insurance_sub: 'প্রধানমন্ত্রী ফসল বীমা যোজনা (PMFBY) ও আবহাওয়া ভিত্তিক সুরক্ষা।',
    apply_claim_online: 'অনলাইনে আবেদন / দাবি করুন',
    awareness_banner: 'ICAR ও KVK লাইভ প্রশিক্ষণ শিবির',
    awareness_title: 'কৃষক সচেতনতা ও প্রশিক্ষণ শিবির',
    awareness_sub: 'জৈব চাষ ও কীট দমন সংক্রান্ত বিনামূল্যে কর্মশালা।',
    free_entry: 'বিনামূল্যে প্রবেশ',
    register_online_free: 'বিনামূল্যে নিবন্ধন করুন',
    join_live_webinar: 'ওয়েবিনারে যোগ দিন',
    privacy_title: 'কৃষকের ডেটা সুরক্ষা ও অধিকার',
    privacy_sub: 'কৃষকদের জিপিএস ও ছবির পূর্ণ গোপনীয়তা সুরক্ষা।',
    take_control_data: 'আপনার ডেটার ওপর সম্পূর্ণ নিয়ন্ত্রণ',
    export_json: 'ডেটা ডাউনলোড করুন (JSON)',
    delete_records: 'সব রেকর্ড মুছে ফেলুন',
    footer_desc: 'ভারতীয় কৃষকদের জন্য এআই ফসল রোগ নির্ণয় ও আবহাওয়া সতর্কতা প্ল্যাটফর্ম।',
    quick_links: 'প্রয়োজনীয় লিঙ্ক',
    support_govt: 'সহায়তা ও সরকারি সেবা',
    all_rights: '© 2026 কৃষি সহায়। সর্বস্বত্ব সংরক্ষিত।'
  }
};

/**
 * Universal Multilingual Entity & Agricultural Terms Dictionary
 * Translates crops, pathogens, severities, weather conditions, advisory phrases, and online content
 */
const ENTITY_DICTIONARY = {
  // Crops
  'Rice (Paddy)': { te: 'వరి (వరి ధాన్యం)', hi: 'धान / चावल', ta: 'நெல் / அரிசி', kn: 'ಭತ್ತ / ಅಕ್ಕಿ', mr: 'भात / तांदूळ', pa: 'ਝੋਨਾ / ਚੌਲ', bn: 'ধান / চাল' },
  'Tomato': { te: 'టమోటా', hi: 'टमाटर', ta: 'தக்காளி', kn: 'ಟೊಮ್ಯಾಟೊ', mr: 'टोमॅटो', pa: 'ਟਮਾਟਰ', bn: 'টমেটো' },
  'Wheat': { te: 'గోధుమ', hi: 'गेहूं', ta: 'கோதுமை', kn: 'ಗೋಧಿ', mr: 'गहू', pa: 'ਕਣਕ', bn: 'গম' },
  'Cotton': { te: 'పత్తి', hi: 'कपास', ta: 'பருத்தி', kn: 'ಹತ್ತಿ', mr: 'कापूस', pa: 'ਨਰਮਾ / ਕਪਾਹ', bn: 'তুলা' },
  'Maize': { te: 'మొక్కజొన్న', hi: 'मक्का', ta: 'மக்காச்சோளம்', kn: 'ಮೆಕ್ಕೆಜೋಳ', mr: 'मका', pa: 'ਮੱਕੀ', bn: 'ভুট্টা' },
  'Sugarcane': { te: 'చెరకు', hi: 'गन्ना', ta: 'கரும்பு', kn: 'ಕಬ್ಬು', mr: 'ऊस', pa: 'ਕਮਾਦ', bn: 'আখ' },
  'Potato': { te: 'బంగాళాదుంప', hi: 'आलू', ta: 'உருளைக்கிழங்கு', kn: 'ಆಲೂಗಡ್ಡೆ', mr: 'बटाटा', pa: 'ਆਲੂ', bn: 'আলু' },

  // Diseases
  'Rice Blast': { te: 'వరి అగ్గితెగులు (రైస్ బ్లాస్ట్)', hi: 'धान का झुलसा रोग (ब्लास्ट)', ta: 'நெல் குலை நோய்', kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ', mr: 'भातावरील करपा', pa: 'ਝੋਨੇ ਦਾ ਝੁਲਸ ਰੋਗ', bn: 'ধানের ব্লাস্ট রোগ' },
  'Tomato Early Blight': { te: 'టమోటా ముందస్తు మచ్చ తెగులు (ఎర్లీ బ్లైట్)', hi: 'टमाटर का अगेती झुलसा (अर्ली ब्लाइट)', ta: 'தக்காளி ஆரம்பக்கால கருகல் நோய்', kn: 'ಟೊಮ್ಯಾಟೊ ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ', mr: 'टोमॅटोवरील लवकर येणारा करपा', pa: 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ', bn: 'টমেটোর আগাম ধসা রোগ' },
  'Wheat Yellow Rust': { te: 'గోధుమ పసుపు కుంకుమ తెగులు (ఎల్లో రస్ట్)', hi: 'गेहूं का पीला रतुआ (येलो रस्ट)', ta: 'கோதுமை மஞ்சள் துரு நோய்', kn: 'ಗೋಧಿ ಹಳದಿ ತುಕ್ಕು ರೋಗ', mr: 'गव्हावरील पिवळा तांबेरा', pa: 'ਕਣਕ ਦਾ ਪੀਲਾ ਰਤੂਆ', bn: 'গমের হলুদ মরিচা রোগ' },
  'Cotton Bacterial Blight': { te: 'పత్తి బాక్టీరియల్ మచ్చ తెగులు (బ్లైట్)', hi: 'कपास का जीवाणु झुलसा रोग', ta: 'பருத்தி பாக்டீரியா கருகல் நோய்', kn: 'ಹತ್ತಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ರೋಗ', mr: 'कापसावरील जिवाणू करपा', pa: 'ਨਰਮੇ ਦਾ ਜੀਵਾਣੂ ਝੁਲਸ ਰੋਗ', bn: 'তুলার ব্যাকটেরিয়াল ব্লাইট' },
  'Healthy': { te: 'ఆరోగ్యకరమైన పంట (వ్యాధులు లేవు)', hi: 'स्वस्थ फसल (रोगमुक्त)', ta: 'ஆரோக்கியமான பயிர்', kn: 'ಆರೋಗ್ಯಕರ ಬೆಳೆ', mr: 'निरोगी पीक', pa: 'ਤੰਦਰੁਸਤ ਫ਼ਸਲ', bn: 'সুস্থ ফসল' },
  'Rice Blast (Magnaporthe oryzae)': { te: 'వరి అగ్గితెగులు (రైస్ బ్లాస్ట్)', hi: 'धान का झुलसा रोग (ब्लास्ट)', ta: 'நெல் குலை நோய்', kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ', mr: 'भातावरील करपा', pa: 'ਝੋਨੇ ਦਾ ਝੁਲਸ ਰੋਗ', bn: 'ধানের ব্লাস্ট রোগ' },
  'Tomato Early Blight (Alternaria solani)': { te: 'టమోటా ముందస్తు మచ్చ తెగులు (ఎర్లీ బ్లైట్)', hi: 'टमाटर का अगेती झुलसा (अर्ली ब्लाइट)', ta: 'தக்காளி ஆரம்பக்கால கருகல் நோய்', kn: 'ಟೊಮ್ಯಾಟೊ ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ', mr: 'टोमॅटोवरील लवकर येणारा करपा', pa: 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ', bn: 'টমেটোর আগাম ধসা রোগ' },
  'Wheat Yellow Rust (Puccinia striiformis)': { te: 'గోధుమ పసుపు కుంకుమ తెగులు (ఎల్లో రస్ట్)', hi: 'गेहूं का पीला रतुआ (येलो रस्ट)', ta: 'கோதுமை மஞ்சள் துரு நோய்', kn: 'ಗೋಧಿ ಹಳದಿ ತುಕ್ಕು ರೋಗ', mr: 'गव्हावरील पिवळा तांबेरा', pa: 'ਕਣਕ ਦਾ ਪੀਲਾ ਰਤੂਆ', bn: 'গমের হলুদ মরিচা রোগ' },
  'Cotton Bacterial Blight (Xanthomonas citri)': { te: 'పత్తి బాక్టీరియల్ మచ్చ తెగులు (బ్లైట్)', hi: 'कपास का जीवाणु झुलसा रोग', ta: 'பருத்தி பாக்டீரியா கருகல் நோய்', kn: 'ಹತ್ತಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ರೋಗ', mr: 'कापसावरील जिवाणू करपा', pa: 'ਨਰਮੇ ਦਾ ਜੀਵਾਣੂ ਝੁਲਸ ਰੋਗ', bn: 'তুলার ব্যাকটেরিয়াল ব্লাইট' },
  'Healthy Crop Leaf': { te: 'ఆరోగ్యకరమైన పంట ఆకు (వ్యాధులు లేవు)', hi: 'स्वस्थ फसल की पत्ती (रोगमुक्त)', ta: 'ஆரோக்கியமான பயிர் இலை', kn: 'ಆರೋಗ್ಯಕರ ಬೆಳೆ ಎಲೆ', mr: 'निरोगी पीक पान', pa: 'ਤੰਦਰੁਸਤ ਫ਼ਸਲ ਦਾ ਪੱਤਾ', bn: 'সুস্থ ফসলের পাতা' },

  // Severities & Badges
  'HIGH': { te: 'అధికం', hi: 'उच्च', ta: 'அதிகம்', kn: 'ಹೆಚ್ಚು', mr: 'उच्च', pa: 'ਉੱਚ', bn: 'উচ্চ' },
  'MEDIUM': { te: 'మధ్యస్థం', hi: 'मध्यम', ta: 'நடுத்தரம்', kn: 'ಮಧ್ಯಮ', mr: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ', bn: 'মাঝারি' },
  'LOW': { te: 'తక్కువ / సురక్షితం', hi: 'कम / सुरक्षित', ta: 'குறைவு / பாதுகாப்பானது', kn: 'ಕಡಿಮೆ / ಸುರಕ್ಷಿತ', mr: 'कमी / सुरक्षित', pa: 'ਘੱਟ / ਸੁਰੱਖਿਅਤ', bn: 'কম / নিরাপদ' },
  'CRITICAL': { te: 'అత్యవసరం', hi: 'अति-गंभीर', ta: 'முக்கியமானது', kn: 'ಅತ್ಯಂತ ತುರ್ತು', mr: 'अति-गंभीर', pa: 'ਨਾਜ਼ੁਕ', bn: 'সংকটপূর্ণ' },
  'HIGH SEVERITY': { te: 'తీవ్రమైన ప్రమాదం', hi: 'अत्यधिक गंभीर', ta: 'அதிக தீவிரம்', kn: 'ಅತಿ ಹೆಚ್ಚು ತೀವ್ರತೆ', mr: 'उच्च तीव्रता', pa: 'ਉੱਚ ਗੰਭੀਰਤਾ', bn: 'উচ্চ তীব্রতা' },
  'MEDIUM SEVERITY': { te: 'మధ్యస్థ తీవ్రత', hi: 'मध्यम गंभीरता', ta: 'நடுத்தர தீவிரம்', kn: 'ಮಧ್ಯಮ ತೀವ್ರತೆ', mr: 'मध्यम तीव्रता', pa: 'ਦਰਮਿਆਨੀ ਗੰਭੀਰਤਾ', bn: 'মাঝারি তীব্রতা' },
  'LOW SEVERITY': { te: 'తక్కువ తీవ్రత / సురక్షితం', hi: 'कम गंभीरता / सुरक्षित', ta: 'குறைந்த தீவிரம்', kn: 'ಕಡಿಮೆ ತೀವ್ರತೆ', mr: 'कमी तीव्रता', pa: 'ਘੱਟ ਗੰਭੀਰਤਾ', bn: 'কম তীব্রতা' },
  'HIGH PRIORITY': { te: 'అత్యధిక ప్రాధాన్యత', hi: 'उच्च प्राथमिकता', ta: 'அதிமுக்கிய முன்னுரிமை', kn: 'ಹೆಚ್ಚು ಆದ್ಯತೆ', mr: 'उच्च प्राधान्य', pa: 'ਉੱਚ ਤਰਜੀਹ', bn: 'সর্বোচ্চ অগ্রাধিকার' },
  'MEDIUM PRIORITY': { te: 'మధ్యస్థ ప్రాధాన్యత', hi: 'मध्यम प्राथमिकता', ta: 'நடுத்தர முன்னுரிமை', kn: 'ಮಧ್ಯಮ ಆದ್ಯತೆ', mr: 'मध्यम प्राधान्य', pa: 'ਦਰਮਿਆਨੀ ਤਰਜੀਹ', bn: 'মাঝারি অগ্রাধিকার' },
  'LOW PRIORITY': { te: 'సాధారణ ప్రాధాన్యత', hi: 'सामान्य प्राथमिकता', ta: 'குறைந்த முன்னுரிமை', kn: 'ಕಡಿಮೆ ಆದ್ಯತೆ', mr: 'कमी प्राधान्य', pa: 'ਘੱਟ ਤਰਜੀਹ', bn: 'কম অগ্রাধিকার' },
  'MODERATE RISK': { te: 'మధ్యస్థ ప్రమాదం', hi: 'मध्यम जोखिम', ta: 'மிதமான ஆபத்து', kn: 'ಮಧ್ಯಮ ಅಪಾಯ', mr: 'मध्यम जोखीम', pa: 'ਦਰਮਿਆਨਾ ਜੋਖਮ', bn: 'মাঝারি ঝুঁকি' },
  'LOW / SAFE': { te: 'సురక్షితం / తక్కువ రిస్క్', hi: 'सुरक्षित / कम जोखिम', ta: 'பாதுகாப்பானது / குறைந்த ஆபத்து', kn: 'ಸುರಕ್ಷಿತ / ಕಡಿಮೆ ಅಪಾಯ', mr: 'सुरक्षित / कमी जोखीम', pa: 'ਸੁਰੱਖਿਅਤ / ਘੱਟ ਜੋਖਮ', bn: 'নিরাপদ / কম ঝুঁকি' },
  'SAFE': { te: 'సురక్షితం', hi: 'सुरक्षित', ta: 'பாதுகாப்பானது', kn: 'ಸುರಕ್ಷಿತ', mr: 'सुरक्षित', pa: 'ਸੁਰੱਖਿਅਤ', bn: 'নিরাপদ' },
  'Live Online AI': { te: 'లైవ్ ఆన్‌లైన్ AI', hi: 'लाइव ऑनलाइन एआई', ta: 'நேரலை AI', kn: 'ಲೈವ್ ಎಐ', mr: 'थेट एआई', pa: 'ਲਾਈਵ ਏਆਈ', bn: 'লাইভ এআই' },
  'Active Enrollment 2026': { te: 'ప్రస్తుత నమోదు 2026', hi: 'सक्रिय नामांकन 2026', ta: 'செயலில் உள்ள சேர்க்கை 2026', kn: 'ಸಕ್ರಿಯ ನೋಂದಣಿ 2026', mr: 'सक्रिय नोंदणी 2026', pa: 'ਸਰਗਰਮ ਰਜਿਸਟ੍ਰੇਸ਼ਨ 2026', bn: 'সক্রিয় নিবন্ধন 2026' },
  'Active 2026 Policy': { te: 'క్రియాశీల పాలసీ 2026', hi: 'सक्रिय 2026 पॉलिसी', ta: 'செயலில் உள்ள பாலிசி 2026', kn: 'ಸಕ್ರಿಯ 2026 ಪಾಲಿಸಿ', mr: 'सक्रिय 2026 पॉलिसी', pa: 'ਸਰਗਰਮ 2026 ਪਾਲਿਸੀ', bn: 'সক্রিয় 2026 পলিসি' },
  '🟢 Active Now': { te: '🟢 ప్రస్తుతం అందుబాటులో ఉంది', hi: '🟢 अभी सक्रिय है', ta: '🟢 இப்போது செயலில் உள்ளது', kn: '🟢 ಈಗ ಸಕ್ರಿಯವಾಗಿದೆ', mr: '🟢 आता सुरू आहे', pa: '🟢 ਹੁਣ ਚਾਲੂ ਹੈ', bn: '🟢 এখন সক্রিয়' },
  '🟢 Registration Live': { te: '🟢 నమోదు ప్రారంభమైంది', hi: '🟢 पंजीकरण लाइव है', ta: '🟢 பதிவு தொடங்கப்பட்டது', kn: '🟢 ನೋಂದಣಿ ಲೈವ್ ಆಗಿದೆ', mr: '🟢 नोंदणी सुरू आहे', pa: '🟢 ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸ਼ੁਰੂ ਹੈ', bn: '🟢 নিবন্ধন চলছে' },
  'FREE': { te: 'ఉచితం', hi: 'निःशुल्क', ta: 'இலவசம்', kn: 'ಉಚಿತ', mr: 'मोफत', pa: 'ਮੁਫ਼ਤ', bn: 'বিনামূল্যে' },

  // Weather conditions
  'Clear Sky': { te: 'నిర్మలమైన ఆకాశం', hi: 'साफ आसमान', ta: 'தெளிவான வானம்', kn: 'ಸ್ವಚ್ಛ ಆಕಾಶ', mr: 'स्वच्छ आकाश', pa: 'ਸਾਫ਼ ਅਸਮਾਨ', bn: 'পরিষ্কার আকাশ' },
  'Clear Sky / Sunny': { te: 'నిర్మలమైన ఆకాశం / ఎండ', hi: 'साफ आसमान / धूप', ta: 'தெளிவான வானம் / வெயில்', kn: 'ಸ್ವಚ್ಛ ಆಕಾಶ / ಬಿಸಿಲು', mr: 'स्वच्छ आकाश / ऊन', pa: 'ਸਾਫ਼ ਅਸਮਾਨ / ਧੁੱਪ', bn: 'পরিষ্কার আকাশ / রৌদ্রোজ্জ্বল' },
  'Mainly Clear': { te: 'ఎక్కువగా నిర్మలం', hi: 'मुख्यतः साफ', ta: 'பெரும்பாலும் தெளிவானது', kn: 'ಮುಖ್ಯವಾಗಿ ಸ್ವಚ್ಛ', mr: 'मुख्यतः स्वच्छ', pa: 'ਮੁੱਖ ਤੌਰ ਤੇ ਸਾਫ਼', bn: 'প্রধানত পরিষ্কার' },
  'Partly Cloudy': { te: 'పాక్షికంగా మేఘావృతం', hi: 'आंशिक रूप से बादल', ta: 'பகுதி மேகமூட்டம்', kn: 'ಭಾಗಶಃ ಮೋಡ', mr: 'अंशतः ढगाळ', pa: 'ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ', bn: 'আংশিক মেঘলা' },
  'Overcast': { te: 'పూర్తిగా మేఘావృతం', hi: 'घने बादल', ta: 'முழு மேகமூட்டம்', kn: 'ದಟ್ಟ ಮೋಡ', mr: 'पूर्ण ढगाळ', pa: 'ਪੂਰਾ ਬੱਦਲਵਾਈ', bn: 'মেঘাচ্ছন্ন' },
  'Light Rain': { te: 'తేలికపాటి వర్షం', hi: 'हल्की बारिश', ta: 'லேசான மழை', kn: 'ಹಗುರ ಮಳೆ', mr: 'हलका पाऊस', pa: 'ਹਲਕੀ ਬਾਰਿਸ਼', bn: 'হালকা বৃষ্টি' },
  'Light Showers': { te: 'తేలికపాటి జల్లులు', hi: 'हल्की फुहारें', ta: 'லேசான தூறல்', kn: 'ಹಗುರ ತುಂತುರು ಮಳೆ', mr: 'हलक्या सरी', pa: 'ਹਲਕੀ ਫੁਹਾਰ', bn: 'হালকা বর্ষণ' },
  'Moderate Rain': { te: 'మధ్యస్థ వర్షం', hi: 'मध्यम बारिश', ta: 'மிதமான மழை', kn: 'ಮಧ್ಯಮ ಮಳೆ', mr: 'मध्यम पाऊस', pa: 'ਦਰਮਿਆਨੀ ਬਾਰਿਸ਼', bn: 'মাঝারি বৃষ্টি' },
  'Rain Showers': { te: 'వర్షపు జల్లులు', hi: 'बारिश की फुहारें', ta: 'மழை தூறல்', kn: 'ಮಳೆ ತುಂತುರು', mr: 'पावसाच्या सरी', pa: 'ਮੀਂਹ ਦੀਆਂ ਫੁਹਾਰਾਂ', bn: 'বৃষ্টির ধারা' },
  'Heavy Rain Showers': { te: 'భారీ వర్షపు జల్లులు', hi: 'भारी बारिश की फुहारें', ta: 'கனமழை தூறல்', kn: 'ಭಾರೀ ಮಳೆ', mr: 'मुसळधार पाऊस', pa: 'ਭਾਰੀ ਮੀਂਹ', bn: 'ভারী বৃষ্টিপাত' },
  'Thunderstorm': { te: 'ఉరుములతో కూడిన వర్షం', hi: 'आंधी-तूफान', ta: 'இடியுடன் கூடிய மழை', kn: 'ಗುಡುಗು ಸಹಿತ ಮಳೆ', mr: 'वादळी पाऊस', pa: 'ਗਰਜ ਨਾਲ ਮੀਂਹ', bn: 'বজ্রবিদ্যুৎসহ বৃষ্টি' },
  'Thunderstorms & Hail Risk': { te: 'ఉరుములు మరియు వడగండ్ల రిస్క్', hi: 'आंधी-तूफान व ओलावृष्टि का जोखिम', ta: 'இடிமழை மற்றும் ஆலங்கட்டி ஆபத்து', kn: 'ಗುಡುಗು ಮತ್ತು ಆಲಿಕಲ್ಲು ಅಪಾಯ', mr: 'वादळ व गारपिटीचा धोका', pa: 'ਗਰਜ ਅਤੇ ਗੜ੍ਹਿਆਂ ਦਾ ਜੋਖਮ', bn: 'বজ্রঝড় ও শিলাবৃষ্টির ঝুঁকি' },
  'Dense Fog': { te: 'దట్టమైన పొగమంచు', hi: 'घना कोहरा', ta: 'அடர்ந்த பனிமூட்டம்', kn: 'ದಟ್ಟ ಮಂಜು', mr: 'दाट धुके', pa: 'ਸੰਘਣੀ ਧੁੰਦ', bn: 'ঘন কুয়াশা' },
  'Foggy / High Morning Dew': { te: 'పొగమంచు / అధిక ఉదయపు మంచు', hi: 'कोहरा / अधिक सुबह की ओस', ta: 'பனிமூட்டம் / அதிகாலை பனித்துளி', kn: 'ಮಂಜು / ಬೆಳಗಿನ ಇಬ್ಬನಿ', mr: 'धुके / सकाळचे दव', pa: 'ਧੁੰਦ / ਸਵੇਰ ਦੀ ਤ੍ਰੇਲ', bn: 'কুয়াশা / ভোরের শিশির' },
  'Drizzle / High Moisture': { te: 'చిరుజల్లులు / గాలిలో అధిక తేమ', hi: 'बूंदाबांदी / अधिक नमी', ta: 'தூறல் / அதிக ஈரப்பதம்', kn: 'ತುಂತುರು / ಹೆಚ್ಚಿನ ತೇವಾಂಶ', mr: 'रिमझिम / जास्त ओलावा', pa: 'ਬੂੰਦਾ-ਬਾਂਦੀ / ਜ਼ਿਆਦਾ ਨਮੀ', bn: 'গুঁড়ি গুঁড়ি বৃষ্টি / উচ্চ আর্দ্রতা' },
  'Seasonal Agricultural Weather': { te: 'సీజనల్ వ్యవసాయ వాతావరణం', hi: 'मौसमी कृषि मौसम', ta: 'பருவகால விவசாய வானிலை', kn: 'ಋತುಮಾನದ ಕೃಷಿ ಹವಾಮಾನ', mr: 'हंगामी कृषी हवामान', pa: 'ਮੌਸਮੀ ਖੇਤੀਬਾੜੀ ਮੌਸਮ', bn: 'মৌসুমি কৃষি আবহাওয়া' },
  'Sunny': { te: 'ఎండగా ఉంది', hi: 'धूप', ta: 'வெயில்', kn: 'ಬಿಸಿಲು', mr: 'ऊन', pa: 'ਧੁੱਪ', bn: 'রৌদ্রোজ্জ্বল' },
  'Clear': { te: 'నిర్మలం', hi: 'साफ', ta: 'தெளிவு', kn: 'ಸ್ವಚ್ಛ', mr: 'स्वच्छ', pa: 'ਸਾਫ਼', bn: 'পরিষ্কার' },
  'Sunny Spells': { te: 'ఎండ వెలుగులు', hi: 'धूप की चमक', ta: 'விட்டு விட்டு வெயில்', kn: 'ಬಿಸಿಲಿನ ಹೊಳಪು', mr: 'उन्हाची तिरीप', pa: 'ਧੁੱਪ ਦੇ ਝਲਕਾਰੇ', bn: 'রোদের ঝিলিক' },

  // Days
  'Mon': { te: 'సోమ', hi: 'सोम', ta: 'திங்கள்', kn: 'ಸೋಮ', mr: 'सोम', pa: 'ਸੋਮ', bn: 'সোম' },
  'Tue': { te: 'మంగళ', hi: 'मंगल', ta: 'செவ்வாய்', kn: 'ಮಂಗಳ', mr: 'मंगळ', pa: 'ਮੰਗਲ', bn: 'মঙ্গল' },
  'Wed': { te: 'బుధ', hi: 'बुध', ta: 'புதன்', kn: 'ಬುಧ', mr: 'बुध', pa: 'ਬੁੱਧ', bn: 'বুধ' },
  'Thu': { te: 'గురు', hi: 'गुरु', ta: 'வியாழன்', kn: 'ಗುರು', mr: 'गुरू', pa: 'ਵੀਰ', bn: 'বৃহস্পতি' },
  'Fri': { te: 'శుక్ర', hi: 'शुक्र', ta: 'வெள்ளி', kn: 'ಶುಕ್ರ', mr: 'शुक्र', pa: 'ਸ਼ੁੱਕਰ', bn: 'শুক্র' },
  'Sat': { te: 'శని', hi: 'शनि', ta: 'சனி', kn: 'ಶನಿ', mr: 'शनि', pa: 'ਸ਼ਨੀ', bn: 'শনি' },
  'Sun': { te: 'ఆది', hi: 'रवि', ta: 'ஞாயிறு', kn: 'ಭಾನು', mr: 'रवि', pa: 'ਐਤ', bn: 'রবি' },
  'Today': { te: 'ఈరోజు', hi: 'आज', ta: 'இன்று', kn: 'ಇಂದು', mr: 'आज', pa: 'ਅੱਜ', bn: 'আজ' },
  'Tomorrow': { te: 'రేపు', hi: 'कल', ta: 'நாளை', kn: 'ನಾಳೆ', mr: 'उद्या', pa: 'ਕੱਲ੍ਹ', bn: 'আগামীকাল' },
  'Day 3': { te: '3వ రోజు', hi: 'तीसरा दिन', ta: '3-ஆம் நாள்', kn: 'ದಿನ 3', mr: 'दिवस 3', pa: 'ਦਿਨ 3', bn: 'দিন ৩' },
  'Day 4': { te: '4వ రోజు', hi: 'चौथा दिन', ta: '4-ஆம் நாள்', kn: 'ದಿನ 4', mr: 'दिवस 4', pa: 'ਦਿਨ 4', bn: 'দিন ৪' },
  'Day 5': { te: '5వ రోజు', hi: '5వ రోజు', ta: '5-ஆம் நாள்', kn: 'ದಿನ 5', mr: 'दिवस 5', pa: 'ਦਿਨ 5', bn: 'দিন ৫' },
  'Day 6': { te: '6వ రోజు', hi: 'छठा दिन', ta: '6-ஆம் நாள்', kn: 'ದಿನ 6', mr: 'दिवस 6', pa: 'ਦਿਨ 6', bn: 'দিন ৬' },
  'Day 7': { te: '7వ రోజు', hi: 'सातवां दिन', ta: '7-ஆம் நாள்', kn: 'ದಿನ 7', mr: 'दिवस 7', pa: 'ਦਿਨ 7', bn: 'দিন ৭' },

  // Weather Risk Reasons & Advisories
  'Optimal atmospheric humidity and moderate temperatures.': {
    te: 'అనుకూలమైన వాతావరణ తేమ మరియు మధ్యస్థ ఉష్ణోగ్రతలు.',
    hi: 'अनुकूल वायुमंडलीय आर्द्रता और मध्यम तापमान।',
    ta: 'சாதகமான வளிமண்டல ஈரப்பதம் மற்றும் மிதமான வெப்பநிலை.',
    kn: 'ಅನುಕೂಲಕರ ವಾತಾವರಣದ ತೇವಾಂಶ ಮತ್ತು ಮಧ್ಯಮ ತಾಪಮಾನ.',
    mr: 'अनुकूल वातावरणातील आर्द्रता आणि मध्यम तापमान.',
    pa: 'ਅਨੁਕੂਲ ਵਾਯੂਮੰਡਲੀ ਨਮੀ ਅਤੇ ਦਰਮਿਆਨਾ ਤਾਪਮਾਨ।',
    bn: 'অনুকূল বায়ুমণ্ডলীয় আর্দ্রতা এবং মাঝারি তাপমাত্রা।'
  },
  'Continue routine crop care.': {
    te: 'సాధారణ పంట సంరక్షణ చర్యలను కొనసాగించండి.',
    hi: 'सामान्य फसल देखभाल कार्य जारी रखें।',
    ta: 'வழக்கமான பயிர் பராமரிப்பைத் தொடரவும்.',
    kn: 'ಸಾಮಾನ್ಯ ಬೆಳೆ ಆರೈಕೆಯನ್ನು ಮುಂದುವರಿಸಿ.',
    mr: 'नेहमीची पीक काळजी सुरू ठेवा.',
    pa: 'ਆਮ ਫ਼ਸਲ ਸੰਭਾਲ ਜਾਰੀ ਰੱਖੋ।',
    bn: 'স্বাভাবিক ফসল পরিচর্যা চালিয়ে যান।'
  },
  'Favorable weather window for field scouting and normal agricultural operations.': {
    te: 'పొలంలో తనిఖీలు మరియు సాధారణ వ్యవసాయ పనులకు అనుకూలమైన వాతావరణ సమయం.',
    hi: 'खेत के निरीक्षण और सामान्य कृषि कार्यों के लिए अनुकूल मौसम।',
    ta: 'பண்ணை ஆய்வு மற்றும் வழக்கமான விவசாய பணிகளுக்கு சாதகமான வானிலை.',
    kn: 'ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಾಮಾನ್ಯ ಕೃಷಿ ಕೆಲಸಗಳಿಗೆ ಅನುಕೂಲಕರ ಹವಾಮಾನ.',
    mr: 'शेताची पाहणी आणि सामान्य शेतीकामांसाठी अनुकूल हवामान.',
    pa: 'ਖੇਤ ਦੇ ਨਿਰੀਖਣ ਅਤੇ ਆਮ ਖੇਤੀ ਕੰਮਾਂ ਲਈ ਅਨੁਕੂਲ ਮੌਸਮ।',
    bn: 'জমি পরিদর্শন এবং স্বাভাবিক কৃষি কাজের জন্য অনুকূল আবহাওয়া।'
  },

  // Common UI Headings & Phrases
  'Take Control of Your Farm Data': {
    te: 'మీ పొలం డేటాపై పూర్తి నియంత్రణ',
    hi: 'अपने कृषि डेटा पर पूरा नियंत्रण',
    ta: 'உங்கள் பண்ணை தரவு உங்கள் கைகளில்',
    kn: 'ನಿಮ್ಮ ಕೃಷಿ ಡೇಟಾದ ಮೇಲೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ',
    mr: 'आपल्या शेतीच्या डेटावर पूर्ण नियंत्रण',
    pa: 'ਆਪਣੇ ਖੇਤੀ ਡਾਟਾ ਤੇ ਪੂਰਾ ਕੰਟਰੋਲ',
    bn: 'আপনার খামারের ডেটার ওপর পূর্ণ নিয়ন্ত্রণ'
  },
  'Download a copy of your diagnostic history or wipe all data permanently.': {
    te: 'మీ వ్యాధి నిర్ధారణ చరిత్ర కాపీని డౌన్‌లోడ్ చేయండి లేదా డేటాను శాశ్వతంగా తొలగించండి.',
    hi: 'अपने निदान इतिहास की प्रति डाउनलोड करें या सारा डेटा हमेशा के लिए मिटाएं।',
    ta: 'உங்கள் நோய் கண்டறிதல் வரலாற்றைப் பதிவிறக்கவும் அல்லது நிரந்தரமாக அழிக்கவும்.',
    kn: 'ನಿಮ್ಮ ರೋಗ ಪತ್ತೆ ಇತಿಹಾಸವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿ.',
    mr: 'आपल्या रोग निदान इतिहासाची प्रत डाउनलोड करा किंवा डेटा कायमचा पुसा.',
    pa: 'ਆਪਣੇ ਰੋਗ ਜਾਂਚ ਇਤਿਹਾਸ ਦੀ ਕਾਪੀ ਡਾਊਨਲੋਡ ਕਰੋ ਜਾਂ ਡਾਟਾ ਸਦਾ ਲਈ ਮਿਟਾਓ।',
    bn: 'আপনার রোগ নির্ণয়ের ইতিহাসের কপি ডাউনলোড করুন বা স্থায়ীভাবে মুছে ফেলুন।'
  },
  'Export My Data (JSON)': {
    te: 'నా డేటాను ఎగుమతి చేయండి (JSON)',
    hi: 'मेरा डेटा डाउनलोड करें (JSON)',
    ta: 'என் தரவைப் பதிவிறக்கு (JSON)',
    kn: 'ನನ್ನ ಡೇಟಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (JSON)',
    mr: 'माझा डेटा डाउनलोड करा (JSON)',
    pa: 'ਮੇਰਾ ਡਾਟਾ ਡਾਊਨਲੋਡ ਕਰੋ (JSON)',
    bn: 'আমার ডেটা ডাউনলোড করুন (JSON)'
  },
  'Delete All My Records': {
    te: 'నా రికార్డులన్నీ తొలగించండి',
    hi: 'मेरे सारे रिकॉर्ड मिटाएं',
    ta: 'என் அனைத்து பதிவுகளையும் அழி',
    kn: 'ನನ್ನ ಎಲ್ಲ ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಿ',
    mr: 'माझ्या सर्व नोंदी मिटवा',
    pa: 'ਮੇਰੇ ਸਾਰੇ ਰਿਕਾਰਡ ਮਿਟਾਓ',
    bn: 'আমার সব রেকর্ড মুছে ফেলুন'
  },
  'Verified Policy': {
    te: 'ధృవీకరించబడిన విధానం',
    hi: 'सत्यापित नीति',
    ta: 'சரிபார்க்கப்பட்ட கொள்கை',
    kn: 'ಪರಿಶೀಲಿಸಿದ ನೀತಿ',
    mr: 'सत्यापित धोरण',
    pa: 'ਪ੍ਰਮਾਣਿਤ ਨੀਤੀ',
    bn: 'যাচাইকৃত নীতি'
  },
  'Key Policy Benefits:': {
    te: 'ప్రధాన పాలసీ ప్రయోజనాలు:',
    hi: 'प्रमुख पॉलिसी लाभ:',
    ta: 'முக்கிய பாலிசி நன்மைகள்:',
    kn: 'ಪ್ರಮುಖ ಪಾಲಿಸಿ ಪ್ರಯೋಜನಗಳು:',
    mr: 'प्रमुख पॉलिसी फायदे:',
    pa: 'ਮੁੱਖ ਪਾਲਿਸੀ ਲਾਭ:',
    bn: 'প্রধান পলিসি সুবিধাসমূহ:'
  },
  'Eligibility & Enrollment:': {
    te: 'అర్హత & నమోదు:',
    hi: 'पात्रता एवं नामांकन:',
    ta: 'தகுதி மற்றும் சேர்க்கை:',
    kn: 'ಅರ್ಹತೆ ಮತ್ತು ನೋಂದಣಿ:',
    mr: 'पात्रता आणि नोंदणी:',
    pa: 'ਯੋਗਤਾ ਅਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ:',
    bn: 'যোগ্যতা ও নিবন্ধন:'
  },
  'Recommended Action Sequence:': {
    te: 'సిఫార్సు చేయబడిన చర్యల క్రమం:',
    hi: 'अनुशंसित कार्रवाई क्रम:',
    ta: 'பரிந்துரைக்கப்பட்ட நடவடிக்கை வரிசை:',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳ ಅನುಕ್ರಮ:',
    mr: 'शिफारस केलेला कृती क्रम:',
    pa: 'ਸਿਫਾਰਸ਼ ਕੀਤਾ ਕਾਰਵਾਈ ਕ੍ਰਮ:',
    bn: 'প্রস্তাবিত পদক্ষেপের ক্রম:'
  },
  'Toll-Free Verified Hotline': {
    te: 'ధృవీకరించబడిన టోల్-ఫ్రీ హాట్‌లైన్',
    hi: 'सत्यापित टोल-फ्री हॉटलाइन',
    ta: 'சரிபார்க்கப்பட்ட கட்டணமில்லா எண்',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಟೋಲ್-ಫ್ರೀ ಸಹಾಯವಾಣಿ',
    mr: 'सत्यापित टोल-फ्री हेल्पलाइन',
    pa: 'ਪ੍ਰਮਾਣਿਤ ਟੋਲ-ਫ੍ਰੀ ਹੈਲਪਲਾਈਨ',
    bn: 'যাচাইকৃত টোল-ফ্রি হেল্পলাইন'
  },
  'Call Toll-Free': {
    te: 'ఉచిత కాల్ చేయండి',
    hi: 'टोल-फ्री कॉल करें',
    ta: 'இலவச அழைப்பு',
    kn: 'ಟೋಲ್-ಫ್ರೀ ಕರೆ ಮಾಡಿ',
    mr: 'टोल-फ्री कॉल करा',
    pa: 'ਟੋਲ-ਫ੍ਰੀ ਕਾਲ ਕਰੋ',
    bn: 'টোল-ফ্রি কল করুন'
  },
  'WhatsApp Help': {
    te: 'వాట్సాప్ సహాయం',
    hi: 'व्हाट्सएप सहायता',
    ta: 'வாட்ஸ்அப் உதவி',
    kn: 'ವಾಟ್ಸಾಪ್ ಸಹಾಯ',
    mr: 'व्हॉट्सअॅप मदत',
    pa: 'ਵਟਸਐਪ ਸਹਾਇਤਾ',
    bn: 'হোয়াটসঅ্যাপ সহায়তা'
  },
  'Take Action': {
    te: 'చర్య తీసుకోండి',
    hi: 'कार्रवाई करें',
    ta: 'நடவடிக்கை எடுங்கள்',
    kn: 'ಕ್ರಮ ಕೈಗೊಳ್ಳಿ',
    mr: 'कृती करा',
    pa: 'ਕਾਰਵਾਈ ਕਰੋ',
    bn: 'পদক্ষেপ নিন'
  },
  'Join Live Webinar': {
    te: 'లైవ్ వెబినార్‌లో చేరండి',
    hi: 'लाइव वेबिनार में शामिल हों',
    ta: 'நேரலை வெபினாரில் சேருங்கள்',
    kn: 'ಲೈವ್ ವೆಬಿನಾರ್‌ನಲ್ಲಿ ಭಾಗವಹಿಸಿ',
    mr: 'थेट वेबिनारमध्ये सामील व्हा',
    pa: 'ਲਾਈਵ ਵੈਬੀਨਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    bn: 'লাইভ ওয়েবিনারে যোগ দিন'
  },
  'Register Online Free': {
    te: 'ఉచితంగా నమోదు చేయండి',
    hi: 'मुफ्त ऑनलाइन पंजीकरण',
    ta: 'இலவசமாக பதிவு செய்க',
    kn: 'ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿ',
    mr: 'मोफत ऑनलाइन नोंदणी',
    pa: 'ਮੁਫ਼ਤ ਆਨਲਾਈਨ ਰਜਿਸਟਰ ਕਰੋ',
    bn: 'বিনামূল্যে নিবন্ধন করুন'
  },
  'View Full Treatment Report': {
    te: 'పూర్తి చికిత్స నివేదిక చూడండి',
    hi: 'पूरी उपचार रिपोर्ट देखें',
    ta: 'முழு சிகிச்சை அறிக்கை பார்க்க',
    kn: 'ಸಂಪೂರ್ಣ ಚಿಕಿತ್ಸಾ ವರದಿ ವೀಕ್ಷಿಸಿ',
    mr: 'पूर्ण उपचार अहवाल पहा',
    pa: 'ਪੂਰੀ ਰਿਪੋਰਟ ਦੇਖੋ',
    bn: 'সম্পূর্ণ রিপোর্ট দেখুন'
  },
  'Check Another Leaf': {
    te: 'మరొక ఆకు తనిఖీ చేయండి',
    hi: 'दूसरी पत्ती जांचें',
    ta: 'மற்றொரு இலையை சோதிக்க',
    kn: 'ಇನ್ನೊಂದು ಎಲೆ ತಪಾಸಣೆ ಮಾಡಿ',
    mr: 'दुसरे पान तपासा',
    pa: 'ਹੋਰ ਪੱਤਾ ਜਾਂਚੋ',
    bn: 'অন্য পাতা পরীক্ষা করুন'
  },
  'Scan Leaf Now': {
    te: 'ఇప్పుడే ఆకు స్కాన్ చేయండి',
    hi: 'अभी पत्ती स्कैन करें',
    ta: 'இப்போதே இலையை ஸ்கேன் செய்க',
    kn: 'ಈಗಲೇ ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    mr: 'आत्ताच पान स्कॅन करा',
    pa: 'ਹੁਣੇ ਪੱਤਾ ਸਕੈਨ ਕਰੋ',
    bn: 'এখনই পাতা স্ক্যান করুন'
  },
  'View Forecast': {
    te: 'వాతావరణ సూచన చూడండి',
    hi: 'पूर्वानुमान देखें',
    ta: 'வானிலை முன்னறிவிப்பு பார்க்க',
    kn: 'ಮುನ್ಸೂಚನೆ ವೀಕ್ಷಿಸಿ',
    mr: 'हवामान अंदाज पहा',
    pa: 'ਪੂਰਵ-ਅਨੁਮਾਨ ਦੇਖੋ',
    bn: 'পূর্বাভাস দেখুন'
  },
  'View Report': {
    te: 'నివేదిక చూడండి',
    hi: 'रिपोर्ट देखें',
    ta: 'அறிக்கையைப் பார்க்க',
    kn: 'ವರದಿ ವೀಕ್ಷಿಸಿ',
    mr: 'अहवाल पहा',
    pa: 'ਰਿਪੋਰਟ ਦੇਖੋ',
    bn: 'রিপোর্ট দেখুন'
  },
  'Upload Leaf Photo': {
    te: 'ఆకు ఫోటో అప్‌లోడ్ చేయండి',
    hi: 'पत्ती की फोटो अपलोड करें',
    ta: 'இலை புகைப்படத்தை பதிவேற்றவும்',
    kn: 'ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    mr: 'पानाचा फोटो अपलोड करा',
    pa: 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
    bn: 'পাতার ছবি আপলোড করুন'
  },
  'New Diagnosis': {
    te: 'కొత్త నిర్ధారణ',
    hi: 'नया निदान',
    ta: 'புதிய பரிசோதனை',
    kn: 'ಹೊಸ ರೋಗ ಪತ್ತೆ',
    mr: 'नवीन निदान',
    pa: 'ਨਵੀਂ ਜਾਂਚ',
    bn: 'নতুন পরীক্ষা'
  },
  'Clear Logs': {
    te: 'లాగ్‌లను తొలగించు',
    hi: 'लॉग हटाएं',
    ta: 'பதிவுகளை அழி',
    kn: 'ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಿ',
    mr: 'नोंदी मिटवा',
    pa: 'ਰਿਕਾਰਡ ਹਟਾਓ',
    bn: 'লগ মুছুন'
  },

  // Disease Diagnosis Steps & Symptoms
  'Spindle-shaped or diamond-shaped spots on leaves': {
    te: 'ఆకులపై కండె ఆకారపు లేదా వజ్రపు ఆకారపు మచ్చలు',
    hi: 'पत्तियों पर तकली के आकार के या नुकीले धब्बे',
    ta: 'இலைகளில் கதிர் வடிவிலான அல்லது வைர வடிவ புள்ளிகள்',
    kn: 'ಎಲೆಗಳ ಮೇಲೆ ಕದಿರಿನ ಅಥವಾ ವಜ್ರಾಕಾರದ ಕಲೆಗಳು',
    mr: 'पानांवर बदामाच्या किंवा लांबट आकाराचे ठिपके',
    pa: 'ਪੱਤਿਆਂ ਤੇ ਤੱਕਲੇ ਵਰਗੇ ਜਾਂ ਤਿੱਖੇ ਧੱਬੇ',
    bn: 'পাতায় মাকু আকৃতির বা হীরকাকৃতির দাগ'
  },
  'Lesions with reddish-brown margins and gray or white centers': {
    te: 'ఎరుపు-గోధుమ రంగు అంచులు మరియు బూడిద లేదా తెలుపు రంగు కేంద్రాలు కలిగిన మచ్చలు',
    hi: 'लाल-भूरे किनारों और धूसर या सफेद केंद्र वाले धब्बे',
    ta: 'சிவப்பு-பழுப்பு விளிம்புகள் மற்றும் சாம்பல் அல்லது வெள்ளை மையத்துடன் கூடிய தழும்புகள்',
    kn: 'ಕೆಂಪು-ಕಂದು ಅಂಚುಗಳು ಮತ್ತು ಬೂದು ಅಥವಾ ಬಿಳಿ ಕೇಂದ್ರವನ್ನು ಹೊಂದಿರುವ ಕಲೆಗಳು',
    mr: 'लालसर-तपकिरी कडा आणि राखाडी किंवा पांढरा मध्यभाग असलेले व्रण',
    pa: 'ਲਾਲ-ਭੂਰੇ ਕਿਨਾਰੇ ਅਤੇ ਸਲੇਟੀ ਜਾਂ ਚਿੱਟੇ ਕੇਂਦਰ ਵਾਲੇ ਧੱਬੇ',
    bn: 'লালচে-বাদামী কিনারা এবং ধূসর বা সাদা কেন্দ্রযুক্ত ক্ষত'
  },
  'Yellowing around lesions causing leaf tip drying': {
    te: 'మచ్చల చుట్టూ పసుపు రంగు మారి ఆకు కొనలు ఎండిపోవడం',
    hi: 'धब्बों के चारों ओर पीलापन जिससे पत्ती की नोक सूखती है',
    ta: 'புள்ளிகளைச் சுற்றி மஞ்சள் நிறமாகி இலை நுனி காய்ந்து போதல்',
    kn: 'ಕಲೆಗಳ ಸುತ್ತ ಹಳದಿಯಾಗುವುದು ಮತ್ತು ಎಲೆಯ ತುದಿಯು ಒಣಗುವುದು',
    mr: 'ठिपक्यांभोवती पिवळेपणा येऊन पानांचे टोक सुकणे',
    pa: 'ਧੱਬਿਆਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਪੀਲਾਪਣ ਜਿਸ ਨਾਲ ਪੱਤੇ ਦਾ ਸਿਰਾ ਸੁੱਕਦਾ ਹੈ',
    bn: 'দাগের চারপাশে হলুদ হয়ে পাতার ডগা শুকিয়ে যাওয়া'
  },
  'Immediate Fungicide Application': {
    te: 'తక్షణ శిలీంధ్ర సంహారక మందు పిచికారీ',
    hi: 'तत्काल फफूंदनाशक का छिड़काव',
    ta: 'உடனடி பூஞ்சைக் கொல்லி தெளிப்பு',
    kn: 'ತಕ್ಷಣದ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆ',
    mr: 'त्वरित बुरशीनाशकाची फवारणी',
    pa: 'ਤੁਰੰਤ ਉੱਲੀਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ',
    bn: 'তাৎক্ষণিক ছত্রাকনাশক স্প্রে'
  },
  'Adjust Nitrogen Fertilizer Usage': {
    te: 'నత్రజని ఎరువుల వాడకాన్ని తగ్గించండి',
    hi: 'नाइट्रोजन उर्वरक का उपयोग संतुलित करें',
    ta: 'நைட்ரஜன் உர பயன்பாட்டை சரிசெய்க',
    kn: 'ಸಾರಜನಕ ಗೊಬ್ಬರದ ಬಳಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ',
    mr: 'नायट्रोजन खतांचा वापर नियंत्रित करा',
    pa: 'ਨਾਈਟ੍ਰੋਜਨ ਖਾਦ ਦੀ ਵਰਤੋਂ ਘਟਾਓ',
    bn: 'নাইট্রোজেন সারের ব্যবহার সামঞ্জস্য করুন'
  },
  'Drain Field Excess Water': {
    te: 'పొలంలోని అదనపు నీటిని బయటకు తీయండి',
    hi: 'खेत से अतिरिक्त पानी निकालें',
    ta: 'வயலில் தேங்கியுள்ள அதிகப்படியான நீரை வடிக்கவும்',
    kn: 'ಹೊಲದಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಹೊರಹಾಕಿ',
    mr: 'शेतातील अतिरिक्त पाणी काढून टाका',
    pa: 'ਖੇਤ ਵਿੱਚੋਂ ਵਾਧੂ ਪਾਣੀ ਬਾਹਰ ਕੱਢੋ',
    bn: 'জমি থেকে অতিরিক্ত জল নিষ্কাশন করুন'
  },
  'Organic Bio-Control Application': {
    te: 'సేంద్రీయ జీవ నియంత్రణ మందుల వాడకం',
    hi: 'जैविक बायो-कंट्रोल का छिड़काव',
    ta: 'இயற்கை உயிரியல் கட்டுப்பாடு பயன்பாடு',
    kn: 'ಸಾವಯವ ಜೈವಿಕ ನಿಯಂತ್ರಣ ಸಿಂಪಡಣೆ',
    mr: 'सेंद्रिय जैविक बुरशीनाशकाचा वापर',
    pa: 'ਜੈਵਿਕ ਬਾਇਓ-ਕੰਟਰੋਲ ਦੀ ਵਰਤੋਂ',
    bn: 'জৈব বালাইনাশক প্রয়োগ'
  },
  'Prune Infected Lower Leaves': {
    te: 'రోగం సోకిన క్రింది ఆకులను కత్తిరించండి',
    hi: 'संक्रमित निचली पत्तियों की छंटाई करें',
    ta: 'பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி அகற்றவும்',
    kn: 'ಸೋಂಕಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೆಗೆಯಿರಿ',
    mr: 'संसर्ग झालेली खालची पाने कापून टाका',
    pa: 'ਬਿਮਾਰੀ ਵਾਲੇ ਹੇਠਲੇ ਪੱਤਿਆਂ ਦੀ ਕਟਾਈ ਕਰੋ',
    bn: 'আক্রান্ত নিচের পাতাগুলো ছাঁটাই করুন'
  },
  'Fungicide Foliar Spray': {
    te: 'శిలీంధ్ర సంహారక ఆకుల పిచికారీ',
    hi: 'पत्तियों पर फफूंदनाशक का छिड़काव',
    ta: 'பூஞ்சைக் கொல்லி இலைவழி தெளிப்பு',
    kn: 'ಶಿಲೀಂಧ್ರನಾಶಕ ಎಲೆಗಳ ಸಿಂಪಡಣೆ',
    mr: 'बुरशीनाशक फवारणी',
    pa: 'ਪੱਤਿਆਂ ਤੇ ਉੱਲੀਨਾਸ਼ਕ ਛਿੜਕਾਅ',
    bn: 'পাতায় ছত্রাকনাশক স্প্রে'
  },
  'Apply Soil Mulching': {
    te: 'నేల పైభాగాన మల్చింగ్ వేయండి',
    hi: 'मिट्टी पर मल्चिंग का प्रयोग करें',
    ta: 'மண்ணில் மூடாக்கு இடவும்',
    kn: 'ಮಣ್ಣಿಗೆ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಹಾಕಿ',
    mr: 'मातीवर आच्छादन (मल्चिंग) करा',
    pa: 'ਮਿੱਟੀ ਤੇ ਮਲਚਿੰਗ ਕਰੋ',
    bn: 'মাটিতে মালচিং প্রয়োগ করুন'
  },
  'Immediate Isolation': {
    te: 'తక్షణమే వేరుచేయడం',
    hi: 'तत्काल पृथक्करण (आइसोलेशन)',
    ta: 'உடனடி தனிமைப்படுத்தல்',
    kn: 'ತಕ್ಷಣದ ಪ್ರತ್ಯೇಕತೆ',
    mr: 'त्वरित विलग करणे',
    pa: 'ਤੁਰੰਤ ਵੱਖਰਾ ਕਰਨਾ',
    bn: 'তাৎক্ষণিক বিচ্ছিন্নকরণ'
  },
  'Remove and destroy severely affected leaves.': {
    te: 'తీవ్రంగా దెబ్బతిన్న ఆకులను తొలగించి నాశనం చేయండి.',
    hi: 'गंभीर रूप से प्रभावित पत्तियों को तोड़कर नष्ट कर दें।',
    ta: 'கடுமையாக பாதிக்கப்பட்ட இலைகளை அகற்றி அழிக்கவும்.',
    kn: 'ತೀವ್ರವಾಗಿ ಬಾಧಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ.',
    mr: 'तीव्र बाधित पाने तोडून नष्ट करा.',
    pa: 'ਗੰਭੀਰ ਰੂਪ ਵਿੱਚ ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ ਨੂੰ ਹਟਾ ਕੇ ਨਸ਼ਟ ਕਰੋ।',
    bn: 'মারাত্মকভাবে আক্রান্ত পাতাগুলি সরিয়ে ধ্বংস করুন।'
  },

  // Online Crop Insurance Schemes
  'Pradhan Mantri Fasal Bima Yojana (PMFBY)': {
    te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)',
    hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    ta: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY)',
    mr: 'प्रधानमंत्री पीक विमा योजना (PMFBY)',
    pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY)',
    bn: 'প্রধানমন্ত্রী ফসল বীমা যোজনা (PMFBY)'
  },
  'Comprehensive Crop Insurance against Non-Preventable Natural Risks': {
    te: 'నివారించలేని సహజ విపత్తుల నుండి సమగ్ర పంట బీమా రక్షణ',
    hi: 'प्राकृतिक आपदाओं और गैर-रोकथाम योग्य जोखिमों के खिलाफ व्यापक फसल बीमा',
    ta: 'இயற்கை இடர்களுக்கு எதிரான விரிவான பயிர் காப்பீடு',
    kn: 'ತಡೆಯಲಾಗದ ನೈಸರ್ಗಿಕ ಅಪಾಯಗಳಿಂದ ಸಮಗ್ರ ಬೆಳೆ ವಿಮೆ',
    mr: 'अनैसर्गिक आपत्तींपासून सर्वसमावेशक पीक विमा संरक्षण',
    pa: 'ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਵਿਰੁੱਧ ਵਿਆਪਕ ਫ਼ਸਲ ਬੀਮਾ',
    bn: 'প্রাকৃতিক দুর্যোগের বিরুদ্ধে ব্যাপক ফসল বীমা'
  },
  'Restructured Weather Based Crop Insurance Scheme (WBCIS)': {
    te: 'పునర్నిర్మిత వాతావరణ ఆధారిత పంట బీమా పథకం (WBCIS)',
    hi: 'पुनर्गठित मौसम आधारित फसल बीमा योजना (WBCIS)',
    ta: 'வானிலை அடிப்படையிலான பயிர் காப்பீட்டுத் திட்டம் (WBCIS)',
    kn: 'ಹವಾಮಾನ ಆಧಾರಿತ ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ (WBCIS)',
    mr: 'पुनर्रचित हवामान आधारित पीक विमा योजना (WBCIS)',
    pa: 'ਮੌਸਮ ਅਧਾਰਤ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (WBCIS)',
    bn: 'আবহাওয়া ভিত্তিক ফসল বীমা যোজনা (WBCIS)'
  },
  'Index-Based Insurance Mitigating Adverse Climate Weather Triggers': {
    te: 'ప్రతికూల వాతావరణ హెచ్చుతగ్గుల నుండి సూచిక ఆధారిత రక్షణ',
    hi: 'प्रतिकूल मौसम के प्रभावों से बचाने वाला इंडेक्स-आधारित बीमा',
    ta: 'வானிலை மாற்றங்களால் ஏற்படும் இழப்புகளுக்கான குறியீட்டு காப்பீடு',
    kn: 'ಪ್ರತಿಕೂಲ ಹವಾಮಾನದಿಂದ ರಕ್ಷಿಸುವ ಸೂಚ್ಯಂಕ ಆಧಾರಿತ ವಿಮೆ',
    mr: 'प्रतिकूल हवामान धोक्यांपासून संरक्षण देणारा निर्देशांक आधारित विमा',
    pa: 'ਖ਼ਰਾਬ ਮੌਸਮ ਤੋਂ ਬਚਾਅ ਲਈ ਇੰਡੈਕਸ-ਅਧਾਰਤ ਬੀਮਾ',
    bn: 'প্রতিকূল আবহাওয়ার ক্ষতি থেকে সূচক ভিত্তিক বীমা'
  },
  'Unified Package Insurance Scheme (UPIS)': {
    te: 'యూనిఫైడ్ ప్యాకేజీ ఇన్సూరెన్స్ స్కీమ్ (UPIS)',
    hi: 'एकीकृत पैकेज बीमा योजना (UPIS)',
    ta: 'ஒருங்கிணைந்த தொகுப்பு காப்பீட்டுத் திட்டம் (UPIS)',
    kn: 'ಸಂಯೋಜಿತ ಪ್ಯಾಕೇಜ್ ವಿಮಾ ಯೋಜನೆ (UPIS)',
    mr: 'एकीकृत पॅकेज विमा योजना (UPIS)',
    pa: 'ਯੂਨੀਫਾਈਡ ਪੈਕੇਜ ਬੀਮਾ ਯੋਜਨਾ (UPIS)',
    bn: 'একত্রিত প্যাকেজ বীমা যোজনা (UPIS)'
  },
  'Single-Window Comprehensive Financial Protection for Farm Household & Assets': {
    te: 'రైతు కుటుంబం మరియు వ్యవసాయ ఆస్తులకు ఒకే వేదికపై పూర్తి ఆర్థిక రక్షణ',
    hi: 'किसान परिवार और कृषि संपत्तियों के लिए एकल-खिड़की व्यापक वित्तीय सुरक्षा',
    ta: 'விவசாய குடும்பம் மற்றும் சொத்துக்களுக்கான ஒற்றை சாளர நிதி பாதுகாப்பு',
    kn: 'ರೈತ ಕುಟುಂಬ ಮತ್ತು ಆಸ್ತಿಗಳಿಗೆ ಏಕ-ಗವಾಕ್ಷಿ ಸಮಗ್ರ ಆರ್ಥಿಕ ರಕ್ಷಣೆ',
    mr: 'शेतकरी कुटुंब आणि शेती मालमत्तेसाठी सर्वसमावेशक आर्थिक सुरक्षा',
    pa: 'ਕਿਸਾਨ ਪਰਿਵਾਰ ਅਤੇ ਖੇਤੀ ਸੰਪਤੀ ਲਈ ਇਕਹਿਰੀ ਵਿੱਤੀ ਸੁਰੱਖਿਆ',
    bn: 'কৃষক পরিবার ও খামারের সম্পদের জন্য একক আর্থিক সুরক্ষা'
  },
  'Full sum insured coverage with zero ceiling on government premium subsidy': {
    te: 'ప్రభుత్వ సబ్సిడీ పరిమితి లేకుండా పూర్తి బీమా మొత్తం రక్షణ',
    hi: 'सरकारी सब्सिडी पर बिना किसी सीमा के पूर्ण बीमा राशि का कवरेज',
    ta: 'அரசு மானிய உச்சவரம்பு இல்லாமல் முழு காப்பீட்டுத் தொகை',
    kn: 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಮಿತಿ ಇಲ್ಲದೆ ಪೂರ್ಣ ವಿಮಾ ಮೊತ್ತದ ರಕ್ಷಣೆ',
    mr: 'सरकारी अनुदानावर कोणतीही मर्यादा न ठेवता पूर्ण विमा संरक्षण',
    pa: 'ਸਰਕਾਰੀ ਸਬਸਿਡੀ ਦੀ ਬਿਨਾਂ ਸੀਮਾ ਦੇ ਪੂਰਾ ਬੀਮਾ ਕਵਰੇਜ',
    bn: 'সরকারি ভর্তুকির সীমা ছাড়াই সম্পূর্ণ বীমা কভারেজ'
  },
  'Post-harvest loss coverage up to 14 days for un-housed crops in field': {
    te: 'కోత అనంతరం పొలంలో ఉన్న పంటకు 14 రోజుల వరకు నష్టపరిహారం',
    hi: 'कटाई के बाद खेत में रखी फसल के लिए 14 दिनों तक नुकसान का मुआवजा',
    ta: 'அறுவடைக்குப் பின் வயலில் உள்ள பயிர்களுக்கு 14 நாட்கள் வரை இழப்பீடு',
    kn: 'ಕೊಯ್ಲಿನ ನಂತರ ಹೊಲದಲ್ಲಿರುವ ಬೆಳೆಗೆ 14 ದಿನಗಳವರೆಗೆ ನಷ್ಟ ಪರಿಹಾರ',
    mr: 'कापणीनंतर शेतात ठेवलेल्या पिकासाठी 14 दिवसांपर्यंत नुकसान भरपाई',
    pa: 'ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਖੇਤ ਵਿਚਲੀ ਫ਼ਸਲ ਲਈ 14 ਦਿਨਾਂ ਤੱਕ ਮੁਆਵਜ਼ਾ',
    bn: 'ফসল তোলার পর জমিতে থাকা ফসলের জন্য ১৪ দিন পর্যন্ত ক্ষতিপূরণ'
  },
  'Mid-season adversity coverage for widespread drought or localized floods': {
    te: 'తీవ్ర కరవు లేదా వరదల సమయంలో మధ్యంతర నష్టపరిహార రక్షణ',
    hi: 'सूखे या अत्यधिक बाढ़ के समय मध्य-सत्र आपदा कवरेज',
    ta: 'வறட்சி அல்லது வெள்ளத்தின் போது இடைக்கால இழப்பீட்டுப் பாதுகாப்பு',
    kn: 'ಬರಗಾಲ ಅಥವಾ ಪ್ರವಾಹದ ಸಮಯದಲ್ಲಿ ಮಧ್ಯಂತರ ನಷ್ಟ ಪರಿಹಾರ ರಕ್ಷಣೆ',
    mr: 'दुष्काळ किंवा महापुराच्या वेळी हंगाम-मध्य नुकसान भरपाई',
    pa: 'ਸੋਕੇ ਜਾਂ ਹੜ੍ਹ ਦੌਰਾਨ ਸੀਜ਼ਨ ਵਿਚਕਾਰ ਮੁਆਵਜ਼ਾ',
    bn: 'খরা বা বন্যার সময় মৌসুমের মাঝামাঝি ক্ষতিপূরণ'
  },

  // Online Helplines
  'Kisan Call Center (KCC) - Govt of India': {
    te: 'కిసాన్ కాల్ సెంటర్ (KCC) - భారత ప్రభుత్వం',
    hi: 'किसान कॉल सेंटर (KCC) - भारत सरकार',
    ta: 'கிசான் கால் சென்டர் (KCC) - இந்திய அரசு',
    kn: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (KCC) - ಭಾರತ ಸರ್ಕಾರ',
    mr: 'किसान कॉल सेंटर (KCC) - भारत सरकार',
    pa: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ (KCC) - ਭਾਰਤ ਸਰਕਾਰ',
    bn: 'কিসান কল সেন্টার (KCC) - ভারত সরকার'
  },
  'ICAR Plant Pathology & Crop Protection Advisory': {
    te: 'ICAR పంటల వ్యాధి నిర్ధారణ & సంరక్షణ సలహా విభాగం',
    hi: 'आईसीएआर पादप रोग विज्ञान एवं फसल सुरक्षा परामर्श',
    ta: 'ICAR பயிர் நோய் மற்றும் பாதுகாப்பு ஆலோசனை',
    kn: 'ಐಸಿಎಆರ್ ಬೆಳೆ ರೋಗ ಮತ್ತು ಸಂರಕ್ಷಣಾ ಸಲಹಾ ವಿಭಾಗ',
    mr: 'आयसीएआर पीक रोग व संरक्षण सल्लागार विभाग',
    pa: 'ਆਈਸੀਏਆਰ ਫ਼ਸਲ ਰੋਗ ਅਤੇ ਸੁਰੱਖਿਆ ਸਲਾਹ',
    bn: 'আইসিএআর উদ্ভিদ রোগ ও ফসল সুরক্ষা পরামর্শ'
  },
  'Krishi Vigyan Kendra (KVK) District Emergency Network': {
    te: 'కృషి విజ్ఞాన కేంద్రం (KVK) జిల్లా అత్యవసర నెట్‌వర్క్',
    hi: 'कृषि विज्ञान केंद्र (KVK) जिला आपातकालीन नेटवर्क',
    ta: 'வேளாண் அறிவியல் மையம் (KVK) மாவட்ட அவசர நெட்வொர்க்',
    kn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಜಿಲ್ಲಾ ತುರ್ತು ನೆಟ್‌ವರ್ಕ್',
    mr: 'कृषी विज्ञान केंद्र (KVK) जिल्हा आपत्कालीन नेटवर्क',
    pa: 'ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ (KVK) ਜ਼ਿਲ੍ਹਾ ਐਮਰਜੈਂਸੀ ਨੈੱਟਵਰਕ',
    bn: 'কৃষি বিজ্ঞান কেন্দ্র (KVK) জেলা জরুরি নেটওয়ার্ক'
  },
  'PM Fasal Bima Yojana (PMFBY) Crop Loss Claim Hotline': {
    te: 'పీఎం ఫసల్ బీమా యోజన (PMFBY) పంట నష్ట దావా హాట్‌లైన్',
    hi: 'पीएम फसल बीमा योजना (PMFBY) फसल क्षति दावा हेल्पलाइन',
    ta: 'பிஎம் பயிர் காப்பீட்டு இழப்பீட்டு உதவி எண்',
    kn: 'ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ ಸಹಾಯವಾಣಿ',
    mr: 'पीएम पीक विमा नुकसान भरपाई दावा हेल्पलाइन',
    pa: 'ਪੀਐਮ ਫ਼ਸਲ ਬੀਮਾ ਨੁਕਸਾਨ ਦਾਅਵਾ ਹੈਲਪਲਾਈਨ',
    bn: 'প্রধানমন্ত্রী ফসল বীমা ক্ষতি দাবি হটলাইন'
  },

  // Online Workshops & Training
  'National Smart Paddy Disease Prevention Workshop': {
    te: 'జాతీయ వరి వ్యాధి నివారణ శిక్షణా సదస్సు',
    hi: 'राष्ट्रीय धान रोग रोकथाम कार्यशाला',
    ta: 'தேசிய நெல் நோய் தடுப்பு பயிற்சிப் பட்டறை',
    kn: 'ರಾಷ್ಟ್ರೀಯ ಭತ್ತದ ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ ಕಾರ್ಯಾಗಾರ',
    mr: 'राष्ट्रीय भात पीक रोग प्रतिबंध कार्यशाळा',
    pa: 'ਕੌਮੀ ਝੋਨਾ ਰੋਗ ਰੋਕਥਾਮ ਵਰਕਸ਼ਾਪ',
    bn: 'জাতীয় ধান রোগ প্রতিরোধ কর্মশালা'
  },
  'Organic Soil Health & Micro-Nutrient Dosing Camp': {
    te: 'సేంద్రీయ నేల ఆరోగ్యం & సూక్ష్మపోషకాల శిబిరం',
    hi: 'जैविक मृदा स्वास्थ्य एवं सूक्ष्म पोषक तत्व शिविर',
    ta: 'இயற்கை மண் வளம் & நுண்ணூட்டச்சத்து முகாம்',
    kn: 'ಸಾವಯವ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶ ಶಿಬಿರ',
    mr: 'सेंद्रिय माती आरोग्य व सूक्ष्म अन्नद्रव्य शिबिर',
    pa: 'ਜੈਵਿਕ ਮਿੱਟੀ ਸਿਹਤ ਅਤੇ ਖੁਰਾਕੀ ਤੱਤ ਕੈਂਪ',
    bn: 'জৈব মাটির স্বাস্থ্য ও অণুপোষক ক্যাম্প'
  },
  'Smart Solar Irrigation & PM-KUSUM Scheme Webinar': {
    te: 'స్మార్ట్ సోలార్ సాగునీరు & పీఎం-కుసుమ్ వెబినార్',
    hi: 'स्मार्ट सौर सिंचाई एवं पीएम-कुसुम योजना वेबिनार',
    ta: 'ஸ்மார்ட் சூரிய சக்தி பாசனம் & பிஎம்-குசும் வெபினார்',
    kn: 'ಸ್ಮಾರ್ಟ್ ಸೌರ ನೀರಾವರಿ ಮತ್ತು ಪಿಎಂ-ಕುಸುಮ್ ವೆಬಿನಾರ್',
    mr: 'स्मार्ट सौर सिंचन व पीएम-कुसुम योजना वेबिनार',
    pa: 'ਸਮਾਰਟ ਸੌਰ ਸਿੰਚਾਈ ਅਤੇ ਪੀਐਮ-ਕੁਸੁਮ ਵੈਬੀਨਾਰ',
    bn: 'স্মার্ট সৌর সেচ ও পিএম-কুসুম ওয়েবিনার'
  },
  'Wheat Stripe Rust Surveillance & Climate Resilience Summit': {
    te: 'గోధుమ పసుపు కుంకుమ తెగులు నిఘా & వ్యవసాయ సదస్సు',
    hi: 'गेहूं पीला रतुआ निगरानी एवं जलवायु लचीलापन शिखर सम्मेलन',
    ta: 'கோதுமை மஞ்சள் துரு நோய் கண்காணிப்பு மாநாடு',
    kn: 'ಗೋಧಿ ಹಳದಿ ತುಕ್ಕು ರೋಗ ಕಣ್ಗಾವಲು ಸಮ್ಮೇಳನ',
    mr: 'गहू पिवळा तांबेरा नियंत्रण व शेती परिषद',
    pa: 'ਕਣਕ ਪੀਲਾ ਰਤੂਆ ਨਿਗਰਾਨੀ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸੰਮੇਲਨ',
    bn: 'গম হলুদ মরিচা নজরদারি ও কৃষি সম্মেলন'
  },
  'Upcoming': {
    te: 'రాబోయే కార్యక్రమం',
    hi: 'आगामी',
    ta: 'வரவிருக்கும் நிகழ்வு',
    kn: 'ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮ',
    mr: 'आगामी कार्यक्रम',
    pa: 'ਆਉਣ ਵਾਲਾ ਸਮਾਗਮ',
    bn: 'আসন্ন'
  },
  'Registration Open': {
    te: 'నమోదు ప్రారంభమైంది',
    hi: 'पंजीकरण खुला है',
    ta: 'பதிவு தொடங்கப்பட்டது',
    kn: 'ನೋಂದಣಿ ಮುಕ್ತವಾಗಿದೆ',
    mr: 'नोंदणी सुरू आहे',
    pa: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਖੁੱਲ੍ਹੀ ਹੈ',
    bn: 'নিবন্ধন খোলা আছে'
  },
  'Free (Registration Required)': {
    te: 'ఉచితం (నమోదు తప్పనిసరి)',
    hi: 'मुफ़्त (पंजीकरण आवश्यक)',
    ta: 'இலவசம் (பதிவு அவசியம்)',
    kn: 'ಉಚಿತ (ನೋಂದಣಿ ಅಗತ್ಯವಿದೆ)',
    mr: 'मोफत (नोंदणी आवश्यक)',
    pa: 'ਮੁਫ਼ਤ (ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਲਾਜ਼ਮੀ)',
    bn: 'বিনামূল্যে (নিবন্ধন আবশ্যক)'
  },
  'Free Online Access': {
    te: 'ఉచిత ఆన్‌లైన్ ప్రవేశం',
    hi: 'मुफ़्त ऑनलाइन प्रवेश',
    ta: 'இலவச ஆன்லைன் அணுகல்',
    kn: 'ಉಚಿತ ಆನ್‌ಲೈನ್ ಪ್ರವೇಶ',
    mr: 'मोफत ऑनलाइन प्रवेश',
    pa: 'ਮੁਫ਼ਤ ਆਨਲਾਈਨ ਪਹੁੰਚ',
    bn: 'বিনামূল্যে অনলাইন অ্যাক্সেস'
  },
  'Free for Registered Farmers': {
    te: 'నమోదైన రైతులకు పూర్తిగా ఉచితం',
    hi: 'पंजीकृत किसानों के लिए मुफ़्त',
    ta: 'பதிவுசெய்த விவசாயிகளுக்கு இலவசம்',
    kn: 'ನೋಂದಾಯಿತ ರೈತರಿಗೆ ಉಚಿತ',
    mr: 'नोंदणीकृत शेतकऱ्यांसाठी मोफत',
    pa: 'ਰਜਿਸਟਰਡ ਕਿਸਾਨਾਂ ਲਈ ਮੁਫ਼ਤ',
    bn: 'নিবন্ধিত কৃষকদের জন্য বিনামূল্যে'
  }
};

/**
 * i18n Translation & Dynamic Content Engine
 */
class I18nService {
  static getLanguage() {
    return localStorage.getItem('krishi_lang') || 'en';
  }

  static setLanguage(langCode) {
    localStorage.setItem('krishi_lang', langCode);
  }

  static getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Translate static UI key
   */
  static t(key, defaultText = '') {
    const lang = I18nService.getLanguage();
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return defaultText || key;
  }

  /**
   * Translate arbitrary text using entity and agricultural dictionaries
   */
  static translateText(text, targetLang = null) {
    if (!text || typeof text !== 'string') return text;
    const lang = targetLang || I18nService.getLanguage();
    if (lang === 'en') return text;

    const trimmed = text.trim();

    // 1. Direct dictionary match
    if (ENTITY_DICTIONARY[trimmed] && ENTITY_DICTIONARY[trimmed][lang]) {
      return ENTITY_DICTIONARY[trimmed][lang];
    }

    // 2. Direct translation key match
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][trimmed]) {
      return TRANSLATIONS[lang][trimmed];
    }

    // 3. Substring replacement for known agricultural & status phrases
    let translated = text;
    let changed = false;
    for (const [enTerm, transMap] of Object.entries(ENTITY_DICTIONARY)) {
      if (transMap[lang] && translated.includes(enTerm)) {
        translated = translated.replaceAll(enTerm, transMap[lang]);
        changed = true;
      }
    }

    return changed ? translated : text;
  }

  /**
   * Deeply translate online data returned from the backend (weather, diagnosis, recommendations, etc.)
   */
  static translateOnlineData(data, type) {
    if (!data) return data;
    const lang = I18nService.getLanguage();
    if (lang === 'en') return data;

    // Clone data to avoid mutating original
    const cloned = JSON.parse(JSON.stringify(data));

    if (type === 'weather') {
      if (cloned.data) {
        cloned.data.condition = I18nService.translateText(cloned.data.condition, lang);
        if (cloned.data.riskLevel && ENTITY_DICTIONARY[cloned.data.riskLevel]) {
          cloned.data.riskLevelDisplay = ENTITY_DICTIONARY[cloned.data.riskLevel][lang] || cloned.data.riskLevel;
        }
        cloned.data.riskReason = I18nService.translateText(cloned.data.riskReason, lang);
        cloned.data.recommendedAction = I18nService.translateText(cloned.data.recommendedAction, lang);
        cloned.data.cropHub = I18nService.translateText(cloned.data.cropHub, lang);
        cloned.data.liveSource = I18nService.translateText(cloned.data.liveSource, lang);
        if (cloned.data.forecast && Array.isArray(cloned.data.forecast)) {
          cloned.data.forecast.forEach(item => {
            item.condition = I18nService.translateText(item.condition, lang);
            item.day = I18nService.translateText(item.day, lang);
          });
        }
      }
    } else if (type === 'diagnosis') {
      cloned.crop = I18nService.translateText(cloned.crop, lang);
      cloned.disease = I18nService.translateText(cloned.disease, lang);
      if (cloned.severity && ENTITY_DICTIONARY[cloned.severity]) {
        cloned.severityDisplay = ENTITY_DICTIONARY[cloned.severity][lang] || cloned.severity;
      }
      cloned.summary = I18nService.translateText(cloned.summary, lang);
      if (Array.isArray(cloned.symptoms)) {
        cloned.symptoms = cloned.symptoms.map(s => I18nService.translateText(s, lang));
      }
      if (Array.isArray(cloned.treatments)) {
        cloned.treatments.forEach(t => {
          t.title = I18nService.translateText(t.title, lang);
          t.description = I18nService.translateText(t.description, lang);
        });
      }
      if (Array.isArray(cloned.warnings)) {
        cloned.warnings = cloned.warnings.map(w => I18nService.translateText(w, lang));
      }
      if (Array.isArray(cloned.prevention)) {
        cloned.prevention = cloned.prevention.map(p => I18nService.translateText(p, lang));
      }
      if (cloned.weatherAdvisory) {
        cloned.weatherAdvisory.recommendation = I18nService.translateText(cloned.weatherAdvisory.recommendation, lang);
        cloned.weatherAdvisory.actionTime = I18nService.translateText(cloned.weatherAdvisory.actionTime, lang);
        cloned.weatherAdvisory.sprayStatusText = I18nService.translateText(cloned.weatherAdvisory.sprayStatusText, lang);
      }
      if (cloned.spray) {
        cloned.spray.name = I18nService.translateText(cloned.spray.name, lang);
        cloned.spray.dosage = I18nService.translateText(cloned.spray.dosage, lang);
        cloned.spray.timing = I18nService.translateText(cloned.spray.timing, lang);
      }
    } else if (type === 'recommendations' && Array.isArray(cloned)) {
      cloned.forEach(rec => {
        rec.title = I18nService.translateText(rec.title, lang);
        rec.category = I18nService.translateText(rec.category, lang);
        rec.description = I18nService.translateText(rec.description, lang);
        rec.actionText = I18nService.translateText(rec.actionText, lang);
        if (Array.isArray(rec.steps)) {
          rec.steps = rec.steps.map(s => I18nService.translateText(s, lang));
        }
      });
    } else if (type === 'insurance' && Array.isArray(cloned)) {
      cloned.forEach(item => {
        item.name = I18nService.translateText(item.name, lang);
        item.tagline = I18nService.translateText(item.tagline, lang);
        item.overview = I18nService.translateText(item.overview, lang);
        item.eligibility = I18nService.translateText(item.eligibility, lang);
        item.liveBadge = I18nService.translateText(item.liveBadge, lang);
        item.liveDeadline = I18nService.translateText(item.liveDeadline, lang);
        item.premiumRates = I18nService.translateText(item.premiumRates, lang);
        if (Array.isArray(item.benefits)) {
          item.benefits = item.benefits.map(b => I18nService.translateText(b, lang));
        }
      });
    } else if (type === 'helplines' && Array.isArray(cloned)) {
      cloned.forEach(item => {
        item.name = I18nService.translateText(item.name, lang);
        item.category = I18nService.translateText(item.category, lang);
        item.description = I18nService.translateText(item.description, lang);
        item.timings = I18nService.translateText(item.timings, lang);
        item.liveStatus = I18nService.translateText(item.liveStatus, lang);
      });
    } else if (type === 'awareness' && Array.isArray(cloned)) {
      cloned.forEach(item => {
        item.title = I18nService.translateText(item.title, lang);
        item.category = I18nService.translateText(item.category, lang);
        item.description = I18nService.translateText(item.description, lang);
        item.location = I18nService.translateText(item.location, lang);
        item.organizer = I18nService.translateText(item.organizer, lang);
        item.liveStatus = I18nService.translateText(item.liveStatus, lang);
        item.registrationFee = I18nService.translateText(item.registrationFee, lang);
      });
    } else if (type === 'privacy' && cloned) {
      cloned.title = I18nService.translateText(cloned.title, lang);
      if (Array.isArray(cloned.sections)) {
        cloned.sections.forEach(sec => {
          sec.title = I18nService.translateText(sec.title, lang);
          sec.content = I18nService.translateText(sec.content, lang);
        });
      }
    }

    return cloned;
  }

  /**
   * Universal DOM Translator: walks the rendered page and translates text nodes and inputs
   */
  static translateDOM(root = document.body) {
    const lang = I18nService.getLanguage();
    if (!root || lang === 'en') return;

    // 1. Translate placeholder attributes
    root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const ph = el.getAttribute('placeholder');
      if (ph) {
        const translated = I18nService.translateText(ph, lang);
        if (translated && translated !== ph) {
          el.setAttribute('placeholder', translated);
        }
      }
    });

    // 2. Walk all DOM nodes and translate direct text content
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (const node of textNodes) {
      const parent = node.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'SELECT' || parent.classList.contains('no-translate')) {
        continue;
      }
      const txt = node.nodeValue.trim();
      if (txt.length > 1) {
        const trans = I18nService.translateText(txt, lang);
        if (trans && trans !== txt) {
          node.nodeValue = node.nodeValue.replace(txt, trans);
        }
      }
    }
  }
}

/**
 * Web Speech Native Voice Response Engine
 * Provides crystal-clear native speech synthesis in Telugu, Hindi, Tamil, Kannada, English, etc.
 */
class VoiceEngine {
  static isSupported() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  static isSpeaking() {
    return window.speechSynthesis && window.speechSynthesis.speaking;
  }

  static stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    document.dispatchEvent(new CustomEvent('krishi_voice_state', { detail: { isSpeaking: false } }));
  }

  static speak(text, langCode = null) {
    if (!VoiceEngine.isSupported()) {
      if (typeof showToast === 'function') {
        showToast('Voice response is not supported on this browser.', 'error');
      }
      return;
    }

    VoiceEngine.stop();

    const lang = langCode || I18nService.getLanguage();
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];
    const speechLocale = langObj.speechLocale;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLocale;
    utterance.rate = 0.95; // Clear natural pace for Indian farmers
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.toLowerCase() === speechLocale.toLowerCase() || v.lang.startsWith(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      document.dispatchEvent(new CustomEvent('krishi_voice_state', { detail: { isSpeaking: true, lang } }));
    };

    utterance.onend = () => {
      document.dispatchEvent(new CustomEvent('krishi_voice_state', { detail: { isSpeaking: false, lang } }));
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      document.dispatchEvent(new CustomEvent('krishi_voice_state', { detail: { isSpeaking: false, lang } }));
    };

    window.speechSynthesis.speak(utterance);
  }

  static speakDiagnosis(diagnosis, langCode = null) {
    if (!diagnosis) return;
    const lang = langCode || I18nService.getLanguage();
    let text = '';
    const crop = diagnosis.crop || 'Crop';
    const disease = diagnosis.disease || 'Disease';
    const severity = diagnosis.severityDisplay || diagnosis.severity || '';
    const summary = diagnosis.summary || '';

    if (lang === 'te') {
      text = `రోగ నిర్ధారణ ఫలితం: ${crop} లో ${disease} గుర్తించబడింది. ప్రమాద తీవ్రత: ${severity}. ${summary}`;
    } else if (lang === 'hi') {
      text = `रोग निदान परिणाम: ${crop} में ${disease} की पुष्टि हुई है। गंभीरता: ${severity}। ${summary}`;
    } else if (lang === 'ta') {
      text = `பயிர் நோய் கண்டறிதல் முடிவு: ${crop} பயிரில் ${disease} கண்டறியப்பட்டுள்ளது. தீவிரம்: ${severity}. ${summary}`;
    } else if (lang === 'kn') {
      text = `ರೋಗ ಪತ್ತೆ ಫಲಿತಾಂಶ: ${crop} ಬೆಳೆಯಲ್ಲಿ ${disease} ಕಂಡುಬಂದಿದೆ. ತೀವ್ರತೆ: ${severity}. ${summary}`;
    } else if (lang === 'mr') {
      text = `रोग निदान अहवाल: ${crop} पिकावर ${disease} आढळला आहे. तीव्रता: ${severity}. ${summary}`;
    } else if (lang === 'pa') {
      text = `ਰੋਗ ਜਾਂਚ ਨਤੀਜਾ: ${crop} ਵਿੱਚ ${disease} ਪਾਇਆ ਗਿਆ ਹੈ। ਗੰਭੀਰਤਾ: ${severity}। ${summary}`;
    } else if (lang === 'bn') {
      text = `রোগ নির্ণয় ফলাফল: ${crop} ফসলে ${disease} শনাক্ত হয়েছে। তীব্রতা: ${severity}। ${summary}`;
    } else {
      text = `AI Diagnosis Report: ${disease} detected in ${crop}. Severity: ${severity}. ${summary}`;
    }

    VoiceEngine.speak(text, lang);
  }
}
