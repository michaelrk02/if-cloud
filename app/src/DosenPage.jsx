import PageContainer from './PageContainer';
import DataTableView from './DataTableView';

export default function DosenPage() {
  return (
    <PageContainer active="dosen">
      <DataTableView endpoint="/dosen" />
    </PageContainer>
  );
};
