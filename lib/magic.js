import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(process.env.SECRET_MAGIC_API_KEY);
