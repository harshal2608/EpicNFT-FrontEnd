import React, { useState, createContext, useContext } from 'react';
import { LoadingModal, ErrorModal, SuccessModal } from '../components/Modal';

export const MODAL_TYPES = {
  ERROR_MODAL: 'ERROR_MODAL',
  LOADING_MODAL: 'LOADING_MODAL',
  SUCCESS_MODAL: 'SUCCESS_MODAL',
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.LOADING_MODAL]: LoadingModal,
  [MODAL_TYPES.ERROR_MODAL]: ErrorModal,
  [MODAL_TYPES.SUCCESS_MODAL]: SuccessModal,
};

type modalPropsType = {
  modalType: string;
  modalProps?: { message?: string; error?: string };
};
type GlobalModalContext = {
  showModal: (modalType: string, modalProps?: {}) => void;
  hideModal: () => void;
  store: modalPropsType;
};
const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  store: { modalProps: {}, modalType: '' },
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal: React.FC<{}> = ({ children }) => {
  const [store, setStore] = useState<modalPropsType>({
    modalProps: {},
    modalType: '',
  });
  const { modalType, modalProps } = store;

  const showModal = (modalType: string, modalProps: {}) => {
    setStore({
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      modalType: null,
      modalProps: { message: '' },
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
