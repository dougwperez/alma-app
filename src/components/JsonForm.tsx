"use client";

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import leadSchema from '../schemas/leadSchema.json';
import leadUiSchema from '../schemas/leadUiSchema.json';

const JsonForm = () => {
  const [formData, setFormData] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Handle form data changes
  const handleChange = ({ data }: any) => {
    setFormData(data);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage('Form submitted successfully!');
      } else {
        setSubmissionMessage('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Want to understand your visa options?
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
      </p>

      {/* JSONForms integration to render form dynamically */}
      <JsonForms
        schema={leadSchema}
        uischema={leadUiSchema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 mt-6 rounded hover:bg-gray-800 transition"
      >
        Submit
      </button>

      {submissionMessage && (
        <p className="text-gray-600 text-center mt-4">{submissionMessage}</p>
      )}
    </div>
  );
};

export default JsonForm;
