/**
 * 设置名字
 */
function setName() {
  const nameurl = location.href.split('?n=')[1];
  //const searchParams = new URLSearchParams(`?${location.href.split('?')[1]}`);
  let name = '';
  if (nameurl) {
    const reg = /&/g;
    if (reg.test(nameurl)) {
      name = decodeURI(nameurl.replace(reg, '%'));
    } else {
      /** @type {string[]} */
      let tmp = [];
      for (let i = 0; i < nameurl.length; i += 2) {
        tmp.push(nameurl.substring(i, i + 2));
      }
      tmp.unshift('');
      name = decodeURI(tmp.join('%'));
    }
  }
  else {
    name = '我的朋友';
  }
  document.querySelector('.headline').innerText = name;

}
window.onload = () => setName();
