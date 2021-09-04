require('dotenv').config()
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3')
const bucketName = process.env.AWS_BUCKET_NAME = "autolight-bucket";
const region = process.env.AWS_BUCKET_REGION = "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY = "AKIA4CNNTWIMY2FQWQ4K"
const secretAccessKey = process.env.AWS_SECRET_KEY = "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"

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey

})

// upload file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: "displayImages/" + file.filename + ".jpg"
    }
    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile

function uploadFileFromPath(path, key) {
    const fileStream = fs.createReadStream(path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: "displayImages/" + key + ".jpg"
    }
    return s3.upload(uploadParams).promise()
}

exports.uploadFileFromPath = uploadFileFromPath


function deleteFile(fileKey) {
    const deleteParams = {
        Key: "displayImages/" + fileKey + ".jpg",
        Bucket: bucketName
    }
    return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile
