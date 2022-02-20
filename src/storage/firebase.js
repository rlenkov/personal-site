const path = require('path')
const fs = require('fs')
const https = require('https')
const firebase = require('firebase/app')
const { getStorage, ref, list, getDownloadURL } = require('firebase/storage')
require('firebase/auth')
require('dotenv').config()

const initFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    }

    return firebase.initializeApp(firebaseConfig)
}

// Way of thinking is the following: Everything (file and folder) is
// a <StorageReference> obj. You can pass a <StorageReference> to a list()
// function to get the <StorageReference>-s in that ref if it was a directory.

exports.getFilesFromDir = async (remoteDir) => {
    const firebaseApp = initFirebase()
    const storage = getStorage(firebaseApp, process.env.CUSTOM_BUCKET)
    // Get directory <StorageReference> for remoteDir
    const aspectFolderListRef = ref(storage, remoteDir)

    console.info(`Fetching data files from firebase dir ${remoteDir}...`)

    try {
        // Get <ListObject> from directory <StorageReference>
        const aspectFolderListRefResponse = await list(aspectFolderListRef)

        for (const localItem of aspectFolderListRefResponse.items) {
            // Get downloadUrl for all file <StorageReference>
            const downloadUrl = await getDownloadURL(localItem)

            const postPath = path.resolve(
                __dirname,
                '../../content/',
                localItem.fullPath
            )
            console.log(localItem.fullPath)
            const postDirs = path.dirname(postPath)
            if (!fs.existsSync(postDirs)) {
                fs.mkdirSync(postDirs, { recursive: true })
            }
            const fileWriter = fs.createWriteStream(postPath)
            https.get(downloadUrl, (httpsResponse) => {
                httpsResponse.pipe(fileWriter)
            })
        }
    } catch (e) {
        console.log('Error during firabase sorage fetch:')
        console.log(e)
    }

    console.info('Fetching completed')
}

// This function is for nested folders (2 deep, no recursion yet)
exports.getFilesFromNestedDirs = async (remoteDir) => {
    const firebaseApp = initFirebase()
    const storage = getStorage(firebaseApp, process.env.CUSTOM_BUCKET)
    // Get directory <StorageReference> for remoteDir
    const aspectFolderListRef = ref(storage, remoteDir)

    console.info(`Fetching data files from firebase dir ${remoteDir}...`)

    try {
        // Get <ListObject> from directory <StorageReference>
        const aspectFolderListRefResponse = await list(aspectFolderListRef)
        // Get prefixes=directories from <ListObject>
        const childPromises = aspectFolderListRefResponse.prefixes.map(
            (folderRef) => list(folderRef)
        )
        const childAspectFolderListRefResponse = await Promise.all(
            childPromises
        )
        // For each <StorageReference> which is a folder get items which are also <StorageReference>
        for (const folderResult of childAspectFolderListRefResponse) {
            for (const localItem of folderResult.items) {
                // Get downloadUrl for all file <StorageReference>
                const downloadUrl = await getDownloadURL(localItem)

                const postPath = path.resolve(
                    __dirname,
                    '../../content/',
                    localItem.fullPath
                )
                console.log(localItem.fullPath)
                const postDirs = path.dirname(postPath)
                if (!fs.existsSync(postDirs)) {
                    fs.mkdirSync(postDirs, { recursive: true })
                }
                const fileWriter = fs.createWriteStream(postPath)
                https.get(downloadUrl, (httpsResponse) => {
                    httpsResponse.pipe(fileWriter)
                })
            }
        }
    } catch (e) {
        console.log('Error during firabase sorage fetch:')
        console.log(e)
    }

    console.info('Fetching completed')
}
