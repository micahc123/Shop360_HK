import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    businessType: '',
    description: '',
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email to the submitter
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: formData.email,
          business_name: formData.businessName,
          // Add other template variables as needed
        },
        'YOUR_USER_ID'
      );

      // Send email to yourself (admin)
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_ADMIN_TEMPLATE_ID',
        {
          from_email: formData.email,
          business_name: formData.businessName,
          business_type: formData.businessType,
          description: formData.description,
          // Note: EmailJS doesn't support file attachments in the free plan
          // You might want to set up a file upload service separately
        },
        'YOUR_USER_ID'
      );

      alert('Form submitted successfully!');
      navigate('/catalog');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Form;