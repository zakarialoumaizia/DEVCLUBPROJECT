import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  useColorModeValue,
  Image,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { adminLogin } from '../services/api';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await adminLogin(email, password);
      
      if (response.access_token) {
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred during login',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={12} px={6}>
      <Container maxW="lg">
        <MotionFlex
          direction={{ base: 'column', md: 'row' }}
          overflow="hidden"
          bg={bgColor}
          rounded="xl"
          boxShadow="2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side - Login Form */}
          <Box p={8} width={{ base: "full", md: "50%" }}>
            <VStack spacing={6} align="flex-start" w="full">
              <VStack spacing={2} align="flex-start" w="full">
                <Heading size="lg" color={textColor}>
                  Welcome Back
                </Heading>
                <Text color="gray.500" fontSize="md">
                  Sign in to access your admin dashboard
                </Text>
              </VStack>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Email Address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      bg={inputBg}
                      borderColor={borderColor}
                      _hover={{ borderColor: 'blue.500' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        bg={inputBg}
                        borderColor={borderColor}
                        _hover={{ borderColor: 'blue.500' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          color="gray.400"
                          _hover={{ color: 'blue.500' }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    width="full"
                    isLoading={loading}
                    loadingText="Signing in..."
                    leftIcon={<FaLock />}
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>

          {/* Right side - Decorative */}
          <Box
            display={{ base: 'none', md: 'block' }}
            width="50%"
            bg="blue.500"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="blue.600"
              opacity="0.9"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={8}
              color="white"
              textAlign="center"
            >
              <Heading size="lg" mb={4}>
                Dev Club Admin Portal
              </Heading>
              <Text fontSize="md">
                Manage your club's activities, members, and content from one central dashboard
              </Text>
            </Box>
          </Box>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default AdminLogin; 