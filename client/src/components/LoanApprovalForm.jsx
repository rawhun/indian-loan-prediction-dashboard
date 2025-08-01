import React, { useState } from 'react';
import axios from 'axios';
import CreditTips from './CreditTips';

const LoanApprovalForm = ({ onPredictionComplete }) => {
    const [formData, setFormData] = useState({
        CreditScore: '',
        AnnualIncome: '',
        LoanTerm: '',
        Dependents: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form data
        if (!formData.CreditScore || !formData.AnnualIncome || !formData.LoanTerm || formData.Dependents === '') {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5001/api/predict', formData);
            setPrediction(response.data);
            
            // Notify parent component about new prediction
            if (onPredictionComplete) {
                onPredictionComplete(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to get prediction. Please try again.');
            console.error('Error getting prediction:', err);
        } finally {
            setLoading(false);
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

    // Get approval status color and text
    const getApprovalStatus = () => {
        if (!prediction) return { color: '', text: '' };
        
        if (prediction.approved) {
            return { color: 'text-green-600', text: 'Likely Approved' };
        } else {
            return { color: 'text-red-600', text: 'Likely Denied' };
        }
    };

    const approvalStatus = getApprovalStatus();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💰 Loan Approval Predictor
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Credit Score
                        </label>
                        <input
                            type="number"
                            name="CreditScore"
                            value={formData.CreditScore}
                            onChange={handleInputChange}
                            placeholder="300-850"
                            min="300"
                            max="850"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Income (₹)
                        </label>
                        <input
                            type="number"
                            name="AnnualIncome"
                            value={formData.AnnualIncome}
                            onChange={handleInputChange}
                            placeholder="e.g., 500000"
                            min="10000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loan Term (Years)
                        </label>
                        <input
                            type="number"
                            name="LoanTerm"
                            value={formData.LoanTerm}
                            onChange={handleInputChange}
                            placeholder="1-30"
                            min="1"
                            max="30"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Dependents
                        </label>
                        <input
                            type="number"
                            name="Dependents"
                            value={formData.Dependents}
                            onChange={handleInputChange}
                            placeholder="0-10"
                            min="0"
                            max="10"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>
                </div>
                
                {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {loading ? 'Analyzing...' : 'Predict Approval'}
                </button>
            </form>

            {/* Prediction Results */}
            {prediction && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-slide-up">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        📊 Prediction Results
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border">
                            <div className="text-sm text-gray-600 mb-1">Approval Chance</div>
                            <div className="text-2xl font-bold text-primary-600">
                                {(prediction.approval_probability * 100).toFixed(1)}%
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border">
                            <div className="text-sm text-gray-600 mb-1">Status</div>
                            <div className={`text-xl font-bold ${approvalStatus.color}`}>
                                {approvalStatus.text}
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border">
                            <div className="text-sm text-gray-600 mb-1">Max Loan Amount</div>
                            <div className="text-xl font-bold text-green-600">
                                {formatCurrency(prediction.max_loan_amount)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Cool Approval Message */}
                    {prediction.message && (
                        <div className={`mt-4 p-6 rounded-lg border-2 ${
                            prediction.color === 'success' ? 'bg-green-50 border-green-200' :
                            prediction.color === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-red-50 border-red-200'
                        }`}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{prediction.emoji}</span>
                                <h4 className="text-xl font-bold text-gray-800">
                                    {prediction.message}
                                </h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {prediction.details}
                            </p>
                        </div>
                    )}
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">💡 Analysis Summary</h4>
                        <p className="text-sm text-blue-700">
                            Based on your credit score of {prediction.input_data.CreditScore}, 
                            annual income of {formatCurrency(prediction.input_data.AnnualIncome)}, 
                            {prediction.input_data.LoanTerm}-year loan term, and {prediction.input_data.Dependents} dependents, 
                            our AI model predicts a {(prediction.approval_probability * 100).toFixed(1)}% chance of approval 
                            with a maximum loan amount of {formatCurrency(prediction.max_loan_amount)}.
                        </p>
                    </div>

                    {/* Credit Tips Section */}
                    <CreditTips creditScore={prediction.input_data.CreditScore} />
                </div>
            )}
        </div>
    );
};

export default LoanApprovalForm; 