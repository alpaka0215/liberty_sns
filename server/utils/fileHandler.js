const fs = require('fs');
const path = require('path');

const uploadDir = process.env.UPLOAD_PATH || './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const saveFile = (file, folder = 'general') => {
  try {
    const folderPath = path.join(uploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
    const filepath = path.join(folderPath, filename);
    
    fs.writeFileSync(filepath, file.buffer);
    return `/uploads/${folder}/${filename}`;
  } catch (err) {
    throw new Error('파일 저장 실패: ' + err.message);
  }
};

const deleteFile = (filepath) => {
  try {
    const fullPath = path.join('.', filepath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error('파일 삭제 실패:', err);
  }
};

module.exports = {
  saveFile,
  deleteFile
};
