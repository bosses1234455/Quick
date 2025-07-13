import Post from './Post';
import PropTypes from 'prop-types';

const CarList = ({ cars, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse h-40" />
        ))}
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No cars found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="car-list">
      {cars.map((car) => (
        <Post 
          key={car.id || car._id}
          car={car}
          className="hover:shadow-lg transition-shadow duration-200"
        />
      ))}
    </div>
  );
};

CarList.propTypes = {
  cars: PropTypes.array,
  isLoading: PropTypes.bool
};

CarList.defaultProps = {
  cars: [],
  isLoading: false
};

export default CarList;