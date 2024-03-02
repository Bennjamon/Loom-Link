export type CreateResult<T, V extends Partial<T> | null> = V extends
  | Partial<T>
  | infer U
  ? U extends Partial<T>
    ? T
    : T | U
  : null;
