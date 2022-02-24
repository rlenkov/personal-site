const path = require('path')
const fs = require('fs')
const fb = require('./src/storage/firebase')
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

exports.onPreBootstrap = async () => {
    // clear blog cache
    if (process.env.RUN_DOWNLOAD === 'true') {
        const postPath = path.resolve(__dirname, './content/')
        await fs.promises.rm(postPath, { recursive: true })
        await fs.promises.mkdir(postPath, { recursive: true })
        await fb.getFilesFromDir('_assetbox')
    } else {
        console.info('Ommiting Download')
    }
}
