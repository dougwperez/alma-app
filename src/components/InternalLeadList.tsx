"use client";

import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';

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

  const columns = React.useMemo<ColumnDef<Lead>[]>(
    () => [
      { header: 'First Name', accessorKey: 'firstName' },
      { header: 'Last Name', accessorKey: 'lastName' },
      { header: 'Email', accessorKey: 'email' },
      {
        header: 'LinkedIn', accessorKey: 'linkedin',
        cell: ({ getValue }) => (
          <a href={getValue()} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            LinkedIn Profile
          </a>
        )
      },
      {
        header: 'Visas Interested', accessorKey: 'visasInterested',
        cell: ({ getValue }) => {
          const value = getValue();
          return Array.isArray(value) ? value.join(', ') : value;
        }
      },
      {
        header: 'Resume', accessorKey: 'resume',
        cell: ({ getValue }) => (
          <a href={getValue()} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Resume
          </a>
        )
      },
      { header: 'Additional Information', accessorKey: 'additionalInformation' },
      { header: 'State', accessorKey: 'state' },
      {
        header: 'Action',
        accessorKey: 'action',
        cell: ({ row }) =>
          row.original.state === 'PENDING' ? (
            <button onClick={() => updateLeadState(row.original.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
              Reach Out
            </button>
          ) : null
      },
    ],
    []
  );

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-screen w-full p-4 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Internal Leads List</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="h-full overflow-y-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead className="sticky top-0 bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternalLeadList;
