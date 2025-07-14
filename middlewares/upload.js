
import { writeFile } from 'fs/promises';
import path from 'path';


export async function processUploads(formData) {
        
         const files = formData.getAll('images');
         
         const uploadDir = path.join(process.cwd(), 'public/uploads');
         const imageUrls = [];
 
         for (const file of files) {
             const bytes = await file.arrayBuffer();
             const buffer = Buffer.from(bytes);
             
             // Create a unique filename
             const filename = `${Date.now()}-${file.name}`;
             const filepath = path.join(uploadDir, filename);
             
             // Save the file
             await writeFile(filepath, buffer);
             imageUrls.push(`/uploads/${filename}`);
             return imageUrls;
         }
}

