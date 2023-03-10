import {
  useEffect,
  useState,
  useRef
} from 'react';

import {
  Flex,
  Box,
  HStack,
  VStack,

  Icon,
  Button,
  IconButton,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,

  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,

  useDisclosure
} from '@chakra-ui/react';

import {
  FaPlus,
  FaSave,
  FaTrash
} from 'react-icons/fa';

import axios from './axios';

import PageContainer from './PageContainer';
import DataTableView from './DataTableView';

export default function PerkuliahanPage() {
  const [refresh, setRefresh] = useState(Date.now());

  const addModal = useDisclosure();

  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [matakuliahData, setMatakuliahData] = useState([]);
  const [dosenData, setDosenData] = useState([]);

  const addMahasiswaIdRef = useRef(null);
  const addMatakuliahIdRef = useRef(null);
  const addDosenIdRef = useRef(null);
  const addNilaiRef = useRef(null);

  useEffect(() => {
    axios.get('/mahasiswa').then(response => {
      setMahasiswaData(response.data.rows);
    });
    axios.get('/matakuliah').then(response => {
      setMatakuliahData(response.data.rows);
    });
    axios.get('/dosen').then(response => {
      setDosenData(response.data.rows);
    });
  }, []);

  const handleAdd = () => {
    const mahasiswaId = addMahasiswaIdRef.current.value;
    const matakuliahId = addMatakuliahIdRef.current.value;
    const dosenId = addDosenIdRef.current.value;
    const nilai = Number(addNilaiRef.current.value);

    axios.post('/perkuliahan', {
      mahasiswa_id: mahasiswaId,
      matakuliah_id: matakuliahId,
      dosen_id: dosenId,
      nilai: nilai
    }).then(response => {
      alert('Berhasil menambah data perkuliahan');
      addModal.onClose();
      setRefresh(Date.now());
    });
  };

  const handleRemove = (e) => {
    if (window.confirm('Hapus data perkuliahan ini?')) {
      const id = e.currentTarget.getAttribute('data-id');
      axios.delete('/perkuliahan/' + id).then(response => {
        alert('Berhasil menghapus data perkuliahan');
        setRefresh(Date.now());
      });
    }
  };

  return (
    <PageContainer active="perkuliahan">
      <Modal isOpen={addModal.isOpen} onClose={addModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Perkuliahan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Mahasiswa</FormLabel>
                <Select placeholder="Pilih mahasiswa" ref={addMahasiswaIdRef}>
                  {mahasiswaData.map(m => (<option value={m.id}>{m.nim} - {m.nama}</option>))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Matakuliah</FormLabel>
                <Select placeholder="Pilih matakuliah" ref={addMatakuliahIdRef}>
                  {matakuliahData.map(m => (<option value={m.id}>{m.kode} - {m.nama} ({m.sks} SKS)</option>))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Dosen</FormLabel>
                <Select placeholder="Pilih dosen" ref={addDosenIdRef}>
                  {dosenData.map(d => (<option value={d.id}>{d.nidn} - {d.nama}</option>))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Nilai</FormLabel>
                <NumberInput defaultValue={0} min={0} max={4} precision={2}>
                  <NumberInputField ref={addNilaiRef} />
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAdd} leftIcon={<Icon as={FaSave} />}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex direction="column" gap={4}>
        <Box>
          <Button colorScheme="teal" onClick={addModal.onOpen} leftIcon={<Icon as={FaPlus} />}>Tambah</Button>
        </Box>
        <DataTableView
          refresh={refresh}
          endpoint="/perkuliahan"
          actions={r => (
            <HStack>
              <IconButton colorScheme="red" icon={<Icon as={FaTrash} />} data-id={r.id} onClick={handleRemove} />
            </HStack>
          )}
        />
      </Flex>
    </PageContainer>
  );
};
