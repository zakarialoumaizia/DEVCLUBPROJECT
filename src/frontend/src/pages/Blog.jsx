import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Badge,
  useColorModeValue,
  HStack,
  Icon,
  Button,
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
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { FaCalendar, FaUser, FaComments, FaArrowRight, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const Blog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Check if user is admin (this should be replaced with actual authentication)
  const isAdmin = localStorage.getItem('adminToken');

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Web Development',
      excerpt: 'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.',
      image: '/blog/web-dev.jpg',
      category: 'Web Development',
      date: 'March 15, 2024',
      author: 'John Doe',
      comments: 12,
      content: 'Full content here...',
    },
    {
      id: 2,
      title: 'The Future of AI in Technology',
      excerpt: 'Explore how artificial intelligence is shaping the future of technology and our daily lives.',
      image: '/blog/ai.jpg',
      category: 'Artificial Intelligence',
      date: 'March 12, 2024',
      author: 'Jane Smith',
      comments: 8,
      content: 'Full content here...',
    },
    {
      id: 3,
      title: 'Mobile App Development Best Practices',
      excerpt: 'Discover the essential practices for creating successful mobile applications.',
      image: '/blog/mobile-dev.jpg',
      category: 'Mobile Development',
      date: 'March 10, 2024',
      author: 'Mike Johnson',
      comments: 15,
      content: 'Full content here...',
    },
    {
      id: 4,
      title: 'Cybersecurity Fundamentals',
      excerpt: 'Learn the basics of cybersecurity and how to protect your digital assets.',
      image: '/blog/cybersecurity.jpg',
      category: 'Security',
      date: 'March 8, 2024',
      author: 'Sarah Wilson',
      comments: 6,
      content: 'Full content here...',
    },
  ];

  const handleEdit = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              color={headingColor}
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              DevClub Blog
            </Heading>
            <Text fontSize="xl" color={textColor}>
              Insights, tutorials, and updates from our tech community
            </Text>
          </Box>

          {/* Blog Posts Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {blogPosts.map((post) => (
              <Box
                key={post.id}
                bg={bgColor}
                rounded="xl"
                overflow="hidden"
                shadow="lg"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-5px)' }}
                position="relative"
              >
                {isAdmin && (
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit post"
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEdit(post)}
                    zIndex={1}
                  />
                )}
                <Image
                  src={post.image}
                  alt={post.title}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Box p={6}>
                  <Badge colorScheme="blue" mb={2}>
                    {post.category}
                  </Badge>
                  <Heading size="md" mb={3} color={headingColor}>
                    {post.title}
                  </Heading>
                  <Text color={textColor} mb={4}>
                    {post.excerpt}
                  </Text>
                  <HStack spacing={4} color={textColor} fontSize="sm" mb={4}>
                    <HStack>
                      <Icon as={FaCalendar} />
                      <Text>{post.date}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaUser} />
                      <Text>{post.author}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaComments} />
                      <Text>{post.comments} comments</Text>
                    </HStack>
                  </HStack>
                  <Button
                    rightIcon={<FaArrowRight />}
                    colorScheme="blue"
                    variant="ghost"
                    size="sm"
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* Newsletter Section */}
          <Box
            bg={bgColor}
            p={8}
            rounded="xl"
            shadow="lg"
            textAlign="center"
          >
            <Heading size="lg" mb={4} color={headingColor}>
              Subscribe to Our Newsletter
            </Heading>
            <Text color={textColor} mb={6}>
              Stay updated with our latest articles and tech news
            </Text>
            <HStack spacing={4} justify="center">
              <Box
                as="input"
                placeholder="Enter your email"
                p={3}
                rounded="md"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                width={{ base: 'full', md: '400px' }}
              />
              <Button colorScheme="blue">Subscribe</Button>
            </HStack>
          </Box>
        </VStack>
      </Container>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Enter post title"
                  defaultValue={selectedPost?.title}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select defaultValue={selectedPost?.category}>
                  <option value="Web Development">Web Development</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Security">Security</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Excerpt</FormLabel>
                <Textarea
                  placeholder="Enter post excerpt"
                  defaultValue={selectedPost?.excerpt}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter post content"
                  height="200px"
                  defaultValue={selectedPost?.content}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Blog; 