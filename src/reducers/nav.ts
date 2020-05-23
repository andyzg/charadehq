const nav = (state = "WARMUP", action) => {
  switch (action.type) {
    case 'WARMUP':
      return "WARMUP"
    case 'WORKOUT':
      return "WORKOUT"
    case 'ENDING':
      return "ENDING"
    case 'SWITCH_STAGE':
      console.log(action.stage)
      return action.stage
    default:
      return state
  }
}

export default nav
