export default function collect(value: string, previous: string[] = []): string[] {
  return previous.concat(value);
}
