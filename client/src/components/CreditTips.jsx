import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreditTips = ({ creditScore }) => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (creditScore && creditScore >= 300 && creditScore <= 850) {
            fetchTips();
        }
    }, [creditScore]);

    const fetchTips = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`http://localhost:5001/api/credit-tips?score=${creditScore}`);
            setTips(response.data.tips);
        } catch (err) {
            setError('Failed to load credit tips. Please try again.');
            console.error('Error fetching credit tips:', err);
        } finally {
            setLoading(false);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 border-red-300 text-red-800';
            case 'high': return 'bg-orange-100 border-orange-300 text-orange-800';
            case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            case 'low': return 'bg-green-100 border-green-300 text-green-800';
            default: return 'bg-blue-100 border-blue-300 text-blue-800';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'critical': return '🚨';
            case 'high': return '⚠️';
            case 'medium': return '📝';
            case 'low': return '✅';
            default: return '💡';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Payment History': return '📅';
            case 'Credit Utilization': return '💳';
            case 'Credit Mix': return '🔄';
            case 'Credit History': return '📊';
            case 'Debt Management': return '💰';
            case 'Credit Building': return '🏗️';
            case 'Maintenance': return '🔧';
            case 'Optimization': return '⚡';
            case 'Emergency': return '🚨';
            case 'Legal': return '⚖️';
            case 'Foundation': return '🏛️';
            case 'Critical': return '🚨';
            case 'Debt Reduction': return '📉';
            default: return '💡';
        }
    };

    if (!creditScore || creditScore < 300 || creditScore > 850) {
        return null;
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Credit Improvement Tips</h3>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Credit Improvement Tips</h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-bold text-gray-800">Credit Improvement Tips</h3>
            </div>
            
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                    <strong>Credit Score: {creditScore}</strong> - Here are personalized tips to improve your credit score:
                </p>
            </div>

            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div 
                        key={index} 
                        className={`p-4 rounded-lg border-2 ${getPriorityColor(tip.priority)}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-xl">{getPriorityIcon(tip.priority)}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm">{getCategoryIcon(tip.category)}</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide bg-white bg-opacity-50 px-2 py-1 rounded">
                                        {tip.category}
                                    </span>
                                </div>
                                <h4 className="font-semibold mb-2">{tip.title}</h4>
                                <p className="text-sm leading-relaxed">{tip.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Quick Actions</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Check your credit report regularly</li>
                    <li>• Set up payment reminders</li>
                    <li>• Keep credit card balances low</li>
                    <li>• Avoid opening too many new accounts</li>
                </ul>
            </div>
        </div>
    );
};

export default CreditTips; 