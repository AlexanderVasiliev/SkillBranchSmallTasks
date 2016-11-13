import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import _ from 'lodash';

const app = express();
app.use(cors());


function nameEditor(name) {
  if (name === '') return 'Invalid fullname';
  const pName = name.split(/ +/);
  let sName;
  let correct = true;
  const re = /[0-9_\\\/-]/g;
  console.log(pName);
  pName.forEach(function(item, i) {
    if (i===0 && item === '') {
      pName.shift();
    }
    if (!!item.match(re)){
      correct = false;
      return;
    }
    pName[i] = pName[i].toLowerCase();
    pName[i] = pName[i].substring(0, 1).toUpperCase() + pName[i].substring(1);
  });
  console.log(correct);
    if (correct) {
      switch (pName.length) {
        case 3:
        sName = pName.pop() + ' ' + pName.shift()[0] + '. ' + pName.shift()[0] +'.';
        return sName;
        case 2:
        sName = pName.pop() + ' ' + pName.shift()[0] + '.';
        return sName;
        case 1:
        sName = pName[0].length > 0 ? pName[0] : 'Invalid fullname';
        return sName;
        default: return 'Invalid fullname';
      }
  } else return 'Invalid fullname';
}


app.get('/task2B', (req, res) => {

  const shortName = nameEditor(req.query.fullname);
  console.log(shortName);
  console.log('\n');
  res.send(shortName);
});

//TASK 3A **********************************************************************************************
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });


  function pcPart(path) {

    const toSearch = path.match(/\/task3A\/([a-zA-Z0-9\-\.\[\]]+)\/?([a-zA-Z0-9\-\.\[\]]+)?\/?([a-zA-Z0-9\-\.\[\]]+)?/);
    if (!toSearch) return pc;
    console.log(toSearch);
    if (toSearch[1] === 'volumes') {
      let res = {};
      let c = 0;
      let d = 0;
      pc.hdd.forEach(function (item, i) {
        if (item.volume === 'C:') {
          c += item.size;
        }
        if (item.volume === 'D:') {
          d += item.size;
        }
      });
      res['C:'] = c + 'B';
      res['D:'] = d + 'B';
      return res;
    } else
    if (toSearch[3]) {
      let tmp = _.pick(pc, [toSearch[1]]);
      let tmp2 = _.pick(tmp[toSearch[1]], [toSearch[2]]);
      let res = _.pick(tmp2[toSearch[2]], [toSearch[3]])[toSearch[3]];
      if (res === {} || res === undefined) return 'Not found';
      return res;
    } else
    if (toSearch[2]) {
      let tmp2 = _.pick(pc, [toSearch[1]]);
      let res =  _.pick(tmp2[toSearch[1]], [toSearch[2]])[toSearch[2]];
      if (res === {} || res === undefined) return 'Not found';
       return res;
    } else
    if (toSearch[1]) {
      let res =  _.pick(pc, [toSearch[1]])[toSearch[1]];
      //console.log(res);
      if (res === {} || res === undefined) return 'Not found';
      return res;
    } else return 'Not found';
  }

app.get('/task3A/*', (req, res) => {
  console.log(req.path);
  const ans = pcPart(req.path);
  if (ans === 'Not found') res.status(404).send('Not found');
  else res.status(200).json(ans);
  res.end();
});

//**************************************************************************************************
app.listen(8080, () => {
  console.log('Listening port 8080');
});
