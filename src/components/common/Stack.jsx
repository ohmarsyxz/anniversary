import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 308, height: 308 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, video: "/anniversary/videos/pattaya.mp4", title: "Pattaya" },
          { id: 2, video: "/anniversary/videos/dreamworld.mp4", title: "Dreamworld" },
          { id: 3, video: "/anniversary/videos/1annClip.mp4", title: "1 Anniversary" },
          { id: 4, image: "/anniversary/images/1ann.png", title: "1 Anniversary card" },
          { id: 5, image: "/anniversary/images/2ann_card.png", title: "2 Anniversary card" },
          { id: 6, video: "/anniversary/videos/2annClip.mp4", title: "2 Anniversary" },
          { id: 7, video: "/anniversary/videos/2ann_long.mp4", title: "2 Anniversary Cutie" },
          { id: 8, video: "/anniversary/videos/3annClip.mp4", title: "3 Anniversary" },
          { id: 9, video: "/anniversary/videos/3ann-kwan.mp4", title: "3 Anniversary By Kwan" },
          { id: 10, video: "/anniversary/videos/4annClip.mp4", title: "4 Anniversary By Ohm" },
        ]
  );

  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const videoRef = useRef(null);

        const handleMouseOver = () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        };

        const handleMouseLeave = () => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        };

        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="absolute w-full h-full rounded-lg overflow-hidden"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              {card.video ? (
                <video
                  ref={videoRef}
                  muted
                  loop
                  preload="auto"
                  className="w-full h-full object-contain rounded-lg"
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                >
                  <source src={card.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={card.image}
                  alt={card.title}
                  className="rounded-lg w-full h-full object-contain"
                  draggable={false}
                  style={{ pointerEvents: "none" }}
                />
              )}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
