import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import { useBooksByFilter } from '../books/useBooksByFilter';
import HomeSliderSkeleton from '../../ui/skeletons/HomeSliderSkeleton';
import { useEffect, useState } from 'react';

const SliderWrapper = styled.div`
  width: 100%;
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
    opacity: 0.6;
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
`;

const BookCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  background-color: var(--color-grey-0);

  img {
    width: 100%;
    height: auto;
    max-height: 420px;
    display: block;
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

const Title = styled.h3`
  text-align: center;
  max-width: 15rem;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #27f027;
  background: rgba(0, 0, 0, 0.433);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-brand-500);
    margin-right: 4px;
  }
`;

const CountryBadge = styled.span`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-brand-100);
  background: rgba(0, 0, 0, 0.356);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.75);
  color: var(--color-brand-100);
  border-radius: 999px;
  backdrop-filter: blur(4px);
`;

const BottomInfo = styled.div`
  text-align: center;
  color: var(--color-grey-900);

  h3 {
    font-weight: bold;
    margin-bottom: 0.3rem;
    font-size: 1.1rem;
    line-height: 1.2;
  }
`;

function HomeSlider() {
  const { books, isPending: isBookLoading } = useBooksByFilter({ limit: 12 });
  const { goToBook } = useBookNavigation();
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isBookLoading || minLoading) return <HomeSliderSkeleton />;

  return (
    <SliderWrapper>
      <SwiperContainer>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
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
                    <StatusBadge>{book.status}</StatusBadge>
                    <CountryBadge>{book.country}</CountryBadge>
                  </TopRow>

                  <BottomInfo>
                    <Title>{book.title}</Title>
                    <RatingBadge>
                      {book.avg_rating > 0
                        ? Number(book.avg_rating.toFixed(1))
                        : 0}{' '}
                      ⭐
                    </RatingBadge>
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
