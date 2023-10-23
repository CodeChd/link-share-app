import { LinkType } from "../context/linkSlice";

export default function isObjectEmpty(obj: LinkType[]): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
