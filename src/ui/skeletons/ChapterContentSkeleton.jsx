import styled, { keyframes } from 'styled-components';

const StyledChapterContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 12px 12px 0 0;
  border-bottom: 2px solid var(--color-brand-700);
  font-size: 1.8rem;
  line-height: 1.6;
`;

const ChapterContentWrapper = styled.div`
  margin-top: 1.5rem;
  word-break: break-word;
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBlock = styled.div`
  height: ${(props) => props.height || '1.8rem'};
  width: ${(props) => props.width || '100%'};
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    var(--color-grey-200) 25%,
    var(--color-grey-100) 37%,
    var(--color-grey-200) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
  margin-bottom: ${(props) => props.mb || '1.2rem'};
`;
export default function ChapterContentSkeleton() {
  return (
    <StyledChapterContainer>
      <SkeletonBlock height='3rem' mb='2rem' />
      <SkeletonBlock height='2.8rem' width='60%' mb='2.5rem' />
      <ChapterContentWrapper>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonBlock
            key={i}
            height='1.8rem'
            width={i % 4 === 0 ? '90%' : '100%'}
            mb='1.4rem'
          />
        ))}
      </ChapterContentWrapper>
      <SkeletonBlock height='3rem' mb='0' />
    </StyledChapterContainer>
  );
}
