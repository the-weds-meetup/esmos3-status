import React from 'react';
import styled from 'styled-components';

import { StatusColor } from './';

interface StatusTableProps {
  nginx: boolean;
  cat: boolean;
  ticket: boolean;
  pulse: boolean;
}


const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    border: 1px solid #A3A3A3;
    padding: 6px;
    width: 50%;
  }

  .table-data {
    display: flex;

    span {
      margin: 0;
      padding-left: 8px;
    }
  }
`

const StatusTable: React.FC<StatusTableProps> = (props: StatusTableProps) => {
  const { nginx, cat, ticket, pulse } = props;

  return (
      <TableWrapper>
        <tbody>

          <tr>
            <td>
              <div className='table-data'>
                <StatusColor isOnline={nginx}/>
                <span>NGINX</span>
              </div>
            </td>
            <td>
              <div className='table-data'>
                <StatusColor isOnline={cat}/>
                <span>CAT System</span>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div className='table-data'>
                <StatusColor isOnline={ticket}/>
                <span>OSTicket</span>
              </div>
            </td>
            <td>
              <div className='table-data'>
                <StatusColor isOnline={pulse}/>
                <span>Pulse</span>
              </div>
            </td>

          </tr>

        </tbody>
      </TableWrapper>
  )
}

export default StatusTable;
