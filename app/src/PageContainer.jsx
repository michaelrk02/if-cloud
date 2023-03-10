import {
  Link as RouterLink
} from 'react-router-dom';

import {
  Box,
  Flex,
  HStack,
  VStack,
  Divider,

  Heading,
  Icon,
  Button,
  IconButton,

  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,

  Show,
  Hide,

  useDisclosure
} from '@chakra-ui/react';

import {
  FaBars
} from 'react-icons/fa';

const nav = [
  {key: 'perkuliahan', title: 'Perkuliahan', route: '/'},
  {key: 'mahasiswa', title: 'Mahasiswa', route: '/mahasiswa'},
  {key: 'matakuliah', title: 'Matakuliah', route: '/matakuliah'},
  {key: 'dosen', title: 'Dosen', route: '/dosen'}
];

export default function PageContainer(props) {
  const drawer = useDisclosure();

  return (
    <Flex direction="column" minH="100vh">
      <Flex align="center" justify="space-between" p={4}>
        <Heading>IF-CLOUD-APP</Heading>
        <Show above="lg">
          <HStack spacing={8}>
            {nav.map(n => (<Button as={RouterLink} to={n.route} variant={props.active === n.key ? 'solid' : 'link'}>{n.title}</Button>))}
          </HStack>
        </Show>
        <Hide above="lg">
          <IconButton icon={<Icon as={FaBars} />} onClick={drawer.onOpen} />
        </Hide>
        <Drawer placement="left" isOpen={drawer.isOpen} onClose={drawer.onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              <VStack spacing={8} w="100%">
                {nav.map(n => (<Button as={RouterLink} to={n.route} variant={props.active === n.key ? 'solid' : 'link'}>{n.title}</Button>))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Divider />
      <Box p={{base: 4, lg: 8}}>
        {props.children}
      </Box>
    </Flex>
  );
};
