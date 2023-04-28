// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId }) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 Javascript 資料陣列
    .sort({ _id: 'desc' }) // 新增這裡：根據 ＿id 升冪排序
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 模板
    .catch(error => console.error(error)) // 錯誤處理
})
// 匯出路由器
module.exports = router