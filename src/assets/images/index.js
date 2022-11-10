import busongo from './busom.png';
import kubukalogo from './kubuka-logo.png';
import mapenzi from './mape.png';
import mulumbe from './muluc3.png';
import vicfalls from './victoria-falls.jpg';

const IMAGES = [
  {
    id: 'mapenzi',
    img: mapenzi,
    attribute: "owner"
  },
  {
    id: 'mulumbe',
    img: mulumbe,
    attribute: "owner"
  },
  {
    id: 'busongo',
    img: busongo,
    attribute: "owner"
  },
  {
    id: 'kubuka-logo',
    img: kubukalogo
  },
  {
    id: 'victoria-falls',
    img: vicfalls
  }
];

const getImageById = (id) => {
  return IMAGES.find(x => x.id === id);
};

export {IMAGES, getImageById};