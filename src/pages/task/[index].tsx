import Navbar from '@/components/Navbar'
import TaskDashboard from '@/components/task/taskDashboard'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
  return (
    <Box>
        <Navbar/>
        <TaskDashboard/>
    </Box>
  )
}

export default Index