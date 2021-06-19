require 'yaml'
require 'json'

s = JSON.parse($stdin.read)

s['layers'].each {|l|
  l.delete('metadata')  
  l['maxzoom'] = 24 if l['maxzoom'] >= 17
}

s['sources']['h'] = YAML.load <<EOS
type: raster-dem
minzoom: 3
maxzoom: 13
tileSize: 512
tiles:
  - https://optgeo.github.io/10b512-7-113-50/zxy/{z}/{x}/{y}.webp
EOS

s['sources']['v'] = YAML.load <<EOS
type: vector
minzoom: 10
maxzoom: 12
tiles:
  - https://optgeo.github.io/unite-one/zxy/{z}/{x}/{y}.pbf
attribution: 国土地理院ベクトルタイル提供実験
EOS

s['layers'].prepend YAML.load <<EOS
id: one
type: fill
source: v
source-layer: one
paint: 
  fill-color: 
    - match
    -
      - get
      - code
    - 山地
    - "#d9cbae"
    - 崖・段丘崖
    - "#9466ab"
    - 地すべり地形
    - "#cc99ff"
    - 台地・段丘
    - "#ffaa00"
    - 山麓堆積地形
    - "#99804d"
    - 扇状地
    - "#cacc60"
    - 自然堤防
    - "#ffff33"
    - 天井川
    - "#fbe09d"
    - 砂州・砂丘
    - "#ffff99"
    - 凹地・浅い谷
    - "#a3cc7e"
    - 氾濫平野
    - "#bbff99"
    - 後背低地・湿地
    - "#00d1a4"
    - 旧河道
    - "#6699ff"
    - 落堀
    - "#1f9999"
    - 河川敷・浜
    - "#9f9fc4"
    - 水部
    - "#e5ffff"
    - 旧水部
    - "#779999"
    - "#f00"
EOS

s['layers'].prepend YAML.load <<EOS
id: background
type: background
paint:
  background-color:
    - rgb
    - 255
    - 255
    - 255
EOS

s['layers'].prepend YAML.load <<EOS
id: sky
type: sky
paint:
  sky-type: atmosphere
EOS

s['terrain'] = {
  :source => 'h'
}

s['fog'] = {
  :range => [-2, 10],
  :color => [
    'rgb',
    255,
    255,
    255
  ]
}

print JSON.dump(s)

