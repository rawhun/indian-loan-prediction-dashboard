import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CreditTips from './CreditTips';

const CreditScoreLookup = () => {
    const [creditScore, setCreditScore] = useState('');
    const [creditHistory, setCreditHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle credit score lookup
    const handleLookup = async () => {
        if (!creditScore || creditScore < 300 || creditScore > 850) {
            setError('Please enter a valid credit score between 300 and 850');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:5001/api/credit-history?score=${creditScore}`);
            setCreditHistory(response.data.history);
        } catch (err) {
            setError('Failed to fetch credit history. Please try again.');
            console.error('Error fetching credit history:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLookup();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🔍 Credit Score Lookup
            </h2>
            
            <div className="mb-6">
                <div className="flex gap-3">
                    <input
                        type="number"
                        value={creditScore}
                        onChange={(e) => setCreditScore(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter credit score (300-850)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        min="300"
                        max="850"
                    />
                    <button
                        onClick={handleLookup}
                        disabled={loading}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Loading...' : 'Lookup'}
                    </button>
                </div>
                
                {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
            </div>

            {/* Credit Score History Chart */}
            {creditHistory && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        📈 Credit Score History (Last 6 Months)
                    </h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={creditHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                    dataKey="date" 
                                    stroke="#6b7280"
                                    fontSize={12}
                                />
                                <YAxis 
                                    stroke="#6b7280"
                                    fontSize={12}
                                    domain={[300, 850]}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                    labelStyle={{ color: '#374151' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold text-blue-800">Current Score:</span>
                            <span className="ml-2 text-blue-600">{creditHistory[creditHistory.length - 1]?.score}</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold text-green-800">6-Month Average:</span>
                            <span className="ml-2 text-green-600">
                                {Math.round(creditHistory.reduce((sum, item) => sum + item.score, 0) / creditHistory.length)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Credit Tips Section */}
            {creditHistory && (
                <CreditTips creditScore={creditHistory[creditHistory.length - 1]?.score} />
            )}

            {/* Help text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                    💡 <strong>How it works:</strong> Enter any credit score between 300-850 to see a simulated 
                    6-month history of that score. This helps visualize how credit scores typically fluctuate over time.
                </p>
            </div>
        </div>
    );
};

export default CreditScoreLookup; 