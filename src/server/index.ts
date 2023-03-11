import crypto from 'crypto'
import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import type { Post } from '../posts'
import { thisMonth, thisWeek, today } from '../posts'
import type { NewUser, User } from '@/users'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get('/posts', (req, res) => {
  res.json(allPosts)
})

app.put<{}, {}, Post>('/posts', (req, res) => {
  const index = allPosts.findIndex(x => x.id === req.body.id)
  if (index === -1)
    throw new Error(`Post with id ${req.body.id}`)

  const existingPost = allPosts[index]
  if (req.body.authorId !== existingPost.authorId)
    throw new Error('not original author')

  allPosts[index] = { ...existingPost, ...req.body }
  res.json(allPosts[index])
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(post)
})

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = {
    ...req.body,
    id: (Math.random() * 1000000).toFixed(),
  }
  allUsers.push(user)
  authenticate(user.id, req, res)
  const { password, ...rest } = user
  res.json(rest)
})

app.post<{}, {}, NewUser>('/login', (req, res) => {
  const targetUser = allUsers.find(x => x.username === req.body.username)

  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  }
  else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})

const SECRET = crypto.randomBytes(32).toString('hex')
const COOKIE = 'vuejs-jwt'

function authenticate(id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'dodo',
    expiresIn: '30 days',
  })
  res.cookie(COOKIE, token, { httpOnly: true, secure: true })
}

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    res.json({ id: result.id })
  }
  catch (err) {
    res.status(404).end()
  }
})

app.post('/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})
