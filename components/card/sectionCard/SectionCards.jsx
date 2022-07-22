import Link from 'next/link';
import { Card } from '../Card';
import styles from './SectionCards.module.css';

export const SectionCards = ({title, movies = [], size}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {movies.map((movie, i) => (
          <Link key={i} href={`video/${movie.id}`}>
            <a>
              <Card id={i} imgUrl={movie.imgUrl} size={size}/>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};
