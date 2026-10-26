const projectVideos = document.querySelectorAll("video.project-video");
const visibleProjectVideos = new Set();

function playProjectVideo(video) {
  if (!video.paused) return;

  video.muted = true;
  video.play().catch(error => {
    console.warn("Could not autoplay project video:", video.currentSrc, error);
  });
}

projectVideos.forEach(video => {
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
});

const projectVideoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleProjectVideos.add(entry.target);
      playProjectVideo(entry.target);
    } else {
      visibleProjectVideos.delete(entry.target);
    }
  });
}, { threshold: 0.1 });

projectVideos.forEach(video => projectVideoObserver.observe(video));

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    visibleProjectVideos.forEach(playProjectVideo);
  }
});
