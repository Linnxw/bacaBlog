import mysql from "mysql"
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'baca_blog'
})

export default db