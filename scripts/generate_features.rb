# frozen_string_literal: true

require 'csv'
require 'json'

filepath = 'data/output/matrix.csv'

polygons = {}
csv_options = { headers: :first_row }
headers = %w[destination origin car bike walk]

# destination origin transport transport-bike car bike walk
CSV.foreach(filepath) do |row|
  polygons[row[1]] = {} unless polygons.key?(row[1])

  polygons[row[1]][row[0]] = [row[2].to_i, row[3].to_i, row[4].to_i, row[5].to_i, row[6].to_i]
end

puts polygons.size

polygons.keys.each do |origin|
  File.open("data/output/features/#{origin}.json", 'wb') do |file|
    file.write(JSON.generate(polygons[origin]))
  end
end
