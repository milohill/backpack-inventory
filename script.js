const mongoose = require('mongoose');
const Kind = require('./models/kind');

const key = process.argv.slice(2, 3)[0];

main().catch((err) => {
  console.log(err);
});

async function main() {
  console.log('Main function start');
  await mongoose.connect(key);
  const newKind = new Kind({
    name: 'Hey',
  });
  await newKind.save();
  console.log('Main function done');
}
