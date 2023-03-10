import PageContainer from './PageContainer';
import DataTableView from './DataTableView';

export default function MatakuliahPage() {
  return (
    <PageContainer active="matakuliah">
      <DataTableView endpoint="/matakuliah" />
    </PageContainer>
  );
};
