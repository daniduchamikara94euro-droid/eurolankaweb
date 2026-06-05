# Consultszone Static HTML Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single self-contained `index.html` file recreating the consultszone.com WordPress site with inline CSS and vanilla JS.

**Architecture:** Single-file static site — all HTML in one document, CSS in `<style>` block, JS in `<script>` block. Font Awesome 6 for icons, Google Fonts (Montserrat + Roboto), lightweight vanilla carousel for the hero slider. No build tools or server.

**Tech Stack:** HTML5, CSS3 (vanilla, inline), JavaScript (vanilla, inline), Font Awesome 6 CDN, Google Fonts CDN

---

### Task 1: HTML Skeleton, Head, and Header

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the HTML file with DOCTYPE, head metadata, and styles**

Write `index.html`:

```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultszone — Process & Digital Transformation Consulting</title>
    <meta name="description" content="Consultszone is a dynamic consultancy firm specializing in process and digital transformation.">
    <link rel="icon" href="https://consultszone.com/wp-content/uploads/2023/08/cropped-Fav-32x32.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* ----- RESET & BASE ----- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            color: #000000;
            background: #FFFFFF;
            line-height: 1.6;
            overflow-x: hidden;
        }
        img { max-width: 100%; height: auto; display: block; }
        a { color: #0015A3; text-decoration: none; }
        ul { list-style: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* ----- TYPOGRAPHY ----- */
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 700;
        }
        h2 { font-size: 32px; margin-bottom: 20px; }
        .section-heading { text-align: center; padding: 60px 20px 30px; }
        .section-heading h2 { color: #303F95; }

        /* ----- HEADER ----- */
        .site-header {
            position: fixed; top: 0; left: 0; width: 100%;
            background: #FFFFFF; z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            padding: 10px 20px;
        }
        .header-inner {
            max-width: 1200px; margin: 0 auto;
            display: flex; align-items: center; justify-content: space-between;
        }
        .site-logo { height: 50px; }
        .site-logo img { height: 50px; width: auto; }
        .main-nav { display: flex; gap: 28px; align-items: center; }
        .main-nav a {
            font-family: 'Montserrat', sans-serif;
            font-size: 14px; font-weight: 600; color: #303F95;
            text-transform: uppercase; letter-spacing: 0.5px;
            transition: color 0.2s;
        }
        .main-nav a:hover { color: #0015A3; }
        .nav-cta {
            background: #303F95; color: #FFFFFF !important;
            padding: 10px 24px; border-radius: 50px;
            transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.9; }
        .mobile-toggle { display: none; font-size: 24px; cursor: pointer; color: #303F95; }

        /* ----- HERO SLIDER ----- */
        .hero-slider {
            position: relative; width: 100%; height: 100vh; min-height: 500px;
            overflow: hidden; margin-top: 70px;
        }
        .slide {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0; transition: opacity 1s ease-in-out;
            display: flex; align-items: center; justify-content: center;
        }
        .slide.active { opacity: 1; }
        .slide-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center;
        }
        .slide-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.55);
        }
        .slide-content {
            position: relative; z-index: 2; max-width: 800px;
            text-align: center; padding: 40px;
        }
        .slide-content p {
            font-family: 'Montserrat', sans-serif;
            font-size: 24px; color: #FFFFFF; line-height: 1.5;
            font-weight: 400; font-style: italic;
        }
        .slider-arrow {
            position: absolute; top: 50%; transform: translateY(-50%);
            z-index: 10; background: rgba(255,255,255,0.2);
            color: #FFFFFF; border: none; width: 50px; height: 50px;
            border-radius: 50%; cursor: pointer; font-size: 20px;
            transition: background 0.3s;
        }
        .slider-arrow:hover { background: rgba(255,255,255,0.4); }
        .slider-arrow.prev { left: 20px; }
        .slider-arrow.next { right: 20px; }
        .slider-dots {
            position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
            z-index: 10; display: flex; gap: 10px;
        }
        .slider-dot {
            width: 12px; height: 12px; border-radius: 50%;
            background: rgba(255,255,255,0.4); border: none; cursor: pointer;
            transition: background 0.3s;
        }
        .slider-dot.active { background: #FFFFFF; }

        /* ----- ABOUT SECTION ----- */
        .about-section { display: flex; padding: 0; }
        .about-image { flex: 1; min-height: 500px; }
        .about-image img { width: 100%; height: 100%; object-fit: cover; }
        .about-content {
            flex: 1; padding: 60px 50px; display: flex;
            flex-direction: column; justify-content: center;
        }
        .about-content h2 { color: #303F95; margin-bottom: 20px; }
        .about-content h3 { color: #303F95; margin: 30px 0 15px; font-size: 22px; }
        .about-content p { color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 15px; }

        /* ----- INDUSTRIES SECTION ----- */
        .industries-section { background: #f5f7f9; padding: 60px 0; }
        .industries-grid {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 30px; max-width: 1200px; margin: 0 auto; padding: 0 20px;
        }
        .industry-card {
            background: #FFFFFF; padding: 30px 20px; border-radius: 8px;
            text-align: center; box-shadow: 0 2px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .industry-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .industry-card img { width: 60px; height: 60px; margin: 0 auto 15px; object-fit: contain; }
        .industry-card h3 { font-size: 18px; color: #303F95; margin-bottom: 10px; }
        .industry-card p { font-size: 14px; color: #666; line-height: 1.6; }

        /* ----- CAPABILITIES SECTION ----- */
        .capabilities-section { padding: 60px 0; }
        .capabilities-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 40px; max-width: 1000px; margin: 0 auto; padding: 0 20px;
        }
        .capability-card { text-align: center; padding: 30px 20px; }
        .capability-card .icon {
            width: 70px; height: 70px; margin: 0 auto 20px;
            background: #303F95; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: #FFFFFF; font-size: 28px;
        }
        .capability-card h3 { font-size: 20px; color: #303F95; margin-bottom: 15px; }
        .capability-card p { color: #666; font-size: 15px; line-height: 1.7; }

        /* ----- TEAM SECTION ----- */
        .team-section { background: #1a2332; padding: 60px 0; }
        .team-section .section-heading h2 { color: #FFFFFF; }
        .team-grid {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 30px; max-width: 1200px; margin: 0 auto; padding: 0 20px;
        }
        .team-card { text-align: center; padding: 20px; }
        .team-card img {
            width: 150px; height: 150px; border-radius: 50%;
            object-fit: cover; margin: 0 auto 15px; border: 3px solid rgba(255,255,255,0.1);
        }
        .team-card h3 { color: #FFFFFF; font-size: 18px; margin-bottom: 5px; }
        .team-card .title { color: #aaa; font-size: 14px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .team-card p { color: #ccc; font-size: 13px; line-height: 1.6; margin-bottom: 15px; }
        .team-card .social-link {
            display: inline-flex; width: 40px; height: 40px; border-radius: 50%;
            background: #303F95; color: #FFFFFF; align-items: center; justify-content: center;
            transition: opacity 0.2s;
        }
        .team-card .social-link:hover { opacity: 0.8; }

        /* ----- SERVICES SECTION ----- */
        .services-section { padding: 60px 0; }
        .services-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 30px; max-width: 1200px; margin: 0 auto; padding: 0 20px;
        }
        .service-card {
            background: #FFFFFF; border-radius: 8px; overflow: hidden;
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .service-card img { width: 100%; height: 200px; object-fit: cover; }
        .service-card-body { padding: 25px; }
        .service-card-body h2 { font-size: 20px; color: #303F95; margin-bottom: 15px; }
        .service-card-body p { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 10px; }
        .service-card-body ul li {
            font-size: 14px; color: #555; padding: 4px 0;
            padding-left: 18px; position: relative;
        }
        .service-card-body ul li::before {
            content: '\2022'; color: #303F95; font-weight: bold;
            position: absolute; left: 0;
        }

        /* ----- CONTACT / CTA SECTION ----- */
        .contact-section { background: #1a2332; padding: 60px 0; }
        .contact-inner {
            display: flex; gap: 60px; max-width: 1000px;
            margin: 0 auto; padding: 0 20px; align-items: center;
        }
        .contact-text { flex: 1; }
        .contact-text h2 { color: #FFFFFF; font-size: 36px; line-height: 1.3; }
        .contact-form-wrapper { flex: 1; background: #FFFFFF; padding: 30px; border-radius: 8px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 14px; color: #555; margin-bottom: 4px; font-weight: 500; }
        .form-row { display: flex; gap: 15px; }
        .form-row .form-group { flex: 1; }
        .form-group input,
        .form-group textarea {
            width: 100%; padding: 10px 14px; border: 1px solid #BFC3C8;
            border-radius: 4px; font-size: 14px; font-family: 'Roboto', sans-serif;
            color: #555; transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group textarea:focus { outline: none; border-color: #303F95; }
        .submit-btn {
            background: #303F95; color: #FFFFFF; border: none;
            padding: 12px 36px; border-radius: 50px; font-size: 16px;
            font-weight: 600; cursor: pointer; transition: opacity 0.2s;
            font-family: 'Montserrat', sans-serif;
        }
        .submit-btn:hover { opacity: 0.9; }
        .form-success {
            display: none; text-align: center; padding: 30px;
            color: #2e7d32; font-size: 16px;
        }
        .form-success i { font-size: 48px; margin-bottom: 15px; display: block; }

        /* ----- WHATSAPP WIDGET ----- */
        .wa-widget {
            position: fixed; bottom: 177px; right: 30px; z-index: 999;
        }
        .wa-btn {
            display: flex; align-items: center; gap: 8px;
            background: #2DB742; color: #FFFFFF; border: none;
            padding: 12px 20px; border-radius: 50px; cursor: pointer;
            font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(45,183,66,0.3);
            transition: transform 0.2s;
            font-family: 'Montserrat', sans-serif;
        }
        .wa-btn:hover { transform: scale(1.05); }
        .wa-btn i { font-size: 20px; }
        .wa-tooltip {
            position: absolute; right: 110%; top: 50%; transform: translateY(-50%);
            background: #FFFFFF; color: #333; padding: 10px 14px;
            border-radius: 6px; font-size: 12px; white-space: nowrap;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            display: none;
        }
        .wa-btn:hover .wa-tooltip { display: block; }

        /* ----- BACK TO TOP ----- */
        .back-to-top {
            position: fixed; bottom: 100px; right: 30px; z-index: 998;
            width: 48px; height: 48px; border-radius: 50%;
            background: #303F95; color: #FFFFFF; border: none;
            cursor: pointer; font-size: 18px; display: none;
            align-items: center; justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            transition: opacity 0.3s;
        }
        .back-to-top.visible { display: flex; }
        .back-to-top:hover { opacity: 0.9; }

        /* ----- FOOTER ----- */
        .site-footer {
            background: #111820; color: #aaa; text-align: center;
            padding: 30px 20px; font-size: 14px;
        }
        .site-footer p { margin-bottom: 5px; }

        /* ----- RESPONSIVE ----- */
        @media (max-width: 1023px) {
            .industries-grid { grid-template-columns: repeat(2, 1fr); }
            .team-grid { grid-template-columns: repeat(2, 1fr); }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .about-section { flex-direction: column; }
            .about-image { min-height: 300px; }
            .contact-inner { flex-direction: column; }
            .slide-content p { font-size: 20px; }
        }
        @media (max-width: 768px) {
            .main-nav { display: none; }
            .mobile-toggle { display: block; }
            .main-nav.open {
                display: flex; flex-direction: column;
                position: absolute; top: 70px; left: 0; width: 100%;
                background: #FFFFFF; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .industries-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .capabilities-grid { grid-template-columns: 1fr; }
            .services-grid { grid-template-columns: 1fr; }
            h2 { font-size: 26px; }
            .slide-content p { font-size: 18px; }
            .about-content { padding: 30px 20px; }
            .form-row { flex-direction: column; gap: 0; }
        }
        @media (max-width: 480px) {
            .industries-grid { grid-template-columns: 1fr; }
            .team-grid { grid-template-columns: 1fr; }
            .hero-slider { height: 70vh; min-height: 400px; }
        }
    </style>
</head>
<body>
```

- [ ] **Step 2: Add the header with logo and navigation**

After the opening `<body>` tag, add:

```html
    <!-- HEADER -->
    <header class="site-header">
        <div class="header-inner">
            <a href="#" class="site-logo">
                <img src="https://consultszone.com/wp-content/uploads/2023/08/Consultszone-Logo-with-the-tag-line.png"
                     alt="Consultszone Logo">
            </a>
            <nav class="main-nav" id="mainNav">
                <a href="#about">About</a>
                <a href="#industries">Industries</a>
                <a href="#capabilities">Capabilities</a>
                <a href="#team">Team</a>
                <a href="#services">Services</a>
                <a href="#contact" class="nav-cta">Hire Us</a>
            </nav>
            <div class="mobile-toggle" id="mobileToggle" onclick="toggleMobileNav()">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>
```

- [ ] **Step 3: Write the mobile toggle JS and closing HTML tags**

Add to the end of the file (before `</body>`):

```html
    <script>
        function toggleMobileNav() {
            document.getElementById('mainNav').classList.toggle('open');
        }
    </script>
</body>
</html>
```

---

### Task 2: Hero Slider

**Files:**
- Modify: `index.html` (add slider HTML after header, add slider JS)
- The CSS is already in the style block from Task 1

- [ ] **Step 1: Add the hero slider HTML**

After the header `</header>`, add:

```html
    <!-- HERO SLIDER -->
    <section class="hero-slider" id="heroSlider">
        <div class="slide active">
            <div class="slide-bg" style="background-image: url('https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80');"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <p>"When business and technology unite in consultation, digital transformation becomes a triumph of innovation and adaptation."</p>
            </div>
        </div>
        <div class="slide">
            <div class="slide-bg" style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80');"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <p>"When business and technology unite in consultation, digital transformation becomes a triumph of innovation and adaptation."</p>
            </div>
        </div>
        <button class="slider-arrow prev" onclick="slidePrev()"><i class="fas fa-chevron-left"></i></button>
        <button class="slider-arrow next" onclick="slideNext()"><i class="fas fa-chevron-right"></i></button>
        <div class="slider-dots" id="sliderDots">
            <button class="slider-dot active" onclick="goToSlide(0)"></button>
            <button class="slider-dot" onclick="goToSlide(1)"></button>
        </div>
    </section>
```

- [ ] **Step 2: Add the slider JavaScript**

Inside the existing `<script>` block, add:

```javascript
        // ----- HERO SLIDER -----
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        let slideInterval;

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function slideNext() {
            goToSlide((currentSlide + 1) % slides.length);
            resetInterval();
        }

        function slidePrev() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(slideNext, 5000);
        }

        // Pause on hover
        const slider = document.getElementById('heroSlider');
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', resetInterval);

        // Start autoplay
        slideInterval = setInterval(slideNext, 5000);
```

---

### Task 3: About Section

**Files:**
- Modify: `index.html` (add about section HTML after hero slider)

- [ ] **Step 1: Add the About section HTML**

After the hero slider `</section>`, add:

```html
    <!-- ABOUT SECTION -->
    <section class="about-section" id="about">
        <div class="about-image">
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                 alt="Business presentation with digital pen">
        </div>
        <div class="about-content">
            <h2>About Consultszone</h2>
            <p>Consultszone is a dynamic consultancy firm that specializes in delivering excellence through process and digital transformation. With a customer-centric approach, we are dedicated to helping businesses achieve incredible success by seamlessly integrating innovative processes and cutting-edge technology.</p>
            <h3>What We Believe</h3>
            <p>We believe that true excellence is achieved when businesses embrace change and adopt transformative strategies. Our firm conviction lies in the power of collaboration, where our experts work closely with clients to understand their unique needs and challenges, creating tailored solutions that drive growth and efficiency.</p>
        </div>
    </section>
```

---

### Task 4: Industries Section

**Files:**
- Modify: `index.html` (add industries section HTML after about section)

- [ ] **Step 1: Add the Industries section with 8 cards**

After the about `</section>`, add:

```html
    <!-- INDUSTRIES SECTION -->
    <section class="industries-section" id="industries">
        <div class="section-heading">
            <h2>Industries We Serve</h2>
        </div>
        <div class="industries-grid">
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/1995/1995578.png" alt="Manufacturing icon">
                <h3>Manufacturing</h3>
                <p>We support manufacturing organizations in improving production efficiency, inventory controls, supply chain visibility, ERP utilization, Quality and Compliances and operational performance.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/3063/3063168.png" alt="Logistics icon">
                <h3>Logistics &amp; Supply Chain</h3>
                <p>We help logistics providers and supply chain organizations improve operational agility, warehouse performance, transport visibility, and cost efficiency.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" alt="Retail icon">
                <h3>Retail &amp; Distribution</h3>
                <p>Consultszone assists retail and distribution businesses in streamlining operations, improving inventory accuracy, and enhancing customer fulfillment processes.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/1055/1055687.png" alt="Trading icon">
                <h3>Trading &amp; Import/Export</h3>
                <p>We support trading businesses with process governance, operational controls, and supply chain visibility to improve business continuity and profitability.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Services icon">
                <h3>Service Organizations</h3>
                <p>We help service-based organizations improve operational structure, governance, workflow efficiency, and business performance.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/2331/2331970.png" alt="FMCG icon">
                <h3>FMCG &amp; Consumer Goods</h3>
                <p>We support fast-moving consumer goods businesses with operational control improvements, inventory visibility, and efficient distribution processes.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/2965/2965306.png" alt="Construction icon">
                <h3>Construction &amp; Engineering</h3>
                <p>Consultszone supports construction and engineering organizations with project controls, procurement governance, operational visibility, and digital process improvements.</p>
            </div>
            <div class="industry-card">
                <img src="https://cdn-icons-png.flaticon.com/128/741/741407.png" alt="SMEs icon">
                <h3>SMEs &amp; Growing Businesses</h3>
                <p>We partner with growing businesses to establish scalable processes, improve governance, and implement structured operational frameworks.</p>
            </div>
        </div>
    </section>
```

---

### Task 5: Capabilities + Team Sections

**Files:**
- Modify: `index.html` (add capabilities and team section HTML after industries section)

- [ ] **Step 1: Add capabilities section**

After industries `</section>`, add:

```html
    <!-- CAPABILITIES SECTION -->
    <section class="capabilities-section" id="capabilities">
        <div class="section-heading">
            <h2>Our Capabilities</h2>
        </div>
        <div class="capabilities-grid">
            <div class="capability-card">
                <div class="icon"><i class="fas fa-chart-line"></i></div>
                <h3>Unlock Profit and Savings</h3>
                <p>Sustainable Improvements in<br>Profits and realize Savings</p>
            </div>
            <div class="capability-card">
                <div class="icon"><i class="fas fa-people-carry"></i></div>
                <h3>Transform People and Process</h3>
                <p>Align organizational processes<br>and people to improve productivity<br>and efficiency</p>
            </div>
            <div class="capability-card">
                <div class="icon"><i class="fas fa-link"></i></div>
                <h3>Future Ready Supply Chain Solutions</h3>
                <p>Deliver continues sustainable<br>improvements for a future ready Supply Chain</p>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Add team section**

After capabilities `</section>`, add:

```html
    <!-- TEAM SECTION -->
    <section class="team-section" id="team">
        <div class="section-heading">
            <h2>Meet Our Team</h2>
        </div>
        <div class="team-grid">
            <div class="team-card">
                <img src="https://consultszone.com/wp-content/uploads/2023/08/Picture3-150x150.png" alt="Gayathri Karunanayaka">
                <h3>Gayathri Karunanayaka</h3>
                <div class="title">Director / CEO</div>
                <p>Leader and experienced Supply Chain professional focused FMCG, 3PL, Logistics, E Commerce, Retail Distribution, SAP, WMS and Last Mile Logistics. Process and Digital transformation Agent.</p>
                <a href="https://www.linkedin.com/in/gayathri-karunanayake-84819b96/" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="team-card">
                <img src="https://consultszone.com/wp-content/uploads/2024/07/11-150x150.png" alt="Amilthan Suntharalingam">
                <h3>Amilthan Suntharalingam</h3>
                <div class="title">Director</div>
                <p>Dynamic and results-oriented Leader with a proven ability to drive operational excellence and spearhead strategic initiatives in the manufacturing industry.</p>
                <a href="http://linkedin.com/in/amilthan-suntharalingam-98a25727" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="team-card">
                <img src="https://consultszone.com/wp-content/uploads/2023/08/Picture1-150x150.png" alt="Gayani De Alwis">
                <h3>Gayani De Alwis</h3>
                <div class="title">Advisory Board Member</div>
                <p>Experienced supply chain professional specializing in outsourcing, customer service, change management, business continuity planning, quality management system and auditing.</p>
                <a href="https://www.linkedin.com/in/gayani-de-alwis-fcilt-8793b516/" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="team-card">
                <img src="https://consultszone.com/wp-content/uploads/2023/08/71-150x150.png" alt="Amra Zareer">
                <h3>Amra Zareer</h3>
                <div class="title">Advisory Board Member</div>
                <p>A passionate business management professional, with 15+ years experience in transforming business strategy. She plays a pivotal role in people's transformation.</p>
                <a href="https://www.linkedin.com/in/amrazareer/" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </section>
```

---

### Task 6: Services Section (6 Cards)

**Files:**
- Modify: `index.html` (add services section after team section)

- [ ] **Step 1: Add the services heading and first row (3 cards)**

After team `</section>`, add:

```html
    <!-- SERVICES SECTION -->
    <section class="services-section" id="services">
        <div class="section-heading">
            <h2>Our Services</h2>
        </div>
        <div class="services-grid">
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" alt="Internal Audit">
                <div class="service-card-body">
                    <h2>Internal Audit &amp; Assurance</h2>
                    <p>We provide risk-based internal audit solutions that enhance governance, strengthen controls, and improve operational efficiency across the organization.</p>
                    <p><strong>Our expertise includes:</strong></p>
                    <ul>
                        <li>Inventory &amp; warehouse audits</li>
                        <li>Procurement audits</li>
                        <li>Sales &amp; distribution audits</li>
                        <li>HR &amp; payroll audits</li>
                        <li>Compliance and governance reviews</li>
                        <li>Operational control assessments</li>
                        <li>Risk management reviews</li>
                    </ul>
                </div>
            </div>
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" alt="Business Process Audit">
                <div class="service-card-body">
                    <h2>Business Process Audit</h2>
                    <p>Our business process audits evaluate the effectiveness, efficiency, and compliance of operational workflows across functions.</p>
                    <p><strong>We assess:</strong></p>
                    <ul>
                        <li>Process bottlenecks</li>
                        <li>Control weaknesses</li>
                        <li>ERP process alignment</li>
                        <li>SOP effectiveness</li>
                        <li>Workflow optimization opportunities</li>
                        <li>Process standardization</li>
                    </ul>
                </div>
            </div>
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" alt="Advisory Services">
                <div class="service-card-body">
                    <h2>Advisory Services</h2>
                    <p>We provide strategic and operational advisory services to help businesses navigate growth, transformation, and operational challenges.</p>
                    <p><strong>Our advisory expertise includes:</strong></p>
                    <ul>
                        <li>Operational excellence</li>
                        <li>Supply chain optimization</li>
                        <li>Cost reduction initiatives</li>
                        <li>Governance and compliance</li>
                        <li>Organizational restructuring</li>
                        <li>KPI and performance management</li>
                        <li>Business transformation roadmaps</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Add the second row (3 more services)**

Still inside the services section (before the section's closing `</section>`), add a second grid:

```html
        <div class="services-grid" style="margin-top: 30px;">
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&q=80" alt="Project Management">
                <div class="service-card-body">
                    <h2>Project Management</h2>
                    <p>Consultszone offers end-to-end project management support to ensure successful execution of business and technology initiatives.</p>
                    <ul>
                        <li>Project planning &amp; governance</li>
                        <li>PMO setup and support</li>
                        <li>Cross-functional coordination</li>
                        <li>Stakeholder management</li>
                        <li>Risk and issue management</li>
                        <li>Implementation tracking</li>
                        <li>Change management support</li>
                    </ul>
                </div>
            </div>
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" alt="ERP/SAP/WMS Consultancy">
                <div class="service-card-body">
                    <h2>ERP / SAP / WMS / TMS Functional Consultancy</h2>
                    <p>We specialize in functional consulting and business process integration across enterprise systems.</p>
                    <ul>
                        <li>ERP implementation support</li>
                        <li>SAP functional consultancy</li>
                        <li>WMS consulting</li>
                        <li>TMS consulting</li>
                        <li>Business process mapping</li>
                        <li>Master data governance</li>
                        <li>User acceptance testing (UAT)</li>
                        <li>Training &amp; change management</li>
                    </ul>
                </div>
            </div>
            <div class="service-card">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80" alt="Digital Transformation">
                <div class="service-card-body">
                    <h2>Digital Transformation</h2>
                    <p>Digital transformation requires more than technology — it requires clarity, process alignment, and execution excellence.</p>
                    <ul>
                        <li>Digital transformation strategy</li>
                        <li>Process digitization</li>
                        <li>Workflow automation</li>
                        <li>Data visibility and reporting</li>
                        <li>IoT and smart operations integration</li>
                        <li>ERP and operational system enhancement</li>
                        <li>Digital process controls</li>
                        <li>Business intelligence enablement</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
```

---

### Task 7: Contact Section, WhatsApp Widget, Back-to-Top, and Footer

**Files:**
- Modify: `index.html` (add contact section, WhatsApp, back-to-top, footer, and remaining JS)

- [ ] **Step 1: Add the Contact / CTA section**

After services `</section>`, add:

```html
    <!-- CONTACT SECTION -->
    <section class="contact-section" id="contact">
        <div class="contact-inner">
            <div class="contact-text">
                <h2>Do you want to start striving?<br>Connect with us</h2>
            </div>
            <div class="contact-form-wrapper">
                <form id="contactForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit</button>
                    <div class="form-success" id="formSuccess">
                        <i class="fas fa-check-circle"></i>
                        Thank you! Your message has been received. We'll get back to you soon.
                    </div>
                </form>
            </div>
        </div>
    </section>
```

- [ ] **Step 2: Add WhatsApp widget, back-to-top button, and footer**

After contact `</section>`, add:

```html
    <!-- WHATSAPP WIDGET -->
    <div class="wa-widget" id="waWidget">
        <button class="wa-btn" onclick="window.open('https://api.whatsapp.com/send?phone=94772355491', '_blank')">
            <i class="fab fa-whatsapp"></i>
            <span class="wa-tooltip">Book your organization's free assessment today</span>
        </button>
    </div>

    <!-- BACK TO TOP -->
    <button class="back-to-top" id="backToTop" onclick="scrollToTop()">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- FOOTER -->
    <footer class="site-footer">
        <p>&copy; 2026 Consultszone. All rights reserved.</p>
        <p>Process &amp; Digital Transformation Consulting</p>
    </footer>
```

- [ ] **Step 3: Add the remaining JavaScript**

Inside the existing `<script>` block (after slider JS), add:

```javascript
        // ----- MOBILE NAV -----
        function toggleMobileNav() {
            document.getElementById('mainNav').classList.toggle('open');
        }

        // ----- FORM HANDLER -----
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('formSuccess').style.display = 'block';
            this.reset();
        });

        // ----- BACK TO TOP -----
        window.addEventListener('scroll', function() {
            const btn = document.getElementById('backToTop');
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
```

---

### Task 8: Final Review and Test

**Files:**
- Review: `index.html`

- [ ] **Step 1: Review and verify the complete file**

Run a quick sanity check:
- Confirm all tags are properly closed
- Verify all sections are present in order (Header → Hero → About → Industries → Capabilities → Team → Services → Contact → WhatsApp → Footer)
- Check that all image URLs are valid and accessible
- Verify responsive breakpoints are covered
- Confirm Form validation works (required fields)
- Check slider autoplay and manual navigation

- [ ] **Step 2: Open in browser to visually verify**

```bash
start index.html
```

Open the file in Chrome/Firefox and check:
- Header is fixed at top with proper z-index
- Hero slider auto-rotates and arrows work
- All sections render with correct colors
- Mobile hamburger menu works
- Form submit shows success message
- WhatsApp button opens correct link
- Back-to-top appears on scroll
- Page is responsive at different widths

- [ ] **Step 3: Commit**

```bash
git add index.html docs/superpowers/specs/2026-06-06-consultszone-static-html-design.md docs/superpowers/plans/2026-06-06-consultszone-static-html.md
git commit -m "feat: add consultszone.com static HTML site

Single-file recreation of the consultszone.com WordPress site with:
- Hero slider with auto-rotation
- About, Industries, Capabilities, Team, Services sections
- Contact form with success feedback
- WhatsApp chat widget
- Back-to-top button
- Fully responsive design

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
