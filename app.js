const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
const weatherToken = process.env.OPENWEATHER_TOKEN

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=kaohsiung&limit=5&appid=${weatherToken}`
    )
    .then((response) => {
      let { lat } = response.data[0]
      let { lon } = response.data[0]
      let weatherAdd = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=${weatherToken}&units=metric`

      axios
        .get(weatherAdd)
        .then((result) => {
          const data = result.data
          const temp = data.main.temp
          const location = data.name
          const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          const date = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
          })
          res.render('weather', {
            temp: Math.round(data.main.temp),
            highTemp: Math.round(data.main.temp_max),
            lowTemp: Math.round(data.main.temp_min),
            location,
            weatherIcon,
            date,
          })
        })

        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

app.get('/search', (req, res) => {
  const { location } = req.query
  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${weatherToken}`
    )
    .then((response) => {
      let { lat } = response.data[0]
      let { lon } = response.data[0]
      let weatherAdd = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=${weatherToken}&units=metric`

      axios
        .get(weatherAdd)
        .then((result) => {
          const data = result.data
          const temp = data.main.temp
          const location = data.name
          const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          const date = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
          })
          res.render('weather', {
            temp: Math.round(data.main.temp),
            highTemp: Math.round(data.main.temp_max),
            lowTemp: Math.round(data.main.temp_min),
            location,
            weatherIcon,
            date,
          })
        })

        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// 網站 啟動！
app.listen(port, () => {
  console.log('gogo')
})
