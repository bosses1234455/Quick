import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'


export const deleteCar = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const carId = searchParams.get('id');
        const userId = searchParams.get('userId'); // Or get from auth token

        if (!carId || !userId) {
            return NextResponse.json(
                { error: 'Car ID and User ID are required' },
                { status: 400 }
            );
        }

        const car = await Car.findById(carId);
        
        if (!car) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        if (car.seller_id.toString() !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized - You are not the owner of this car' },
                { status: 403 }
            );
        }

        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return NextResponse.json(
                { error: 'Car could not be deleted' },
                { status: 500 }
            );
        }

        // Return success response with deleted car details
        return NextResponse.json(
            { 
                success: true, 
                message: 'Car deleted successfully',
                car: {
                    id: deletedCar._id,
                    seller_id: deletedCar.seller_id,
                    deletedAt: new Date()
                }
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error deleting car:', err);
        return NextResponse.json(
            { error: 'Failed to delete car', details: err.message },
            { status: 500 }
        );
    }
};


export const deleteApartment = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const apartmentId = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (!apartmentId || !userId) {
            return NextResponse.json(
                { error: 'Car ID and User ID are required' },
                { status: 400 }
            );
        }

        const apartment = await Apartment.findById(apartmentId);
        
        if (!apartment) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        if (apartment.seller_id.toString() !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized - You are not the owner of this car' },
                { status: 403 }
            );
        }

        const deleteApartment = await Apartment.findByIdAndDelete(apartmentId);

        if (!deleteApartment) {
            return NextResponse.json(
                { error: 'Car could not be deleted' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Apartment deleted successfully',
                car: {
                    id: deleteApartment._id,
                    seller_id: deleteApartment.seller_id,
                    deletedAt: new Date()
                }
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error deleting apartment:', err);
        return NextResponse.json(
            { error: 'Failed to delete apartment', details: err.message },
            { status: 500 }
        );
    }
};

export const deleteLaptop = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const laptopId = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (!laptopId || !userId) {
            return NextResponse.json(
                { error: 'laptop ID and User ID are required' },
                { status: 400 }
            );
        }

        const laptop = await Laptop.findById(laptopId);
        
        if (!laptop) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        if (laptop.seller_id.toString() !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized - You are not the owner of this laptop' },
                { status: 403 }
            );
        }

        const deleteLaptop = await Laptop.findByIdAndDelete(laptopId);

        if (!deleteLaptop) {
            return NextResponse.json(
                { error: 'Laptop could not be deleted' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Laptop deleted successfully',
                car: {
                    id: deleteLaptop._id,
                    seller_id: deleteLaptop.seller_id,
                    deletedAt: new Date()
                }
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error deleting laptop:', err);
        return NextResponse.json(
            { error: 'Failed to delete laptop', details: err.message },
            { status: 500 }
        );
    }
};

export const deleteBook = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (!bookId || !userId) {
            return NextResponse.json(
                { error: 'book ID and User ID are required' },
                { status: 400 }
            );
        }

        const book = await Book.findById(bookId);
        
        if (!book) {
            return NextResponse.json(
                { error: 'Book not found' },
                { status: 404 }
            );
        }

        if (book.seller_id.toString() !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized - You are not the owner of this book' },
                { status: 403 }
            );
        }

        const deleteBook = await Laptop.findByIdAndDelete(bookId);

        if (!deleteBook) {
            return NextResponse.json(
                { error: 'book could not be deleted' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'book deleted successfully',
                car: {
                    id: deleteBook._id,
                    seller_id: deleteBook.seller_id,
                    deletedAt: new Date()
                }
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Error deleting book:', err);
        return NextResponse.json(
            { error: 'Failed to delete book', details: err.message },
            { status: 500 }
        );
    }
};
