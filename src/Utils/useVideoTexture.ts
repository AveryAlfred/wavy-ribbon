type VideoTextureProps = {
  unsuspend?: 'canplay' | 'canplaythrough'
  muted?: boolean
  loop?: boolean
  start?: boolean
  crossOrigin?: string
}

export function useVideoTexture(src: string, props?: VideoTextureProps) {
  const { unsuspend, start, crossOrigin, muted, loop } = {
    unsuspend: 'canplay',
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    ...props,
  }
}

// export function useVideoTexture(src: string, props?: VideoTextureProps) {
//   const { unsuspend, start, crossOrigin, muted, loop } = {
//     unsuspend: 'canplay',
//     crossOrigin: 'Anonymous',
//     muted: true,
//     loop: true,
//     start: true,
//     ...props,
//   }

//   const vid = document.createElement("video")

  
//   vid.src = url;
//   vid.play();
//   return vid
// }