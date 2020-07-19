import React, { useEffect } from 'react';
import './App.css';
import useWebAnimations from "@wellyshen/use-web-animations";

function App() {

  const keyframes = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  const bg_timing = {
    duration: 36000,
    iterations: Infinity
  }

  const fg_timing = {
    duration: 12000,
    iterations: Infinity
  }

  const bg_1 = useWebAnimations({
    keyframes,
    timing: bg_timing
  })

  const bg_2 = useWebAnimations({
    keyframes,
    timing: bg_timing
  })

  const fg_1 = useWebAnimations({
    keyframes,
    timing: fg_timing
  })

  const fg_2 = useWebAnimations({
    keyframes,
    timing: fg_timing
  })

  const queen = useWebAnimations({
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ],
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 800,
      playbackRate: 1,
      iterations: Infinity
    }
  })

  const bg_fg_imgs = [bg_1, bg_2, fg_1, fg_2];
  useEffect(() => {

    const adjustBackgroundPlayback = () => {
      if (queen.getAnimation() && bg_fg_imgs[0].getAnimation()) {
        if (queen.getAnimation().playbackRate < 0.8) {
          bg_fg_imgs.forEach((img) => {
            img.getAnimation().playbackRate = queen.getAnimation().playbackRate / 2 * -1;
          });
        } else if (queen.getAnimation().playbackRate > 1) {
          bg_fg_imgs.forEach((img) => {
            img.getAnimation().playbackRate = queen.getAnimation().playbackRate / 2;
          });
        } else {
          bg_fg_imgs.forEach((img) => {
            img.getAnimation().playbackRate = 0;
          });
        }
      }
    }

    const speedIncrement = () => {
      queen.getAnimation().playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }
    
    setInterval(() => {
      if (queen.getAnimation().playbackRate > 0.4) {
        queen.getAnimation().playbackRate *= .9;
        adjustBackgroundPlayback();
      }
    }, 3000)

    document.addEventListener('click', speedIncrement)
  }, [queen, bg_fg_imgs])

  return (
    <div id='container'>
      <div id='sky' />
      <div id='earth'>
        <div id='red-queen-and-alice'>
          <img ref={queen.ref} src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png'
            alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>
      <div className='bg-fg-imgs' id='fg-1' ref={fg_1.ref}>
        <img id='fg-1-img' alt='palm' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" />
      </div>
      <div className='bg-fg-imgs' id='fg-2' ref={fg_2.ref}>
        <img id='fg-2-img-1' alt='bush' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" />
        <img id='fg-2-img-2' alt='w_rook_upright' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" />
      </div>
      <div className='bg-fg-imgs' id='bg-1' ref={bg_1.ref}>
        <img id='bg-1-img-1' alt='pawn_upright' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" />
        <img id='bg-1-img-2' alt='w_rook' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" />
        <img id='bg-1-img-3' alt='palm' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" />
      </div>
      <div className='bg-fg-imgs' id='bg-2' ref={bg_2.ref}>
        <img id='bg-2-img-1' alt='pawn' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" />
        <img id='bg-2-img-2' alt='knight' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" />
        <img id='bg-2-img-3' alt='palm' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" />
      </div>
    </div>
  );
}

export default App;