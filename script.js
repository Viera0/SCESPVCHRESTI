let tempo = 30;
let countdownEl = document.getElementById("countdown");
let qrcodeEl = document.getElementById("qrcode");

async function gerarNovoQR() {
  qrcodeEl.innerHTML = "";
  const res = await fetch("https://<NOME_DA_SUA_FUNCTION>.azurewebsites.net/api/TokenFunction");
  const data = await res.json();

  const url = `https://<SEU_STATIC_SITE>.z13.web.core.windows.net/voucher.html?token=${data.token}`;
  new QRCode(qrcodeEl, {
    text: url,
    width: 256,
    height: 256
  });

  tempo = 30;
}

function iniciarContador() {
  setInterval(() => {
    tempo--;
    countdownEl.textContent = `Expira em ${tempo} segundos`;
    if (tempo === 0) {
      gerarNovoQR();
    }
  }, 1000);
}

gerarNovoQR();
iniciarContador();
