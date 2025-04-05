import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaBullhorn,
  FaBlog,
  FaChartBar,
  FaCog,
} from 'react-icons/fa';

const MenuItem = ({ icon, children, to, isActive }) => {
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeColor = useColorModeValue('blue.600', 'blue.200');

  return (
    <Link to={to}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : 'inherit'}
        _hover={{
          bg: hoverBg,
        }}
        transition=".2s ease"
      >
        <Icon
          mr="4"
          fontSize="16"
          as={icon}
          color={isActive ? activeColor : 'gray.500'}
        />
        <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const menuItems = [
    { icon: FaHome, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: FaUsers, text: 'Members', path: '/admin/members' },
    { icon: FaCalendarAlt, text: 'Events', path: '/admin/events' },
    { icon: FaBullhorn, text: 'Announcements', path: '/admin/announcements' },
    { icon: FaBlog, text: 'Blog Posts', path: '/admin/blog' },
    { icon: FaChartBar, text: 'Analytics', path: '/admin/analytics' },
    { icon: FaCog, text: 'Settings', path: '/admin/settings' },
  ];

  return (
    <Box
      position="fixed"
      left="0"
      h="100vh"
      w="250px"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      py={8}
    >
      <VStack spacing={1} align="stretch">
        <Box px={8} mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            Dev Club Admin
          </Text>
        </Box>
        <Divider mb={6} />
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            icon={item.icon}
            to={item.path}
            isActive={location.pathname === item.path}
          >
            {item.text}
          </MenuItem>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar; 