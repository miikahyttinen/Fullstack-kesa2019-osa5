const notificationReducer = (
  state = { type: 'initial', message: '' },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

export const createNotification = content => {
  return {
    type: 'SET_NOTIFICATION',
    content: content
  }
}

export default notificationReducer
