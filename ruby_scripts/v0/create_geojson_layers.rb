# frozen_string_literal: true

require 'json'

categories = {}

filepath = 'data/src/usos-de-suelo/usos-de-suelo.geojson'

serialized_geojson = File.read(filepath)

geojson = JSON.parse(serialized_geojson)

geojson['features'].each do |feature|
  category = feature['properties']['UDS']
  if category.nil?
    puts 'NIL', description
  elsif categories[category]
    categories[category] << feature
  else
    categories[category] = [feature]
  end
end

categories.keys.each do |category|
  File.open("data/output/uso-suelo-cancun/cancun-#{category.downcase.gsub(' ', '-')}.json", 'wb') do |file|
    file.write(JSON.generate(
                 type: geojson['type'],
                 name: geojson['name'],
                 crs: geojson['crs'],
                 features: categories[category]
               ))
  end
end
