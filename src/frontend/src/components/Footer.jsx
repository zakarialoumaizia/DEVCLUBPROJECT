import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Icon,
  useColorModeValue,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconSize = useBreakpointValue({ base: 5, md: 6 });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/devclub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/devclub' },
    { icon: FaTwitter, href: 'https://twitter.com/devclub' },
    { icon: FaDiscord, href: 'https://discord.gg/devclub' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: FaEnvelope, text: 'contact@devclub.com' },
    { icon: FaPhone, text: '+1 234 567 890' },
    { icon: FaMapMarkerAlt, text: '123 Developer Street, Tech City' },
  ];

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={textColor}
      py={{ base: 8, md: 10 }}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={{ base: 8, md: 8 }}
        >
          {/* Brand Section */}
          <Stack spacing={4}>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color={headingColor}
            >
              DevClub
            </Text>
            <Text fontSize={textSize}>
              Empowering developers through community, learning, and innovation.
            </Text>
            <Stack direction="row" spacing={4}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  isExternal
                  _hover={{ color: 'blue.500' }}
                >
                  <Icon as={social.icon} w={iconSize} h={iconSize} />
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={4}>
            <Text fontSize={headingSize} fontWeight="bold" color={headingColor}>
              Quick Links
            </Text>
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                as={RouterLink}
                to={link.path}
                fontSize={textSize}
                _hover={{ color: 'blue.500' }}
              >
                {link.name}
              </Link>
            ))}
          </Stack>

          {/* Contact Info */}
          <Stack spacing={4}>
            <Text fontSize={headingSize} fontWeight="bold" color={headingColor}>
              Contact Us
            </Text>
            {contactInfo.map((info, index) => (
              <Stack key={index} direction="row" spacing={2} align="center">
                <Icon as={info.icon} w={iconSize} h={iconSize} />
                <Text fontSize={textSize}>{info.text}</Text>
              </Stack>
            ))}
          </Stack>

          {/* Newsletter */}
          <Stack spacing={4}>
            <Text fontSize={headingSize} fontWeight="bold" color={headingColor}>
              Stay Updated
            </Text>
            <Text fontSize={textSize}>
              Subscribe to our newsletter for the latest updates and events.
            </Text>
            <Link
              as={RouterLink}
              to="/newsletter"
              color="blue.500"
              fontSize={textSize}
              _hover={{ textDecoration: 'underline' }}
            >
              Subscribe Now →
            </Link>
          </Stack>
        </SimpleGrid>

        <Divider my={{ base: 6, md: 8 }} borderColor={borderColor} />

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 8 }}
          justify="space-between"
          align="center"
        >
          <Text fontSize={textSize}>© 2024 DevClub. All rights reserved.</Text>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 2, md: 6 }}
            align="center"
          >
            <Link
              as={RouterLink}
              to="/privacy"
              fontSize={textSize}
              _hover={{ color: 'blue.500' }}
            >
              Privacy Policy
            </Link>
            <Link
              as={RouterLink}
              to="/terms"
              fontSize={textSize}
              _hover={{ color: 'blue.500' }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer; 