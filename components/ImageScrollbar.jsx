import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';


export default function ImageSrollbar({ data }) {
  return (<>
    <Carousel>
    {data.map((item) => (
      <Carousel.Item key={item.id}>
        <Image className="d-block w-100" src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" alt="property photo" />
      </Carousel.Item>
    ))}
  </Carousel>
</>
)
  }