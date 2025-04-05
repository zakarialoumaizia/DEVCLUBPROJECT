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
  Badge,
  Button,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const EventCard = ({ event, isPast }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
        height="full"
      >
        <Image
          src={event.image}
          alt={event.title}
          height="200px"
          objectFit="cover"
        />
        <CardHeader>
          <Stack spacing={2}>
            <Heading size="md" color={headingColor}>
              {event.title}
            </Heading>
            <HStack spacing={4}>
              <Badge colorScheme={isPast ? "gray" : "green"}>
                {isPast ? "Past Event" : "Upcoming"}
              </Badge>
              <Badge colorScheme="blue">
                {event.type}
              </Badge>
            </HStack>
          </Stack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaCalendar} color="blue.500" />
              <Text color={textColor}>{event.date}</Text>
            </HStack>
            <HStack>
              <Icon as={FaClock} color="blue.500" />
              <Text color={textColor}>{event.time}</Text>
            </HStack>
            <HStack>
              <Icon as={FaMapMarkerAlt} color="blue.500" />
              <Text color={textColor}>{event.location}</Text>
            </HStack>
            <HStack>
              <Icon as={FaUsers} color="blue.500" />
              <Text color={textColor}>{event.capacity} spots</Text>
            </HStack>
            <Text color={textColor} noOfLines={3}>
              {event.description}
            </Text>
          </VStack>
        </CardBody>
        <CardFooter>
          <Button
            leftIcon={<FaTicketAlt />}
            colorScheme="blue"
            width="full"
            isDisabled={isPast}
          >
            {isPast ? "Event Ended" : "Register Now"}
          </Button>
        </CardFooter>
      </Card>
    </MotionBox>
  );
};

const Events = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const textSize = useBreakpointValue({ base: "md", md: "lg" });

  const upcomingEvents = [
    {
      title: "Web Development Workshop",
      date: "2024-03-15",
      time: "10:00 AM - 2:00 PM",
      location: "Virtual Event",
      type: "Workshop",
      capacity: 50,
      description: "Learn the latest web development techniques and best practices in this hands-on workshop.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Tech Career Panel",
      date: "2024-03-20",
      time: "3:00 PM - 5:00 PM",
      location: "Main Hall",
      type: "Panel Discussion",
      capacity: 100,
      description: "Join industry experts as they share insights about careers in technology and answer your questions.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const pastEvents = [
    {
      title: "Introduction to React",
      date: "2024-02-15",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      type: "Workshop",
      capacity: 30,
      description: "A comprehensive introduction to React.js fundamentals and best practices.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Networking Night",
      date: "2024-02-01",
      time: "6:00 PM - 9:00 PM",
      location: "Community Center",
      type: "Networking",
      capacity: 75,
      description: "An evening of networking with industry professionals and fellow developers.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
              Events & Workshops
            </Heading>
            <Text fontSize={textSize} color={textColor} maxW="2xl">
              Join us for exciting events, workshops, and networking opportunities designed to help you grow as a developer.
            </Text>
          </VStack>

          <Tabs isFitted variant="enclosed" width="full">
            <TabList mb="1em">
              <Tab>Upcoming Events</Tab>
              <Tab>Past Events</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} event={event} isPast={false} />
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
                  {pastEvents.map((event, index) => (
                    <EventCard key={index} event={event} isPast={true} />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default Events;
