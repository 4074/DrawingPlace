# Drawing Place

A website for pixel drawing. Similar to Reddit [r/place](https://www.reddit.com/r/place) and [BiliBili夏日绘板](https://live.bilibili.com/pages/1702/pixel-drawing)

Everyone drawing on a canvas. It is so cool!

Try it online [https://place.4074.name](https://place.4074.name)

## How to use

Requirements:
- Node.js >= 8.3
- MongoDB >= 3.2

Clone or Download this repo, and run
```
npm install
npm start
```

Then you can have fun on http://127.0.0.1:5200

## Development

- Server: express + mongoose + socket.io
- Front-End: react + redux + antd

Run the server and front-end separately on development and release

```
// run server with nodemon
npm run develop
npm run build // release

// run the react page
cd app
npm install
npm start
npm run build // release

```

TODOs

- Authorization
- Chat

## Contributing

Welcome to any commit. Even correct my grammatical mistakes.

License
(The MIT License)

Copyright (c) 2018 4074 <win.ten@qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.