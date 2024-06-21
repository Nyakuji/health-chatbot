import React, { useEffect, useState } from 'react'
import activityLogService from '../services/activityLogService'

const ActivityLog = () => {
  const [logs, setLogs] = useState([
    { _id: '', userId: { username: '', email: '' }, activity: '', date: '' },
  ])

  useEffect(() => {
    const fetchLogs = async () => {
      const result = await activityLogService.getActivityLogs()
      setLogs(result)
    }
    fetchLogs()
  }, [])

  return (
    <div>
      <h2>Activity Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.userId.username} ({log.userId.email}) - {log.activity} -{' '}
            {new Date(log.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityLog
