const work = [
  {
    "title": "Брендинг",
    "groups": [
      {
        "title": "Айдентика и брендбуки",
        "images": []
      },
      {
        "title": "Логотипы",
        "images": []
      }
    ]
  },
  {
    "title": "Оформление соцсетей",
    "groups": [
      {
        "title": "Подборка работ",
        "images": []
      }
    ]
  },
  {
    "title": "Презентации",
    "groups": [{ "title": "Подборка проектов", "images": [] }]
  },
  {
    "title": "Сайты",
    "groups": [{ "title": "Подборка проектов", "images": [] }]
  },
  {
    "title": "Полиграфия",
    "groups": [
      {
        "title": "Бейджи",
        "images": []
      },
      {
        "title": "Печатные материалы",
        "images": []
      }
    ]
  },
  {
    "title": "Плакаты и печатная графика",
    "groups": [
      {
        "title": "Плакаты и обложки",
        "images": []
      },
      {
        "title": "Наружная реклама",
        "images": []
      }
    ]
  },
  {
    "title": "Инфографика для маркетплейсов",
    "groups": [
      {
        "title": "Техника",
        "images": []
      },
      {
        "title": "Одежда",
        "images": []
      },
      {
        "title": "Товары для туризма",
        "images": []
      }
    ]
  }
];
const reviews = [
  [
    "Версаль Буонаротти",
    "Все хорошо и все красиво, 3 визуала быстро и оперативно в оговоренные заранее сроки\nЕсть навык с типовыми проектами , может предложить решения основываясь на своем опыте 👍🏻\nРекомендую к работе/сотрудничеству"
  ],
  [
    "Денис Назаренко",
    "Ну какова красота!! до этого над моими пожеланиями работали 3 разных специалиста , но вот только сейчас , я получил что хотел! спасибо, работаем дальше! есть куча проектов впереди, везде нужен дизайн"
  ],
  [
    "Жанна Ширяева",
    "Даниил лучший👍 в своём деле. Искала того, кто мне оформит сообщество и я нашла🤩 очень быстро, красиво и главное необычно (не как у всех) всё оформил. Я ему благодарна, буду дальше с ним сотрудничать. Советую и остальным обращаться к Даниилу-вы останетесь довольны.😊"
  ],
  [
    "Иван Котов",
    "К Данилу обращаюсь не в первый раз и всегда все на высоком уровне!\nРеспект и уважение 🤝"
  ],
  [
    "Алия К",
    "Даниилу большое СПАСИБО🙏. Работу свою делает качественно и быстро, не как у всех. С ним очень комфортно сотрудничать, чувствует клиента, всегда на связи, подскажет как правильно и даст направление если есть сомнение…Однозначно рекомендую и буду рекомендовать всем. Планируем в дальнейшем сотрудничество только с Даниилом🤝"
  ],
  [
    "Женя Фабрина",
    "Очень хороший и ответственный парень, однозначно будем рассматривать на долгосрочную "
  ],
  [
    "Алина Стеблинская",
    "Обращалась к Даниилу не один раз. А это значит, что человек выполняет свою работу качественно и в срок. Всегда на связи и в контакте со мной, предлагает свои идеи и согласовывает."
  ],
  [
    "Ксения Аксенова",
    "Даниил, качественно выполняет свою работу. Все сроки соблюдает. Приятно работать."
  ],
  [
    "Тимофей Хабаров",
    "Даниил отлично делает свою работу.\nРаботает быстро и на мой взгляд достаточно хорошо.\nРекомендую 👌"
  ]
];
const reviewsUrl = 'https://vk.ru/reviews-218479371';

const dialog = document.querySelector('#gallery');
const content = document.querySelector('#gallery-content');
const heading = document.querySelector('#gallery-title');
let activeCategory;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function button(label, action) {
  const item = element('button', '', label);
  item.type = 'button';
  item.addEventListener('click', action);
  return item;
}
function image(src, alt) {
  const item = element('img');
  item.src = src;
  item.alt = alt;
  item.loading = 'lazy';
  return item;
}
function tile(title, cover, action, isProjectCollection) {
  const item = button('', action);
  item.className = 'tile';
  item.setAttribute('aria-label', title);
  const art = cover ? image(cover, '') : element('span', 'tile-art');
  const label = element('span', 'tile-label', title);
  const media = element('span', 'tile-media');
  media.append(art);
  if (isProjectCollection && !cover) media.append(element('span', 'tile-caption', 'Подборка проектов'));
  item.append(media, label);
  return item;
}
function showDialog(title) {
  heading.textContent = title;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector('#close').focus();
}
function showCategory(category) {
  activeCategory = category;
  content.replaceChildren();
  dialog.classList.toggle('gallery-compact', category.title === 'Оформление соцсетей');
  showDialog(category.title);
  const groups = category.groups;
  if (!groups.length) {
    content.append(element('p', '', 'Работы в этой подборке появятся позже.'));
    return;
  }
  const slotsByCategory = [[3, 4], [2], [1], [1], [2, 4], [4, 3], [10, 6, 2]];
  const slots = slotsByCategory[work.indexOf(category)];
  for (const [groupIndex, group] of groups.entries()) {
    const section = element('section', 'gallery-group');
    if (group.title) section.append(element('h3', '', group.title));
    const grid = element('div', 'thumbs');
    group.images.forEach((src, i) => {
      const thumb = button('', () => showImage(group.images, i, category.title));
      thumb.setAttribute('aria-label', 'Открыть работу ' + (i + 1));
      thumb.append(image(src, 'Работа ' + (i + 1)));
      grid.append(thumb);
    });
    if (!group.images.length) {
      for (let i = 0; i < slots[groupIndex]; i++) {
        const placeholder = element('span', 'gallery-placeholder');
        placeholder.setAttribute('aria-hidden', 'true');
        grid.append(placeholder);
      }
    }
    section.append(grid);
    content.append(section);
  }
}
function showImage(images, index, title) {
  showDialog(title);
  const viewer = element('div', 'viewer');
  const controls = element('div', 'viewer-controls');
  const actions = element('div', 'viewer-actions');
  const previous = button('←', () => showImage(images, index - 1, title));
  const next = button('→', () => showImage(images, index + 1, title));
  previous.setAttribute('aria-label', 'Предыдущее изображение');
  next.setAttribute('aria-label', 'Следующее изображение');
  previous.disabled = index === 0;
  next.disabled = index === images.length - 1;
  const full = button('На весь экран', async () => {
    try {
      if (document.fullscreenElement === dialog) await document.exitFullscreen();
      else await dialog.requestFullscreen();
    } catch {
      window.open(images[index], '_blank', 'noopener,noreferrer');
    }
  });
  actions.append(full);
  if (activeCategory) actions.append(button('К подборке', () => showCategory(activeCategory)));
  controls.append(previous, element('span', '', (index + 1) + ' / ' + images.length), next);
  viewer.append(image(images[index], title + ' — изображение ' + (index + 1)), controls, actions);
  content.replaceChildren(viewer);
}
work.forEach((category, index) => {
  const grid = document.querySelector(index < 4 ? '#main-work' : '#extra-work');
  grid.append(tile(category.title, category.cover || category.groups.flatMap(group => group.images)[0], () => showCategory(category), index === 2 || index === 3));
});
const reviewList = document.querySelector('#review-list');
const reviewViewport = matchMedia('(max-width: 650px)');
let reviewsExpanded = false;
const reviewCards = reviews.map(([name, body]) => {
  const card = element('article', 'review-card');
  const link = element('a', 'review-link', 'Все отзывы во ВКонтакте ↗');
  link.href = reviewsUrl;
  card.append(element('h3', '', name), element('p', '', body), link);
  reviewList.append(card);
  return card;
});
const reviewToggle = button('', () => {
  reviewsExpanded = !reviewsExpanded;
  renderReviews();
  if (!reviewsExpanded) reviewToggle.scrollIntoView({ block: 'nearest' });
});
reviewToggle.className = 'review-toggle';
reviewToggle.setAttribute('aria-controls', reviewList.id);
reviewList.after(reviewToggle);

function renderReviews() {
  const limit = reviewViewport.matches ? 2 : 3;
  reviewCards.forEach((card, index) => {
    card.hidden = !reviewsExpanded && index >= limit;
  });
  reviewToggle.textContent = reviewsExpanded ? 'Свернуть отзывы ↑' : 'Читать все отзывы ↓';
  reviewToggle.setAttribute('aria-expanded', String(reviewsExpanded));
}

reviewViewport.addEventListener('change', renderReviews);
renderReviews();

document.querySelector('#close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
  activeCategory = null;
});

const mobileMenu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const mobileViewport = matchMedia('(max-width: 650px)');
const menuPanel = mobileMenu.querySelector('.menu-panel');
menuPanel.append(document.querySelector('footer .socials').cloneNode(true));

menuToggle.addEventListener('click', () => mobileMenu.showModal());
mobileMenu.querySelector('button').addEventListener('click', () => mobileMenu.close());
mobileMenu.addEventListener('click', event => {
  if (event.target === mobileMenu && event.clientX < mobileMenu.getBoundingClientRect().left) {
    mobileMenu.close();
  }
  if (event.target.closest('a')) mobileMenu.close();
});
mobileViewport.addEventListener('change', event => {
  if (!event.matches && mobileMenu.open) mobileMenu.close();
});
menuToggle.hidden = false;

const siteHeader = document.querySelector('.site-header');

function updateHeaderColor() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 0);
}

window.addEventListener('scroll', updateHeaderColor, { passive: true });
window.addEventListener('pageshow', updateHeaderColor);
updateHeaderColor();
