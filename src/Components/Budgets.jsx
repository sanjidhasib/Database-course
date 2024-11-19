import React, { useState, useEffect } from "react";
import axios from "axios";

const Budgets = () => {
    const [proposals, setProposals] = useState([]);
    const [totalFunds, setTotalFunds] = useState(0); // Default to 0
    const [statusFilter, setStatusFilter] = useState("All");
    const [comment, setComment] = useState("");

    // Fetch proposals and total funds from backend
    useEffect(() => {
        fetchProposalsAndFunds();
    }, []);

    const fetchProposalsAndFunds = async () => {
        try {
            // Fetching proposals
            const proposalsResponse = await axios.get("http://localhost:5004/proposals");
            setProposals(proposalsResponse.data);

            // Fetching total funds
            const fundsResponse = await axios.get("http://localhost:5004/funds/total");
            setTotalFunds(fundsResponse.data.totalAmount); // Assuming 'totalAmount' is returned
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Filtered proposals
    const filteredProposals = proposals.filter(
        (p) => statusFilter === "All" || p.status === statusFilter
    );

    const handleDecision = async (id, status, proposedAmount) => {
        if (status === "Approved" && totalFunds < proposedAmount) {
            alert("Insufficient funds to approve this proposal.");
            return;
        }

        try {
            // Update the proposal status
            await axios.put(`http://localhost:5004/proposals/${id}`, { status, comment });

            // If the proposal is approved, deduct the proposed amount from the total funds
            if (status === "Approved") {
                setTotalFunds((prevFunds) => prevFunds - proposedAmount); // Deduct the funds
            }

            fetchProposalsAndFunds(); // Re-fetch proposals and funds after update
        } catch (error) {
            console.error("Error updating proposal status:", error);
        }
    };

    const totalBudgetRequested = proposals.reduce((sum, p) => sum + p.proposedAmount, 0);
    const totalBudgetApproved = proposals
        .filter((p) => p.status === "Approved")
        .reduce((sum, p) => sum + p.proposedAmount, 0);
    const totalBudgetPending = proposals
        .filter((p) => p.status === "Pending")
        .reduce((sum, p) => sum + p.proposedAmount, 0);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Budget Management Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="card bg-gradient-to-r from-[#6b8fd4] to-[#29afb6] text-black p-4">
                    <h2 className="text-xl font-bold">Total Fund Available</h2>
                    <p className="text-2xl">${totalFunds.toFixed(2)}</p>
                </div>
                
            </div>

           

            {/* Filters */}
            <div className="flex space-x-4 mb-6">
                <select
                    className="select select-bordered"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Proposal Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProposals.map((proposal) => (
                    <div
                        key={proposal.id}
                        className="card bg-base-100 image-full w-96 rounded-full"
                    >
                        <div className="card-body rounded-2xl bg-gradient-to-r from-[#93A5CF] to-[#E4EfE9]">
                            <h2 className="card-title text-black font-bold">{proposal.committeeName}</h2>
                            <p className="text-black">
                                <strong>Proposal ID:</strong> {proposal.id}
                            </p>
                            <p className="text-black">
                                <strong>Description:</strong> {proposal.description}
                            </p>
                            <p className="text-black">
                                <strong>Proposed Amount:</strong> ${proposal.proposedAmount.toFixed(2)}
                            </p>
                            <span
                                className={`badge ${proposal.status === "Approved"
                                        ? "badge-success"
                                        : proposal.status === "Rejected"
                                            ? "badge-error"
                                            : "badge-warning"
                                    }`}
                            >
                                {proposal.status}
                            </span>

                            {proposal.status === "Pending" && (
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleDecision(proposal.id, "Approved", proposal.proposedAmount)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDecision(proposal.id, "Rejected", proposal.proposedAmount)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budgets;
