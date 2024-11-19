import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fund = () => {
    const [funds, setFunds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("Add"); // "Add" or "Edit"
    const [currentFund, setCurrentFund] = useState({
        name: "",
        transactionType: "Add",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0], // Default to today's date
    });

    // Fetch funds from the database
    useEffect(() => {
        fetchFunds();
    }, []);

    const fetchFunds = async () => {
        try {
            const response = await axios.get("http://localhost:5004/funds");
            setFunds(response.data);
        } catch (error) {
            console.error("Error fetching funds:", error);
            toast.error("Failed to fetch funds.");
        }
    };

    // Handle form submission for adding or editing a fund
    const handleSubmit = async () => {
        if (!currentFund.name || !currentFund.amount || !currentFund.date) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            if (modalType === "Add") {
                await axios.post("http://localhost:5004/funds", currentFund);
                toast.success("Fund added successfully!");
            } else {
                await axios.put(
                    `http://localhost:5004/funds/${currentFund.fundId}`,
                    currentFund
                );
                toast.success("Fund updated successfully!");
            }
            fetchFunds();
            setShowModal(false);
        } catch (error) {
            console.error("Error saving fund:", error);
            toast.error("Failed to save the fund.");
        }
    };

    // Calculate total amount
    const calculateTotalAmount = () =>
        funds.reduce((total, fund) => total + parseFloat(fund.amount || 0), 0);

    return (
        <div className="p-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6">Fund Management</h1>

            {/* Total Amount */}
            <div className="mb-4 text-lg">
                <strong>Total Funds:</strong> ${calculateTotalAmount().toFixed(2)}
            </div>

            {/* Fund Table */}
            <div className="overflow-x-auto mb-6">
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>Fund ID</th>
                            <th>Name</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Last Transaction</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.length > 0 ? (
                            funds.map((fund) => (
                                <tr key={fund.fundId}>
                                    <td>{fund.fundId}</td>
                                    <td>{fund.name}</td>
                                    <td>{fund.transactionType}</td>
                                    <td>${parseFloat(fund.amount).toFixed(2)}</td>
                                    <td>{fund.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={() => {
                                                setModalType("Edit");
                                                setCurrentFund(fund);
                                                setShowModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={async () => {
                                                try {
                                                    await axios.delete(
                                                        `http://localhost:5004/funds/${fund.fundId}`
                                                    );
                                                    fetchFunds();
                                                    toast.success("Fund deleted successfully!");
                                                } catch (error) {
                                                    console.error("Error deleting fund:", error);
                                                    toast.error("Failed to delete the fund.");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No funds available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Fund Button */}
            <button
                className="btn btn-primary mb-6"
                onClick={() => {
                    setModalType("Add");
                    setCurrentFund({
                        name: "",
                        transactionType: "Add",
                        amount: "",
                        description: "",
                        date: new Date().toISOString().split("T")[0],
                    });
                    setShowModal(true);
                }}
            >
                Add Fund
            </button>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{modalType} Fund</h3>
                        <div className="mt-4">
                            <input
                                type="text"
                                className="input input-bordered w-full mb-4"
                                placeholder="Name"
                                value={currentFund.name}
                                onChange={(e) =>
                                    setCurrentFund({ ...currentFund, name: e.target.value })
                                }
                            />
                            <select
                                className="select select-bordered w-full mb-4"
                                value={currentFund.transactionType}
                                onChange={(e) =>
                                    setCurrentFund({
                                        ...currentFund,
                                        transactionType: e.target.value,
                                    })
                                }
                            >
                                <option value="Add">Add</option>
                                <option value="Spend">Spend</option>
                            </select>
                            <input
                                type="number"
                                className="input input-bordered w-full mb-4"
                                placeholder="Amount"
                                value={currentFund.amount}
                                onChange={(e) =>
                                    setCurrentFund({ ...currentFund, amount: e.target.value })
                                }
                            />
                            <textarea
                                className="textarea textarea-bordered w-full mb-4"
                                placeholder="Description"
                                value={currentFund.description}
                                onChange={(e) =>
                                    setCurrentFund({
                                        ...currentFund,
                                        description: e.target.value,
                                    })
                                }
                            ></textarea>
                            <input
                                type="date"
                                className="input input-bordered w-full mb-4"
                                value={currentFund.date}
                                onChange={(e) =>
                                    setCurrentFund({ ...currentFund, date: e.target.value })
                                }
                            />
                            <div className="modal-action">
                                <button className="btn btn-success" onClick={handleSubmit}>
                                    Save
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fund;
