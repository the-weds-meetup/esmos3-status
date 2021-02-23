import axios, {AxiosError, AxiosResponse} from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface EsmosResponse {
  time: number;
  data: {
    nginx: {
      isAlive: boolean;
      code?: string;
    };
    cat: {
      isAlive: boolean;
      code?: string;
    };
    osticket: {
      isAlive: boolean;
      code?: string;
    };
    pulse: {
      isAlive: boolean;
      code?: string;
    };
  };
}

const Home: React.FC = () => {
  const [nginxStatus, setNginxStatus] = useState(false);
  const [catStatus, setCatStatus] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(false);
  const [pulseStatus, setPulseStatus] = useState(false);
  const [unixTime, setUnixTime] = useState(Date.now);
  const [isDataFetch, setDataFetch] = useState(false);
  
  const DATA_URL = process.env.DATA_URL;

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response: EsmosResponse = await axios.get(DATA_URL+'/server_status.json')
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error.message);
          return undefined;
        });
      
      console.log(response)

      if (response) {
        setNginxStatus(response.data.nginx.isAlive);
        setCatStatus(response.data.cat.isAlive);
        setTicketStatus(response.data.osticket.isAlive);
        setPulseStatus(response.data.pulse.isAlive);
        setUnixTime(response.time);
      }
    };

    getData();
    document.title = 'ESMOS Status';
  }, []);

  console.log(nginxStatus)

  return (
    <>
      <h1>G3T3 ESMOS System Status</h1>
      <div>
        <p>NGINX Status</p>
        <p>{nginxStatus ? 'up' : 'down'}</p>
      </div>
      <div>
        <p>CAT Status</p>
        <p>{catStatus ? 'up' : 'down'}</p>
      </div>
      <div>
        <p>OSTicket Status</p>
        <p>{ticketStatus ? 'up' : 'down'}</p>
      </div>
      <div>
        <p>Pulse Status</p>
        <p>{pulseStatus ? 'up' : 'down'}</p>
      </div>
    </>
  )
}

export default Home;
