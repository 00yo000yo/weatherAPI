const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const axios = require('axios')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// app.get('/', (req, res) => {
//   axios
//     .get(
//       'http://api.openweathermap.org/geo/1.0/direct?q=kaohsiung&limit=5&appid=0a31dde1cca5aedddfdcb4b9f633ef6a'
//     )
//     .then((response) => {
//       let { lat } = response.data[0]
//       let { lon } = response.data[0]
//       let weatherAdd = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=0a31dde1cca5aedddfdcb4b9f633ef6a&units=metric`
//       console.log(weatherAdd)

//       axios
//         .get(weatherAdd)
//         .then((res) => {
//           const data = res.data
//           const temp = data.main.temp
//           const location = data.name
//         })
//         .then(() => res.render('weather', { temp, location }))
//     })
//     .catch((err) => console.log(err))
// })

// axios
//   .get(
//     'http://api.openweathermap.org/geo/1.0/direct?q=kaohsiung&limit=5&appid=0a31dde1cca5aedddfdcb4b9f633ef6a'
//   )
//   .then((response) => {
//     let { lat } = response.data[0]
//     let { lon } = response.data[0]
//     let weatherAdd = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=0a31dde1cca5aedddfdcb4b9f633ef6a&units=metric`
//     console.log(weatherAdd)

//     axios
//       .get(weatherAdd)
//       .then((res) => {
//         const data = res.data
//         const tempteraure = data.main.temp
//         const location = data.name
//       })
//       .then(() => res.render('weather', { tempteraure, location }))
//   })
//   .catch((err) => console.log(err))

app.get('/1', (req, res) => {
  axios
    .get(
      'http://api.openweathermap.org/geo/1.0/direct?q=kaohsiung&limit=5&appid=0a31dde1cca5aedddfdcb4b9f633ef6a'
    )
    .then((response) => {
      let { lat } = response.data[0]
      let { lon } = response.data[0]
      let weatherAdd = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=0a31dde1cca5aedddfdcb4b9f633ef6a&units=metric`

      axios
        .get(weatherAdd)
        .then((result) => {
          const data = result.data
          const temp = data.main.temp
          const location = data.name
          // console.log(temp)
          res.render('weather', { temp, location })
        })

        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// 網站 啟動！
app.listen(port, () => {
  console.log('gogo')
})
