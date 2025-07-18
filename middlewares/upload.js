
import { error } from 'console';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';


export async function processUploads(formData) {
        
         const files = formData.getAll('images');
         if(files.length > 8) {
            return NextResponse.json({
                error: 'thats a lot of images'
            },{status: 401})
         } 
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
            }
            return imageUrls;
}

