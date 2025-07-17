import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'
import { processUploads } from '@/middlewares/upload'

export const postCar = async (req) => {
    try {
        // const formData = await req.formData();
        // const files = formData.getAll('images');
        
        // const uploadDir = path.join(process.cwd(), 'public/uploads');
        // const imageUrls = [];

        // for (const file of files) {
        //     const bytes = await file.arrayBuffer();
        //     const buffer = Buffer.from(bytes);
            
        //     // Create a unique filename
        //     const filename = `${Date.now()}-${file.name}`;
        //     const filepath = path.join(uploadDir, filename);
            
        //     // Save the file
        //     await writeFile(filepath, buffer);
        //     imageUrls.push(`/uploads/${filename}`);
        // }

        // Get other form data
        const formData = await req.formData()
        const imageUrls = await processUploads(formData);
        const data = {
            seller_id: formData.get('seller_id'),
            brand: formData.get('brand'),
            model: formData.get('model'),
            year: formData.get('year'),
            milage: formData.get('milage'),
            type: formData.get('type'),
            color: formData.get('color'),
            doors: formData.get('doors'),
            seat_number: formData.get('seat_number'),
            outer_condition: formData.get('outer_condition'),
            inner_condition: formData.get('inner_condition'),
            description: formData.get('description'),
            location: formData.get('location'),
            price: formData.get('price'),
            title: formData.get('title'),
            images: imageUrls
        };

        // Validate required fields
        const requiredFields = ['seller_id', 'brand', 'model', 'year', 'milage', 'type', 'color', 'doors', 'seat_number', 'outer_condition', 'inner_condition', 'description', 'images', 'location', 'price', 'title'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        const car = await Car.create(data);
        return NextResponse.json(
            { success: true, message: 'Data saved successfully!', car },
            { status: 201 }
        );
    } catch (err) {
        console.error('Car creation error:', err);
        return NextResponse.json(
            { error: 'Failed to save data', details: err.message },
            { status: 500 }
        );
    }
};

export const postLaptop = async (req) => {
    try {
        const formData = await req.formData();
        const imageUrls = await processUploads(formData);

        const data = {
            seller_id: formData.get('seller_id'),
            brand: formData.get('brand'),
            price: formData.get('price'),
            processor: formData.get('processor'),
            ram: formData.get('ram'),
            storage: formData.get('storage'),
            gpu: formData.get('gpu'),
            title: formData.get('title'),
            location: formData.get('location'),
            description: formData.get('description'),
            images: imageUrls
        }
        
        const requiredFields = ['seller_id', 'brand', 'price', 'processor', 'ram', 'storage', 'gpu', 'title', 'location', 'description', 'images'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        const laptop = await Laptop.create(data);
        return NextResponse.json(
            { success: true, message: 'Data saved successfully!', laptop },
            { status: 201 }
        )
    } catch (err) {
        console.error('Laptop creation error:', err);
        return NextResponse.json(
            { error: 'Failed to save data', details: err.message },
            { status: 500 }
        )
    }
}

export const postApartment = async (req) => {
    try {
        const formData = await req.formData();

        const imageUrls = await processUploads(formData);

        const data = {
            seller_id: formData.get('seller_id'),
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            location: formData.get('location'),
            images: imageUrls,
            room_count: formData.get('room_count'),
            bathroom_count: formData.get('bathroom_count'),
            space: formData.get('space'),
            inner_condition: formData.get('inner_condition'),
            floor: formData.get('floor'),
            furnished: formData.get('furnished'),
            sell: formData.get('sell')
        }
        
        const requiredFields = ['seller_id', 'title', 'description', 'price', 'location', 'images', 'room_count', 'bathroom_count', 'space', 'inner_condition', 'floor', 'furnished', 'sell'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        const apartment = await Apartment.create(data);
        return NextResponse.json(
            { success: true, message: 'Data saved successfully!', apartment },
            { status: 201 }
        )
    } catch (err) {
        console.error('Apartment creation error:', err);
        return NextResponse.json(
            { error: 'Failed to save data', details: err.message },
            { status: 500 }
        )
    }
}

export const postBook = async (req) => {
    try {
        const formData = await req.formData();
        const imageUrls = await processUploads(formData);

        const data = {
            seller_id: formData.get('seller_id'),
            title: formData.get('title'),
            book_title: formData.get('book_title'),
            name: formData.get('name'),
            type: formData.get('type'),
            description: formData.get('description'),
            price: formData.get('price'),
            location: formData.get('location'),
            state: formData.get('state'),
            images: imageUrls
        }

        const requiredFields = ['seller_id','title', 'book_title', 'name', 'type', 'description', 'price', 'location', 'state'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        const book = await Book.create(data);
        return NextResponse.json(
            { success: true, message: 'Data saved successfully!', book },
            { status: 201 }
        )
    } catch (err) {
        console.error('Book creation error:', err);
        return NextResponse.json(
            { error: 'Failed to save data', details: err.message },
            { status: 500 }
        )
    }
}
    
