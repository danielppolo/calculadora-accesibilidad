# frozen_string_literal: true

require 'json'

cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  filepath = "data_aws/input/#{city}/main.json"

  transformed_data = {}
  raw_data = File.read(filepath)

  data = JSON.parse(raw_data)

  data.each do |key, value|
    transformed_data[key] = {
      clinics: value['properties']['clinics'],
      companies: value['properties']['empress'],
      jobs: value['properties']['jobs_w'],
      schools: value['properties']['escuels']
    }
  end

  File.open("data_aws/cities/#{city}/visualizations/total-opportunities/current.json", 'wb') do |file|
    file.write(JSON.generate(transformed_data))
  end
end
