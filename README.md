# Meesam Abbas | Personal Portfolio

A premium, minimalist personal portfolio website for a Computer Science student, Frontend Developer, and Data Analytics enthusiast. 

This portfolio is built with a custom design system blending the aesthetic directions of **Vercel, Linear, Stripe, and Apple**—featuring a sleek dark mode (default), high-contrast light mode variables, and micro-interactions.

---

## 🚀 Key Features

* **Vercel/Linear Aesthetic Theme**: Clean, recruiter-friendly layout with custom typography (Space Grotesk, Inter, and JetBrains Mono) and subtle grid/card components.
* **Dynamic Dark/Light Mode**: Smooth client-side theme switching with persistent settings cached via localStorage.
* **Animated Hero Stats Counter**: Viewport-triggered JavaScript count-up animation (2.5s duration) displaying Total Projects, Languages, and Total Skills.
* **Interactive Project Grid**: Dynamic tag filtering (All, Web, Data, Games) with category tags, custom thumbnail badges, and outline-styled hover underlines for Live Demo entries.
* **Alternating Timeline**: A relative CSS-based alternating timeline demonstrating education blocks (BCA, Higher Secondary School).
* **Protected Content**: Global text copy and highlight selection disabled across layout templates to secure code details, while preserving normal inputs selection inside form fields.
* **EmailJS Form Integration**: Fully functional contact form with toast notification alerts and developmental simulation fallback modes.

---

## 🛠️ Tech Stack & Resources

* **Core Structure**: HTML5 (Semantic Structure)
* **Styling System**: Vanilla CSS3 (Custom properties, grid layouts, and cubic-bezier transitions)
* **Logic/Interactions**: Vanilla JavaScript ES6+ (IntersectionObserver, Typed Typewriter)
* **Icons**: [Devicon CDN](https://devicon.dev/) (developer tech badges) & [Bootstrap Icons](https://icons.getbootstrap.com/)
* **Fonts**: [Google Fonts](https://fonts.google.com/) (Space Grotesk, Inter, JetBrains Mono)

---

## 📂 Project Structure

```text
├── index.html          # Main HTML markup and semantic sections
├── style.css           # Custom variables, design system grid tokens, and hover animations
├── script.js          # Intersection observers, typed roles, contact submission, and count-up logic
├── Meesam_Abbas_Resume.docx # CV/Resume file download
└── assessts/           # Project preview screenshots and images
```

---

## 🔧 Local Setup

Since this project is built entirely on native web standards (HTML, CSS, and JS), it runs directly in any modern browser without needing build setups:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Meesamabbasnaqvi/personal-portfolio.git
   ```
2. **Run the site**:
   * Open `index.html` directly in your browser.
   * Or run a simple local developer server (e.g. using VS Code's **Live Server** extension or running `npx serve` in the project root folder).

---

## 📧 EmailJS Configuration

To receive messages from the contact form directly in your inbox:
1. Open [script.js](script.js) and search for the contact configuration section:
   ```javascript
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```
2. Replace the placeholder strings with your credentials from the EmailJS service dashboard.
