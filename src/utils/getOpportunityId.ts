const opportunityDic = {
  clinics: 'c',
  empress: 'e',
  escuels: 's',
  jobs_w: 't',
};

const transportDic = {
  automovil: 'a',
  bicicleta: 'b',
  caminando: 'c',
  bus_actual: 'tp',
};

const getOpportunityId = (
  opportunity: string,
  transport: string,
  minutes: number
) =>
  `${opportunityDic[opportunity as keyof typeof opportunityDic]}_${
    transportDic[transport as keyof typeof transportDic]
  }_${minutes}`;

export default getOpportunityId;
