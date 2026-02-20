export type ErrorResponse = {
  code: string;
  message: string;
  category: number;
  metadata: unknown | null;
};

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    obj &&
    typeof obj.code === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.category === 'number' &&
    'metadata' in obj
  );
}
