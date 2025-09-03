import multer from "multer"
import { imageStorege } from "../config/multer.js"

export const imageUpload = multer({
    storage: imageStorege,
    fileFilter: (request, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/i)) {
            return cb(new Error('Por favor, envie apenas png, jpg, jpeg, webp.'))
        }
        cb(null, true)
    },
})
