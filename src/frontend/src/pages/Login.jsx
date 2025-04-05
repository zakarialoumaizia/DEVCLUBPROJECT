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
} from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Login = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const textSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="container.sm">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8} bg={bgColor} p={{ base: 6, md: 10 }} rounded="xl" shadow="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h1"
                size={headingSize}
                color={headingColor}
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
              >
                Welcome Back
              </Heading>
              <Text fontSize={textSize} color={textColor}>
                Sign in to your student account
              </Text>
            </VStack>

            <VStack spacing={6} width="full">
              <FormControl isRequired>
                <FormLabel>Registration Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your registration number"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  size="lg"
                  leftElement={<Icon as={FaLock} color="gray.400" />}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                size="lg"
                width="full"
              >
                Sign In
              </Button>

              <HStack justify="space-between" width="full">
                <Link as={RouterLink} to="/forgot-password" color="blue.500">
                  Forgot Password?
                </Link>
                <Link as={RouterLink} to="/join" color="blue.500">
                  Don't have an account? Sign up
                </Link>
              </HStack>
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Login; 