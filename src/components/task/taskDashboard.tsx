import { useState } from "react";
import {
  Box,
  Heading,
  Badge,
  Image,
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

const TaskDetailPage = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // Mock approval status
  const [discussions, setDiscussions] = useState<any>([]); // List to store previous discussions
  const [newDiscussion, setNewDiscussion] = useState(""); // New discussion message

  // Function to handle application submission
  const handleApply = () => {
    setIsApplied(true);
  };

  // Mock function for task submission (you can replace this with actual functionality)
  const handleTaskSubmission = () => {
    alert("Task submitted!");
  };

  // Function to handle adding a new discussion
  const handleAddDiscussion = () => {
    if (newDiscussion) {
      setDiscussions([...discussions, newDiscussion]);
      setNewDiscussion("");
    }
  };

  return (
    <Flex p={6} direction={{ base: "column", md: "row" }} gap={6}>
      {/* Left Panel (Task Details) */}
      <Box flex={3}>
        {/* Task Header with Title and Thumbnail */}
        <Flex align="center" justify="space-between" mb={4}>
          <Flex align="center">
            <Avatar/>
            <Heading as="h2" size="lg">
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
            Design a new logo that represents the company's modern approach to
            design and is compatible with various branding materials.
          </Text>
        </Box>

        {/* Additional Task Details: Attachments, Deadline, Tags, Category */}
        <VStack align="start" spacing={3} mb={6}>
          <Text>
            <b>Attachments:</b> <a href="/attachment-link">Logo_Guidelines.pdf</a>
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
        </VStack>

        {/* Task Tabs for Apply and Discussion */}
        <Tabs isFitted>
          <TabList mb={4}>
            <Tab>Apply</Tab>
            <Tab>Discussion</Tab>
          </TabList>

          <TabPanels>
            {/* Apply for Task Tab */}
            <TabPanel>
              {!isApplied ? (
                <>
                  <Heading as="h4" size="md" mb={2}>
                    Apply to Work on Task
                  </Heading>
                  <Text mb={4}>
                    Provide a short message explaining why you're interested in
                    this task.
                  </Text>
                  <Textarea
                    placeholder="Explain your experience and motivation for working on this task."
                    mb={4}
                  />
                  <Button colorScheme="blue" onClick={handleApply}>
                    Submit Application
                  </Button>
                </>
              ) : (
                <>
                  <Alert status="info" mb={4}>
                    <AlertIcon />
                    Your application has been submitted. Once approved, you will
                    be able to start working on the task.
                  </Alert>

                  {isApproved && (
                    <Box>
                      <Text mb={4}>
                        Congratulations! Your application has been approved. You
                        can now submit your work when you're ready.
                      </Text>
                      <Button colorScheme="green" onClick={handleTaskSubmission}>
                        Submit Task
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </TabPanel>

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
                  {discussions.map((discussion:any, index:number) => (
                    <Box
                      key={index}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      bg="gray.100"
                      width="100%"
                    >
                      <Text>{discussion}</Text>
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
                onChange={(e) => setNewDiscussion(e.target.value)}
              />
              <Button colorScheme="green" onClick={handleAddDiscussion}>
                {discussions.length > 0 ? "Add Discussion" : "Start Discussion"}
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Right Panel (Project Details) */}
      <Box
        flex={1}
        borderWidth={1}
        borderRadius="md"
        p={4}
        bg="gray.50"
        width={{ base: "100%", md: "20%" }}
      >
        <Heading as="h4" size="md" mb={4}>
          Project Details
        </Heading>
        <VStack align="start" spacing={2}>
          <Text>
            <b>Project:</b> Awesome Project
          </Text>
          <Text>
            <b>Status:</b> In Progress
          </Text>
          <Text>
            <b>Team:</b> John Doe, Jane Smith, Alex Lee
          </Text>
          <Text>
            <b>Related Tasks:</b>
          </Text>
          <VStack align="start">
            <Text>Task 1 - Pending Review</Text>
            <Text>Task 2 - In Progress</Text>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default TaskDetailPage;
