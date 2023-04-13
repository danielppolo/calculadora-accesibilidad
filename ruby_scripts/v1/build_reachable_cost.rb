# frozen_string_literal: true

require 'json'

# cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
#             monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
#             veracruz villahermosa]
cities = %w[valle-de-mexico]

def clean_value(value)
  if value.is_a?(Array)
    return 0 if value.empty? || value.first == 'NA'

    return value.first
  end

  value.to_i
end

cities.each do |city|
  filepath = "data_aws/input/#{city}"
  Dir.foreach(filepath) do |filename|
    next if ['.', '..'].include?(filename)

    transformed_data = {}
    raw_data = File.read("data_aws/input/#{city}/" + filename)
    data = JSON.parse(raw_data)
    list = JSON.parse(data[0])
    features = JSON.parse(list[0])
    features.each do |feature|
      id = feature.keys.first
      car_value = feature[id]['car']
      walk_value = feature[id]['caminando']
      bike_value = feature[id]['bicicleta']
      transformed_data[id] = {
        'car' => {
          '19:30' => clean_value(car_value['19:30']),
          '5:00' => clean_value(car_value['5:00'])
        },
        'walk' => clean_value(walk_value),
        'public' => 0,
        'bike' => clean_value(bike_value)
      }
    end

    File.open("data_aws/cities/#{city}/visualizations/reachable-by-emissions/current/#{filename}", 'wb') do |file|
      file.write(JSON.generate(transformed_data))
    end
  end
end
