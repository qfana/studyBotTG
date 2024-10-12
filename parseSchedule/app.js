const fs = require("fs");
const table = require("./test.json");
const { log, group } = require("console");
const date = Object.keys(table);


const firstDay = table[date][4]["__EMPTY"].replace("Понедельник ", "").replace(".2024", "");
const secondDay = table[date][13]["__EMPTY"].replace("Вторник ", "").replace(".2024", "");
const thirdDay = table[date][22]["__EMPTY"].replace("Среда ", "").replace(".2024", "");
const fourthDay = table[date][31]["__EMPTY"].replace("Четверг ", "").replace(".2024", "");
const fifthDay = table[date][40]["__EMPTY"].replace("Пятница ", "").replace(".2024", "");

table[date].forEach(element => {
  for (let i = 0;i < 170;i++) {
    let test = element[`__EMPTY_${i}`];
    if (test) {
      test = `${test}`;
      element[`__EMPTY_${i}`] = test.replace("*", "").replace("_", "");
    }
  }
});

const myTable = [];
myTable.push({ "name": "TDd1410", "line": 4 });
myTable.push({ "name": "EBd1410", "line": 8 });
myTable.push({ "name": "PDd1410", "line": 12 });
myTable.push({ "name": "NBd1410", "line": 16 });
myTable.push({ "name": "URd4410", "line": 20 });
myTable.push({ "name": "PRd4410", "line": 24 });
myTable.push({ "name": "MEd4410", "line": 28 });
myTable.push({ "name": "TDd1310", "line": 35 });
myTable.push({ "name": "EBd1310", "line": 39 });
myTable.push({ "name": "PDd1310", "line": 43 });
myTable.push({ "name": "NBd1310", "line": 47 });
myTable.push({ "name": "NBd2310", "line": 50 });
myTable.push({ "name": "URd4310", "line": 55 });
myTable.push({ "name": "PRd4310", "line": 59 });
myTable.push({ "name": "TDd1210", "line": 66 });
myTable.push({ "name": "EBd1210", "line": 70 });
myTable.push({ "name": "PDd1210", "line": 74 });
myTable.push({ "name": "NBd1210", "line": 78 });
myTable.push({ "name": "NBd2210", "line": 82 });
myTable.push({ "name": "URd4210", "line": 86 });
myTable.push({ "name": "PRd4210", "line": 90 });
myTable.push({ "name": "TDd1110", "line": 97 });
myTable.push({ "name": "EBd1110", "line": 101 });
myTable.push({ "name": "PDd1110", "line": 105 });
myTable.push({ "name": "NBd1110", "line": 109 });
myTable.push({ "name": "URd4110", "line": 113 });
myTable.push({ "name": "TDd1010", "line": 120 });
myTable.push({ "name": "EBd1010", "line": 124 });
myTable.push({ "name": "PDd1010", "line": 128 });
myTable.push({ "name": "NBd1010", "line": 131 });
myTable.push({ "name": "URo9481", "line": 138 });
myTable.push({ "name": "URo8481", "line": 142 });
myTable.push({ "name": "IPo9481", "line": 146 });
myTable.push({ "name": "IPo8481", "line": 150 });
myTable.push({ "name": "PSo9381", "line": 154 });
myTable.push({ "name": "PSo8381", "line": 158 });
myTable.push({ "name": "IPo8381", "line": 162 });
myTable.push({ "name": "PSo8281", "line": 165 });

const result = { groups: {} };


myTable.forEach(element => {
  result["groups"][element.name] = {
    "week": [{
      "day": firstDay, "plan": [
        { "name": table[date][4][`__EMPTY_${element.line + 1}`], "cabinet": table[date][4][`__EMPTY_${element.line}`] },
        { "name": table[date][5][`__EMPTY_${element.line + 1}`], "cabinet": table[date][5][`__EMPTY_${element.line}`] },
        { "name": table[date][6][`__EMPTY_${element.line + 1}`], "cabinet": table[date][6][`__EMPTY_${element.line}`] },
        { "name": table[date][7][`__EMPTY_${element.line + 1}`], "cabinet": table[date][7][`__EMPTY_${element.line}`] },
        { "name": table[date][8][`__EMPTY_${element.line + 1}`], "cabinet": table[date][8][`__EMPTY_${element.line}`] },
        { "name": table[date][9][`__EMPTY_${element.line + 1}`], "cabinet": table[date][9][`__EMPTY_${element.line}`] },
        { "name": table[date][10][`__EMPTY_${element.line + 1}`], "cabinet": table[date][10][`__EMPTY_${element.line}`] }]
    },
    {
      "day": secondDay, "plan": [
        { "name": table[date][13][`__EMPTY_${element.line + 1}`], "cabinet": table[date][13][`__EMPTY_${element.line}`] },
        { "name": table[date][14][`__EMPTY_${element.line + 1}`], "cabinet": table[date][14][`__EMPTY_${element.line}`] },
        { "name": table[date][15][`__EMPTY_${element.line + 1}`], "cabinet": table[date][15][`__EMPTY_${element.line}`] },
        { "name": table[date][16][`__EMPTY_${element.line + 1}`], "cabinet": table[date][16][`__EMPTY_${element.line}`] },
        { "name": table[date][17][`__EMPTY_${element.line + 1}`], "cabinet": table[date][17][`__EMPTY_${element.line}`] },
        { "name": table[date][18][`__EMPTY_${element.line + 1}`], "cabinet": table[date][18][`__EMPTY_${element.line}`] },
        { "name": table[date][19][`__EMPTY_${element.line + 1}`], "cabinet": table[date][19][`__EMPTY_${element.line}`] }]
    },
    {
      "day": thirdDay, "plan": [
        { "name": table[date][22][`__EMPTY_${element.line + 1}`], "cabinet": table[date][22][`__EMPTY_${element.line}`] },
        { "name": table[date][23][`__EMPTY_${element.line + 1}`], "cabinet": table[date][23][`__EMPTY_${element.line}`] },
        { "name": table[date][24][`__EMPTY_${element.line + 1}`], "cabinet": table[date][24][`__EMPTY_${element.line}`] },
        { "name": table[date][25][`__EMPTY_${element.line + 1}`], "cabinet": table[date][25][`__EMPTY_${element.line}`] },
        { "name": table[date][26][`__EMPTY_${element.line + 1}`], "cabinet": table[date][26][`__EMPTY_${element.line}`] },
        { "name": table[date][27][`__EMPTY_${element.line + 1}`], "cabinet": table[date][27][`__EMPTY_${element.line}`] },
        { "name": table[date][28][`__EMPTY_${element.line + 1}`], "cabinet": table[date][28][`__EMPTY_${element.line}`] }]
    },
    {
      "day": fourthDay, "plan": [
        { "name": table[date][31][`__EMPTY_${element.line + 1}`], "cabinet": table[date][31][`__EMPTY_${element.line}`] },
        { "name": table[date][32][`__EMPTY_${element.line + 1}`], "cabinet": table[date][32][`__EMPTY_${element.line}`] },
        { "name": table[date][33][`__EMPTY_${element.line + 1}`], "cabinet": table[date][33][`__EMPTY_${element.line}`] },
        { "name": table[date][34][`__EMPTY_${element.line + 1}`], "cabinet": table[date][34][`__EMPTY_${element.line}`] },
        { "name": table[date][35][`__EMPTY_${element.line + 1}`], "cabinet": table[date][35][`__EMPTY_${element.line}`] },
        { "name": table[date][36][`__EMPTY_${element.line + 1}`], "cabinet": table[date][36][`__EMPTY_${element.line}`] },
        { "name": table[date][37][`__EMPTY_${element.line + 1}`], "cabinet": table[date][37][`__EMPTY_${element.line}`] }]
    },
    {
      "day": fifthDay, "plan": [
        { "name": table[date][40][`__EMPTY_${element.line + 1}`], "cabinet": table[date][40][`__EMPTY_${element.line}`] },
        { "name": table[date][41][`__EMPTY_${element.line + 1}`], "cabinet": table[date][41][`__EMPTY_${element.line}`] },
        { "name": table[date][42][`__EMPTY_${element.line + 1}`], "cabinet": table[date][42][`__EMPTY_${element.line}`] },
        { "name": table[date][43][`__EMPTY_${element.line + 1}`], "cabinet": table[date][43][`__EMPTY_${element.line}`] },
        { "name": table[date][44][`__EMPTY_${element.line + 1}`], "cabinet": table[date][44][`__EMPTY_${element.line}`] },
        { "name": table[date][45][`__EMPTY_${element.line + 1}`], "cabinet": table[date][45][`__EMPTY_${element.line}`] },
        { "name": table[date][46][`__EMPTY_${element.line + 1}`], "cabinet": table[date][46][`__EMPTY_${element.line}`] }]
    }]
  };
});


// console.log(result.PRd4410.week[0]);
// console.log(result.PRd4410.week[1]);
// console.log(result.PRd4410.week[2]);
// console.log(result.PRd4410.week[3]);
// console.log(result.PRd4410.week[4]);

const resultjson = JSON.stringify(result, null, 4);
fs.writeFile("thing.json", resultjson, function (err, result) {
  if (err) console.log('error', err);
});

// дОДЕЛАТЬ: проверить первый символ каждого названия группы, если это "*" - скипаем первый символ