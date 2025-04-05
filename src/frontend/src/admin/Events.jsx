import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Input,
  Select,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useToast } from '@chakra-ui/react';

const Events = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toast = useToast();

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2024-03-15',
      location: 'Main Hall',
      status: 'Upcoming',
      attendees: 45,
      description: 'Learn the basics of web development with HTML, CSS, and JavaScript.'
    },
    {
      id: 2,
      title: 'AI Conference',
      date: '2024-03-20',
      location: 'Auditorium',
      status: 'Upcoming',
      attendees: 100,
      description: 'Explore the latest developments in Artificial Intelligence.'
    },
    {
      id: 3,
      title: 'Coding Competition',
      date: '2024-03-25',
      location: 'Computer Lab',
      status: 'Completed',
      attendees: 30,
      description: 'Annual coding competition for all skill levels.'
    }
  ];

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsEditing(false);
    onOpen();
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteEvent = (eventId) => {
    // Mock event deletion
    toast({
      title: "Success",
      description: "Event deleted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCreateEvent = (eventData) => {
    // Mock event creation
    toast({
      title: "Success",
      description: "Event created successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateEvent = (eventId, eventData) => {
    // Mock event update
    toast({
      title: "Success",
      description: "Event updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar />
      <Box ml={{ base: 0, md: '240px' }} p={4}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Events Management</Heading>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={() => {
                setSelectedEvent(null);
                setIsEditing(true);
                onOpen();
              }}
            >
              Create Event
            </Button>
          </HStack>

          <HStack spacing={4}>
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftElement={<FaSearch />}
            />
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Location</Th>
                  <Th>Attendees</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredEvents.map((event) => (
                  <Tr key={event.id}>
                    <Td>{event.title}</Td>
                    <Td>{event.date}</Td>
                    <Td>{event.time}</Td>
                    <Td>{event.location}</Td>
                    <Td>{event.attendees}/{event.maxAttendees}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          event.status === 'upcoming'
                            ? 'green'
                            : event.status === 'ongoing'
                            ? 'blue'
                            : event.status === 'completed'
                            ? 'gray'
                            : 'red'
                        }
                      >
                        {event.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaEdit />}
                          size="sm"
                          onClick={() => handleEditEvent(event)}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteEvent(event.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? (selectedEvent ? 'Edit Event' : 'Create Event') : 'Event Details'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isEditing ? (
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Enter event title"
                    defaultValue={selectedEvent?.title}
                  />
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      defaultValue={selectedEvent?.date}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input
                      type="time"
                      defaultValue={selectedEvent?.time}
                    />
                  </FormControl>
                </Grid>
                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input
                    placeholder="Enter event location"
                    defaultValue={selectedEvent?.location}
                  />
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isRequired>
                    <FormLabel>Max Attendees</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter maximum number of attendees"
                      defaultValue={selectedEvent?.maxAttendees}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue={selectedEvent?.status}>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </FormControl>
                </Grid>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter event description"
                    rows={4}
                    defaultValue={selectedEvent?.description}
                  />
                </FormControl>
              </VStack>
            ) : (
              selectedEvent && (
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Text>{selectedEvent.title}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date & Time</FormLabel>
                    <Text>{selectedEvent.date} at {selectedEvent.time}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Text>{selectedEvent.location}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Attendees</FormLabel>
                    <Text>{selectedEvent.attendees}/{selectedEvent.maxAttendees}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Badge
                      colorScheme={
                        selectedEvent.status === 'upcoming'
                          ? 'green'
                          : selectedEvent.status === 'ongoing'
                          ? 'blue'
                          : selectedEvent.status === 'completed'
                          ? 'gray'
                          : 'red'
                      }
                    >
                      {selectedEvent.status}
                    </Badge>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Text>{selectedEvent.description}</Text>
                  </FormControl>
                </VStack>
              )
            )}
          </ModalBody>
          {isEditing && (
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">
                {selectedEvent ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Events; 