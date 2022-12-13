# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/chihuahua/main.json'

raw_data = File.read(filepath)

data = JSON.parse(raw_data)

data.each do |_key, value|
  value['properties'] = {}
end

directory_name = 'data_aws/output/chihuahua/grids'
Dir.mkdir(directory_name) unless File.exist?(directory_name)

File.open('data_aws/output/chihuahua/grids/seven.json', 'wb') do |file|
  file.write(JSON.generate(data))
end
