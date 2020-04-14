var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
//Access Key ID: AKIAJYQCPYOIUFUYJKLQ
//Secret Access Key: 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

aws.config.update({
    secretAccessKey: 'KWEundrMFXeZP/RyhugLk8wdd5p8dTElWCpApPTp',
    accessKeyId: 'AKIAJYQCPYOIUFUYJKLQ',
    region: 'eu-central-1'
})

var s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG'), false);
    }
}
 
var upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'smarthomeproject',
        acl: 'public-read',
        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {

        cb(null, Date.now().toString())
        }
  })
})

module.exports = upload;