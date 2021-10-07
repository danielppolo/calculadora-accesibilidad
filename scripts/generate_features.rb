# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data/src/matrix_v2.csv'

polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin Transporte Tracar Trabici car bicicleta Caminando]

# "destination","origin","id","bicicleta_TM","bicicleta","bus_mejora_TM","bus_actual_TM","bus_actual","TM_caminando","caminando","origin_xcoord","origin_ycoord","destination_xcoord","destination_ycoord"

# destination origin transport transport-bike car bike walk
CSV.foreach(filepath, csv_options) do |row|
  polygons[row['origin']] = {} unless polygons.key?(row['origin'])

  polygons[row['origin']][row['destination']] = [
    row['caminando'].to_i,
    row['bicicleta'].to_i,
    row['bus_actual'].to_i,
    row['TM_caminando'].to_i,
    row['bus_actual_TM'].to_i,
    row['bicicleta_TM'].to_i,
    row['bus_mejora_TM'].to_i
  ]
end

puts polygons['88450a1b25fffff']
puts polygons.size

# polygons.keys.each do |origin|
#   File.open("data/output/features/#{origin}.json", 'wb') do |file|
#     file.write(JSON.generate(polygons[origin]))
#   end
# end

# [ "caminando",
#   "bicicleta",
#   "bus_actual",
#   "TM_caminando",
#   "bus_actual_TM",
#   "bicicleta_TM",
#   "bus_mejora_TM
#  ]
