import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url/";

export const client = sanityClient({
  projectId: "5qxjqedr",
  dataset: "production",
  apiVersion: "2023-01-12",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
