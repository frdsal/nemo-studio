# Nemo Studio v1.4.5

**UT Document Downloader** — Batch extract PDF, metadata, dan native text dari FlowPaper reader Universitas Terbuka dengan Nemo + Google Apps Script.

## Features

- 🎯 **Pattern-based file discovery** — DAFIS, TINJAUAN, M1-M12, custom patterns
- 📄 **Multi-format download** — PDF, PNG, native text, searchable PDFs
- 📦 **ZIP bundling** — Semua files + manifest dalam satu package
- 🔍 **Native text extraction** — OCR layer dari reader
- 💾 **Cloud storage** — Config saved ke GAS Properties
- ⚡ **Fast probing** — Direct PNG format endpoint (no watermark)
- 📊 **Metadata injection** — Course info + cover page dari Bareksa
- 🎨 **Dark theme UI** — Minimal, responsive design

## Quick Start

### Prerequisites
- Google Account
- GitHub Account (untuk host JS file)
- Browser modern (Chrome, Firefox, Safari)

### Setup (5 minutes)

1. **Fork atau clone repo ini**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nemo-studio.git
   cd nemo-studio
   ```

2. **Setup GitHub**
   - File `nemo-v1-4-5.js` already included, siap pakai
   - Public repo required (untuk CDN access)

3. **Setup Google Apps Script**
   - Buka https://script.google.com
   - New project
   - Upload `Code.gs`, `UI.html`, `appsscript.json`
   - Update UI.html dengan GitHub URL Anda
   - Deploy as web app

4. **Test**
   - Buka deployment URL
   - Harusnya muncul Nemo UI

**Detailed setup:** Lihat [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Architecture

```
Browser (GAS UI) → GitHub CDN (Nemo JS) → UT FlowPaper (PDF files)
                ↓
            GAS Backend
                ↓
        Google Drive (Config storage)
```

### Components

| File | Role |
|------|------|
| `nemo-v1-4-5.js` | Core download + UI logic |
| `Code.gs` | GAS backend (config, logging, auth) |
| `UI.html` | GAS frontend (loader, GAS bridge) |
| `appsscript.json` | GAS manifest |

## Usage

### Via GAS Web App (Production)

1. Deploy GAS sebagai web app
2. Share URL ke users
3. Users buka URL, input subfolder + pattern
4. Click "Scan" untuk probe files
5. Select files, download sebagai ZIP

### Via GitHub (Standalone)

Copy URL dari file `nemo-v1-4-5.js`:
```javascript
javascript:(...) // Copy bookmarklet dari v1.4.5 release
// Atau load langsung via script tag
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/nemo-studio@main/nemo-v1-4-5.js"></script>
```

## Configuration

Nemo settings disimpan di GAS Properties:
```javascript
{
  "subfolder": "BIOL4107",           // UT course folder
  "patternPresetKeys": ["toc", "overview", "m_plain"],
  "customPatterns": "M13.pdf, M14.pdf",
  "useDirectProbe": true,
  "speedMode": "balanced",
  "outputFormat": "pdf",
  "includeCover": true,
  "pdfSearchable": true,
  // ... more options
}
```

Edit via Nemo UI atau direct GAS Properties:
```javascript
// Di GAS Console
PropertiesService.getUserProperties()
  .setProperty('nemo_studio_config_v145', JSON.stringify(config));
```

## API Reference

```javascript
// Access Nemo dari console (dalam GAS UI)
const nemo = window.__nemoSubfolderStudioDownloaderV145__;

// Scan files
nemo.scan();

// Download selected
nemo.downloadSelectedDocuments();

// Check state
console.log(nemo.state.results);
console.log(nemo.state.candidates);

// Export
nemo.exportJson();

// Access logs via GAS
GAS_BRIDGE.getLogs().then(logs => console.log(logs));
```

## Modification Guide

Untuk customize Nemo:

1. Fork repo ini
2. Edit `nemo-v1-4-5.js`
3. Test di browser (load dari GitHub raw)
4. Push ke main branch
5. GAS UI auto-load latest (via CDN cache buster)

Contoh: Add custom pattern, change UI colors, add new download format.

**Lihat:** [MODIFICATION_GUIDE.md](./MODIFICATION_GUIDE.md) untuk detail.

## Troubleshooting

### Nemo tidak load
- Check GitHub repo public
- Check nemo-v1-4-5.js di-upload
- Verify URL di UI.html

### Config tidak tersimpan
- Check GAS execution log
- Verify localStorage tidak di-disable
- Try manual save di GAS Console

### Download gagal
- Check course code (format: `COURSE_CODE` atau `COURSE_CODE/subfolder`)
- Verify FlowPaper reader masih aktif
- Check network connection

**Full troubleshooting:** [SETUP_GUIDE.md → Troubleshooting](./SETUP_GUIDE.md#bagian-3-testing--troubleshooting)

## Version History

### v1.4.5 (Current)
- GAS integration
- Config persistence ke Google Drive
- Multi-layer caching (init, meta, blob)
- Searchable PDF generation
- Metadata injection dari Bareksa

### v1.4.0
- PNG direct probe (watermark-free)
- Pattern expansion {1-12}
- ZIP bundling
- Speed profiles

### v1.0.0
- Initial release

## License

Free for personal/educational use. Credits ke:
- Universitas Terbuka (course materials)
- jsDelivr (CDN)
- Google Apps Script (infrastructure)

## Contributing

For bug reports, feature requests:
1. Check existing issues
2. Create new issue dengan:
   - Nemo version
   - Browser + OS
   - Steps to reproduce
   - Expected vs actual behavior

PRs welcome untuk:
- Bug fixes
- Performance improvements
- New patterns/formats
- Documentation

## Maintainer

Created for UT students. Maintained as hobby project.

---

**Need help?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) atau lihat Troubleshooting di atas.

**Want to contribute?** Fork, edit, PR. All help appreciated!

**Found bug?** Report di Issues section.

Happy downloading! 📚
