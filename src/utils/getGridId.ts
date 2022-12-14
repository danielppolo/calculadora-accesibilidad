const getGridId = (cityCode?: string, gridCode?: string) =>
  `${cityCode}-grid-${gridCode}`;

export default getGridId;
