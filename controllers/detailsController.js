import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'

export const getCarDetails = async (req, { params }) => {
  try {
    const {id:carId} = await params;
    
    if (!carId) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );}

    const car = await Car.findById(carId)
      .populate('seller_id', 'name email')
      .lean();

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Transform data for client
    const response = {
      id: car._id,
      title: car.title,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.milage,
      images: car.images,
      location: car.location,
      type: car.type,
      color: car.color,
      doors: car.doors,
      seat_number: car.seat_number,
      inner_condition: car.inner_condition,
      outer_condition: car.outer_condition,
      description: car.description,
      seller: car.seller_id,
      date: car.date
    };

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );

  } catch (error) {
    console.error('[GET_CAR_DETAILS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};



export const getAparmentDetails = async (req, { params }) => {
  try {
    const {id:apartmentId} = await params;
    
    if (!apartmentId) {
      return NextResponse.json(
        { error: 'apartment ID is required' },
        { status: 400 }
      );}

    const apartment = await Apartment.findById(apartmentId)
      .populate('seller_id', 'name email')
      .lean();

    if (!apartment) {
      return NextResponse.json(
        { error: 'apartment not found' },
        { status: 404 }
      );
    }

    const response = {
      id: apartment._id,
      title: apartment.title,
      description: apartment.description,
      price: apartment.price,
      location: apartment.location,
      images: apartment.images,
      seller: apartment.seller_id,
      date: apartment.date,
      roomCount: apartment.room_count,
      bathroomCount: apartment.bathroom_count,
      space: apartment.space,
      innerCondition: apartment.inner_condition,
      floor: apartment.floor,
      furnished: apartment.furnished,
      forSale: apartment.sell,
    };

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );

  } catch (error) {
    console.error('[GET_APARTMNET_DETAILS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};


export const getLaptopDetails = async (req, { params }) => {
  try {
    const {id:LaptopId} = await params;
    
    if (!LaptopId) {
      return NextResponse.json(
        { error: 'laptop ID is required' },
        { status: 400 }
      );}

    const laptop = await Laptop.findById(LaptopId)
      .populate('seller_id', 'name email')
      .lean();

    if (!laptop) {
      return NextResponse.json(
        { error: 'laptop not found' },
        { status: 404 }
      );
    }

    const response = {
      id: laptop._id,
      title: laptop.title,
      brand: laptop.brand,
      price: laptop.price,
      location: laptop.location,
      description: laptop.description,
      images: laptop.images,
      seller: laptop.seller_id,
      date: laptop.date,
      processor: laptop.processor,
      ram: laptop.ram,
      storage: laptop.storage,
      gpu: laptop.gpu || 'Integrated'
    };

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );

  } catch (error) {
    console.error('[GET_LAPTOP_DETAILS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};


export const getBookDetails = async (req, { params }) => {
  try {
    const {id:BookId} = await params;
    console.log(BookId);
    
    if (!BookId) {
      return NextResponse.json(
        { error: 'book ID is required' },
        { status: 400 }
      );}

    const book = await Book.findById(BookId)
      .populate('seller_id', 'name email')
      .lean();

    if (!book) {
      return NextResponse.json(
        { error: 'book not found' },
        { status: 404 }
      );

    }
    const response = {
      id: book._id,
      title: book.title,          
      bookTitle: book.book_title,
      name: book.name,
      type: book.type,
      price: book.price,
      location: book.location,
      description: book.description,
      images: book.images,
      state: book.state,
      seller: book.seller_id,
      date: book.date
    };

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );

  } catch (error) {
    console.error('[GET_BOOK_DETAILS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}