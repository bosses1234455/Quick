import Car from '@/models/Car'
import Apartment from '@/models/Apartment';
import Laptop from '@/models/Laptop';
import Book from '@/models/Book';
import { NextResponse } from 'next/server'

const buildFilterQuery = (searchParams, modelType) => {
  const query = {};
  const seller_id = searchParams.get('id');
  if (seller_id) query.seller_id = seller_id;

  const minPrice = parseFloat(searchParams.get('minPrice'));
  const maxPrice = parseFloat(searchParams.get('maxPrice'));
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    query.price = {};
    if (!isNaN(minPrice)) query.price.$gte = minPrice;
    if (!isNaN(maxPrice)) query.price.$lte = maxPrice;
  }

  const location = searchParams.get('location'); 

  switch(modelType) {
    case 'cars':
      const brand = searchParams.get('brand');
      if (brand) {
        query.brand = { $regex: `^${brand}$`, $options: 'i' };
      }

      const minYear = searchParams.get('minYear')
      const maxYear = searchParams.get('maxYear')
      if(minYear){
        query.year = {$gte: minYear}
      }
      if(maxYear){
        query.year = {$lte: maxYear}
      }

      const model = searchParams.get('model')

      if (model) {
        let decodedModel = decodeURIComponent(model).replace(/\+/g, " ").trim();

        const flexibleModel = decodedModel.replace(/\s+/g, "[- ]");
        query.model = { $regex: new RegExp(`^${flexibleModel}$`, "i") };
      }
      
      


      const minMilage = searchParams.get('minMileage')
      const maxMilage = searchParams.get('maxMileage')
      if(minMilage){
        query.milage = {$gte: minMilage}
      }
      if(maxMilage){
        query.milage = {$lte: maxMilage}
      }

      if (location) {
        query.location = { $regex: `^${location}`, $options: 'i' };
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
      const minSpace = searchParams.get('minSpace')
      const maxSpace = searchParams.get('maxSpace')
      if(minSpace){
        query.space = {$gte: minSpace}
      }
      if(maxSpace){
        query.space = {$lte: maxSpace}
      }

      const condition = searchParams.get('condetion')
      if(condition) query.inner_condition = condition
      

      const furnished = searchParams.get('furnished');
      const sell = searchParams.get('sell');
      if (furnished == true) query.furnished = true

      if (sell == true){
        query.sell = true
      }else{
        query.sell= false
      }
      if (location) query.location = location;
      break;


    case 'laptops':
      const laptopBrand = searchParams.get('brand');
      if (laptopBrand) query.brand = laptopBrand;
      
      const ram = searchParams.get('ram');
      if (ram) query.ram = ram

      if (location) {
        query.location = { $regex: `^${location}`, $options: 'i' };
      }
      const isNew = searchParams.get('new');
      if (isNew == true) {
        query.new = true; 
      }
      break;

    case 'books':
      const type = searchParams.get('type');
      if (type) query.type = type;
      

      if (location) {
        query.location = { $regex: `^${location}`, $options: 'i' };
      }
      break;
  }

  return query;
};


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

        const query = buildFilterQuery(searchParams, 'cars');
        
        const sortConfig = getSortConfig(searchParams.get('sort'));


        const cars = await Car.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortConfig);


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

        const query = buildFilterQuery(searchParams, 'apartments');
        
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
                furnished: apt.furnished,
                sell:apt.sell,
                inner_condition: apt.inner_condition
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

        const query = buildFilterQuery(searchParams, 'laptops');

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
                new:laptop.new,
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

        const query = buildFilterQuery(searchParams, 'books');

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