import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import myEpicNft from '../../utils/myEpicNft.json';

const CONTRACT_ADDRESS = '0xaa5EA07E198e1c9aE5980b53776e2dD9f90c5B84';
declare let window: any;

const HeaderWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  const [currentAccount, setCurrentAccount] = useState('');
  const [totalNFT, setTotalNFT] = useState(0);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Make Sure You Have Metamask!');
    } else {
      console.log('We Have The Ethereum Object', ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);

      setupEventListener();
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get Metamask');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
          getTotalNumber();
        });
        // getTotalNumber();
        console.log(totalNFT);
        console.log('Setup event listener!');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connetedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log('GOing to pop up wallet now to pay gas...');
        let nftTxn = await connetedContract.makeAnEpicNFT();

        console.log('Mining... please wait.');
        await nftTxn.wait();

        console.log(
          `Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log('Ethereum Object doesnt exist');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalNumber = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connetedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        let nftNumber = await connetedContract.getTotalNFTsMintedSoFar();
        setTotalNFT(parseInt(nftNumber._hex, 16));
        // await nftNumber.wait();

        console.log(nftNumber._hex);
      } else {
        console.log('Ethereum Object doesnt exist');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const HandleCollectionButton = () => {
    window.open(
      `https://testnets.opensea.io/assets?search[query]=${CONTRACT_ADDRESS}`
    );
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getTotalNumber();
  }, []);
  useEffect(() => {
    getTotalNumber();
  }, [setTotalNFT]);

  const renderNotConnectedContainer = () => (
    // <CTAButton>
    <ConnectWalletButton onClick={connectWallet}>
      Connect to Wallet
    </ConnectWalletButton>
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
      {/* {renderNotConnectedContainer()} */}
      {currentAccount === '' ? (
        renderNotConnectedContainer()
      ) : (
        <ConnectWalletButton onClick={askContractToMintNft}>
          Mint NFT
        </ConnectWalletButton>
      )}
      <ConnectWalletButton onClick={HandleCollectionButton}>
        See My Collection
      </ConnectWalletButton>
      <GradientText>{`Total ${totalNFT}/50`}</GradientText>
    </HeaderWrapper>
  );
};

export default Header;
