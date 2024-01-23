import { useEffect } from "react"
import { Chart } from "chart.js";
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
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
    }, [])


    return (
        <>
            {/* Doughnut chart */}
            <div className="max-w-7xl min-h-screen mx-auto my-auto mt-8">
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">Your Daily Macros</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
            </div>
        </>
    )
}

export default Dashboard;