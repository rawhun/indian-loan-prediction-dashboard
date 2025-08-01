🏦 Indian Loan Prediction Dashboard

A complete, end-to-end web dashboard MVP for loan approval predictions using AI/ML, specifically designed for the Indian market. Built with Node.js, Express, React, and Machine Learning.

![Loan Prediction Dashboard](https://img.shields.io/badge/Status-Live-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-22.17.1-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![ML](https://img.shields.io/badge/ML-Logistic%20Regression-orange)
![Currency](https://img.shields.io/badge/Currency-INR%20(₹)-yellow)

🚀 Live Demo

Access the dashboard: [http://localhost:3000](http://localhost:3000)

✨ Features

Core Functionality
- Credit Score Analysis: Look up any credit score (300-850) to see a simulated 6-month history
- AI Loan Predictions: Get instant approval predictions with probability and maximum loan amounts in INR
- Interactive Charts: Visualize credit history and prediction trends
- Demo Section: Try predictions with Indian sample borrower profiles
- Prediction History: Track your session's predictions with analytics
- Dynamic Credit Tips: Personalized improvement advice based on credit score

Technical Stack
- Backend: Node.js + Express + ML (Logistic Regression)
- Frontend: React + Tailwind CSS + Recharts
- ML Model: Trained on 2000+ realistic loan applications
- API: RESTful endpoints with validation and error handling
- Currency: Indian Rupees (₹) throughout the application

📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

🛠️ Installation & Setup

Quick Start (Two Commands)

1. Install dependencies and start the server:
   ```bash
   npm run install && npm run start:server
   ```

2. In a new terminal, start the client:
   ```bash
   npm run start:client
   ```

Note: The frontend connects directly to the backend API at `http://localhost:5001`. Both servers must be running for the dashboard to work properly.

Detailed Setup

1. Clone and navigate to the project:
   ```bash
   git clone https://github.com/rawhun/loan-prediction-dashboard.git
   cd loan-prediction-dashboard
   ```

2. Install all dependencies:
   ```bash
   npm run install
   ```

3. Start the backend server:
   ```bash
   npm run start:server
   ```
   - Server runs on `http://localhost:5001`
   - API endpoints available at `/api/*`

4. Start the React frontend (in a new terminal):
   ```bash
   npm run start:client
   ```
   - Frontend runs on `http://localhost:3000`
   - Automatically proxies API calls to backend

🌐 API Endpoints

Credit Score History
- GET `/api/credit-history?score={score}`
- Returns 6 months of simulated credit score history
- Score range: 300-850

Loan Prediction
- POST `/api/predict`
- Request body: `{ CreditScore, AnnualIncome, LoanTerm, Dependents }`
- Returns: `{ approval_probability, approved, max_loan_amount, message, details, emoji, color }`

Credit Tips
- GET `/api/credit-tips?score={score}`
- Returns personalized credit improvement tips based on score
- Score range: 300-850

Sample Borrowers
- GET `/api/sample-borrowers`
- Returns Indian demo borrower profiles for testing

Health Check
- GET `/api/health`
- Returns server status and model loading state

🎯 How to Use

1. Credit Score Lookup
- Enter any credit score between 300-850
- Click "Lookup" to see 6-month history chart
- View current score and 6-month average
- Get personalized credit improvement tips

2. Loan Approval Prediction
- Fill in the form with your details:
  - Credit Score (300-850)
  - Annual Income (₹10k-₹1M)
  - Loan Term (1-30 years)
  - Number of Dependents (0-10)
- Click "Predict Approval" for instant results
- See approval probability, status, and max loan amount in INR
- View personalized credit improvement tips

3. Try Demo Borrowers
- Click on any Indian sample borrower profile (Priya Sharma, Arjun Patel, Anjali Reddy)
- Instantly see AI predictions for their loan applications
- Compare different borrower scenarios

4. View Prediction History
- All predictions are tracked in your session
- See charts and statistics of your predictions
- View approval rates and average loan amounts

🏗️ Project Structure

```
loan-prediction-dashboard/
├── package.json                 # Main package.json with scripts
├── server/
│   ├── index.js                # Express server entry point
│   ├── model.js                # ML model and data processing
│   └── routes.js               # API route definitions
├── client/
│   ├── package.json            # React app dependencies
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── index.js           # React entry point
│   │   ├── index.css          # Global styles + Tailwind
│   │   └── components/
│   │       ├── CreditScoreLookup.jsx
│   │       ├── LoanApprovalForm.jsx
│   │       ├── PredictionHistory.jsx
│   │       ├── DemoSection.jsx
│   │       └── CreditTips.jsx
│   └── tailwind.config.js     # Tailwind CSS configuration
└── README.md                  # This file
```

🤖 Machine Learning Model

Model Details
- Algorithm: Logistic Regression
- Training Data: 2000+ realistic loan applications
- Features: Credit Score, Annual Income, Loan Term, Dependents
- Output: Approval probability (0-1), approval status (true/false), max loan amount in INR

Training Process
1. Generate realistic loan application data with proper distributions
2. Calculate approval probabilities based on business rules
3. Train logistic regression model
4. Load model into memory on server startup

Prediction Logic
- Credit Score Impact: 40% weight (800+ = excellent, 450- = poor)
- Income Impact: 30% weight (normalized to ₹10L baseline)
- Loan Term Impact: 15% weight (shorter terms preferred)
- Dependents Impact: 15% weight (fewer dependents preferred)

🎨 UI/UX Features

Design Principles
- Minimalistic: Clean white background with centered cards
- Responsive: Works on desktop, tablet, and mobile
- Accessible: Clear labels, proper contrast, keyboard navigation
- Interactive: Smooth animations and hover effects
- Indian Localized: INR currency, Indian names, and context

Color Scheme
- Primary: Blue (#3b82f6) for buttons and accents
- Success: Green for approved loans
- Error: Red for denied loans
- Neutral: Gray scale for text and backgrounds
- Tips: Color-coded priority system (red for critical, orange for high, etc.)

Components
- Credit Score Lookup: Input field with line chart visualization
- Loan Approval Form: Multi-field form with real-time validation
- Prediction Results: Card-based results with clear metrics in INR
- Demo Section: Interactive Indian borrower profiles
- History Chart: Bar chart of recent predictions
- Credit Tips: Dynamic improvement advice with priority indicators

🔧 Development

Available Scripts
```bash
npm run install          # Install all dependencies
npm run start:server     # Start backend server
npm run start:client     # Start React development server
npm run build           # Build React app for production
npm run dev             # Start both server and client (if concurrently installed)
```

Environment Variables
- PORT: Server port (default: 5001)
- NODE_ENV: Environment mode (development/production)

Adding New Features
1. Backend: Add routes in `server/routes.js`
2. Frontend: Create components in `client/src/components/`
3. Styling: Use Tailwind CSS classes
4. Charts: Use Recharts library for visualizations

🚀 Deployment

Local Development
```bash
# Terminal 1: Start backend
npm run start:server

# Terminal 2: Start frontend
npm run start:client
```

Production Build
```bash
# Build React app
npm run build

# Start production server
NODE_ENV=production npm run start:server
```

Free Deployment Options
- Vercel: Deploy frontend and backend
- Netlify: Deploy frontend with serverless functions
- Railway: Full-stack deployment
- Render: Free tier hosting

📊 Performance

Optimization Features
- Lazy Loading: Components load on demand
- Caching: API responses cached in browser
- Compression: Gzip compression for API responses
- Minification: Production builds are minified

Monitoring
- Health check endpoint for uptime monitoring
- Error logging and handling
- Performance metrics tracking

🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

👨‍💻 Author

Rahul (rawhun)
- GitHub: [@rawhun](https://github.com/rawhun)
- Email: connect.txrun@rediffmail.com

🙏 Acknowledgments

- ML Libraries: ml-matrix, ml-logistic-regression
- Charts: Recharts for React
- Styling: Tailwind CSS
- Icons: Emoji icons for visual appeal
- Indian Market: Localized for Indian users with INR currency

---

Built with ❤️ using modern web technologies and machine learning for the Indian market

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/rawhun">rawhun</a> for India 🇮🇳</sub>
</div> 