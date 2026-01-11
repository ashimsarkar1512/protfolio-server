
import { v2 as cloudinary } from 'cloudinary'
import { server_config } from '../config/server.config'




cloudinary.config({
  cloud_name: server_config.cloudinary_cloud_name,
  api_key: server_config.cloudinary_api_key,
  api_secret: server_config.cloudinary_api_secret
})

export default cloudinary