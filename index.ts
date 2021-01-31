import chalk from 'chalk';
import { program } from 'commander';

program
  .requiredOption('-c, --complexity <number>', 'riddle complexity')
  .requiredOption('-w, --word <word>', 'word');

program.parse(process.argv);

const options = program.opts();

const CONSONANTS = [
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
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const VOWEL_CHANCE = 0.3;

const complexity = Math.min(
  Number(options.complexity),
  [...CONSONANTS, ...VOWELS].length,
);
const word = String(options.word).toUpperCase();

const lockColumns = [...word.split('').map((letter) => [letter])];

const randomConsonant = () =>
  CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
const randomVowel = () => VOWELS[Math.floor(Math.random() * VOWELS.length)];
const randomLetter = () =>
  Math.random() < VOWEL_CHANCE ? randomVowel() : randomConsonant();
const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

for (let columnIndex = 0; columnIndex < word.length; columnIndex++) {
  for (let index = 0; index < complexity - 1; index++) {
    while (true) {
      const letter = randomLetter().toUpperCase();

      if (!lockColumns[columnIndex].includes(letter)) {
        lockColumns[columnIndex].push(letter);
        break;
      }
    }
  }
  lockColumns[columnIndex] = shuffleArray(lockColumns[columnIndex]);
}

for (let characterIndex = 0; characterIndex < complexity; characterIndex++) {
  for (let columnIndex = 0; columnIndex < word.length; columnIndex++) {
    const nextLetter = lockColumns[columnIndex][characterIndex];

    word.charAt(columnIndex) === nextLetter
      ? process.stdout.write(chalk.green(nextLetter))
      : process.stdout.write(chalk.white(nextLetter));
  }

  process.stdout.write('\n');
}
