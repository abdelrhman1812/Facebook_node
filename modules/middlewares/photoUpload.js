import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // بحدد مكان الملف اللي هيتخزن فيه الصور
        cb(null, path.join(__dirname, '../image'));
    },
    filename: (req, file, cb) => {
        // بحدد اسم الصوره  وعايزها بطريقه معينه
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
        } else {
            cb(null, false);
        }
    }
});




const photoUpload = multer({
    storage: photoStorage,
    fileFilter: (req, file, cb) => {
        // الصوره اللي هتيجي
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb({ message: 'Unsupported File Format' }, false);
        }
    },

});





export default photoUpload;

