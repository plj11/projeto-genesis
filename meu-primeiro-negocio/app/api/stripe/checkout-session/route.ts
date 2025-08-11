import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth'; // Placeholder for your auth solution
import { getServerSession } from 'next-auth'; // Placeholder

export async function POST(req: Request) {
  const { priceId } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name!,
    });
    stripeCustomerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
