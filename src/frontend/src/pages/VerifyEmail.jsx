import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    if (!userData) {
      toast({
        title: "Error",
        description: "Please register first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate('/join');
    }
  }, [navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Mock successful verification
      toast({
        title: "Success",
        description: "Email verified successfully! You can now login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Clear registration data from localStorage
      localStorage.removeItem('userData');
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Error",
        description: "An error occurred during verification. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      // Mock successful resend
      toast({
        title: "Success",
        description: "Verification code resent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeLeft(300);
    } catch (error) {
      console.error('Resend error:', error);
      toast({
        title: "Error",
        description: "An error occurred while resending the code",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} bg={bgColor} p={{ base: 6, md: 10 }} rounded="xl" shadow="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
              Email Verification
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              A verification code has been sent to your email
            </Text>
          </VStack>

          <VStack spacing={6} width="full">
            <HStack spacing={2} justify="center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  size="lg"
                  width="50px"
                  height="50px"
                  textAlign="center"
                  fontSize="xl"
                  maxLength={1}
                  pattern="[0-9]"
                />
              ))}
            </HStack>

            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={handleVerify}
              isLoading={isLoading}
            >
              Verify
            </Button>

            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              {timeLeft > 0 ? (
                `Time remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
              ) : (
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={handleResendOTP}
                  isLoading={isLoading}
                >
                  Resend Code
                </Button>
              )}
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default VerifyEmail; 