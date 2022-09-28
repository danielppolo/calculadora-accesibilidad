const getHexagonId = (hexagonId, medium, step, options = {}) => `${hexagonId}-${medium}-${step}${options.solid ? '-solid' : ''}`;

export default getHexagonId;
