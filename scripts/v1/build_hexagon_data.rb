# frozen_string_literal: true

require 'csv'
require 'json'

SLOW_FACTOR = 1.6927
polygons = {}
csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[destination origin id autom�vil tp caminando bicicleta origin_xcoord origin_ycoord destination_xcoord
             destination_ycoord]

cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  filepath = "data_aws/input/#{city}/ttm_120min_9.csv"
  CSV.foreach(filepath, **csv_options) do |row|
    polygons[row['origin']] = {} unless polygons.key?(row['origin'])

    polygons[row['origin']][row['destination']] = {
      walk: row['caminando'].to_i,
      bike: row['bicicleta'].to_i,
      public: row['tp'].to_i,
      car: (row['automovil'].to_i * SLOW_FACTOR).round
    }
  end

  polygons.keys.each do |origin|
    File.open("data_aws/cities/#{city}/visualizations/reachable-area-by-transport/current/#{origin}.json",
              'wb') do |file|
      file.write(JSON.generate(polygons[origin]))
    end
  end
end
