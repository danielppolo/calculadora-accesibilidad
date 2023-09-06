# frozen_string_literal: true

require 'json'

categories = {}

filepath = 'data/src/marginacion/marginacion_ageb.geojson'

serialized_geojson = File.read(filepath)

geojson = JSON.parse(serialized_geojson)

geojson['features'].each do |feature|
  if feature['properties']['GMU2010'].nil?
    if categories['Otros']
      categories['Otros'] << feature
    else
      categories['Otros'] = []
    end
  elsif categories[feature['properties']['GMU2010']]
    categories[feature['properties']['GMU2010']] << feature
  else
    categories[feature['properties']['GMU2010']] = []
  end
end

categories.keys.each do |category|
  puts category, categories[category].length
  File.open("data/output/marginacion/#{category}.json", 'wb') do |file|
    file.write(JSON.generate(
                 type: geojson['type'],
                 name: geojson['name'],
                 crs: geojson['crs'],
                 features: categories[category]
               ))
  end
end
