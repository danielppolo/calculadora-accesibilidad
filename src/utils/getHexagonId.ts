const getHexagonId = (
  featureId?: string,
  medium?: string,
  step?: number,
  options: { solid?: boolean } = {}
) =>
  `${featureId ?? ''}-${medium ?? ''}-${step ?? ''}${
    options.solid ? '-solid' : ''
  }`;

export default getHexagonId;
