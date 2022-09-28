const opportunityDic = {
  'clinics': 'c',
  'empress': 'e',
  'escuels': 's',
  'jobs_w': 't',
}

const transportDic = {
  'automovil': 'a',
  'bicicleta': 'b',
  'caminando': 'c',
  'bus_actual': 'tp',
}

const getOpportunityId = (opportunity, transport, minutes) => `${opportunityDic[opportunity]}_${transportDic[transport]}_${minutes}`

export default getOpportunityId