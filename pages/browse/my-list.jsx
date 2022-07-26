import Head from 'next/head';
import { Navbar, SectionCards } from '../../components';
import { getMyList } from '../../lib/movies';

import styles from '../../styles/MyList.module.css';
import { useRedirectUser } from '../../utils/redirect';

export async function getServerSideProps(context){
  const {userId, token} = await useRedirectUser(context);
  const videos = await getMyList(userId, token);

  return {props: {myListVideos: videos}};

}

const MyList = ({myListVideos}) => {

  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <Navbar/>
        <div className={styles.sectionWrapper}>
          <SectionCards
            title='My List'
            movies={myListVideos}
            size='small'
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
