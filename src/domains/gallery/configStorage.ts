import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const storage = (configService: ConfigService) => {
    return diskStorage({
        destination: `./${configService.get<string>('UPLOAD_PATH')}`,
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`) 
        }
    });
}