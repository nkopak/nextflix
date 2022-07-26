import Link from 'next/link';
import { Card } from '../Card';
import cls from 'classnames';
import styles from './SectionCards.module.css';

export const SectionCards = ({title, movies = [], size, shouldWrap = false, shouldScale}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {movies.map((movie, i) => (
          <Link key={i} href={`/video/${movie.id}`}>
            <a>
              <Card id={i} imgUrl={movie.imgUrl} size={size} shouldScale={shouldScale}/>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};
