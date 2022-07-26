import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from 'classnames';

import { getYoutubeVideoById } from '../../lib/movies';

import { DisLike, Like, Navbar } from '../../components';
import styles from '../../styles/Video.module.css';
import { useEffect, useState } from 'react';

Modal.setAppElement('#__next');

export async function getStaticProps({params}) {
  const {videoId} = params;

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props:{
      video: videoArray.length > 0 ? videoArray[0] : {}
    },
    revalidate: 10
  };
}

export function getStaticPaths(){
  const listOfVideos = ['a_nZz1Kh4kw','lxUEuOkblws','Er_AQEAwQOA'];

  const paths = listOfVideos.map((videoId)=>({
    params: {videoId}
  }));

  return {paths, fallback: 'blocking'};
}

const Video = ({video}) => {

  const router = useRouter();
  const {videoId} = router.query;

  const {title,
    publishTime,
    description,
    channelTitle,
    statistics: {viewCount} = {viewCount: 0}
  } = video;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  useEffect(()=> {
    const fetchFunc = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.length > 0){
        const favourited = data[0].favourited;
        if (favourited === 1){
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDislike(true);
        }
      }
    };
    fetchFunc();

  },[videoId]);

  const runRatingService = async (favourited) => {
    await fetch('/api/stats', {
      method: 'POST',
      body: JSON.stringify({
        videoId, favourited
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  const handleToggleLike = async () => {
    const value = !toggleLike;
    setToggleLike(value);
    setToggleDislike(toggleLike);

    await runRatingService(value ? 1 : 0);
  };

  const handleToggleDislike = async () => {
    const value = !toggleDislike;

    setToggleDislike(value);
    setToggleLike(toggleDislike);

    await runRatingService(value ? 0 : 1);
  };

  return (
    <div className={styles.container}>
      <Navbar/>
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="player"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        />
        <div className={styles.likeDislikeBtnWrapper}>
          <button onClick={handleToggleLike}>
            <div className={styles.btnWrapper}>
              <Like selected={toggleLike}/>
            </div>
          </button>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike}/>
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Channel Title: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
