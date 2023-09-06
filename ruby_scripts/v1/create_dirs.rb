cities = %w[acapulco aguascalientes cancun cuernavaca chihuahua guadalajara leon merida
            monterrey morelia puebla-tlaxcala queretaro saltillo san-luis-potosi tampico tijuana toluca valle-de-mexico
            veracruz villahermosa]

cities.each do |city|
  directory_name = 'data_aws/cities'
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/grids"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/reachable-area-by-transport"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/reachable-opportunities"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/reachable-by-emissions"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/reachable-by-emissions/current"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/total-opportunities"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)

  directory_name = "data_aws/cities/#{city}/visualizations/reachable-area-by-transport/current"
  Dir.mkdir(directory_name) unless File.exist?(directory_name)
end
