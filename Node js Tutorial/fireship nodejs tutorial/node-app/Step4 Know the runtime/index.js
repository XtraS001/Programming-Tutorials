console.log("First app"); //Output: First app

// global = global variable/object/namespace that are available througout the node process
console.log(global.luckyNum); //Output: undefined
global.luckyNum = "23";
console.log(global.luckyNum); //Output: 23

console.log(process.platform); //Output: win32

console.log(process.env.USER);

// Dictionary:
// namespace - A conceptual space that groups classes, identifiers, etc. to avoid conflicts with items in unrelated code that have the same names.
