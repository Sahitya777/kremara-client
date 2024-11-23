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
  List,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStarknetkitConnectModal } from "starknetkit";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import Link from "next/link";
import { TypedData } from "starknet";
import useBalanceOf from "@/Blockchain/hooks/useBalanceOf";
import { tokenAddressMap } from "@/Blockchain/utils/addressesService";
import { VerifySignature } from "../verificationSigning";
import { toast } from "react-toastify";
import STRKLogo from "@/assets/icons/strk";

const ProjectCreateDashboard = () => {
  const [message, setMessage] = useState<any>("Hello, StarkNet!");
  const [signature, setSignature] = useState<any>(null);

  const [users, setUsers] = useState([]); // All users fetched from the backend
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [filteredUsers, setFilteredUsers] = useState<any>([]); // Filtered users based on search
  const [moderators, setModerators] = useState<any>([]);
  const [verificationMailSent, setverificationMailSent] = useState(false);
  const [contractAddress, setcontractAddress] = useState("");
  const [projectName, setprojectName] = useState("");
  const [
    verificationMethodSocialMedialDetails,
    setverificationMethodSocialMedialDetails,
  ] = useState("");
  const [additionalInfoVerification, setadditionalInfoVerification] =
    useState("");
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectThumbnail: null,
    websiteLink: "",
    contactEmail: "",
    projectCategory: "Defi",
    githubRepo: "",
    moderators: [],
    verificationMethod: "1",
    socialMediaHandles: "",
    toolsAndTech: "",
    verificationDetails: null,
    checksAgreed: false,
  });
  // console.log(formData,'data')

  const isFormValid = () => {
    return (
      formData.projectTitle &&
      formData.projectDescription &&
      formData.projectThumbnail !== null &&
      formData.contactEmail &&
      formData.projectCategory &&
      formData.verificationMethod &&
      formData.verificationDetails &&
      formData.checksAgreed
    );
  };
  useEffect(() => {
    isFormValid();
  }, [formData]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSendEmail = () => {
    const email = "sahitya@gmail.com";
    const subject = "Verification Message";
    const body = "Hello from StarkFarm with my email: user@example.com";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Yay!!!!");
    // Submit logic here
    console.log("Form submitted", formData);
  };
  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     try {
  //       const response = await fetch("/api/getAllUsers");
  //       const data = await response.json();
  //       setUsers(data.users || []); // Adjust based on your API response
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchAllUsers();
  // }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter(
      (user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAddModerator = (user: any) => {
    setModerators((prev: any) => [...prev, user]);
    setSearchTerm("");
    setFilteredUsers([]);
  };

  const handleRemoveModerator = (userId: any) => {
    setModerators((prev: any) => prev.filter((mod: any) => mod.id !== userId));
  };

  const { starknetkitConnectModal: starknetkitConnectModal1 } =
    useStarknetkitConnectModal({
      modalMode: "canAsk",
      modalTheme: "dark",
      connectors: MYCONNECTORS,
    });
  const { address, connector, account } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const connectWallet = async () => {
    try {
      const result = await starknetkitConnectModal1();

      connect({ connector: result.connector });
    } catch (error) {
      console.warn("connectWallet error", error);
      try {
        const result = await starknetkitConnectModal1();
        connect({ connector: result.connector });
      } catch (error) {
        console.error("connectWallet error", error);
        alert("Error connecting wallet");
      }
    }
  };
  const handleSignMessage = async () => {
    if (!account) {
      console.error("No account connected");
      return;
    }
    try {
      const timestamp: number = Math.floor(Date.now() / 1000); // Current timestamp
      const message: any = `Verify ownership of project: Owner's address = ${address} \n Project name = kremara \n Deployed contract =  \n Timestamp = ${timestamp}`;
      const typedData: TypedData = {
        domain: {
          name: "Starknet Verification",
          version: "1",
          chainId: await account.getChainId(), // For sepolia different and for mainnet different
          // Contract address of the account
        },
        message: {
          address: address,
          contractAddress: contractAddress,
          projectName: projectName,
          timestamp: timestamp,
        },
        primaryType: "Verification",
        types: {
          StarkNetDomain: [
            { name: "name", type: "string" },
            { name: "version", type: "felt" },
            { name: "chainId", type: "felt" },
          ],
          Verification: [
            { name: "address", type: "felt" },
            { name: "contractAddress", type: "felt" },
            { name: "projectName", type: "string" },
            { name: "timestamp", type: "uint" }, // root of a merkle tree
          ],
        },
      };
      const signedMessage = (await account.signMessage(typedData)) as string[];
      const sig_len = signedMessage.length;
      const signature =
        sig_len > 2 ? signedMessage.slice(sig_len - 2, sig_len) : signedMessage;
      const res = await VerifySignature(
        typedData,
        account.address,
        JSON.stringify(signature)
      );
      if (res) {
        setFormData((prevData:any) => ({
          ...prevData,
          verificationDetails: {
            mesage: typedData,
            address: account.address,
            signature: JSON.stringify(signature),
          },
        }));
        toast.success("Successfully Signed", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  useEffect(() => {
    if (formData.verificationMethod === "3") {
      if (verificationMailSent) {
        setFormData((prevData:any) => ({
          ...prevData,
          verificationDetails: {
            mailSent: verificationMailSent,
          },
        }));
      }else{
        setFormData((prevData:any) => ({
          ...prevData,
          verificationDetails: null,
        }));
      }
    }else if(formData.verificationMethod==='2'){
      if(verificationMethodSocialMedialDetails){
        setFormData((prevData:any) => ({
          ...prevData,
          verificationDetails: {
            socialMediaDetails:verificationMethodSocialMedialDetails,
            additionalInfoVerification:additionalInfoVerification
          },
        }));
      }else{
        setFormData((prevData:any) => ({
          ...prevData,
          verificationDetails: null,
        }));
      }
    }
  }, [formData.verificationMethod, verificationMailSent,verificationMethodSocialMedialDetails,additionalInfoVerification]);

  return (
    <Container maxW="container.lg" p={4} mt="1rem" width="100%">
      <Box textAlign="center" mb={6}>
        <Box fontSize="2xl" fontWeight="bold">
          Register Your Project
        </Box>
        <Box mt={2} mb={4} fontSize="sm">
          Registering your project enhances visibility, allowing you to reach a
          broader audience and attract potential users or partners.
        </Box>
      </Box>

      <Box as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Project Title</FormLabel>
            <Input
              name="projectTitle"
              placeholder="Enter the title of your project"
              value={formData.projectTitle}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Project Description</FormLabel>
            <Textarea
              name="projectDescription"
              placeholder="Describe your project, your vision, and the problem it addresses"
              value={formData.projectDescription}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Project Thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              placeholder="Image files only (e.g., JPG, PNG)"
              name="projectThumbnail"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Website Link</FormLabel>
            <Input
              type="url"
              name="websiteLink"
              placeholder="Link to your Project site"
              value={formData.websiteLink}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Contact Email</FormLabel>
            <Input
              type="email"
              name="contactEmail"
              placeholder="Enter your contact email"
              value={formData.contactEmail}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Social Media Handles</FormLabel>
            <Textarea
              name="socialMediaHandles"
              placeholder="Enter your social media handles (e.g., Twitter, Instagram) full links"
              value={formData.socialMediaHandles}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Add as Moderators</FormLabel>

            <Box display="flex" mt="0" background="none" marginTop="0.5rem">
              <InputGroup
                // width="650px"
                mt="0rem"
                border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                borderRight="0px"
                borderRadius="6px 0px 0px 6px"
                height="50px"
                bg="white"
              >
                <Input
                  fontSize="16px"
                  height="100%"
                  border="none"
                  pl="0.5rem"
                  color="black"
                  type="email"
                  placeholder="enter the email of moderator"
                  _placeholder={{}}
                  value={searchTerm}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                  //   value={
                  //     totalBorrow == 0 && totalSupply == 0 ? '****' : refferal
                  //   }
                  paddingInlineStart="0"
                  _focus={{
                    outline: "0",
                    boxShadow: "none",
                  }}
                  //   onChange={handleChange}
                />
              </InputGroup>
              <Box
                cursor="pointer"
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingLeft="16px"
                paddingRight="16px"
                borderRightRadius="6px"
                bg="#323FF4"
                onClick={() => {
                  // handleSearch()
                  // handleCopyClick()
                }}
              >
                Search
              </Box>
            </Box>
          </FormControl>
          {moderators.length>0 &&<Box mt={4}>
            <Text fontWeight="bold">Selected Moderators:</Text>
            {moderators.map((mod: any) => (
              <Tag
                size="lg"
                key={mod.id}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                m={1}
              >
                <TagLabel>{mod.name}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveModerator(mod.id)} />
              </Tag>
            ))}
          </Box>}

          <FormControl isRequired>
            <FormLabel>Project Category</FormLabel>
            <Select
              name="projectCategory"
              // placeholder="Select a category"
              value={formData.projectCategory}
              onChange={handleInputChange}
            >
              <option>DeFi</option>
              <option>NFT</option>
              <option>DAO</option>
              <option>Depin</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>GitHub Repository URL</FormLabel>
            <Input
              type="url"
              name="githubRepo"
              placeholder="Enter the link to your GitHub repository"
              value={formData.githubRepo}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tools and Technologies Used</FormLabel>
            <Textarea
              name="toolsAndTech"
              placeholder="List the tools, software, and technologies used in your project"
              value={formData.toolsAndTech}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl as="fieldset" isRequired>
            <FormLabel as="legend">Verification Method</FormLabel>
            <RadioGroup
              name="verificationMethod"
              value={formData.verificationMethod}
              onChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  verificationMethod: value,
                }))
              }
            >
              <Stack spacing={4} direction="row">
                <Radio value="1">Signed Verification</Radio>
                <Radio value="2">Profile/Handles</Radio>
                <Radio value="3">Autogenerated Mail</Radio>
              </Stack>
            </RadioGroup>
            {formData?.verificationMethod === "1" && (
              <Box>
                <Box>
                  <Text>Text for verification info</Text>
                </Box>
                {address ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="0.3rem"
                    mt="0.5rem"
                    mb="0.5rem"
                  >
                    <STRKLogo width={16} height={16} />
                    {address}
                    <Button
                      onClick={() => {
                        setFormData((prevData:any) => ({
                          ...prevData,
                          verificationDetails: null,
                        }));
                        disconnectAsync();
                      }}
                    >
                      Disconnect Wallet
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Connect
                  </Button>
                )}
                {address && (
                  <FormControl isRequired>
                    <FormLabel>Enter Project Name</FormLabel>
                    <Input
                      name="projectName"
                      placeholder="Enter the project Name"
                      value={projectName}
                      onChange={(e) => {
                        setprojectName(e.target.value);
                      }}
                    />
                  </FormControl>
                )}
                {address && (
                  <FormControl isRequired mt="0.5rem">
                    <FormLabel>Enter Deployed Contract Address</FormLabel>
                    <Input
                      name="contractAddress"
                      placeholder="Enter the deployed contract address"
                      value={contractAddress}
                      onChange={(e) => {
                        setcontractAddress(e.target.value);
                      }}
                    />
                  </FormControl>
                )}
                {address && (
                  <Button
                    mt="0.4rem"
                    onClick={() => {
                      handleSignMessage();
                    }}
                    isDisabled={projectName == "" || contractAddress === ""}
                    marginTop="0.5remS"
                  >
                    Sign Verification Message
                  </Button>
                )}
              </Box>
            )}

            {formData?.verificationMethod === "2" && (
              <>
                <FormControl isRequired>
                  <FormLabel>Social Media Handles</FormLabel>
                  <Textarea
                    name="any"
                    placeholder="Enter your social media handles (e.g., Twitter, Instagram) full links"
                    value={verificationMethodSocialMedialDetails}
                    onChange={(e) => {
                      setverificationMethodSocialMedialDetails(e.target.value);
                    }}
                    // value={formData.socialMediaHandles}
                    // onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt="0.5rem">
                  <FormLabel>Additional Information</FormLabel>
                  <Textarea placeholder="Provide any additional context or details here" />
                </FormControl>
              </>
            )}

            {formData?.verificationMethod === "3" && (
              <Box>
                <FormControl isRequired>
                  <Button
                    onClick={() => {
                      handleSendEmail();
                    }}
                  >
                    Send mail
                  </Button>
                </FormControl>
                <Checkbox
                  name="checksAgreed"
                  isChecked={verificationMailSent}
                  onChange={() => {
                    setverificationMailSent(!verificationMailSent);
                  }}
                >
                  I Have sent a mail to you
                </Checkbox>
              </Box>
            )}
          </FormControl>

          <FormControl isRequired>
            <Checkbox
              name="checksAgreed"
              isChecked={formData.checksAgreed}
              onChange={handleInputChange}
            >
              I agree to the{" "}
              <Link
                href=""
                target="_blank"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href=""
                target="_blank"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Privacy Policy
              </Link>
            </Checkbox>
          </FormControl>

          <Button type="submit" colorScheme="teal" isDisabled={!isFormValid()}>
            Register Project
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProjectCreateDashboard;
