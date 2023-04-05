export default (num) => {
  let val = 0;
  let output = 0;

  return [...Array(num).keys()]
    .reduce((accum, current) => {
      val = num - current;

      if (val === 0 || val === 1) {
        output = accum;
      }

      output = accum * val;

      return output;
    }, 1);
}; 