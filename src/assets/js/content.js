// Managed fork: hide AI Mode / AI Overviews unconditionally.
// There is intentionally no chrome.storage read here and no UI anywhere in
// this extension that can toggle these values. That is the whole point of
// this fork — see the org's internal notes for why.
const pathname = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);

const STYLE_ID = 'hide-google-ai-style';
const AI_MODE_SELECTORS = ['.olrp5b', '[jscontroller=Elkdbc]', 'button.plR5qb'];
const AI_OVERVIEW_SELECTORS = ['.Wm5I1e', '.related-question-pair:has(.XTvndd)'];
const AI_OVERVIEW_BOX_SELECTOR = '.hdzaWe';

const createHideStyle = () => {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    (document.head || document.documentElement).appendChild(style);
  }
  return style;
};

const applyHideStyle = () => {
  const rules = [
    `${AI_MODE_SELECTORS.join(', ')} { display: none !important; }`,
    `${[...AI_OVERVIEW_SELECTORS, AI_OVERVIEW_BOX_SELECTOR].join(', ')} { display: none !important; }`,
    `${AI_OVERVIEW_BOX_SELECTOR} { visibility: hidden !important; height: 0 !important; }`,
  ];
  createHideStyle().textContent = rules.join('\n');
};

const setDisplayNone = (selectors) => {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
  });
};

const hideAiModeElements = () => setDisplayNone(AI_MODE_SELECTORS);

const hideAiOverviewElements = () => {
  setDisplayNone([...AI_OVERVIEW_SELECTORS, AI_OVERVIEW_BOX_SELECTOR]);
  document.querySelectorAll(AI_OVERVIEW_BOX_SELECTOR).forEach(el => {
    el.style.visibility = 'hidden';
    el.style.height = '0';
  });
};

const applySearchPageHides = () => {
  hideAiModeElements();
  hideAiOverviewElements();
};

const applyHomepageHides = () => {
  const btn = document.querySelector('.plR5qb');
  if (btn) btn.style.display = 'none';
  const containerElement = document.querySelector('.dRYYxd');
  if (containerElement) {
    containerElement.style.setProperty('background', 'none');
  }

  document.querySelectorAll('.UbbAWe').forEach(el => {
    el.removeAttribute('aria-label');
    el.style.pointerEvents = 'none';
    el.style.cursor = 'default';
    ['mouseenter', 'mouseover', 'mousemove'].forEach(evt => el.addEventListener(evt, () => el.style.background = 'transparent'));
  });

  const path = document.querySelector('.UbbAWe svg path');
  if (path) {
    path.setAttribute('d', 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56Z M380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z');
  }
};

const observe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document, { childList: true, subtree: true });
  return observer;
};

const initialize = () => {
  applyHideStyle();

  if (pathname === '/search') {
    applySearchPageHides();
    observe(applySearchPageHides);
  }

  if ((pathname === '/' || pathname === '/webhp') && (!searchParams.has('q') || searchParams.has('zx'))) {
    applyHomepageHides();
    observe(applyHomepageHides);
  }
};

initialize();
