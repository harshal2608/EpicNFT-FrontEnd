import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  padding-top: 30px;
`;
const Heading = styled.div`
  margin: 0;
  font-size: 50px;
  font-weight: bold;
`;
const GradientText = styled.div`
  background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Description = styled.p`
  font-size: 25px;
  color: white;
`;
const CTAButton = styled.button`
  height: 45px;
  border: 0;
  width: max-content;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;
const ConnectWalletButton = styled(CTAButton)`
  background: -webkit-linear-gradient(left, #60c657, #35aee2);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;

  @-webkit-keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Header = () => {
  const renderNotConnectedContainer = () => (
    // <CTAButton>
    <ConnectWalletButton>Connect to Wallet</ConnectWalletButton>
    // </CTAButton>
  );
  return (
    <HeaderWrapper>
      <Heading>
        <GradientText>My NFT Collection</GradientText>
      </Heading>
      <Description>
        Each unique. Each beautiful. Discover your NFT today.
      </Description>
      {renderNotConnectedContainer()}
    </HeaderWrapper>
  );
};

export default Header;
