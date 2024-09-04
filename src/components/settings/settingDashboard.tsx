import { Box, Input,Text } from '@chakra-ui/react'
import React from 'react'

const SettingDashboard = () => {
  return (
    <Box display="flex" padding="32px" gap="4rem">
    <Box bg="grey" height="500px" padding="3rem">
      Left component
    </Box>
    <Box display="flex" flexDirection="column" gap="1rem" width="100%">
      <Box>
        <Text>Title</Text>
      </Box>
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
          <Box ml="1rem">Image</Box>
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
          <Box ml="1rem">Image</Box>
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
    </Box>
  </Box>
  )
}

export default SettingDashboard