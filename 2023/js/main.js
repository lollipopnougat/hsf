window.requestAnimationFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    ((callback) => {
      return window.setTimeout(callback, 1000 / 60);
    })
  );
})();

/**
 * 设置名字
 */
function setName() {
  const nameurl = location.href.split("?n=")[1];
  //const searchParams = new URLSearchParams(`?${location.href.split('?')[1]}`);
  let name = "";
  if (nameurl) {
    const reg = /&/g;
    if (reg.test(nameurl)) {
      name = decodeURI(nameurl.replace(reg, "%"));
    } else {
      /** @type {string[]} */
      let tmp = [];
      for (let i = 0; i < nameurl.length; i += 2) {
        tmp.push(nameurl.substring(i, i + 2));
      }
      tmp.unshift("");
      name = decodeURI(tmp.join("%"));
    }
  } else {
    name = "我的朋友";
  }
  document.querySelector(".headline").innerText = name;
}




window.onload = () => {
  setName();
  const conductor = new BandJS();
  conductor.setTimeSignature(3, 4);
  conductor.setTempo(80);
  const piano = conductor.createInstrument('square', 'oscillators');
  const piano2 = conductor.createInstrument('triangle', 'oscillators');
  //const drum = conductor.createInstrument('white', 'noises');
  const drum2 = conductor.createInstrument('pink', 'noises');
  piano.note('eighth', 'F4').note('eighth', 'F4');
  //drum.rest('quarter');
  drum2.rest('quarter');
  piano.note('quarter', 'F4').note('quarter', 'C4').note('eighth', 'A4').note('eighth', 'A4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('quarter', 'A4').note('quarter', 'F4').note('eighth', 'F4').note('eighth', 'A4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('quarter', 'C5').note('quarter', 'C5').note('eighth', 'Bb4').note('eighth', 'A4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('half', 'G4').note('eighth', 'G4').note('eighth', 'A4');
  piano2.note('eighth', 'F2').note('eighth', 'D3').note('eighth', 'Bb2').note('eighth', 'D3').note('eighth', 'Bb2').note('eighth', 'D3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('quarter', 'Bb4').note('quarter', 'Bb4').note('eighth', 'A4').note('eighth', 'G4');
  piano2.note('eighth', 'F2').note('eighth', 'D3').note('eighth', 'Bb2').note('eighth', 'D3').note('eighth', 'Bb2').note('eighth', 'D3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('quarter', 'A4').note('quarter', 'F4').note('eighth', 'F4').note('eighth', 'A4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('quarter', 'G4').note('quarter', 'C4').note('eighth', 'E4').note('eighth', 'G4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  piano.note('half', 'F4');
  piano2.note('eighth', 'F2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3').note('eighth', 'A2').note('eighth', 'C3');
  //drum.note('quarter').rest('half');
  drum2.rest('quarter').note('quarter').rest('quarter');
  const player = conductor.finish();
  document.onclick = () => {
    player.play();
  };
};
