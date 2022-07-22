import { Magic } from 'magic-sdk';

const apiKey = process.env.NEXT_PUBLIC_MAGIC_API_KEY;

export const createMagic = () => {
  return (
    typeof window !== 'undefined' && new Magic(apiKey)
  );
};

export const magic = createMagic();
