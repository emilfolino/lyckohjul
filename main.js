function wheelOfFortune(selector) {
  const node = document.querySelector(selector);
  if (!node) return;

  const spin = document.querySelector('button');
  const wheel = document.querySelector('ul');
  let animation;
  let previousEndDegree = 0;

  spin.addEventListener('click', () => {
    if (animation) {
      animation.cancel(); // Reset the animation if it already exists
    }

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel.animate([
      { transform: `rotate(${previousEndDegree}deg)` },
      { transform: `rotate(${newEndDegree}deg)` }
    ], {
      duration: 30000,
      direction: 'normal',
      easing: 'cubic-bezier(0.1, 0.7, 0.5, 1)',
      fill: 'forwards',
      iterations: 1
    });

    previousEndDegree = newEndDegree;
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault()

    if (event.key === "s") {
      console.log("STOP")

      const wheelStyle = window.getComputedStyle(wheel, null)

      const matrix = wheelStyle.getPropertyValue('-webkit-transform') || 
        wheelStyle.getPropertyValue('-moz-transform') ||
        wheelStyle.getPropertyValue('-ms-transform') ||
        wheelStyle.getPropertyValue('-o-transform') ||
        wheelStyle.getPropertyValue('transform');

      let angle = 0; 

      if (matrix !== 'none') 
      {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } 

      angle = (angle < 0) ? angle +=360 : angle;
      console.log(angle)

      const additionalDegrees = 90 + Math.random() * 50;
      const newEndDegree = angle + additionalDegrees;
      animation = wheel.animate([
        { transform: `rotate(${angle}deg)` },
        { transform: `rotate(${newEndDegree}deg)` }
      ], {
        duration: 2000,
        direction: 'normal',
        easing: 'cubic-bezier(0.1, 0.7, 0.5, 1)',
        fill: 'forwards',
        iterations: 1
      });
    }
  })
}

wheelOfFortune('.wheel-of-fortune');