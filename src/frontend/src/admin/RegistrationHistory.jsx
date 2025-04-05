import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  HStack,
  Text,
  Badge,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { FaSearch, FaUser, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';

const MotionBox = motion.create(Box);

const RegistrationHistory = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRegistrations = async () => {
      try {
        // Simulated data
        const mockData = [
          {
            id: 1,
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            date: '2024-03-15',
            status: 'completed',
          },
          {
            id: 2,
            name: 'سارة أحمد',
            email: 'sara@example.com',
            date: '2024-03-14',
            status: 'pending',
          },
          // Add more mock data as needed
        ];
        setRegistrations(mockData);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && reg.status === 'completed') ||
      (filter === 'pending' && reg.status === 'pending');

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return 'غير معروف';
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar />
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ml="250px"
        p={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} align="stretch">
            <Heading size="xl" color={textColor}>
              سجل التسجيل
            </Heading>

            <Card>
              <CardHeader>
                <HStack spacing={4}>
                  <InputGroup maxW="300px">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaSearch} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="بحث..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>

                  <Select
                    maxW="200px"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="completed">مكتمل</option>
                    <option value="pending">قيد الانتظار</option>
                  </Select>
                </HStack>
              </CardHeader>

              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>#</Th>
                        <Th>
                          <HStack>
                            <Icon as={FaUser} />
                            <Text>الاسم</Text>
                          </HStack>
                        </Th>
                        <Th>
                          <HStack>
                            <Icon as={FaEnvelope} />
                            <Text>البريد الإلكتروني</Text>
                          </HStack>
                        </Th>
                        <Th>
                          <HStack>
                            <Icon as={FaCalendarAlt} />
                            <Text>تاريخ التسجيل</Text>
                          </HStack>
                        </Th>
                        <Th>الحالة</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredRegistrations.map((reg, index) => (
                        <Tr key={reg.id}>
                          <Td>{index + 1}</Td>
                          <Td>{reg.name}</Td>
                          <Td>{reg.email}</Td>
                          <Td>{reg.date}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(reg.status)}>
                              {getStatusText(reg.status)}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default RegistrationHistory; 