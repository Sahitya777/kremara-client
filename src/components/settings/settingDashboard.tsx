import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const SettingDashboard = () => {
  const [userData, setuserData] = useState();
  const [suggestionScreenshotFilename, setSuggestionScreenshotFilename] =
    useState("");
  const [userTitle, setuserTitle] = useState("");
  const [contentCreatorTabSelected, setcontentCreatorTabSelected] =
    useState(false);
  const [designerTabSelected, setdesignerTabSelected] = useState(false);
  const [suggestionUrl, setSuggestionUrl] = useState("");
  const suggestioninputref: any = useRef();
  const [count, setCount] = useState(1);
  const ApplicationList = [
    {
      id: 1,
      name: "Twitter (X)",
    },
    {
      id: 2,
      name: "Youtube",
    },
    {
      id: 3,
      name: "Medium",
    },
    {
      id: 4,
      name: "Reddit",
    },
    {
      id: 5,
      name: "TikTok",
    },
    {
      id: 6,
      name: "Instagram",
    },
    {
      id: 7,
      name: "LinkedIn",
    },
  ];
  const [applicationDropdownSelected, setapplicationDropdownSelected] =
    useState(false);
  const [
    applicationDropdownIndexSelected,
    setapplicationDropdownIndexSelected,
  ] = useState<number>(0);
  const [selectedApplications, setSelectedApplications] = useState<any>({});
  console.log(selectedApplications, "app");
  const handleApplicationSelect = (index: any, name: any, id: any) => {
    setSelectedApplications((prev: any) => ({
      ...prev,
      [index]: { name, id },
    }));
    setapplicationDropdownSelected(false); // Close dropdown on selection
  };
  const handleImageUploadSugegstion = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setSuggestionScreenshotFilename(file.name);
      // Read the selected image file as a base64 string
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.result) {
          setSuggestionUrl(event.target.result as string);

          //    //console.log("base64:-",event.target.result);
          ////console.log("sugg  url(upload):-=",event.target.result)
        }
      };
      reader.readAsDataURL(file);
    } else {
    }
  };
  const [level, setLevel] = useState(0); // 0: Beginner, 1: Intermediate, 2: Advanced
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const [experienceLevel, setexperienceLevel] = useState(
    "Select your exp level"
  );
  const [experienceLevelDropdown, setexperienceLevelDropdown] = useState(false);

  return (
    <Box display="flex" padding="32px" gap="4rem">
      <Box bg="grey" height="500px" padding="3rem" borderRadius="6px">
        Left component
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem" width="100%">
        <Box>
          <Text fontSize="24px">Profile</Text>
        </Box>
        <Box>
          <Tabs>
            <TabList>
              <Tab>Socials</Tab>
              <Tab>Public Profile</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0" m="0" mt="2rem">
                <Box bg="grey" padding="2rem" borderRadius="6px">
                  <Text fontSize="24px">Contact Details</Text>
                  <Text>Info on the contact details</Text>
                  <Box
                    mt="1rem"
                    bg="beige"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                      size="sm"
                      ml="1rem"
                    />
                    <Input
                      placeholder="Add a title"
                      required
                      border="0px"
                      outline="none"
                      _focus={{
                        outline: "0",
                        boxShadow: "none",
                      }}
                    />
                  </Box>
                  <Box
                    mt="1rem"
                    bg="beige"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        Icon
                        {/* <PhoneIcon color='gray.300' /> */}
                      </InputLeftElement>
                      <Input type="tel" placeholder="Telegram" />
                    </InputGroup>
                  </Box>
                </Box>
                <Box
                  mt="1rem"
                  bg="grey"
                  borderRadius="6px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  padding="2rem"
                >
                  <Box>
                    <Text fontSize="24px">
                      How Would You Describe Your Experience?
                    </Text>
                    <Text>
                      Help us understand your expertise to tailor your
                      experience.
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                    justifyContent="space-between"
                    py="2"
                    pl="3"
                    pr="3"
                    bg="beige"
                    // mb="1rem"
                    // mt="0.3rem"
                    mt="1rem"
                    borderRadius="md"
                    className="navbar"
                    cursor="pointer"
                    fontSize="sm"
                    position="relative"
                    onClick={() => {
                      setexperienceLevelDropdown(!experienceLevelDropdown);
                      // setapplicationDropdownSelected(
                      //   !applicationDropdownSelected
                      // );
                      // setapplicationDropdownIndexSelected(index);
                    }}
                  >
                    <Box display="flex" gap="1" userSelect="none">
                      <Text color="black">{experienceLevel}</Text>
                    </Box>

                    <Box pt="1" className="navbar-button">
                      Drop
                    </Box>

                    {experienceLevelDropdown && (
                      <Box
                        position="absolute"
                        top="100%" // Align below the button
                        left="0"
                        zIndex="1000" // Ensure it appears on top
                        bg="beige"
                        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                        py="2"
                        className="dropdown-container"
                        boxShadow="dark-lg"
                        height="120px"
                        overflowY="auto"
                        userSelect="none"
                        width="100%" // Ensure it has the same width as the button
                      >
                        {levels?.map((level, indexList) => {
                          return (
                            <Box
                              key={indexList}
                              as="button"
                              w="full"
                              alignItems="center"
                              gap="1"
                              pr="2"
                              display="flex"
                              onClick={() => {
                                setexperienceLevel(level);
                              }}
                            >
                              <Box
                                w="full"
                                display="flex"
                                py="5px"
                                px="6px"
                                gap="1"
                                justifyContent="space-between"
                                borderRadius="md"
                                _hover={{ bg: "#676D9A4D" }}
                                ml=".4rem"
                              >
                                <Text color="black" ml=".6rem">
                                  {level}
                                </Text>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box bg="grey" padding="2rem" borderRadius="6px" mt="1rem">
                  <Text fontSize="24px">More contact info</Text>
                  <Text>Info on the contact details</Text>
                  <Box display="flex" gap="2rem" mt="1rem">
                    <Box
                      bg={!contentCreatorTabSelected ? "beige" : "blue"}
                      padding="1rem"
                      borderRadius="8px"
                      cursor="pointer"
                      onClick={() => {
                        setcontentCreatorTabSelected(
                          !contentCreatorTabSelected
                        );
                      }}
                    >
                      Content Creators
                    </Box>
                    <Box
                      bg={!designerTabSelected ? "beige" : "blue"}
                      padding="1rem"
                      borderRadius="8px"
                      cursor="pointer"
                      onClick={() => {
                        setdesignerTabSelected(!designerTabSelected);
                      }}
                    >
                      Designers
                    </Box>
                  </Box>
                  {(contentCreatorTabSelected || designerTabSelected) && (
                    <Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="number" placeholder="WhatsApp" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Twitter" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Discord" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="text" placeholder="Linkedin" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="tel" placeholder="Youtube" />
                        </InputGroup>
                      </Box>
                    </Box>
                  )}
                  {contentCreatorTabSelected && (
                    <Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="url" placeholder="Reddit" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="url" placeholder="Instagram" />
                        </InputGroup>
                      </Box>
                    </Box>
                  )}
                  {designerTabSelected && (
                    <Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="url" placeholder="Behance" />
                        </InputGroup>
                      </Box>
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            Icon
                            {/* <PhoneIcon color='gray.300' /> */}
                          </InputLeftElement>
                          <Input type="url" placeholder="Dribble" />
                        </InputGroup>
                      </Box>
                    </Box>
                  )}
                  {(contentCreatorTabSelected || designerTabSelected) && (
                    <Box
                      bg="black"
                      alignItems="center"
                      gap="1rem"
                      width="100%"
                      mt="1rem"
                      borderRadius="6px"
                    >
                      {[...Array(count)].map((_, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                          padding="1rem"
                        >
                          <Box minWidth="277px">
                            <Box
                              color="#676D9A"
                              display="flex"
                              alignItems="center"
                              userSelect="none"
                            ></Box>

                            <Box
                              display="flex"
                              border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                              justifyContent="space-between"
                              py="2"
                              pl="3"
                              pr="3"
                              // mb="1rem"
                              // mt="0.3rem"
                              ml="0.4rem"
                              borderRadius="md"
                              className="navbar"
                              cursor="pointer"
                              fontSize="sm"
                              position="relative"
                              onClick={() => {
                                setapplicationDropdownSelected(
                                  !applicationDropdownSelected
                                );
                                setapplicationDropdownIndexSelected(index);
                              }}
                            >
                              <Box display="flex" gap="1" userSelect="none">
                                <Text color="white">
                                  {selectedApplications[index]?.name ||
                                    "Select Application"}
                                </Text>
                              </Box>

                              <Box pt="1" className="navbar-button">
                                chack
                              </Box>

                              {applicationDropdownSelected &&
                                index === applicationDropdownIndexSelected && (
                                  <Box
                                    position="absolute"
                                    top="100%" // Align below the button
                                    left="0"
                                    zIndex="1000" // Ensure it appears on top
                                    bg="#03060B"
                                    border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                                    py="2"
                                    className="dropdown-container"
                                    boxShadow="dark-lg"
                                    height="120px"
                                    overflowY="auto"
                                    userSelect="none"
                                    width="100%" // Ensure it has the same width as the button
                                  >
                                    {ApplicationList?.filter(
                                      (app) =>
                                        !Object.values(
                                          selectedApplications
                                        ).some(
                                          (selectedApplications: any) =>
                                            selectedApplications.name ===
                                            app.name
                                        )
                                    ).map(({ name, id }, indexList) => {
                                      return (
                                        <Box
                                          key={index}
                                          as="button"
                                          w="full"
                                          alignItems="center"
                                          gap="1"
                                          pr="2"
                                          display="flex"
                                          onClick={() =>
                                            handleApplicationSelect(
                                              index,
                                              name,
                                              id
                                            )
                                          }
                                        >
                                          <Box
                                            w="full"
                                            display="flex"
                                            py="5px"
                                            px="6px"
                                            gap="1"
                                            justifyContent="space-between"
                                            borderRadius="md"
                                            _hover={{ bg: "#676D9A4D" }}
                                            ml=".4rem"
                                          >
                                            <Text color="white" ml=".6rem">
                                              {name}
                                            </Text>
                                          </Box>
                                        </Box>
                                      );
                                    })}
                                  </Box>
                                )}
                            </Box>
                          </Box>

                          <Box width="full">
                            <Box>
                              <Input
                                border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                                placeholder={"Enter your user handle"}
                                fontSize="sm"
                                _placeholder={{ color: "#676D9A" }}
                                color="#f2f2f2"
                              />
                            </Box>
                          </Box>

                          <Box
                            mt=".3rem"
                            display="flex"
                            alignItems="center"
                            gap=".5rem"
                          >
                            <Button
                              backgroundColor="#676D9A1A"
                              border="1px solid #676D9A4D"
                              _hover={{ backgroundColor: "transparent" }}
                              color="#f2f2f2"
                              onClick={() => {
                                count > 1 && setCount(count - 1);
                              }}
                              isDisabled={count === 1}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                                  stroke="#F0F0F5"
                                  stroke-width="1.31"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {(contentCreatorTabSelected || designerTabSelected) && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap=".8rem"
                      mt=".8rem"
                    >
                      <Button
                        backgroundColor="transparent"
                        border="1px solid #676D9A4D"
                        _hover={{ backgroundColor: "#676D9A1A" }}
                        color="#f2f2f2"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        width="16rem"
                        height="2.3rem"
                        alignSelf="flex-start"
                        onClick={() => {
                          count < 7 && setCount(count + 1);
                        }}
                        _disabled={{ opacity: "0.5", cursor: "not-allowed" }}
                        isDisabled={count >= 7}
                      >
                        <svg
                          style={{ marginRight: ".3rem" }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6L12 12M12 12V18M12 12H18M12 12H6"
                            stroke="#F0F0F5"
                            stroke-width="1.37"
                            stroke-linecap="round"
                          />
                        </svg>
                        <Text fontSize="14px">Connect Another Account</Text>
                      </Button>

                      <Button
                        background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
                        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                        color="#6E7681"
                        size="sm"
                        width="16rem"
                        height="2.3rem"
                        _hover={{ color: "black", backgroundColor: "white" }}
                        _disabled={{ opacity: "0.5", cursor: "not-allowed" }}
                        alignSelf="flex-start"
                        // onClick={handleRegisterSubmit}
                        // isDisabled={isDisabled()}
                      >
                        Submit
                      </Button>
                    </Box>
                  )}
                </Box>
                <Box bg="grey" padding="2rem" borderRadius="6px" mt="2rem" mb="8rem">
                  <Text fontSize="24px">Danger Zone</Text>
                  <Text>Only come into this area if you are depressed</Text>
                  <Button bg="red" mt="1rem">
                    Delete this Account
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel p="0" m="0" mt="2rem">
                <Box bg="grey" padding="2rem" borderRadius="6px">
                  <Text fontSize="24px">Public Profile</Text>
                  <Text>Info on the public profile changes</Text>
                  <Box display="flex" mt="1rem">
                    <Box display="flex" flexDirection="column">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </Box>
                    <Input
                      // hidden={true}
                      ref={suggestioninputref}
                      type={"file"}
                      placeholder="Choose File"
                      accept="image/*"
                      style={{
                        background: "beige",
                        marginLeft: "1rem",
                        marginTop: "0.3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.3rem",
                        paddingLeft: "1rem",
                      }}
                      onChange={handleImageUploadSugegstion}
                    />
                  </Box>
                  <Box display="flex" gap="1rem">
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Text ml="1rem" whiteSpace="nowrap">
                        First Name
                      </Text>
                      <Input
                        placeholder="Add a title"
                        required
                        border="0px"
                        outline="none"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                    <Box
                      mt="1rem"
                      bg="beige"
                      borderRadius="6px"
                      width="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Box ml="1rem" whiteSpace="nowrap">
                        Last Name
                      </Box>
                      <Input
                        placeholder="Add a title"
                        required
                        border="0px"
                        outline="none"
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    mt="1rem"
                    bg="beige"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <Text ml="1rem" whiteSpace="nowrap">
                      Bio
                    </Text>
                    <Input
                      placeholder="Add a title"
                      required
                      border="0px"
                      outline="none"
                      _focus={{
                        outline: "0",
                        boxShadow: "none",
                      }}
                    />
                  </Box>
                  <Box
                    mt="1rem"
                    bg="beige"
                    borderRadius="6px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <Text ml="1rem" whiteSpace="nowrap">
                      Location
                    </Text>
                    <Input
                      placeholder="Add a title"
                      required
                      border="0px"
                      outline="none"
                      _focus={{
                        outline: "0",
                        boxShadow: "none",
                      }}
                    />
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box
                  bg="grey"
                  mt="1rem"
                  display="flex"
                  justifyContent="space-between"
                  gap="2rem"
                  padding="2rem"
                  borderRadius="6px"
                  position="fixed"
                  bottom="0"
                  width="80%"
                >
                  <Box>Changes</Box>
                  <Box display="flex" gap="2rem">
                    <Box>
                      <Button>Review Profile</Button>
                    </Box>
                    <Box>
                      <Button>Make Changes</Button>
                    </Box>
                  </Box>
                </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingDashboard;
