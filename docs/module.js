const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css')
  script('https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js')
  const map = document.createElement('div')
  map.id = 'map'
  document.body.appendChild(map)
}
init()

const showMap = async (texts) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw'
  const map = new mapboxgl.Map({
    container: 'map',
    center: [139.68786, 35.68355],
    zoom: 14.65,
    pitch: 60,
    bearing: 22,
    hash: true,
    style: 'https://optgeo.github.io/one-styled/style.json'
  })
  map.addControl(new mapboxgl.NavigationControl())
  map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))

  let voice = null
  for(let v of speechSynthesis.getVoices()) {
    if (v.name == 'Kyoko') voice = v
  }

  map.on('load', () => {
    map.on('click', 'one', (e) => {
      let u = new SpeechSynthesisUtterance()
      u.lang = 'ja-JP'
      u.text = texts[e.features[0].properties.code]
      if (voice) u.voice = voice
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    })
  })
}

const texts = {
  '山地': 'さんち。かたむきが急な土地',
  '崖・段丘崖': 'がけ・だんきゅうがい。かたむきがとても急な土地',
  '地すべり地形': 'じすべりちけい。山が重力ですべってできた土地',
  '台地・段丘': 'だいち・だんきゅう。侵食でけずり残された平坦な土地',
  '山麓堆積地形': 'さんろくたいせきちけい。崩れたり流れたりした土砂が堆積した土地',
  '扇状地': 'せんじょうち。谷から運ばれた土砂が堆積したゆるやかな斜面',
  '自然堤防': 'しぜんていぼう。川があふれた場所に土砂が堆積し、数mまで高くなった土地',
  '天井川': 'てんじょうがわ。まわりよりかわぞこが高い川',
  '砂州・砂丘': 'さす・さきゅう。砂が堆積しまわりよりわずかに高い土地',
  '凹地・浅い谷': 'おうち・あさいたに。まわりと比べてわずかに低い土地',
  '氾濫平野': 'はんらんへいや。洪水や海がつくった低くて平坦な土地',
  '後背低地・湿地': 'こうはいていち・しっち。はんらんへいやのなかで周囲よりもわずかに低い土地',
  '旧河道': 'きゅうかどう。かつて川だった周囲よりわずかに低い土地',
  '落堀': 'おっぽり。堤防を越えた水が侵食した低い土地',
  '河川敷・浜': 'かせんじき・はま。川・湖・海などの水ぎわの土地',
  '水部': 'すいぶ。川・湖・海などの水面',
  '旧水部': 'きゅうすいぶ。このすうひゃくねんのうちに水部であったあとで陸地になった土地'
}
window.onload = () => {
  showMap(texts)
}
