import React from 'react';
import { useGlobalModalContext } from '../../context/globalModal';
import { StyledDialogContent, StyledDialogOverlay } from './index';
import '@reach/dialog/styles.css';
import styled from 'styled-components';

const SuccessMessage = styled.p`
  font-style: none;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorModal = () => {
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store;
  const { error } = modalProps;
  const handleModalToggle = () => {
    hideModal();
  };

  return (
    <StyledDialogOverlay isOpen={true} onDismiss={handleModalToggle}>
      <StyledDialogContent aria-label="dialog content">
        <button className="close-button" onClick={handleModalToggle}>
          <span aria-hidden>×</span>
        </button>
        {error ? <SuccessMessage>{error}</SuccessMessage> : null}
      </StyledDialogContent>
    </StyledDialogOverlay>
  );
};

export { ErrorModal };
