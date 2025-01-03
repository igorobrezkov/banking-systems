export default function getArrSortTransiction(arr) {
  const arrCopy = [...arr];
  return arrCopy.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
  });
}
