import React, { useState } from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  @media screen and (min-width: 550px) {
    position: absolute;
    bottom: 0;
    padding-top: 0;
    width: 80%;
    display: flex;
  }

  margin-top: 36px;
  width: 100%;
  height: 120px;
  padding: 8px 12px;
  border-top: 1px solid #00000012;

  .subscribe {
    p {
      font-size: 0.9em;
      font-weight: bold;
      color: #858585;
      padding: 0;
    }

    .submit-button {
      margin-left: 4px;
    }
  }
`;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const _updateEmail = (event: {target: HTMLInputElement}) => {
    setEmail(event.target.value);
  };

  const _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  console.log(email)

  return (
    <FooterWrapper>
      <div className='subscribe'>
        <p>Subscribe to Updates</p>

        <form onSubmit={_handleSubmit}>
          <label hidden>Email</label>
          <input type="email" inputMode="email" placeholder="Email" onChange={_updateEmail}/>
          <input className='submit-button' type="submit" value="Submit" />
        </form>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
