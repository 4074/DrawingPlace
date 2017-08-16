const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const root = path.resolve(__dirname, '../')
const dirfix = '../../pms/'
let output = fs.createWriteStream(path.resolve(root, 'pms.zip'))
let archive = archiver('zip', {
    zlib: {level: 9}
})

archive.pipe(output)

const files = fs.readdirSync(root)
files.forEach((file) => {
    if (/^(\.|app)/.test(file) || /\.zip$/.test(file)) return;
    const pathname = root + '/' + file
    const stat = fs.lstatSync(pathname)
    console.log(file, stat.isDirectory())

    if (stat.isDirectory()) {
        archive.directory(dirfix + file + '/')
    } else {
        archive.file(dirfix + file)
    }
})
archive.directory(dirfix + 'app/build/')

console.info('finalize')
archive.finalize()