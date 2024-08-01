import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    businessType: '',
    description: '',
    images: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    setFormData(prevState => ({
      ...prevState,
      images: [...e.target.files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    // For this example, we'll just log it to the console
    console.log(formData);
    alert('Form submitted successfully!');
    navigate('/catalog');
  };

  return (
    <div className="form-container">
      <h2>Add Your Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businessName">Business Name:</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businessType">Business Type:</label>
          <input
            type="text"
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;