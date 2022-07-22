import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import cls from 'classnames';

import styles from './Card.module.css';

const defaultImg = 'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export const Card = ({size = 'medium', imgUrl = defaultImg, id}) => {

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem
  };

  const handleOnError = () => {
    setImgSrc(defaultImg);
  };

  const scale = id === 0 ? { scaleY: 1.1} : {scale: 1.1};

  return (
    <div
      className={styles.container}
    >
      <motion.div
        className={cls(styles.imgMotionWrapper,classMap[size])}
        whileHover={{...scale}}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt='Card picture'
          layout='fill'
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
