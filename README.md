# Instagram Unlike Bot 🗑️

Instagram'daki tüm beğenilerinizi toplu olarak kaldırmanızı sağlayan tarayıcı scripti.

> **English version below**

## 🇹🇷 Türkçe

### Özellikler

- ✅ Toplu beğeni kaldırma (her turda 50 beğeni)
- 🔄 Otomatik döngü - tüm beğeniler bitene kadar çalışır
- 📊 Gerçek zamanlı ilerleme takibi
- 🛡️ Rate limiting koruması için akıllı bekleme süreleri
- 🛑 Hata durumunda otomatik durma

### Kullanım

1. **Instagram'a gidin** ve hesabınıza giriş yapın

2. **Beğeniler sayfasına gidin:**
   - Profil > ☰ Menü > Your activity > Likes
   - Veya direkt: `https://www.instagram.com/your_activity/interactions/likes`

3. **Tarayıcı konsolunu açın:**
   - Windows/Linux: `F12` veya `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`

4. **Scripti kopyalayıp konsola yapıştırın** ve `Enter`'a basın

5. **Durdurmak için** sayfayı yenileyin (`F5`)

### Yapılandırma

Script'in başındaki `CONFIG` objesini düzenleyerek ayarları değiştirebilirsiniz:

```javascript
const CONFIG = {
  UNLIKE_BATCH_SIZE: 50,              // Her turda kaç beğeni kaldırılacak
  DELAY_BETWEEN_ACTIONS_MS: 2000,     // Aksiyonlar arası bekleme (ms)
  DELAY_BETWEEN_CHECKBOX_CLICKS_MS: 100, // Checkbox tıklamaları arası
  DELAY_AFTER_SELECT_CLICK_MS: 2000,  // Select sonrası bekleme
  DELAY_BETWEEN_CYCLES_MS: 3000,      // Döngüler arası bekleme
  MAX_CONSECUTIVE_FAILS: 3            // Maks ardışık başarısız deneme
}
```

### ⚠️ Uyarılar

- Instagram'ın kullanım koşullarına aykırı olabilir
- Çok hızlı kullanım hesabınızın geçici olarak kısıtlanmasına neden olabilir
- Kendi sorumluluğunuzda kullanın
- Beğeniler geri alınamaz!

---

## 🇬🇧 English

### Features

- ✅ Bulk unlike (50 likes per batch)
- 🔄 Automatic loop - runs until all likes are removed
- 📊 Real-time progress tracking
- 🛡️ Smart delays for rate limiting protection
- 🛑 Auto-stop on errors

### Usage

1. **Go to Instagram** and log in to your account

2. **Navigate to Likes page:**
   - Profile > ☰ Menu > Your activity > Likes
   - Or directly: `https://www.instagram.com/your_activity/interactions/likes`

3. **Open browser console:**
   - Windows/Linux: `F12` or `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`

4. **Paste the script** into the console and press `Enter`

5. **To stop**, refresh the page (`F5`)

### ⚠️ Warnings

- May violate Instagram's Terms of Service
- Fast usage might result in temporary account restrictions
- Use at your own risk
- Unlikes cannot be undone!

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Pull requests are welcome! Feel free to improve the script or add new features.

## 📝 Changelog

### v1.0.0
- Initial release
- Batch unlike functionality
- Auto-loop mode
- Progress tracking
