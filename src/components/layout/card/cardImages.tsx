import { useState } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";


const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface Props {
    images: {
        src: string;
        alt: string;
    }[]
    productId: string;
}

export function CardImages({ images, productId }: Props) {
    const [imageTranslationX, setImageTranslationX] = useState(49.99);
    const [imageIndicator, setImageIndicator] = useState(0);

    const paginate = (newDirection: number) => {
        setImageTranslationX(newDirection);
    };

    return (
        <Link href={`/product/${productId}`}>
            <div className='w-full'>
                <motion.div
                    className='w-full relative'
                    drag="x"
                    dragElastic={0.1}
                    transition={{
                        duration: 0.2,
                    }}
                    dragConstraints={{ right: 0, left: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(-50);
                            setImageIndicator(1)
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(50);
                            setImageIndicator(0)
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div
                        className={`flex items-center justify-center 
                flex-row ease-in-out duration-200`}
                        style={{
                            transform: `translateX(${imageTranslationX}%)`
                        }}>

                        {images.map(({ src, alt }, i) => (
                            <Image
                                key={src}
                                width={3024}
                                height={3024}
                                src={src}
                                blurDataURL='/images/placeholder-card-image.png'
                                placeholder='blur'
                                alt={alt}
                            />
                        ))}
                    </div>

                    <div className='absolute bottom-3 w-full flex items-center justify-center gap-2 mt-2'>
                        {images.map(({ }, i) => (
                            <ImageIndicator
                                key={i}
                                index={i}
                                currentIndex={imageIndicator}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </Link>
    )
}

function ImageIndicator({ index, currentIndex }: { index: number, currentIndex: number }) {
    return (
        <div className={`${index === currentIndex ? 'w-2 h-2' : 'w-1 h-1'} rounded-full border border-zinc-700 duration-100 ease-in-out shadow-lg shadow-black`}>
            <div
                className={`w-full h-full rounded-full duration-100 ease-in-out
            ${index === currentIndex ? 'bg-zinc-800 border border-zinc-200' : 'bg-transparent'}`}
            />
        </div>
    )
}
