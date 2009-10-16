require 'sinatra'

module BlueRidge
  class Server < Sinatra::Base
    # set :root, File.dirname(__FILE__) + "/server"
    set :port, 4000
    enable :logging

    get '/' do
      %q{
        <ul>
          <li><a href="/fixtures/project.html">project</a></li>
          <li><a href="/fixtures/foo/nested_project.html">foo/nested_project</a></li>
          <li><a href="/fixtures/foo/bar/doubly-nested_project.html">foo/bar/doubly-nested_project</a></li>          
        </ul>
      }
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