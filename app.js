const fs = require('fs')
const http = require('http')
const template = require('art-template')

const comments = [
  {
    name: 'majiaqi',
    msg: '1221212121',
    dateTime: '2002-12-12 12:12:12'
  },
  {
    name: 'majiaqi',
    msg: '1221212121',
    dateTime: '2002-12-12 12:12:12'
  },
  {
    name: 'majiaqi',
    msg: '1221212121',
    dateTime: '2002-12-12 12:12:12'
  },
  {
    name: 'majiaqi',
    msg: '1221212121',
    dateTime: '2002-12-12 12:12:12'
  }
]

http.createServer((req, res) => {
  const queryURL = new URL(req.url, 'http://127.0.0.1:3000/')
  const pathname = queryURL.pathname

  if (pathname === '/') {
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(template.render(data.toString(), {
        comments
      }))
    })
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html', (err, data) => {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  } else if (pathname === '/comment') {
    const obj = {}
    const nowTime = new Date()
    queryURL.searchParams.forEach((val, key) => {
      obj[key] = val
    })
    obj.dateTime = nowTime.toLocaleString('zh-CN')
    comments.unshift(obj)
    res.statusCode = 302
    res.setHeader('Location', '/')   // 重定向
    res.end()
  } else if (pathname.startsWith('/public/') === true) {
    fs.readFile('.' + req.url, (err, data) => {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  } else {
    fs.readFile('./views/404.html', (err, data) => {
      res.end(data)
    })
  }
}).listen(3000, () => {
  console.log('success');
})