import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import Mustache from 'mustache';
import nodemailer, { SendMailOptions } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

const SERVER_NAMES: Record<string, string> = {
  cat: 'CAT',
  pulse: 'Pulse',
  osticket: 'OSTicket',
};

const SALUTATIONS: string[] = [
  'Best Regards,',
  'Yours Sincerely,',
  'Warmest Regards,',
];

const getRecentServerDown = (data: Record<string, number>): string[] => {
  const keys = Object.keys(data);
  const serverRecords = [];

  for (const key of keys) {
    if (data[key] === 1 || !isProduction) {
      if (SERVER_NAMES[key]) {
        serverRecords.push(SERVER_NAMES[key]);
      }
    }
  }
  return serverRecords;
};

const returnServerStrings = (data: string[]): string => {
  let servers = '';
  let count = 0;

  data.forEach((server) => {
    if (count > 0 && count < data.length - 1) {
      servers += `, ${server} `;
    } else if (count > 0 && count === data.length - 1) {
      servers += `and ${server} `;
    } else {
      servers += server;
    }
    count++;
  });

  return servers;
};

const randomSalutations = (): string => {
  return SALUTATIONS[Math.floor(Math.random() * SALUTATIONS.length)];
};

const processEmail = async (
  newList: Record<string, number>,
  oldList: Record<string, number>
): Promise<void> => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    EMAIL_SUBJECT,
    EMAIL_URL,
    TEST_RECIPIENTS,
  } = process.env;

  const recipients: string[] = !isProduction
    ? TEST_RECIPIENTS?.split(',')
    : await axios
        .get(EMAIL_URL + '/email', { timeout: 15000 })
        .then((response: AxiosResponse) => {
          console.log('[Received Emails Recipients]');
          return response.data.data;
        })
        .catch(() => null);

  if (
    !EMAIL_HOST ||
    !EMAIL_PORT ||
    !EMAIL_USER ||
    !EMAIL_PASS ||
    recipients === null
  ) {
    console.error('Missing env var');
    process.exit(1);
  }

  const keysDown: string[] = getRecentServerDown(newList);

  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      secure: EMAIL_SECURE === 'true',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })
  );

  const html = Mustache.render(
    fs.readFileSync('./src/templates/complete.mustache', { encoding: 'utf8' }),
    {
      servers: returnServerStrings(keysDown),
      isAre: keysDown.length > 1 ? 'are' : 'is',
      servicePlural: keysDown.length > 1 ? 'services ' : 'service',
      salutation: randomSalutations(),
    }
  );

  const mailOpts: SendMailOptions = {
    from: EMAIL_FROM,
    bcc: recipients,
    subject: EMAIL_SUBJECT,
    text: 'YES',
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOpts, (error, info) => {
      if (error) {
        reject(error);
        return;
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      resolve();
    });
  });
};

export default processEmail;
