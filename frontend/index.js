async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display = 'none'

  document.querySelector('#citySelect').addEventListener('change', async evt => {
      try {
        evt.target.setAttribute('disabled', 'disabled')
        document.querySelector('#weatherWidget').style.display = 'none'
        document.querySelector('.info').textContent = 'Fetching weather data...'
        let city = evt.target.value
        let url = `http://localhost:3003/api/weather?city=${city}`
        
        const res = await axios.get(url)

        document.querySelector('.info').textContent = ''
        document.querySelector('#weatherWidget').style.display = 'block'
        evt.target.removeAttribute('disabled')

        let { data } = res

        document.querySelector('#apparentTemp div:nth-child(2)').textContent = `${data.current.apparent_temperature}°`
        document.querySelector('#todayStats div:nth-child(1)').textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
        document.querySelector('#todayStats div:nth-child(2)').textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
        document.querySelector('#todayStats div:nth-child(3)').textContent = `Humidity: ${data.current.humidity}%`
        document.querySelector('#todayStats div:nth-child(4)').textContent = `Wind: ${data.current.wind_speed}m/s`
        document.querySelector('#todayDescription').textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]

        data.forecast.daily.forEach((day, index) => {
          let card = document.querySelectorAll('.next-day')[index]

          let dayOfWeek = card.children[0]
          let feelsLike = card.children[1]
          let minMax = card.children[2]
          let precipitation = card.children[3]

          dayOfWeek.textContent = getDayOfWeek(day.date)
          feelsLike.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
          minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
          precipitation.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
        })

        document.querySelector('#location div:nth-child(1)').textContent = data.location.city
        document.querySelector('#location div:nth-child(2)').textContent = data.location.country

      } catch(error) {
        console.log(error.message)
      }
  })
function getDayOfWeek(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const newDate = new Date(date)
  const dayNumber = newDate.getDay()
  return days[dayNumber]
}

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
