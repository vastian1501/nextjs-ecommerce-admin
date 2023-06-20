import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from 'fs'
import mime from 'mime-types'

export default async function handler(req, res) {
    const form = new multiparty.Form()
    const links = []

    const { files } = await new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) reject(error)
            resolve({ files })
        })
    })
    //console.log(files)
    const s3Client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_KEY,
            secretAccessKey: process.env.S3_SECRET
        }
    })

    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop()
        const newFilename = Date.now() + '.' + ext

        console.log('esperando uno')

        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),

        }))

        console.log('esperando dos')

        const link = `https://${process.env.S3_BUCKET}.s3.eu-north-1.amazonaws.com/${newFilename}`
        links.push(link)
    }

    res.status(200).json({links})

}


export const config = {
    api: { bodyParser: false }
}
