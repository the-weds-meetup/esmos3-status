import React, { useMemo } from 'react';
import styled from 'styled-components';

import { StatusColor } from '../';

interface LegendProps {
  nginx: boolean;
  cat: boolean;
  ticket: boolean;
  pulse: boolean;
}

const LegendWrapper = styled.div`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;

  .legend-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 4px;
    padding-bottom: 4px;

    span {
      padding-left: 8px;
    }
  }
`

const StatusLegend: React.FC<LegendProps> = (props: LegendProps) => {
  const { nginx, cat, ticket, pulse } = props;
  const isAllAvailable = useMemo(() => {
    return nginx && cat && ticket && pulse;
  }, [nginx, cat, ticket, pulse]);

  return (
    <LegendWrapper>
      <div className='legend-content'>
        <StatusColor isOnline={true}/>
        <span>Available</span>
      </div>

      {!isAllAvailable && (
        <div className='legend-content'>
          <StatusColor isOnline={false}/>
          <span>Down</span>
        </div>
      )}
    </LegendWrapper>
  );
}

export default StatusLegend;
