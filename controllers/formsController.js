import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'

export const postCar = async (req) => {
    try {
        const data = await req.json()
        
        const requiredFields = ['seller_id', 'brand', 'model', 'year', 'milage', 'type', 'color', 'doors', 'seat_number', 'outer_condition', 'inner_condition', 'description', 'images', 'location', 'price', 'title'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        const car = await Car.create(data);
        return NextResponse.json(
            { success: true, message: 'Data saved successfully!', car },
            { status: 201 }
        )
    } catch (err) {
        console.error('Car creation error:', err);
        return NextResponse.json(
            { error: 'Failed to save data', details: err.message },
            { status: 500 }
        )
    }
}

export const postLaptop = async (req) => {
    try {
        const data = await req.json()
        
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
        const data = await req.json()
        console.log(data);
        
        const requiredFields = ['seller_id', 'title', 'description', 'price', 'location', 'images', 'room_count', 'bathroom_count', 'level', 'space', 'inner_condition', 'floor', 'furnished', 'sell'];
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
        const data = await req.json()
        
        const requiredFields = ['title', 'book_title', 'name', 'type', 'description', 'price', 'location', 'state'];
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
    
