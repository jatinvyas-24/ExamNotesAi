# 🎓 ExamNotes AI

An intelligent, full-stack MERN application powered by the **Google Gemini API** that helps students automatically generate exam-oriented notes, last-day revision sheets, interactive charts, and Mermaid diagrams. The platform features a credit-based generation system, secure Google Authentication (via Firebase + JWT), and Stripe payment integration.

---

## 🚀 Key Features

*   **Custom AI Note Generation**: Tailors high-yield exam notes based on a custom topic, class level, and exam type.
*   **Dual Study Modes**:
    *   *Detailed Mode*: In-depth definitions, structured explanations, and practical examples formatted in Markdown.
    *   *Revision Mode*: Ultra-condensed definitions, formulas, key terms, and cheat sheets for last-minute cramming.
*   **Dynamic Visualizations**:
    *   **Interactive Charts**: Auto-generates Recharts bar, line, and pie charts based on numeric data within the notes.
    *   **Flowcharts & Process Diagrams**: Generates visual diagrams using Mermaid.js node graphs.
*   **Printable PDF Export**: Instant download of clean, well-formatted, printable PDFs of generated notes using `html-to-image`.
*   **Stripe Credit System**:
    *   Notes cost **2 credits** to generate.
    *   New users receive **50 free credits** upon registration.
    *   Users can purchase credit bundles (100, 200, or 500 INR packs) via a secure Stripe checkout process.
*   **Secure Authentication**: Secure Google OAuth authentication via Firebase client-side login, synced with HTTP-only cookie JWT tokens on the Express backend.

---

## 🛠️ Technology Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Redux Toolkit, Framer Motion, Recharts, Mermaid.js, React Markdown, Axios |
| **Backend** | Node.js, Express, JWT, Cookie Parser, Cors |
| **Database** | MongoDB, Mongoose |
| **AI Integration** | Google Gemini API (`generativelanguage.googleapis.com`) |
| **Third-Party Services** | Stripe (Payments & Webhooks), Firebase (Google Authentication) |

---

## 📂 Project Structure

```text
Exam Notes AI/
├── client/                 # React Frontend (Vite + Tailwind v4)
│   ├── src/
│   │   ├── assets/         # App logos and static graphics
│   │   ├── components/     # Reusable UI components (Navbar, Footer, MenuItems)
│   │   ├── pages/          # Page views (Auth, Home, Notes, History, Pricing, Payment states)
│   │   ├── redux/          # Redux toolkit store and user slice
│   │   ├── services/       # Axios API layer (axios requests, pdf downloads)
│   │   └── utils/          # Client utilities (Firebase config)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Express Backend (Node.js)
    ├── controllers/        # Route controllers (Auth, Credits, AI Notes, PDF)
    ├── middleware/         # Security & Authentication middleware (JWT checks)
    ├── models/             # Mongoose schemas (User, Notes)
    ├── routes/             # Express API endpoints
    ├── services/           # External service integration (Gemini API integration)
    ├── utils/              # Helper utilities (MongoDB connection, AI prompt builder)
    ├── index.js            # Express server entry point
    └── package.json
```

---

## ⚙️ Environment Configuration

To run this project, you need to set up environment variables in both the client and server directories.

### Backend Configurations (`server/.env`)

Create a `.env` file inside the `server/` directory and configure the following:

```env
PORT = 8000
MONGODB_URL = "your_mongodb_connection_string"
JWT_SECRET = "your_custom_jwt_secret_key"
GEMINI_API_KEY = "your_google_gemini_api_key"
STRIPE_SECRET_KEY = "your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET = "your_stripe_webhook_signing_secret"
CLIENT_URL = "http://localhost:5173"
```

### Frontend Configurations (`client/.env`)

Create a `.env` file inside the `client/` directory and configure the following:

```env
VITE_FIREBASE_APIKEY = "your_firebase_api_key"
```

---

## 💻 Installation & Running Locally

### 1. Clone & Set Up Server

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   *(The server will start running on port `8000`)*

### 2. Clone & Set Up Client

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *(The React app will start running on port `5173`)*

---

## 🔌 API Endpoints

### Authentication
*   `POST /api/auth/google` - Exchanges Firebase Google credentials for a JWT cookie and logs in/registers the user.
*   `GET /api/auth/logout` - Clears the authentication cookies.

### User & Credits
*   `GET /api/user/currentuser` - Returns current logged-in user profile, history, and credit balance.
*   `POST /api/credits/create-order` - Initiates a Stripe Checkout session to purchase credits.
*   `POST /api/credits/webhook` - Stripe Webhook endpoint verifying checkout success to credit users' accounts.

### AI Notes Generation
*   `POST /api/notes/generate-notes` - Generates AI exam notes from Gemini based on user criteria (costs 2 credits).
*   `GET /api/notes/my-notes` - Fetches the collection of notes created by the current user.
*   `GET /api/notes/note/:id` - Fetches details for a single note.

