import Car from '@/models/Car'
import { NextResponse } from 'next/server'


export const getCars = async (req) => {
    try {
        // Optional: Parse query parameters if you want pagination/filtering
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 20;
        const page = parseInt(searchParams.get('page')) || 1;
        const skip = (page - 1) * limit;

        // Fetch cars with optional sorting
        const cars = await Car.find({})
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 }); // Newest first

        if (!cars || cars.length === 0) {
            return NextResponse.json(
                { error: 'No cars found' },
                { status: 404 }
            );
        }

        // Return the cars with selected attributes
        return NextResponse.json(
            { 
                success: true, 
                count: cars.length,
                page,
                totalPages: Math.ceil(await Car.countDocuments() / limit),
                cars: cars.map(car => ({
                    id: car._id,
                    seller_id: car.seller_id,
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    milage: car.milage,
                    type: car.type,
                    color: car.color,
                    doors: car.doors,
                    seat_number: car.seat_number,
                    outer_condition: car.outer_condition,
                    inner_condition: car.inner_condition,
                    description: car.description,
                    images: car.images,
                    location: car.location,
                    price: car.price,
                    title: car.title,
                    createdAt: car.createdAt
                }))
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error fetching cars:', err);
        return NextResponse.json(
            { error: 'Failed to fetch cars', details: err.message },
            { status: 500 }
        );
    }
};