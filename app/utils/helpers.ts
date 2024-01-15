import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

const saltRounds = genSaltSync(10);

export const hashString = (s: string) => hashSync(s, saltRounds);
export const compareHashedString = (s: string, hash: string) => compareSync(s, hash);
export const generateRandomDigits = (num: number): number =>
  Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);
