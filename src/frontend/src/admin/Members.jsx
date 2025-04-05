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
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

const Members = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toast = useToast();

  // Mock data for members
  const members = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Computer Science',
      level: 'L3',
      status: 'Active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Engineering',
      level: 'M1',
      status: 'Active',
      joinDate: '2023-02-01'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      department: 'Mathematics',
      level: 'L2',
      status: 'Inactive',
      joinDate: '2023-03-10'
    }
  ];

  const handleViewMember = (member) => {
    setSelectedMember(member);
    onOpen();
  };

  const handleApproveMember = (memberId) => {
    // Mock approval
    toast({
      title: "Success",
      description: "Member approved successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRejectMember = (memberId) => {
    // Mock rejection
    toast({
      title: "Success",
      description: "Member rejected successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.registrationNumber.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || member.level === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar />
      <Box ml={{ base: 0, md: '240px' }} p={4}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Members Management</Heading>
            <Button colorScheme="blue">Add New Member</Button>
          </HStack>

          <HStack spacing={4}>
            <Input
              placeholder="Search members..."
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
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Select
              placeholder="Level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="M1">M1</option>
              <option value="M2">M2</option>
              <option value="PHD">PhD</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Registration Number</Th>
                  <Th>Faculty</Th>
                  <Th>Level</Th>
                  <Th>Status</Th>
                  <Th>Join Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredMembers.map((member) => (
                  <Tr key={member.id}>
                    <Td>{member.name}</Td>
                    <Td>{member.registrationNumber}</Td>
                    <Td>{member.faculty}</Td>
                    <Td>{member.level}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          member.status === 'active'
                            ? 'green'
                            : member.status === 'pending'
                            ? 'yellow'
                            : 'red'
                        }
                      >
                        {member.status}
                      </Badge>
                    </Td>
                    <Td>{member.joinDate}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaEye />}
                          size="sm"
                          onClick={() => handleViewMember(member)}
                        />
                        {member.status === 'pending' && (
                          <>
                            <IconButton
                              icon={<FaCheck />}
                              size="sm"
                              colorScheme="green"
                              onClick={() => handleApproveMember(member.id)}
                            />
                            <IconButton
                              icon={<FaTimes />}
                              size="sm"
                              colorScheme="red"
                              onClick={() => handleRejectMember(member.id)}
                            />
                          </>
                        )}
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
          <ModalHeader>Member Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedMember && (
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Text>{selectedMember.name}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Text>{selectedMember.email}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Registration Number</FormLabel>
                  <Text>{selectedMember.registrationNumber}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Faculty</FormLabel>
                  <Text>{selectedMember.faculty}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Level</FormLabel>
                  <Text>{selectedMember.level}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Badge
                    colorScheme={
                      selectedMember.status === 'active'
                        ? 'green'
                        : selectedMember.status === 'pending'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {selectedMember.status}
                  </Badge>
                </FormControl>
                <FormControl>
                  <FormLabel>Join Date</FormLabel>
                  <Text>{selectedMember.joinDate}</Text>
                </FormControl>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Members; 