const fs = require('fs');
const path = require('path');

const downloadsFolder = 'C:\\Users\\chris\\Downloads';
const oneDriveFolder = 'C:\\Users\\chris\\OneDrive\\DENTURE_SPECIALIST_SCAN_DATA';

if (!fs.existsSync(oneDriveFolder)) {
  fs.mkdirSync(oneDriveFolder, { recursive: true });
}

fs.watch(downloadsFolder, (eventType, filename) => {
  if (eventType === 'rename' && filename) {
    const filePath = path.join(downloadsFolder, filename);
    if (fs.existsSync(filePath) && /\.(json|pdf|csv)$/i.test(filename)) {
      const destPath = path.join(oneDriveFolder, filename);
      fs.rename(filePath, destPath, err => {
        if (err) {
          console.error(`Error moving ${filename}:`, err);
        } else {
          console.log(`Moved ${filename} to ${oneDriveFolder}`);
        }
      });
    }
  }
});

console.log(`Watching ${downloadsFolder} for JSON, PDF, CSV files...`);
