import express from 'express';
import cors from 'cors';


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


app.listen(8080, () => {
  console.log('Listening port 8080');
});
