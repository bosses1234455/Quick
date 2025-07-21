import Car from '@/models/Car'
import Apartment from '@/models/Apartment';
import Laptop from '@/models/Laptop';
import Book from '@/models/Book';
import { NextResponse } from 'next/server'

// Helper function to build filter query
const buildFilterQuery = (searchParams, modelType) => {
  const query = {};
  const seller_id = searchParams.get('id');
  if (seller_id) query.seller_id = seller_id;

  // Price filters
  const minPrice = parseFloat(searchParams.get('minPrice'));
  const maxPrice = parseFloat(searchParams.get('maxPrice'));
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    query.price = {};
    if (!isNaN(minPrice)) query.price.$gte = minPrice;
    if (!isNaN(maxPrice)) query.price.$lte = maxPrice;
  }

  // Model-specific filters
  switch(modelType) {
    case 'cars':
      const brand = searchParams.get('brand');
      if (brand && brand !== 'Other') query.brand = brand;
      
      const year = searchParams.get('year');
      if (year) {
        if (year === 'Older') {
          query.year = { $lt: 2020 };
        } else {
          query.year = parseInt(year);
        }
      }
      break;

    case 'apartments':
      const rooms = searchParams.get('rooms');
      if (rooms) {
        if (rooms === '4+') {
          query.room_count = { $gte: 4 };
        } else {
          query.room_count = parseInt(rooms);
        }
      }
      
      const furnished = searchParams.get('furnished');
      if (furnished === 'true') query.furnished = true;
      break;

    case 'laptops':
      const laptopBrand = searchParams.get('brand');
      if (laptopBrand && laptopBrand !== 'Other') query.brand = laptopBrand;
      
      const ram = searchParams.get('ram');
      if (ram) {
        if (ram === '32GB+') {
          query.ram = { $gte: 32 };
        } else {
          query.ram = parseInt(ram);
        }
      }
      break;

    case 'books':
      const type = searchParams.get('type');
      if (type && type !== 'Other') query.type = type;
      
      const condition = searchParams.get('condition');
      if (condition) query.state = condition;
      break;
  }

  return query;
};

// Helper function to get sort configuration
const getSortConfig = (sortOption) => {
  const [field, direction] = (sortOption || 'date_desc').split('_');
  const sortConfig = {};
  sortConfig[field] = direction === 'desc' ? -1 : 1;
  return sortConfig;
};

export const getCars = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 20;
        const page = parseInt(searchParams.get('page')) || 1;
        const skip = (page - 1) * limit;

        // Build filter query
        const query = buildFilterQuery(searchParams, 'cars');
        
        // Get sort configuration
        const sortConfig = getSortConfig(searchParams.get('sort'));

        // Fetch cars with filters and sorting
        const cars = await Car.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortConfig);

        // if (!cars || cars.length === 0) {
        //     return NextResponse.json(
        //         { error: 'No cars found' },
        //         { status: 404 }
        //     );
        // }

        const totalCount = await Car.countDocuments(query);
        return NextResponse.json({
            success: true,
            count: cars.length,
            page,
            totalPages: Math.ceil(totalCount / limit),
            cars: cars.map(car => ({
                id: car._id,
                seller_id: car.seller_id._id,
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
        });
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

        // Build filter query
        const query = buildFilterQuery(searchParams, 'apartments');
        
        // Get sort configuration
        const sortConfig = getSortConfig(searchParams.get('sort'));

        const apartments = await Apartment.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortConfig)
            .populate('seller_id', 'name email');

        const totalCount = await Apartment.countDocuments(query);
        return NextResponse.json({
            success: true,
            count: apartments.length,
            page,
            totalPages: Math.ceil(totalCount / limit),
            apartments: apartments.map(apt => ({
                id: apt._id,
                title: apt.title,
                price: apt.price,
                location: apt.location,
                rooms: apt.room_count,
                bathrooms: apt.bathroom_count,
                space: apt.space,
                images: apt.images,
                seller_id: apt.seller_id._id,
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

        // Build filter query
        const query = buildFilterQuery(searchParams, 'laptops');
        
        // Get sort configuration
        const sortConfig = getSortConfig(searchParams.get('sort'));

        const laptops = await Laptop.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortConfig)
            .populate('seller_id', 'name email');

        const totalCount = await Laptop.countDocuments(query);

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
                seller_id: laptop.seller_id._id,
                date: laptop.date
            }))
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({
            success: false,
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? err.message : null
        }, { status: 500 });
    }
};

export const getBooks = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 20;
        const page = parseInt(searchParams.get('page')) || 1;
        const skip = (page - 1) * limit;

        // Build filter query
        const query = buildFilterQuery(searchParams, 'books');
        
        // Get sort configuration
        const sortConfig = getSortConfig(searchParams.get('sort'));

        const books = await Book.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortConfig)
            .populate('seller_id', 'name email');

        const totalCount = await Book.countDocuments(query);

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
                seller_id: book.seller_id._id,
                date: book.date,
                description: book.description
            }))
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({
            success: false,
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? err.message : null
        }, { status: 500 });
    }
};