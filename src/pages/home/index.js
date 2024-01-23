import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import CalculateMacros from "@/components/CalculateMacros";
import BMI from "@/components/BMI";
import Workout from "@/components/Workout";
import Header from "@/components/Header";

const Home = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard"); // Default active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/${tab}`); // Update the URL based on the selected tab
  };

  // Effect to update activeTab based on the route
  useEffect(() => {
    const currentTab = router.pathname.replace("/", "") || "dashboard";
    setActiveTab(currentTab);
  }, [router.pathname]);

  // Render the component based on the active tab
  const renderComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "calculate-macros":
        return <CalculateMacros />;
      case "bmi":
        return <BMI />;
      case "workout":
        return <Workout />;
      default:
        return null;
    }
  };

  return (
    

    <>
    <div className="max-w-7xl min-h-screen mx-auto my-auto mt-8">
      <Header />

      <div className="content-container mt-20">{renderComponent()}</div>
      </div>
    </>
  );
};

export default Home;
