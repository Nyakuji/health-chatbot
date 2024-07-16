import { io } from 'socket.io-client'
import process from 'process'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000'

export const socket = io(SOCKET_URL)

export const subscribeToMessages = (callback) => {
  socket.on('receiveMessage', (message) => {
    callback(message)
  })
}

export const sendMessageSocket = (message) => {
  socket.emit('sendMessage', message)
}
