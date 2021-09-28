# frozen_string_literal: true

require 'csv'

filepath = 'data/src/matrix.csv'
output_path = 'data/output/matrix.csv'
list = []
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }

CSV.foreach(filepath) do |row|
  list << row
end

CSV.open(output_path, 'wb') do |csv|
  # "destination","origin","id","bicicleta","Tracar","Trabici","Transporte","Caminando","origin_xcoord","origin_ycoord","destination_xcoord","destination_ycoord"
  # csv << %w[destination origin transport transport-bike car bike walk]
  list.each do |row|
    csv << [row[0], row[1], row[6], row[5], row[4], row[3], row[7]]
  end
end
