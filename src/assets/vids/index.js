import bgvid from './bg-vid.mp4';

const VIDEOS = [
  {
    id: 'background-main',
    vid: bgvid,
  }
];

const getVideoById = (id) => {
  return VIDEOS.find(x => x.id === id);
};

export { VIDEOS, getVideoById };
