interface KebabCaseFn {
  (argument: string): string;
}

declare let kebabCase: KebabCaseFn;

declare module 'kebab-case' {
  export default kebabCase;
}
