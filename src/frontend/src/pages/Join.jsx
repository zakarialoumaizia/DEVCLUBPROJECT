import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {
    register,
    getCities,
    getFaculties,
    getDepartmentsByFaculty,
    verifyOTP
} from '../services/api';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  useBreakpointValue,
  Icon,
  Divider,
  Text as ChakraText,
  Select,
  Textarea,
  Checkbox,
  Stack,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  FormHelperText,
  SimpleGrid,
  PinInput,
  PinInputField,
  Progress,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaCalendarAlt, FaIdCard, FaEye, FaEyeSlash, FaPhone, FaUniversity, FaBookReader, FaMapMarkerAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Join = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    
    const [formData, setFormData] = useState({
        registration_number: '',
        registration_year: new Date().getFullYear().toString(),
        full_name: '',
        email: '',
        password: '',
        wilaya_code: '',
        commune_name: '',
        faculty_id: '',
        department_id: '',
        level: ''
    });
    
    const [cities, setCities] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        loadInitialData();
    }, []);
    
    const loadInitialData = async () => {
        try {
            const [citiesData, facultiesData] = await Promise.all([
                getCities(),
                getFaculties()
            ]);
            setCities(citiesData);
            setFaculties(facultiesData);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to load initial data',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };
    
    const handleFacultyChange = async (facultyId) => {
        try {
            const departmentsData = await getDepartmentsByFaculty(facultyId);
            setDepartments(departmentsData);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to load departments',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };
    
    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        setPasswordStrength(strength);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'faculty_id') {
            handleFacultyChange(value);
        }
        
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(formData);
            setShowOTPInput(true);
            toast({
                title: 'Success',
                description: 'Registration successful. Please check your email for OTP code.',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Registration failed';
            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOTPComplete = async (value) => {
        setIsLoading(true);
        try {
            await verifyOTP(formData.email, value);
            toast({
                title: 'Success',
                description: 'Account verified successfully',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'OTP verification failed';
            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Box minH="100vh" py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW="container.md">
                <VStack
                    spacing={8}
                    bg={bgColor}
                    p={8}
                    borderRadius="xl"
                    boxShadow="xl"
                    border="1px"
                    borderColor={borderColor}
                >
                    <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
                        Join DevClub
                    </Heading>
                    <Text color={textColor} fontSize="lg" textAlign="center">
                        Become a member of our tech community
                    </Text>

                    {!showOTPInput ? (
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <VStack spacing={6} width="full">
                                <FormControl isRequired>
                                    <FormLabel>Registration Number</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaIdCard} color="gray.500" />
                                        </InputLeftElement>
                                        <Input
                                            name="registration_number"
                                            value={formData.registration_number}
                                            onChange={handleChange}
                                            placeholder="Enter your registration number"
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaUser} color="gray.500" />
                                        </InputLeftElement>
                                        <Input
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaEnvelope} color="gray.500" />
                                        </InputLeftElement>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaLock} color="gray.500" />
                                        </InputLeftElement>
                                        <Input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                        <InputRightElement>
                                            <Icon
                                                as={showPassword ? FaEyeSlash : FaEye}
                                                color="gray.500"
                                                cursor="pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <Progress value={passwordStrength * 20} mt={2} colorScheme={
                                        passwordStrength < 2 ? 'red' :
                                        passwordStrength < 3 ? 'orange' :
                                        passwordStrength < 4 ? 'yellow' :
                                        'green'
                                    } />
                                    <FormHelperText>
                                        Password strength: {
                                            passwordStrength < 2 ? 'Weak' :
                                            passwordStrength < 3 ? 'Fair' :
                                            passwordStrength < 4 ? 'Good' :
                                            'Strong'
                                        }
                                    </FormHelperText>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Wilaya</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaMapMarkerAlt} color="gray.500" />
                                        </InputLeftElement>
                                        <Select
                                            name="wilaya_code"
                                            value={formData.wilaya_code}
                                            onChange={handleChange}
                                            placeholder="Select your wilaya"
                                        >
                                            {Array.from(new Set(cities.map(city => city.wilaya_code))).map(wilayaCode => {
                                                const city = cities.find(c => c.wilaya_code === wilayaCode);
                                                return (
                                                    <option key={wilayaCode} value={wilayaCode}>
                                                        {city.wilaya_name_ascii}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Commune</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaMapMarkerAlt} color="gray.500" />
                                        </InputLeftElement>
                                        <Select
                                            name="commune_name"
                                            value={formData.commune_name}
                                            onChange={handleChange}
                                            placeholder="Select your commune"
                                            isDisabled={!formData.wilaya_code}
                                        >
                                            {cities
                                                .filter(city => city.wilaya_code === formData.wilaya_code)
                                                .map(city => (
                                                    <option key={city.id} value={city.commune_name_ascii}>
                                                        {city.commune_name_ascii}
                                                    </option>
                                                ))}
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Faculty</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaUniversity} color="gray.500" />
                                        </InputLeftElement>
                                        <Select
                                            name="faculty_id"
                                            value={formData.faculty_id}
                                            onChange={handleChange}
                                            placeholder="Select your faculty"
                                        >
                                            {faculties.map(faculty => (
                                                <option key={faculty.id} value={faculty.id}>
                                                    {faculty.faculty_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Department</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaBookReader} color="gray.500" />
                                        </InputLeftElement>
                                        <Select
                                            name="department_id"
                                            value={formData.department_id}
                                            onChange={handleChange}
                                            placeholder="Select your department"
                                            isDisabled={!formData.faculty_id}
                                        >
                                            {departments.map(department => (
                                                <option key={department.id} value={department.id}>
                                                    {department.department_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Level</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FaCalendarAlt} color="gray.500" />
                                        </InputLeftElement>
                                        <Select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                            placeholder="Select your level"
                                        >
                                            <option value="L1">First Year (L1)</option>
                                            <option value="L2">Second Year (L2)</option>
                                            <option value="L3">Third Year (L3)</option>
                                            <option value="M1">First Year Master (M1)</option>
                                            <option value="M2">Second Year Master (M2)</option>
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    width="full"
                                    isLoading={isLoading}
                                >
                                    Register
                                </Button>
                            </VStack>
                        </form>
                    ) : (
                        <VStack spacing={8} width="full">
                            <Icon as={FaEnvelope} color="blue.500" boxSize={12} />
                            <VStack spacing={4}>
                                <Heading size="lg" color={useColorModeValue('gray.800', 'white')}>
                                    Verify Your Email
                                </Heading>
                                <Text fontSize="md" textAlign="center" color={textColor}>
                                    We've sent a verification code to your email address.
                                    Please enter it below to complete your registration.
                                </Text>
                            </VStack>
                            
                            <FormControl>
                                <VStack spacing={6}>
                                    <HStack spacing={{ base: 2, md: 4 }} justify="center">
                                        <PinInput 
                                            otp 
                                            size={{ base: "md", md: "lg" }}
                                            onComplete={handleOTPComplete}
                                            isDisabled={isLoading}
                                        >
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                            <PinInputField 
                                                bg={useColorModeValue('gray.50', 'gray.700')}
                                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                                                _hover={{
                                                    borderColor: 'blue.400'
                                                }}
                                                _focus={{
                                                    borderColor: 'blue.400',
                                                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                                                }}
                                            />
                                        </PinInput>
                                    </HStack>
                                    
                                    <Text fontSize="sm" color={textColor}>
                                        Didn't receive the code? {" "}
                                        <Button
                                            variant="link"
                                            colorScheme="blue"
                                            size="sm"
                                            isLoading={isLoading}
                                            onClick={handleSubmit}
                                        >
                                            Resend
                                        </Button>
                                    </Text>
                                </VStack>
                            </FormControl>
                        </VStack>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default Join;