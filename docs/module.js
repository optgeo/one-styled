import { YAML } from 'https://code4sabae.github.io/js/YAML.js'

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

const yaml = () => {
  for (const e of document.querySelectorAll('script')) {
    if (e.type == 'text/yaml') {
      return e.textContent
    }
  }
  return null
}

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
    if (v.name = 'Kyoko') voice = v
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

const texts = await YAML.parse(yaml())
window.onload = () => {
  showMap(texts)
}
