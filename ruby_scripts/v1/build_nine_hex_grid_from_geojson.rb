# frozen_string_literal: true

require 'json'
cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  filepath = "data/input/#{city}/nine.json"

  raw_data = File.read(filepath)
  grid = {}
  data = JSON.parse(raw_data)
  # {"type":"FeatureCollection", "features": [
  data['features'].each do |feature|
    grid[feature['properties']['h3_ddrs']] = feature
    grid[feature['properties']['h3_ddrs']]['properties'] = {
      id: feature['properties']['h3_ddrs'],
      clinics: feature['properties']['clinics'],
      schools: feature['properties']['escuels'],
      jobs: feature['properties']['jobs_w'],
      companies: feature['properties']['empress']
    }
  end

  File.open("data_aws/cities/#{city}/grids/nine.json", 'wb') do |file|
    file.write(JSON.generate(grid))
  end
end
