import Navbar from "@/components/Navbar";
import SettingDashboard from "@/components/settings/settingDashboard";
import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

const Index = () => {
  return (
    <Box>
      <Navbar />
    <SettingDashboard/>
    </Box>
  );
};

export default Index;
