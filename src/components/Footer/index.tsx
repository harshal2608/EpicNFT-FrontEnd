import React from 'react';
import styled from 'styled-components';
import Twitter from '../../assets/twitter_logo.svg';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

const Image = styled.img`
  height: 35px;
  width: 35px;
`;

const FooterText = styled.a`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

function Footer() {
  return (
    <FooterWrapper>
      <Image src={Twitter} />
      <FooterText
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`built on @${TWITTER_HANDLE}`}</FooterText>
    </FooterWrapper>
  );
}

export default Footer;
