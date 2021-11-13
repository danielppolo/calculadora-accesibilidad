# frozen_string_literal: true

require 'json'

categories = {
  very_low: [],
  low: [],
  medium: [],
  high: [],
  very_high: []
}

filepath = 'data/src/population-density/densidad-de-poblacion.geojson'

serialized_geojson = File.read(filepath)

geojson = JSON.parse(serialized_geojson)

geojson['features'].each do |feature|
  density = feature['properties']['Densidad']
  case density
  when 1..65
    categories[:very_low] << feature
  when 65..144
    categories[:low] << feature
  when 144..218
    categories[:medium] << feature
  when 218..374
    categories[:high] << feature
  when 374..99_999_999
    categories[:very_high] << feature
  end
end

categories.keys.each do |category|
  File.open("data/output/population-density-cancun/cancun-density-#{category}.json", 'wb') do |file|
    file.write(JSON.generate(
                 type: geojson['type'],
                 name: geojson['name'],
                 crs: geojson['crs'],
                 features: categories[category]
               ))
  end
end
