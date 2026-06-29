function getEnv(name: string) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

export const env = {
  currency: getEnv("VITE_CURRENCY_SYMBOL"),
  // cloudinaryName: getEnv("VITE_CLOUDINARY_NAME"),
  // stripeKey: getEnv("VITE_STRIPE_KEY"),
};
