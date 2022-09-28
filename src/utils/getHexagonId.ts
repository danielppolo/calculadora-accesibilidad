const getHexagonId = (hexagonId?: string, medium?: string, step?: number, options: { solid?: boolean } = {}) => `${hexagonId ?? ''}-${medium ?? ''}-${step ?? ''}${options.solid ? '-solid' : ''}`;

export default getHexagonId;
