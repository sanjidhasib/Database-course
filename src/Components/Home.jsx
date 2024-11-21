import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Users2, ClipboardCheck, Receipt, History, BarChart3 } from "lucide-react";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCommittees: 0,
        approvedBudgets: 0,
        totalTransactions: 0,
        fundBalance: 0,
    });

    const [features, setFeatures] = useState([
        {
            title: "Users Management",
            description: "Add, edit, or remove users in the system.",
            icon: Users,
            color: "bg-purple-500",
            lightColor: "bg-purple-100",
            link: "/user",
        },
        {
            title: "Committee Management",
            description: "Create and manage event or improvement committees.",
            icon: Users2,
            color: "bg-pink-500",
            lightColor: "bg-pink-100",
            link: "/committee",
        },
        {
            title: "Budget Approvals",
            description: "Review and approve or reject proposed budgets.",
            icon: ClipboardCheck,
            color: "bg-green-500",
            lightColor: "bg-green-100",
            link: "/budget",
        },
        {
            title: "Transaction Records",
            description: "View all financial transactions in detail.",
            icon: Receipt,
            color: "bg-orange-500",
            lightColor: "bg-orange-100",
            link: "/transaction",
        },
        {
            title: "Fund History",
            description: "Track the complete history of fund allocations.",
            icon: History,
            color: "bg-blue-500",
            lightColor: "bg-blue-100",
            link: "/fund",
        },
      
    ]);

    // Fetch Dashboard Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, committeesRes, fundsRes, transactionsRes] = await Promise.all([
                    axios.get("http://localhost:5004/users"),
                    axios.get("http://localhost:5004/committees"),
                    axios.get("http://localhost:5004/funds/total"),
                    axios.get("http://localhost:5004/transactions"),
                ]);

                setStats({
                    totalUsers: usersRes.data.length,
                    totalCommittees: committeesRes.data.length,
                    approvedBudgets: 45, // Placeholder: Replace with a dynamic count from backend
                    totalTransactions: transactionsRes.data.length,
                    fundBalance: fundsRes.data.totalAmount || 0,
                });
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur-sm border-b border-indigo-100">
                
            </header>

            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to the Committee Management System!</h2>
                            <p className="text-xl mb-6 text-indigo-100">Effortlessly manage users, committees, budgets, and transactions in one place.</p>
                            <button  type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show now</button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="w-64 h-64 relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                                <svg className="w-64 h-64 text-white relative z-10" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            

            

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Link to={feature.link} key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                                <div className={`p-4 rounded-lg ${feature.lightColor} inline-block`}>
                                    <Icon className={`${feature.color} h-6 w-6`} />
                                </div>
                                <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-purple-500", lightColor: "bg-purple-100" },
                        { label: "Total Committees", value: stats.totalCommittees, icon: Users2, color: "bg-pink-500", lightColor: "bg-pink-100" },
                        { label: "Budgets Approved", value: stats.approvedBudgets, icon: ClipboardCheck, color: "bg-green-500", lightColor: "bg-green-100" },
                        { label: "Total Transactions", value: stats.totalTransactions, icon: Receipt, color: "bg-orange-500", lightColor: "bg-orange-100" },
                        { label: "Fund Balance", value: `$${stats.fundBalance.toLocaleString()}`, icon: History, color: "bg-blue-500", lightColor: "bg-blue-100" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                            <div className={`inline-block p-4 rounded-full ${stat.lightColor}`}>
                                <stat.icon className={`${stat.color} h-6 w-6`} />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
