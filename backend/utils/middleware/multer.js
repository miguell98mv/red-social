var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
const { nanoid } = require("nanoid");

// const storage = multer.diskStorage({
//   destination: "assets",
//   filename: (req, file, cb) => {
//     let ext = file.mimetype.split("/")[1];
//     cb(null, nanoid() + "." + ext);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     let ext = file.mimetype.split("/")[1];
//     let filter = /jpg|jpeg|png/;
//     let conciden = filter.test(ext);

//     if (conciden) {
//       cb(null, true);
//     } else {
//       cb("Archivo no permitido", false);
//     }
//   },
// }).single("imagen");

var s3 = new aws.S3({
  accessKeyId: "AKIAU764PAPV3ICRZH3X",
  secretAccessKey: "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",
});

var upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    let ext = file.mimetype.split("/")[1];
    let filter = /jpg|jpeg|png/;
    let conciden = filter.test(ext);

    if (conciden) {
      cb(null, true);
    } else {
      cb("Archivo no permitido", false);
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: "bucket-80hwyd",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, nanoid() + "." + ext);
    },
  }),
}).single("imagen");

module.exports = upload;
