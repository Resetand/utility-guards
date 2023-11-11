import { is } from './guards';

export { validateBySchema, validateBySchemaStrict } from './schema';
export { createValidateSchema } from './utils';
export type { TypeSchema, InferTypeSchema } from './types';

export default is;
