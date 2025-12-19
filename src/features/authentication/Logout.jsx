import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

export default function LogoutButton() {
  const { logout, isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={handleLogout}>
      {isLoggingOut ? <SpinnerMini /> : 'Logout'}
    </ButtonIcon>
  );
}
