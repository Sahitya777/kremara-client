import { Box, Button, Heading, Text, Image, keyframes } from "@chakra-ui/react";
import Link from "next/link";

// Animation for the image
const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-10px); }
  100% { transform: translatey(0px); }
`;

export default function Custom404() {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="gray.100"
      color="gray.700"
    >
      <Box
        as={Image}
        src="/404-illustration.svg" // replace with your subtle illustration
        alt="Lost in space"
        maxW="250px"
        mb={8}
        animation={`${float} 3s ease-in-out infinite`}
      />
      <Heading
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.500, green.400)"
        bgClip="text"
      >
        Oops!
      </Heading>
      <Text fontSize="lg" mt={3} mb={2}>
        Looks like this page drifted away.
      </Text>
      <Text color="gray.500" mb={6}>
        But don&apos;t worry, we&apos;ll get you back on track.
      </Text>

      <Link href="/" passHref>
        <Button
          colorScheme="green"
          bg="green.400"
          color="white"
          _hover={{
            bg: "green.500",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
