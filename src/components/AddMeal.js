// AddMealForm.js
import { useState } from 'react';

const AddMeal = ({onMacrosAdd}) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('')
  const [breakfast, setBreakfast] = useState({
    name: "breakfast",
    protein: 0,
    carbs: 0,
    fats: 0,
    fibres: 0,
    calories: 0,
  });

  const [lunch, setLunch] = useState({
    "name": "lunch",
    protein: 0,
    carbs: 0,
    fats: 0,
    fibres: 0,
    calories: 0,
  });
  const [dinner, setDinner] = useState({
    "name": "dinner",
    protein: 0,
    carbs: 0,
    fats: 0,
    fibres: 0,
    calories: 0,
  });
  const [snacks, setSnacks] = useState({
    "name": "snacks",
    protein: 0,
    carbs: 0,
    fats: 0,
    fibres: 0,
    calories: 0,
  });

  const addData = async () => {

  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    debugger
    const raw = JSON.stringify({
      "date": date,
      "meals": [
        breakfast,
        lunch,
        dinner,
        snacks
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      credentials: 'include',
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/macros", requestOptions);
      if (response.status === 201) { 
        alert('data added successfully')
        onMacrosAdd();
        setError('')
      }
      else {
        const result = await response.json();
        setError(result.error)
      }



    } catch (error) {
      setError(error)
      console.log('error', error);
    }
  };




  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 mt-32 bg-white rounded-md shadow-md">
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



        {/* breakfast */}

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Breakfast</h3>
          <div className="grid grid-cols-5 gap-4">
            <label htmlFor="breakfastProtein" className="block text-sm font-medium text-gray-600">
              Protein:
              <input
                type="number"
                id="breakfastProtein"
                className="mt-1 p-2 w-full border rounded-md"
                value={breakfast.protein}
                onChange={(e) => setBreakfast({ ...breakfast, protein: e.target.value })}
              />
            </label>
            <label htmlFor="breakfastCarb" className="block text-sm font-medium text-gray-600">
              Carbs:
              <input
                type="number"
                id="breakfastCarb"
                className="mt-1 p-2 w-full border rounded-md"
                value={breakfast.carbs}
                onChange={(e) => setBreakfast({ ...breakfast, carbs: e.target.value })}
              />
            </label>
            <label htmlFor="breakfastFats" className="block text-sm font-medium text-gray-600">
              Fats:
              <input
                type="number"
                id="breakfastFats"
                className="mt-1 p-2 w-full border rounded-md"
                value={breakfast.fats}
                onChange={(e) => setBreakfast({ ...breakfast, fats: e.target.value })}
              />
            </label>
            <label htmlFor="breakfastFibers" className="block text-sm font-medium text-gray-600">
              Fibers:
              <input
                type="number"
                id="breakfastFibers"
                className="mt-1 p-2 w-full border rounded-md"
                value={breakfast.fibres}
                onChange={(e) => setBreakfast({ ...breakfast, fibres: e.target.value })}
              />
            </label>
            <label htmlFor="breakfastCalories" className="block text-sm font-medium text-gray-600">
              Calories:
              <input
                type="number"
                id="breakfastCalories"
                className="mt-1 p-2 w-full border rounded-md"
                value={breakfast.calories}
                onChange={(e) => setBreakfast({ ...breakfast, calories: e.target.value })}
              />
            </label>
          </div>
        </div>



        {/* lunch */}



        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Lunch</h3>
          <div className="grid grid-cols-5 gap-4">
            <label htmlFor="lunchProtein" className="block text-sm font-medium text-gray-600">
              Protein:
              <input
                type="number"
                id="lunchProtein"
                className="mt-1 p-2 w-full border rounded-md"
                value={lunch.protein}
                onChange={(e) => setLunch({ ...lunch, protein: e.target.value })}
              />
            </label>
            <label htmlFor="lunchCarb" className="block text-sm font-medium text-gray-600">
              Carbs:
              <input
                type="number"
                id="lunchCarb"
                className="mt-1 p-2 w-full border rounded-md"
                value={lunch.carbs}
                onChange={(e) => setLunch({ ...lunch, carbs: e.target.value })}
              />
            </label>
            <label htmlFor="lunchFats" className="block text-sm font-medium text-gray-600">
              Fats:
              <input
                type="number"
                id="lunchFats"
                className="mt-1 p-2 w-full border rounded-md"
                value={lunch.fats}
                onChange={(e) => setLunch({ ...lunch, fats: e.target.value })}
              />
            </label>
            <label htmlFor="lunchFibers" className="block text-sm font-medium text-gray-600">
              Fibers:
              <input
                type="number"
                id="lunchFibers"
                className="mt-1 p-2 w-full border rounded-md"
                value={lunch.fibres}
                onChange={(e) => setLunch({ ...lunch, fibres: e.target.value })}
              />
            </label>
            <label htmlFor="lunchCalories" className="block text-sm font-medium text-gray-600">
              Calories:
              <input
                type="number"
                id="lunchCalories"
                className="mt-1 p-2 w-full border rounded-md"
                value={lunch.calories}
                onChange={(e) => setLunch({ ...lunch, calories: e.target.value })}
              />
            </label>
          </div>
        </div>


        {/* dinner */}


        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Dinner</h3>
          <div className="grid grid-cols-5 gap-4">
            <label htmlFor="dinnerProtein" className="block text-sm font-medium text-gray-600">
              Protein:
              <input
                type="number"
                id="dinnerProtein"
                className="mt-1 p-2 w-full border rounded-md"
                value={dinner.protein}
                onChange={(e) => setDinner({ ...dinner, protein: e.target.value })}
              />
            </label>
            <label htmlFor="dinnerCarb" className="block text-sm font-medium text-gray-600">
              Carbs:
              <input
                type="number"
                id="dinnerCarb"
                className="mt-1 p-2 w-full border rounded-md"
                value={dinner.carbs}
                onChange={(e) => setDinner({ ...dinner, carbs: e.target.value })}
              />
            </label>
            <label htmlFor="dinnerFats" className="block text-sm font-medium text-gray-600">
              Fats:
              <input
                type="number"
                id="dinnerFats"
                className="mt-1 p-2 w-full border rounded-md"
                value={dinner.fats}
                onChange={(e) => setDinner({ ...dinner, fats: e.target.value })}
              />
            </label>
            <label htmlFor="dinnerFibers" className="block text-sm font-medium text-gray-600">
              Fibers:
              <input
                type="number"
                id="dinnerFibers"
                className="mt-1 p-2 w-full border rounded-md"
                value={dinner.fibres}
                onChange={(e) => setDinner({ ...dinner, fibres: e.target.value })}
              />
            </label>
            <label htmlFor="dinnerCalories" className="block text-sm font-medium text-gray-600">
              Calories:
              <input
                type="number"
                id="dinnerCalories"
                className="mt-1 p-2 w-full border rounded-md"
                value={dinner.calories}
                onChange={(e) => setDinner({ ...dinner, calories: e.target.value })}
              />
            </label>
          </div>
        </div>


        {/* snacks */}


        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Snacks</h3>
          <div className="grid grid-cols-5 gap-4">
            <label htmlFor="snacksProtein" className="block text-sm font-medium text-gray-600">
              Protein:
              <input
                type="number"
                id="snacksProtein"
                className="mt-1 p-2 w-full border rounded-md"
                value={snacks.protein}
                onChange={(e) => setSnacks({ ...snacks, protein: e.target.value })}
              />
            </label>
            <label htmlFor="snacksCarb" className="block text-sm font-medium text-gray-600">
              Carbs:
              <input
                type="number"
                id="snacksCarb"
                className="mt-1 p-2 w-full border rounded-md"
                value={snacks.carbs}
                onChange={(e) => setSnacks({ ...snacks, carbs: e.target.value })}
              />
            </label>
            <label htmlFor="snacksFats" className="block text-sm font-medium text-gray-600">
              Fats:
              <input
                type="number"
                id="snacksFats"
                className="mt-1 p-2 w-full border rounded-md"
                value={snacks.fats}
                onChange={(e) => setSnacks({ ...snacks, fats: e.target.value })}
              />
            </label>
            <label htmlFor="snacksFibers" className="block text-sm font-medium text-gray-600">
              Fibers:
              <input
                type="number"
                id="snacksFibers"
                className="mt-1 p-2 w-full border rounded-md"
                value={snacks.fibres}
                onChange={(e) => setSnacks({ ...snacks, fibres: e.target.value })}
              />
            </label>
            <label htmlFor="snacksCalories" className="block text-sm font-medium text-gray-600">
              Calories:
              <input
                type="number"
                id="snacksCalories"
                className="mt-1 p-2 w-full border rounded-md"
                value={snacks.calories}
                onChange={(e) => setSnacks({ ...snacks, calories: e.target.value })}
              />
            </label>
          </div>
        </div>
        {error && <div className="mb-6 mt-6">
          <p className="text-red-500">{error}</p>
        </div>}


        <button
          type="button"
          className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={addData}
        >
          Add Data
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
