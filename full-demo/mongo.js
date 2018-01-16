const exec = require('child_process').exec;
const path = require('path');

const bandip = 'localhost',
      dbport = '28073',
      dbpath = './db',
      dblog = 'db.log';

const op = process.argv[2];

if (op === 'open') {
  exec(`mongo --port ${dbport} --eval "db.runCommand({dbHash: 1})"`, (error, stdout, stderr) => {
    if (error) {
      exec(`mongod --bind_ip ${bandip} --port ${dbport} --dbpath ${dbpath} --fork --logpath ${path.join(dbpath, dblog)}`);
    }
    console.log(`[MongoDB] opened at port ${dbport}.\n`);
  });
} else if (op === 'close') {
  exec(`mongo --port ${dbport} admin --eval "db.shutdownServer()"`, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    }
    console.log('[MongoDB] close.\n');
  });
}
