import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Icon,
  SimpleGrid,
  Button,
  useColorMode,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Input,
  Stack,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  FaCode, 
  FaUsers, 
  FaLaptopCode, 
  FaLightbulb, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

// Create motion components
const MotionBox = motion(Box);

// Feature card component for better reusability
const FeatureCard = ({ icon, title, description, color }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconSize = useBreakpointValue({ base: 8, md: 10 });
  
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={bgColor}
        p={{ base: 4, md: 6 }}
        rounded="xl"
        shadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
        height="full"
      >
        <Icon
          as={icon}
          w={iconSize}
          h={iconSize}
          color={useColorModeValue(`${color}.500`, `${color}.300`)}
          mb={4}
        />
        <Heading 
          size={{ base: "sm", md: "md" }}
          mb={2} 
          color={useColorModeValue(`${color}.600`, `${color}.300`)}
        >
          {title}
        </Heading>
        <Text color={textColor} fontSize={{ base: "sm", md: "md" }}>
          {description}
        </Text>
      </Box>
    </MotionBox>
  );
};

// Event card component for better reusability
const EventCard = ({ event, index }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const brandColor = useColorModeValue('blue.500', 'blue.300');
  const imageHeight = useBreakpointValue({ base: 150, md: 200 });
  
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={bgColor}
        rounded="xl"
        shadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
        height="full"
      >
        {/* Event Image */}
        <Box position="relative" height={imageHeight} width="100%">
          <Box
            bg={useColorModeValue('blue.100', 'blue.900')}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={FaCalendarAlt}
              w={{ base: 8, md: 12 }}
              h={{ base: 8, md: 12 }}
              color={useColorModeValue('blue.500', 'blue.300')}
            />
          </Box>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)"
          />
        </Box>

        {/* Event Details */}
        <Box p={{ base: 4, md: 6 }}>
          <Heading size={{ base: "sm", md: "md" }} mb={4} color={brandColor}>
            {event.title}
          </Heading>
          <VStack spacing={3} align="stretch">
            <HStack>
              <Icon as={FaCalendarAlt} color={brandColor} />
              <Text fontSize={{ base: "sm", md: "md" }}>{event.date}</Text>
            </HStack>
            <HStack>
              <Icon as={FaClock} color={brandColor} />
              <Text fontSize={{ base: "sm", md: "md" }}>{event.time}</Text>
            </HStack>
            <HStack>
              <Icon as={FaMapMarkerAlt} color={brandColor} />
              <Text fontSize={{ base: "sm", md: "md" }}>{event.location}</Text>
            </HStack>
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Available:</Text>
              <Badge colorScheme={event.spots - event.registered < 10 ? "red" : "green"} fontSize="sm" px={2} py={1} borderRadius="full">
                {event.spots - event.registered}/{event.spots}
              </Badge>
            </Flex>
            <Button
              colorScheme="blue"
              size={{ base: "md", md: "lg" }}
              leftIcon={<FaCalendarAlt />}
              mt={2}
              w="full"
            >
              Register Now
            </Button>
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  );
};

// Section heading component for consistency
const SectionHeading = ({ badge, title }) => {
  const brandBgColor = useColorModeValue('blue.100', 'blue.900');
  const brandTextColor = useColorModeValue('blue.700', 'blue.100');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  
  return (
    <VStack spacing={4} textAlign="center" mb={8}>
      <Badge 
        fontSize={{ base: "sm", md: "md" }}
        px={4} 
        py={2} 
        borderRadius="full"
        bg={brandBgColor}
        color={brandTextColor}
      >
        {badge}
      </Badge>
      <Heading 
        size={{ base: "lg", md: "xl" }}
        color={headingColor}
      >
        {title}
      </Heading>
    </VStack>
  );
};

const Home = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const { colorMode, toggleColorMode } = useColorMode();
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const textSize = useBreakpointValue({ base: "lg", md: "xl" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const features = [
    {
      icon: FaCode,
      title: 'Hands-on Learning',
      description: 'Learn by doing with real-world projects and practical workshops that build your portfolio.',
      color: 'blue',
    },
    {
      icon: FaUsers,
      title: 'Vibrant Community',
      description: 'Connect with like-minded developers, share knowledge, and collaborate on exciting projects.',
      color: 'blue',
    },
    {
      icon: FaLaptopCode,
      title: 'Expert Mentorship',
      description: 'Get guidance from experienced developers and industry professionals who are passionate about teaching.',
      color: 'blue',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation Hub',
      description: 'Explore cutting-edge technologies and develop innovative solutions to real-world problems.',
      color: 'blue',
    },
  ];

  const stats = [
    { label: 'Active Members', value: '500+', change: '+20%' },
    { label: 'Success Stories', value: '200+', change: '+15%' },
    { label: 'Projects Launched', value: '100+', change: '+25%' },
    { label: 'Industry Partners', value: '20+', change: '+10%' },
  ];

  const upcomingEvents = [
    {
      title: 'Web Development Workshop',
      date: '15 April 2024',
      time: '14:00 - 17:00',
      location: 'Tech Hub, Room 101',
      spots: 30,
      registered: 25,
    },
    {
      title: 'Game Development Hackathon',
      date: '20 April 2024',
      time: '09:00 - 18:00',
      location: 'Computer Lab 2',
      spots: 50,
      registered: 35,
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h1"
              size={headingSize}
              mb={4}
              color={useColorModeValue('blue.600', 'blue.300')}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              Welcome to DevClub
            </Heading>
            <Text fontSize={textSize} color={useColorModeValue('gray.600', 'gray.300')} mb={8}>
              Join our community of developers and innovators
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              justify="center"
            >
              <Button
                as={RouterLink}
                to="/join"
                colorScheme="blue"
                size={buttonSize}
                px={8}
              >
                Join Now
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                variant="outline"
                colorScheme="blue"
                size={buttonSize}
                px={8}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <VStack spacing={12}>
          <SectionHeading
            badge="Why Choose DevClub?"
            title="Why Join Our Club?"
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 4, md: 8 }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Stats Section */}
      <Box bg={bgColor} py={{ base: 10, md: 16 }}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <SectionHeading
              badge="Our Impact"
              title="Numbers that speak for themselves"
            />
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={{ base: 4, md: 8 }}
            >
              {stats.map((stat, index) => (
                <Stat key={index} textAlign="center">
                  <StatLabel fontSize={{ base: "md", md: "lg" }} color={useColorModeValue('gray.600', 'gray.300')}>
                    {stat.label}
                  </StatLabel>
                  <StatNumber
                    fontSize={{ base: "3xl", md: "4xl" }}
                    color={useColorModeValue('blue.500', 'blue.300')}
                  >
                    {stat.value}
                  </StatNumber>
                  <StatHelpText color={useColorModeValue('green.500', 'green.300')}>
                    <StatArrow
                      type="increase"
                      color={useColorModeValue('green.500', 'green.300')}
                    />
                    {stat.change}
                  </StatHelpText>
                </Stat>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Events Section */}
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <VStack spacing={12}>
          <SectionHeading
            badge="Upcoming Events"
            title="Join Our Next Events"
          />
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 4, md: 8 }}
          >
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event} index={index} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;