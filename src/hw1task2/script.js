import { det } from "mathjs";
const delaunayCircleCheck = (x1, y1, x2, y2, x3, y3, x0, y0) => {
  const a = det([
    [x1, y1, 1],
    [x2, y2, 1],
    [x3, y3, 1],
  ]);

  const b = det([
    [x1 ** 2 + y1 ** 2, y1, 1],
    [x2 ** 2 + y2 ** 2, y2, 1],
    [x3 ** 2 + y3 ** 2, y3, 1],
  ]);

  const c = det([
    [x1 ** 2 + y1 ** 2, x1, 1],
    [x2 ** 2 + y2 ** 2, x2, 1],
    [x3 ** 2 + y3 ** 2, x3, 1],
  ]);

  const d = det([
    [x1 ** 2 + y1 ** 2, x1, y1],
    [x2 ** 2 + y2 ** 2, x2, y2],
    [x3 ** 2 + y3 ** 2, x3, y3],
  ]);

  return (a * (x0 ** 2 + y0 ** 2) - b * x0 + c * y0 - d) * Math.sign(a) >= 0;
};

const first = [0, 0];
const second = [-4, 6];
const third = [7, 0];
const fourth = [0, 7];
const fifth = [-1, -4];
const sixth = [5, 6];
const seventh = [3, 2];

const points = [first, second, third, fourth, fifth, sixth, seventh];
[
  [first, second, fourth],
  [first, seventh, third],
  [first, third, fifth],
  [fifth, first, second],
  [first, seventh, fourth],
  [fourth, seventh, sixth],
  [third, seventh, sixth],
].forEach((triangle) => {
  points.forEach((point) => {
    if (!triangle.includes(point)) {
      if (!delaunayCircleCheck(...triangle.flat(), ...point)) {
        console.warn(
          "Не является триангуляцией Делоне",
          "\nтреугольник:",
          triangle,
          "\nточка:",
          point
        );
        throw new Error("Not delaunay");
      }
    }
  });
});

console.log("Является триангуляцией Делоне");

// const delaunayAngleCheck = (x1, y1, x2, y2, x3, y3, x0, y0) => {
//   return (
//     ((x0 - x1) * (y0 - y3) - (x0 - x3) * (y0 - y1)) *
//       ((x2 - x1) * (x2 - x3) + (y2 - y1) * (y2 - y3)) +
//       ((x0 - x1) * (x0 - x3) + (y0 - y1) * (y0 - y3)) *
//         ((x2 - x1) * (y2 - y3) - (x2 - x3) * (y2 - y1)) >=
//     0
//   );
// };
