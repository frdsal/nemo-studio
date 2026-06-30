(() => {
  'use strict';
  const APP_KEY = '__nemoSubfolderStudioDownloaderV132__';
  const STORE_KEY = 'nemo.subfolderStudio.loader.v132.url';
  const SCRIPT_ID = 'nemo_subfolder_studio_loader_v132_script';

  if (window[APP_KEY] && typeof window[APP_KEY].show === 'function') {
    window[APP_KEY].show();
    return;
  }

  let scriptUrl = localStorage.getItem(STORE_KEY) || '';
  if (!scriptUrl || !/^https:\/\//i.test(scriptUrl)) {
    scriptUrl = prompt('Tempel URL file JS Nemo yang sudah di-hosting:', scriptUrl || 'https://example.com/nemo_subfolder_studio_app_v1_3_2_download_modes.js') || '';
    scriptUrl = scriptUrl.trim();
    if (!scriptUrl) return;
    if (!/^https:\/\//i.test(scriptUrl)) {
      alert('URL harus memakai HTTPS.');
      return;
    }
    localStorage.setItem(STORE_KEY, scriptUrl);
  }

  const old = document.getElementById(SCRIPT_ID);
  if (old) old.remove();

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = scriptUrl + (scriptUrl.includes('?') ? '&' : '?') + 'loader=v1.3.2';
  script.onload = () => {
    if (window[APP_KEY] && typeof window[APP_KEY].show === 'function') window[APP_KEY].show();
  };
  script.onerror = () => {
    alert('Nemo gagal dimuat. Cek URL hosting atau hapus URL lama dengan localStorage.removeItem("' + STORE_KEY + '").');
  };
  (document.head || document.documentElement).appendChild(script);
})();
