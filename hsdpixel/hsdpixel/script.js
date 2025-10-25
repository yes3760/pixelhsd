/* === MODERN İLAN SİTESİ ANA SCRIPT DOSYASI === */

// Sayfa yüklendiğinde bu fonksiyonlar çalışır
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Footer Yıl Kodu: Footer'daki yılı günceller
  try {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  } catch (e) {
    console.error("Yıl güncellenirken hata:", e);
  }

  // 2. Takvim Kodu: Sol kenar çubuğundaki takvimi oluşturur
  try {
    const calendarTable = document.getElementById('cal');
    if (calendarTable) {
      generateCalendar(calendarTable);
    }
  } catch (e) {
    console.error("Takvim oluşturulurken hata:", e);
  }

  // 3. Dil Seçimi Yönlendirme Kodu: Sağdaki dil menüsünü çalıştırır
  try {
    const langSelect = document.getElementById('chlang');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        // Kullanıcı bir dil seçtiğinde
        const selectedLangUrl = e.target.value; // <option> elementinin 'value' değerini al
        if (selectedLangUrl) {
          // Tarayıcıyı o URL'ye yönlendir
          window.location.href = selectedLangUrl;
        }
      });
    }
  } catch (e) {
    console.error("Dil seçimi çalışırken hata:", e);
  }
});

/**
 * Takvimi oluşturan fonksiyondur.
 * Pazartesi'yi haftanın ilk günü olarak ayarlar.
 * CSS'teki .today ve .empty sınıflarını kullanır.
 * @param {HTMLTableElement} tableElement - Takvimin çizileceği <table>.
 */
function generateCalendar(tableElement) {
  const today = new Date();
  const currentDay = today.getDate(); // Bugünü al (örn: 25)
  const month = today.getMonth();
  const year = today.getFullYear();

  // Önce tabloyu temizle
  tableElement.innerHTML = '';

  // Başlık (Günler)
  const daysOfWeek = ['Pzt', 'Sal', 'Çrş', 'Per', 'Cum', 'Cmt', 'Paz'];
  const thead = tableElement.createTHead();
  const headerRow = thead.insertRow();
  daysOfWeek.forEach((d) => {
    const th = document.createElement('th');
    th.textContent = d;
    headerRow.appendChild(th);
  });

  const tbody = tableElement.createTBody();

  // Ayın toplam gün sayısı
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Ayın ilk gününün hangi güne denk geldiğini bul (Pzt=0, Pzr=6)
  // JavaScript'te Pazar 0'dır. Bizim kodumuz Pazartesi'yi 0 yapar.
  const firstDay = new Date(year, month, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; 

  let date = 1; // Ayın 1'inden başla

  // Takvim hücrelerini oluştur
  for (let i = 0; i < 6; i++) { // En fazla 6 satır
    const row = tbody.insertRow();
    
    for (let j = 0; j < 7; j++) { // 7 gün
      const cell = row.insertCell();

      if (i === 0 && j < startingDay) {
        // Ayın başındaki boş hücreler
        cell.classList.add('empty');
      } else if (date > daysInMonth) {
        // Ayın sonundaki boş hücreler
        cell.classList.add('empty');
      } else {
        // Dolu hücreler
        cell.textContent = date;
        
        // === SORUNUN ÇÖZÜMÜ BURADA ===
        // Eğer hücredeki gün, bugünün tarihi ile eşleşirse
        if (date === currentDay) {
          cell.classList.add('today'); // 'today' sınıfını ekle
        }
        // ============================
        
        date++;
      }
    }
    
    if (date > daysInMonth) {
      break; // Günler bittiyse daha fazla satır ekleme
    }
  }
}