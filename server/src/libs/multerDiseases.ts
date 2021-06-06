import multer from 'multer';
import { v4 as uuidv4 }from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/diseases', //Donde se van a almacenar las imagenes
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname)); //Le da un nombre único a la imagen
  }

});

export default multer({storage});