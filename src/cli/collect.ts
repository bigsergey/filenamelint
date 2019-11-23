export default function collect<T>(value: T, previous: T[]): T[] {
  return previous.concat(value);
}
