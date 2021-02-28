const fs = require('fs');

const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const npcName = ["Jacob", "Ryan", "Jae", "Sean", "Brad", "Cullen", "Oliver", "Jonathan", "Jared", "Tom", "Kippy", "David", "John", "Frank"];
const npcSex = ["male", "female"]
const npcCareer = ["warrior", "rogue", "priest", "mage", "Shaman", "hunter", "Dryad", "paladin", "warlock"];
const npcRace = ["Draenei", " Dwarf", "Gnome", "Human", "Night Elf", "Worgen", "Void Elf", "Lightforged", "Dark Iron", "Kul Tiran",
  "Mechagnon", "Pandaren", "Blood Elf", "Goblin", "Orc", "Tauren", "Troll", "Undead", "NightBorne", "Nighmount", "Mag'har", "Zandalari",
  "Vulpera",
];
const npcPersonality = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];

const randomNPC = () =>{
  let npc = new Object();
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
}

const randomNpcJSON = (limit = 1) => {
  const randomNPCList = [];
  limit2 = Number(limit);
  for (let i = 0; i < limit2; i++) {
    randomNPCList[i] = randomNPC();
  }
  return JSON.stringify(randomNPCList);
}

const getRandomJokeJSON = (limit = 1) => {
  const limit2 = Number(limit);
  if (limit2 === 1) {
    const responseObj = qList[Math.floor(Math.random() * 10)];
    return JSON.stringify(responseObj);
  }
  const responseObjList = [];
  for (let i = 0; i < limit2; i += 1) {
    const responseObj = qList[Math.floor(Math.random() * 10)];
    responseObjList[i] = responseObj;
  }
  return JSON.stringify(responseObjList);
};

const getRandomNPCXML = (limit = 1) => {
  let xmlNPC;
  let xmlList = `
  <NPCList>
  `;
limit2 = Number(limit);
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

const getCSSResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(defaultStyles);
  response.end();
};

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

module.exports.getRandomNPCResponse = getRandomNPCResponse;
module.exports.getCSSResponse = getCSSResponse;