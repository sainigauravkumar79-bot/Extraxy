const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf', 'image/tiff'];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
});

module.exports = upload;
