# frozen_string_literal: true

require 'csv'
require 'json'
require 'fileutils'

dirpath = 'data/src/static'

csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
headers = %w[origin c_c_15 c_c_30 c_c_60 c_a_15 c_a_30 c_a_60 c_b_15 c_b_30 c_b_60 c_tp_15
             c_tp_30 c_tp_60 e_c_15 e_c_30 e_c_60 e_a_15 e_a_30 e_a_60 e_b_15 e_b_30 e_b_60 e_tp_15 e_tp_30 e_tp_60 s_c_15 s_c_30 s_c_60 s_a_15 s_a_30 s_a_60 s_b_15 s_b_30 s_b_60 s_tp_15 s_tp_30 s_tp_60 t_c_15 t_c_30 t_c_60 t_a_15 t_a_30 t_a_60 t_b_15 t_b_30 t_b_60 t_tp_15 t_tp_30 t_tp_60]

opportunities = {
  'c' => 'clinics',
  't' => 'jobs_w',
  's' => 'escuels',
  'e' => 'empress'
}

transports = {
  'a' => 'automovil',
  'b' => 'bicicleta',
  'tp' => 'bus_actual',
  'c' => 'caminando'
}

Dir.each_child(dirpath) do |filename|
  city = filename.gsub('.csv', '')
  polygons = {}
  CSV.foreach(dirpath + '/' + filename, csv_options) do |row|
    hexagon = row.to_h
    hexagon.delete('origin')
    polygons[row['origin']] = {}
    hexagon.each do |key, value|
      opportunity, transport, time = key.split('_')
      polygons[row['origin']][key] = value == 'NA' ? 0 : value.to_i
    end
  end

  Dir.mkdir 'data/output/static' + '/' + city
  File.open("data/output/static/#{city}/static.json", 'wb') do |file|
    file.write(JSON.generate(polygons))
  end
end

# Los archivos se llaman bd_estaticos_.csv.
# la primer letra de los nombres de las columnas es de los destinos
# c-> clinicas, t-> trabajos, e-> empresas, s-> escuelas.
# La segunda letra es el medio de transporte
# c-> caminando, b-> bicicleta, tp-> transporte público, a-> automóvil.
# y finalmente viene el tiempo
# 15, 30 y 60 minutos.
