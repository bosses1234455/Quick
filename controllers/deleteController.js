import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose';


export const deleteCar = async (carId, user) => {
    try {
      // 1 — validate ID
      if (!mongoose.Types.ObjectId.isValid(carId)) {
        return NextResponse.json(
          { error: 'Invalid car ID format' },
          { status: 400 }
        );
      }
  
      // 2 — find car
      const car = await Car.findById(carId);
      if (!car) {
        return NextResponse.json(
          { error: 'Car not found' },
          { status: 404 }
        );
      }
  
      console.log('Found car:', car);

      console.log("Authenticated user ID:", user?._id?.toString());
      console.log("Car seller ID:", car.seller_id?.toString());

  
      // 3 — ownership check
      if (!user?._id || car.seller_id?.toString() !== user._id.toString()) {
        return NextResponse.json(
          { error: 'Unauthorized - You are not the owner of this car' },
          { status: 403 }
        );
      }
  
      // 4 — delete
      await Car.findByIdAndDelete(carId);
  
      return NextResponse.json(
        {
          success: true,
          message: 'Car deleted successfully',
          car: {
            id: car._id,
            seller_id: car.seller_id,
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
  


export const deleteApartment = async (apartmentId, user) => {
    try {
        // 1 — validate ID
        if (!mongoose.Types.ObjectId.isValid(apartmentId)) {
          return NextResponse.json(
            { error: 'Invalid apartment ID format' },
            { status: 400 }
          );
        }

        const apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
          return NextResponse.json(
            { error: 'apartment not found' },
            { status: 404 }
          );
        }
    
        console.log('Found apartment:', apartment);
  
        console.log("Authenticated user ID:", user?._id?.toString());
        console.log("apartment seller ID:", apartment.seller_id?.toString());
  
    
        // 3 — ownership check
        if (!user?._id || apartment.seller_id?.toString() !== user._id.toString()) {
          return NextResponse.json(
            { error: 'Unauthorized - You are not the owner of this apartment' },
            { status: 403 }
          );
        }
    
        // 4 — delete
        await Apartment.findByIdAndDelete(apartmentId);
    
        return NextResponse.json(
          {
            success: true,
            message: 'apartment deleted successfully',
            apartment: {
              id: apartment._id,
              seller_id: apartment.seller_id,
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

export const deleteLaptop = async (laptopId, user) => {
    try {
        // 1 — validate ID
        if (!mongoose.Types.ObjectId.isValid(laptopId)) {
          return NextResponse.json(
            { error: 'Invalid laptop ID format' },
            { status: 400 }
          );
        }

        const laptop = await Laptop.findById(laptopId);
        if (!laptop) {
          return NextResponse.json(
            { error: 'laptop not found' },
            { status: 404 }
          );
        }
    
        console.log('Found laptop:', laptop);
        console.log("Authenticated user ID:", user?._id?.toString());
        console.log("laptop seller ID:", laptop.seller_id?.toString());
  
    
        // 3 — ownership check
        if (!user?._id || laptop.seller_id?.toString() !== user._id.toString()) {
          return NextResponse.json(
            { error: 'Unauthorized - You are not the owner of this laptop' },
            { status: 403 }
          );
        }
    
        // 4 — delete
        await Laptop.findByIdAndDelete(laptopId);
    
        return NextResponse.json(
          {
            success: true,
            message: 'laptop deleted successfully',
            laptop: {
              id: laptop._id,
              seller_id: laptop.seller_id,
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

export const deleteBook = async (bookId, user) => {
    try {
        // 1 — validate ID
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
          return NextResponse.json(
            { error: 'Invalid bookId ID format' },
            { status: 400 }
          );
        }

        const book = await Book.findById(bookId);
        if (!book) {
          return NextResponse.json(
            { error: 'bookId not found' },
            { status: 404 }
          );
        }
    
        // console.log('Found book:', book);
        // console.log("Authenticated user ID:", user?._id?.toString());
        // console.log("book seller ID:", book.seller_id?.toString());
  
    
        // 3 — ownership check
        if (!user?._id || book.seller_id?.toString() !== user._id.toString()) {
          return NextResponse.json(
            { error: 'Unauthorized - You are not the owner of this book' },
            { status: 403 }
          );
        }
    
        // 4 — delete
        await Book.findByIdAndDelete(bookId);
    
        return NextResponse.json(
          {
            success: true,
            message: 'book deleted successfully',
            book: {
              id: book._id,
              seller_id: book.seller_id,
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
