import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import myEpicNft from '../../utils/myEpicNft.json';
import { useGlobalModalContext, MODAL_TYPES } from '../../context/globalModal';

const CONTRACT_ADDRESS = '0xaa5EA07E198e1c9aE5980b53776e2dD9f90c5B84';
// https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}

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
  font-size: 1.3rem;
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
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const ConnectWalletButton = styled(CTAButton)`
  background: -webkit-linear-gradient(left, #60c657, #35aee2);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;

  &:disabled {
    background: grey;
    cursor: not-allowed;
  }

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
  const { showModal, hideModal } = useGlobalModalContext();
  const loadingModal = (loadingmessage: string) => {
    showModal(MODAL_TYPES.LOADING_MODAL, { message: loadingmessage });
  };
  const errorModal = (error: string) => {
    showModal(MODAL_TYPES.ERROR_MODAL, { error: error });
  };
  const successModal = (successmessage: string) => {
    showModal(MODAL_TYPES.SUCCESS_MODAL, { message: successmessage });
  };

  const [currentAccount, setCurrentAccount] = useState('');
  const [totalNFT, setTotalNFT] = useState(0);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      errorModal("You Don't Have Metamask.");
      return;
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];

      setCurrentAccount(account);
      let chainId = await ethereum.request({ method: 'eth_chainId' });

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = '0x4';
      if (chainId !== rinkebyChainId) {
        errorModal('You are not connected to the Rinkeby Test Network!');
      }
      setupEventListener();
      getTotalNumber();
    } else {
      errorModal('No authorized account found');
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        errorModal('get Metamask');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener();
      getTotalNumber();
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

          // successModal(tokenId);
          getTotalNumber();
        });
      } else {
        errorModal("Ethereum Object Doesn't Exist");
      }
    } catch (error) {
      errorModal(error);
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

        loadingModal('Waiting For Confirmation');
        let nftTxn = await connetedContract.makeAnEpicNFT();
        hideModal();
        loadingModal('Minting...');
        await nftTxn.wait();
        hideModal();
        successModal(nftTxn.hash);
      } else {
        errorModal('Ethereum Object doesnt exist');
      }
    } catch (e) {
      errorModal(e);
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
  }, []);

  return (
    <HeaderWrapper>
      <GradientText>
        <Heading>My NFT Collection </Heading>
      </GradientText>

      <Description>
        Each unique. Each beautiful. Discover your NFT today.
      </Description>

      {currentAccount === '' ? (
        <ConnectWalletButton onClick={connectWallet}>
          Connect to Wallet
        </ConnectWalletButton>
      ) : (
        <ConnectWalletButton
          disabled={totalNFT === 50}
          onClick={askContractToMintNft}
        >
          Mint NFT
        </ConnectWalletButton>
      )}
      <ConnectWalletButton onClick={HandleCollectionButton}>
        See My Collection
      </ConnectWalletButton>
      {currentAccount ? (
        <GradientText>{` ${totalNFT}/50 NFTs Minted So Far`}</GradientText>
      ) : null}
    </HeaderWrapper>
  );
};

export default Header;
