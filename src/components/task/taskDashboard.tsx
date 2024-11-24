import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Badge,
  Text,
  Tag,
  Button,
  Flex,
  VStack,
  HStack,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Alert,
  AlertIcon,
  Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import githubLogo from "../../assets/github-logo.png";
import SignInModal from "../Modals/SignInModal";
import axios from "axios";
import { tiers, userType } from "@/interfaces/interface";
import { useRouter } from "next/router";
const TaskDetailPage = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // Mock approval status
  const [addDiscussionClicked, setaddDiscussionClicked] = useState(false);
  const [userData, setuserData] = useState<any>();
  const [userType, setuserType] = useState<userType>("Normal");
  const router = useRouter();
  const [sortByRank, setSortByRank] = useState(false);
  const rankingOrder: Record<tiers, number> = {
    UNRATED: 0,
    IRON: 1,
    BRONZE: 2,
    SILVER: 3,
    GOLD: 4,
    PLATINUM: 5,
    DIAMOND: 6,
  };
  const applicants = [
    {
      id: 1,
      name: `Applicant ${2 + 1}`,
      avatar: "https://via.placeholder.com/150",
      bio: `Bio of Applicant ${3 + 1}`,
      rank: "Diamond",
    },
    {
      id: 1,
      name: `Applicant ${2 + 1}`,
      avatar: "https://via.placeholder.com/150",
      bio: `Bio of Applicant ${3 + 1}`,
      rank: "Iron",
    },
    {
      id: 1,
      name: `Applicant ${2 + 1}`,
      avatar: "https://via.placeholder.com/150",
      bio: `Bio of Applicant ${3 + 1}`,
      rank: "Diamond",
    },
    {
      id: 1,
      name: `Applicant ${2 + 1}`,
      avatar: "https://via.placeholder.com/150",
      bio: `Bio of Applicant ${3 + 1}`,
      rank: "Gold",
    },
  ];
  const sortedApplicants = sortByRank
    ? [...applicants].sort(
        (a, b) =>
          rankingOrder[b.rank.toUpperCase() as tiers] -
          rankingOrder[a.rank.toUpperCase() as tiers]
      )
    : applicants;

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentApplicants = sortedApplicants.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(sortedApplicants.length / ITEMS_PER_PAGE);
  const [discussions, setDiscussions] = useState<any>([
    {
      id: 1,
      user: "sahitya",
      description: "worked on it",
      timestamp: 400,
      logo: "",
    },
    {
      id: 1,
      user: "sahitya",
      description: "worked on it",
      timestamp: 400,
      logo: "",
    },
  ]); // List to store previous discussions
  const [newDiscussion, setNewDiscussion] = useState(""); // New discussion message
  const [hydrated, setHydrated] = useState(false);

  // Function to handle application submission
  const handleApply = async () => {
    try {
      const discussionData = {
        id: 2, // Example data
        text: "Another discussion added!",
        routeLink: "new-link",
      };

      const response = await axios.post(
        "https://your-api-endpoint.com/api/discussions",
        discussionData
      );

      console.log("Discussion added successfully:", response.data);
      setIsApplied(true);
    } catch (error) {
      console.log(error, "err in applying");
    }
  };

  const handleAddDiscussion = async () => {
    try {
    } catch (error) {
      console.log(error, "err in add discussion");
    }
  };

  // Mock function for task submission (you can replace this with actual functionality)
  const handleTaskSubmission = () => {
    alert("Task submitted!");
  };

  useEffect(() => {
    try {
      const getDiscussions = async () => {};
      getDiscussions();
    } catch (error) {
      console.log(error, "err in get discussions");
    }
  }, [addDiscussionClicked]);

  useEffect(() => {
    setHydrated(true); // Set hydrated to true after rendering on the client
  }, []);
  if (!hydrated) {
    return null; // Prevent rendering until after hydration
  }

  return (
    <Flex p={6} direction={{ base: "column", md: "row" }} gap={6}>
      {/* Left Panel (Task Details) */}
      <Box flex={3} mt="4rem">
        {/* Task Header with Title and Thumbnail */}
        <Flex align="center" justify="space-between" mb={4}>
          <Flex align="center">
            <Avatar />
            <Heading as="h2" size="lg" ml="0.5rem">
              Design New Logo
            </Heading>
          </Flex>
          <Badge colorScheme="blue" fontSize="1em">
            In Progress
          </Badge>
        </Flex>

        {/* Task Description */}
        <Box mb={4}>
          <Heading as="h3" size="md" mb={2}>
            Task Description
          </Heading>
          <Text mb={2}>
            Design a new logo that represents the company&apos;s modern approach
            to design and is compatible with various branding materials.
          </Text>
        </Box>

        {/* Additional Task Details: Attachments, Deadline, Tags, Category */}
        <VStack align="start" spacing={3} mb={6}>
          <Text>
            <b>Attachments:</b>{" "}
            <a href="/attachment-link">Logo_Guidelines.pdf</a>
          </Text>
          <Text>
            <b>Deadline:</b> September 30, 2024
          </Text>
          <HStack>
            <Text>
              <b>Category:</b> Design
            </Text>
            <Text>
              <b>Tags:</b>
            </Text>
            <Tag>Newbie Friendly</Tag>
            <Tag>Urgent</Tag>
          </HStack>
          <Text display="flex" gap="0.2rem">
            <b>Additional Info:</b> <Text maxW="500px">Info text</Text>
          </Text>
          <Text>
            <b>Applicants:</b> 20
          </Text>
        </VStack>

        {/* Task Tabs for Apply and Discussion */}
        <Tabs isFitted>
          <TabList mb={4}>
            <Tab>{userType === "Normal" ? "Apply" : "Applicants"}</Tab>
            <Tab>Discussion</Tab>
          </TabList>

          <TabPanels>
            {/* Apply for Task Tab */}
            {userType === "Normal" ? (
              <TabPanel>
                {!isApplied ? (
                  <>
                    <Heading as="h4" size="md" mb={2}>
                      Apply to Work on Task
                    </Heading>
                    <Text mb={4}>
                      Provide a short message explaining why you&apos;re
                      interested in this task.
                    </Text>
                    <Textarea
                      placeholder="Explain your experience and motivation for working on this task."
                      mb={4}
                      isDisabled={!userData}
                    />
                    {userData ? (
                      <Button colorScheme="blue" onClick={handleApply}>
                        Submit Application
                      </Button>
                    ) : (
                      <SignInModal
                        buttonText="Sign Up Now"
                        bg="yellow.400"
                        color="black"
                        _hover={{ bg: "yellow.300" }}
                        _focus={{ outline: "none" }}
                        px="1.5rem"
                        py="1rem"
                        borderRadius="8px"
                        fontWeight="bold"
                        size="lg"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Alert status="info" mb={4}>
                      <AlertIcon />
                      Your application has been submitted. Once approved, you
                      will be able to start working on the task.
                    </Alert>

                    {isApproved && (
                      <Box>
                        <Text mb={4}>
                          Congratulations! Your application has been approved.
                          You can now submit your work when you&apos;re ready.
                        </Text>
                        <Button
                          colorScheme="green"
                          onClick={handleTaskSubmission}
                        >
                          Submit Task
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </TabPanel>
            ) : (
              <TabPanel>
                <Heading as="h4" size="md" mb={4}>
                  People Who Have Applied for Task
                </Heading>
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Text mb={6} fontSize="lg" color="gray.600">
                    Showing {startIndex + 1} -{" "}
                    {startIndex + currentApplicants.length} of{" "}
                    {applicants.length} applicants.
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => setSortByRank(!sortByRank)}
                  >
                    {sortByRank ? "Unsort" : "Sort by Rank"}
                  </Button>
                </Box>
                <Box>
                  {currentApplicants.map((applicant,index:number) => (
                    <Flex
                      key={applicant.id}
                      align="center"
                      p={4}
                      mb={4}
                      borderRadius="lg"
                      bg="gray.50"
                      _hover={{ bg: "gray.100", boxShadow: "lg" }}
                      transition="0.3s"
                    >
                      <Avatar src={applicant.avatar} size="lg" mr={4} />
                      <Box flex="1">
                        <Heading as="h5" size="sm">
                          {applicant.name} 
                        </Heading>
                        <Text color="gray.600" fontSize="sm">
                          {applicant.bio}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                          {applicant.rank}
                        </Text>
                      </Box>
                      <Button size="sm" colorScheme="blue">
                        View Profile
                      </Button>
                      <Button size="sm" colorScheme="blue" ml="0.5rem">
                        Assign Task
                      </Button>
                    </Flex>
                  ))}
                </Box>
                <Flex mt={4} justify="space-between" align="center">
                  <Button
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Text>
                    Page {currentPage} of {totalPages}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </Flex>
              </TabPanel>
            )}

            {/* Discussion with Moderator Tab */}
            <TabPanel>
              <Heading as="h4" size="md" mb={2}>
                Ask the Moderator
              </Heading>
              <Text mb={4}>
                You can ask the moderator any questions or request task
                assignment here.
              </Text>

              {/* Show previous discussions if any */}
              {discussions.length > 0 ? (
                <VStack align="start" spacing={4} mb={4}>
                  {discussions.map((discussion: any, index: number) => (
                    <Box
                      key={index}
                      borderWidth={1}
                      borderRadius="md"
                      bg="gray.100"
                      width="100%"
                    >
                      <Box display="flex" gap="0.5rem" bg="grey">
                        <Image
                          src={githubLogo}
                          alt=""
                          width={24}
                          height={24}
                          style={{ borderRadius: "20px" }}
                        />
                        <Text>{discussion.user}</Text>
                        <Text>Commented at{discussion.timestamp}</Text>
                      </Box>
                      <Box mt="1rem" ml="2rem">
                        <Text>{discussion.description}</Text>
                      </Box>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>No discussions yet. Start one below.</Text>
              )}

              <Textarea
                placeholder="Ask for assignment or any clarifications about the task."
                mb={4}
                value={newDiscussion}
                isDisabled={!userData}
                onChange={(e) => setNewDiscussion(e.target.value)}
              />
              {userData ? (
                <Button
                  colorScheme="green"
                  onClick={() => {
                    setaddDiscussionClicked(!addDiscussionClicked);
                  }}
                >
                  {discussions.length > 0
                    ? "Add Discussion"
                    : "Start Discussion"}
                </Button>
              ) : (
                <SignInModal
                  buttonText="Sign Up Now"
                  bg="yellow.400"
                  color="black"
                  _hover={{ bg: "yellow.300" }}
                  _focus={{ outline: "none" }}
                  px="1.5rem"
                  py="1rem"
                  borderRadius="8px"
                  fontWeight="bold"
                  size="lg"
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Right Panel (Project Details) */}
      <Box
        flex={1}
        borderWidth={1}
        borderRadius="md"
        mt="4rem"
        p={4}
        bg="gray.50"
        width={{ base: "100%", md: "20%" }}
      >
        <Heading as="h4" size="lg" mb={4}>
          Project Details
        </Heading>
        <VStack align="start" spacing={5}>
          <Text mt="0.5rem">
            <b>Project:</b> Awesome Project
          </Text>
          <Text>
            <b>Total Tasks:</b> 23
          </Text>
          <Text>
            <b>Current Task Status:</b> In Progress
          </Text>
          <Box display='flex' gap="0.2rem">
            <Text fontWeight="600">
              Team:
            </Text>
            <Box display="flex" gap="0.2rem">
              <Box>
                Tom,
              </Box>
              <Box>
                Vendur
              </Box>
            </Box>
            
          </Box>
          {/* <Text>
            <b>Related Tasks:</b>
          </Text>
          <VStack align="start">
            <Text>Task 1 - Pending Review</Text>
            <Text>Task 2 - In Progress</Text>
          </VStack> */}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TaskDetailPage;
