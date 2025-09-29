import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function TopCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 3 }}>
          <Slider {...settings}>
            {banners.map((b, i) => (
              <div key={i}>
                <img src={b} alt={`banner-${i}`} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              </div>
            ))}
          </Slider>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <img src="/small1.jpg" style={{ width: '100%', height: 106, objectFit: 'cover' }} />
          <img src="/small2.jpg" style={{ width: '100%', height: 106, objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}
