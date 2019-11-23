export enum ExitCodes {
  SuccessNoLintingErrors = 0,
  SuccessWithLintingErrors = 1,
  UnexpectedError = 2,
}

export const ignore = ['node_modules', 'README.md', 'CHANGELOG.md', 'LICENSE'];
