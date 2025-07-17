import Car from '@/models/Car'
import Apartment from '@/models/Apartment';
import Laptop from '@/models/Laptop';
import Book from '@/models/Book';
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
            .sort({ date: -1 }); // Newest first

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
                    date: car.date
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



export const getApartments = async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const limit = parseInt(searchParams.get('limit')) || 20;
      const page = parseInt(searchParams.get('page')) || 1;
      const skip = (page - 1) * limit;
  
      const apartments = await Apartment.find({})
        .limit(limit)
        .skip(skip)
        .sort({ date: -1 })
        .populate('seller_id', 'name email');
  
      return NextResponse.json({
        success: true,
        count: apartments.length,
        page,
        totalPages: Math.ceil(await Apartment.countDocuments({}) / limit),
        apartments: apartments.map(apt => ({
          id: apt._id,
          title: apt.title,
          price: apt.price,
          location: apt.location,
          rooms: apt.room_count,
          bathrooms: apt.bathroom_count,
          space: apt.space,
          images: apt.images,
          seller: apt.seller_id,
          date: apt.date,
          furnished: apt.furnished 
        }))
      });
  
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json(
        { error: 'Failed to fetch apartments', details: err.message },
        { status: 500 }
      );
    }
  };


  export const getLaptops = async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const limit = parseInt(searchParams.get('limit')) || 20;
      const page = parseInt(searchParams.get('page')) || 1;
      const skip = (page - 1) * limit;
  
      const laptops = await Laptop.find({})
        .limit(limit)
        .skip(skip)
        .sort({ date: -1 })
        .populate('seller_id', 'name email');
  
      const totalCount = await Laptop.countDocuments({});
  
      return NextResponse.json({
        success: true,
        count: laptops.length,
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
        laptops: laptops.map(laptop => ({
          id: laptop._id,
          brand: laptop.brand,
          price: laptop.price,
          processor: laptop.processor,
          ram: laptop.ram, 
          storage: laptop.storage,
          gpu: laptop.gpu,
          title: laptop.title,
          location: laptop.location,
          images: laptop.images,
          seller: laptop.seller_id,
          date: laptop.date
        }))
      });
  
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json(
        {
          success: false,
          error: 'Server error',
          details: process.env.NODE_ENV === 'development' ? err.message : null
        },
        { status: 500 }
      );
    }
  };

  export const getBooks = async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const limit = parseInt(searchParams.get('limit')) || 20;
      const page = parseInt(searchParams.get('page')) || 1;
      const skip = (page - 1) * limit;
  
      const books = await Book.find({})
        .limit(limit)
        .skip(skip)
        .sort({ date: -1 })
        .populate('seller_id', 'name email');
  
      const totalCount = await Book.countDocuments({});
  
      return NextResponse.json({
        success: true,
        count: books.length,
        totalCount, 
        page,
        totalPages: Math.ceil(totalCount / limit),
        books: books.map(book => ({
          id: book._id,
          title: book.title || book.book_title,
          name: book.name,
          type: book.type,
          price: book.price,
          location: book.location,
          state: book.state,
          images: book.images,
          seller: book.seller_id,
          date: book.date,
          description: book.description
        }))
      });
  
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json(
        {
          success: false,
          error: 'Server error',
          details: process.env.NODE_ENV === 'development' ? err.message : null
        },
        { status: 500 }
      );
    }
  };