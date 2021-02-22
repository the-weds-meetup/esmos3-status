import fs from 'fs';
import path from 'path';

import { CheckServerStatus } from './src/networking';

const isProduction = process.env.NODE_ENV === 'production';

if (!fs.existsSync('temp')) {
  fs.mkdirSync('temp');
}

const main = async () => {
  // create file
  const filename = path.join('temp', 'server_status.json');
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }

  // get server status, dead or alive
  const serverStatus  = await CheckServerStatus();
  const results = {
    time: Date.now(),
    data: serverStatus,
  }
  
  // write contents to a file
  fs.writeFileSync(
    filename,
    JSON.stringify(results, null, isProduction ? 0 : 2)
  );
}

main();