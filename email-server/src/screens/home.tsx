import axios, {AxiosError, AxiosResponse} from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { StatusTable, StatusTime } from '../components';

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

const HomeWrapper = styled.div`
  h1 {
    text-align: center
  }
`;

const Home: React.FC = () => {
  const [statusUpdate, setStatusUpdate] = useState({
    nginx: false,
    cat: false,
    ticket: false,
    pulse: false,
  });
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

      if (response) {
        setStatusUpdate({
          nginx: response.data.nginx.isAlive,
          cat: response.data.cat.isAlive,
          ticket: response.data.osticket.isAlive,
          pulse: response.data.pulse.isAlive,
        });
        setUnixTime(response.time);
      }
      setDataFetch(true);
    };

    getData();
  }, []);

  return (
    <HomeWrapper>
      <h1>G3T3 ESMOS System Status</h1>
      
      {isDataFetch && (
        <>
          <StatusTable
            nginx={statusUpdate.nginx}
            cat={statusUpdate.cat}
            ticket={statusUpdate.ticket}
            pulse={statusUpdate.pulse}
          />
          <StatusTime time={unixTime} />
        </>
      )}
    </HomeWrapper>
  )
}

export default Home;
