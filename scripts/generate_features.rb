# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data/src/cities/VALLE DE MÉXICO/ttm_120min_9.csv'

polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin id automovil tp caminando bicicleta origin_xcoord origin_ycoord destination_xcoord destination_ycoord]

CSV.foreach(filepath, csv_options) do |row|
  polygons[row['origin']] = {} unless polygons.key?(row['origin'])

  polygons[row['origin']][row['destination']] = [
    row['caminando'].to_i,
    row['bicicleta'].to_i,
    row['tp'].to_i,
    row['automovil'].to_i
  ]
end

polygons.keys.each do |origin|
  File.open("data/output/cities/valle-de-mexico/actual/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end
