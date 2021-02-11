import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const storage = (configService: ConfigService) => {
    return diskStorage({
        destination: `./${configService.get<string>('UPLOAD_PATH')}`,
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            const fileFullName = `${filename}${extension}`;
            file['virtualPath'] = `${process.env.IMAGES_PATH}/${fileFullName}`;

            cb(null, fileFullName);
        }
    });
}