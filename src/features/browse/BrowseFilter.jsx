import styled from 'styled-components';
import FilterByStatus from '../../ui/FilterByStatus';
import SortByOrder from '../../ui/SortByOrder';
import useBrowseParams from '../../hooks/useBrowseParams';

const StyledBrowseFilter = styled.div`
  display: flex;
  gap: 3rem;
  margin: 3rem 0;
`;

function BrowseFilter() {
  const { selectedOrder, setOrder, selectedStatus, setStatus } =
    useBrowseParams();
  return (
    <StyledBrowseFilter>
      <SortByOrder
        active={selectedOrder}
        onChange={setOrder}
        showHeading={true}
      />
      <FilterByStatus
        active={selectedStatus}
        onChange={setStatus}
        showHeading={true}
      />
    </StyledBrowseFilter>
  );
}

export default BrowseFilter;
