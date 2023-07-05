import multer from 'multer';
import imageHandler from '../4-utils/image-handler';

// storage is basically an options object for multer 
const storage = multer.diskStorage({
  // where to save
  destination: function (request, file, cb) {
    cb(null, imageHandler.imagesFolder);
  },
  // what to save
  filename: function (request, file, cb) {
    const generatedFilename = imageHandler.generateImageName(file.originalname);
    cb(null, generatedFilename);
    if (request.file) request.file.originalname = generatedFilename;
  },
});

const upload = multer({ storage });

export default upload;

// TODO: read more about multer library 