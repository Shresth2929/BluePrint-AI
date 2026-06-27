# 🏗️ BluePrint AI
### AI-Powered Architectural Visualization SaaS Platform

Transform traditional 2D architectural floor plans into realistic AI-generated 3D visualizations using modern Generative AI workflows.

---

## 🔗 Live Demo

👉 https://blue-print-ai-five.vercel.app

## 📂 GitHub Repository

👉 https://github.com/Shresth2929/BluePrint-AI

---

# 📖 Overview

BluePrint AI is a full-stack AI SaaS platform designed to bridge the gap between traditional architectural planning and modern visualization technologies.

The platform enables architects, interior designers, builders, and homeowners to upload 2D architectural floor plans and generate realistic AI-powered visualizations through automated generative workflows.

The project demonstrates production-level full-stack engineering by integrating AI services, authentication systems, cloud storage, database management, and scalable frontend architecture.

---

# 🚀 Key Features

### 🔐 Authentication & Security
- Secure user authentication using Clerk
- Protected routes and session management
- User-specific project isolation

### 🏗️ AI Architectural Visualization
- Upload 2D floor plans
- Generate AI-powered architectural visualizations
- Automated rendering workflow
- Intelligent image transformation pipeline

### 📁 Project Management
- Create and manage multiple projects
- Persistent project storage
- Project dashboard interface
- Real-time state updates

### ☁️ Cloud Storage
- Secure image uploads
- Cloudinary asset management
- Optimized media delivery
- Persistent cloud storage

### ⚡ Performance Optimization
- Server-side rendering using Next.js
- Optimized API communication
- Reusable component architecture
- Responsive user experience

---

# 🏛️ System Architecture

```text
                User
                  │
                  ▼
         Next.js Frontend
                  │
                  ▼
            REST APIs
                  │
                  ▼
             Gemini AI
                  │
                  ▼
             Cloudinary
                  │
                  ▼
        PostgreSQL Database
                  │
                  ▼
             Prisma ORM
```

---

# 🖼️ Application Workflow

```text
Upload Floor Plan
        │
        ▼
Validate User
        │
        ▼
Store Image in Cloudinary
        │
        ▼
Send Request to Gemini AI
        │
        ▼
Generate Visualization
        │
        ▼
Save Project Metadata
        │
        ▼
Display Final Output
```

---

# 📸 Screenshots

## Landing Page

![Landing Page](./screenshots/landing.png)

---

## Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## Upload Interface

![Upload](./screenshots/upload.png)

---

## AI Generated Result

![Result](./screenshots/result.png)

---

# 💡 Problem Statement

Traditional architectural visualization processes are:

- Expensive
- Time-consuming
- Technically complex
- Resource intensive

BluePrint AI solves these challenges by automating visualization generation through modern AI workflows, enabling faster concept validation and improved client communication.

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | Next.js, React.js, TypeScript |
| Backend | Node.js, REST APIs |
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Authentication | Clerk |
| State Management | Zustand |
| Styling | Tailwind CSS |
| AI Integration | Gemini API |
| Media Storage | Cloudinary |
| Deployment | Vercel |

---

# 📂 Project Structure

```bash
BluePrint-AI
│
├── app
├── components
├── hooks
├── lib
├── prisma
├── public
├── store
├── types
│
├── middleware.ts
├── next.config.ts
├── package.json
└── README.md
```

---

# ✨ Technical Highlights

✔ Built a production-ready full-stack SaaS application

✔ Integrated Generative AI workflows using Gemini AI APIs

✔ Implemented secure authentication and authorization using Clerk

✔ Designed scalable backend architecture using REST APIs

✔ Utilized PostgreSQL and Prisma ORM for persistent storage

✔ Managed cloud-based image assets using Cloudinary

✔ Implemented global state management using Zustand

✔ Developed responsive UI using Next.js and Tailwind CSS

✔ Deployed application using Vercel production infrastructure

---

# 📚 Key Learnings

This project helped me gain practical experience in:

- Full-stack application architecture
- SaaS product development
- Authentication and authorization
- Database design and optimization
- ORM implementation using Prisma
- Cloud storage management
- Generative AI integration
- API design principles
- State management patterns
- Production deployment workflows

---

# 🚀 Future Enhancements

- Multi-floor building support
- Video walkthrough generation
- AR/VR architectural visualization
- Collaborative workspace features
- AI style customization
- Payment gateway integration
- Team project management
- Architectural analytics dashboard

---

# ⚙️ Local Installation

Clone the repository:

```bash
git clone https://github.com/Shresth2929/BluePrint-AI.git
```

Move into the project:

```bash
cd BluePrint-AI
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```bash
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GEMINI_API_KEY=
CLOUDINARY_API_KEY=
```

Run development server:

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# 📈 Resume Highlights

- Developed an AI-powered architectural visualization SaaS platform using Next.js, PostgreSQL, Prisma, and Gemini AI.
- Built secure authentication, cloud storage, project management, and AI rendering workflows.
- Designed scalable REST APIs and deployed the production-ready application using Vercel.

---

# 👨‍💻 Author

**Shresth Veer Singh**

- GitHub: https://github.com/Shresth2929
- LinkedIn: (Add your LinkedIn URL)
- Portfolio: (Add your portfolio URL)

---

⭐ If you found this project interesting, consider giving it a star.
