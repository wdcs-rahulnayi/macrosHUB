import AddMeal from "@/components/AddMeal";
import ListMacros from "@/components/ListMacros";
import { useState, useEffect, useCallback } from "react";

const CalculateMacrosPage = () => {
  const [macrosData, setMacrosData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    debugger
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_MACROS, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setMacrosData(data);
        setError(null);
      } else {
        setError(`Failed to fetch data: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Request error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMacrosChange = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex flex-row gap-4 max-w-8xl min-h-screen mx-auto mt-28 px-16">
        <AddMeal onMacrosAdd={handleMacrosChange} />
        <ListMacros
          macrosData={macrosData}
          onMacrosDelete={handleMacrosChange}   
          onMacrosUpdate={handleMacrosChange}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
    </>
  );
};

export default CalculateMacrosPage;
