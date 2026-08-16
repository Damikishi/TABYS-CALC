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

initializeTheme();
initializeTile();
initializeLinoleum();
initializeLaminate();
