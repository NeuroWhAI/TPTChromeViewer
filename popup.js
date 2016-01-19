
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    lastFocusedWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


function renderID(id) {
  document.getElementById('tpt_id').value = id;
}

function setDownloadLink(link) {
  var item = document.getElementById('download_link');
  item.href = link;
  item.hidden = false;
}

function hideDownloadLink() {
  document.getElementById('download_link').hidden = true;
}

function renderTPTLink(text, link) {
  var linkItem = document.getElementById('tpt_link');
  linkItem.href = link;
  linkItem.textContent = text;
}

function renderTPTLinkByID(id) {
  var tptLink = 'http://powdertoy.co.uk/Browse/View.html?ID=' + id;
  renderTPTLink(tptLink, tptLink);
}

function renderTPTImage(id) {
  document.getElementById('tpt_img').src = 'http://static.powdertoy.co.uk/' + id + '.png';
}


function copyToClipboard(text) {
  input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

function readClipboard(callback) {
  input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  document.body.appendChild(input);

  input.select();
  document.execCommand('Paste');

  callback(input.value);

  document.body.removeChild(input);
}


function checkID(text) {
  return Number.isInteger(Number(text));
}


function loadTPT(tptId) {
  if (checkID(tptId)) {
    renderID(tptId);
    setDownloadLink("http://powdertoy.co.uk/GetSave.util?ID=" + tptId);
    renderTPTLinkByID(tptId);
    renderTPTImage(tptId);
  }
  else {
    renderID("");
    hideDownloadLink();
    renderTPTLink('"' + tptId + "\" is not TPT ID.", "http://blog.naver.com/tlsehdgus321");
  }
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("button_load").addEventListener('click', button_load_onClick);

  readClipboard(function(tptId) {
    loadTPT(tptId);
  });
});

function button_load_onClick() {
  var tptIdBox = document.getElementById('tpt_id');
  loadTPT(tptIdBox.value);
}
