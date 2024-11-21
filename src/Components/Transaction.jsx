import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        amount: "",
        date: "",
        type: "",
        description: "",
    });
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            const { data } = await axios.get("http://localhost:5004/transactions");
            setTransactions(data);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching transactions");
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Add or update transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, date, type, description } = form;
        if (!amount || !date || !type || !description) {
            toast.error("Please fill all fields");
            return;
        }

        const formattedDate = new Date(date).toISOString().split('T')[0];

        const formData = {
            ...form,
            date: formattedDate, 
        };

        try {
            if (editingTransaction) {
                await axios.put(
                    `http://localhost:5004/transactions/${editingTransaction.Transaction_ID}`,
                    form
                );
                toast.success("Transaction updated!");
            } else {
                await axios.post("http://localhost:5004/transactions", formData);
                toast.success("Transaction added!");
            }
            fetchTransactions();
            setForm({ amount: "", date: "", type: "", description: "" });
            setEditingTransaction(null);
        } catch (err) {
            console.error(err);
            toast.error("Error saving transaction");
        }
    };

   

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Transaction Management</h1>

            {/* Form */}
           <div className=" gap-5 mb-5">
               <div>

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Amount"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="date"
                                placeholder="Date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Type</option>
                                <option value="Deposit">Deposit</option>
                                <option value="Withdrawal">Withdrawal</option>
                            </select>

                            <textarea
                                placeholder="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">
                            {editingTransaction ? "Update Transaction" : "Add Transaction"}
                        </button>
                    </form>
               </div>


                <div className="grid grid-cols-2 gap-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.Transaction_ID}
                            className="text-black mb-2 p-4   shadow-md rounded-2xl bg-gradient-to-r from-[#93A5CF] to-[#E4EfE9]"
                        >
                            <h2 className="text-2xl font-bold">Transaction #{transaction.Transaction_ID}</h2>
                            <p className="text-xl font-normal">
                                <strong >Amount:</strong> ${transaction.Amount}
                            </p>
                            <p className="text-xl font-normal">
                                <strong>Date:</strong> {transaction.Date}
                            </p>
                            <p className="text-xl font-normal">
                                <strong>Type:</strong> {transaction.Type}
                            </p>
                            <p className="text-xl font-normal">
                                <strong>Description:</strong> {transaction.Description}
                            </p>
                            <div className="flex justify-between mt-4">

                            </div>
                        </div>
                    ))}
                </div>



           </div>

           
        </div>
    );
};

export default Transaction;
