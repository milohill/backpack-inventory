#! /usr/bin/env node

console.log('Population start');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Kind = require('./models/kind');
const Manufacturer = require('./models/manufacturer');
const Backpack = require('./models/backpack');
const BackpackInstance = require('./models/backpackinstance');

// containers
const kinds = [];
const manufacturers = [];
const backpacks = [];
const backpackinstances = [];

mongoose.set('strictQuery', false); // Prepare for Mongoose 7

// mongoDB URL
const mongoDB = userArgs[0];

// error catcher
main().catch((err) => console.log(err));

// main function to call all the functions required
async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createKinds();
  await createManufacturers();
  await createBackpacks();
  await createBackpackInstances();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function kindCreate(name, description) {
  const kind = new Kind({
    name: name,
    description: description,
  });
  await kind.save();
  kinds.push(kind);
  console.log(`Added kind: ${(name, description)}`);
}

async function manufacturerCreate(name, description, year) {
  const manufacturer = new Manufacturer({
    name: name,
    description: description,
    year: year,
  });

  await manufacturer.save();
  manufacturers.push(manufacturer);
  console.log(`Added manufacturer: ${name}, ${description}, ${year}`);
}

async function backpackCreate(name, manufacturer, kind, year, description) {
  const backpack = new Backpack({
    name: name,
    manufacturer: manufacturer,
    kind: kind,
    year: year,
    description: description,
  });
  await backpack.save();
  backpacks.push(backpack);
  console.log(`Added backpack: ${name}`);
}

async function backpackinstanceCreate(backpack, stock, price) {
  const backpackinstance = new BackpackInstance({
    backpack: backpack,
    stock: stock,
    price: price,
  });
  await backpackinstance.save();
  backpackinstances.push(backpackinstance);
  console.log(`Added backpackinstance: ${backpack}, ${stock}, ${price}`);
}

async function createKinds() {
  console.log('Adding kinds');
  await Promise.all([
    kindCreate(
      'Hiking Bags',
      `Hiking is a long, vigorous walk, usually on trails or footpaths in the countryside. Walking for pleasure developed in Europe during the eighteenth century.[1] Religious pilgrimages have existed much longer but they involve walking long distances for a spiritual purpose associated with specific religions. `
    ),
    kindCreate(
      'Messenger Bags',
      `A messenger bag (also called a courier bag) is a type of sack, usually made of cloth (natural or synthetic). It is worn over one shoulder with a strap that goes across the chest resting the bag on the lower back.[1] While messenger bags are sometimes used by couriers, they are now also an urban fashion icon. Some types of messenger bags are called carryalls.[2] A smaller version is often called a sling bag. 
    `
    ),
    kindCreate(
      'Shoulder Bags',
      `A shoulder bag is a handbag or pocketbook having one strap long enough to be slung over the shoulder. On most bags, the straps are tightly strengthened. The strap is designed to be looped over the shoulder to be supported by it and carried by the user hands-free. The straps are what set the bag apart from other bags.`
    ),
  ]);
}

async function createManufacturers() {
  console.log('Adding manufacturers');
  await Promise.all([
    manufacturerCreate(
      'Osprey',
      `Osprey Packs, Inc, commonly known as Osprey is an American brand that manufactures outdoor backpacks. It was founded in 1974 by Mike Pfotenhauer. It was purchased by Helen of Troy Limited in 2021 for $414.7 million. `,
      1974
    ),
    manufacturerCreate(
      'AER',
      `Aer started in 2014 as a crowdfunding project that combined a gym bag and an office bag into one simplified design. Since then, we’ve grown our collection with award-winning products to help you travel better.
    Whether you're going between the office and the gym or from San Francisco to Tokyo, there's a bag in our collection that's perfectly suited for your journey.`,
      2014
    ),
    manufacturerCreate(
      'COTOPAXI',
      `Adventure inspires us to see the world and make it better. That’s why we build gear that fuels both outdoor experiences and global change. To achieve our mission, we dedicate at least 1% of our revenue to nonprofits that help communities experiencing poverty.`,
      2014
    ),
  ]);
}

async function createBackpacks() {
  console.log('Adding Backpacks');
  await Promise.all([
    backpackCreate(
      'Rook 65',
      manufacturers[0],
      kinds[0],
      2013,
      `Backpacking isn’t easy. But it should be. So, in an effort to make your walk in the woods as effortless as possible, we developed a pack that’s capable, comfortable, innovative, and approachable. With lightweight performance, a new adjustable torso system for a seamless fit, an integrated raincover, and superb ventilation, the Rook 65 has your overnight needs covered—whether it’s your first time sleeping under the stars or your fiftieth. The pack’s straightforward feature set, rugged construction, and super comfortable carrying system should tempt backpackers of every ability.`
    ),
    backpackCreate(
      'Raptor 10',
      manufacturers[0],
      kinds[2],
      2011,
      `Our highest-performing pack for mountain biking, the 10-liter Raptor was made for your most epic climbs and most action-packed descents. Equipped with the next-gen Hydraulics™ reservoir and fully-featured for all-day, all-mountain action, it's the top choice for biker's looking for uncompromised performance.`
    ),
    backpackCreate(
      'Aura AG 50',
      manufacturers[0],
      kinds[1],
      2019,
      `For lighter-weight multiday overnight trips where comfort and ventilation are paramount and a women's-specific fit is ideal, people know to reach for their Aura AG 50. AntiGravity suspension delivers a weight-defying fit that seamlessly envelopes your back and hips in 3D-suspended mesh that'll have you wondering where all that weight you packed went. Trust us when we say it's still there—the suspension is just that good. From easy-to-use stretch mesh side pockets, Stow-on-the-Go trekking pole attachment and integrated raincover, the Aura AG 50 is a compromise-free women's backpacking pack. Made with recycled main, accent and bottom fabrics.`
    ),
    backpackCreate(
      'Pro Pack 24L',
      manufacturers[1],
      kinds[0],
      2020,
      `The Pro Pack 24L is a versatile everyday backpack made with sustainable materials. It features a smart look for the city and office, thoughtful organization for your daily essentials, and a contoured back panel and straps for all-day comfort.
      `
    ),
    backpackCreate(
      'Gym Duffel 3',
      manufacturers[1],
      kinds[2],
      2022,
      `The Gym Duffel 3 offers spacious, ventilated storage for all your gym gear. Multiple compartments offer smart organization and its refined style keeps you looking sharp before and after your workout.
      `
    ),
    backpackCreate(
      'Pro Sling',
      manufacturers[1],
      kinds[1],
      1999,
      `The Pro Sling is a versatile lightweight sling made with sustainable materials. It features a smart look for the city, thoughtful organization for your tech and essentials, and can be used as a sling or organizer pouch.
      `
    ),
    backpackCreate(
      'Allpa 24L Travel Pack',
      manufacturers[2],
      kinds[0],
      2001,
      `The Allpa 42L Travel Pack protects and comfortably carries all your gear, whether it’s on your back, strapped to the roof of your car, or in the belly of a puddlejumper. The Allpa’s incredibly burly, TPU-coated polyester shell repels inclement weather, while its padded, mesh suspension system and load lifter straps provide a comfortable carry during long walks to the hostel or all-out airport dashes.`
    ),
    backpackCreate(
      'Allpa 60L Gear Hauler Tote',
      manufacturers[2],
      kinds[2],
      2023,
      `The Allpa 60L Gear Hauler Tote makes getting your gear from point A to point B easy, whether you're skiing, climbing, hiking, or grocery shopping. Two sets of handles let you carry over the shoulder or by hand. A bevy of interior and exterior pockets keeps the little things organized, while top compression straps keep your gear secure.`
    ),
    backpackCreate(
      'Allpa X 4L Hip Pack',
      manufacturers[2],
      kinds[1],
      2016,
      `Designed for life in go mode, Allpa X Hip Pack is the latest and smallest addition to our travel collection. This fanny pack is the perfect in-flight companion and it fits right in your Allpa Travel Pack's top pocket when it's time to condense your gear.`
    ),
  ]);
}

async function createBackpackInstances() {
  console.log('Adding BackpackInstances');
  await Promise.all([
    backpackinstanceCreate(backpacks[0], 299, 279),
    backpackinstanceCreate(backpacks[0], 2, 99),
    backpackinstanceCreate(backpacks[1], 0, 111),
    backpackinstanceCreate(backpacks[1], 1263, 999),
    backpackinstanceCreate(backpacks[1], 11, 362),
    backpackinstanceCreate(backpacks[2], 54, 442),
    backpackinstanceCreate(backpacks[2], 321, 3213),
    backpackinstanceCreate(backpacks[3], 4124, 312324),
    backpackinstanceCreate(backpacks[4], 52512, 576),
    backpackinstanceCreate(backpacks[5], 44, 99),
    backpackinstanceCreate(backpacks[6], 3213, 3214),
    backpackinstanceCreate(backpacks[7], 4214, 77),
    backpackinstanceCreate(backpacks[7], 3221, 332),
    backpackinstanceCreate(backpacks[8], 1, 425),
    backpackinstanceCreate(backpacks[8], 45, 12323),
    backpackinstanceCreate(backpacks[8], 32233, 977),
  ]);
}
