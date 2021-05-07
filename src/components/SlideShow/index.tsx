import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { Container } from './styles';

interface SlideShowImage {
  imagens: string[];
}

const SlideShow: React.FC<SlideShowImage> = ({imagens}) => {
  return (
    <Container>
      <div className="slide-container">
      <Slide autoplay="false" arrows="false">
      {imagens.map((imagem: String) => {
          return (
            <div className="each-slide">
            <div style={{'backgroundImage': `url(${imagem})`,height:200}}>              
            </div>
          </div>
              
          );
        })}
        </Slide>
        </div>
    </Container>
  );
};

export default SlideShow;
