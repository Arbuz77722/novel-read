import { useQueryClient } from '@tanstack/react-query';
import WriteTextModal from '../../ui/WriteTextModal';
import useCreateComment from './useCreateComment';

function ReplyInput({ parentId, targetId, targetType, onClose }) {
  const queryClient = useQueryClient();
  const { createComment, isPending } = useCreateComment({
    targetType,
    targetId,
  });

  return (
    <WriteTextModal
      label='Your Reply'
      placeholder='Write a reply...'
      submitLabel='Reply'
      onSubmit={(text) => {
        createComment(
          { comment: text, parentId },
          {
            onSuccess: () => {
              onClose();
              queryClient.invalidateQueries(['replies', parentId]);
            },
          }
        );
      }}
      onCancel={onClose}
      isSubmitting={isPending}
    />
  );
}

export default ReplyInput;
