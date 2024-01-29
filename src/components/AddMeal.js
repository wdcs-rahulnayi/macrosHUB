// AddMealForm.js
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialMacroState = {
  protein: 1,
  carbs: 1,
  fats: 1,
  fibres: 1,
  calories: 1,
};

const AddMeal = ({ onMacrosAdd }) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [meals, setMeals] = useState({
    breakfast: { ...initialMacroState },
    lunch: { ...initialMacroState },
    dinner: { ...initialMacroState },
    snacks: { ...initialMacroState },
  });

  const handleMacroChange = (mealName, field, value) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealName]: {
        ...prevMeals[mealName],
        [field]: value,
      },
    }));
  };

  const addData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const formattedMeals = Object.entries(meals).map(([name, values]) => ({ name, ...values }));
  
    const raw = JSON.stringify({
      date,
      meals: formattedMeals,
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      credentials: 'include',
      redirect: 'follow',
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/v1/macros", requestOptions);
      if (response.status === 201) {
        toast.success("Meal Data Added Successfully !");
        onMacrosAdd();
        setError('');
      } else {
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred while adding data');
      console.error('Error adding data:', error);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 mt-32 mb-12 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Meal Data</h2>
      <form>
        <label htmlFor="date" className="block text-sm font-medium text-gray-600">
          Date:
          <input
            type="date"
            id="date"
            className="mt-1 p-2 w-full border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        {Object.entries(meals).map(([mealName, meal]) => (
          <div key={mealName} className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{mealName.charAt(0).toUpperCase() + mealName.slice(1)}</h3>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(meal).map(([field, fieldValue]) => (
                <label key={field} htmlFor={`${mealName}${field}`} className="block text-sm font-medium text-gray-600">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
                    type="number"
                    id={`${mealName}${field}`}
                    className="mt-1 p-2 w-full border rounded-md"
                    value={fieldValue}
                    onChange={(e) => handleMacroChange(mealName, field, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        {error && (
          <div className="mb-6 mt-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <button
          type="button"
          className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={addData}
        >
          Add Data
        </button>
        <ToastContainer 
        position="top-center"
        />
      </form>
    </div>
  );
};

export default AddMeal;
