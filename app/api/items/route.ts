import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    const contentType = request.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else if (contentType?.includes('application/x-www-form-urlencoded') || contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {
        label: formData.get('title') || formData.get('label'),
        quantity: formData.get('quantity') || 1,
        category: formData.get('category') || null,
        priority: formData.get('priority') || 'medium',
        notes: formData.get('description') || formData.get('notes') || null,
        unitCost: formData.get('price') || formData.get('unitCost') || 0,
        dueDate: formData.get('dueDate') || null,
        photo: formData.get('image') || formData.get('photo') || null,
        done: formData.get('done') || false,
      };
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    const { label, quantity, category, priority, notes, unitCost, dueDate, photo, done } = body;

    if (!label || typeof label !== 'string' || label.trim() === '') {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const item = await prisma.item.create({
      data: {
        label: label.trim(),
        quantity: Number(quantity) || 1,
        category: category || null,
        priority: priority || 'medium',
        notes: notes || null,
        unitCost: Number(unitCost) || 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        photo: photo || null,
        done: done === 'true' || done === true ? true : false,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
