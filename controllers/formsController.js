import Book from '@/models/Book'
import Car from '@/models/Car'
import Laptop from '@/models/Laptop'
import Apartment from '@/models/Apartment';


export const postCar = 
    async (req,res)=>{
        const data = req.body
        
        const requiredFields = ['seller_id', 'brand', 'model', 'year', 'milage', 'type', 'color', 'doors', 'seat_number', 'outer_condition', 'inner_condition', 'description', 'images', 'location', 'price', 'title'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` }) 
        } try {
        await Car.create(data);
        return res.status(201).json({ success: true, message: 'Data saved successfully!' }) 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to save data', details: err.message }) 
      }
    }


export const postLaptop = 
    async (req,res)=>{
        const data = req.body
        
        const requiredFields = ['seller_id', 'brand', 'price', 'processor', 'ram', 'storage', 'gpu', 'title', 'location', 'description', 'images'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` }) 
        } try {
        await Laptop.create(data);
        return res.status(201).json({ success: true, message: 'Data saved successfully!' }) 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to save data', details: err.message }) 
      }
    }


export const postApartment = 
    async (req,res)=>{
        const data = req.body
        
        const requiredFields = ['seller_id', 'title', 'description', 'price', 'location', 'images', 'room_count', 'bathroom_count', 'level', 'space', 'inner_condition', 'floor', 'furnished', 'sell'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` }) 
        } try {
        await Apartment.create(data);
        return res.status(201).json({ success: true, message: 'Data saved successfully!' }) 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to save data', details: err.message }) 
      }
    }


export const postBook = async (req, res)=>{
    const data = req.body;
    
    const requiredFields = ['title', 'book_title', 'name', 'type', 'description', 'price', 'location', 'state'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` }) 
  }
  try {
        await Book.create(data);
        return res.status(201).json({ success: true, message: 'Data saved successfully!' }) 
    } catch (err) {
        return res.status(500).json({ error: 'Failed to save data', details: err.message }) 
      }
    }
    
