import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "daisyui";

const CommitteesOverview = () => {
    const [committees, setCommittees] = useState([]);
    const [members, setMembers] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [selectedCommittee, setSelectedCommittee] = useState(null);
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [actionComment, setActionComment] = useState("");

    // Fetch committees, members, and proposals from the backend
    useEffect(() => {
        axios
            .get(`http://localhost:5004/committees`)
            .then((response) => setCommittees(response.data))
            .catch((err) => console.error("Error fetching committees:", err));

        axios
            .get("http://localhost:5004/users")
            .then((response) => setMembers(response.data))
            .catch((err) => console.error("Error fetching members:", err));

        axios
            .get("http://localhost:5004/proposals")
            .then((response) => setProposals(response.data))
            .catch((err) => console.error("Error fetching proposals:", err));
    }, []);

    // Handle proposal submission
    const handleProposalSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) {
            alert("Please fill in all the fields.");
            return;
        }

        axios
            .post("http://localhost:5004/proposals", {
                description,
                amount,
                committeeId: selectedCommittee.Committee_ID,
            })
            .then(() => {
                alert("Proposal submitted successfully!");
                setShowProposalModal(false);
                setDescription("");
                setAmount("");
            })
            .catch((err) => console.error("Error submitting proposal:", err));
    };

    // Handle proposal actions (accept/reject)
    const handleProposalAction = (proposalId, action) => {
        axios
            .put(`http://localhost:5004/proposals/${proposalId}`, {
                status: action,
                comment: actionComment,
            })
            .then(() => {
                setProposals(
                    proposals.map((proposal) =>
                        proposal.id === proposalId ? { ...proposal, status: action } : proposal
                    )
                );
                setSelectedProposal(null);
                setActionComment("");
                alert(`Proposal ${action === "Accepted" ? "approved" : "rejected"} successfully!`);
            })
            .catch((err) => console.error("Error updating proposal:", err));
    };

    // Handle deleting a committee
    const handleDeleteCommittee = (committeeId) => {
        if (!window.confirm("Are you sure you want to delete this committee?")) return;

        axios
            .delete(`http://localhost:5004/committees/${committeeId}`)
            .then(() => {
                setCommittees(committees.filter((c) => c.Committee_ID !== committeeId));
                alert("Committee deleted successfully!");
            })
            .catch((err) => console.error("Error deleting committee:", err));
    };

    // Toggle the visibility of the "See Members" modal
    const handleViewMembers = (committee) => {
        setSelectedCommittee(committee);
        setShowMembersModal(true);
        setShowProposalModal(false);  // Close the proposal modal if it's open
    };

    // Toggle the visibility of the "Submit Proposal" modal
    const handleSubmitProposal = (committee) => {
        setSelectedCommittee(committee);
        setShowProposalModal(true);
        setShowMembersModal(false);  // Close the members modal if it's open
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Committees Overview</h1>

            {/* Committee List */}
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th className="text-left">Committee Name</th>
                            <th className="text-left">Members</th>
                            <th className="text-left">Proposals</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {committees.map((committee) => (
                            <tr key={committee.Committee_ID}>
                                <td className="py-4 px-2">
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={() => setSelectedCommittee(committee)}
                                    >
                                        {committee.Committee_Name}
                                    </button>
                                </td>
                                <td className="py-4 px-2">
                                    <button
                                        className="btn btn-info btn-xs"
                                        onClick={() => handleViewMembers(committee)} // Open members modal
                                    >
                                        View Members
                                    </button>
                                </td>
                                <td className="py-4 px-2">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => handleSubmitProposal(committee)} // Open proposal modal
                                    >
                                        Submit Proposal
                                    </button>
                                </td>
                                <td className="py-4 px-2">
                                    <button
                                        className="btn btn-error btn-xs"
                                        onClick={() => handleDeleteCommittee(committee.Committee_ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Submit Proposal Modal */}
            {showProposalModal && selectedCommittee && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Submit Proposal for {selectedCommittee.Committee_Name}</h3>
                        <form onSubmit={handleProposalSubmit}>
                            <textarea
                                className="textarea textarea-bordered w-full mb-4"
                                placeholder="Proposal Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input
                                type="number"
                                className="input input-bordered w-full mb-4"
                                placeholder="Requested Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="modal-action">
                                <button className="btn btn-success" type="submit">
                                    Submit Proposal
                                </button>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        setShowProposalModal(false);
                                        setDescription("");
                                        setAmount("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Members Modal */}
            {showMembersModal && selectedCommittee && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{selectedCommittee.Committee_Name} Members</h3>
                        <ul className="mt-4">
                            {members
                                .filter((member) =>
                                    selectedCommittee.Member_IDs.split(",").includes(member.id.toString())
                                )
                                .map((member) => (
                                    <li key={member.id} className="mb-2">
                                        {member.name}
                                    </li>
                                ))}
                        </ul>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowMembersModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Proposal Action Modal */}
            {selectedProposal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{selectedProposal.title}</h3>
                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Add a comment (optional)"
                            value={actionComment}
                            onChange={(e) => setActionComment(e.target.value)}
                        />
                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={() => handleProposalAction(selectedProposal.id, "Accepted")}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => handleProposalAction(selectedProposal.id, "Rejected")}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setSelectedProposal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommitteesOverview;
