var sum_to_n_a = function (n) {
  // Use mathematic fomula
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // Use loop to sum array
  return new Array(n).fill().reduce((acc, _, index) => acc + index + 1, 0);
};

var sum_to_n_c = function (n) {
  // Recursive
  return n === 1 ? 1 : n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
