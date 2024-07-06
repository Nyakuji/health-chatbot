import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, Paper } from '@mui/material'
import analyticsService from '../../../services/AnalyticsDashboard/analyticsService'
import AnalyticsChart from './AnalyticsChart'
import AnalyticsTable from './AnalyticsTable'
import './AnalyticsDashboard.module.css'

const AnalyticsDashboard = () => {
  const [data, setData] = useState({ chartData: null, tableData: null })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await analyticsService.getAnalyticsData()
        setData(result)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      }
    }

    fetchData()
  }, [])

  if (!data) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container maxWidth="lg" className="analytics-dashboard-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="analytics-chart-container">
            <AnalyticsChart data={data.chartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="analytics-table-container">
            <AnalyticsTable data={data.tableData || []} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AnalyticsDashboard
