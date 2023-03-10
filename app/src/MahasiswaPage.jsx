import PageContainer from './PageContainer';
import DataTableView from './DataTableView';

export default function MahasiswaPage() {
  return (
    <PageContainer active="mahasiswa">
      <DataTableView endpoint="/mahasiswa" />
    </PageContainer>
  );
};
