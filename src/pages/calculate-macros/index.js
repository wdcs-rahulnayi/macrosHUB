import AddMeal from "@/components/AddMeal"
import ListMacros from "@/components/ListMacros"
import { useState, useEffect } from "react";
const CalculateMacrosPage = () => {
    const [macrosData, setMacrosData] = useState(null);
    // const [reFetch, setreFetch] = useState(false) 

    function onMacrosAdded(){
        fetchData();
    }
    function onMacrosDeleted(){
        fetchData();
    }
    const fetchData = async () => {
        try {
            debugger
            const response = await fetch("http://localhost:5000/api/v1/macros", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data fetched successfully:', data);
                setMacrosData(data);
            } else {
                console.log('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error("Request error:", error.message);
        }
    };
    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <>
         <div className="flex flex-col gap-4 max-w-7xl min-h-screen mx-auto my-auto mt-28">
                <AddMeal onMacrosAdd={onMacrosAdded}/>
                <ListMacros macrosData={macrosData} onMacrosDelete={onMacrosDeleted}/>
            </div>
        </>
    )
}
export default CalculateMacrosPage;