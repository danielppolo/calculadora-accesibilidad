# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/chihuahua/static.json'

transformed_data = {}
raw_data = File.read(filepath)

data = JSON.parse(raw_data)

opportunities = {
  'c' => 'clinicas',
  'e' => 'empresas',
  't' => 'trabajos',
  's' => 'escuelas'
}

transports = {
  'a' => 'auto',
  'c' => 'caminando',
  'tp' => 'publico',
  'b' => 'bici'
}

data.each do |key, properties|
  properties.each do |property, value|
    opportunity_code, transport_code, time = property.split('_')
    opportunity = opportunities[opportunity_code]
    transport = transports[transport_code]
    transformed_data[key] ||= {}
    transformed_data[key][opportunity] ||= {}
    transformed_data[key][opportunity][transport] ||= {}
    transformed_data[key][opportunity][transport][time.to_s + 'm'] ||= {}

    transformed_data[key][opportunity][transport][time.to_s + 'm'] = value
  end
end

File.open('data_aws/output/chihuahua/current.json', 'wb') do |file|
  file.write(JSON.generate(transformed_data))
end
