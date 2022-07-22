import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from 'classnames';

import { getYoutubeVideoById } from '../../lib/movies';

import styles from '../../styles/Video.module.css';
import { Navbar } from '../../components';

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

  const {title,
    publishTime,
    description,
    channelTitle,
    statistics: {viewCount} = {viewCount: 0}
  } = video;

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
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>

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
