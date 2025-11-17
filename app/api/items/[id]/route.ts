import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, quantity, category, priority, notes, unitCost, dueDate, photo, done } = body;

    if (!label || typeof label !== 'string' || label.trim() === '') {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const item = await prisma.item.update({
      where: { id },
      data: {
        label: label.trim(),
        quantity: quantity || 1,
        category: category || null,
        priority: priority || 'medium',
        notes: notes || null,
        unitCost: unitCost || 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        photo: photo || null,
        done: done || false,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.item.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
