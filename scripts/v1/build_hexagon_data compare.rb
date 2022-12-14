# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data_aws/input/chihuahua/ttm_120min_9.csv'

polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin id autom�vil tp caminando bicicleta origin_xcoord origin_ycoord destination_xcoord
             destination_ycoord]

def get_count(value)
  if value.between?(0, 30)
    return 30
  elsif value.between?(30, 60)
    return 60
  end

  120
end

CSV.foreach(filepath, **csv_options) do |row|
  polygons[row['origin']] = {} unless polygons.key?(row['origin'])

  polygons[row['origin']][row['destination']] = {
    walk: get_count(row['caminando'].to_i),
    bike: get_count(row['bicicleta'].to_i),
    public: get_count(row['tp'].to_i),
    car: get_count(row['autom�vil'].to_i)
  }
end

directory_name = 'data_aws/output/chihuahua/iso_variant_compare'
Dir.mkdir(directory_name) unless File.exist?(directory_name)

polygons.keys.each do |origin|
  File.open("data_aws/output/chihuahua/iso_variant_compare/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end
