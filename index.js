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

const VOWEL_CHANCE = 0.3;

const lockColumns = [...word.split('').map((letter) => [letter])];

const randomConsonant = () =>
  consonants[Math.floor(Math.random() * consonants.length)];
const randomVowel = () => vowels[Math.floor(Math.random() * vowels.length)];
const randomLetter = () =>
  Math.random() < VOWEL_CHANCE ? randomVowel() : randomConsonant();
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

for (let columnIndex = 0; columnIndex < word.length; columnIndex++) {
  for (let index = 0; index < complexity - 1; index++) {
    while (true) {
      const letter = randomLetter();

      if (!lockColumns[columnIndex].includes(letter)) {
        lockColumns[columnIndex].push(letter);
        break;
      }
    }
  }
  lockColumns[columnIndex] = shuffleArray(lockColumns[columnIndex]);
}

for (let characterIndex = 0; characterIndex < complexity; characterIndex++) {
  let row = '';

  for (let columnIndex = 0; columnIndex < word.length; columnIndex++) {
    row += lockColumns[columnIndex][characterIndex];
  }

  console.log(row.toUpperCase());
}
