// MacroList.js
import { useState } from "react";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

const ListMacros = ({ macrosData, onMacrosDelete }) => {
    const [editId, setEditId] = useState(null);

    const handleEdit = (id) => {
        console.log(`Edit clicked for ID: ${id}`);
        setEditId(id);
    };

    const handleDelete = async (id) => {

        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow', 
            credentials: 'include',
        };

        try {
            debugger
            const response = await fetch(`http://localhost:5000/api/v1/macros/${id}`, requestOptions);
            const result = await response.json();
            alert(result);
            onMacrosDelete();
        } catch (error) {
            console.log('error', error);
        }

    };

    return (
        <div className="max-w-6xl mx-auto mt-8 p-4 mt-32 mb-12 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Macros</h2>
            <table className="divide-gray-200 max-h-[200px] overflow-y">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Meal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Protein
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Carbs
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fats
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fibres
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Calories
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {macrosData?.map((entry) => (
                        
                        entry.meals.map((meal) => (
                            <tr key={entry._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.date).toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.protein}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.carbs}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.fats}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.fibres}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{meal.calories}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => handleEdit(entry._id)}
                                    >
                                        <PencilAltIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(entry._id)}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>

                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMacros;
