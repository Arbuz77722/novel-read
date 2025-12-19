// import { HiBookOpen } from 'react-icons/hi';
// import styled from 'styled-components';
// import { useChapters } from '../features/chapters/useChapters';

// const StyledCompletedBooksItem = styled.li`
//   display: flex;
//   flex-direction: column;
//   border-radius: var(--border-radius-sm);
//   overflow: hidden;
//   color: var(--color-grey-500);
//   transition: transform 0.2s ease;
//   &:hover {
//     transform: translateY(-4px);
//   }
// `;

// const StyledChapters = styled.span`
//   font-size: 1rem;
//   color: var(--color-grey-400);
// `;
// const StyledTitles = styled.h4`
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const StyledImg = styled.img`
//   width: 100%;
//   height: 200px; /* adjust */
//   object-fit: cover;
// `;

// const StyledIconFlex = styled.div`
//   display: flex;
//   gap: 0.2rem;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   justify-content: space-between;
// `;
// const CardFooter = styled.footer``;

// function CompletedBooksItem({ cover, title, id, rating, chapters, onClick }) {
//   const { count } = useChapters(id);
//   return (
//     <StyledCompletedBooksItem onClick={onClick}>
//       <StyledImg src={cover} alt={`cover of ${title}`} />
//       <ContentWrapper>
//         <StyledTitles>{title}</StyledTitles>
//         <CardFooter>
//           <StyledIconFlex>
//             <HiBookOpen />
//             <StyledChapters>{count} chapters</StyledChapters>
//           </StyledIconFlex>
//         </CardFooter>
//       </ContentWrapper>
//     </StyledCompletedBooksItem>
//   );
// }

// export default CompletedBooksItem;
