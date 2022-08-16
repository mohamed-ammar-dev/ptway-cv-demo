import { v4 as uuidv4 } from "uuid";

export function createUniqueName(extension?: string) {
  if (extension) return `${uuidv4()}.${extension}`;
  return uuidv4();
}
