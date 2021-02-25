interface dataProps {
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
}

const UpdateDownCount = (
  data: dataProps,
  counter: Record<string, unknown> | undefined
): Record<string, number> => {
  let nginxCount = counter?.nginx ? parseInt(`${counter.nginx}`) : 0;
  let catCount = counter?.cat ? parseInt(`${counter.cat}`) : 0;
  let pulseCount = counter?.pulse ? parseInt(`${counter.pulse}`) : 0;
  let ticketCount = counter?.osticket ? parseInt(`${counter.osticket}`) : 0;

  nginxCount = data.nginx.isAlive ? 0 : nginxCount++;
  catCount = data.cat.isAlive ? 0 : catCount++;
  pulseCount = data.pulse.isAlive ? 0 : pulseCount++;
  ticketCount = data.osticket.isAlive ? 0 : ticketCount++;

  return {
    nginx: nginxCount,
    cat: catCount,
    osticket: ticketCount,
    pulse: pulseCount,
  };
};

export default UpdateDownCount;
