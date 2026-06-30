(() => {
  'use strict';
  const APP_KEY = '__nemoSubfolderStudioDownloaderV132__';
  const SCRIPT_URL = '__NEMO_SCRIPT_URL__';
  const SCRIPT_ID = 'nemo_subfolder_studio_loader_v132_script';

  if (window[APP_KEY] && typeof window[APP_KEY].show === 'function') {
    window[APP_KEY].show();
    return;
  }

  if (!/^https:\/\//i.test(SCRIPT_URL) || SCRIPT_URL.includes('__NEMO_SCRIPT_URL__')) {
    alert('URL script Nemo belum diisi. Edit bookmarklet lalu ganti __NEMO_SCRIPT_URL__ dengan URL file JS yang sudah di-hosting.');
    return;
  }

  const old = document.getElementById(SCRIPT_ID);
  if (old) old.remove();

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = SCRIPT_URL + (SCRIPT_URL.includes('?') ? '&' : '?') + 'loader=v1.3.2';
  script.onload = () => {
    if (window[APP_KEY] && typeof window[APP_KEY].show === 'function') window[APP_KEY].show();
  };
  script.onerror = () => {
    alert('Nemo gagal dimuat. Pastikan URL JS publik, memakai HTTPS, dan tidak diblokir oleh halaman.');
  };
  (document.head || document.documentElement).appendChild(script);
})();
