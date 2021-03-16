import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface StatusColorProps {
  isOnline?: boolean;
}

const ColorContainerOnline = styled.div`
  height: 16px;
  width: 16px;
  background-color: #2A990B;
  border-radius: 50%;
  position: relative;
  top: 1px;
`

const ColorContainerOffline = styled.div`
  height: 16px;
  width: 16px;
  background-color: #CF2017;
  border-radius: 50%;
  position: relative;
  top: 1px;
`

const StatusColor: React.FC<StatusColorProps> = (props: StatusColorProps) => {
  const { isOnline } = props;

  return isOnline ? (<ColorContainerOnline />) : (<ColorContainerOffline />);
}

StatusColor.defaultProps = {
  isOnline: false,
}

export default StatusColor;
