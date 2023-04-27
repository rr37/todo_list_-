// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入express-session
const session = require('express-session')
// 載入express-handlebars
const exphbs = require('express-handlebars')
// 載入 possport 設定檔，要寫在 express-session 之後
const usePassport = require('./config/passport')
// 載入 Todo model
const Todo = require('./models/todo')
// 載入 method-overrite
const methodOverride = require('method-override')

// 引用 body-parser
const bodyParser = require('body-parser')

// 引用路由器
const routes = require('./routes')

require('./config/mongoose')

// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})