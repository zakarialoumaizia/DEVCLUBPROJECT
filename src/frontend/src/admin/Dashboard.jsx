import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, useColorModeValue } from '@chakra-ui/react';
import { getAdminProfile, getAdminLoginHistory, getAnalytics } from '../services/api';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Spacer,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Icon,
  Divider,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  StatGroup,
  Skeleton,
  Avatar,
} from '@chakra-ui/react';
import {
  FaUserShield,
  FaHistory,
  FaSignOutAlt,
  FaCalendarAlt,
  FaClock,
  FaDesktop,
  FaNetworkWired,
  FaUserCog,
  FaShieldAlt,
  FaBullhorn,
  FaUsers,
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const AdminDashboard = () => {
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.700');
  const statBg = useColorModeValue('blue.50', 'blue.900');

  // Hooks
  const navigate = useNavigate();
  const toast = useToast();
  const [admin, setAdmin] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add new state for analytics
  const [analytics, setAnalytics] = useState({
    events: {
      total: 0,
      upcoming: 0,
      completed: 0,
      avgParticipants: 0
    },
    announcements: {
      total: 0,
      active: 0,
      highPriority: 0
    },
    students: {
      total: 0,
      active: 0,
      organizers: 0,
      newMembers: 0
    },
    users: {
      total: 0,
      active: 0,
      newUsers: 0
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [adminData, historyData, analyticsData] = await Promise.all([
          getAdminProfile(),
          getAdminLoginHistory(),
          getAnalytics() // You'll need to implement this in api.js
        ]);
        
        setAdmin(adminData);
        setLoginHistory(historyData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError(error.message || 'Failed to load admin data');
        
        if (error.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          toast({
            title: 'Session Expired',
            description: 'Please log in again to continue',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        } else {
          toast({
            title: 'Error',
            description: error.message || 'Failed to load admin data',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast({
      title: 'Logged Out Successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} p={8}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Skeleton height="200px" />
            <Skeleton height="200px" />
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} p={8}>
        <Container maxW="container.xl">
          <Card p={6} bg={cardBg}>
            <Icon as={FaShieldAlt} boxSize={8} color="red.500" mb={4} />
            <Heading size="lg" color="red.500" mb={2}>Error Loading Dashboard</Heading>
            <Text color={textColor}>{error}</Text>
            <Button mt={4} colorScheme="blue" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Sidebar />
      <Box ml={{ base: 0, md: "250px" }} transition=".3s ease">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          p={8}
        >
          <Container maxW="container.xl">
            {/* Header */}
            <Flex mb={8} align="center">
              <HStack spacing={4}>
                <Icon as={FaUserShield} boxSize={8} color="blue.500" />
                <Heading size="lg" color={textColor}>
                  Admin Dashboard
                </Heading>
              </HStack>
              <Spacer />
              <Button
                leftIcon={<FaSignOutAlt />}
                colorScheme="red"
                variant="outline"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Flex>

            {admin && (
              <>
                {/* Analytics Overview */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6} mb={8}>
                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaCalendarAlt} />
                              <Text>Events</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {analytics.events.total}
                          </StatNumber>
                          <StatHelpText>
                            <HStack>
                              <Badge colorScheme="green">{analytics.events.upcoming} Upcoming</Badge>
                              <Badge colorScheme="blue">{analytics.events.completed} Completed</Badge>
                            </HStack>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaBullhorn} />
                              <Text>Announcements</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {analytics.announcements.active}
                          </StatNumber>
                          <StatHelpText>
                            <Badge colorScheme="red">{analytics.announcements.highPriority} High Priority</Badge>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaUsers} />
                              <Text>Members</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {analytics.students.total}
                          </StatNumber>
                          <StatHelpText>
                            <HStack>
                              <Badge colorScheme="purple">{analytics.students.organizers} Organizers</Badge>
                              <Badge colorScheme="green">{analytics.students.active} Active</Badge>
                            </HStack>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaUserGraduate} />
                              <Text>Users</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {analytics.users.total}
                          </StatNumber>
                          <StatHelpText>
                            <HStack>
                              <Badge colorScheme="blue">{analytics.users.active} Active</Badge>
                              <Badge colorScheme="green">{analytics.users.newUsers} New</Badge>
                            </HStack>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaChartLine} />
                              <Text>Growth</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {analytics.students.newMembers}
                          </StatNumber>
                          <StatHelpText>
                            <Text color="gray.500">New members in 30 days</Text>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                {/* Admin Profile and Stats */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <HStack spacing={4} width="full">
                          <Avatar
                            size="lg"
                            name={admin.full_name}
                            bg="blue.500"
                            color="white"
                          />
                          <VStack align="start" spacing={1}>
                            <Heading size="md" color={textColor}>
                              {admin.full_name}
                            </Heading>
                            <Text color="gray.500" fontSize="sm">
                              {admin.email}
                            </Text>
                            <Badge
                              colorScheme={admin.is_super_admin ? "purple" : "blue"}
                              variant="subtle"
                              rounded="full"
                              px={3}
                              py={1}
                            >
                              {admin.is_super_admin ? "Super Admin" : "Admin"}
                            </Badge>
                          </VStack>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaHistory} />
                              <Text>Last Login</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            {loginHistory[0] ? formatDate(loginHistory[0].login_time) : 'N/A'}
                          </StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            Active Session
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
                    <CardBody>
                      <StatGroup>
                        <Stat>
                          <StatLabel color="gray.500">
                            <HStack>
                              <Icon as={FaUserCog} />
                              <Text>Account Status</Text>
                            </HStack>
                          </StatLabel>
                          <StatNumber color={textColor} fontSize="2xl">
                            Active
                          </StatNumber>
                          <StatHelpText>
                            <Badge colorScheme="green">Verified</Badge>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                {/* Login History */}
                <Card bg={cardBg} boxShadow="sm" borderRadius="lg" mb={8}>
                  <CardHeader>
                    <HStack>
                      <Icon as={FaHistory} color="blue.500" />
                      <Heading size="md" color={textColor}>
                        Recent Login Activity
                      </Heading>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Date & Time</Th>
                            <Th>IP Address</Th>
                            <Th>Device</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {loginHistory.map((login, index) => (
                            <Tr key={index}>
                              <Td>{formatDate(login.login_time)}</Td>
                              <Td>
                                <HStack>
                                  <Icon as={FaNetworkWired} color="gray.500" />
                                  <Text>{login.ip_address}</Text>
                                </HStack>
                              </Td>
                              <Td>
                                <HStack>
                                  <Icon as={FaDesktop} color="gray.500" />
                                  <Text>{login.user_agent}</Text>
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </CardBody>
                </Card>
              </>
            )}
          </Container>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 