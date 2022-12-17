# frozen_string_literal: true

require 'json'

SLOW_FACTOR = 0.6927
cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  filepath = "data_aws/input/#{city}/static.json"

  transformed_data = {}
  raw_data = File.read(filepath)

  data = JSON.parse(raw_data)

  opportunities = {
    'c' => 'clinics',
    'e' => 'companies',
    't' => 'jobs',
    's' => 'schools'
  }

  transports = {
    'a' => 'car',
    'c' => 'walk',
    'tp' => 'public',
    'b' => 'bike'
  }

  data.each do |key, properties|
    properties.each do |property, value|
      opportunity_code, transport_code, time = property.split('_')
      opportunity = opportunities[opportunity_code]
      transport = transports[transport_code]

      calculated_value = transport == 'car' ? value * SLOW_FACTOR : value

      transformed_data[key] ||= {}
      transformed_data[key][opportunity] ||= {}
      transformed_data[key][opportunity][transport] ||= {}
      transformed_data[key][opportunity][transport][time.to_s + 'm'] ||= {}

      transformed_data[key][opportunity][transport][time.to_s + 'm'] = calculated_value.round
    end
  end

  File.open("data_aws/cities/#{city}/visualizations/reachable-opportunities/current.json", 'wb') do |file|
    file.write(JSON.generate(transformed_data))
  end
end
