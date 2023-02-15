import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_API_KEY,
    dataset: 'production',
    apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
    useCdn: true,
    ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client);

export const urlFor = (source : SanityImageSource) => {
  return   builder.image(source)
}

