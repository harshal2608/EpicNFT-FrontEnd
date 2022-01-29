import React from 'react';
import { StyledDialogContent, StyledDialogOverlay } from './index';
import { TailSpin } from 'react-loader-spinner';
import '@reach/dialog/styles.css';
import styled from 'styled-components';
import { useGlobalModalContext } from '../../context/globalModal';

const Message = styled.p`
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  color: white;
`;
const Margin = styled.div`
  margin: 20px 0;
`;

const LoadingModal = () => {
  const { store } = useGlobalModalContext();
  const { modalProps } = store;
  const { message } = modalProps;
  return (
    <StyledDialogOverlay isOpen={true}>
      <StyledDialogContent aria-label="dialog content">
        <Message>Please Wait... </Message>
        <Margin>
          <TailSpin color="#ffffff" />
        </Margin>
        <Message> {message}</Message>
      </StyledDialogContent>
    </StyledDialogOverlay>
  );
};

export { LoadingModal };
