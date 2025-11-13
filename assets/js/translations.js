/* Translations file - Improved Version */
const TRANSLATIONS = {
  "home": {"en":"Home","ar":"الرئيسية"},
  "products": {"en":"Products","ar":"المنتجات"},
  "offers": {"en":"Offers","ar":"العروض"},
  "contact": {"en":"Contact","ar":"اتصل بنا"},
  "cart": {"en":"Cart","ar":"السلة"},
  "checkout": {"en":"Checkout","ar":"الدفع"},
  "admin_panel": {"en":"Admin Panel","ar":"لوحة التحكم"},
  "login": {"en":"Login","ar":"تسجيل الدخول"},
  "logout": {"en":"Logout","ar":"تسجيل الخروج"},
  "search_placeholder": {"en":"Search products...","ar":"ابحث عن المنتجات..."}
};

function applyTranslations(lang){
  try {
    // الحصول على اللغة الحالية أو استخدام الإنجليزية كافتراضي
    if(!lang) lang = localStorage.getItem('nonaBeautyLang') || 'en';
    
    // التأكد من أن اللغة مدعومة
    const supportedLangs = ['en', 'ar'];
    if(!supportedLangs.includes(lang)) {
      lang = 'en';
    }
    
    // تطبيق الترجمات على النصوص
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = TRANSLATIONS[key];
      if(entry) {
        el.textContent = entry?.[lang] || entry?.en || key;
      }
    });
    
    // تطبيق الترجمات على العناصر الأخرى مثل placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const entry = TRANSLATIONS[key];
      if(entry) {
        el.placeholder = entry?.[lang] || entry?.en || key;
      }
    });
    
    // تطبيق الترجمات على العناصر الأخرى مثل title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const entry = TRANSLATIONS[key];
      if(entry) {
        el.title = entry?.[lang] || entry?.en || key;
      }
    });
    
    // تعيين اتجاه الصفحة واللغة
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // حفظ اللغة المختارة
    localStorage.setItem('nonaBeautyLang', lang);
    
    // إطلاق حدث لتغيير اللغة (اختياري)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
  } catch (error) {
    console.error('Translation error:', error);
  }
}

function toggleLang(){ 
  const cur = localStorage.getItem('nonaBeautyLang') || 'en'; 
  const newLang = cur === 'en' ? 'ar' : 'en';
  applyTranslations(newLang);
  return newLang;
}

// تطبيق الترجمة تلقائياً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  applyTranslations();
});

// جعل الدوال متاحة عالمياً (للاستخدام في HTML)
window.applyTranslations = applyTranslations;
window.toggleLang = toggleLang;
