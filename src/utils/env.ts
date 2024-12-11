import { z, ZodError } from 'zod';

const envSchema = z.object({});

try {
  envSchema.parse(import.meta.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export const env = envSchema.parse(import.meta.env);
