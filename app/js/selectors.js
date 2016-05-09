import { createSelector } from 'reselect';

const items = state => state.wall.all.items;

export const getTwoLast = createSelector([
  items
], (items) => {
  return items.slice(0, 2);
});
