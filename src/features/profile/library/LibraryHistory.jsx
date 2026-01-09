import LibraryBookCard from '../../../ui/LibraryBookCard';
import LibraryBookSection from '../../../ui/LibraryBookSection';

function LibraryHistory() {
  return (
    <div>
      <LibraryBookSection ItemComponent={LibraryBookCard} tab={'history'} />
    </div>
  );
}

export default LibraryHistory;
