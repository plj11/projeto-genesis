import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature');
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (error) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }
    const session = event.data.object;
    // Evento de nova assinatura
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await prisma.user.update({
            where: {
                stripeCustomerId: session.customer,
            },
            data: {
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    // Evento de renovação ou alteração de assinatura
    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await prisma.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    return new NextResponse(null, { status: 200 });
}
