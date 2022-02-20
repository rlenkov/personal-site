const path = require('path')
const fs = require('fs')
const fb = require('./src/storage/firebase')

exports.onPreBootstrap = async () => {
    // clear blog cache
    const postPath = path.resolve(__dirname, './content/')
    await fs.promises.rm(postPath, { recursive: true })
    await fs.promises.mkdir(postPath, { recursive: true })
    await fb.getFilesFromDir('_assetbox')
}
