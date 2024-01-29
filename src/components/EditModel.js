import { useState } from "react";
import { toast } from "react-toastify";

const EditModal = ({ isOpen, onClose, onUpdate, mealId }) => {
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        meals: [
            { name: "breakfast", protein: 0, carbs: 0, fats: 0, fibres: 0, calories: 0 },
            { name: "lunch", protein: 0, carbs: 0, fats: 0, fibres: 0, calories: 0 },
            { name: "dinner", protein: 0, carbs: 0, fats: 0, fibres: 0, calories: 0 },
            { name: "snacks", protein: 0, carbs: 0, fats: 0, fibres: 0, calories: 0 },
        ],
    });

    const handleInputChange = (e, mealIndex, attribute) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const updatedMeals = [...prevData.meals];
            updatedMeals[mealIndex][attribute] = value;
            return { ...prevData, meals: updatedMeals };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(formData);

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: 'include'
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_MACROS}/${mealId}`, requestOptions);
            if (response.status === 200) {
                toast.success('Data Updated Successfully !');
                onUpdate();
                console.log(result);
                setError('');
            } else {
                const result = await response.json();
                toast.error(`Update Failed: ${result.error} `);
            }
        } catch (error) {
            console.log('error', error);
        }

        onClose();
    };


    return (
        <div className={`fixed inset-0 ${isOpen ? "" : "hidden"} overflow-y-auto`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        {formData.meals.map((meal, index) => (
                            <div key={index} className="p-4">
                                <label className="block font-semibold text-gray-600">{meal.name}</label>
                                <div className="grid grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600">Protein</label>
                                        <input
                                            type="number"
                                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                                            value={meal.protein}
                                            onChange={(e) => handleInputChange(e, index, "protein")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Carbs</label>
                                        <input
                                            type="number"
                                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                                            value={meal.carbs}
                                            onChange={(e) => handleInputChange(e, index, "carbs")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Fats</label>
                                        <input
                                            type="number"
                                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                                            value={meal.fats}
                                            onChange={(e) => handleInputChange(e, index, "fats")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Fibres</label>
                                        <input
                                            type="number"
                                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                                            value={meal.fibres}
                                            onChange={(e) => handleInputChange(e, index, "fibres")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Calories</label>
                                        <input
                                            type="number"
                                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                                            value={meal.calories}
                                            onChange={(e) => handleInputChange(e, index, "calories")}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {error && (
                <div className="mb-6 mt-6">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </div>
    );
};

export default EditModal;
