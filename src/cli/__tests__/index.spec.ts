import cli from './run-cli';

test('Code should be 0', async () => {
  const { code } = await cli([]);

  expect(code).toBe(0);
});
