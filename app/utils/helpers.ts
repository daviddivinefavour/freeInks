import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

const saltRounds = genSaltSync(10);

const hashString = (s: string) => hashSync(s, saltRounds);
const compareHashedString = (s: string, hash: string) => compareSync(s, hash);
const generateRandomDigits = (num: number): number =>
  Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);

export default { hashString, compareHashedString, generateRandomDigits };
