import React from "react";
import {
  Container,
  Heading,
  Button,
  ButtonGroup,
  Text,
  Flex,
  Spacer,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const Modal = ({ isModalOpen, closeModal, children }) => {
  return (
    <Backdrop isModalOpen={isModalOpen}>
      <ModalContainer open={isModalOpen}>
        <CloseButton
          onClick={closeModal}
        >
          <IoClose fontSize='20px' />
        </CloseButton>
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.40);
  display: ${(props) => (props.isModalOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.dialog`
  /* transform: translate(-50%, -50%) !important; */
  /* background-color: var(--primary-white); */
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1001;
  padding: 1rem;
  min-width: 30rem;
  border-radius: 1rem;
  border: none;
`;

const CloseButton = styled.button `
    position: absolute;
    right: 20px;
`
