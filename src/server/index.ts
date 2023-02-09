import express from 'express'
import cors from 'cors'
import { thisMonth, thisWeek, today } from '../posts'

const app = express()
app.use(cors())

app.get('/posts', (req, res) => {
  res.json ([today, thisWeek, thisMonth])
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
