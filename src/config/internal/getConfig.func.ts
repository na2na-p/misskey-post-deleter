import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const getConfig = () => {
  const envs = createEnv({
    server: {
      API_KEY: z.string().min(1).readonly(),
      BASE_URL: z.string().min(1).readonly(),
    } as const,
    runtimeEnv: process.env,
  });

  return {
    ...envs,
  } as const;
};
