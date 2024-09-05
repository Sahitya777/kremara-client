import { Avatar, Box, Input,Tab,TabList,TabPanel,TabPanels,Tabs,Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const SettingDashboard = () => {
  const [userData, setuserData] = useState()
  return (
    <Box display="flex" padding="32px" gap="4rem">
    <Box bg="grey" height="500px" padding="3rem">
      Left component
    </Box>
    <Box display="flex" flexDirection="column" gap="1rem" width="100%">
      <Box>
        <Text fontSize="24px">Profile</Text>
      </Box>
      <Box>
        <Tabs>
          <TabList >
            <Tab>
              Contact Info
            </Tab>
            <Tab>
              Public Profile
            </Tab>  
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
                  <Box bg="grey" padding="2rem" borderRadius="6px" mt="1rem">
                    <Text fontSize="24px">More contact info</Text>
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
              </TabPanel> 
              <TabPanel p="0" m="0" mt="2rem">
              <Box bg="grey" padding="2rem" borderRadius="6px">
                    <Text fontSize="24px">Public Profile</Text>
                    <Text>Info on the public profile changes</Text>
                    <Box display="flex" mt="1rem">
                      <Box display='flex' flexDirection="column">
                        <Text>
                          Avatar
                        </Text>
                        <Avatar/>
                      </Box>
                      <Box
                          mt="1rem"
                          bg="beige"
                          ml="1rem"
                          borderRadius="6px"
                          width="100%"
                          display="flex"
                          alignItems="center"
                        >
                          <Text ml="1rem" whiteSpace="nowrap">Choose Files</Text>
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
                    <Box display="flex" gap="1rem">
                      <Box
                        mt="1rem"
                        bg="beige"
                        borderRadius="6px"
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <Text ml="1rem" whiteSpace="nowrap">First Name</Text>
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
                        <Box ml="1rem" whiteSpace="nowrap">Last Name</Box>
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
                        <Text ml="1rem" whiteSpace="nowrap">Bio</Text>
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
                        <Text ml="1rem" whiteSpace="nowrap">Location</Text>
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
      </Box>
    </Box>
  </Box>
  )
}

export default SettingDashboard