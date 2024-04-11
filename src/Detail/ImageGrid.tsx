import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; 

// Unsplash Access Key
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

type ImageGridProps = {};

const ImageGrid: React.FC<ImageGridProps> = () => {
  const [src, setSrc] = useState<string>(''); // 이미지 URL 상태
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  // 각 그리드의 투명도를 저장하는 상태, 초기 투명도는 랜덤
  const [opacities, setOpacities] = useState<number[]>(() => 
    Array.from({ length: 9 }, () => Math.random())
  ); 

  // Unsplash에서 랜덤 이미지 URL을 가져오는 함수
  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`);
      setSrc(response.data.urls.regular); // 랜덤 이미지 URL 설정
    } catch (error) {
      console.error('Error fetching image from Unsplash', error);
    }
  };

  // 이미지 로드 및 그리기 로직
  useEffect(() => {
    if (!src) return; // src가 없으면 실행하지 않음

    const img = new Image();
    img.onload = () => {
      const gridWidth = img.width / 3;
      const gridHeight = img.height / 3;

      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const x = (index % 3) * gridWidth;
            const y = Math.floor(index / 3) * gridHeight;
            ctx.drawImage(img, x, y, gridWidth, gridHeight, 0, 0, canvas.width, canvas.height);
          }
        }
      });
    };
    img.src = src; // 랜덤 이미지 로드 시작
  }, [src]);

  return (
    <div>
      <button onClick={fetchRandomImage}>Load Random Image</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '600px', height: '600px' }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <canvas
            ref={(el) => (canvasRefs.current[index] = el)}
            width={200}
            height={200}
            key={index}
            style={{ opacity: opacities[index], border: '1px solid black' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;