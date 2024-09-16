"use client";

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import leadSchema from '../schemas/leadSchema.json';
import leadUiSchema from '../schemas/leadUiSchema.json';
import Image from 'next/image';
import FileUploadRenderer from './FileUploadRenderer';
import Hero from './Hero';

// Define a tester function that checks if the field format is 'data-url' for the 'resume' field
const fileUploadTester = (uischema, schema) => {
  return schema?.format === 'data-url' && uischema?.scope === '#/properties/resume' ? 5 : -1;
};

// Combine material renderers with your custom renderer
const renderers = [
  ...materialRenderers,
  { tester: fileUploadTester, renderer: FileUploadRenderer }, // Use the specific tester
];

const JsonForm = () => {
  const [formData, setFormData] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = ({ data }: any) => {
    setFormData(data);
  };

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
    <>
      <Hero />
      <div className="flex justify-center mt-6">
        <Image
          src="/images/scroll.png"
          alt="Paperclip"
          width={40} // Set the desired width
          height={40} // Set the desired height
        />
      </div>
      <div className="max-w-lg mx-auto p-2 pt-5 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Want to understand your visa options?</h2>
        <p className="text-black-600 text-center mb-8">Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.</p>

        <JsonForms
          schema={leadSchema}
          uischema={leadUiSchema}
          data={formData}
          renderers={renderers}
          cells={materialCells}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 mt-6 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>

        {submissionMessage && (
          <p className="text-center mt-4 text-gray-700">{submissionMessage}</p>
        )}
      </div>
    </>
  );
};

export default JsonForm;
