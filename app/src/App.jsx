import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import {
  ChakraProvider
} from '@chakra-ui/react';

import PerkuliahanPage from './PerkuliahanPage';
import MahasiswaPage from './MahasiswaPage';
import MatakuliahPage from './MatakuliahPage';
import DosenPage from './DosenPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PerkuliahanPage />
  },
  {
    path: '/mahasiswa',
    element: <MahasiswaPage />
  },
  {
    path: '/matakuliah',
    element: <MatakuliahPage />
  },
  {
    path: '/dosen',
    element: <DosenPage />
  }
]);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
