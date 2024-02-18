export type MockClassType<T> = {
  [P in keyof T]: jest.Mock<T[P]> | MockClassType<unknown>;
};
