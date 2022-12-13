# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/chihuahua/static.json'

transformed_data = {}
raw_data = File.read(filepath)

data = JSON.parse(raw_data)

opportunities = {
  'c' => 'clinics',
  'e' => 'companies',
  't' => 'jobs',
  's' => 'schools'
}

transports = {
  'a' => 'car',
  'c' => 'walk',
  'tp' => 'public',
  'b' => 'bike'
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

directory_name = 'data_aws/output/chihuahua/reachable'
Dir.mkdir(directory_name) unless File.exist?(directory_name)

File.open('data_aws/output/chihuahua/reachable/current.json', 'wb') do |file|
  file.write(JSON.generate(transformed_data))
end
