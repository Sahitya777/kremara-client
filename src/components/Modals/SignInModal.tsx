import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  ModalBody,
  ModalCloseButton,
  Card,
  Text,
  Checkbox,
  Tooltip,
  Box,
  NumberInput,
  NumberInputField,
  Portal,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const SignInModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputAmount, setinputAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [buttonId, setButtonId] = useState(0);


  return (
    <div>
      <Button onClick={onOpen} >
        {buttonText}
      </Button>
      <Portal>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ width: "700px", height: "120px" }}
          isCentered
        >
          <ModalOverlay bg="rgba(244, 242, 255, 0.5);" mt="4.5rem" />
          <ModalContent
            color="white"
            borderRadius="md"
            maxW="462px"
            zIndex={1}
            mt="8rem"
            className="modal-content"
          >
            <ModalHeader
              mt="1rem"
              fontSize="14px"
              fontWeight="600"
              fontStyle="normal"
              lineHeight="20px"
              color="black"
              textAlign="center"
            >
              Welcome back
            </ModalHeader>
            <ModalCloseButton mt="1rem" mr="1rem" />
            <ModalBody>
                <Box color="black" display="flex" flexDirection="column" gap="1rem" mb="1rem">
                <Box display="flex" justifyContent="space-around" cursor="pointer" border="1px solid grey" borderRadius="6px" padding="8px" onClick={()=>{
                  signIn('google')
                }}>
                    <Text>
                      Sign in with Google
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-around" cursor="pointer" border="1px solid grey" borderRadius="6px" padding="8px" onClick={()=>{
                    signIn('github')
                  }}>
                    <Text>
                      Sign in with Github
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-around" cursor="pointer" border="1px solid grey" borderRadius="6px" padding="8px" onClick={()=>{
                    signIn('twitter')
                  }}>
                    <Text>
                      Sign in with Twitter
                    </Text>
                  </Box>
                </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </div>
  );
};
export default SignInModal;
