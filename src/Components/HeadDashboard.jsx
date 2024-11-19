import  { useState, useEffect } from 'react';
import axios from 'axios';
import "tailwindcss/tailwind.css";
import "daisyui";

const HeadDashboard = () => {
    const [newCommitteeName, setNewCommitteeName] = useState('');
    const [selectedHead, setSelectedHead] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [committeeType, setCommitteeType] = useState('');
    const [formationDate, setFormationDate] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch users from backend
    useEffect(() => {
        axios
            .get('http://localhost:5004/users')
            .then((response) => setUsers(response.data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    // Handle committee creation
    const handleCreateCommittee = () => {
        // Validation
        if (!newCommitteeName || !selectedHead || selectedMembers.length < 3 || !committeeType || !formationDate) {
            alert("Please fill all fields and select at least 3 members.");
            return;
        }

        const newCommittee = {
            name: newCommitteeName,
            formationDate,
            type: committeeType,
            headId: selectedHead,
            memberIds: selectedMembers,
        };

        axios
            .post('http://localhost:5004/committees', newCommittee)
            .then((response) => {
                alert("Committee created successfully!");
                // Clear form
                setNewCommitteeName('');
                setSelectedHead('');
                setSelectedMembers([]);
                setCommitteeType('');
                setFormationDate('');
            })
            .catch((err) => console.error("Error creating committee:", err));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Head Management Dashboard</h1>

            {/* Form to Create Committee */}
            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h2 className="text-2xl mb-4 font-semibold">Create a New Committee</h2>

                {/* Committee Name */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Committee Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter committee name"
                        value={newCommitteeName}
                        onChange={(e) => setNewCommitteeName(e.target.value)}
                    />
                </div>

                {/* Formation Date */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Formation Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={formationDate}
                        onChange={(e) => setFormationDate(e.target.value)}
                    />
                </div>

                {/* Committee Type */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Committee Type</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={committeeType}
                        onChange={(e) => setCommitteeType(e.target.value)}
                    >
                        <option value="">Select Committee Type</option>
                        <option value="Event">Event</option>
                        <option value="Other Purpose">Other Purpose</option>
                    </select>
                </div>

                {/* Select Committee Head */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Select Committee Head</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={selectedHead}
                        onChange={(e) => setSelectedHead(e.target.value)}
                    >
                        <option value="">Select a head</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Committee Members */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Select Committee Members (at least 3)</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        multiple
                        value={selectedMembers}
                        onChange={(e) =>
                            setSelectedMembers([...e.target.selectedOptions].map((option) => option.value))
                        }
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    className="btn btn-primary w-full"
                    onClick={handleCreateCommittee}
                >
                    Create Committee
                </button>
            </div>
        </div>
    );
};

export { HeadDashboard };
