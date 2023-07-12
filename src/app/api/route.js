import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const product = await res.json();

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // });
  // const data = await res.json();

  const product = 'GET'
  return NextResponse.json({ product })
}

export async function POST() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });

  // const data = await res.json();
  const data = 'POST'
  return NextResponse.json(data)
}
