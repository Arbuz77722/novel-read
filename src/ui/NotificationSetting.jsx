import styled from 'styled-components';
import Checkbox from './CheckBox';
import { useNotificationSettings } from '../context/NotificationSettingsContext';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brand-600);
  margin-bottom: 1rem;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-200);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingText = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-900);
`;

const SettingDescription = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-top: 0.25rem;
`;

export default function NotificationSetting() {
  const { settings, setSettings } = useNotificationSettings();

  return (
    <Container>
      <Header>Notification Settings</Header>

      <SettingRow>
        <SettingText>
          <SettingTitle>Mute Notification Sound</SettingTitle>
          <SettingDescription>
            Turn off notification sounds for new messages and alerts.
          </SettingDescription>
        </SettingText>
        <Checkbox
          checked={!settings.soundEnabled}
          onChange={() =>
            setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
          }
        />
      </SettingRow>

      <SettingRow>
        <SettingText>
          <SettingTitle>Disable Notification Counter</SettingTitle>
          <SettingDescription>
            Hide the unread message count badge on the notification bell.
          </SettingDescription>
        </SettingText>
        <Checkbox
          checked={!settings.counterEnabled}
          onChange={() =>
            setSettings((s) => ({ ...s, counterEnabled: !s.counterEnabled }))
          }
        />
      </SettingRow>
    </Container>
  );
}
