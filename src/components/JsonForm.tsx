"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { UISchemaElement, JsonSchema } from '@jsonforms/core';
import leadSchema from '../schemas/leadSchema.json';
import leadUiSchema from '../schemas/leadUiSchema.json';
import Image from 'next/image';
import FileUploadRenderer from './FileUploadRenderer';
import Hero from './Hero';


const fileUploadTester = (uischema: UISchemaElement, schema: JsonSchema) => {
  return schema?.format === 'data-url' && uischema?.scope === '#/properties/resume' ? 5 : -1;
};

const renderers = [
  ...materialRenderers,
  { tester: fileUploadTester, renderer: FileUploadRenderer },
];

const JsonForm = () => {
  const [formData, setFormData] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleChange = ({ data }: { data: any }) => {
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
        setSubmissionMessage('Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.');
      } else {
        setSubmissionMessage('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionMessage('An error occurred while submitting the form.');
    } finally {
      setIsModalOpen(true);
    }
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <>
      <Hero />
      <div className="flex justify-center mt-6">
        <Image
          src="/images/scroll.png"
          alt="Paperclip"
          width={40}
          height={40}
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-1000">
          <div className="bg-white p-8 rounded shadow-lg max-w-md relative top-[-20%] text-center">
            <h3 className="text-xl font-semibold mb-4">Thank You</h3>
            <p>{submissionMessage}</p>
            <button
              onClick={navigateToHome}
              className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JsonForm;
