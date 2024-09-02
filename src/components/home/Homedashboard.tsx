import { Project } from '@/interfaces/interface'
import { Box, Button, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Homedashboard = () => {
  const projects:Project[]=[
    {
      name:'Starkfarm',
      logo:'',
      description:'STRKFarm is a decentralized yield aggregator built on Starknet. It aims to maximize returns for users by automatically reallocating assets across various DeFi protocols.'
    },
    {
      name:'Carmine Options',
      logo:'',
      description:'Carmine Options AMM, a platform for buying and selling European style options.'
    },
  ]
  const router=useRouter()
  const { data: session } = useSession();
  return (
    <Box padding="4rem">
        <Box bg="grey" width="100%" padding="1rem" borderRadius="6px">
          Banner
        </Box>
        <Box display="flex" gap="1rem" mt="3rem" width="100%">
            <Box bg="grey" width="50%" padding="1.5rem">
                <Box>
                  <Text>
                    Top trending projects
                  </Text>
                </Box>
                {projects.map((project:Project,index:number)=>(
                  <Box display='flex' gap="0.8rem" mt="2rem" key={index}>
                    <Box>
                      Logo
                    </Box>
                    <Box width="80%">
                      <Text>
                        {project.name}
                      </Text>
                      <Text>
                        {project.description}
                      </Text>
                    </Box>
                    <Box>
                      <Button cursor="pointer" onClick={()=>{
                        router.push(`/project/${project?.name}`)
                      }}>
                        Click for project
                      </Button>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Box bg="grey" width="50%"  padding="1.5rem">
                Contributors
            </Box>
        </Box>
    </Box>
  )
}

export default Homedashboard