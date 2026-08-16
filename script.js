const tileOptions = [
  { label: "120×60 см", area: 0.72 },
  { label: "60×60 см", area: 0.36 },
  { label: "30×60 см", area: 0.18 },
];

const elements = {
  tile: {
    sizeButtons: document.querySelectorAll('#tileSizeButtons .size-button'),
    modeButtons: document.querySelectorAll('#tileModeButtons .size-button'),
    areaValue: document.getElementById('tileAreaValue'),
    floorLength: document.getElementById('tileLength'),
    floorWidth: document.getElementById('tileWidth'),
    price: document.getElementById('tilePrice'),
    wall1Width: document.getElementById('tileWall1Width'),
    wall2Width: document.getElementById('tileWall2Width'),
    wallHeight: document.getElementById('tileWallHeight'),
    priceWalls: document.getElementById('tilePriceWalls'),
    calculate: document.getElementById('tileCalculate'),
    clear: document.getElementById('tileClear'),
    error: document.getElementById('tileError'),
    resultCard: document.getElementById('tileResultCard'),
    resultMode: document.getElementById('tileResultMode'),
    resultSize: document.getElementById('tileResultSize'),
    resultArea: document.getElementById('tileResultArea'),
    resultAreaBuffer: document.getElementById('tileResultAreaBuffer'),
    resultCount: document.getElementById('tileResultCount'),
    resultTotal: document.getElementById('tileResultTotal'),
    copy: document.getElementById('tileCopy'),
    copyFeedback: document.getElementById('tileCopyFeedback'),
    form: document.getElementById('tileForm'),
    floorFields: document.querySelector('.floor-fields'),
    wallFields: document.querySelector('.wall-fields'),
  },
  linoleum: {
    widthButtons: document.querySelectorAll('#linoleumWidthButtons .size-button'),
    length: document.getElementById('linoleumLength'),
    price: document.getElementById('linoleumPrice'),
    calculate: document.getElementById('linoleumCalculate'),
    clear: document.getElementById('linoleumClear'),
    error: document.getElementById('linoleumError'),
    resultCard: document.getElementById('linoleumResultCard'),
    resultWidth: document.getElementById('linoleumResultWidth'),
    resultLength: document.getElementById('linoleumResultLength'),
    resultArea: document.getElementById('linoleumResultArea'),
    resultPrice: document.getElementById('linoleumResultPrice'),
    resultTotal: document.getElementById('linoleumResultTotal'),
    copy: document.getElementById('linoleumCopy'),
    copyFeedback: document.getElementById('linoleumCopyFeedback'),
    form: document.getElementById('linoleumForm'),
  },
  laminate: {
    packArea: document.getElementById('laminatePackArea'),
    length: document.getElementById('laminateLength'),
    width: document.getElementById('laminateWidth'),
    price: document.getElementById('laminatePrice'),
    calculate: document.getElementById('laminateCalculate'),
    clear: document.getElementById('laminateClear'),
    error: document.getElementById('laminateError'),
    resultCard: document.getElementById('laminateResultCard'),
    resultPackArea: document.getElementById('laminateResultPackArea'),
    resultArea: document.getElementById('laminateResultArea'),
    resultPacks: document.getElementById('laminateResultPacks'),
    resultTotal: document.getElementById('laminateResultTotal'),
    copy: document.getElementById('laminateCopy'),
    copyFeedback: document.getElementById('laminateCopyFeedback'),
    form: document.getElementById('laminateForm'),
  },
  marble: {
    wallLength: document.getElementById('marbleWallLength'),
    wallWidth: document.getElementById('marbleWallWidth'),
    wallHeight: document.getElementById('marbleWallHeight'),
    sheetPrice: document.getElementById('marbleSheetPrice'),
    gluePerSheet: document.getElementById('marbleGluePerSheet'),
    calculate: document.getElementById('marbleCalculate'),
    clear: document.getElementById('marbleClear'),
    error: document.getElementById('marbleError'),
    resultCard: document.getElementById('marbleResultCard'),
    resultWallArea: document.getElementById('marbleResultWallArea'),
    resultSheetSize: document.getElementById('marbleResultSheetSize'),
    resultSheets: document.getElementById('marbleResultSheets'),
    resultGlue: document.getElementById('marbleResultGlue'),
    resultMaterialCost: document.getElementById('marbleResultMaterialCost'),
    resultTotal: document.getElementById('marbleResultTotal'),
    copy: document.getElementById('marbleCopy'),
    copyFeedback: document.getElementById('marbleCopyFeedback'),
    form: document.getElementById('marbleForm'),
  },
  bamboo: {
    wallLength: document.getElementById('bambooWallLength'),
    wallWidth: document.getElementById('bambooWallWidth'),
    wallHeight: document.getElementById('bambooWallHeight'),
    sheetPrice: document.getElementById('bambooSheetPrice'),
    gluePerSheet: document.getElementById('bambooGluePerSheet'),
    calculate: document.getElementById('bambooCalculate'),
    clear: document.getElementById('bambooClear'),
    error: document.getElementById('bambooError'),
    resultCard: document.getElementById('bambooResultCard'),
    resultWallArea: document.getElementById('bambooResultWallArea'),
    resultSheetSize: document.getElementById('bambooResultSheetSize'),
    resultSheets: document.getElementById('bambooResultSheets'),
    resultGlue: document.getElementById('bambooResultGlue'),
    resultMaterialCost: document.getElementById('bambooResultMaterialCost'),
    resultTotal: document.getElementById('bambooResultTotal'),
    copy: document.getElementById('bambooCopy'),
    copyFeedback: document.getElementById('bambooCopyFeedback'),
    form: document.getElementById('bambooForm'),
  },
  wallpaper: {
    length: document.getElementById('wallpaperLength'),
    width: document.getElementById('wallpaperWidth'),
    height: document.getElementById('wallpaperHeight'),
    doorCount: document.getElementById('wallpaperDoorCount'),
    windowCount: document.getElementById('wallpaperWindowCount'),
    price: document.getElementById('wallpaperPrice'),
    reserve: document.getElementById('wallpaperReserve'),
    calculate: document.getElementById('wallpaperCalculate'),
    clear: document.getElementById('wallpaperClear'),
    error: document.getElementById('wallpaperError'),
    resultCard: document.getElementById('wallpaperResultCard'),
    resultWallArea: document.getElementById('wallpaperResultWallArea'),
    resultUsableArea: document.getElementById('wallpaperResultUsableArea'),
    resultRolls: document.getElementById('wallpaperResultRolls'),
    resultReserve: document.getElementById('wallpaperResultReserve'),
    resultTotal: document.getElementById('wallpaperResultTotal'),
    copy: document.getElementById('wallpaperCopy'),
    copyFeedback: document.getElementById('wallpaperCopyFeedback'),
    form: document.getElementById('wallpaperForm'),
  },
};

let selectedTile = tileOptions[0];
let selectedTileMode = 'floor';
let selectedLinoleumWidth = 2.5;

function applyTheme(theme) {
  const selectedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', selectedTheme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.textContent = selectedTheme === 'dark' ? '☀️ Светлая' : '🌙 Темная';
    toggle.setAttribute('aria-label', selectedTheme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему');
  }
  localStorage.setItem('tabys-theme', selectedTheme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('tabys-theme');
  const initialTheme = savedTheme || 'dark';
  applyTheme(initialTheme);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
}

function initializeMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('siteNav');
  if (!menuToggle || !siteNav) return;

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle && !siteNav.contains(themeToggle)) {
    siteNav.appendChild(themeToggle);
  }

  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = !siteNav.classList.contains('is-open');
    siteNav.classList.toggle('is-open', isOpen);
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a, .theme-toggle').forEach((item) => {
    item.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu-toggle') && !event.target.closest('.site-nav')) {
      closeMenu();
    }
  });
}

function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatCurrency(value) {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)} ₸`;
}

function getPositiveValue(inputElement, name) {
  const value = parseFloat(inputElement.value);
  if (!inputElement.value.trim()) {
    return `${name} не может быть пустым`;
  }
  if (Number.isNaN(value) || value <= 0) {
    return `Введите корректную ${name.toLowerCase()}`;
  }
  return value;
}

function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = '';
}

function setActiveButton(buttonList, activeButton) {
  buttonList.forEach((button) => button.classList.toggle('active', button === activeButton));
}

function updateTileDisplay() {
  elements.tile.areaValue.textContent = formatNumber(selectedTile.area, 2);
  elements.tile.resultSize.textContent = selectedTile.label;
}

function showCopyFeedback(feedbackElement) {
  feedbackElement.classList.add('visible');
  setTimeout(() => feedbackElement.classList.remove('visible'), 1600);
}

function copyText(text, feedbackElement) {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.writeText(text).then(() => showCopyFeedback(feedbackElement));
}

function initializeTile() {
  if (!elements.tile.form) return;
  updateTileDisplay();
  elements.tile.sizeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const area = parseFloat(button.dataset.area);
      selectedTile = tileOptions.find((option) => option.area === area) || tileOptions[0];
      setActiveButton(elements.tile.sizeButtons, button);
      updateTileDisplay();
    });
  });

  elements.tile.modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedTileMode = button.dataset.mode;
      setActiveButton(elements.tile.modeButtons, button);
      if (selectedTileMode === 'walls') {
        elements.tile.floorFields.classList.add('hidden');
        elements.tile.wallFields.classList.remove('hidden');
      } else {
        elements.tile.wallFields.classList.add('hidden');
        elements.tile.floorFields.classList.remove('hidden');
      }
    });
  });

  elements.tile.calculate.addEventListener('click', () => {
    clearError(elements.tile.error);
    let price = 0;
    let areaRoom = 0;
    let description = 'Пол';

    if (selectedTileMode === 'walls') {
      description = 'Стены';
      const wall1Width = getPositiveValue(elements.tile.wall1Width, 'длину стены 1');
      if (typeof wall1Width === 'string') return showError(elements.tile.error, wall1Width);
      const wall2Width = getPositiveValue(elements.tile.wall2Width, 'длину стены 2');
      if (typeof wall2Width === 'string') return showError(elements.tile.error, wall2Width);
      const wallHeight = getPositiveValue(elements.tile.wallHeight, 'высоту стен');
      if (typeof wallHeight === 'string') return showError(elements.tile.error, wallHeight);
      price = getPositiveValue(elements.tile.priceWalls, 'цену за 1 м²');
      if (typeof price === 'string') return showError(elements.tile.error, price);

      const wallArea = (wall1Width + wall2Width) * 2 * wallHeight;
      areaRoom = wallArea;
    } else {
      const length = getPositiveValue(elements.tile.floorLength, 'длину помещения');
      if (typeof length === 'string') return showError(elements.tile.error, length);
      const width = getPositiveValue(elements.tile.floorWidth, 'ширину помещения');
      if (typeof width === 'string') return showError(elements.tile.error, width);
      price = getPositiveValue(elements.tile.price, 'цену за 1 м²');
      if (typeof price === 'string') return showError(elements.tile.error, price);
      areaRoom = length * width;
    }

    const tileCount = Math.ceil(areaRoom / selectedTile.area);
    const coveredArea = tileCount * selectedTile.area;
    const totalCost = tileCount * selectedTile.area * price;

    elements.tile.resultMode.textContent = description;
    if (elements.tile.resultArea) elements.tile.resultArea.textContent = `${formatNumber(coveredArea, 2)} м²`;
    if (elements.tile.resultAreaBuffer) elements.tile.resultAreaBuffer.textContent = `${formatNumber(areaRoom, 2)} м²`;
    if (elements.tile.resultCount) elements.tile.resultCount.textContent = `${tileCount} шт.`;
    if (elements.tile.resultTotal) elements.tile.resultTotal.textContent = formatCurrency(totalCost);
    elements.tile.resultCard.classList.add('active');
  });

  elements.tile.clear.addEventListener('click', () => {
    elements.tile.form.reset();
    selectedTile = tileOptions[0];
    selectedTileMode = 'floor';
    setActiveButton(elements.tile.modeButtons, elements.tile.modeButtons[0]);
    elements.tile.floorFields.classList.remove('hidden');
    elements.tile.wallFields.classList.add('hidden');
    updateTileDisplay();
    clearError(elements.tile.error);
    elements.tile.resultCard.classList.remove('active');
    elements.tile.resultMode.textContent = 'Пол';
    elements.tile.resultArea.textContent = '0 м²';
    elements.tile.resultCount.textContent = '0 шт.';
    elements.tile.resultTotal.textContent = '0 ₸';
  });

  elements.tile.copy.addEventListener('click', () => {
    const modeText = selectedTileMode === 'walls' ? 'Стены' : 'Пол';
    const priceText = selectedTileMode === 'walls'
      ? `${formatCurrency(parseFloat(elements.tile.priceWalls.value) || 0).replace(' ₸','')} ₸/м²`
      : `${formatCurrency(parseFloat(elements.tile.price.value) || 0).replace(' ₸','')} ₸/м²`;
    const text = `TABYS STROY\n\nРасчет кафеля\nТип расчета: ${modeText}\nРазмер: ${selectedTile.label}\nПлощадь помещения: ${elements.tile.resultArea.textContent}\nКоличество: ${elements.tile.resultCount.textContent}\nОбщая площадь: ${elements.tile.resultAreaBuffer.textContent}\nЦена: ${priceText}\nИтого: ${elements.tile.resultTotal.textContent}`;
    copyText(text, elements.tile.copyFeedback);
  });
}

function initializeLinoleum() {
  if (!elements.linoleum.form) return;
  elements.linoleum.widthButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveButton(elements.linoleum.widthButtons, button);
      selectedLinoleumWidth = parseFloat(button.dataset.width);
    });
  });

  elements.linoleum.calculate.addEventListener('click', () => {
    clearError(elements.linoleum.error);
    const length = getPositiveValue(elements.linoleum.length, 'длину помещения');
    if (typeof length === 'string') return showError(elements.linoleum.error, length);
    const price = getPositiveValue(elements.linoleum.price, 'цену за 1 м²');
    if (typeof price === 'string') return showError(elements.linoleum.error, price);

    const totalLength = length;
    const totalArea = selectedLinoleumWidth * totalLength;
    const totalCost = totalArea * price;

    elements.linoleum.resultWidth.textContent = `${selectedLinoleumWidth} м`;
    elements.linoleum.resultLength.textContent = `${formatNumber(totalLength, 1)} м.п.`;
    elements.linoleum.resultArea.textContent = `${formatNumber(totalArea, 2)} м²`;
    elements.linoleum.resultPrice.textContent = `${formatCurrency(price).replace(' ₸','')} ₸/м²`;
    elements.linoleum.resultTotal.textContent = formatCurrency(totalCost);
    elements.linoleum.resultCard.classList.add('active');
  });

  elements.linoleum.clear.addEventListener('click', () => {
    elements.linoleum.form.reset();
    selectedLinoleumWidth = 2.5;
    setActiveButton(elements.linoleum.widthButtons, elements.linoleum.widthButtons[0]);
    clearError(elements.linoleum.error);
    elements.linoleum.resultCard.classList.remove('active');
    elements.linoleum.resultWidth.textContent = '2.5 м';
    elements.linoleum.resultLength.textContent = '0 м.п.';
    elements.linoleum.resultArea.textContent = '0 м²';
    elements.linoleum.resultPrice.textContent = '0 ₸/м²';
    elements.linoleum.resultTotal.textContent = '0 ₸';
  });

  elements.linoleum.copy.addEventListener('click', () => {
    const text = `TABYS STROY\n\nРасчет линолеума\nШирина рулона: ${selectedLinoleumWidth} м\nНеобходимая длина: ${elements.linoleum.resultLength.textContent}\nПлощадь: ${elements.linoleum.resultArea.textContent}\nЦена: ${elements.linoleum.resultPrice.textContent}\nИтого: ${elements.linoleum.resultTotal.textContent}`;
    copyText(text, elements.linoleum.copyFeedback);
  });
}

function initializeLaminate() {
  if (!elements.laminate.form) return;

  elements.laminate.calculate.addEventListener('click', () => {
    clearError(elements.laminate.error);
    const packArea = getPositiveValue(elements.laminate.packArea, 'площадь одной пачки');
    if (typeof packArea === 'string') return showError(elements.laminate.error, packArea);
    const length = getPositiveValue(elements.laminate.length, 'длину помещения');
    if (typeof length === 'string') return showError(elements.laminate.error, length);
    const width = getPositiveValue(elements.laminate.width, 'ширину помещения');
    if (typeof width === 'string') return showError(elements.laminate.error, width);
    const price = getPositiveValue(elements.laminate.price, 'цену за 1 м²');
    if (typeof price === 'string') return showError(elements.laminate.error, price);

    const roomArea = length * width;
    const packCount = Math.ceil(roomArea / packArea);
    const totalCost = packCount * packArea * price;

    elements.laminate.resultPackArea.textContent = `${formatNumber(packArea, 2)} м²`;
    elements.laminate.resultArea.textContent = `${formatNumber(roomArea, 2)} м²`;
    elements.laminate.resultPacks.textContent = `${packCount} пачек`;
    elements.laminate.resultTotal.textContent = formatCurrency(totalCost);
    elements.laminate.resultCard.classList.add('active');
  });

  elements.laminate.clear.addEventListener('click', () => {
    elements.laminate.form.reset();
    clearError(elements.laminate.error);
    elements.laminate.resultCard.classList.remove('active');
    elements.laminate.resultPackArea.textContent = '0 м²';
    elements.laminate.resultArea.textContent = '0 м²';
    elements.laminate.resultPacks.textContent = '0 пачек';
    elements.laminate.resultTotal.textContent = '0 ₸';
  });

  elements.laminate.copy.addEventListener('click', () => {
    const text = `TABYS STROY\n\nРасчет ламината\nПлощадь одной пачки: ${elements.laminate.resultPackArea.textContent}\nПлощадь комнаты: ${elements.laminate.resultArea.textContent}\nКоличество: ${elements.laminate.resultPacks.textContent}\nИтого: ${elements.laminate.resultTotal.textContent}`;
    copyText(text, elements.laminate.copyFeedback);
  });
}

function initializeMarble() {
  if (!elements.marble.form) return;

  const sheetArea = 1.2 * 2.8;
  const sheetSizeLabel = '1.2 × 2.8 м';
  const sheetAreaEl = document.getElementById('marbleSheetArea');
  if (sheetAreaEl) sheetAreaEl.textContent = `${formatNumber(sheetArea, 2)} м²`;

  elements.marble.calculate.addEventListener('click', () => {
    clearError(elements.marble.error);

    const wallLength = getPositiveValue(elements.marble.wallLength, 'длину стены');
    if (typeof wallLength === 'string') return showError(elements.marble.error, wallLength);
    const wallWidth = getPositiveValue(elements.marble.wallWidth, 'ширину стены');
    if (typeof wallWidth === 'string') return showError(elements.marble.error, wallWidth);
    const wallHeight = getPositiveValue(elements.marble.wallHeight, 'высоту стены');
    if (typeof wallHeight === 'string') return showError(elements.marble.error, wallHeight);
    const sheetPrice = getPositiveValue(elements.marble.sheetPrice, 'цену за 1 лист');
    if (typeof sheetPrice === 'string') return showError(elements.marble.error, sheetPrice);
    const gluePerSheet = getPositiveValue(elements.marble.gluePerSheet, 'клей на 1 лист');
    if (typeof gluePerSheet === 'string') return showError(elements.marble.error, gluePerSheet);

    const wallArea = (wallLength + wallWidth) * 2 * wallHeight;
    const sheetCount = Math.ceil(wallArea / sheetArea);
    const glueTubes = Math.ceil(sheetCount * gluePerSheet);
    const materialCost = sheetCount * sheetPrice;
    const totalCost = materialCost;

    elements.marble.resultWallArea.textContent = `${formatNumber(wallArea, 2)} м²`;
    elements.marble.resultSheetSize.textContent = sheetSizeLabel;
    elements.marble.resultSheets.textContent = `${sheetCount} шт.`;
    elements.marble.resultGlue.textContent = `${glueTubes} тюб.`;
    elements.marble.resultMaterialCost.textContent = formatCurrency(materialCost);
    elements.marble.resultTotal.textContent = formatCurrency(totalCost);
    elements.marble.resultCard.classList.add('active');
  });

  elements.marble.clear.addEventListener('click', () => {
    elements.marble.form.reset();
    elements.marble.gluePerSheet.value = '1.5';
    clearError(elements.marble.error);
    elements.marble.resultCard.classList.remove('active');
    elements.marble.resultWallArea.textContent = '0 м²';
    elements.marble.resultSheetSize.textContent = sheetSizeLabel;
    elements.marble.resultSheets.textContent = '0 шт.';
    elements.marble.resultGlue.textContent = '0 тюб.';
    elements.marble.resultMaterialCost.textContent = '0 ₸';
    elements.marble.resultTotal.textContent = '0 ₸';
  });

  elements.marble.copy.addEventListener('click', () => {
    const text = `TABYS STROY\n\nРасчет гибкого мрамора\nПлощадь стены: ${elements.marble.resultWallArea.textContent}\nРазмер листа: ${elements.marble.resultSheetSize.textContent}\nКоличество листов: ${elements.marble.resultSheets.textContent}\nКлей: ${elements.marble.resultGlue.textContent}\nСтоимость материала: ${elements.marble.resultMaterialCost.textContent}\nОбщая стоимость: ${elements.marble.resultTotal.textContent}`;
    copyText(text, elements.marble.copyFeedback);
  });
}

function initializeBamboo() {
  if (!elements.bamboo.form) return;

  const sheetArea = 1.15 * 2.9;
  const sheetSizeLabel = '1.15 × 2.9 м';
  const sheetAreaEl = document.getElementById('bambooSheetArea');
  if (sheetAreaEl) sheetAreaEl.textContent = `${formatNumber(sheetArea, 2)} м²`;

  elements.bamboo.calculate.addEventListener('click', () => {
    clearError(elements.bamboo.error);

    const wallLength = getPositiveValue(elements.bamboo.wallLength, 'длину стены');
    if (typeof wallLength === 'string') return showError(elements.bamboo.error, wallLength);
    const wallWidth = getPositiveValue(elements.bamboo.wallWidth, 'ширину стены');
    if (typeof wallWidth === 'string') return showError(elements.bamboo.error, wallWidth);
    const wallHeight = getPositiveValue(elements.bamboo.wallHeight, 'высоту стены');
    if (typeof wallHeight === 'string') return showError(elements.bamboo.error, wallHeight);
    const sheetPrice = getPositiveValue(elements.bamboo.sheetPrice, 'цену за 1 лист');
    if (typeof sheetPrice === 'string') return showError(elements.bamboo.error, sheetPrice);
    const gluePerSheet = getPositiveValue(elements.bamboo.gluePerSheet, 'клей на 1 лист');
    if (typeof gluePerSheet === 'string') return showError(elements.bamboo.error, gluePerSheet);

    const wallArea = (wallLength + wallWidth) * 2 * wallHeight;
    const sheetCount = Math.ceil(wallArea / sheetArea);
    const glueTubes = Math.ceil(sheetCount * gluePerSheet);
    const materialCost = sheetCount * sheetPrice;
    const totalCost = materialCost;

    elements.bamboo.resultWallArea.textContent = `${formatNumber(wallArea, 2)} м²`;
    elements.bamboo.resultSheetSize.textContent = sheetSizeLabel;
    elements.bamboo.resultSheets.textContent = `${sheetCount} шт.`;
    elements.bamboo.resultGlue.textContent = `${glueTubes} тюб.`;
    elements.bamboo.resultMaterialCost.textContent = formatCurrency(materialCost);
    elements.bamboo.resultTotal.textContent = formatCurrency(totalCost);
    elements.bamboo.resultCard.classList.add('active');
  });

  elements.bamboo.clear.addEventListener('click', () => {
    elements.bamboo.form.reset();
    elements.bamboo.gluePerSheet.value = '1.5';
    clearError(elements.bamboo.error);
    elements.bamboo.resultCard.classList.remove('active');
    elements.bamboo.resultWallArea.textContent = '0 м²';
    elements.bamboo.resultSheetSize.textContent = sheetSizeLabel;
    elements.bamboo.resultSheets.textContent = '0 шт.';
    elements.bamboo.resultGlue.textContent = '0 тюб.';
    elements.bamboo.resultMaterialCost.textContent = '0 ₸';
    elements.bamboo.resultTotal.textContent = '0 ₸';
  });

  elements.bamboo.copy.addEventListener('click', () => {
    const text = `TABYS STROY\n\nРасчет бамбук панелей\nПлощадь стены: ${elements.bamboo.resultWallArea.textContent}\nРазмер листа: ${elements.bamboo.resultSheetSize.textContent}\nКоличество листов: ${elements.bamboo.resultSheets.textContent}\nКлей: ${elements.bamboo.resultGlue.textContent}\nСтоимость материала: ${elements.bamboo.resultMaterialCost.textContent}\nОбщая стоимость: ${elements.bamboo.resultTotal.textContent}`;
    copyText(text, elements.bamboo.copyFeedback);
  });
}

function initializeWallpaper() {
  if (!elements.wallpaper.form) return;

  const rollArea = 1 * 10;
  const rollSizeLabel = '1 × 10 м';
  const rollAreaEl = document.getElementById('wallpaperRollArea');
  if (rollAreaEl) rollAreaEl.textContent = `${formatNumber(rollArea, 2)} м²`;

  elements.wallpaper.calculate.addEventListener('click', () => {
    clearError(elements.wallpaper.error);

    const length = getPositiveValue(elements.wallpaper.length, 'длину комнаты');
    if (typeof length === 'string') return showError(elements.wallpaper.error, length);
    const width = getPositiveValue(elements.wallpaper.width, 'ширину комнаты');
    if (typeof width === 'string') return showError(elements.wallpaper.error, width);
    const height = getPositiveValue(elements.wallpaper.height, 'высоту стен');
    if (typeof height === 'string') return showError(elements.wallpaper.error, height);
    const doorCount = getPositiveValue(elements.wallpaper.doorCount, 'количество дверей');
    if (typeof doorCount === 'string') return showError(elements.wallpaper.error, doorCount);
    const windowCount = getPositiveValue(elements.wallpaper.windowCount, 'количество окон');
    if (typeof windowCount === 'string') return showError(elements.wallpaper.error, windowCount);
    const price = getPositiveValue(elements.wallpaper.price, 'цену за 1 рулон');
    if (typeof price === 'string') return showError(elements.wallpaper.error, price);
    const reservePercent = getPositiveValue(elements.wallpaper.reserve, 'запас');
    if (typeof reservePercent === 'string') return showError(elements.wallpaper.error, reservePercent);

    const standardDoorArea = 0.7 * 2.0;
    const standardWindowArea = 1.5 * 1.4;
    const doorArea = doorCount * standardDoorArea;
    const windowArea = windowCount * standardWindowArea;

    const wallArea = (length + width) * 2 * height;
    const usableWallArea = Math.max(0, wallArea - doorArea - windowArea);
    const baseRolls = Math.ceil(usableWallArea / rollArea);
    const reserveRolls = Math.ceil(baseRolls * (reservePercent / 100));
    const totalRolls = baseRolls + reserveRolls;
    const totalCost = totalRolls * price;

    elements.wallpaper.resultWallArea.textContent = `${formatNumber(wallArea, 2)} м²`;
    elements.wallpaper.resultUsableArea.textContent = `${formatNumber(usableWallArea, 2)} м²`;
    elements.wallpaper.resultRolls.textContent = `${totalRolls} шт.`;
    elements.wallpaper.resultReserve.textContent = `${reserveRolls} шт.`;
    elements.wallpaper.resultTotal.textContent = formatCurrency(totalCost);
    elements.wallpaper.resultCard.classList.add('active');
  });

  elements.wallpaper.clear.addEventListener('click', () => {
    elements.wallpaper.form.reset();
    elements.wallpaper.reserve.value = '10';
    clearError(elements.wallpaper.error);
    elements.wallpaper.resultCard.classList.remove('active');
    elements.wallpaper.resultWallArea.textContent = '0 м²';
    elements.wallpaper.resultUsableArea.textContent = '0 м²';
    elements.wallpaper.resultRolls.textContent = '0 шт.';
    elements.wallpaper.resultReserve.textContent = '0 шт.';
    elements.wallpaper.resultTotal.textContent = '0 ₸';
  });

  elements.wallpaper.copy.addEventListener('click', () => {
    const text = `TABYS STROY\n\nРасчет обоев\nРазмер рулона: ${rollSizeLabel}\nПлощадь стен: ${elements.wallpaper.resultWallArea.textContent}\nПлощадь после вычета: ${elements.wallpaper.resultUsableArea.textContent}\nКоличество рулонов: ${elements.wallpaper.resultRolls.textContent}\nЗапас: ${elements.wallpaper.resultReserve.textContent}\nИтого: ${elements.wallpaper.resultTotal.textContent}`;
    copyText(text, elements.wallpaper.copyFeedback);
  });
}

initializeTheme();
initializeMenu();
initializeTile();
initializeLinoleum();
initializeLaminate();
initializeMarble();
initializeBamboo();
initializeWallpaper();
