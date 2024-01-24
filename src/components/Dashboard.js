import { useEffect } from "react";
import { Chart } from "chart.js";
import Header from "./Header";

function Dashboard() {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Protein", "Carbs", "Fats", "Fibers"],
        datasets: [{
          data: [70, 10, 6, 10],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(100, 255, 132)",
          ],
          backgroundColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(100, 255, 132)",
          ],
          borderWidth: 2,
        }]
      },
      options: {
        cutout: '80%', // Adjust the cutout percentage for better presentation
      },
    });
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-7xl min-h-screen text-center py-8">
        <h1 className="text-4xl font-semibold capitalize mb-6">Your Daily Macros</h1>
        <div className="flex mx-auto my-auto">
          <div className=' w-full h-96 my-auto  p-4'>
            <canvas id='myChart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
