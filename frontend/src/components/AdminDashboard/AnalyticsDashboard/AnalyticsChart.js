import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import './AnalyticsChart.module.css'

const AnalyticsChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Analytics Data',
        data: data.values,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }

  return (
    <div className="analytics-chart">
      <Line data={chartData} />
    </div>
  )
}

AnalyticsChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
}

export default AnalyticsChart
