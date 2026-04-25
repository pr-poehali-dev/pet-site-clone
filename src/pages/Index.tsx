import { useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'cats', label: 'Кошки' },
  { id: 'dogs', label: 'Собаки' },
  { id: 'warning', label: 'Тревожные знаки' },
];

const CAT_BREEDS = [
  { name: 'Британская', trait: 'Спокойная и ласковая', icon: '🐱' },
  { name: 'Сиамская', trait: 'Активная и разговорчивая', icon: '😺' },
  { name: 'Мейн-кун', trait: 'Крупная и дружелюбная', icon: '🦁' },
  { name: 'Персидская', trait: 'Мягкая и нежная', icon: '😸' },
];

const DOG_BREEDS = [
  { name: 'Лабрадор', trait: 'Преданный и добрый', icon: '🐶' },
  { name: 'Немецкая овчарка', trait: 'Умная и смелая', icon: '🐕' },
  { name: 'Мопс', trait: 'Весёлый и игривый', icon: '🐾' },
  { name: 'Хаски', trait: 'Энергичный и своенравный', icon: '🐺' },
];

const CAT_CARE = [
  { icon: 'Droplets', title: 'Вода', desc: 'Свежая вода каждый день, лучше проточная' },
  { icon: 'UtensilsCrossed', title: 'Питание', desc: '2 раза в день, качественный корм или натуральная еда' },
  { icon: 'Scissors', title: 'Уход', desc: 'Расчёсывание 2-3 раза в неделю, стрижка когтей раз в месяц' },
  { icon: 'Activity', title: 'Игры', desc: 'Минимум 15-20 минут активных игр ежедневно' },
  { icon: 'HeartPulse', title: 'Ветеринар', desc: 'Прививки и осмотр раз в год, при болезни — сразу' },
  { icon: 'Home', title: 'Пространство', desc: 'Когтеточка, лежанка и место для уединения' },
];

const DOG_CARE = [
  { icon: 'Footprints', title: 'Прогулки', desc: 'Минимум 2 прогулки в день по 30-60 минут' },
  { icon: 'UtensilsCrossed', title: 'Питание', desc: 'Кормление 2 раза в день, порция по весу собаки' },
  { icon: 'Bath', title: 'Купание', desc: 'Раз в 1-2 месяца или по необходимости' },
  { icon: 'GraduationCap', title: 'Дрессировка', desc: 'Базовые команды с первых недель жизни дома' },
  { icon: 'Stethoscope', title: 'Ветеринар', desc: 'Прививки, обработка от паразитов каждые 3-6 месяцев' },
  { icon: 'Heart', title: 'Социализация', desc: 'Общение с людьми и другими животными с раннего возраста' },
];

const WARNING_SIGNS = [
  {
    color: 'bg-red-50 border-red-200',
    badgeColor: '#E53E3E',
    badgeText: 'Срочно',
    icon: 'AlertTriangle',
    iconColor: '#E53E3E',
    hint: 'Немедленно к ветеринару',
    signs: [
      { animal: '🐱🐶', text: 'Рвота или понос более 24 часов' },
      { animal: '🐱🐶', text: 'Отказ от воды более 12 часов' },
      { animal: '🐱🐶', text: 'Затруднённое дыхание, хрипы' },
      { animal: '🐱🐶', text: 'Судороги или потеря сознания' },
      { animal: '🐱🐶', text: 'Кровотечение, глубокие раны' },
      { animal: '🐶', text: 'Вздутый живот, скручивание (заворот кишок)' },
    ]
  },
  {
    color: 'bg-amber-50 border-amber-200',
    badgeColor: '#D4881E',
    badgeText: 'Внимание',
    icon: 'Eye',
    iconColor: '#D4881E',
    hint: 'Запишитесь к ветеринару в ближайшие дни',
    signs: [
      { animal: '🐱🐶', text: 'Снижение аппетита более 2 дней' },
      { animal: '🐱🐶', text: 'Вялость и апатия, нет интереса к играм' },
      { animal: '🐱🐶', text: 'Чрезмерное чесание, выпадение шерсти' },
      { animal: '🐱🐶', text: 'Частое мочеиспускание или его отсутствие' },
      { animal: '🐱', text: 'Кошка перестала ухаживать за собой' },
      { animal: '🐶', text: 'Хромота или нежелание двигаться' },
    ]
  },
  {
    color: 'bg-blue-50 border-blue-200',
    badgeColor: '#3B82F6',
    badgeText: 'Наблюдать',
    icon: 'Clock',
    iconColor: '#3B82F6',
    hint: 'Понаблюдайте 1-2 дня, при ухудшении — к врачу',
    signs: [
      { animal: '🐱🐶', text: 'Незначительное изменение стула 1-2 дня' },
      { animal: '🐱🐶', text: 'Небольшой насморк без температуры' },
      { animal: '🐱🐶', text: 'Лёгкие изменения в поведении' },
      { animal: '🐱', text: 'Кошка чаще прячется (если нет других симптомов)' },
      { animal: '🐶', text: 'Снижение активности в жаркую погоду' },
      { animal: '🐱🐶', text: 'Однократная рвота без других признаков' },
    ]
  }
];

const heroImg = 'https://cdn.poehali.dev/projects/8e05d1c1-a2c7-434f-adeb-33cab0df0ea4/files/1973b4ad-46c9-406c-8de1-04ecc3761f5d.jpg';
const catImg = 'https://cdn.poehali.dev/projects/8e05d1c1-a2c7-434f-adeb-33cab0df0ea4/files/56b2ad24-2388-4c6b-bba5-b02111c914f9.jpg';
const dogImg = 'https://cdn.poehali.dev/projects/8e05d1c1-a2c7-434f-adeb-33cab0df0ea4/files/c0dd81c0-003e-4331-b4b6-c49d4be1e806.jpg';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC', fontFamily: "'Open Sans', sans-serif" }}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
            <span className="text-2xl">🐾</span>
            <span className="font-display font-extrabold text-xl" style={{ color: '#D4881E', fontFamily: 'Montserrat' }}>ПетКер</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  fontFamily: 'Montserrat',
                  backgroundColor: activeSection === item.id ? '#D4881E' : 'transparent',
                  color: activeSection === item.id ? '#fff' : '#3D2B1F',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#3D2B1F' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  fontFamily: 'Montserrat',
                  backgroundColor: activeSection === item.id ? '#D4881E' : 'transparent',
                  color: activeSection === item.id ? '#fff' : '#3D2B1F',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ======== HOME ======== */}
      {activeSection === 'home' && (
        <div>
          <section style={{ background: 'linear-gradient(140deg, #FDF6EC 0%, #F5EDD8 55%, #EDD9A3 100%)' }}>
            <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                  style={{ backgroundColor: '#FBF0DC', color: '#D4881E', fontFamily: 'Montserrat' }}>
                  🐾 Всё для ваших питомцев
                </div>
                <h1 className="font-extrabold leading-tight mb-4"
                  style={{ fontFamily: 'Montserrat', fontSize: '2.6rem', color: '#3D2B1F', lineHeight: 1.2 }}>
                  Забота о питомце —<br />
                  <span style={{ color: '#D4881E' }}>это просто</span> и с любовью
                </h1>
                <p className="text-lg mb-8" style={{ color: '#7A5C3A' }}>
                  Советы по уходу за кошками и собаками, тревожные признаки болезней и всё, что нужно знать заботливому хозяину.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveSection('cats')}
                    style={{ backgroundColor: '#D4881E', color: '#fff', padding: '13px 28px', borderRadius: '50px', fontFamily: 'Montserrat', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                    🐱 О кошках
                  </button>
                  <button onClick={() => setActiveSection('dogs')}
                    style={{ backgroundColor: 'transparent', color: '#D4881E', padding: '11px 26px', borderRadius: '50px', fontFamily: 'Montserrat', fontWeight: 700, border: '2px solid #D4881E', cursor: 'pointer', fontSize: '15px' }}>
                    🐶 О собаках
                  </button>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 md:w-88 md:h-88 rounded-3xl overflow-hidden shadow-2xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <img src={heroImg} alt="Питомцы" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
                    <span className="text-2xl">❤️</span>
                    <div>
                      <div className="font-bold text-sm" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Здоровый питомец</div>
                      <div className="text-xs" style={{ color: '#7A5C3A' }}>= счастливый хозяин</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 text-center">
                    <div className="text-2xl">🐾</div>
                    <div className="font-bold text-xs" style={{ fontFamily: 'Montserrat', color: '#D4881E' }}>Советы</div>
                  </div>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', marginTop: '-1px' }}>
              <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#FDF6EC" />
            </svg>
          </section>

          {/* Quick nav cards */}
          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="font-extrabold text-2xl text-center mb-8" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>
              Выберите раздел
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'cats', emoji: '🐱', title: 'Кошки', desc: 'Породы, уход, кормление и особенности характера' },
                { id: 'dogs', emoji: '🐶', title: 'Собаки', desc: 'Популярные породы, дрессировка и ежедневный уход' },
                { id: 'warning', emoji: '⚠️', title: 'Тревожные знаки', desc: 'Когда нужен ветеринар и симптомы, которые нельзя игнорировать' },
              ].map(card => (
                <button
                  key={card.id}
                  onClick={() => setActiveSection(card.id)}
                  className="text-left p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                  style={{ borderColor: '#F0E0C8' }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: '#FBF0DC' }}>
                    {card.emoji}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>{card.title}</h3>
                  <p className="text-sm mb-4" style={{ color: '#7A5C3A' }}>{card.desc}</p>
                  <div className="flex items-center gap-1 font-semibold text-sm" style={{ color: '#D4881E', fontFamily: 'Montserrat' }}>
                    Читать <Icon name="ArrowRight" size={16} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Stats strip */}
          <section style={{ backgroundColor: '#D4881E' }} className="py-10 mt-4">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { num: '15+', label: 'лет живут кошки' },
                  { num: '3×', label: 'чистятся кошки в день' },
                  { num: '340', label: 'запахов различает собака' },
                  { num: '400+', label: 'пород собак в мире' },
                ].map((f, i) => (
                  <div key={i} className="text-white">
                    <div className="font-extrabold text-4xl" style={{ fontFamily: 'Montserrat' }}>{f.num}</div>
                    <div className="text-sm mt-1" style={{ color: '#FFE5B4' }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ======== CATS ======== */}
      {activeSection === 'cats' && (
        <div>
          <section style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #F5EDD8 100%)' }} className="py-14">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                  style={{ backgroundColor: '#FBF0DC', color: '#D4881E', fontFamily: 'Montserrat' }}>
                  🐱 Раздел о кошках
                </div>
                <h1 className="font-extrabold mb-4" style={{ fontFamily: 'Montserrat', fontSize: '2.5rem', color: '#3D2B1F' }}>
                  Всё о <span style={{ color: '#D4881E' }}>кошках</span>
                </h1>
                <p className="text-lg" style={{ color: '#7A5C3A' }}>
                  Кошки — независимые, загадочные и нежные создания. Узнайте, как правильно за ними ухаживать и что им нужно для счастья.
                </p>
              </div>
              <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <img src={catImg} alt="Кошка" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="font-extrabold text-2xl mb-6" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Популярные породы</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CAT_BREEDS.map((breed, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: '#F0E0C8' }}>
                  <div className="text-4xl mb-3">{breed.icon}</div>
                  <div className="font-bold text-base mb-1" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>{breed.name}</div>
                  <div className="text-xs" style={{ color: '#7A5C3A' }}>{breed.trait}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ backgroundColor: '#F5EDD8' }} className="py-10">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="font-extrabold text-2xl mb-8" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Правила ухода</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAT_CARE.map((tip, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border flex gap-4 hover:shadow-md transition-all duration-200"
                    style={{ borderColor: '#F0E0C8' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#FBF0DC' }}>
                      <Icon name={tip.icon} size={22} fallback="Star" style={{ color: '#D4881E' }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>{tip.title}</div>
                      <div className="text-sm" style={{ color: '#7A5C3A' }}>{tip.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="font-extrabold text-2xl mb-6" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Интересные факты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { emoji: '😴', fact: 'Кошки спят от 12 до 16 часов в сутки — это нормально и полезно для их здоровья.' },
                { emoji: '👃', fact: 'Нос кошки уникален, как отпечаток пальца у человека — у каждой свой узор.' },
                { emoji: '🎵', fact: 'Мурлыканье кошки (25-50 Гц) ускоряет заживление костей и снижает стресс.' },
                { emoji: '🌙', fact: 'Кошки видят в темноте в 6 раз лучше людей благодаря особому слою в глазу.' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border flex gap-4 items-start" style={{ borderColor: '#F0E0C8' }}>
                  <span className="text-3xl">{f.emoji}</span>
                  <p className="text-sm" style={{ color: '#7A5C3A' }}>{f.fact}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ======== DOGS ======== */}
      {activeSection === 'dogs' && (
        <div>
          <section style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #F5EDD8 100%)' }} className="py-14">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                  style={{ backgroundColor: '#FBF0DC', color: '#D4881E', fontFamily: 'Montserrat' }}>
                  🐶 Раздел о собаках
                </div>
                <h1 className="font-extrabold mb-4" style={{ fontFamily: 'Montserrat', fontSize: '2.5rem', color: '#3D2B1F' }}>
                  Всё о <span style={{ color: '#D4881E' }}>собаках</span>
                </h1>
                <p className="text-lg" style={{ color: '#7A5C3A' }}>
                  Собаки — лучшие друзья человека. Они преданны, игривы и всегда рады хозяину. Узнайте, как сделать жизнь питомца счастливой.
                </p>
              </div>
              <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <img src={dogImg} alt="Собака" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="font-extrabold text-2xl mb-6" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Популярные породы</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DOG_BREEDS.map((breed, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: '#F0E0C8' }}>
                  <div className="text-4xl mb-3">{breed.icon}</div>
                  <div className="font-bold text-base mb-1" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>{breed.name}</div>
                  <div className="text-xs" style={{ color: '#7A5C3A' }}>{breed.trait}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ backgroundColor: '#F5EDD8' }} className="py-10">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="font-extrabold text-2xl mb-8" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Правила ухода</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DOG_CARE.map((tip, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border flex gap-4 hover:shadow-md transition-all duration-200"
                    style={{ borderColor: '#F0E0C8' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#FBF0DC' }}>
                      <Icon name={tip.icon} size={22} fallback="Star" style={{ color: '#D4881E' }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>{tip.title}</div>
                      <div className="text-sm" style={{ color: '#7A5C3A' }}>{tip.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="font-extrabold text-2xl mb-6" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Интересные факты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { emoji: '👃', fact: 'Обоняние собаки в 10 000 раз острее человеческого. Они могут учуять болезнь.' },
                { emoji: '💤', fact: 'Собаки видят сны — во сне их лапки подёргиваются, как будто они бегут.' },
                { emoji: '❤️', fact: 'Сердечный ритм хозяина и собаки синхронизируется во время общения.' },
                { emoji: '🎓', fact: 'Умные собаки могут выучить более 1000 слов — примерно как 2-летний ребёнок.' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border flex gap-4 items-start" style={{ borderColor: '#F0E0C8' }}>
                  <span className="text-3xl">{f.emoji}</span>
                  <p className="text-sm" style={{ color: '#7A5C3A' }}>{f.fact}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ======== WARNING ======== */}
      {activeSection === 'warning' && (
        <div>
          <section style={{ background: 'linear-gradient(135deg, #FFF5F5 0%, #FDF6EC 100%)' }} className="py-14">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                style={{ backgroundColor: '#FFE8E8', color: '#E53E3E', fontFamily: 'Montserrat' }}>
                <Icon name="AlertTriangle" size={16} /> Тревожные знаки
              </div>
              <h1 className="font-extrabold mb-4" style={{ fontFamily: 'Montserrat', fontSize: '2.5rem', color: '#3D2B1F' }}>
                Когда питомцу нужна <span style={{ color: '#E53E3E' }}>помощь</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg" style={{ color: '#7A5C3A' }}>
                Животные не могут сказать, что им плохо. Но их тело даёт сигналы — важно уметь их распознать вовремя.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
            {WARNING_SIGNS.map((group, gi) => (
              <div key={gi} className={`rounded-2xl border-2 p-6 ${group.color}`}>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="text-white px-4 py-1 rounded-full font-bold text-sm"
                    style={{ fontFamily: 'Montserrat', backgroundColor: group.badgeColor }}>
                    {group.badgeText}
                  </span>
                  <Icon name={group.icon} size={20} fallback="AlertCircle" style={{ color: group.iconColor }} />
                  <span className="font-semibold text-sm" style={{ color: '#7A5C3A', fontFamily: 'Montserrat' }}>
                    {group.hint}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.signs.map((sign, si) => (
                    <div key={si} className="flex items-start gap-3 bg-white/70 rounded-xl p-3">
                      <span className="text-lg mt-0.5 flex-shrink-0">{sign.animal}</span>
                      <span className="text-sm" style={{ color: '#3D2B1F' }}>{sign.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-6 flex gap-4 items-start border-2"
              style={{ backgroundColor: '#FBF0DC', borderColor: '#D4881E' }}>
              <span className="text-3xl flex-shrink-0">💡</span>
              <div>
                <div className="font-bold mb-1" style={{ fontFamily: 'Montserrat', color: '#3D2B1F' }}>Совет</div>
                <p className="text-sm" style={{ color: '#7A5C3A' }}>
                  Не ждите, когда симптомы пройдут сами. Животные скрывают боль инстинктивно — к тому моменту, когда питомец явно показывает, что ему плохо, ситуация может быть уже серьёзной. Лучше лишний раз показаться специалисту.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#3D2B1F' }} className="py-8 mt-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <span className="text-2xl">🐾</span>
            <span className="font-extrabold text-xl" style={{ fontFamily: 'Montserrat', color: '#D4881E' }}>ПетКер</span>
          </div>
          <p className="text-sm mb-4" style={{ color: '#A08060' }}>Сделано с ❤️ для заботливых хозяев</p>
          <div className="flex justify-center flex-wrap gap-4">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className="text-sm hover:underline transition-colors"
                style={{ color: '#C09070', background: 'none', border: 'none', cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}