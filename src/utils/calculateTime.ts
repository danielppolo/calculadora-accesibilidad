const calculateTime = (time: number, transport: string) => {
  if (transport === 'automovil') {
    return Math.round(time * 1.6927)
  }
  return time
}

export const calculateTimeForOpp = (opportunities: number, transport: string) => {
  if (transport === 'automovil') {
    return Math.round(opportunities * 0.6927)
  }
  return opportunities
}

export default calculateTime