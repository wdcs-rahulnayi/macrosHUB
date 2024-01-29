// MacroList.js
import { useState } from "react";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MealCell from "./MealCell";
import EditModal from "./EditModel";

const TABLE_HEADERS = [
  "Date",
  "Meal",
  "Protein",
  "Carbs",
  "Fats",
  "Fibres",
  "Calories",
  "Action",
];
const formatDateString = (dateString) => new Date(dateString).toISOString().split("T")[0];

const ListMacros = ({ macrosData, onMacrosDelete, onMacrosUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (!macrosData || macrosData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-4 mt-32 mb-12 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Macros</h2>
        <p className="text-gray-500">No tracked macros available.</p>
      </div>
    );
  } 

  const groupedData = macrosData.reduce((acc, entry) => {
    const existingEntry = acc.find(item => item.date === entry.date);

    if (existingEntry) {
      existingEntry.meals.push(...entry.meals);
    } else {
      acc.push({ ...entry });
    }

    return acc;
  }, []);

  const handleEdit = async (id) => {
    console.log(`Edit clicked for ID: ${id}`);
    setEditId(id);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      credentials: 'include',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_MACROS}/${id}`, requestOptions);
      const result = await response.json();
      toast.error("Meal Data Deleted Successfully !");
      onMacrosDelete();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 mt-32 mb-12 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Macros</h2>
      <div className="overflow-x">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="divide-gray-200 table-auto w-full">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupedData.map((entry) => (
              <tr key={entry._id}>
                <td className="px-6 py-4 whitespace-nowrap">{formatDateString(entry.date)}</td>
                <MealCell meals={entry.meals} attribute="name" />
                <MealCell meals={entry.meals} attribute="protein" />
                <MealCell meals={entry.meals} attribute="carbs" />
                <MealCell meals={entry.meals} attribute="fats" />
                <MealCell meals={entry.meals} attribute="fibres" />
                <MealCell meals={entry.meals} attribute="calories" />
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
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <EditModal
          mealId={editId}
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditId(null);
          }}
          onUpdate={() => {
            onMacrosUpdate();
          }}
        />
      )}
    </div>
    </div>
  );
};

export default ListMacros;
