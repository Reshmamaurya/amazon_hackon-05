// import React from 'react';
// import Banner from '../components/BannerCarousel';
// import ProductCard from '../components/ProductCards';

// const HomePage = () => {
//   return (
//     <div>
//       <Banner />
//       <ProductCard/>
        
     
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import Banner from '../components/BannerCarousel';
import ProductCard from '../components/ProductCards';

const HomePage = () => {
  return (
    <div className="homepage-wrapper" style={{ position: 'relative' }}>
      <div style={{ zIndex: 1 }}>
        <Banner />
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: '-200px', // overlaps onto banner
          zIndex: 2,
          padding: '0 1rem',
        }}
      >
        <ProductCard />
      </div>
    </div>
  );
};

export default HomePage;
