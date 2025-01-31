
document.querySelectorAll('.banner-container-nmd').forEach((banner) => {

	const foreground = banner.querySelector('.slide-cpng-banner-front-nmd');
	  const background = banner.querySelector('.slide-cpng-banner-back-nmd');
	
  let direction = -1;
  let position = -50;
  let moveCount = 0;
  let acceleration = 0;
  let isDragging = false;
  let dragStart_X = 0;
  let dragStart_Y = 0;
	
  let isPaused = false;

function checkPosition() {
  if (position_x <= -30 ) {
    window.location.href = slide_target_url_nmd;
  }
}

	
  function animate() {
    if (!isPaused) {
      if (moveCount < 4) {
        if (direction === 1) {
          acceleration += 0.05;
          position += 1.5 + acceleration;
          if (position >= -60) {
            direction = -1;
            moveCount++;
            acceleration = 0;
          }
        } else {
          position -= 0.7;
          if (position <= -120) {
            direction = 1;
            moveCount++;
            acceleration = 0;
          }
        }
        foreground.style.left = `${position}px`;
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          moveCount = 0;
          requestAnimationFrame(animate);
        }, 1000);
      }
    }
  }

  // Mouse events
  foreground.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart_X = e.clientX - position;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      position = e.clientX - dragStart_X;
      position = Math.min(Math.max(position, -150), -60);
      foreground.style.left = `${position}px`;
		
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });


  foreground.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    dragStart_X = touch.clientX - position;
    e.preventDefault();
  });

	  background.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
//     dragStart_Y = touch.clientY - position;
    e.preventDefault();
  });
	
document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    position_x = touch.clientX - dragStart_X;
//     position_y = touch.clientY - dragStart_Y;

    position_x = Math.min(Math.max(position_x, -150), -60);
//     position_y = Math.min(Math.max(position_y, -150), -60);

    foreground.style.left = `${position_x}px`;

    checkPosition();
  }
});
background.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    position_x = touch.clientX - dragStart_X;
//     position_y = touch.clientY - dragStart_Y;

    position_x = Math.min(Math.max(position_x, -150), -60);
//     position_y = Math.min(Math.max(position_y, -150), -60);

    foreground.style.left = `${position_x}px`;

    checkPosition();
  }
});

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  foreground.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  foreground.addEventListener('mouseleave', () => {
    isPaused = false;
    animate();
  });

  animate();
});
