# frozen_string_literal: true

require 'json'

hexagons = {}

filepath = 'data/src/cancun_v4.json'
output_path = 'data/output/main_v4.json'

serialized_geojson = File.read(filepath)

cancun = JSON.parse(serialized_geojson)

cancun['features'].each do |feature|
  unless hexagons[feature['properties']['h3_ddrs']]
    hexagons[feature['properties']['h3_ddrs']] = feature
  end
end

File.open(output_path, 'wb') do |file|
  file.write(JSON.generate(hexagons))
end
