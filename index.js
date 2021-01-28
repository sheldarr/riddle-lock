const { program } = require('commander');

program
  .requiredOption('-c, --complexity <number>', 'riddle complexity')
  .requiredOption('-w, --word <word>', 'word');

program.parse(process.argv);

const options = program.opts();

const complexity = Number(options.complexity);
const word = options.word;

const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'w',
  'z',
];
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const riddleLock = [];

const vowelChance = 0.3;

[...Array(word.length).keys()].map((index) => {
  riddleLock[index] = [
    word.charAt(index),
    ...[...Array(complexity - 1).keys()].map((index) => {
      return Math.random() < vowelChance
        ? vowels[Math.floor(Math.random() * vowels.length)]
        : consonants[Math.floor(Math.random() * consonants.length)];
    }),
  ].sort(() => Math.random() - 0.5);
});

for (let x = 0; x < complexity; x++) {
  let row = '';

  for (let y = 0; y < word.length; y++) {
    row += riddleLock[y][x];
  }

  console.log(row.toUpperCase());
}
