import { useNavigate } from 'react-router-dom';
import { LandingPage } from '../components/LandingPage';
import { SearchData } from '../components/FlightSearch';
import { BackgroundImage } from '../components/BackgroundImage';

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (searchData: SearchData) => {
    // Navigate to results page with search data
    navigate('/results', { state: { searchData } });
  };

  return (
    <BackgroundImage>
      <LandingPage onSearch={handleSearch} />
    </BackgroundImage>
  );
}
