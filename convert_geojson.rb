require 'json'

hexagons = {}

filepath = 'data/cancun.json'

serialized_geojson = File.read(filepath)

cancun = JSON.parse(serialized_geojson)

cancun['features'].each do |feature|
  hexagons[feature['properties']['h3_ddrs']] = feature unless hexagons[feature['properties']['h3_ddrs']]
end

File.open('data/cancunDictionary.json', 'wb') do |file|
  file.write(JSON.generate(hexagons))
end