const upload = require("../config/file-upload-s3-config");
const singleUpload = upload.single("image");
const imageUpload = (req, res) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: error,
        data: {},
        message: "",
      });
    }
    return res.status(201).json({
      success: true,
      error: {},
      data: { url: req.file.location },
      message: "Image Successfully uploaded",
    });
  });
};

module.exports = {
  imageUpload,
};
