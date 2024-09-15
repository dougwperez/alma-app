"use client";

import React, { useState, useEffect } from 'react';

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visasInterested: string[];
  resume: string;
  additionalInformation: string;
  state: string;
}

const InternalLeadList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch leads when the component mounts
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        setErrorMessage('Error fetching leads.');
      }
    };

    fetchLeads();
  }, []);

  // Update lead state from PENDING to REACHED_OUT
  const updateLeadState = async (id: number) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newState: 'REACHED_OUT' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead state');
      }

      const updatedLead = await response.json();
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id ? updatedLead : lead))
      );
    } catch (error) {
      setErrorMessage('Error updating lead.');
    }
  };

  return (
    <div>
      <h2>Internal Leads List</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.firstName} {lead.lastName} - {lead.state}
            {lead.state === 'PENDING' && (
              <button onClick={() => updateLeadState(lead.id)}>
                Reach Out
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternalLeadList;
