import { useState } from 'react';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';
import { useResetPassword } from './useResetPassword';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const { updatePassword, isPending } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) return;
    updatePassword(password);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='New password'>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : 'Update password'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordForm;
