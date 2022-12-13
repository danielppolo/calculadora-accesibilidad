# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data_aws/input/chihuahua/ttm_120min_9.csv'

polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin id autom�vil tp caminando bicicleta origin_xcoord origin_ycoord destination_xcoord
             destination_ycoord]

CSV.foreach(filepath, **csv_options) do |row|
  polygons[row['origin']] = {} unless polygons.key?(row['origin'])

  polygons[row['origin']][row['destination']] = {
    walk: row['caminando'].to_i,
    bike: row['bicicleta'].to_i,
    public: row['tp'].to_i,
    car: row['autom�vil'].to_i
  }
end

directory_name = 'data_aws/output/chihuahua/iso_variant'
Dir.mkdir(directory_name) unless File.exist?(directory_name)

polygons.keys.each do |origin|
  File.open("data_aws/output/chihuahua/iso_variant/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end
