import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyCheckAlt, FaUsers, FaTasks, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
    const [budgets, setBudgets] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [events, setEvents] = useState([]);

  
    useEffect(() => {
        axios.get('http://localhost:5004/budgets')
            .then(response => {
                setBudgets(response.data);
            })
            .catch(error => {
                console.error("Error fetching budgets: ", error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5004/committees')
            .then(response => {
                setCommittees(response.data);
            })
            .catch(error => {
                console.error("Error fetching committees: ", error);
            });
    }, []);

    
    useEffect(() => {
        axios.get('http://localhost:5004/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("Error fetching events: ", error);
            });
    }, []);

    
    const handleEventDecision = (eventId, status) => {
        if (!eventId) {
            console.error("Error: Event ID is undefined."); 
            return;
        }

        axios.patch(`http://localhost:5004/events/${eventId}`, { status })
            .then(response => {
                console.log("Response data:", response.data); 
               
                setEvents(prevEvents => prevEvents.map(event => 
                    event.id === eventId ? { ...event, status } : event
                ));
            })
            .catch(error => {
                console.error("Error updating event status: ", error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-indigo-200">
            {/* Banner Section */}
            <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-40">
                    <h1 className="text-4xl text-white font-bold">Finance Management System</h1>
                    <p className="text-md text-center text-white mt-2">
                        The Finance Management System is an integrated platform designed to streamline budgeting, expense tracking, and financial reporting within organizations. It enhances transparency and accountability by enabling users to efficiently manage funds, track transactions, and oversee committee activities. 
                    </p>
                </div>
            </div>

            {/* Project Overview */}
            <div className="container mx-auto mt-8 text-center px-4">
                <h2 className="text-2xl font-semibold">Project Overview</h2>
                <p className="mt-4 text-gray-700">
                    This Finance Management System allows heads to manage committees, allocate budgets, track transactions, and oversee events seamlessly. The objective is to promote financial transparency and accountability within academic disciplines.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaMoneyCheckAlt size={50} />
                    <h3 className="text-xl font-semibold mt-4">Total Funds</h3>
                    <p className="text-3xl mt-2">${budgets.reduce((total, budget) => total + budget.amount, 0)}</p>
                </div>
                <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaUsers size={50} />
                    <h3 className="text-xl font-semibold mt-4">Active Committees</h3>
                    <p className="text-3xl mt-2">{committees.length}</p>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <FaTasks size={50} />
                    <h3 className="text-xl font-semibold mt-4">Budgets in Progress</h3>
                    <p className="text-3xl mt-2">{budgets.filter(budget => budget.spent < budget.amount).length}</p>
                </div>
            </div>

            {/* Budgets Progress Section */}
            <div className="container mx-auto mt-8 px-4">
                <h2 className="text-2xl font-semibold text-center">Budgets Progress</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
                    {budgets.map((budget) => (
                        <div key={budget.id} className="mb-4">
                            <h4 className="font-semibold">{budget.category}</h4>
                            <div className="h-2 bg-gray-200 rounded">
                                <div className="h-full bg-green-500 rounded" style={{ width: `${(budget.spent / budget.amount) * 100}%` }} />
                            </div>
                            <p className="text-sm text-gray-600">{Math.round((budget.spent / budget.amount) * 100)}% of the budget used</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="container mx-auto mt-8 px-4 mb-8">
                <h2 className="text-2xl font-semibold">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold">Approve Budgets</h3>
                        <p className="mt-2">Review and approve pending budget requests.</p>
                        <Link to="/manage-budgets" className="inline-block mt-4 px-4 py-2 bg-white text-purple-600 rounded">Go to Budgets</Link>
                    </div>
                    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold">Manage Events</h3>
                        <p className="mt-2">View and approve event funding requests.</p>
                        <Link to="/event" className="inline-block mt-4 px-4 py-2 bg-white text-blue-600 rounded">Go to Events</Link>
                    </div>
                </div>
            </div>

            {/* Admin Review Section */}
            <div className="container mx-auto mt-8 px-4">
                <h2 className="text-2xl font-semibold text-center">Admin Review Section</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
                    <h3 className="text-xl font-semibold">Pending Events</h3>
                    {events.length === 0 ? (
                        <p className="text-gray-600">No pending events to review.</p>
                    ) : (
                        events.filter(event => event.status === 'pending').map((event) => (
                            <div key={event.id} className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="font-semibold">{event.title}</h4>
                                    <p className="text-sm text-gray-600">Requested by: {event.creator_email}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                        onClick={() => {
                                            console.log(event); 
                                            handleEventDecision(event.id, 'approved'); 
                                        }}
                                    >
                                        <FaCheckCircle /> Approve
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                        onClick={() => {
                                            console.log(event); 
                                            handleEventDecision(event.id, 'rejected'); 
                                        }}
                                    >
                                        <FaTimesCircle /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
