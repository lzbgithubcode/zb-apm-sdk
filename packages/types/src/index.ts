export * from "./config";

export const sum2 = (num1: number, num2: number) => {
  console.log("我是第pkg2包------", num1, num2);
  return num1 * num2;
};