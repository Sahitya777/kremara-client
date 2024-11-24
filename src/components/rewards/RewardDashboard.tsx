import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user.atoms";
import SignInModal from "../Modals/SignInModal";
import { useRouter } from "next/router";

const RewardDashboard = () => {
  const rewards:any = []; // No rewards for testing case
  const user = useAtomValue(userAtom);
  const router=useRouter()

  return (
    <Box p={6} bg="gray.50" minH="100vh" textAlign="center">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={6}
        mt="4rem"
        bgGradient="linear(to-r, teal.500, blue.500)"
        bgClip="text"
      >
        🎉 Your Rewards Dashboard
      </Text>

      {!user ? (
        <Box>
          <Text fontSize="lg" mb={4}>
            🚀 Sign in to track your rewards and start contributing to amazing projects!
          </Text>
          <SignInModal buttonText="Sign In to Get Started" />
        </Box>
      ) : rewards.length === 0 ? (
        <Box>
          <Text fontSize="lg" mb={4} color="gray.600">
            🌟 You don&apos;t have any rewards yet.
          </Text>
          <Text fontSize="lg" mb={4} color="blue.500">
            Participate in tasks, showcase your skills, and start earning rewards!
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={()=>{
                router.push('/projects')
            }}
          >
            Explore projects
          </Button>
        </Box>
      ) : (
        <VStack spacing={6} align="stretch">
          {rewards.map((reward:any) => (
            <Box
              key={reward.taskId}
              p={5}
              borderRadius="md"
              bg="white"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <HStack justifyContent="space-between" mb={2}>
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  {reward.taskTitle}
                </Text>
                <Badge colorScheme="green" fontSize="md">
                  {reward.amount}
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Task ID: <strong>{reward.taskId}</strong>
              </Text>
              <Text fontSize="sm" color="gray.600">
                Project: <strong>{reward.project}</strong>
              </Text>
              <Divider my={3} />
              <HStack justifyContent="flex-end">
                <Text fontSize="lg" color="green.500" fontWeight="bold">
                  Great Job!
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RewardDashboard;
