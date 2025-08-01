import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DemoSection = ({ onDemoPrediction }) => {
    const [sampleBorrowers, setSampleBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch sample borrowers from API
    useEffect(() => {
        const fetchSampleBorrowers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/sample-borrowers');
                setSampleBorrowers(response.data.borrowers);
            } catch (err) {
                setError('Failed to load sample borrowers');
                console.error('Error fetching sample borrowers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSampleBorrowers();
    }, []);

    // Handle demo prediction
    const handleDemoPrediction = async (borrower) => {
        try {
            const response = await axios.post('http://localhost:5001/api/predict', {
                CreditScore: borrower.CreditScore,
                AnnualIncome: borrower.AnnualIncome,
                LoanTerm: borrower.LoanTerm,
                Dependents: borrower.Dependents
            });

            // Notify parent component about the demo prediction
            if (onDemoPrediction) {
                onDemoPrediction(response.data);
            }
        } catch (err) {
            console.error('Error making demo prediction:', err);
        }
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    🎯 Try a Demo
                </h2>
                <div className="text-center py-8">
                    <div className="animate-pulse text-gray-500">Loading sample borrowers...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    🎯 Try a Demo
                </h2>
                <div className="text-center py-8 text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🎯 Try a Demo
            </h2>
            
            <p className="text-gray-600 mb-6">
                Click on any sample borrower below to see how our AI model predicts their loan approval:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleBorrowers.map((borrower, index) => (
                    <div 
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleDemoPrediction(borrower)}
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-primary-600 font-bold text-lg">
                                    {borrower.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            
                            <h3 className="font-semibold text-gray-800 mb-1">
                                {borrower.name}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-3">
                                {borrower.description}
                            </p>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Credit Score:</span>
                                    <span className="font-semibold text-gray-800">{borrower.CreditScore}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Annual Income:</span>
                                    <span className="font-semibold text-gray-800">
                                        {formatCurrency(borrower.AnnualIncome)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Loan Term:</span>
                                    <span className="font-semibold text-gray-800">{borrower.LoanTerm} years</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Dependents:</span>
                                    <span className="font-semibold text-gray-800">{borrower.Dependents}</span>
                                </div>
                            </div>
                            
                            <button className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                                Predict for {borrower.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 How the Demo Works</h4>
                <p className="text-sm text-blue-700">
                    These are realistic borrower profiles based on common loan application patterns. 
                    Click on any borrower to instantly see our AI model's prediction for their loan approval. 
                    This demonstrates how different factors like credit score, income, loan term, and dependents 
                    affect approval chances and maximum loan amounts.
                </p>
            </div>
        </div>
    );
};

export default DemoSection; 