import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        console.log('click');
        navigate('/books/i-am-the-monarch');
      }}
    >
      Test
    </button>
  );
}

export default Test;
