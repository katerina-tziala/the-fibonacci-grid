import './index.scss';
import './app/components/fibonacci-board/FibonacciBoard';

document.addEventListener('DOMContentLoaded', async () => {
  const fontFaces = await loadRequiredFonts();
  fontFaces.forEach(font => document.fonts.add(font));
  const main = document.querySelector('.main');
  main.innerHTML = `<app-fibonacci-board></fibonacci-board>`;
});

async function loadRequiredFonts() {
  const appURL = window.location.protocol + "//" + window.location.host;
  const fonts = [
    new FontFace(
      "Nunito",
      `url(${appURL}/assets/fonts/nunito-v20-latin-600.woff2)`
    )
  ];
  const promises = fonts.map(fontFace => fontFace.load());
  return Promise.all(promises);
}