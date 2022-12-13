# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/chihuahua/main.json'

raw_data = File.read(filepath)

data = JSON.parse(raw_data)

data.each do |_key, value|
  value['properties'] = {}
end

File.open('data_aws/output/chihuahua/seven.json', 'wb') do |file|
  file.write(JSON.generate(data))
end
