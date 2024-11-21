import { useState, useEffect } from 'react';
import axios from 'axios';

const HeadDashboard = () => {
    const [newCommitteeName, setNewCommitteeName] = useState('');
    const [selectedHead, setSelectedHead] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [committeeType, setCommitteeType] = useState('');
    const [formationDate, setFormationDate] = useState('');
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');  // Role filter state

    useEffect(() => {
        axios
            .get('http://localhost:5004/users')
            .then((response) => setUsers(response.data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    const handleCreateCommittee = () => {
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
                setNewCommitteeName('');
                setSelectedHead('');
                setSelectedMembers([]);
                setCommitteeType('');
                setFormationDate('');
            })
            .catch((err) => console.error("Error creating committee:", err));
    };

    // Filter users based on the selected role and search term
    const filterUsers = () => {
        return users.filter(user =>
            (roleFilter ? user.role === roleFilter : true) &&
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const addMember = (userId) => {
        if (!selectedMembers.includes(userId)) {
            setSelectedMembers([...selectedMembers, userId]);
        }
    };

    const removeMember = (userId) => {
        setSelectedMembers(selectedMembers.filter(id => id !== userId));
    };

    const getUserById = (id) => users.find(user => user.id === id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
                        Create New Committee
                    </h1>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Committee Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter committee name"
                                value={newCommitteeName}
                                onChange={(e) => setNewCommitteeName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Formation Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formationDate}
                                onChange={(e) => setFormationDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Committee Type
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={committeeType}
                                onChange={(e) => setCommitteeType(e.target.value)}
                            >
                                <option value="">Select type</option>
                                <option value="Event">Event</option>
                                <option value="Other Purpose">Other Purpose</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Committee Head
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={selectedHead}
                                onChange={(e) => setSelectedHead(e.target.value)}
                            >
                                <option value="">Select head</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Member Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Committee Members
                        </label>

                        {/* Search Bar with Role Filter */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Members</label>
                            <div className="flex items-center space-x-2">
                                {/* Dropdown for role selection */}
                                <select
                                    className="w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option value="">All Roles</option>
                                    <option value="staff">Staff</option>
                                    <option value="teachers">Teachers</option>
                                    <option value="students">Students</option>
                                </select>

                                {/* Search Input */}
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Available Members */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Available Members</h3>
                            <div className="max-h-64 overflow-y-auto">
                                {filterUsers().map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-2 hover:bg-white rounded-lg mb-1"
                                    >
                                        <span className="text-gray-700">{user.name}</span>
                                        <button
                                            onClick={() => addMember(user.id)}
                                            className="text-green-600 hover:text-green-700 p-1"
                                        >
                                            +
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Selected Members */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                Selected Members ({selectedMembers.length})
                            </h3>
                            <div className="max-h-64 overflow-y-auto">
                                {selectedMembers.map((memberId) => {
                                    const user = getUserById(memberId);
                                    return (
                                        <div
                                            key={memberId}
                                            className="flex items-center justify-between p-2 hover:bg-white rounded-lg mb-1"
                                        >
                                            <span className="text-gray-700">{user?.name}</span>
                                            <button
                                                onClick={() => removeMember(memberId)}
                                                className="text-red-600 hover:text-red-700 p-1"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={handleCreateCommittee}
                        className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Committee
                    </button>
                </div>
            </div>
        </div>
    );
};

export { HeadDashboard };
