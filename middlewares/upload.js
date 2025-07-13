
import { writeFile } from 'fs/promises';
import path from 'path';


export async function processUploads(files) {
  const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
  const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  return Promise.all(
    files.map(async (file) => {
      // Validate
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`Invalid type for ${file.name}`);
      }
      if (file.size > MAX_SIZE) {
        throw new Error(`File too large: ${file.name}`);
      }

      // Process
      const bytes = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
      const filepath = path.join(UPLOAD_DIR, filename);
      
      await writeFile(filepath, Buffer.from(bytes));
      return `/uploads/${filename}`;
    })
  );
}

