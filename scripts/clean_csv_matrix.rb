require 'csv'

filepath = 'data/matrix.csv'

list = []
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }

CSV.foreach(filepath) do |row|
  list << row
end

CSV.open('data/matrix_2.csv', 'wb') do |csv|
  csv << ['destination', 'origin', 'car', 'bike', 'walk']
  list.each do |row|
    csv << [row[0], row[1], row[3], row[4], row[5]]
  end
end