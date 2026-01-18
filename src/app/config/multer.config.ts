import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../utils/cloudinary'


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => 'ashim/' + file.originalname
  }
})

const upload = multer({
  storage: storage, limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB limit
  }
})

export default upload