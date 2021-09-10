require 'csv'
require 'json'

filepath = 'data/matrix_2.csv'

polygons = {}
csv_options = { headers: :first_row }
headers = %w[destination origin car bike walk]

CSV.foreach(filepath) do |row|
  polygons[row[1]] = {} unless polygons.key?(row[1])

  polygons[row[1]][row[0]] = {
    car: row[2].to_f,
    bike: row[3].to_f,
    walk: row[4].to_f
  }
end

puts polygons.size

polygons.keys.each do |origin|
  File.open("data/api/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end