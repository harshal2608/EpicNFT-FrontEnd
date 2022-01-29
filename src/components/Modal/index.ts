import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';

export { LoadingModal } from './LoadingModal';
export { ErrorModal } from './ErrorModal';
export { SuccessModal } from './SuccessModal';

export const StyledDialogOverlay = styled(DialogOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 2rem;
  width: max-content;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: center;
  background: -webkit-linear-gradient(left, #60c657, #35aee2);
  animation: gradient-animation 4s ease infinite;
  min-width: 250px;
  max-width: 450px;

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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: bold;
`;
