# frozen_string_literal: true

require 'json'

categories = {}

filepath = 'data/src/uso-de-suelo.geojson'

serialized_geojson = File.read(filepath)

geojson = JSON.parse(serialized_geojson)

USOS_DE_SUELO = [
  'ACUÃCOLA',
  'AGRICULTURA',
  'BOSQUE',
  'MANGLAR',
  'PALMAR',
  'PASTIZAL',
  'POPAL',
  'PRADERA',
  'SABANA',
  'SABANOIDE',
  'SELVA',
  'TULAR',
  'URBANO',
  'VEGETACIÃ“N'
  # 'MATORRAL',
  # 'MEZQUITAL',
  # 'CHAPARRAL',
  # 'ASENTAMIENTOS HUMANOS',
].freeze

geojson['features'].each do |feature|
  description = feature['properties']['DESCRIPCIO']
  category = USOS_DE_SUELO.detect { |uso| description.include? uso }
  if category.nil?
    puts 'NIL', description
    if categories['Otros']
      categories['Otros'] << feature
    else
      categories['Otros'] = [feature]
    end
  elsif categories[category]
    categories[category] << feature
  else
    categories[category] = [feature]
  end
end

categories.keys.each do |category|
  File.open("data/output/uso-suelo-generic/#{category}.json", 'wb') do |file|
    file.write(JSON.generate(
                 type: geojson['type'],
                 name: geojson['name'],
                 crs: geojson['crs'],
                 features: categories[category]
               ))
  end
end
