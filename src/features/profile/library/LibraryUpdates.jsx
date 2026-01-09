import LibraryBookCard from '../../../ui/LibraryBookCard';
import LibraryBookSection from '../../../ui/LibraryBookSection';

function LibraryUpdates() {
  return (
    <div>
      <LibraryBookSection ItemComponent={LibraryBookCard} tab={'updates'} />
    </div>
  );
}

export default LibraryUpdates;
