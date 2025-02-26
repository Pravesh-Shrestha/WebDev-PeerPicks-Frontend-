import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaUsers, FaStore, FaStar } from "react-icons/fa";
import "../styles/Dashboard.css"; // Import CSS file

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    totalRatings: 0,
    ratingDistribution: [],
  });

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = async () => {
      // Replace with actual API call
      const response = await fetch("http://localhost:5000/api/dashboard");
      const data = await response.json();
      setDashboardData(data);
    };

    fetchData();
  }, []);

  // Chart Data
  const barChartData = {
    labels: dashboardData.ratingDistribution.map((item) => `⭐ ${item.rating}`),
    datasets: [
      {
        label: "Number of Ratings",
        data: dashboardData.ratingDistribution.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">PeerPicks Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>Total Users</h3>
          <p>{dashboardData.totalUsers}</p>
        </div>

        <div className="stat-card">
          <FaStore className="stat-icon" />
          <h3>Total Businesses</h3>
          <p>{dashboardData.totalBusinesses}</p>
        </div>

        <div className="stat-card">
          <FaStar className="stat-icon" />
          <h3>Total Ratings</h3>
          <p>{dashboardData.totalRatings}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Ratings Distribution</h2>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
