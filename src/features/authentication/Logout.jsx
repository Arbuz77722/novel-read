import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
import { LogOutIcon } from 'lucide-react';

export default function LogoutButton() {
  const { logout, isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <ButtonIcon btn='logout' disabled={isLoggingOut} onClick={handleLogout}>
      <LogOutIcon size={18} />
      {isLoggingOut ? <SpinnerMini /> : 'Logout'}
    </ButtonIcon>
  );
}
