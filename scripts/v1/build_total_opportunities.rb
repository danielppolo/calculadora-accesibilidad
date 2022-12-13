# frozen_string_literal: true

require 'json'

filepath = 'data_aws/input/chihuahua/main.json'

transformed_data = {}
raw_data = File.read(filepath)

data = JSON.parse(raw_data)

data.each do |key, value|
  transformed_data[key] = {
    clinics: value['properties']['clinics'],
    companies: value['properties']['empress'],
    jobs: value['properties']['jobs_w'],
    schools: value['properties']['escuels']
  }
end

directory_name = 'data_aws/output/chihuahua/total'
Dir.mkdir(directory_name) unless File.exist?(directory_name)

File.open('data_aws/output/chihuahua/total/current.json', 'wb') do |file|
  file.write(JSON.generate(transformed_data))
end
