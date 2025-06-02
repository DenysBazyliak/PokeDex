export const hasher = (num) => {
  return (
    "#" + "0".repeat(4 - num.toString().length).toString() + num.toString()
  );
};
export function findStatName(array, statName) {
  return array.find((el) => {
    if (el.stat.name === statName) {
      return true;
    }
  }).base_stat;
}
export function reduceArray(array) {
  if (array) {
    return array.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.stat.name]: curr.base_stat,
      };
    }, {});
  }
}
export const fromSetToArray = (set) => {
  return Array.from(set);
};
