import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const CheckServerStatus = async (): Promise<Record<string, unknown>> => {
  const serverURL = process.env.SERVER_URL;
  const catSystem = ':8000';
  const pulse = ':8001/testpoint';
  const agent = new https.Agent({ rejectUnauthorized: false });

  const isCatAlive = await axios
    .get(`http://${serverURL}${catSystem}`, { timeout: 10000 })
    .then(() => {
      return { isAlive: true };
    })
    .catch((error: AxiosError) => {
      return { isAlive: false, code: error.code };
    });

  const isOSTicketAlive = await axios
    .get(`https://${serverURL}`, { timeout: 10000, httpsAgent: agent })
    .then(() => {
      return { isAlive: true };
    })
    .catch((error: AxiosError) => {
      return { isAlive: false, code: error.code };
    });

  const isPulseAlive = await axios
    .get(`http://${serverURL}${pulse}`, {
      timeout: 10000,
    })
    .then(() => {
      return { isAlive: true };
    })
    .catch((error: AxiosError) => {
      return { isAlive: false, code: error.code };
    });

  return {
    cat: isCatAlive,
    osticket: isOSTicketAlive,
    pulse: isPulseAlive,
  };
};

export default CheckServerStatus;
