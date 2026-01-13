import ProfileInfo from '../../../ui/ProfileInfo';
import Spinner from '../../../ui/Spinner';
import UserStats from '../../../ui/UserStats';
import { useUser } from '../../authentication/useUser';
import useProfile from '../useProfile';
import useGetUserStats from './useGetUserStats';

function ProfileOverview() {
  const { user } = useUser();
  const { profile } = useProfile();
  const { data: stats, isPending } = useGetUserStats();

  if (isPending || !user) return <Spinner />;

  return (
    <div>
      <ProfileInfo user={user} profile={profile} />
      <UserStats stats={stats} isStatsLoading={isPending} />
    </div>
  );
}

export default ProfileOverview;
