import { NextRequest, NextResponse } from 'next/server';

// Mock data store (in-memory)
const leads = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    visasInterested: ['Visa 1', 'Visa 2'],
    resume: '',
    additionalInformation: 'Looking for opportunities',
    state: 'PENDING',
  },
];

export async function GET() {
  // Fetch all leads
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newLead = {
    ...body,
    id: leads.length + 1,
    state: 'PENDING', // Default state is PENDING
  };
  leads.push(newLead);
  return NextResponse.json(newLead, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, newState } = body;
  const leadIndex = leads.findIndex((lead) => lead.id === id);
  if (leadIndex === -1) {
    return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
  }
  leads[leadIndex].state = newState;
  return NextResponse.json(leads[leadIndex], { status: 200 });
}
