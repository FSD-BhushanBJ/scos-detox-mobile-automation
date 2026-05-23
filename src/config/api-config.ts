/**
 * @file api-config.ts
 */

type GlobalWithApiOverride = typeof globalThis & {
  MENTRIXOS_API_BASE_URL?: string;
};

const DEFAULT_BASE_URL =
'http://127.0.0.1:5050/api';
const getRuntimeUrl = (): string | null => {
  if (typeof global === 'undefined') return null;

  return (
    global as GlobalWithApiOverride
  ).MENTRIXOS_API_BASE_URL ?? null;
};

const getEnvUrl = (): string | null => {
  if (
    typeof process === 'undefined' ||
    !process?.env
  ) {
    return null;
  }

  return process.env.API_BASE_URL ?? null;
};

export const API_BASE_URL =
  getRuntimeUrl() ??
  getEnvUrl() ??
  DEFAULT_BASE_URL;

export const API_TIMEOUT_MS = 60000;