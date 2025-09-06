
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function processUploads(formData,pg) {
    const files = formData.getAll('images');

    const length = pg == 'user' ? 1 : 8;

    if(files.length > length) {
        return NextResponse.json({
            error: 'thats a lot of images'
        }, {status: 401});
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Only image files (JPEG, PNG, GIF, WEBP) are allowed'
            }, {status: 400});
        }
    }
    
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const imageUrls = [];

    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        

        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);
        

        await writeFile(filepath, buffer);
        imageUrls.push(`/uploads/${filename}`);
    }

    return imageUrls;
}

