import { TransformFnParams } from 'class-transformer';

export const lowerTrim = ({ value }: TransformFnParams) =>
  (value || '').toLowerCase().trim();
