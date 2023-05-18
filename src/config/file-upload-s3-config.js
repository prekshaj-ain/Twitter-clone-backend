const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { SECRET_ACCESS_KEY, AWS_REGION, ACCESS_KEY_ID, BUCKET_NAME } = require('./serverConfig');


aws.config.update({
    region: AWS_REGION,
    secretAccessKey: SECRET_ACCESS_KEY,
    accessKeyId: ACCESS_KEY_ID
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req,file,cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;