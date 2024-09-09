import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepSeparator,
  StepTitle,
  StepDescription,
  useSteps,
  Text,
  Select,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const CreateTaskModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const steps = [
    { title: "First", description: "Task Info" },
    { title: "Second", description: "Category and Timelines" },
    { title: "Third", description: "Attachments" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0, // Start from the first step
    count: steps.length,
  });

  // State to manage form data
  const [formData, setFormData] = useState({
    contactInfo: { name: "", email: "" },
    dateTime: { date: "", time: "" },
    rooms: { roomType: "" },
  });

  // Update form data based on the current active step
  const handleChange = (e: any, field: string, stepKey: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [stepKey]: { ...prevState[stepKey], [field]: e.target.value },
    }));
  };

  // Handle moving to the next step
  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.contactInfo.name !== "" && formData.contactInfo.email !== ""
        );
      case 1:
        return (
          categorySelected !== "Select a category" && selectedOptions.length > 0
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    } else {
      // Show some error or warning that required fields are missing
      alert("Please fill in all required fields.");
    }
  };

  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [availableOptions, setAvailableOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  const [selectedAreas, setSelectedAreas] = useState([
    "DAOs",
    "Consumer dApps",
    "DePIN",
    "Infrastructure",
  ]);
  const [availableCategories] = useState([
    "Designer",
    "Content Creator",
    "Growth",
    "Devrel",
    "Editing",
  ]);
  const [categorySelected, setcategorySelected] = useState("Select a catgeory");
  const [categoryDropdownSelected, setcategoryDropdownSelected] =
    useState(false);
  const [tagsDropdownSelected, settagsDropdownSelected] = useState(false);
  const [currentValidation, setcurrentValidation] = useState(false);

  useEffect(() => {
    let currentValueValidation = validateStep();
    console.log(currentValueValidation, "curr");
    setcurrentValidation(currentValueValidation);
  }, [activeStep, formData, selectedOptions]);

  const handleSelectOption = (option: any) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setAvailableOptions(availableOptions.filter((opt) => opt !== option));
    }
  };

  const removeOption = (option: any) => {
    setSelectedOptions(selectedOptions.filter((opt: any) => opt !== option));
    setAvailableOptions([...availableOptions, option]);
  };

  // Handle moving to the previous step
  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Render the form fields based on the current step
  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={formData.contactInfo.name}
                onChange={(e) => handleChange(e, "name", "contactInfo")}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                minH="100px"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange(e, "email", "contactInfo")}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Thumbnails</FormLabel>
              <Input
                // hidden={true}
                type={"file"}
                placeholder="Choose File"
                accept="image/*"
                style={{
                  background: "beige",
                  marginTop: "0.3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.3rem",
                  paddingLeft: "1rem",
                }}
              />
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={formData.dateTime.date}
                onChange={(e) => handleChange(e, "date", "dateTime")}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Box>
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
                      setcategoryDropdownSelected(!categoryDropdownSelected);
                      settagsDropdownSelected(false);
                      // setapplicationDropdownSelected(
                      //   !applicationDropdownSelected
                      // );
                      // setapplicationDropdownIndexSelected(index);
                    }}
                  >
                    <Box display="flex" gap="1" userSelect="none">
                      <Text color="black">{categorySelected}</Text>
                    </Box>

                    <Box pt="1" className="navbar-button">
                      Drop
                    </Box>

                    {categoryDropdownSelected && (
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
                        {availableCategories?.map((name, indexList) => {
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
                                setcategorySelected(name);
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
              </Box>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Tags</FormLabel>
              <Box width="100%">
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
                    settagsDropdownSelected(!tagsDropdownSelected);
                    // setapplicationDropdownSelected(
                    //   !applicationDropdownSelected
                    // );
                    // setapplicationDropdownIndexSelected(index);
                  }}
                >
                  <Box display="flex" gap="1" userSelect="none">
                    <Text color="black">Select Tags</Text>
                  </Box>

                  <Box pt="1" className="navbar-button">
                    Drop
                  </Box>

                  {tagsDropdownSelected && availableOptions.length !== 0 && (
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
                      {availableOptions?.map((name, indexList) => {
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
                              handleSelectOption(name);
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
                {/* Menu acts like a custom Select component */}

                {/* Selected tags displayed below the dropdown */}
                {selectedOptions.length > 0 && (
                  <Wrap spacing={2} mt={4}>
                    {selectedOptions.map((option: any, index: number) => (
                      <WrapItem key={index}>
                        <Tag size="md" colorScheme="blue" borderRadius="full">
                          <TagLabel>{option}</TagLabel>
                          <TagCloseButton
                            onClick={() => removeOption(option)}
                          />
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                )}
              </Box>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControl mt={4}>
              <FormLabel>External Links</FormLabel>
              <Input
                placeholder="Links like figma etc"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange(e, "email", "contactInfo")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Attachments</FormLabel>
              <Input
                // hidden={true}
                type={"file"}
                placeholder="Choose File"
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
              />
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  // Handle form submission on the last step
  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    // Add your submission logic here
    onClose(); // Close modal after submission
  };

  return (
    <Box>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered >
        <ModalOverlay />
        <ModalContent minWidth="500px">
          <ModalHeader>Create a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Stepper */}

            {/* Render form content based on step */}
            {renderFormContent()}

            {/* Navigation buttons */}
            <Stepper index={activeStep} mb={6} mt="1rem">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={prevStep} isDisabled={activeStep === 0}>
                Previous
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={nextStep}
                  isDisabled={!currentValidation}
                >
                  Next
                </Button>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateTaskModal;
