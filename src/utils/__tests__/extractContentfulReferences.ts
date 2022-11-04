import extractReferences from 'src/utils/extractContentfulReferences';
import mock from 'src/mocks/contentfulCities.json';

describe('extractContentfulReferences', () => {
  let city: any;
  const mockedCity = JSON.parse(JSON.stringify(mock[0].fields));
  beforeAll(() => {
    const items = extractReferences(mock);
    city = items[0];
  });

  it('should extract the city reference', () => {
    const result = city;
    const expected = mockedCity;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.country reference', () => {
    const result = city.country;
    const expected = mockedCity.country.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.defaultVisualization reference', () => {
    const result = city.defaultVisualization;
    const expected = mockedCity.defaultVisualization.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.defaultVisualization.variants[0] reference', () => {
    const result = city.defaultVisualization.variants[0];
    const expected = mockedCity.defaultVisualization.fields.variants[0].fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.defaultVisualization.defaultVariant reference', () => {
    const result = city.defaultVisualization.defaultVariant;
    const expected =
      mockedCity.defaultVisualization.fields.defaultVariant.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.defaultVisualization.grid reference', () => {
    const result = city.defaultVisualization.grid;
    const expected = mockedCity.defaultVisualization.fields.grid.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.defaultVisualization.properties[0] reference', () => {
    const result = city.defaultVisualization.properties[0];
    const expected =
      mockedCity.defaultVisualization.fields.properties[0].fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.visualizations[0] reference', () => {
    const result = city.visualizations[0];
    const expected = mockedCity.visualizations[0].fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.visualizations[0].variants reference', () => {
    const result = city.visualizations[0].variants;
    const expected = mockedCity.visualizations[0].fields.variants;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.visualizations[0].defaultVariant reference', () => {
    const result = city.visualizations[0].defaultVariant;
    const expected = mockedCity.visualizations[0].fields.defaultVariant.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.visualizations[0].grid reference', () => {
    const result = city.visualizations[0].grid;
    const expected = mockedCity.visualizations[0].fields.grid.fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });

  it('should extract the city.visualizations[0].properties reference', () => {
    const result = city.visualizations[0].properties[0];
    const expected = mockedCity.visualizations[0].fields.properties[0].fields;
    expect(result).not.toHaveProperty('sys');
    expect(result).not.toHaveProperty('fields');
    Object.keys(expected).forEach((key) => {
      expect(result).toHaveProperty(key);
    });
  });
});
