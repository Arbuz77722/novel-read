import EmptyState from '../../../ui/EmptyState';
import ProfileInfo from '../../../ui/ProfileInfo';
import Spinner from '../../../ui/Spinner';
import UserStats from '../../../ui/UserStats';
import { useUser } from '../../authentication/useUser';
import useProfile from '../useProfile';
import useGetUserStats from './useGetUserStats';

function ProfileOverview() {
  const { user, isUserPending } = useUser();
  const { profile, isProfilePending } = useProfile();
  const { data: stats, isPending } = useGetUserStats();
  if (isUserPending) return <Spinner />;
  if (isPending || isProfilePending) return <Spinner />;

  if (!profile) {
    return (
      <EmptyState
        title='Setting up your profile'
        description='This usually takes a moment for new accounts. If this takes longer than usual, try refreshing the page.'
      />
    );
  }

  return (
    <div>
      <ProfileInfo user={user} profile={profile} />
      <UserStats stats={stats} isStatsLoading={isPending} />
    </div>
  );
}

export default ProfileOverview;
