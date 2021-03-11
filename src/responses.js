// const fs = require('fs');

// const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const npcName = ['Jacob', 'Ryan', 'Jae', 'Sean', 'Brad', 'Cullen', 'Oliver', 'Jonathan', 'Jared', 'Tom', 'Kippy', 'David', 'John', 'Frank'];
const npcSex = ['male', 'female'];
const npcCareer = ['warrior', 'rogue', 'priest', 'mage', 'Shaman', 'hunter', 'Dryad', 'paladin', 'warlock'];
const npcRace = ['Draenei', ' Dwarf', 'Gnome', 'Human', 'Night Elf', 'Worgen', 'Void Elf', 'Lightforged', 'Dark Iron', 'Kul Tiran',
  'Mechagnon', 'Pandaren', 'Blood Elf', 'Goblin', 'Orc', 'Tauren', 'Troll', 'Undead', 'NightBorne', 'Nighmount', "Mag'har", 'Zandalari',
  'Vulpera',
];
const npcPersonality = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

const randomNPC = () => {
  const npc = {};
  npc.Name = npcName[Math.floor(Math.random() * npcName.length)];
  npc.Sex = npcSex[Math.floor(Math.random() * npcSex.length)];
  npc.Career = npcCareer[Math.floor(Math.random() * npcCareer.length)];
  npc.Race = npcRace[Math.floor(Math.random() * npcRace.length)];
  npc.Personality = npcPersonality[Math.floor(Math.random() * npcPersonality.length)];
  npc.Blood = Math.floor(Math.random() * 100);
  npc.Mana = Math.floor(Math.random() * 50);
  npc.Strength = Math.floor(Math.random() * 100);
  npc.Spellpower = Math.floor(Math.random() * 200);
  npc.Speed = Math.floor(Math.random() * 10);
  return npc;
};

const userNPCList = {
  NPC: [{
    name: 'Frank',
    sex: 'male',
    career: 'mage',
    race: 'Human',
    personality: 'ENTP',
    blood: 100,
    mana: 100,
    strength: 100,
    spellpower: 100,
    speed: 10,
  }],
  counter: {
    number: 1,
  },
};

const sendJSONResponse = (request, response, responseCode, object) => {
  response.writeHead(responseCode, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

const randomNpcJSON = (limit = 1) => {
  const randomNPCList = [];
  const limit2 = Number(limit);
  for (let i = 0; i < limit2; i += 1) {
    randomNPCList[i] = randomNPC();
  }
  return JSON.stringify(randomNPCList);
};

const getRandomNPCXML = (limit = 1) => {
  let xmlNPC;
  let xmlList = `
  <NPCList>
  `;
  const limit2 = Number(limit);
  for (let i = 0; i < limit2; i += 1) {
    const NPC = randomNPC();
    xmlNPC = `
    <NPC>
      <name>${NPC.Name}</name>
      <career>${NPC.Career}</career>
      <race>${NPC.Race}</race>
      <personality>${NPC.Personality}</personality>
      <blood>${NPC.Blood}</blood>
      <mana>${NPC.Mana}</mana>
      <strength>${NPC.Strength}</strength>
      <spellpower>${NPC.Spellpower}</spellpower>
      <speed>${NPC.Speed}</speed>
    </NPC>
    `;
    xmlList += xmlNPC;
  }
  xmlList += '</NPCList>';
  return xmlList;
};

// const getCSSResponse = (request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/css',
//   });
//   response.write(defaultStyles);
//   response.end();
// };

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomNPCResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'HEAD') {
      response.writeHead(200, {
        'Content-Type': 'text/xml',
        'Content-Length': getBinarySize(getRandomNPCXML(params.limit)),
      });
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/xml',
      });
      response.write(getRandomNPCXML(params.limit));
      response.end();
    }
  } else if (httpMethod === 'HEAD') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': getBinarySize(randomNpcJSON(params.limit)),
    });
    response.end();
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.write(randomNpcJSON(params.limit));
    response.end();
  }
};

const customNPC = (request, response, body) => {
  // here we are assuming an error, pessimistic aren't we?
  let responseCode = 400; // 400=bad request
  const responseJSON = {
    id: 'missingParams',
    message: 'name and age are both required',
  };

  userNPCList.NPC[userNPCList.counter.number] = { num: Math.random() };
  userNPCList.NPC[userNPCList.counter.number].name = body.name;
  userNPCList.NPC[userNPCList.counter.number].sex = body.sex;
  userNPCList.NPC[userNPCList.counter.number].career = body.career;
  userNPCList.NPC[userNPCList.counter.number].race = body.race;
  userNPCList.NPC[userNPCList.counter.number].personality = body.personality;
  userNPCList.NPC[userNPCList.counter.number].blood = body.blood;
  userNPCList.NPC[userNPCList.counter.number].mana = body.mana;
  userNPCList.NPC[userNPCList.counter.number].strength = body.strength;
  userNPCList.NPC[userNPCList.counter.number].spellpower = body.spellpower;
  userNPCList.NPC[userNPCList.counter.number].speed = body.speed;

  responseCode = 201; // send "created" status code
  responseJSON.id = userNPCList.NPC[userNPCList.counter.number].name;
  responseJSON.message = 'Created Successfully';
  userNPCList.counter.number += 1;

  return sendJSONResponse(request, response, responseCode, responseJSON);
};

const getUserNPCList = (request, response, params) => {
  let responseObj = userNPCList;
  if (params != null) {
    for (let i = 0; i < userNPCList.NPC.length; i += 1) {
      if (userNPCList.NPC[i].name === params.name) {
        responseObj = userNPCList.NPC[i];
      }
    }
  }
  sendJSONResponse(request, response, 200, responseObj);
};

module.exports.getRandomNPCResponse = getRandomNPCResponse;
// module.exports.getCSSResponse = getCSSResponse;
module.exports.customNPC = customNPC;
module.exports.getUserNPCList = getUserNPCList;
