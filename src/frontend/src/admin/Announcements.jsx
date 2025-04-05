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
  FaBell,
  FaCalendarAlt,
  FaUser,
} from 'react-icons/fa';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useToast } from '@chakra-ui/react';

const Announcements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'Important Club Meeting',
      content: 'There will be a club meeting next week to discuss upcoming events.',
      date: '2024-03-10',
      status: 'Active',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Workshop Registration',
      content: 'Registration for the Web Development workshop is now open.',
      date: '2024-03-12',
      status: 'Active',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Club Elections',
      content: 'Club elections will be held next month.',
      date: '2024-03-15',
      status: 'Inactive',
      priority: 'High'
    }
  ];

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditing(false);
    onOpen();
  };

  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteAnnouncement = (announcementId) => {
    // Mock announcement deletion
    toast({
      title: "Success",
      description: "Announcement deleted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCreateAnnouncement = (announcementData) => {
    // Mock announcement creation
    toast({
      title: "Success",
      description: "Announcement created successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateAnnouncement = (announcementId, announcementData) => {
    // Mock announcement update
    toast({
      title: "Success",
      description: "Announcement updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar />
      <Box ml={{ base: 0, md: '240px' }} p={4}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Announcements Management</Heading>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={() => {
                setSelectedAnnouncement(null);
                setIsEditing(true);
                onOpen();
              }}
            >
              Create Announcement
            </Button>
          </HStack>

          <HStack spacing={4}>
            <Input
              placeholder="Search announcements..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Date</Th>
                  <Th>Priority</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAnnouncements.map((announcement) => (
                  <Tr key={announcement.id}>
                    <Td>{announcement.title}</Td>
                    <Td>{announcement.author}</Td>
                    <Td>{announcement.date}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          announcement.priority === 'high'
                            ? 'red'
                            : announcement.priority === 'medium'
                            ? 'yellow'
                            : 'green'
                        }
                      >
                        {announcement.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          announcement.status === 'active'
                            ? 'green'
                            : announcement.status === 'inactive'
                            ? 'red'
                            : 'gray'
                        }
                      >
                        {announcement.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaEdit />}
                          size="sm"
                          onClick={() => handleEditAnnouncement(announcement)}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
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
            {isEditing ? (selectedAnnouncement ? 'Edit Announcement' : 'Create Announcement') : 'Announcement Details'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isEditing ? (
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Enter announcement title"
                    defaultValue={selectedAnnouncement?.title}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    placeholder="Enter announcement content"
                    rows={4}
                    defaultValue={selectedAnnouncement?.content}
                  />
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isRequired>
                    <FormLabel>Priority</FormLabel>
                    <Select defaultValue={selectedAnnouncement?.priority}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue={selectedAnnouncement?.status}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </Select>
                  </FormControl>
                </Grid>
              </VStack>
            ) : (
              selectedAnnouncement && (
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Text>{selectedAnnouncement.title}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Text>{selectedAnnouncement.content}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Author</FormLabel>
                    <Text>{selectedAnnouncement.author}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Text>{selectedAnnouncement.date}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Priority</FormLabel>
                    <Badge
                      colorScheme={
                        selectedAnnouncement.priority === 'high'
                          ? 'red'
                          : selectedAnnouncement.priority === 'medium'
                          ? 'yellow'
                          : 'green'
                      }
                    >
                      {selectedAnnouncement.priority}
                    </Badge>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Badge
                      colorScheme={
                        selectedAnnouncement.status === 'active'
                          ? 'green'
                          : selectedAnnouncement.status === 'inactive'
                          ? 'red'
                          : 'gray'
                      }
                    >
                      {selectedAnnouncement.status}
                    </Badge>
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
                {selectedAnnouncement ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Announcements; 