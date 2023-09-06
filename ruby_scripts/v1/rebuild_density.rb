# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/usos_suelo.json'

raw_data = File.read(filepath)

data = JSON.parse(raw_data)

File.open('data_aws/cities/zonas_metropolitanas.json', 'wb') do |_file|
  usos = []

  features = data['features'].map do |feature|
    name = feature['properties']['DESCRIPCIO']
    usos << name
  end

  puts usos.uniq.sort

  # file.write(
  #   JSON.generate(
  #     {
  #       type: 'FeatureCollection',
  #       name: 'Zonas Metropolitanas',
  #       features: features
  #     }
  #   )
  # )
end
