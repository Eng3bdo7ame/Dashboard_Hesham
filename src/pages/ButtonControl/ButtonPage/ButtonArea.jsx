import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function ButtonArea({ setActiveOptions }) {
    const storedButtons = JSON.parse(localStorage.getItem("buttons")) || [];
    const [AddButton, setAddButton] = useState(storedButtons);

    const AddNewButton = () => {
        const newButton = { id: AddButton.length + 1, label: `Button ${AddButton.length + 1}` };
        setAddButton((prev) => [...prev, newButton]);
    };

    useEffect(() => {
        localStorage.setItem("buttons", JSON.stringify(AddButton));
        console.log("Updated AddButton array:", AddButton);
    }, [AddButton]); // Runs whenever AddButton changes

    return (
        <main className="relative flex-1 p-6 bg-gray-600">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>

            {/* Display buttons dynamically */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {AddButton.map((button) => (
                    <button
                        key={button.id}
                        className="py-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"

                    >
                        {button.label}
                    </button>
                ))}
            </div>

            <div className="mt-15">
                <button
                    onClick={AddNewButton}
                    className="absolute bottom-3 left-3 bg-primary text-white text-lg py-3 px-3 rounded-full"
                >
                    <FaPlus />
                </button>
            </div>
        </main>
    );
}
