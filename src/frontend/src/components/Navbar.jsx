import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaHome, FaInfoCircle, FaCalendarAlt, FaBell, FaSignInAlt, FaUserPlus, FaBlog, FaUserTie } from 'react-icons/fa';

const NavLink = ({ children, href, icon: Icon }) => (
  <Link
    p={2}
    fontSize={'sm'}
    fontWeight={500}
    color={useColorModeValue('gray.600', 'gray.200')}
    href={href}
    _hover={{
      textDecoration: 'none',
      color: useColorModeValue('gray.800', 'white'),
    }}
  >
    <HStack>
      {Icon && <Icon color="gray.400" />}
      <Text>{children}</Text>
    </HStack>
  </Link>
);

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const logoSize = useBreakpointValue({ base: "lg", md: "xl" });

  return (
    <Box
      bg={bgColor}
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onToggle}
            variant="ghost"
          />
          <HStack spacing={8} alignItems="center">
            <Box fontWeight="bold" fontSize={logoSize}>
              DevClub
            </Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink href="/" icon={FaHome}>Home</NavLink>
              <NavLink href="/about" icon={FaInfoCircle}>About</NavLink>
              <NavLink href="/events" icon={FaCalendarAlt}>Events</NavLink>
              <NavLink href="/announcements" icon={FaBell}>Announcements</NavLink>
              <NavLink href="/blog" icon={FaBlog}>Blog</NavLink>
              <NavLink href="/president" icon={FaUserTie}>President</NavLink>
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Stack direction="row" spacing={4}>
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size={buttonSize}
              />
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                href={'/login'}
                leftIcon={<FaSignInAlt />}
              >
                Login
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                href={'/join'}
                leftIcon={<FaUserPlus />}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Join Now
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Container>

      {/* Mobile Menu Drawer */}
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}
        >
          <Stack spacing={4}>
            <NavLink href="/" icon={FaHome}>Home</NavLink>
            <NavLink href="/about" icon={FaInfoCircle}>About</NavLink>
            <NavLink href="/events" icon={FaCalendarAlt}>Events</NavLink>
            <NavLink href="/announcements" icon={FaBell}>Announcements</NavLink>
            <NavLink href="/blog" icon={FaBlog}>Blog</NavLink>
            <NavLink href="/president" icon={FaUserTie}>President</NavLink>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
} 