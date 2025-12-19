import LibraryBookCard from '../../../ui/LibraryBookCard';
import LibraryBookSection from '../../../ui/LibraryBookSection';

function LibraryBooks({ status }) {
  return (
    <div>
      <LibraryBookSection ItemComponent={LibraryBookCard} status={status} />
    </div>
  );
}

export default LibraryBooks;
