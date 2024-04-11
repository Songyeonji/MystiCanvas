import React from 'react';
import ReactDOM from 'react-dom';
import ImageGrid from './Detail/ImageGrid'; // ImageGrid 컴포넌트의 파일 경로에 맞게 조정하세요.

const App: React.FC = () => {
  return (
    <div>
      <ImageGrid />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
