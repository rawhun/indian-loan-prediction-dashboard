import React, { useState } from 'react';
import CreditScoreLookup from './components/CreditScoreLookup';
import LoanApprovalForm from './components/LoanApprovalForm';
import PredictionHistory from './components/PredictionHistory';
import DemoSection from './components/DemoSection';

function App() {
    // State to track prediction history
    const [predictions, setPredictions] = useState([]);

    // Handle new prediction from form
    const handlePredictionComplete = (prediction) => {
        setPredictions(prev => [...prev, prediction]);
    };

    // Handle demo prediction
    const handleDemoPrediction = (prediction) => {
        setPredictions(prev => [...prev, prediction]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🏦 Loan Prediction Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1">
                                AI-powered loan approval predictions and credit analysis
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Powered by ML</div>
                            <div className="text-xs text-gray-400">Logistic Regression</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Credit Score Lookup */}
                        <CreditScoreLookup />
                        
                        {/* Loan Approval Form */}
                        <LoanApprovalForm onPredictionComplete={handlePredictionComplete} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Demo Section */}
                        <DemoSection onDemoPrediction={handleDemoPrediction} />
                        
                        {/* Prediction History */}
                        <PredictionHistory predictions={predictions} />
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        🚀 Dashboard Features
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-xl">🔍</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Credit Score Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Look up any credit score to see a simulated 6-month history with realistic fluctuations.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-xl">🤖</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">AI Predictions</h3>
                            <p className="text-sm text-gray-600">
                                Get instant loan approval predictions with approval probability and maximum loan amounts.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-purple-600 text-xl">📊</span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Analytics Dashboard</h3>
                            <p className="text-sm text-gray-600">
                                Track your prediction history with charts and statistics for better insights.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technical Details */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🔧 Technical Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Backend (Node.js + Express)</h4>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Logistic Regression ML model trained on 1000+ loan applications</li>
                                <li>• RESTful API with validation and error handling</li>
                                <li>• Real-time credit score history generation</li>
                                <li>• Sample borrower profiles for demonstration</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Frontend (React + Tailwind CSS)</h4>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Responsive dashboard with modern UI/UX</li>
                                <li>• Interactive charts using Recharts library</li>
                                <li>• Real-time form validation and feedback</li>
                                <li>• Session-based prediction history tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-sm text-gray-500">
                        <p>Loan Prediction Dashboard - AI-powered loan approval predictions</p>
                        <p className="mt-1">Built with Node.js, Express, React, and Machine Learning</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App; 