import Navbar from '@/components/Navbar'
import ProjectCreateDashboard from '@/components/projectCreation/projectCreateDashboard'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
  return (
    <Box>
        <Navbar/>
        <ProjectCreateDashboard/>
    </Box>
  )
}

export default Index