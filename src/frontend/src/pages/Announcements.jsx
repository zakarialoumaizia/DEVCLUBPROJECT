import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  SimpleGrid,
  Badge,
  useBreakpointValue,
  Icon,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { FaBell, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AnnouncementCard = ({ announcement }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getIcon = (type) => {
    switch (type) {
      case 'info':
        return FaInfoCircle;
      case 'warning':
        return FaExclamationTriangle;
      case 'success':
        return FaCheckCircle;
      default:
        return FaBell;
    }
  };

  const getColorScheme = (type) => {
    switch (type) {
      case 'info':
        return 'blue';
      case 'warning':
        return 'yellow';
      case 'success':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <MotionBox
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={bgColor}
        p={6}
        rounded="lg"
        borderWidth="1px"
        borderColor={borderColor}
        position="relative"
      >
        <HStack spacing={4} mb={4}>
          <Icon
            as={getIcon(announcement.type)}
            w={6}
            h={6}
            color={`${getColorScheme(announcement.type)}.500`}
          />
          <Badge colorScheme={getColorScheme(announcement.type)}>
            {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
          </Badge>
          <Text color="gray.500" fontSize="sm">
            {announcement.date}
          </Text>
        </HStack>
        <Heading size="md" color={headingColor} mb={2}>
          {announcement.title}
        </Heading>
        <Text color={textColor}>
          {announcement.content}
        </Text>
      </Box>
    </MotionBox>
  );
};

const Announcements = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const textSize = useBreakpointValue({ base: "md", md: "lg" });

  const announcements = [
    {
      title: "New Workshop Series Starting Soon",
      content: "We're excited to announce a new series of workshops focused on modern web development. Stay tuned for more details!",
      date: "2024-03-10",
      type: "info",
    },
    {
      title: "Registration Open for March Events",
      content: "Registration is now open for all March events. Don't miss out on these exciting opportunities!",
      date: "2024-03-05",
      type: "success",
    },
    {
      title: "Important: Platform Maintenance",
      content: "Our platform will undergo maintenance this weekend. Please save your work and log out before the scheduled time.",
      date: "2024-03-01",
      type: "warning",
    },
    {
      title: "New Feature Release",
      content: "We've just released new features to improve your learning experience. Check out the updates in your dashboard!",
      date: "2024-02-28",
      type: "info",
    },
    {
      title: "Community Guidelines Update",
      content: "We've updated our community guidelines to ensure a better experience for everyone. Please review the changes.",
      date: "2024-02-25",
      type: "info",
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h1"
              size={headingSize}
              color={headingColor}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              Announcements
            </Heading>
            <Text fontSize={textSize} color={textColor} maxW="2xl">
              Stay updated with the latest news, updates, and important information from our community.
            </Text>
          </VStack>

          <Stack spacing={6} width="full">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={index} announcement={announcement} />
            ))}
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Announcements; 