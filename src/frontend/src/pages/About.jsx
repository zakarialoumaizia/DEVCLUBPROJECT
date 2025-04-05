import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  SimpleGrid,
  Image,
  Icon,
  useBreakpointValue,
  Stack,
  Divider,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaCode,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaHandshake,
  FaRocket,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const textSize = useBreakpointValue({ base: "md", md: "lg" });
  const iconSize = useBreakpointValue({ base: 8, md: 10 });

  const values = [
    {
      icon: FaCode,
      title: 'Technical Excellence',
      description: 'We strive for technical excellence in everything we do, from coding practices to project delivery.',
    },
    {
      icon: FaUsers,
      title: 'Community First',
      description: 'Our community is at the heart of everything we do. We believe in the power of collaboration and shared learning.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative solutions to tackle real-world challenges.',
    },
    {
      icon: FaGraduationCap,
      title: 'Continuous Learning',
      description: 'We believe in lifelong learning and provide opportunities for continuous growth and development.',
    },
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'Founder & Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Jane Smith',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Mike Johnson',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 10, md: 20 }}>
      {/* Hero Section */}
      <Container maxW="container.xl" mb={{ base: 10, md: 20 }}>
        <VStack spacing={6} textAlign="center">
          <Heading
            as="h1"
            size={headingSize}
            color={headingColor}
            bgGradient="linear(to-r, blue.500, purple.500)"
            bgClip="text"
          >
            About DevClub
          </Heading>
          <Text fontSize={textSize} color={textColor} maxW="3xl">
            We are a community of passionate developers dedicated to learning, sharing, and building the future of technology.
          </Text>
        </VStack>
      </Container>

      {/* Mission Section */}
      <Box bg={cardBgColor} py={{ base: 10, md: 20 }}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 12 }} alignItems="center">
            <VStack align="start" spacing={6}>
              <Heading size="xl" color={headingColor}>
                Our Mission
              </Heading>
              <Text fontSize={textSize} color={textColor}>
                At DevClub, we're on a mission to empower developers worldwide through education, collaboration, and innovation. We believe that everyone should have access to quality tech education and the opportunity to build amazing things.
              </Text>
              <Text fontSize={textSize} color={textColor}>
                Our platform provides a space where developers can learn, share knowledge, and work together on exciting projects that make a difference.
              </Text>
            </VStack>
            <Box
              bg={bgColor}
              p={6}
              rounded="xl"
              shadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                rounded="lg"
                objectFit="cover"
                height="400px"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxW="container.xl" py={{ base: 10, md: 20 }}>
        <VStack spacing={12}>
          <Heading size="xl" color={headingColor} textAlign="center">
            Our Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 6, md: 8 }}>
            {values.map((value, index) => (
              <MotionBox
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  bg={cardBgColor}
                  p={6}
                  rounded="xl"
                  shadow="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                  height="full"
                >
                  <Icon
                    as={value.icon}
                    w={iconSize}
                    h={iconSize}
                    color="blue.500"
                    mb={4}
                  />
                  <Heading size="md" mb={2} color={headingColor}>
                    {value.title}
                  </Heading>
                  <Text color={textColor} fontSize={textSize}>
                    {value.description}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Team Section */}
      <Box bg={cardBgColor} py={{ base: 10, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading size="xl" color={headingColor} textAlign="center">
              Meet Our Team
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 12 }}>
              {team.map((member, index) => (
                <MotionBox
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    bg={bgColor}
                    p={6}
                    rounded="xl"
                    shadow="md"
                    borderWidth="1px"
                    borderColor={borderColor}
                    textAlign="center"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      rounded="full"
                      width="150px"
                      height="150px"
                      mx="auto"
                      mb={4}
                      objectFit="cover"
                    />
                    <Heading size="md" mb={2} color={headingColor}>
                      {member.name}
                    </Heading>
                    <Text color={textColor} fontSize={textSize}>
                      {member.role}
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Container maxW="container.xl" py={{ base: 10, md: 20 }}>
        <Box
          bg={useColorModeValue('blue.50', 'blue.900')}
          p={{ base: 6, md: 12 }}
          rounded="xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading size="xl" color={headingColor}>
              Join Our Community
            </Heading>
            <Text fontSize={textSize} color={textColor} maxW="2xl">
              Be part of a thriving community of developers who are passionate about technology and innovation.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/join"
                colorScheme="blue"
                size="lg"
                leftIcon={<FaHandshake />}
              >
                Join Now
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                variant="outline"
                colorScheme="blue"
                size="lg"
                leftIcon={<FaRocket />}
              >
                Get Started
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
