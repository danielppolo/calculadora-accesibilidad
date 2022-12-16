# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/zonas_metropolitanas.json'

raw_data = File.read(filepath)

data = JSON.parse(raw_data)

File.open('data_aws/output/zonas_metropolitanas.json', 'wb') do |file|
  file.write(JSON.generate({
                             type: 'FeatureCollection',
                             name: 'Zonas Metropolitanas',
                             features: data['features'].map do |feature|
                                         name = feature['properties']['NOMBRE']
                                         feature['properties'] = {}
                                         feature['properties']['code'] = name.downcase
                                         feature
                                       end
                           }))
end
