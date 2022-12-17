# frozen_string_literal: true

require 'json'
require 'httparty'
require 'uri'
dataset_id = 'ckvwxv3cc1j6027p5cu4dwadu'
filepath = 'data/src/usos-de-suelo/usos-de-suelo.geojson'
geojson_serialized = File.read(filepath)
geojson = JSON.parse(geojson_serialized)
features = geojson['features']
puts features.count
features.each_with_index do |feature, index|
  feature_id = "F#{index}"
  uri = "https://api.mapbox.com/datasets/v1/daniel-itdp/#{dataset_id}/features/#{feature_id}?access_token=sk.eyJ1IjoiZGFuaWVsLWl0ZHAiLCJhIjoiY2t1ajdqZXV0MnZicjJwbWFpMWN1YWJwdiJ9.FLiAzo23yTSJOA9S149Rzg"
  response = HTTParty.put(uri, headers: { 'Content-Type' => 'application/json' }, body: feature.to_json)
  puts JSON.parse(response.body)
  puts "Uplodaded feature: #{index}"
  sleep 1
end
