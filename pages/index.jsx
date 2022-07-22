import Head from 'next/head';

import { Banner, Navbar, SectionCards } from '../components';
import { getMovies, getPopularVideos } from '../lib/movies';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const disneyMovies = await getMovies('disney trailer');
  const productivityVideos = await getMovies('productivity');
  const travelVideos = await getMovies('travel');
  const popularVideos = await getPopularVideos();

  return {props: {disneyMovies, productivityVideos, travelVideos, popularVideos}};
};

export default function Home({disneyMovies, productivityVideos, travelVideos, popularVideos}){

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
          videoId='4zH5iYM4wJo'
          title='The cool guys'
          subTitle='Private detectives'
          imgUrl='/static/TheNiceGuys.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' movies={disneyMovies} size='large'/>
          <SectionCards title='Travel' movies={travelVideos} size='small'/>
          <SectionCards title='Productivity' movies={productivityVideos} size='medium'/>
          <SectionCards title='Popular' movies={popularVideos} size='small'/>
        </div>
      </div>
    </div>
  );
};