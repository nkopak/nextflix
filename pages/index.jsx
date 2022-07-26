import Head from 'next/head';

import { Banner, Navbar, SectionCards } from '../components';
import { getMovies, getPopularVideos, getWatchItAgainVideos } from '../lib/movies';
import { useRedirectUser } from '../utils/redirect';

import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const {userId, token} = await useRedirectUser(context);

  if (!userId){
    return {
      props:{},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyMovies = await getMovies('disney trailer');
  const productivityVideos = await getMovies('productivity');
  const travelVideos = await getMovies('travel');
  const popularVideos = await getPopularVideos();

  return {props: {disneyMovies, productivityVideos, travelVideos, popularVideos, watchItAgainVideos}};
};

export default function Home({disneyMovies, productivityVideos, travelVideos, popularVideos, watchItAgainVideos}){

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextlix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username='Bobynka'/>

        <Banner
          videoId='GQR5zsLHbYw'
          title='The cool guys'
          subTitle='Private detectives'
          imgUrl='/static/TheNiceGuys.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' movies={disneyMovies} size='large'/>
          <SectionCards title='Watch it again' movies={watchItAgainVideos} size='small'/>
          <SectionCards title='Travel' movies={travelVideos} size='small'/>
          <SectionCards title='Productivity' movies={productivityVideos} size='medium'/>
          <SectionCards title='Popular' movies={popularVideos} size='small'/>
        </div>
      </div>
    </div>
  );
};
