import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment'
import { NextResponse } from 'next/server'
import { processUploads } from '@/middlewares/upload'

import Car from '@/models/Car';
import { NextResponse } from 'next/server';

export const getCarDetails = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get('id'); // or use params.id if using [id] dynamic route

    if (!carId) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );
    }

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
      mileage: car.mileage,
      images: car.images,
      location: car.location,
      description: car.description,
      seller: car.seller_id,
      createdAt: car.createdAt
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