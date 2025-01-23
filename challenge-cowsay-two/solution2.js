// =================
// Stripped down cowsayer CLI, 
// no libraries or arguments
// https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
// =================

// 1. Make  a command line interface.
const readline = require('readline');
// Create an interface to accept input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 2. Make supplies for our speech bubble
const cow = (saying) => {
  const topLine = '_'.repeat(saying.length + 2); // Adjust length dynamically
  const bottomLine = '-'.repeat(saying.length + 2);

  // Speech bubble and cow art
  return `
  ${topLine}
 < ${saying} >
  ${bottomLine}
     \\   ^__^
      \\  (oo)\\_______
         (__)\\       )\\/\\
             ||----w |
             ||     ||`;
};
// 4. Use readline to get a string from the terminal 
rl.question("What would you like the cow to say? ", (input) => {
  const saying = input || "Moo? (No input provided!)"; // Default if no input
  console.log(cow(saying)); // Log the result
  rl.close(); // Close the readline interface
});
// (with a prompt so it's clearer what we want)