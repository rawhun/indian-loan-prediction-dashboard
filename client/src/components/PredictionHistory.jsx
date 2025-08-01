import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PredictionHistory = ({ predictions }) => {
    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Prepare data for the chart
    const chartData = predictions.slice(-5).map((pred, index) => ({
        name: `Prediction ${index + 1}`,
        approvalChance: Math.round(pred.approval_probability * 100),
        maxLoan: pred.max_loan_amount / 1000, // Convert to thousands for better display
        approved: pred.approved ? 1 : 0
    }));

    // Custom tooltip content
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const originalPrediction = predictions[predictions.length - 5 + chartData.findIndex(d => d.name === label)];
            
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-sm text-gray-600">
                        Approval Chance: <span className="font-semibold text-primary-600">{data.approvalChance}%</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Max Loan: <span className="font-semibold text-green-600">{formatCurrency(originalPrediction.max_loan_amount)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Status: <span className={`font-semibold ${data.approved ? 'text-green-600' : 'text-red-600'}`}>
                            {data.approved ? 'Approved' : 'Denied'}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (predictions.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📈 Prediction History
                </h2>
                <div className="text-center py-8 text-gray-500">
                    <p>No predictions yet. Make your first prediction to see the history chart!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📈 Prediction History
            </h2>
            
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Showing the last {Math.min(5, predictions.length)} predictions from this session
                </p>
            </div>

            {/* Chart */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="name" 
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            domain={[0, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                            dataKey="approvalChance" 
                            fill="#3b82f6" 
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Average Approval Chance</div>
                    <div className="text-xl font-bold text-blue-800">
                        {(predictions.reduce((sum, pred) => sum + pred.approval_probability, 0) / predictions.length * 100).toFixed(1)}%
                    </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Approval Rate</div>
                    <div className="text-xl font-bold text-green-800">
                        {(predictions.filter(pred => pred.approved).length / predictions.length * 100).toFixed(1)}%
                    </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-purple-600 mb-1">Avg Max Loan</div>
                    <div className="text-xl font-bold text-purple-800">
                        {formatCurrency(predictions.reduce((sum, pred) => sum + pred.max_loan_amount, 0) / predictions.length)}
                    </div>
                </div>
            </div>

            {/* Recent Predictions List */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Predictions</h3>
                <div className="space-y-2">
                    {predictions.slice(-5).reverse().map((pred, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <div className="text-sm text-gray-600">
                                    Credit: {pred.input_data.CreditScore} | 
                                    Income: {formatCurrency(pred.input_data.AnnualIncome)} | 
                                    Term: {pred.input_data.LoanTerm}y | 
                                    Dependents: {pred.input_data.Dependents}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    pred.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {pred.approved ? 'Approved' : 'Denied'}
                                </span>
                                <span className="text-sm font-semibold text-primary-600">
                                    {(pred.approval_probability * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PredictionHistory; 