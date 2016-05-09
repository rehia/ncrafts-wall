export const RESIZE = 'RESIZE';

export function resize(columns) {
  return {
    type: RESIZE,
    columns
  };
}

