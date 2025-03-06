import styled from "styled-components";

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerWrapper />
    </SpinnerOverlay>
  );
};

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);  // Optional: adds a semi-transparent background
  display: flex;
  justify-content: center;
  align-items: center;  // Centers the spinner vertically and horizontally
  z-index: 9999;  // Ensures it is displayed above all other content
`;

const SpinnerWrapper = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
