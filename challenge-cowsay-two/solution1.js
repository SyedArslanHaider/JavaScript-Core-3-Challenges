// =================
// Stripped down cowsayer CLI, 
// no libraries
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
// =================

// 1. Accept arguments
const input = process.argv[2] || '';
// how will you accept arguments?

// 2. Make supplies for our speech bubble

let topLine = '_'.repeat(input.length + 2); // Dynamic length based on input
let bottomLine = '-'.repeat(input.length + 2);
let saying = input;

// 3. Make a cow that takes a string

function cowsay(saying) {
  if (!saying) {
    saying = "Moo? (No input provided!)";
}
  const speechBubble = `
  ${topLine}
 < ${saying} >
  ${bottomLine}`;

    const cow = `
     \\   ^__^
      \\  (oo)\\_______
         (__)\\       )\\/\\
             ||----w |
             ||     ||`;

  // Combine and return the result
  return speechBubble + cow;
}
//4. Pipe argument into cowsay function and return a cow
console.log(cowsay(saying));
// how will you log this to the console?
