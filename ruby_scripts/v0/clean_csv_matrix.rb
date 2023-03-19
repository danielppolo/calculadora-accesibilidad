# frozen_string_literal: true

require 'csv'

filepath = 'data/src/matrix.csv'
output_path = 'data/output/matrix.csv'
list = []
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin Transporte Tracar Trabici car bicicleta Caminando]

CSV.foreach(filepath, csv_options) do |row|
  list << [row['destination'], row['origin'], row['Transporte'], row['Tracar'], row['Trabici'], row['car'], row['bicicleta'], row['Caminando']]
end

CSV.open(output_path, 'wb', csv_options) do |csv|
  csv << headers
  list.each do |row|
    csv << row
  end
end
