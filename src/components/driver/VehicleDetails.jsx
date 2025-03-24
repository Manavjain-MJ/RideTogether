import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import "../../assets/vehicledetails.css"
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import axios from 'axios';

export const VehicleDetails = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [imagePreview, setImagePreview] = useState([]);





    const onSubmit = async (data) => {
        console.log("Vehicle Data:", data);
        const formData = new FormData();
        formData.append("vehicleBrand", data.vehicleBrand);
        formData.append("vehicleModel", data.vehicleModel);
        formData.append("vehicleYear", data.year);
        formData.append("vehicleLicensePlate", data.licensePlate);
        formData.append("vehicleColor", data.vehicleColor);
        formData.append("vehicleType", data.vehicleType);
        formData.append("fuelType", data.fuelType);
        formData.append("luggageCapacity", data.luggageCapacity);
        formData.append("airConditioning", data.airConditioning ? "true" : "false");
        formData.append("music", data.music ? "true" : "false");
        if (data.vehicleImages) {
            for (let i = 0; i < data.vehicleImages.length; i++) {
                formData.append("vehicleImages", data.vehicleImages[i]);
            }
        }
        try {
            const res = await axios.post("/vehicle/addfile", formData)
            if (res.status === 201) {
                alert("Your Vehicle Details Are Added Successfully")

            } else {
                alert("Your Vehicle Details Are Not Added")
            }
        } catch (error) {
            console.log("error", error)
        }
        setImagePreview([]);
    };








    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length > 5) {
            alert("You can only upload up to 5 images.");
            return;
        }
        const validFiles = files.filter((file) => file.type.startsWith("image/"));
        const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
        setImagePreview(imageUrls);
        setValue("vehicleImages", validFiles);
    };
    return (
        <>
            <Navbar />
            <div className="vehicle-form-container">
                <h2>Vehicle Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="vehicle-form">
                    {/* Vehicle Information */}
                    <label>Car Make & Model:</label>
                    <input
                        type="text"
                        {...register("carModel", { required: "Car model is required" })}
                        placeholder="e.g., Toyota Corolla"
                    />
                    {errors.carModel && <p className="error">{errors.carModel.message}</p>}

                    <label>Year of Manufacture:</label>
                    <input
                        type="number"
                        {...register("year", {
                            required: "Year is required",
                            min: { value: 1990, message: "Year must be 1990 or later" },
                        })}
                        placeholder="e.g., 2020"
                    />
                    {errors.year && <p className="error">{errors.year.message}</p>}

                    <label>License Plate Number:</label>
                    <input
                        type="text"
                        {...register("licensePlate", { required: "License plate number is required" })}
                        placeholder="e.g., ABC-1234"
                    />
                    {errors.licensePlate && <p className="error">{errors.licensePlate.message}</p>}

                    <label>Vehicle Color:</label>
                    <input
                        type="text"
                        {...register("vehicleColor", { required: "Vehicle color is required" })}
                        placeholder="e.g., Black"
                    />
                    {errors.vehicleColor && <p className="error">{errors.vehicleColor.message}</p>}

                    <label>Vehicle Type:</label>
                    <select {...register("vehicleType", { required: "Vehicle type is required" })}>
                        <option value="">Vehicle Type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="electric">Electric</option>
                    </select>

                    <label>Fuel Type:</label>
                    <select {...register("fuelType", { required: "Fuel type is required" })}>
                        <option value="">Fuel Type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>

                    {/* Additional Features */}
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" {...register("airConditioning")} />
                            ❄️ Air Conditioning
                        </label>

                        <label>
                            <input type="checkbox" {...register("music")} />
                            🎵 Music System
                        </label>
                    </div>

                    <label>Luggage Capacity:</label>
                    <select {...register("luggageCapacity")}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>

                    {/* Vehicle Image Upload */}
                    <label>Upload Vehicle Images (Max 5):</label>
                    <div className="custom-file-upload">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span>Choose Images</span>
                    </div>
                    {errors.vehicleImages && <p className="error">{errors.vehicleImages.message}</p>}

                    {/* Image Preview Section */}
                    {imagePreview.length > 0 && (
                        <div className="image-preview-container">
                            {imagePreview.map((img, index) => (
                                <img key={index} src={img} alt={`Preview ${index + 1}`} className="image-preview" />
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit">Save Vehicle</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
