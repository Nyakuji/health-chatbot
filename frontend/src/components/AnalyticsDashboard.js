import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticsService.getAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>Total Users: {analyticsData.totalUsers}</p>
      <p>Total Appointments: {analyticsData.totalAppointments}</p>
      <p>Total Feedbacks: {analyticsData.totalFeedbacks}</p>
      <h3>Users by Role</h3>
      <ul>
        {analyticsData.usersByRole.map((role) => (
          <li key={role._id}>{role._id}: {role.count}</li>
        ))}
      </ul>
      <h3>Appointments by Status</h3>
      <ul>
        {analyticsData.appointmentsByStatus.map((status) => (
          <li key={status._id}>{status._id}: {status.count}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsDashboard;
