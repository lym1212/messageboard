## 文件结构

```
.
├── public               静态文件
├── views                html 页面
	  ├── index.html
	  ├── post.html
	  └── 404.html
└── app.js               项目启动文件
```

## 安装和引入

```shell
npm install art-template
```

```javascript
const fs = require('fs')    // 文件系统模块
const http = require('http')
const template = require('art-template')   // 模板引擎
```

## 创建服务器

```javascript
http.createServer((req, res) => {
    // URL 类，参数是要解析的地址
    const queryURL = new URL(req.url, 'http://127.0.0.1:3000/')
    // URL 类的 pathname 路径(不包括 ? 后的内容)
    const pathname = queryURL.pathname
}).listen(3000, () => {
})
```

## 路由

#### 判断 `pathname` 

- 首页 `'/'`：`fs.readFile` 方法读取 `index.html` 文件， `res.end()` 方法传递评论数据给模板引擎渲染

  ```javascript
  fs.readFile('./views/index.html', (err, data) => {
      // template.render() 第一个参数为模板字符串
      // toString() 方法将读取到的二进制数据转换为字符串，然后 comments 来替换
      // 如果没有替换对象，不用转换 res.end(data)
      res.end(template.render(data.toString(), {
      	comments
      }))
  })
  ```

- 发表页面 `'/post'`：读取并渲染 `post.html` 文件

- 发表评论 `'/comment'`：

  ```javascript
  // URL 类的 searchParams 是查询参数的 URLSearchParams 对象(只读)
  // URLSearchParams 类的 forEach 方法遍历提交的信息
  const obj = {}
  queryURL.searchParams.forEach((val, key) => {
  	obj[key] = val
  })
  // 重定向
  res.setHeader('Location', '/')
  res.end()
  ```

- 读取静态文件 `'/public/'`：

  ```javascript
  // 判断 pathname 是否是 /public/ 开头
  if (pathname.startsWith('/public/') === true) {          
      fs.readFile('.' + req.url, (err, data) => {
          if (err) {
              return res.end('404 Not Found.')
          }
          res.end(data)
      })
  }
  ```

## 存储留言内容

- 数组和对象：一条留言包括三个属性（name、msg、dataTime）

  ```javascript
  {
      name: 'majiaqi',
      msg: '1221212121',
      dateTime: '2002-12-12 12:12:12'
  }
  ```

## art-template 模板引擎遍历

```html
<ul class="list-group">
    {{each comments}}
    <li class="list-group-item">
        {{ $value.name }} ：{{ $value.msg }}
        <span class="pull-right">{{ $value.dateTime}}</span>
    </li>
    {{/each}}
</ul>
```

