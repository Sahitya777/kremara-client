import { Box, Text, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProjectDashboard = () => {
  const router = useRouter();
  const [projectTasks, setprojectTasks] = useState([]);
  return (
    <Box display="flex" padding="32px" gap="2rem">
      <Box bg="grey" height="500px" padding="3rem">
        Left dashboard
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem" width="100%">
        <Box>
          <Text fontSize="28px">{router.query.index}</Text>
        </Box>
        <Box bg="grey" padding="2rem" borderRadius="6px">
          <Box display="flex" gap="2rem">
            <Box height="100%">
              Logo image
              {/* <Image src="" alt=""/> */}
            </Box>
            <Box>
              <Box>{router.query.index}</Box>
              <Box display="flex" gap="1rem">
                tags
              </Box>
            </Box>
          </Box>
          <Box mt="1rem" bg="grey">
            <Box>2-3 line description</Box>
          </Box>
        </Box>
        <Box bg="grey" padding="2rem" borderRadius="6px">
          <Box display="flex" gap="2rem">
            <Box height="100%">
              Logo for tasks
              {/* <Image src="" alt=""/> */}
            </Box>
            <Box>
              <Box>title</Box>
              <Box display="flex" gap="1rem">
                1 liner for tasks
              </Box>
            </Box>
          </Box>
          <Box height="1px" borderBottom="1px solid black" mt="1rem"></Box>
        </Box>
      </Box>
      <Box bg="grey" padding="3rem" >
        Right Dashboard
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
