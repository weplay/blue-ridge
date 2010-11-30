require "rubygems"
require "micronaut"
require "micronaut/rake_task"

ENV["BLUE_RIDGE_PREFIX"] = File.dirname(__FILE__)
import File.dirname(__FILE__) + '/lib/tasks/javascript_testing_tasks.rake'

namespace :test do
  desc "Run all micronaut examples using rcov"
  Micronaut::RakeTask.new :rubies do |t|
    t.pattern = "spec/rubies/**/*_spec.rb"
  end
end

task :default => ["test:rubies", "test:javascripts"]

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gem|
    gem.name = "blue-ridge"
    gem.summary = %Q{support for command-line and in-browser JavaScript unit tests}
    gem.description = %Q{support for command-line and in-browser JavaScript unit tests}
    gem.email = "tech@weplay.com"
    gem.homepage = "http://github.com/weplay/blue-ridge"
    gem.authors = ["Relevance"]
  end
rescue LoadError
  puts "Jeweler (or a dependency) not available. Install it with: gem install jeweler"
end