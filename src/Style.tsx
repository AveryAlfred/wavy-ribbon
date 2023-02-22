import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
:root {
  font-family: 'Bebas Neue', cursive;
  --fs-svg: clamp(5rem,  1vw + 5rem, 10rem);
  --fs-xl: clamp(5rem, 12vw + 1rem, 50rem);
  --fs-600: 2rem;
  --fs-500: 2rem;
  --fs-400: 1rem;
  --fs-padding: clamp(1vw, 10vw + 2rem, 40vw);
  
  --fc-title: hsl(0, 0%, 90%);
  --fc-h1: hsl(0, 0%, 80%);
  --fc-p: hsl(0, 0%, 80%);
  --fc-button: hsl(0, 0%, 55%);
  --fc-accent: hsl(0, 0%, 25%);
  --fc-link: hsl(0, 0%, 40%);
  --fca-link: hsl(0, 0%, 70%);
}

// STUB top
* {
  box-sizing: border-box;
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }
}
#renderCanvas {
  position: absolute !important;
}
.scroll {
  pointer-events: auto ;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  overflow-y: auto;
  scroll-snap-type: y proximity;
  div {
    scroll-snap-align: start;
  }
}
body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    -webkit-font-smoothing: antialiased;
}
// STUB scroll
* {
  ::-webkit-scrollbar {
    width: max(3px, 0.5vw);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10rem;
    background: var(--fc-accent);
  }
  scrollbar-width: thin;
  scrollbar-color: var(--fc-accent) black;
}



// STUB content
#title {
  font-size: var(--fs-xl);
  color: var(--fc-title);
} 
.segment {
  /* pointer-events: none !important; */
  position: sticky;
  display: grid;
  place-items: center start;
  font-size: var(--fs-400);
  color: var(--fc-p);
  line-height: 1.6em;
  letter-spacing: 1.5px;
  top: 0;
  padding: var(--fs-padding);
  padding-block: min(15vh, 15rem);
  width: clamp(40ch, 60%, 77ch);

  p {
    margin-left: 2rem;
  }
  li {
    list-style-type: none ;
    color: var(--fc-link);
  }
  li:hover {
    color: var(--fca-link);
    cursor: pointer;
  }
  h1 {
    font-size: var(--fs-600);
    color: var(--fc-h1);
    font-weight: 100;
    line-height: 1em;
    margin: 0;
    margin-bottom: 0.5rem;
    -webkit-font-smoothing: auto;
  }

}
.slide {
  padding:  1rem;
  background: rgba(255, 255, 255, 0.005);

  border: 1px solid rgba(19, 18, 18, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

#playButton {
  all: unset;
  cursor: pointer;
  color: var(--fc-button);
  font-size: var(--fs-svg);
  border-radius: 4px;
  letter-spacing: 0.1em;
  position: fixed;
  top: 0;
  right: 0rem;
  margin-right:  var(--fs-padding);
  margin-top: min(10vh, 10rem);
  
}
.bzar {
  color: var(--fc-link);
  margin-top: -1rem;
  font-size: var(--fs-500);


}

// STUB svg
.icon {
  animation: opacityPulse 1.5s ease-out;
  animation-iteration-count: infinite;
  opacity: 1;
  width: var(--fs-svg);
  height: var(--fs-svg);
  fill: var(--fc-button);

  path {
    stroke: var(--fc-button);
  }
  line {
    stroke: var(--fc-button);
  }
}

// STUB animation
@keyframes opacityPulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

// STUB leva
.leva-c-kWgxhW {
  top: clamp(10vw, 10vw + 2rem, 60vw);
  margin-right:  var(--fs-padding);
}

// STUB responsive typogrpahy
* {

  // large
  @media only screen and (max-width: 7000px) {
    --fs-xl: clamp(5rem, 10vw + 10rem, 10rem);
    --fs-svg: 2.5rem;
    --fs-600: clamp(5rem, 2vw + 4rem, 10rem);
    --fs-500: 1rem;
    --fs-400: clamp(1rem, 1.25rem, 3rem);
}
// standard
@media only screen and (max-width: 1000px) {
  --fs-svg: 2.5rem;
  --fs-xl: 12rem;
  --fs-600: 6rem;
  --fs-400: 1.2rem;
}
@media only screen and (max-width: 820px) {
  --fs-svg: 2.5rem;
  --fs-xl: 12rem;
  --fs-600: 6rem;
  --fs-500: 1rem;
  --fs-400: 1.25rem;
  /* .bzar {
    right: 0rem;
    top: -1rem;
  } */
}
// turned
@media screen and (max-width: 700px), screen and (max-height: 500px) {
  --fs-padding: clamp(5vw, 1vw + 0.5rem, 40vw);
  --fs-svg: 2rem;
  --fs-xl: 12rem;
  --fs-600: 6rem;
  --fs-400: 1rem;
}
@media only screen and (max-width: 600px) {
  --fs-padding: clamp(5vw, 1vw + 0.5rem, 40vw);
  --fs-svg: 2rem;
  --fs-xl: 5rem;
  --fs-600: 3rem;
  --fs-400: 1rem;
}
@media only screen and (max-width: 540px) {
  --fs-padding: clamp(1vw, 1vw + 2rem, 40vw);
  --fs-svg: 1.5rem;
  .dot {
    width: clamp(25ch, 50%, 75ch);
  }
}
  @media only screen and (max-width: 414px) {
  --fs-padding: clamp(1vw, 1vw + 2rem, 40vw);
  --fs-svg: 1.5rem;
  .dot {
    width: clamp(25ch, 50%, 75ch);
  }
}
@media only screen and (max-width: 400px) {
  --fs-padding: clamp(1vw, 1vw + 2rem, 40vw);
  --fs-svg: 1rem;
  --fs-500: 1rem;
  .dot {
    width: clamp(30ch, 50%, 80ch);
  }
}
@media only screen and (max-width: 285px) {
  --fs-padding: clamp(1vw, 5vw + 0.75rem, 40vw);
  --fs-svg: 5rem;
  --fs-500: 1rem;
  --fs-xl: 5rem;
  --fs-600: 2.5rem;
  --fs-400: 1rem;
}

}
`;
