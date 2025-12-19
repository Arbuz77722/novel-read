import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { useBooks } from '../books/useBooks';
import Spinner from '../../ui/Spinner';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import { useBooksByFilter } from '../books/useBooksByFilter';

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding: 2rem 0;
`;

const SwiperContainer = styled.div`
  .swiper {
    padding-bottom: 3rem;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  }

  .swiper-slide-prev,
  .swiper-slide-next {
    opacity: var(--image-opacity, 0.6);
    transform: scale(0.9);
    filter: brightness(0.95);
  }

  .swiper-slide-active {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
  }

  .swiper-pagination {
    bottom: 0 !important;
  }
  .swiper-pagination-bullet {
    background: var(--color-grey-400);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: var(--color-brand-600);
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: var(--color-brand-700);
    bottom: -30px; /* push buttons below */
    top: auto;
  }
`;

const BookCard = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: fill;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span.status {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: var(--color-green-100);
    font-weight: bold;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-green-100);
      margin-right: 6px;
    }
  }

  span.country {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-brand-700);
  }
`;

const BottomInfo = styled.div`
  color: var(--color-grey-300);

  h3 {
    font-weight: bold;
    margin-bottom: 0.3rem;
    text-align: center;
    color: var(--color-grey-900);
  }

  p {
    font-size: 1.2rem;
    margin: 0.2rem 0;
    opacity: 0.9;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    color: var(--color-grey-900);
  }

  .rating {
    font-size: 1rem;
    margin-top: 0.4rem;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-yellow-400);
  }
`;

function HomeSlider() {
  const { books, isBookLoading } = useBooksByFilter({ limit: 12 });
  const { goToBook } = useBookNavigation();
  if (isBookLoading) return <Spinner />;

  return (
    <SliderWrapper>
      <SwiperContainer>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          loopFillGroupWithBlank={true}
          spaceBetween={20}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {books?.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard onClick={() => goToBook(book)}>
                <img src={book.cover_url} alt={book.title} />
                <Overlay>
                  <TopRow>
                    <span className='status'>{book.status}</span>
                    <span className='country'>{book.country}</span>
                  </TopRow>
                  <BottomInfo>
                    <h3>{book.title}</h3>
                    <div className='rating'>⭐ {book?.avg_rating}</div>
                  </BottomInfo>
                </Overlay>
              </BookCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </SliderWrapper>
  );
}

export default HomeSlider;
