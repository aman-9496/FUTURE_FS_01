# Amanu Muhammed — Personal Portfolio Website

A modern, responsive personal portfolio website built for **Future Interns Task 1**. Showcases skills, projects, experience, education, and contact information for internship and junior developer opportunities.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

---

## Project Overview

This portfolio website presents **Amanu Muhammed**, a Junior Software Engineer & Full-Stack Developer based in Bahir Dar, Ethiopia. The site is designed to impress recruiters, internship reviewers, and potential employers with a professional UI, smooth interactions, and production-ready code structure.

The project includes a **static frontend** (HTML, CSS, JavaScript) deployable to GitHub Pages, plus an optional **Express.js backend** with MongoDB for handling contact form submissions.

---

## Features

### Frontend
- Responsive, mobile-first design with hamburger navigation
- Dark / Light mode toggle with localStorage persistence
- Smooth scrolling navigation with active section highlighting
- Sticky header with scroll effects
- Loading animation on page load
- Scroll-to-top button
- Typing animation in hero section
- Scroll-triggered animations (Intersection Observer)
- Animated skill progress bars
- Project cards with hover overlays
- Experience timeline layout
- Testimonial cards
- Functional contact form with client-side validation
- SEO meta tags and Open Graph tags
- Structured data (JSON-LD)
- Accessibility: skip link, ARIA labels, focus styles, reduced motion support

### Backend (Optional)
- Express.js REST API
- MongoDB contact message storage
- Input validation with Mongoose schemas
- CORS configuration
- Health check endpoint
- Graceful degradation when database is unavailable

---

## Technologies Used

| Layer | Technologies |
|-------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Font Awesome, Google Fonts |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB |
| **Deployment** | GitHub Pages (frontend), Render/Railway (backend) |

---

## Project Structure

```
FUTURE_FS_001/
├── client/                     # Frontend Application
│   ├── index.html              # Main HTML structure
│   └── assets/
│       ├── css/
│       │   └── style.css       # All styles (responsive + dark mode)
│       ├── js/
│       │   └── main.js         # Navigation, theme, animations, form
│       └── files/
│           └── resume.html     # Resume template (export to PDF)
│
├── server/                     # Backend API
│   ├── package.json
│   ├── server.js               # Express entry point
│   ├── .env                    # Environment variables
│   ├── .env.example
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   └── routes/
│       └── contact.js          # Contact API endpoints
│
├── .gitignore
└── README.md
```

---

## Installation Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) v18+ (for backend only)
- [MongoDB](https://www.mongodb.com/) locally or [MongoDB Atlas](https://www.mongodb.com/atlas) (for backend only)

### Frontend (Quick Start)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FUTURE_FS_001.git
   cd FUTURE_FS_001
   ```

2. **Open the website**
   - Option A: Open `client/index.html` directly in your browser
   - Option B: Use a local server (recommended):
     ```bash
     # Using Python
     cd client
     python -m http.server 5500

     # Using Node.js (npx)
     npx serve client -p 5500
     ```
   - Visit: `http://localhost:5500`

### Backend (Contact Form API)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs at: `http://localhost:5000`

6. **Update API URL** in `client/assets/js/main.js`:
   ```javascript
   API_URL: 'http://localhost:5000/api/contact'
   ```

---

## GitHub Repository

**Repository:** [github.com/yourusername/FUTURE_FS_001](https://github.com/yourusername/FUTURE_FS_001)

Replace `yourusername` with your actual GitHub username throughout the project before deploying.

---

## Live Demo

**Portfolio URL:** [https://yourusername.github.io/FUTURE_FS_001/](https://yourusername.github.io/FUTURE_FS_001/)

### GitHub Pages Deployment

1. Push the project to GitHub
2. Go to **Repository Settings → Pages**
3. Set **Source** to `Deploy from a branch`
4. Select branch: `main` and folder: `/client`
5. Save — your site will be live at `https://yourusername.github.io/FUTURE_FS_001/`

---

## Screenshots

> Add screenshots of your deployed portfolio here.

| Desktop View | Mobile View |
|:------------:|:-----------:|
| ![Desktop](./screenshots/desktop.png) | ![Mobile](./screenshots/mobile.png) |

*Create a `screenshots/` folder and add your own images after deployment.*

---

## Customization

Before submitting or deploying, update these placeholders:

| Item | Location |
|------|----------|
| GitHub username | `index.html`, `main.js`, README |
| LinkedIn profile | `index.html` |
| Email address | `index.html` |
| Resume PDF | `client/assets/files/Amanu_Muhammed_Resume.pdf` |
| Project GitHub links | `index.html` — Projects section |
| Live demo URLs | `index.html` — Projects section |
| Open Graph URL | `index.html` `<head>` |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | Retrieve messages (admin) |

**POST /api/contact** body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Internship Inquiry",
  "message": "Hello, I'd like to discuss an opportunity."
}
```

---

## Author

**Amanu Muhammed**  
Junior Software Engineer & Full-Stack Developer  
Bahir Dar, Ethiopia

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourusername](https://linkedin.com/in/yourusername)
- Email: amanu.muhammed@email.com

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Built for Future Interns Task 1 — Full Stack Web Developer Internship Project*
