import { useState } from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px', // Reduced gap for tighter spacing
};

const starContainerStyle = {
  display: 'flex',
  gap: '4px', // Small gap between stars for better visuals
};

export default function StarRating({
  maxRating = 5,
  color = ' #4338ca',
  size = 24, // Smaller default size for smoother look
  className = '',
  messages = [],
  defaultRating = 0,
  rating: controlledRating,
  onSetRating,
  interactive = false,
  precision = 0.5, // Allow half-star precision
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // Use controlled value when in read-only mode
  const displayRating = interactive
    ? tempRating || rating
    : controlledRating || defaultRating;

  function handleRating(newRating) {
    if (!interactive) return;
    const roundedRating = Math.round(newRating / precision) * precision;
    setRating(roundedRating);
    onSetRating?.(roundedRating);
  }

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.1}px`,
    fontWeight: '500',
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1;
          const isFull = displayRating >= starValue;
          const isHalf = !isFull && displayRating >= starValue - 0.5;

          return (
            <Star
              key={i}
              full={isFull}
              half={isHalf}
              onRate={(e) => {
                if (!interactive) return;
                // Calculate rating based on click position within star
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const starWidth = rect.width;
                const newRating =
                  clickX < starWidth / 2 ? starValue - 0.5 : starValue;
                handleRating(newRating);
              }}
              onHover={(e) => {
                if (!interactive) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const hoverX = e.clientX - rect.left;
                const starWidth = rect.width;
                const newRating =
                  hoverX < starWidth / 2 ? starValue - 0.5 : starValue;
                setTempRating(newRating);
              }}
              onHoverOut={() => interactive && setTempRating(0)}
              color={color}
              size={size}
              interactive={interactive}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[Math.floor(displayRating) - 1] || displayRating.toFixed(1)
          : displayRating
          ? displayRating.toFixed(1)
          : ''}
      </p>
    </div>
  );
}

function Star({
  onRate,
  full,
  half,
  onHover,
  onHoverOut,
  color,
  size,
  interactive,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: interactive ? 'pointer' : 'default',
  };

  return (
    <span
      role={interactive ? 'button' : 'img'}
      style={starStyle}
      onClick={interactive ? onRate : undefined}
      onMouseMove={interactive ? onHover : undefined}
      onMouseLeave={interactive ? onHoverOut : undefined}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={size}
        height={size}
      >
        <defs>
          <clipPath id={`half-clip-${size}`}>
            <rect x='0' y='0' width='12' height='24' />
          </clipPath>
        </defs>

        {/* Outline */}
        <path
          d='M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.2l6.5-.9L12 2.5z'
          fill='none'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        {/* Filled (full or half) */}
        {(full || half) && (
          <path
            d='M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.2l6.5-.9L12 2.5z'
            fill={color}
            clipPath={half ? `url(#half-clip-${size})` : undefined}
          />
        )}
      </svg>
    </span>
  );
}
