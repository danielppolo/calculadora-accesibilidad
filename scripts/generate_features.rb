# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data/output/matrix.csv'

polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin Transporte Tracar Trabici car bicicleta Caminando]

# destination origin transport transport-bike car bike walk
CSV.foreach(filepath, csv_options) do |row|
  polygons[row["origin"]] = {} unless polygons.key?(row["origin"])

  polygons[row["origin"]][row["destination"]] = [row["Transporte"].to_i, row["Tracar"].to_i, row["Trabici"].to_i, row["car"].to_i, row["bicicleta"].to_i, row["Caminando"].to_i]
end

puts polygons.size

polygons.keys.each do |origin|
  File.open("data/output/features/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end
