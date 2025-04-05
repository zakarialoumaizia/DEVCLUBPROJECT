import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
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
  VStack,
  HStack,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

const Blog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Dummy data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Web Development',
      category: 'Web Development',
      author: 'John Doe',
      date: '2024-03-15',
      status: 'published',
      views: 1200,
    },
    {
      id: 2,
      title: 'The Future of AI in Technology',
      category: 'Artificial Intelligence',
      author: 'Jane Smith',
      date: '2024-03-12',
      status: 'draft',
      views: 800,
    },
    {
      id: 3,
      title: 'Mobile App Development Best Practices',
      category: 'Mobile Development',
      author: 'Mike Johnson',
      date: '2024-03-10',
      status: 'published',
      views: 1500,
    },
    {
      id: 4,
      title: 'Cybersecurity Fundamentals',
      category: 'Security',
      author: 'Sarah Wilson',
      date: '2024-03-08',
      status: 'published',
      views: 900,
    },
  ];

  const handleEdit = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleDelete = (postId) => {
    // Handle delete functionality
    console.log('Delete post:', postId);
  };

  const handleView = (post) => {
    // Handle view functionality
    console.log('View post:', post);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Sidebar />
      <Box ml={{ base: 0, md: '240px' }} p={4}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Blog Management</Heading>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={() => {
                setSelectedPost(null);
                onOpen();
              }}
            >
              New Post
            </Button>
          </HStack>

          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              maxW="200px"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Security">Security</option>
            </Select>
          </HStack>

          <Box bg={bgColor} rounded="xl" shadow="sm" overflow="hidden">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Author</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Views</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPosts.map((post) => (
                  <Tr key={post.id}>
                    <Td>{post.title}</Td>
                    <Td>{post.category}</Td>
                    <Td>{post.author}</Td>
                    <Td>{post.date}</Td>
                    <Td>
                      <Badge
                        colorScheme={post.status === 'published' ? 'green' : 'yellow'}
                      >
                        {post.status}
                      </Badge>
                    </Td>
                    <Td>{post.views}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaEye />}
                          size="sm"
                          onClick={() => handleView(post)}
                          aria-label="View post"
                        />
                        <IconButton
                          icon={<FaEdit />}
                          size="sm"
                          onClick={() => handleEdit(post)}
                          aria-label="Edit post"
                        />
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(post.id)}
                          aria-label="Delete post"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>

      {/* Edit/Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPost ? 'Edit Post' : 'Create New Post'}
          </ModalHeader>
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
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter post content"
                  height="200px"
                  defaultValue={selectedPost?.content}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={selectedPost?.status || 'draft'}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">
              {selectedPost ? 'Save Changes' : 'Create Post'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Blog; 