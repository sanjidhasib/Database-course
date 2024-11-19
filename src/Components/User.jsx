import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // Fetch users on component mount
    useEffect(() => {
        axios.get('http://localhost:5004/users')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    // Filter users by name or role
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterUsers(e.target.value, roleFilter);
    };

    const handleRoleFilterChange = (e) => {
        setRoleFilter(e.target.value);
        filterUsers(search, e.target.value);
    };

    const filterUsers = (nameSearch, roleSearch) => {
        let filtered = users;
        if (nameSearch) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(nameSearch.toLowerCase())
            );
        }
        if (roleSearch) {
            filtered = filtered.filter(user =>
                user.role.toLowerCase() === roleSearch.toLowerCase()
            );
        }
        setFilteredUsers(filtered);
    };

    // Handle Add User
    const handleAddUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUser = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone_no: formData.get('phone'),
            role: formData.get('role'),
        };

        axios.post('http://localhost:5004/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setFilteredUsers([...filteredUsers, response.data]);
                setShowAddModal(false);
            })
            .catch(error => console.error('Error adding user:', error));
    };

    // Handle Delete User
    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:5004/users/${userId}`)
            .then(() => {
                const remainingUsers = users.filter(user => user.id !== userId);
                setUsers(remainingUsers);
                setFilteredUsers(remainingUsers);
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">User Management</h1>
                <button onClick={() => setShowAddModal(true)} className="btn btn-primary">Add User</button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-xs"
                />
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={roleFilter}
                    onChange={handleRoleFilterChange}
                >
                    <option value="">All Roles</option>
                    <option value="Staff">Staff</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
            </div>

            {/* User Table */}
            <div className="grid grid-cols-3 gap-6">
                {['Staff', 'Teacher', 'Student'].map(role => (
                    <div key={role}>
                        <h2 className="text-xl font-bold mb-2">{role}</h2>
                        {filteredUsers.filter(user => user.role === role).map(user => (
                            <div key={user.id} className="border p-4 mb-2">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-error btn-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <input name="name" type="text" placeholder="Name" className="input input-bordered w-full mb-2" required />
                            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-2" required />
                            <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full mb-2" />
                            <select name="role" className="select select-bordered w-full mb-2" required>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Staff">Staff</option>
                            </select>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Add User</button>
                                <button type="button" className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
