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
import React, { useEffect, useRef, useState } from "react";

const CreateTaskModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef: any = useRef();
  const [screenshoturl, setScreenshoturl] = useState("");
  const [screenshotFilename, setScreenshotFilename] = useState("");
  const steps = [
    { title: "First", description: "Task Info" },
    { title: "Second", description: "Deadline and Catgeories" },
    { title: "Third", description: "Additional Info" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0, // Start from the first step
    count: steps.length,
  });

  // State to manage form data
  const [formData, setFormData] = useState({
    taskDetails: { title: "", taskDescription: "", thumbnail: "" },
    taskTypeAndDeadline: { date: "", taskCategory: "", taskDifficulty: "" },
    additionalData: { externalLinks: "", additionalInfo: "" },
  });

  // Update form data based on the current active step
  const handleChange = (e: any, field: string, stepKey: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [stepKey]: { ...prevState[stepKey], [field]: e.target.value },
    }));
  };
  const handleImageUpload = (e: any,field: string, stepKey: string) => {
    const file = e.target.files[0];

    if (file) {
     //console.log(file.name, "file name");
      setScreenshotFilename(file.name);
      // Read the selected image file as a base64 string
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.result) {
          setScreenshoturl(event.target.result as string);
          setFormData((prevState: any) => ({
            ...prevState,
            [stepKey]: { ...prevState[stepKey], [field]: event?.target?.result as string },
          }));
          ////console.log("bug  url(upload):-=",event.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
    }
  };

  // Handle moving to the next step
  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.taskDetails.title !== "" &&
          formData.taskDetails.taskDescription !== "" &&
          formData.taskDetails.thumbnail !== ""
        );
      case 1:
        return (
           formData.taskTypeAndDeadline.date!=="" && categorySelected !== "Select a category" && selectedOptions.length > 0
        );
      default:
        return false;
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
  const [availableCategories] = useState([
    "Designer",
    "Content Creator",
    "Growth",
    "Devrel",
    "Editing",
  ]);
  const [categorySelected, setcategorySelected] = useState("Select a category");
  const [categoryDropdownSelected, setcategoryDropdownSelected] =
    useState(false);
  const [tagsDropdownSelected, settagsDropdownSelected] = useState(false);
  const [currentValidation, setcurrentValidation] = useState(false);

  useEffect(() => {
    let currentValueValidation = validateStep();
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
  useEffect(()=>{
    if(categorySelected!=='Select a category'){
      setFormData((prevState: any) => ({
        ...prevState,
        ['taskTypeAndDeadline']: { ...prevState['taskTypeAndDeadline'], ['taskCategory']: categorySelected},
      }))
    }
  },[categorySelected])

  // Render the form fields based on the current step
  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
              placeholder="Enter the task title (eg. create a design for landing page)"
                value={formData.taskDetails.title}
                onChange={(e) => handleChange(e, "title", "taskDetails")}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                minH="100px"
                placeholder="Please tell the complete description of the task you want the users to perform"
                value={formData.taskDetails.taskDescription}
                onChange={(e) =>
                  handleChange(e, "taskDescription", "taskDetails")
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Thumbnails</FormLabel>
              <Input
                // hidden={true}
                type={"file"}
                placeholder="Choose File"
                name="thumbnail"
                onChange={(e) => {
                  handleImageUpload(e,"thumbnail","taskDetails")
                  // handleChange(e, "thumbnail", "taskDetails");
                }}
                accept="image/*"
                style={{
                  // background: "beige",
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
              <FormLabel>Task Deadline (eg 2 days from now)</FormLabel>
              <Input
                type="date"
                value={formData.taskTypeAndDeadline.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleChange(e, "date", "taskTypeAndDeadline")}
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
              <Textarea
                placeholder="Links like figma etc (enter full link seperated by commas)"
                value={formData.additionalData.externalLinks}
                onChange={(e) =>
                  handleChange(e, "externalLinks", "additionalData")
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Additional Info</FormLabel>
              <Textarea
                placeholder="Add any additional info that the user might wanna know about completing tasks"
                value={formData.additionalData.additionalInfo}
                onChange={(e) =>
                  handleChange(e, "additionalInfo", "additionalData")
                }
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
    alert('submit')
    // Add your submission logic here
    onClose(); // Close modal after submission
  };

  return (
    <Box>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent minWidth="560px">
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
                <Button
                  colorScheme="blue"
                  onClick={handleSubmit}
                  isDisabled={validateStep()}
                >
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
