URL = "https://gsi-cyberjapan.github.io/gsivectortile-3d-like-building/building3d.json"

task :default do
  sh "curl #{URL} | ruby filter.rb > docs/style.json"
  sh "gl-style-validate docs/style.json"
end

task :host do
  sh "budo -d docs"
end

