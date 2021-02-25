import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { default as processEmail } from './src/email/processEmail';
import { CheckServerStatus, UpdateServerDown } from './src/networking';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (!fs.existsSync('temp')) {
  fs.mkdirSync('temp');
}

const isDifferentObject = (
  objectA: Record<string, number>,
  objectB: Record<string, number>
): boolean => {
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  for (const key of keysA) {
    if (objectA[key] !== objectB[key]) {
      return true;
    }
  }
  for (const key of keysB) {
    if (objectA[key] !== objectB[key]) {
      return true;
    }
  }
  return false;
};

const main = async () => {
  // create file
  const filename = path.join('temp', 'server_status.json');
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }

  const serverDownFilename = path.join('temp', 'server_down_count.json');
  let serverDownCount = {
    nginx: 0,
    cat: 0,
    osticket: 0,
    pulse: 0,
  };

  if (fs.existsSync(serverDownFilename)) {
    console.log('Server_Down_Count file found');
    serverDownCount = JSON.parse(fs.readFileSync(serverDownFilename, 'utf-8'));
    fs.unlinkSync(serverDownFilename);
  }

  // get server status, dead or alive
  const serverStatus = await CheckServerStatus();
  const results = {
    time: Date.now(),
    data: serverStatus,
  };
  const newServerDownCount = UpdateServerDown(serverStatus, serverDownCount);

  // write contents to a file
  fs.writeFileSync(
    filename,
    JSON.stringify(results, null, isProduction ? 0 : 2)
  );
  fs.writeFileSync(
    serverDownFilename,
    JSON.stringify(newServerDownCount, null, isProduction ? 0 : 2)
  );

  if (isDifferentObject(newServerDownCount, serverDownCount) || !isProduction) {
    await processEmail(newServerDownCount, serverDownCount);
  }
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
