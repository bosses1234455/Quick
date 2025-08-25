'use client';

import { useState } from 'react';
import Image from 'next/image';
import { locationOptions, laptopBrandOptions, gpuOptions, processorOptions, storageOptions, ramOptions } from '../data/data';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
import Select from 'react-select';

export default function LaptopForm() {
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();
    const [error,setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        price: '',
        processor: '',
        ram: '',
        storage: '',
        gpu: '',
        location: '',
        description: '',
        new: false,
        images: null
    });

    const [imageFiles, setImageFiles] = useState([]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
        setImageFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'images') {
                    formDataToSend.append(key, value);
                }
            });
            if (formData.images) {
                for (let i = 0; i < formData.images.length; i++) {
                    formDataToSend.append('images', formData.images[i]);
                }
            }
            const cookie = Cookies.get('token');

            const seller_id = jwtDecode(cookie);

            formDataToSend.set('seller_id', seller_id.userId);

            const res = await fetch('/api/laptops', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await res.json();

        if(!res.ok) {
            setError(data.error[0] ||'check your inputs');
            setShowNotification(true);
            setTimeout(() => {
            setShowNotification(false);
            // router.push('/');
            }, 2000);
        }
        if(res.ok) {
            setError('');
            setShowNotification(true);
            setTimeout(() => {
            setShowNotification(false);
            router.push('/');
            }, 2000);
        }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    maxLength={100}
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter a title for your ad"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                                    Laptop Brand
                                </label>
                                <Select
                                    inputId="brand"
                                    name="brand"
                                    value={laptopBrandOptions.find(option => option.value === formData.brand) || null}
                                    onChange={selected =>
                                    handleInputChange({ target: { name: 'brand', value: selected?.value } })
                                    }
                                    options={laptopBrandOptions}
                                    placeholder="Select Brand"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="processor" className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                                <input
                                    id="processor"
                                    type="text"
                                    name="processor"
                                    value={formData.processor}
                                    onChange={handleInputChange}
                                    placeholder="Processor (e.g., Intel Core i7)"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div> */}

                            {/* <div>
                                <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                                <input
                                    id="storage"
                                    type="text"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleInputChange}
                                    placeholder="Storage (e.g., 512GB SSD)"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div> */}

                            {/* <div>
                                <label htmlFor="gpu" className="block text-sm font-medium text-gray-700 mb-1">GPU (Graphics Card)</label>
                                <input
                                    id="gpu"
                                    type="text"
                                    name="gpu"
                                    value={formData.gpu}
                                    onChange={handleInputChange}
                                    placeholder="GPU (e.g., NVIDIA RTX 3060)"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div> */}

                            <div>
                                <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">
                                storage
                                </label>
                                <Select
                                inputId="storage"
                                name="storage"
                                value={storageOptions.find(option => option.value === formData.storage) || null}
                                onChange={selected =>
                                    handleInputChange({ target: { name: 'storage', value: selected?.value } })
                                }
                                options={storageOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select Storage"
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                                required
                                />
                            </div>

                            <div>
                                <label htmlFor="gpu" className="block text-sm font-medium text-gray-700 mb-1">
                                GPU
                                </label>
                                <Select
                                inputId="gpu"
                                name="gpu"
                                value={gpuOptions.find(option => option.value === formData.gpu) || null}
                                onChange={selected =>
                                    handleInputChange({ target: { name: 'gpu', value: selected?.value } })
                                }
                                options={gpuOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select GPU"
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                                required
                                />
                            </div>

                            <div>
                                <label htmlFor="processor" className="block text-sm font-medium text-gray-700 mb-1">
                                Processor
                                </label>
                                <Select
                                inputId="processor"
                                name="prosessor"
                                value={processorOptions.find(option => option.value === formData.processor) || null}
                                onChange={selected =>
                                    handleInputChange({ target: { name: 'processor', value: selected?.value } })
                                }
                                options={processorOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select Processor"
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                                required
                                />
                            </div>

                            <div>
                                <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">
                                ram
                                </label>
                                <Select
                                inputId="ram"
                                name="ram"
                                value={ramOptions.find(option => option.value === formData.ram) || null}
                                onChange={selected =>
                                    handleInputChange({ target: { name: 'ram', value: selected?.value } })
                                }
                                options={ramOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select RAM"
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                                required
                                />
                            </div>


                            

{/* 
                            <div>
                                <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">RAM</label>
                                <input
                                    id="ram"
                                    type="text"
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleInputChange}
                                    placeholder="RAM (e.g., 16GB)"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div> */}
                            
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                                </label>
                                <Select
                                inputId="location"
                                name="location"
                                value={locationOptions.find(option => option.value === formData.location) || null}
                                onChange={selected =>
                                    handleInputChange({ target: { name: 'location', value: selected?.value } })
                                }
                                options={locationOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select Location"
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                                required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Laptop Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    maxLength={200}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter a detailed description of the laptop"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-25 resize-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Laptop Images (Max 8)</label>
                                <input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    max="8"
                                />
                                <div className="mt-2 grid grid-cols-5 gap-2">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative w-12 h-12 bg-gray-200">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    max={9999}
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price in USD"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                id="new"
                                type="checkbox"
                                name="new"
                                checked={formData.new}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="new" className="text-sm font-medium text-gray-700">New</label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <Notification showNotification={showNotification} postType={'Laptop'} error={error} />
            </div>
        </div>
    );
}