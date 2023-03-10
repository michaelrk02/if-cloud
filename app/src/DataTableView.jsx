import {
  useEffect,
  useState
} from 'react';

import {
  Skeleton,
  Stack,

  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

import axios from './axios';

export default function DataTableView(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const populate = () => {
    setIsLoading(true);
    axios.get(props.endpoint).then(response => {
      setColumns(response.data.columns);
      setRows(response.data.rows);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    populate();
  }, []);

  useEffect(() => {
    populate();
  }, [props.refresh]);

  return isLoading ? (
    <Stack>
      <Skeleton height="32px" />
      <Skeleton height="32px" />
      <Skeleton height="32px" />
      <Skeleton height="32px" />
    </Stack>
  ) : (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {columns.map(c => (<Th>{c.title}</Th>))}
            {(typeof(props.actions) === 'function') && (<Th>Actions</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(r => (
            <Tr>
              {columns.map(c => (<Td>{r[c.key]}</Td>))}
              {(typeof(props.actions) === 'function') && (<Td>{props.actions(r)}</Td>)}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
