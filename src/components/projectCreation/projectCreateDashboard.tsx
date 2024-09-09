import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import { useStarknetkitConnectModal } from "starknetkit";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect } from "@starknet-react/core";
import Link from "next/link";

const ProjectCreateDashboard = () => {
    const [signedVerification, setsignedVerification] = useState(true)
    const [radioValue, setRadioValue] = useState('1')
    const { starknetkitConnectModal: starknetkitConnectModal1 } =
    useStarknetkitConnectModal({
      modalMode: 'canAsk',
      modalTheme: 'dark',
      connectors: MYCONNECTORS,
    });
    const { address, connector } = useAccount();
    const { connect, connectors } = useConnect();
    const connectWallet = async () => {
      try {
        const result = await starknetkitConnectModal1();
  
        connect({ connector: result.connector });
      } catch (error) {
        console.warn('connectWallet error', error);
        try {
          const result = await starknetkitConnectModal1();
          connect({ connector: result.connector });
        } catch (error) {
          console.error('connectWallet error', error);
          alert('Error connecting wallet');
        }
      }
    };
  return (
    <Container maxW="container.lg" p={4} mt="1rem" width="100%">
      <Box textAlign="center" mb={6}>
        <Box fontSize="2xl" fontWeight="bold">
          Register Your Project
        </Box>
        <Box mt={2} mb={4} fontSize="sm">
          Registering your project enhances visibility, allowing you to reach a
          broader audience and attract potential users or partners. It will be
          prominently showcased on our platform, highlighting its unique
          features and benefits to the community.
        </Box>
      </Box>

      <Box as="form">
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Project Title</FormLabel>
            <Input placeholder="Enter the title of your project" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Project Description</FormLabel>
            <Textarea placeholder="Describe your project, your vision, and the problem it addresses" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Project Thumbnail</FormLabel>
            <Input type="file" accept="image/*" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Website Link</FormLabel>
            <Input type="url" placeholder="Link to your Project site" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Contact Email</FormLabel>
            <Input type="email" placeholder="Enter your contact email" />
          </FormControl>

          <FormControl>
            <FormLabel>Social Media Handles</FormLabel>
            <Textarea placeholder="Enter your social media handles (e.g., Twitter, Instagram)" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select>
              <option>Graphic Design</option>
              <option>Web Design</option>
              <option>UI/UX</option>
              <option>Illustrations</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Tools and Technologies Used</FormLabel>
            <Textarea placeholder="List the tools, software, and technologies used in your project" />
          </FormControl>

          <Divider my={4} />

          <FormControl isRequired>
            <FormLabel>Project Category</FormLabel>
            <Select>
              <option>DeFi</option>
              <option>NFT</option>
              <option>DAO</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Technology Stack</FormLabel>
            <Textarea placeholder="List the technologies used (e.g., Solidity, React)" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>GitHub Repository URL</FormLabel>
            <Input
              type="url"
              placeholder="Enter the link to your GitHub repository"
            />
          </FormControl>

          <FormControl as="fieldset" isRequired>
            <FormLabel as="legend">Verification Method</FormLabel>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
                      <Stack spacing={4} direction="row">
                        <Radio
                          // variant="primary"
                          value="1"
                          // border

                          borderColor="#2B2F35"
                          colorScheme="customPurple"
                          // bg="black"
                          _checked={{
                            bg: 'black',
                            color: 'white',
                            borderWidth: '5px',
                            borderColor: '#4D59E8',
                          }}
                          bg="#676D9A1A"
                          _focus={{ boxShadow: 'none', outline: '0' }}
                          // onClick={() => {
                          //   setMethod("ADD_LIQUIDITY");
                          // }}
                        >
                          Signed Verification
                        </Radio>
                        <Radio
                          fontSize="sm"
                          value="2"
                          // bg="#2B2F35"
                          borderColor="#2B2F35"
                          colorScheme="customPurple"
                          // bg="black"
                          _checked={{
                            bg: 'black',
                            color: 'white',
                            borderWidth: '5px',
                            borderColor: '#4D59E8',
                          }}
                          bg="#676D9A1A"
                          _focus={{ boxShadow: 'none', outline: '0' }}
                          // onClick={() => {
                          //   setMethod("SWAP");
                          // }}
                        >
                          Profile/Handles
                        </Radio>
                      </Stack>
                    </RadioGroup>
          </FormControl>

          {radioValue==='1' && (
            <Box>
              <Box>
                <Text>
                  Text for verification info
                </Text>
              </Box>
              {address ?
              <Box>
                {address}
              </Box>:<Button onClick={()=>{
                connectWallet()
              }}>
                Connect
              </Button>}
              {address &&
              <Button>
                  Write call for signed part
              </Button>

              }

            </Box>
          )}

          {radioValue==='2' && (
            <>
              <FormControl isRequired>
                <FormLabel>Social Media Handles</FormLabel>
                <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Telegram" />
                        </InputGroup>
                        <InputGroup mt="1rem">
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Linkedin" />
                        </InputGroup>
                        <InputGroup mt="1rem">
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Twitter" />
                        </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Additional Information</FormLabel>
                <Textarea placeholder="Provide any additional context or details here" />
              </FormControl>
            </>
          )}

          <FormControl isRequired>
            <Checkbox display="flex">
              <Box display="flex" gap="0.2rem">
                <Text>
                  I agree to the 
                </Text>
                <Link href="" target="_blank">
                  <Text textDecoration="underline" color="blue">
                    Terms and Conditions
                  </Text>
                </Link>
                <Text>
                  and
                </Text>
                <Link href="" target="_blank">
                  <Text textDecoration="underline" color="blue">
                    Privacy Policy
                  </Text>
                </Link>
              </Box>
              
            </Checkbox>
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Register Project
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProjectCreateDashboard;
