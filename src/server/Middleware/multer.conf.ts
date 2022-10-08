import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

class ConfigMulter {
  static UploadFiles(): MulterOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      // dest: './uploads',
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png, .jpg, .jpeg and .pdf format allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 3 * 1024 * 1024 },
    };
  }
}

export { ConfigMulter };
