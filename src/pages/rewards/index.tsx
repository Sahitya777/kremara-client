import Navbar from '@/components/Navbar'
import RewardDashboard from '@/components/rewards/RewardDashboard'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
  return (
    <Box>
        <Navbar/>
        <RewardDashboard/>
    </Box>
  )
}

export default Index