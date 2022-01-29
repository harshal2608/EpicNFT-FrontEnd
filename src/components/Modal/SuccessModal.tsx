import React from 'react';
import { StyledDialogContent, StyledDialogOverlay, Row, Header } from './index';
import { useGlobalModalContext } from '../../context/globalModal';
import '@reach/dialog/styles.css';
import styled from 'styled-components';

const SuccessMessage = styled.a`
  text-decoration: none;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
const SuccessModal = () => {
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store;
  const { message } = modalProps;
  const handleModalToggle = () => {
    hideModal();
  };

  return (
    <StyledDialogOverlay isOpen={true} onDismiss={handleModalToggle}>
      <StyledDialogContent aria-label="dialog content">
        <Row>
          <Header>Success</Header>
        </Row>
        {message ? (
          <SuccessMessage
            href={`https://rinkeby.etherscan.io/tx/${message}`}
            target="_blank"
          >
            See the transaction here.
          </SuccessMessage>
        ) : (
          <SuccessMessage>null</SuccessMessage>
        )}
      </StyledDialogContent>
    </StyledDialogOverlay>
  );
};

export { SuccessModal };
