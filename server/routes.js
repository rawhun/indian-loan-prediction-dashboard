const express = require('express');
const router = express.Router();

class LoanRoutes {
    constructor(model) {
        this.model = model;
        this.setupRoutes();
    }

    setupRoutes() {
        router.get('/api/credit-history', (req, res) => {
            try {
                const score = parseInt(req.query.score);
                
                if (!score || score < 300 || score > 850) {
                    return res.status(400).json({
                        error: 'Invalid credit score. Must be between 300 and 850.'
                    });
                }

                const creditHistory = this.model.generateCreditHistory(score);
                
                res.json({
                    score: score,
                    history: creditHistory,
                    message: `Credit history generated for score ${score}`
                });
                
            } catch (error) {
                console.error('❌ Error in credit history endpoint:', error);
                res.status(500).json({
                    error: 'Internal server error while generating credit history'
                });
            }
        });

        router.post('/api/predict', (req, res) => {
            try {
                const { CreditScore, AnnualIncome, LoanTerm, Dependents } = req.body;
                
                if (!CreditScore || !AnnualIncome || !LoanTerm || Dependents === undefined) {
                    return res.status(400).json({
                        error: 'Missing required fields: CreditScore, AnnualIncome, LoanTerm, Dependents'
                    });
                }

                const validationErrors = this.validateInputs(CreditScore, AnnualIncome, LoanTerm, Dependents);
                if (validationErrors.length > 0) {
                    return res.status(400).json({
                        error: 'Validation errors',
                        details: validationErrors
                    });
                }

                const prediction = this.model.predict({
                    CreditScore: parseInt(CreditScore),
                    AnnualIncome: parseInt(AnnualIncome),
                    LoanTerm: parseInt(LoanTerm),
                    Dependents: parseInt(Dependents)
                });

                const response = {
                    approval_probability: Math.round(prediction.approval_probability * 100) / 100,
                    approved: prediction.approved,
                    max_loan_amount: prediction.max_loan_amount,
                    message: prediction.message,
                    details: prediction.details,
                    emoji: prediction.emoji,
                    color: prediction.color,
                    input_data: {
                        CreditScore: parseInt(CreditScore),
                        AnnualIncome: parseInt(AnnualIncome),
                        LoanTerm: parseInt(LoanTerm),
                        Dependents: parseInt(Dependents)
                    }
                };

                res.json(response);
                
            } catch (error) {
                console.error('❌ Error in prediction endpoint:', error);
                res.status(500).json({
                    error: 'Internal server error while making prediction'
                });
            }
        });

        router.get('/api/sample-borrowers', (req, res) => {
            try {
                const sampleBorrowers = [
                    {
                        name: "Priya Sharma",
                        description: "High-income professional with excellent credit",
                        CreditScore: 780,
                        AnnualIncome: 95000,
                        LoanTerm: 15,
                        Dependents: 1
                    },
                    {
                        name: "Arjun Patel",
                        description: "Recent graduate with moderate credit score",
                        CreditScore: 650,
                        AnnualIncome: 45000,
                        LoanTerm: 20,
                        Dependents: 0
                    },
                    {
                        name: "Anjali Reddy",
                        description: "Family with multiple dependents",
                        CreditScore: 620,
                        AnnualIncome: 65000,
                        LoanTerm: 25,
                        Dependents: 3
                    }
                ];

                res.json({
                    borrowers: sampleBorrowers,
                    message: "Sample borrowers for demonstration"
                });
                
            } catch (error) {
                console.error('❌ Error in sample borrowers endpoint:', error);
                res.status(500).json({
                    error: 'Internal server error while fetching sample borrowers'
                });
            }
        });

        router.get('/api/health', (req, res) => {
            res.json({
                status: 'healthy',
                model_loaded: this.model.isTrained,
                timestamp: new Date().toISOString()
            });
        });

        router.get('/api/credit-tips', (req, res) => {
            try {
                const score = parseInt(req.query.score);
                
                if (!score || score < 300 || score > 850) {
                    return res.status(400).json({
                        error: 'Invalid credit score. Must be between 300 and 850.'
                    });
                }

                const tips = this.generateCreditTips(score);
                
                res.json({
                    score: score,
                    tips: tips,
                    message: `Credit improvement tips for score ${score}`
                });
                
            } catch (error) {
                console.error('❌ Error in credit tips endpoint:', error);
                res.status(500).json({
                    error: 'Internal server error while generating credit tips'
                });
            }
        });
    }

    validateInputs(creditScore, annualIncome, loanTerm, dependents) {
        const errors = [];
        
        if (creditScore < 300 || creditScore > 850) {
            errors.push('Credit score must be between 300 and 850');
        }
        
        if (annualIncome < 10000 || annualIncome > 1000000) {
            errors.push('Annual income must be between ₹10,000 and ₹1,000,000');
        }
        
        if (loanTerm < 1 || loanTerm > 30) {
            errors.push('Loan term must be between 1 and 30 years');
        }
        
        if (dependents < 0 || dependents > 10) {
            errors.push('Number of dependents must be between 0 and 10');
        }
        
        return errors;
    }

    generateCreditTips(score) {
        const tips = [];
        
        if (score >= 800) {
            tips.push({
                category: "Maintenance",
                title: "Keep Up the Excellent Work!",
                description: "Your credit score is outstanding. Continue paying bills on time and maintain low credit utilization.",
                priority: "low"
            });
            tips.push({
                category: "Optimization",
                title: "Consider Credit Mix",
                description: "You might benefit from diversifying your credit types (credit cards, loans, etc.) for even better scores.",
                priority: "low"
            });
        } else if (score >= 750) {
            tips.push({
                category: "Payment History",
                title: "Maintain Perfect Payment Record",
                description: "Continue paying all bills on time. Even one late payment can significantly impact your score.",
                priority: "medium"
            });
            tips.push({
                category: "Credit Utilization",
                title: "Keep Credit Utilization Low",
                description: "Try to use less than 30% of your available credit. Under 10% is ideal for the best scores.",
                priority: "medium"
            });
        } else if (score >= 700) {
            tips.push({
                category: "Credit Utilization",
                title: "Reduce Credit Card Balances",
                description: "Pay down credit card balances to reduce your credit utilization ratio below 30%.",
                priority: "high"
            });
            tips.push({
                category: "Payment History",
                title: "Never Miss a Payment",
                description: "Set up automatic payments to ensure you never miss a due date.",
                priority: "high"
            });
            tips.push({
                category: "Credit Mix",
                title: "Consider a Credit Builder Loan",
                description: "A small personal loan can help diversify your credit mix and improve your score.",
                priority: "medium"
            });
        } else if (score >= 650) {
            tips.push({
                category: "Payment History",
                title: "Focus on On-Time Payments",
                description: "Payment history is 35% of your score. Make every payment on time, no exceptions.",
                priority: "high"
            });
            tips.push({
                category: "Credit Utilization",
                title: "Pay Down High-Interest Debt",
                description: "Focus on paying off credit cards and high-interest loans first.",
                priority: "high"
            });
            tips.push({
                category: "Credit History",
                title: "Don't Close Old Accounts",
                description: "Keep old credit accounts open to maintain a longer credit history.",
                priority: "medium"
            });
        } else if (score >= 600) {
            tips.push({
                category: "Emergency",
                title: "Address Any Late Payments",
                description: "Contact creditors to see if you can remove late payments from your report.",
                priority: "critical"
            });
            tips.push({
                category: "Debt Management",
                title: "Create a Debt Repayment Plan",
                description: "Focus on paying off debts systematically, starting with the highest interest rates.",
                priority: "high"
            });
            tips.push({
                category: "Credit Building",
                title: "Consider a Secured Credit Card",
                description: "A secured credit card can help rebuild your credit with responsible use.",
                priority: "medium"
            });
        } else if (score >= 550) {
            tips.push({
                category: "Critical",
                title: "Address All Negative Items",
                description: "Work on removing any collections, charge-offs, or other negative items from your report.",
                priority: "critical"
            });
            tips.push({
                category: "Debt Reduction",
                title: "Focus on Debt Elimination",
                description: "Create a strict budget and prioritize paying off all outstanding debts.",
                priority: "high"
            });
            tips.push({
                category: "Credit Building",
                title: "Start with a Secured Card",
                description: "Apply for a secured credit card to begin rebuilding your credit history.",
                priority: "medium"
            });
        } else {
            tips.push({
                category: "Emergency",
                title: "Seek Professional Help",
                description: "Consider working with a credit counselor to develop a comprehensive debt management plan.",
                priority: "critical"
            });
            tips.push({
                category: "Legal",
                title: "Check for Errors",
                description: "Review your credit report for any errors or inaccuracies that can be disputed.",
                priority: "high"
            });
            tips.push({
                category: "Foundation",
                title: "Start Building Credit",
                description: "Begin with a secured credit card or credit builder loan to establish positive credit history.",
                priority: "medium"
            });
        }
        
        return tips;
    }

    getRouter() {
        return router;
    }
}

module.exports = LoanRoutes; 