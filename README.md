# 📊 RFM Grid Analizi

RFM (Recency, Frequency, Monetary) segmentasyonu kullanarak müşteri verilerini 5x5 grid görselleştirmesi ile analiz eden modern ve interaktif React uygulaması.

![RFM Grid Analysis](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🚀 Canlı Demo

**[🔗 Live Demo'yu Görüntüle](https://rfm-grid-analysis.vercel.app/)**

> Projeyi canlı olarak görmek için yukarıdaki linke tıklayın!

## 🎯 Genel Bakış

Bu uygulama RFM verilerini görselleştirmek ve analiz etmek için sezgisel bir arayüz sunar:
- **5x5 Grid Yapısı**: X ekseni Frequency Score'u, Y ekseni Monetary Score'u temsil eder
- **Dinamik Filtreleme**: Recency, Frequency ve Monetary aralıklarına göre veri filtreleme
- **İnteraktif Seçim**: Grid hücrelerinden tekli veya toplu öğe seçimi
- **API Entegrasyonu**: Seçili ID'leri mock API endpoint'ine gönderme

## 🚀 Özellikler

### ✨ Temel Özellikler
- **100+ Veri Kaydı**: Gerçekçi değerlerle önceden oluşturulmuş RFM veri seti
- **Yüzdelik Dilim Bazlı Skorlama**: Veri dağılımına göre 1-5 arası otomatik skor hesaplama
- **Gerçek Zamanlı Filtreleme**: Recency (gün), Frequency (adet) ve Monetary (değer) filtreleme
- **Grid Görselleştirme**: 5x5 matris içinde müşteri segmentlerinin görsel temsili
- **Toplu Seçim**: Grid hücresi içindeki tüm öğeleri seçme/kaldırma
- **Responsive Tasarım**: Modern, temiz UI ve akıcı animasyonlar

### 🎨 UI/UX Özellikleri
- Güzel gradient renk şeması
- Detaylı öğe görünümü için genişletilebilir grid hücreleri
- Seçimler ve etkileşimler için görsel geri bildirim
- Yükleme durumları ve hata yönetimi
- Aralık doğrulamalı sezgisel filtre kontrolleri
- **Tam Responsive Tasarım**: Desktop, Tablet ve Mobil uyumlu
- **Touch-Friendly**: Mobil cihazlar için optimize edilmiş dokunmatik arayüz

## 📂 Proje Yapısı

```
rfm-grid-analysis/
├── public/
│   └── data.json              # RFM veri seti (110 kayıt)
├── src/
│   ├── components/
│   │   ├── Grid.jsx           # Ana 5x5 grid componenti
│   │   ├── Grid.css
│   │   ├── GridCell.jsx       # Tekil hücre componenti
│   │   ├── GridCell.css
│   │   ├── Filters.jsx        # Filtre kontrolleri
│   │   ├── Filters.css
│   │   ├── ActionPanel.jsx    # Seçim ve gönderim paneli
│   │   └── ActionPanel.css
│   ├── utils/
│   │   ├── rfmCalculator.js   # RFM skorlama algoritmaları
│   │   └── api.js             # Mock API servisi
│   ├── App.jsx                # Ana uygulama componenti
│   ├── App.css
│   └── main.jsx               # Uygulama giriş noktası
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. **Projeyi indirin**
```bash
cd "Com digital - case"
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📊 Veri Yapısı

### Girdi Veri Formatı (data.json)
```json
[
  {
    "id": 1,
    "recency": 5,
    "frequency": 45,
    "monetary": 2500
  }
]
```

### İşlenmiş Veri (skorlarla birlikte)
```javascript
{
  "id": 1,
  "recency": 5,
  "frequency": 45,
  "monetary": 2500,
  "recency_score": 5,
  "frequency_score": 3,
  "monetary_score": 4
}
```

## 🎮 Kullanım Kılavuzu

### 1. Grid'i Görüntüleme
- Grid, Frequency (X ekseni) ve Monetary (Y ekseni) skorlarına göre dağıtılmış müşterileri gösterir
- Hücrelerdeki sayılar, o segmente düşen müşteri sayısını gösterir
- Öğeleri içeren hücrelere tıklayarak genişletin ve detayları görün

### 2. Veri Filtreleme
- Aşağıdaki aralıkları ayarlamak için yan paneldeki filtreleri kullanın:
  - **Recency**: Son satın almadan bu yana geçen gün
  - **Frequency**: Satın alma sayısı
  - **Monetary**: Toplam harcama tutarı
- Filtreler grid'i gerçek zamanlı olarak günceller
- Varsayılan aralıklara dönmek için "Reset" butonuna tıklayın

### 3. Öğe Seçimi
- Tekil öğelere tıklayarak seç/seçimi kaldır
- Hücredeki tüm öğeleri seçmek için ✓ butonunu kullanın
- Hücredeki tüm öğelerin seçimini kaldırmak için ✕ butonunu kullanın
- Seçili öğeler yeşil arka planla görünür

### 4. Veri Gönderimi
- Aksiyon Panelinde seçim sayısını görüntüleyin
- Seçili ID'leri API'ye göndermek için "Submit X IDs" butonuna tıklayın
- API istek detayları için tarayıcı konsolunu kontrol edin
- Başarı/hata mesajları gönder butonu altında görünür

## 🔧 Teknik Detaylar

### RFM Skor Hesaplama
Skorlar yüzdelik dilim bazlı dağılım kullanılarak hesaplanır:

```javascript
0-20%   → Skor 1
20-40%  → Skor 2
40-60%  → Skor 3
60-80%  → Skor 4
80-100% → Skor 5
```

### Grid Konumlandırma
- **X-koordinatı**: `frequency_score` (1-5)
- **Y-koordinatı**: `monetary_score` (1-5)

### Mock API Endpoint
- **Endpoint**: `POST /api/selected-ids`
- **Payload**: `{ ids: [1, 2, 3, ...] }`
- **Response**: Zaman damgalı başarı onayı
- **Implementation**: Konsol loglamalı istemci tarafı mock

## 🎨 Özelleştirme

### Veriyi Değiştirme
Kendi veri setinizi kullanmak için `public/data.json` dosyasını düzenleyin. Her kaydın şunları içerdiğinden emin olun:
- `id` (sayı)
- `recency` (sayı)
- `frequency` (sayı)
- `monetary` (sayı)

### Stil Değişiklikleri
Tüm component stilleri kolay özelleştirme için ayrı CSS dosyalarındadır:
- Renkler, boşluklar ve animasyonlar ayarlanabilir
- Tema tutarlılığı için CSS değişkenleri eklenebilir

### Skor Aralıkları
`src/utils/rfmCalculator.js` dosyasındaki yüzdelik eşiklerini değiştirin:
```javascript
if (adjustedPercentile <= 20) return 1;
```

## 📦 Production Build

```bash
npm run build

npm run preview
```

Build çıktısı `dist/` klasöründe olacaktır.

## 🧪 Uygulamayı Test Etme

1. **Filtre Testi**: Filtreleri ayarlayın ve grid'in doğru güncellendiğini doğrulayın
2. **Seçim Testi**: Farklı hücrelerden öğeleri seçin ve sayıyı doğrulayın
3. **API Testi**: ID'leri gönderin ve istek logları için tarayıcı konsolunu kontrol edin
4. **Edge Case'ler**: Boş filtrelerle, seçim olmadan vb. test edin

## 🔍 Temel Algoritmalar

### 1. RFM Skor Hesaplama
- Veri setindeki tüm değerleri sıralar
- Her değer için yüzdelik pozisyonu hesaplar
- Yüzdelikleri 1-5 skor aralığına eşler
- Recency için ters skorlama uygular

### 2. Grid Gruplama
- Her müşteriyi (x, y) koordinatlarına eşler
- Müşterileri grid pozisyonuna göre gruplar
- Orijinal veriye referansı korur

### 3. Filtreleme
- Ham RFM değerlerine aralık filtreleri uygular
- Grid hücrelerindeki görünür öğeleri günceller
- Filtrelenmiş öğelerin seçimini otomatik kaldırır

## 🎯 Kullanım Senaryoları

- **Müşteri Segmentasyonu**: Yüksek değerli müşteri gruplarını belirleyin
- **Pazarlama Kampanyaları**: Belirli RFM segmentlerini hedefleyin
- **Elde Tutma Analizi**: Yüksek recency skorlu müşterilere odaklanın
- **Gelir Analizi**: Monetary skor dağılımlarını analiz edin

## 📱 Responsive Tasarım

Uygulama tüm cihaz boyutlarında mükemmel çalışır:

### Desktop (1024px+)
- Yan yana sidebar ve grid görünümü
- Geniş hücreler ve detaylı görünüm
- Hover efektleri ve animasyonlar

### Tablet (768px - 1024px)
- Alt alta sidebar ve grid düzeni
- Optimize edilmiş hücre boyutları
- Touch-friendly butonlar

### Mobil (< 768px)
- Tam mobil optimize layout
- Küçük ekranlar için özel boyutlandırma
- Touch gesture desteği
- Dikey scroll optimizasyonu

### Küçük Mobil (< 480px)
- Ultra kompakt tasarım
- Tek sütun düzeni
- En küçük ekranlar için optimize

## 📝 Notlar

- Veri seti demonstrasyon için 110 kayıt içerir
- Tüm API çağrıları mock'tur (backend gerekmez)
- Filtreler skorlar üzerinde değil, ham RFM değerleri üzerinde çalışır
- Grid konumlandırma hesaplanmış skorları kullanır
- Tüm cihazlarda sorunsuz çalışır (Desktop, Tablet, Mobil)


