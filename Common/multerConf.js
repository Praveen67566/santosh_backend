import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the folder path
const uploadFolder = path.join(__dirname, 'uploads');

// Check if the folder exists, if not, create it
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
  console.log('Uploads folder created successfully!');
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp
  },
});

// Multer upload configuration
export const upload = multer({ storage: storage });
