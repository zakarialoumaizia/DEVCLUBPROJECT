import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Button,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaUsers, FaLaptopCode, FaLightbulb } from 'react-icons/fa';

const ClubPresident = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform using React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '/projects/ecommerce.jpg',
      link: 'https://github.com/username/ecommerce',
    },
    {
      title: 'AI Chat Application',
      description: 'Developed a real-time chat application with AI integration',
      tech: ['Python', 'TensorFlow', 'WebSocket'],
      image: '/projects/chat.jpg',
      link: 'https://github.com/username/ai-chat',
    },
    {
      title: 'Mobile App Development',
      description: 'Created a cross-platform mobile app using React Native',
      tech: ['React Native', 'Firebase', 'Redux'],
      image: '/projects/mobile.jpg',
      link: 'https://github.com/username/mobile-app',
    },
  ];

  const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: 'Backend Development', level: 85 },
    { name: 'Mobile Development', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Project Management', level: 90 },
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Hero Section */}
          <HStack
            spacing={8}
            bg={bgColor}
            p={8}
            rounded="xl"
            shadow="lg"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box flex={1}>
              <Image
                src="/president.jpg"
                alt="Club President"
                rounded="full"
                boxSize={{ base: '200px', md: '300px' }}
                objectFit="cover"
                mx="auto"
                mb={{ base: 6, md: 0 }}
              />
            </Box>
            <Box flex={2}>
              <Heading
                as="h1"
                size="2xl"
                color={headingColor}
                mb={4}
                textAlign={{ base: 'center', md: 'left' }}
              >
                John Doe
              </Heading>
              <Text
                fontSize="xl"
                color="blue.500"
                mb={4}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Full Stack Developer & Club President
              </Text>
              <Text
                fontSize="lg"
                color={textColor}
                mb={6}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Passionate about technology and community building. Leading the DevClub
                to new heights in innovation and technical excellence.
              </Text>
              <HStack spacing={4} justify={{ base: 'center', md: 'flex-start' }}>
                <Link href="https://github.com/username" isExternal>
                  <Icon as={FaGithub} w={6} h={6} color="gray.600" />
                </Link>
                <Link href="https://linkedin.com/in/username" isExternal>
                  <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
                </Link>
                <Link href="https://twitter.com/username" isExternal>
                  <Icon as={FaTwitter} w={6} h={6} color="blue.400" />
                </Link>
                <Link href="mailto:president@devclub.com">
                  <Icon as={FaEnvelope} w={6} h={6} color="red.500" />
                </Link>
              </HStack>
            </Box>
          </HStack>

          {/* Tabs Section */}
          <Box bg={bgColor} p={8} rounded="xl" shadow="lg">
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>About</Tab>
                <Tab>Projects</Tab>
                <Tab>Skills</Tab>
                <Tab>Contact</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="lg" color={headingColor}>About Me</Heading>
                    <Text color={textColor}>
                      I am a passionate developer and community leader with over 5 years of experience
                      in software development. As the president of DevClub, I focus on creating an
                      inclusive environment where students can learn, grow, and innovate together.
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
                        <Icon as={FaCode} w={8} h={8} color="blue.500" mb={2} />
                        <Heading size="md" mb={2}>Technical Expertise</Heading>
                        <Text color={textColor}>Full-stack development, mobile apps, and cloud solutions</Text>
                      </Box>
                      <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
                        <Icon as={FaUsers} w={8} h={8} color="blue.500" mb={2} />
                        <Heading size="md" mb={2}>Leadership</Heading>
                        <Text color={textColor}>Leading teams and fostering innovation</Text>
                      </Box>
                      <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} rounded="md">
                        <Icon as={FaLightbulb} w={8} h={8} color="blue.500" mb={2} />
                        <Heading size="md" mb={2}>Innovation</Heading>
                        <Text color={textColor}>Creating new solutions and approaches</Text>
                      </Box>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="lg" color={headingColor}>Featured Projects</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {projects.map((project, index) => (
                        <Box
                          key={index}
                          bg={useColorModeValue('gray.50', 'gray.700')}
                          rounded="md"
                          overflow="hidden"
                          shadow="md"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            height="200px"
                            width="100%"
                            objectFit="cover"
                          />
                          <Box p={4}>
                            <Heading size="md" mb={2}>{project.title}</Heading>
                            <Text color={textColor} mb={3}>{project.description}</Text>
                            <HStack spacing={2} mb={4}>
                              {project.tech.map((tech, i) => (
                                <Badge key={i} colorScheme="blue">{tech}</Badge>
                              ))}
                            </HStack>
                            <Button
                              as={Link}
                              href={project.link}
                              isExternal
                              colorScheme="blue"
                              size="sm"
                            >
                              View Project
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="lg" color={headingColor}>Skills & Expertise</Heading>
                    {skills.map((skill, index) => (
                      <Box key={index}>
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="medium">{skill.name}</Text>
                          <Text>{skill.level}%</Text>
                        </HStack>
                        <Box
                          h={2}
                          bg={useColorModeValue('gray.200', 'gray.700')}
                          rounded="full"
                          overflow="hidden"
                        >
                          <Box
                            h="100%"
                            w={`${skill.level}%`}
                            bg="blue.500"
                            rounded="full"
                          />
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="lg" color={headingColor}>Get in Touch</Heading>
                    <Text color={textColor}>
                      I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </Text>
                    <HStack spacing={4}>
                      <Button
                        leftIcon={<FaEnvelope />}
                        colorScheme="blue"
                        as={Link}
                        href="mailto:president@devclub.com"
                      >
                        Email Me
                      </Button>
                      <Button
                        leftIcon={<FaLinkedin />}
                        colorScheme="blue"
                        variant="outline"
                        as={Link}
                        href="https://linkedin.com/in/username"
                        isExternal
                      >
                        LinkedIn
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ClubPresident; 