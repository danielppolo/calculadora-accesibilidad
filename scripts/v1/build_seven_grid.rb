# frozen_string_literal: true

require 'json'
cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  filepath = "data_aws/input/#{city}/main.json"

  raw_data = File.read(filepath)

  data = JSON.parse(raw_data)

  data.each do |_key, value|
    value['properties'] = {}
  end

  File.open("data_aws/cities/#{city}/grids/nine.json", 'wb') do |file|
    file.write(JSON.generate(data))
  end
end
