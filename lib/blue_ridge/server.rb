require 'sinatra'

module BlueRidge
  class Server < Sinatra::Base
    # set :root, File.dirname(__FILE__) + "/server"
    set :port, 4000
    enable :logging

    get '/' do
      spec_files = Dir.glob(BlueRidge.javascript_spec_dir + "/**/*.js")
      spec_files = spec_files.reject {|spec_file| spec_file =~ /spec_helper.js$/ }
      spec_files = spec_files.map {|spec_file| spec_file.gsub(BlueRidge.javascript_spec_dir + "/", "") }
      spec_files = spec_files.map {|spec_file| spec_file.gsub("_spec.js", ".html") }

      output = "<ul>"
      spec_files.each do |spec_file|
        output += %Q{<li><a href="/fixtures/#{spec_file}">#{spec_file}</a></li>}
      end
      output += "</ul>"
    end
    
    # TODO: change "fixtures" to "spec" long-term
    get '/fixtures/*' do |file|
      send_file "test/javascript/fixtures/#{file}"
    end

    get '/public/javascripts/*' do |file|
      send_file "public/javascripts/#{file}"
    end

    get '/vendor/plugins/blue-ridge/lib/blue-ridge.js' do
      send_file "vendor/plugins/blue-ridge/lib/blue-ridge.js"
    end
    
    # TODO: get rid of the double-slash in here, eventually
    get '/vendor/plugins/blue-ridge//vendor/:file' do |file|
      send_file "vendor/plugins/blue-ridge/vendor/#{file}"
    end
    
    get '/*.js' do |js_prefix|
      send_file "test/javascript/#{js_prefix}.js"
    end
  end
end
