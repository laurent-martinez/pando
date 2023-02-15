import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,  {
  apiVersion: '2022-11-15',
  typescript: true,
})
export default async function handler(req: { method: string; body: any[]; headers: { origin: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: Stripe.Response<Stripe.Checkout.Session>): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method === 'POST') {

    try {
        const params : any = {
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            mode: 'payment',
            shipping_options: [
                {shipping_rate: 'shr_1MbNHbIJHGRNQVY2Vlw8OAwB'},
                {shipping_rate:'shr_1MbNHCIJHGRNQVY2nMNZTBgp' },
            ],
            line_items: req.body.map((item) => {
              const img = item.image[0].asset._ref;
              const newImg = img.replace('image-', 'https://cdn.sanity.io/images/du17da5v/production/').replace('-webp', '.webp');
              console.log('img',newImg);
              return {
                price_data: {
                  currency: 'eur',
                  product_data: {
                    name: item.name,
                    images: [newImg],
                  },
                  unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
            }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err : any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}