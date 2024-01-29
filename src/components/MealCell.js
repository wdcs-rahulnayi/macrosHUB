const MealCell = ({ meals, attribute }) => (
    <>
    <td className="px-6 py-4 whitespace-nowrap">
      {meals.map((meal, index) => (
        <div key={index}>{meal[attribute]}</div>
      ))}
    </td>
    </>
  );

export default MealCell;