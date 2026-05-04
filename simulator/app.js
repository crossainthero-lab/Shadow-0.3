const TOKENS = [
  { id: 'solana', symbol: 'SOL', name: 'Solana', logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', type: 'major' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', type: 'major' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', type: 'major' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', logoUrl: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png', type: 'major' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', logoUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', type: 'major' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', logoUrl: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', type: 'major' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', logoUrl: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', type: 'major' },
  { id: 'sui', symbol: 'SUI', name: 'Sui', logoUrl: 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg', type: 'major' }
];

const FIAT_ASSETS = [
  { id: 'fiat-usd', symbol: 'USD', name: 'US Dollar', type: 'fiat' },
  { id: 'fiat-aud', symbol: 'AUD', name: 'Australian Dollar', type: 'fiat' }
];

const MEME_TOKENS = [
  { id: 'moon-worm', symbol: 'WORM', name: 'Moon Worm', theme: ['#d7ff64', '#7df1c7'], volatility: 0.09 },
  { id: 'ghost-peel', symbol: 'PEEL', name: 'Ghost Peel', theme: ['#ffcf7d', '#ff8f52'], volatility: 0.11 },
  { id: 'void-pup', symbol: 'PUP', name: 'Void Pup', theme: ['#85e5ff', '#7df1c7'], volatility: 0.13 },
  { id: 'shadow-frog', symbol: 'FROG', name: 'Shadow Frog', theme: ['#b8ff8a', '#59d68a'], volatility: 0.1 },
  { id: 'neon-rug', symbol: 'RUG', name: 'Neon Rug', theme: ['#ff9bd1', '#ff8f52'], volatility: 0.14 },
  { id: 'quant-cat', symbol: 'CAT', name: 'Quant Cat', theme: ['#d7ff64', '#ffd36e'], volatility: 0.08 }
];

const TIMEFRAMES = [
  { id: '5m', label: '5M', multiplier: 0.16 },
  { id: '1h', label: '1H', multiplier: 0.42 },
  { id: '1d', label: '1D', multiplier: 1 },
  { id: '1w', label: '1W', multiplier: 1.85 },
  { id: '1m', label: '1M', multiplier: 2.8 }
];

const TOKENS_BY_ID = Object.fromEntries(TOKENS.map((token) => [token.id, token]));
const MEMES_BY_ID = Object.fromEntries(MEME_TOKENS.map((token) => [token.id, token]));
const ALL_ASSETS = [...FIAT_ASSETS, ...TOKENS, ...MEME_TOKENS];
const ALL_ASSETS_BY_ID = Object.fromEntries(ALL_ASSETS.map((asset) => [asset.id, asset]));

const STORAGE_KEY = 'shadow-wallet-state';
const PRICE_KEY = 'shadow-wallet-prices';
const SIM_STORAGE_KEY = 'shadow-simulator-state-v1';
const REFRESH_MS = 60_000;
const MARKET_TICK_MS = 6_000;
const TRADE_FEE = 0.0025;

const dom = {
  accountSwitcherButton: document.getElementById('accountSwitcherButton'),
  accountEmoji: document.getElementById('accountEmoji'),
  accountName: document.getElementById('accountName'),
  refreshButton: document.getElementById('refreshButton'),
  seedCashButton: document.getElementById('seedCashButton'),
  copyAddressButton: document.getElementById('copyAddressButton'),
  marketsTabButton: document.getElementById('marketsTabButton'),
  portfolioTabButton: document.getElementById('portfolioTabButton'),
  marketsView: document.getElementById('marketsView'),
  portfolioView: document.getElementById('portfolioView'),
  timeframeRow: document.getElementById('timeframeRow'),
  marketFilterRow: document.getElementById('marketFilterRow'),
  syncLabel: document.getElementById('syncLabel'),
  coinList: document.getElementById('coinList'),
  chartModal: document.getElementById('chartModal'),
  chartModalBackdrop: document.getElementById('chartModalBackdrop'),
  chartModalHeader: document.getElementById('chartModalHeader'),
  chartModalTimeframeRow: document.getElementById('chartModalTimeframeRow'),
  chartModalStats: document.getElementById('chartModalStats'),
  chartModalChart: document.getElementById('chartModalChart'),
  chartDetailStats: document.getElementById('chartDetailStats'),
  chartActivityList: document.getElementById('chartActivityList'),
  closeChartModalButton: document.getElementById('closeChartModalButton'),
  fromAssetSelect: document.getElementById('fromAssetSelect'),
  toAssetSelect: document.getElementById('toAssetSelect'),
  tradeAmountInput: document.getElementById('tradeAmountInput'),
  maxTradeButton: document.getElementById('maxTradeButton'),
  availableBalance: document.getElementById('availableBalance'),
  tradeRate: document.getElementById('tradeRate'),
  receiveAmount: document.getElementById('receiveAmount'),
  tradeFee: document.getElementById('tradeFee'),
  tradeForm: document.getElementById('tradeForm'),
  portfolioBalance: document.getElementById('portfolioBalance'),
  portfolioChange: document.getElementById('portfolioChange'),
  portfolioChangePct: document.getElementById('portfolioChangePct'),
  usdBalance: document.getElementById('usdBalance'),
  audBalance: document.getElementById('audBalance'),
  positionCount: document.getElementById('positionCount'),
  dayPnL: document.getElementById('dayPnL'),
  accountBadge: document.getElementById('accountBadge'),
  sidebarAccountName: document.getElementById('sidebarAccountName'),
  walletAddress: document.getElementById('walletAddress'),
  copySidebarAddressButton: document.getElementById('copySidebarAddressButton'),
  miniStats: document.getElementById('miniStats'),
  holdingsList: document.getElementById('holdingsList'),
  activityList: document.getElementById('activityList'),
  toast: document.getElementById('toast')
};

const state = {
  wallet: null,
  prices: {},
  sim: null,
  activeTab: 'markets',
  activeTimeframe: '5m',
  marketFilter: 'all',
  selectedAssetId: 'solana',
  selectedFromAssetId: 'fiat-usd',
  selectedToAssetId: 'solana',
  isChartModalOpen: false,
  syncStatus: 'Waiting for market sync',
  toastTimer: null
};

function randomString(length) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join('');
}

function createAddress() {
  return `Shadow${randomString(36)}`;
}

function createDefaultWallet() {
  const address = createAddress();
  return {
    accounts: [
      {
        id: `acct-${randomString(8)}`,
        name: 'Account 1',
        emoji: 'Acct',
        address,
        qrPayload: address,
        fiatBalances: { usd: 0, aud: 0 },
        holdings: [],
        activity: []
      }
    ],
    currentAccountId: null,
    lastSynced: null
  };
}

function migrateWalletShape(rawWallet) {
  if (!rawWallet) {
    const wallet = createDefaultWallet();
    wallet.currentAccountId = wallet.accounts[0].id;
    return wallet;
  }

  if (Array.isArray(rawWallet.accounts) && rawWallet.accounts.length) {
    return {
      ...rawWallet,
      currentAccountId: rawWallet.currentAccountId || rawWallet.accounts[0].id
    };
  }

  const address = rawWallet.address || createAddress();
  return {
    accounts: [
      {
        id: `acct-${randomString(8)}`,
        name: 'Account 1',
        emoji: 'Acct',
        address,
        qrPayload: rawWallet.qrPayload || address,
        fiatBalances: rawWallet.fiatBalances || { usd: 0, aud: 0 },
        holdings: rawWallet.holdings || [],
        activity: rawWallet.activity || []
      }
    ],
    currentAccountId: null,
    lastSynced: rawWallet.lastSynced || null
  };
}

function createInitialTimeframes(baseChange, seed) {
  return Object.fromEntries(TIMEFRAMES.map((timeframe, index) => {
    const bias = Math.sin(seed * 1.73 + index * 1.11) * 2.2;
    const drift = baseChange * timeframe.multiplier;
    return [timeframe.id, clamp(drift + bias, -96, 320)];
  }));
}

function createDefaultSimState() {
  return {
    version: 2,
    market: Object.fromEntries(
      MEME_TOKENS.map((token, index) => {
        const price = 0.00042 + index * 0.00018;
        return [
          token.id,
          {
            priceUsd: price,
            marketCap: 2_400_000 + index * 550_000,
            volume24h: 150_000 + index * 45_000,
            momentum: (index % 2 === 0 ? 1 : -1) * (0.25 + index * 0.08),
            history: buildSeedHistory(price, 0.08 + index * 0.012, index + 1),
            timeframeChanges: createInitialTimeframes((index - 2) * 6.3, index + 1),
            updatedAt: null
          }
        ];
      })
    ),
    accounts: {}
  };
}

function migrateSimState(rawSim) {
  const base = createDefaultSimState();
  if (!rawSim || typeof rawSim !== 'object') {
    return base;
  }

  const next = {
    ...base,
    ...rawSim,
    market: { ...base.market, ...(rawSim.market || {}) },
    accounts: rawSim.accounts || {}
  };

  MEME_TOKENS.forEach((token, index) => {
    const baseMarket = base.market[token.id];
    const current = next.market[token.id] || {};
    next.market[token.id] = {
      ...baseMarket,
      ...current,
      history: Array.isArray(current.history) && current.history.length
        ? current.history.slice(-36)
        : baseMarket.history,
      timeframeChanges: current.timeframeChanges || baseMarket.timeframeChanges
    };
  });

  return next;
}

function createSimulatorAccount() {
  return {
    balances: {
      'fiat-usd': 25000,
      'fiat-aud': 38000,
      solana: 125,
      bitcoin: 0.85,
      ethereum: 16,
      'usd-coin': 6000
    },
    activity: []
  };
}

function getCurrentAccount() {
  return (
    state.wallet.accounts.find((account) => account.id === state.wallet.currentAccountId) ||
    state.wallet.accounts[0]
  );
}

function ensureSimulatorAccount() {
  const account = getCurrentAccount();
  if (!state.sim.accounts[account.id]) {
    state.sim.accounts[account.id] = createSimulatorAccount();
  }
  if (!state.sim.accounts[account.id].balances) {
    state.sim.accounts[account.id].balances = {};
  }
  if (!Array.isArray(state.sim.accounts[account.id].activity)) {
    state.sim.accounts[account.id].activity = [];
  }
  return state.sim.accounts[account.id];
}

function getSimulatorAccount() {
  return ensureSimulatorAccount();
}

function storageGet(key) {
  if (globalThis.chrome?.storage?.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => resolve(result[key]));
    });
  }
  return Promise.resolve(JSON.parse(localStorage.getItem(key) || 'null'));
}

function storageSet(values) {
  if (globalThis.chrome?.storage?.local) {
    return new Promise((resolve) => {
      chrome.storage.local.set(values, resolve);
    });
  }
  Object.entries(values).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
  return Promise.resolve();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 4
  }).format(value);
}

function formatAud(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 4
  }).format(value);
}

function formatAmount(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: value >= 100 ? 2 : 6
  }).format(value);
}

function formatTinyUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 0.01 ? 6 : 2,
    maximumFractionDigits: value < 0.01 ? 6 : 4
  }).format(value);
}

function formatSignedPct(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatSignedUsd(value) {
  const abs = formatUsd(Math.abs(value));
  return `${value >= 0 ? '+' : '-'}${abs}`;
}

function formatChartAxisPrice(value) {
  return value >= 1 ? formatUsd(value) : formatTinyUsd(value);
}

function sanitizeDecimal(value) {
  return value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
}

function parseAmountInput(value) {
  return Number(String(value).replaceAll(',', ''));
}

function relativeSyncLabel(timestamp) {
  if (!timestamp) return 'Waiting for market sync';
  const diff = Math.max(0, Date.now() - new Date(timestamp).getTime());
  const seconds = Math.round(diff / 1000);
  if (seconds < 10) return 'Synced just now';
  if (seconds < 60) return `Synced ${seconds}s ago`;
  return `Synced ${Math.round(seconds / 60)}m ago`;
}

function buildSeedHistory(base, volatility, seed) {
  const history = [];
  let price = base;
  for (let i = 0; i < 36; i += 1) {
    const drift = Math.sin(seed * 0.9 + i * 0.42) * volatility * 0.08;
    const wave = Math.cos(seed * 1.3 + i * 0.27) * volatility * 0.05;
    price = Math.max(0.000001, price * (1 + drift + wave));
    history.push(price);
  }
  return history;
}

function getAudPerUsd() {
  const pricedToken = Object.values(state.prices).find((price) => price?.usd && price?.aud);
  if (!pricedToken) return 1.55;
  return pricedToken.aud / pricedToken.usd;
}

function isMemeAsset(assetId) {
  return Boolean(MEMES_BY_ID[assetId]);
}

function isSolanaTradeAsset(assetId) {
  return assetId === 'solana' || isMemeAsset(assetId);
}

function getAssetPriceUsd(assetId) {
  if (assetId === 'fiat-usd') return 1;
  if (assetId === 'fiat-aud') return 1 / getAudPerUsd();
  if (isMemeAsset(assetId)) return state.sim.market[assetId]?.priceUsd || 0;
  return state.prices[assetId]?.usd || 0;
}

function getAssetTimeframeChange(assetId, timeframeId) {
  if (isMemeAsset(assetId)) {
    return state.sim.market[assetId]?.timeframeChanges?.[timeframeId] || 0;
  }
  const price = state.prices[assetId];
  const base24h = price?.change24h || 0;
  const timeframe = TIMEFRAMES.find((item) => item.id === timeframeId) || TIMEFRAMES[2];
  const seed = assetId.length * 0.73;
  const noise = Math.sin(seed + timeframe.multiplier * 2.4) * 2.6;
  return clamp(base24h * timeframe.multiplier + noise, -96, 320);
}

function getAssetBalance(assetId) {
  return getSimulatorAccount().balances[assetId] || 0;
}

function setAssetBalance(assetId, amount) {
  const balances = getSimulatorAccount().balances;
  if (amount <= 0) {
    delete balances[assetId];
    return;
  }
  balances[assetId] = amount;
}

function getMarketAssets() {
  return [...TOKENS, ...MEME_TOKENS];
}

function listFundingAssets() {
  const targetAssetId = state.selectedToAssetId || state.selectedAssetId;
  return ALL_ASSETS.filter((asset) => {
    if (asset.id === targetAssetId) return false;
    if (getAssetBalance(asset.id) <= 0 || getAssetPriceUsd(asset.id) <= 0) return false;
    if (isSolanaTradeAsset(targetAssetId)) {
      return isSolanaTradeAsset(asset.id);
    }
    return true;
  });
}

function listTargetAssets(fromAssetId) {
  return getMarketAssets().filter((asset) => asset.id !== fromAssetId && getAssetPriceUsd(asset.id) > 0);
}

function syncWalletAccountFromSimulator() {
  const current = getCurrentAccount();
  const simulator = getSimulatorAccount();
  current.fiatBalances = {
    usd: simulator.balances['fiat-usd'] || 0,
    aud: simulator.balances['fiat-aud'] || 0
  };
  current.holdings = Object.entries(simulator.balances)
    .filter(([assetId, amount]) => !assetId.startsWith('fiat-') && amount > 0)
    .map(([assetId, amount]) => ({ tokenId: assetId, amount }));
}

function renderTokenVisual(asset, className = 'token-logo') {
  if (asset.logoUrl) {
    const safeName = escapeHtml(asset.name);
    return `<img class="${className}" src="${asset.logoUrl}" alt="${safeName}" loading="lazy" onerror="this.replaceWith(createTokenBadge('${escapeHtml(asset.symbol.slice(0, 4))}', '${className}'))" />`;
  }
  if (isMemeAsset(asset.id)) {
    const theme = MEMES_BY_ID[asset.id].theme;
    return `<div class="token-badge" style="background: linear-gradient(145deg, ${theme[0]}, ${theme[1]});">${escapeHtml(asset.symbol)}</div>`;
  }
  return `<div class="token-badge">${escapeHtml(asset.symbol)}</div>`;
}

function createTokenBadge(label, className = 'token-badge') {
  const badge = document.createElement('div');
  badge.className = className === 'token-logo' ? 'token-badge' : className;
  badge.textContent = label;
  return badge;
}

globalThis.createTokenBadge = createTokenBadge;

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.remove('hidden');
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 2200);
}

function pushActivity(entry) {
  const account = getSimulatorAccount();
  account.activity.unshift({
    id: `trade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry
  });
  account.activity = account.activity.slice(0, 40);
}

function describeAsset(assetId) {
  return ALL_ASSETS_BY_ID[assetId]?.symbol || assetId;
}

function getTradeQuote() {
  const fromAssetId = state.selectedFromAssetId;
  const toAssetId = state.selectedToAssetId;
  const amount = parseAmountInput(dom.tradeAmountInput.value);
  const available = getAssetBalance(fromAssetId);
  const fromPriceUsd = getAssetPriceUsd(fromAssetId);
  const toPriceUsd = getAssetPriceUsd(toAssetId);

  if (!fromAssetId || !toAssetId || !amount || amount <= 0 || !fromPriceUsd || !toPriceUsd) {
    return { available, receiveAmount: 0, rateText: '-', feeUsd: 0, valid: false };
  }

  const grossUsd = amount * fromPriceUsd;
  const netUsd = grossUsd * (1 - TRADE_FEE);
  return {
    available,
    receiveAmount: netUsd / toPriceUsd,
    rateText: `1 ${describeAsset(fromAssetId)} = ${formatAmount(fromPriceUsd / toPriceUsd)} ${describeAsset(toAssetId)}`,
    feeUsd: grossUsd - netUsd,
    valid: amount <= available
  };
}

function getPortfolioSummary() {
  const balances = getSimulatorAccount().balances;
  let total = 0;
  let previous = 0;
  let positionCount = 0;

  Object.entries(balances).forEach(([assetId, amount]) => {
    const price = getAssetPriceUsd(assetId);
    const changePct = getAssetTimeframeChange(assetId, '1d') / 100;
    const usdValue = amount * price;
    const prevValue = changePct > -1 ? usdValue / (1 + changePct) : usdValue;
    total += usdValue;
    previous += prevValue;
    if (!assetId.startsWith('fiat-')) positionCount += 1;
  });

  const dayChange = total - previous;
  const dayPct = previous > 0 ? (dayChange / previous) * 100 : 0;
  return { total, dayChange, dayPct, positionCount };
}

function getAssetHistory(assetId) {
  if (isMemeAsset(assetId)) {
    return state.sim.market[assetId]?.history || [1, 1, 1];
  }
  const price = getAssetPriceUsd(assetId) || 1;
  const baseChange = getAssetTimeframeChange(assetId, state.activeTimeframe) / 100;
  return buildSeedHistory(price / (1 + baseChange || 1), 0.045, assetId.length);
}

function buildSparkline(values, strokeColor, height = 120) {
  const points = Array.isArray(values) && values.length ? values : [1, 1, 1];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 320;
  const bottom = height - 10;
  const coords = points.map((value, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * width;
    const y = 10 + (1 - ((value - min) / range)) * (height - 20);
    return [x, y];
  });
  const line = coords.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${line} L ${width} ${bottom} L 0 ${bottom} Z`;
  return `
    <div class="chart-wrap">
      <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <path class="area" d="${area}"></path>
        <path class="line" d="${line}" stroke="${strokeColor}"></path>
      </svg>
    </div>
  `;
}

function getChartTimeLabels(timeframeId) {
  switch (timeframeId) {
    case '5m':
      return ['5m ago', '3m', '1m', 'Now'];
    case '1h':
      return ['1h ago', '40m', '20m', 'Now'];
    case '1d':
      return ['24h ago', '16h', '8h', 'Now'];
    case '1w':
      return ['7d ago', '5d', '2d', 'Now'];
    case '1m':
      return ['30d ago', '20d', '10d', 'Now'];
    default:
      return ['Start', 'Mid', 'Now'];
  }
}

function buildDetailedChart(values, strokeColor, timeframeId) {
  const points = Array.isArray(values) && values.length ? values : [1, 1, 1];
  const width = 1400;
  const height = 680;
  const padLeft = 92;
  const padRight = 28;
  const padTop = 24;
  const padBottom = 64;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((value, index) => {
    const x = padLeft + (index / Math.max(points.length - 1, 1)) * plotWidth;
    const y = padTop + (1 - ((value - min) / range)) * plotHeight;
    return [x, y];
  });
  const line = coords.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${line} L ${padLeft + plotWidth} ${padTop + plotHeight} L ${padLeft} ${padTop + plotHeight} Z`;

  const grid = Array.from({ length: 5 }, (_, index) => {
    const y = padTop + (plotHeight / 4) * index;
    const value = max - (range / 4) * index;
    return `
      <line class="grid" x1="${padLeft}" y1="${y.toFixed(2)}" x2="${(padLeft + plotWidth).toFixed(2)}" y2="${y.toFixed(2)}"></line>
      <text class="axis-label" x="${padLeft - 14}" y="${(y + 6).toFixed(2)}" text-anchor="end">${escapeHtml(formatChartAxisPrice(value))}</text>
    `;
  }).join('');

  const labels = getChartTimeLabels(timeframeId);
  const xLabels = labels.map((label, index) => {
    const x = padLeft + (plotWidth / Math.max(labels.length - 1, 1)) * index;
    const anchor = index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle';
    return `<text class="axis-label" x="${x.toFixed(2)}" y="${(height - 18).toFixed(2)}" text-anchor="${anchor}">${escapeHtml(label)}</text>`;
  }).join('');

  return `
    <div class="chart-wrap">
      <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        ${grid}
        <path class="area" d="${area}"></path>
        <path class="line" d="${line}" stroke="${strokeColor}"></path>
        ${xLabels}
      </svg>
    </div>
  `;
}

function renderAssetSelectors() {
  const fundingAssets = listFundingAssets();
  if (!fundingAssets.some((asset) => asset.id === state.selectedFromAssetId)) {
    state.selectedFromAssetId = fundingAssets[0]?.id || 'fiat-usd';
  }

  const targetAssets = listTargetAssets(state.selectedFromAssetId);
  if (!targetAssets.some((asset) => asset.id === state.selectedToAssetId)) {
    state.selectedToAssetId = targetAssets.some((asset) => asset.id === state.selectedAssetId)
      ? state.selectedAssetId
      : targetAssets[0]?.id || getMarketAssets()[0].id;
  }

  dom.fromAssetSelect.innerHTML = fundingAssets.map((asset) => {
    const selected = asset.id === state.selectedFromAssetId ? 'selected' : '';
    return `<option value="${asset.id}" ${selected}>${escapeHtml(asset.name)} (${escapeHtml(asset.symbol)})</option>`;
  }).join('');

  dom.toAssetSelect.innerHTML = targetAssets.map((asset) => {
    const selected = asset.id === state.selectedToAssetId ? 'selected' : '';
    return `<option value="${asset.id}" ${selected}>${escapeHtml(asset.name)} (${escapeHtml(asset.symbol)})</option>`;
  }).join('');
}

function renderMarketList() {
  const assets = getMarketAssets().filter((asset) => {
    if (state.marketFilter === 'memes') return isMemeAsset(asset.id);
    if (state.marketFilter === 'majors') return !isMemeAsset(asset.id);
    if (state.marketFilter === 'held') return getAssetBalance(asset.id) > 0;
    return true;
  }).slice().sort((a, b) => {
    return getAssetTimeframeChange(b.id, state.activeTimeframe) - getAssetTimeframeChange(a.id, state.activeTimeframe);
  });

  dom.marketFilterRow.querySelectorAll('[data-filter]').forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === state.marketFilter);
  });

  dom.coinList.innerHTML = assets.map((asset) => {
    const active = asset.id === state.selectedAssetId ? 'active' : '';
    const price = getAssetPriceUsd(asset.id);
    const change5m = getAssetTimeframeChange(asset.id, '5m');
    const change1h = getAssetTimeframeChange(asset.id, '1h');
    const change1d = getAssetTimeframeChange(asset.id, '1d');
    const activeChange = getAssetTimeframeChange(asset.id, state.activeTimeframe);
    const strokeColor = activeChange >= 0 ? '#7df1c7' : '#ff8b6e';
    const history = getAssetHistory(asset.id);
    return `
      <button class="coin-row ${active}" type="button" data-asset-id="${asset.id}">
        <div class="coin-row-grid">
          <div class="coin-cell coin-meta-left">
            ${renderTokenVisual(asset)}
            <div>
              <div class="coin-name">${escapeHtml(asset.name)}</div>
              <div class="coin-symbol">${escapeHtml(asset.symbol)}</div>
            </div>
          </div>
          <div class="coin-cell coin-change">
            <strong>${formatTinyUsd(price)}</strong>
            <div class="coin-symbol">USD</div>
          </div>
          <div class="coin-cell coin-time ${state.activeTimeframe === '5m' ? 'active-time' : ''} ${change5m >= 0 ? 'positive' : 'negative'}">${formatSignedPct(change5m)}</div>
          <div class="coin-cell coin-time ${state.activeTimeframe === '1h' ? 'active-time' : ''} ${change1h >= 0 ? 'positive' : 'negative'}">${formatSignedPct(change1h)}</div>
          <div class="coin-cell coin-time ${state.activeTimeframe === '1d' ? 'active-time' : ''} ${change1d >= 0 ? 'positive' : 'negative'}">${formatSignedPct(change1d)}</div>
          <div class="chart-strip">${buildSparkline(history.slice(-18), strokeColor, 42)}</div>
        </div>
      </button>
    `;
  }).join('');
}

function renderDetail() {
  const asset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  const price = getAssetPriceUsd(asset.id);
  const activeChange = getAssetTimeframeChange(asset.id, state.activeTimeframe);
  const oneDay = getAssetTimeframeChange(asset.id, '1d');
  const oneWeek = getAssetTimeframeChange(asset.id, '1w');
  const history = getAssetHistory(asset.id);
  const strokeColor = activeChange >= 0 ? '#7df1c7' : '#ff8b6e';
  const balance = getAssetBalance(asset.id);

  dom.detailHeader.innerHTML = `
    <div class="coin-meta-left">
      ${renderTokenVisual(asset)}
      <div>
        <div class="detail-name">${escapeHtml(asset.name)}</div>
        <div class="detail-subline">${escapeHtml(asset.symbol)} · ${formatTinyUsd(price)}</div>
      </div>
    </div>
    <div class="coin-change">
      <strong class="${activeChange >= 0 ? 'positive' : 'negative'}">${formatSignedPct(activeChange)}</strong>
      <div class="coin-symbol">${(TIMEFRAMES.find((item) => item.id === state.activeTimeframe) || TIMEFRAMES[0]).label}</div>
    </div>
  `;

  dom.detailChart.innerHTML = buildSparkline(history, strokeColor, 240);
  dom.detailStats.innerHTML = `
    <div class="detail-stat">
      <div class="detail-label">Price</div>
      <strong>${formatTinyUsd(price)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">Balance</div>
      <strong>${formatAmount(balance)} ${escapeHtml(asset.symbol)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">24H</div>
      <strong class="${oneDay >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneDay)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">1W</div>
      <strong class="${oneWeek >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneWeek)}</strong>
    </div>
  `;
}

function renderChartModalLegacyUnused() {
  const asset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  const history = getAssetHistory(asset.id);
  const activeChange = getAssetTimeframeChange(asset.id, state.activeTimeframe);
  const strokeColor = activeChange >= 0 ? '#7df1c7' : '#ff8b6e';
  const timeframe = TIMEFRAMES.find((item) => item.id === state.activeTimeframe) || TIMEFRAMES[0];

  dom.chartModalHeader.innerHTML = `
    <div class="coin-meta-left">
      ${renderTokenVisual(asset)}
      <div>
        <div class="detail-name">${escapeHtml(asset.name)}</div>
        <div class="detail-subline">${escapeHtml(asset.symbol)} · ${formatTinyUsd(getAssetPriceUsd(asset.id))} · ${timeframe.label}</div>
      </div>
    </div>
  `;
  dom.chartModalChart.innerHTML = buildSparkline(history, strokeColor, 680);
  dom.chartModal.classList.toggle('hidden', !state.isChartModalOpen);
}

function renderTradePreview() {
  const quote = getTradeQuote();
  const fromAsset = ALL_ASSETS_BY_ID[state.selectedFromAssetId];
  const toAsset = ALL_ASSETS_BY_ID[state.selectedToAssetId];
  dom.availableBalance.textContent = fromAsset ? `${formatAmount(quote.available)} ${fromAsset.symbol}` : '0';
  dom.tradeRate.textContent = quote.rateText;
  dom.receiveAmount.textContent = toAsset ? `${formatAmount(quote.receiveAmount)} ${toAsset.symbol}` : '0';
  dom.tradeFee.textContent = `${(TRADE_FEE * 100).toFixed(2)}% (${formatUsd(quote.feeUsd)})`;
}

function renderPortfolio() {
  const current = getCurrentAccount();
  const summary = getPortfolioSummary();
  const address = current.address || 'Shadow';
  const positive = summary.dayChange >= 0;

  dom.accountEmoji.textContent = current.emoji || 'Acct';
  dom.accountName.textContent = current.name || 'Account';
  dom.accountBadge.textContent = (current.emoji || 'Acct').slice(0, 4);
  dom.sidebarAccountName.textContent = current.name || 'Account';
  dom.walletAddress.textContent = `${address.slice(0, 10)}...${address.slice(-8)}`;
  dom.portfolioBalance.textContent = formatUsd(summary.total);
  dom.portfolioChange.textContent = formatSignedUsd(summary.dayChange);
  dom.portfolioChange.className = `balance-change ${positive ? 'positive' : 'negative'}`;
  dom.portfolioChangePct.textContent = formatSignedPct(summary.dayPct);
  dom.portfolioChangePct.className = `change-pill ${positive ? 'positive' : 'negative'}`;
  dom.usdBalance.textContent = formatUsd(getAssetBalance('fiat-usd'));
  dom.audBalance.textContent = formatAud(getAssetBalance('fiat-aud'));
  dom.positionCount.textContent = String(summary.positionCount);
  dom.dayPnL.textContent = formatSignedUsd(summary.dayChange);
  dom.dayPnL.className = positive ? 'positive' : 'negative';

  const account = getSimulatorAccount();
  const exposure = Object.entries(account.balances)
    .filter(([assetId]) => !assetId.startsWith('fiat-'))
    .reduce((sum, [assetId, amount]) => sum + amount * getAssetPriceUsd(assetId), 0);
  const best = getMarketAssets().slice().sort((a, b) => getAssetTimeframeChange(b.id, '1d') - getAssetTimeframeChange(a.id, '1d'))[0];

  dom.miniStats.innerHTML = [
    { label: 'Coin Exposure', value: formatUsd(exposure) },
    { label: 'Active Coins', value: String(Object.keys(account.balances).filter((assetId) => !assetId.startsWith('fiat-')).length) },
    { label: 'Top 24H Move', value: best ? best.symbol : '-' }
  ].map((item) => `
    <div class="mini-stat">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join('');

  const holdings = Object.entries(account.balances)
    .filter(([, amount]) => amount > 0)
    .sort((a, b) => (b[1] * getAssetPriceUsd(b[0])) - (a[1] * getAssetPriceUsd(a[0])));

  dom.holdingsList.innerHTML = holdings.length ? holdings.map(([assetId, amount]) => {
    const asset = ALL_ASSETS_BY_ID[assetId];
    return `
      <div class="holding-row">
        <div class="holding-left">
          ${renderTokenVisual(asset)}
          <div>
            <strong>${escapeHtml(asset.name)}</strong>
            <span>${formatAmount(amount)} ${escapeHtml(asset.symbol)}</span>
          </div>
        </div>
        <div class="holding-right">
          <strong>${formatUsd(amount * getAssetPriceUsd(assetId))}</strong>
          <span class="${getAssetTimeframeChange(assetId, '1d') >= 0 ? 'positive' : 'negative'}">${formatSignedPct(getAssetTimeframeChange(assetId, '1d'))}</span>
        </div>
      </div>
    `;
  }).join('') : '<div class="empty">No balances yet.</div>';

  const activity = account.activity;
  dom.activityList.innerHTML = activity.length ? activity.map((item) => `
    <div class="activity-row">
      <div class="activity-left">
        ${renderTokenVisual(ALL_ASSETS_BY_ID[item.toAssetId] || ALL_ASSETS_BY_ID[item.fromAssetId] || FIAT_ASSETS[0])}
        <div>
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.details)}</span>
        </div>
      </div>
      <div class="activity-right">
        <strong>${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
        <span>${new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  `).join('') : '<div class="empty">No trades yet.</div>';
}

function renderTabs() {
  const marketsActive = state.activeTab === 'markets';
  dom.marketsTabButton.classList.toggle('active', marketsActive);
  dom.portfolioTabButton.classList.toggle('active', !marketsActive);
  dom.marketsView.classList.toggle('hidden', !marketsActive);
  dom.portfolioView.classList.toggle('hidden', marketsActive);
}

function renderTimeframes() {
  dom.timeframeRow.querySelectorAll('[data-timeframe]').forEach((button) => {
    button.classList.toggle('active', button.dataset.timeframe === state.activeTimeframe);
  });
}

function render() {
  renderTabs();
  renderTimeframes();
  renderAssetSelectors();
  dom.syncLabel.textContent = state.syncStatus || relativeSyncLabel(state.wallet.lastSynced);
  renderMarketList();
  renderChartModal();
  renderTradePreview();
  renderPortfolio();
}

function renderChartModal() {
  const asset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  const history = getAssetHistory(asset.id);
  const activeChange = getAssetTimeframeChange(asset.id, state.activeTimeframe);
  const strokeColor = activeChange >= 0 ? '#7df1c7' : '#ff8b6e';
  const timeframe = TIMEFRAMES.find((item) => item.id === state.activeTimeframe) || TIMEFRAMES[0];
  const price = getAssetPriceUsd(asset.id);
  const oneHour = getAssetTimeframeChange(asset.id, '1h');
  const oneDay = getAssetTimeframeChange(asset.id, '1d');

  dom.chartModalHeader.innerHTML = `
    <div class="coin-meta-left">
      ${renderTokenVisual(asset)}
      <div>
        <div class="detail-name">${escapeHtml(asset.name)}</div>
        <div class="detail-subline">${escapeHtml(asset.symbol)} - ${formatTinyUsd(price)} - ${timeframe.label}</div>
      </div>
    </div>
  `;
  dom.chartModalTimeframeRow.querySelectorAll('[data-timeframe]').forEach((button) => {
    button.classList.toggle('active', button.dataset.timeframe === state.activeTimeframe);
  });
  dom.chartModalStats.innerHTML = `
    <div class="chart-modal-stat">
      <span>Price</span>
      <strong>${formatTinyUsd(price)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>${timeframe.label}</span>
      <strong class="${activeChange >= 0 ? 'positive' : 'negative'}">${formatSignedPct(activeChange)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>1H</span>
      <strong class="${oneHour >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneHour)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>24H</span>
      <strong class="${oneDay >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneDay)}</strong>
    </div>
  `;
  dom.chartModalChart.innerHTML = buildDetailedChart(history, strokeColor, state.activeTimeframe);
  dom.chartDetailStats.innerHTML = `
    <div class="detail-stat">
      <div class="detail-label">Price</div>
      <strong>${formatTinyUsd(price)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">Balance</div>
      <strong>${formatAmount(getAssetBalance(asset.id))} ${escapeHtml(asset.symbol)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">1H</div>
      <strong class="${oneHour >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneHour)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">24H</div>
      <strong class="${oneDay >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneDay)}</strong>
    </div>
  `;
  const modalActivity = getSimulatorAccount().activity;
  dom.chartActivityList.innerHTML = modalActivity.length ? modalActivity.slice(0, 8).map((item) => `
    <div class="activity-row">
      <div class="activity-left">
        ${renderTokenVisual(ALL_ASSETS_BY_ID[item.toAssetId] || ALL_ASSETS_BY_ID[item.fromAssetId] || FIAT_ASSETS[0])}
        <div>
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.details)}</span>
        </div>
      </div>
      <div class="activity-right">
        <strong>${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
        <span>${new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  `).join('') : '<div class="empty">No transactions yet.</div>';
  dom.chartModal.classList.toggle('hidden', !state.isChartModalOpen);
}

async function saveAll() {
  syncWalletAccountFromSimulator();
  await storageSet({
    [STORAGE_KEY]: state.wallet,
    [PRICE_KEY]: state.prices,
    [SIM_STORAGE_KEY]: state.sim
  });
}

async function syncPrices({ silent = false } = {}) {
  try {
    const ids = TOKENS.map((token) => token.id).join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,aud&include_24hr_change=true`,
      { headers: { accept: 'application/json' } }
    );
    if (!response.ok) throw new Error(`Price request failed: ${response.status}`);

    const payload = await response.json();
    TOKENS.forEach((token) => {
      state.prices[token.id] = {
        usd: payload[token.id]?.usd || 0,
        aud: payload[token.id]?.aud || 0,
        change24h: typeof payload[token.id]?.usd_24h_change === 'number' ? payload[token.id].usd_24h_change : 0
      };
    });
    state.wallet.lastSynced = new Date().toISOString();
    state.syncStatus = relativeSyncLabel(state.wallet.lastSynced);
    await saveAll();
    render();
    if (!silent) showToast('Prices refreshed.');
  } catch {
    state.syncStatus = state.wallet.lastSynced
      ? `${relativeSyncLabel(state.wallet.lastSynced)} - live sync paused`
      : 'Live price sync unavailable';
    render();
    if (!silent) showToast('Unable to refresh prices right now.');
  }
}

function tickMemeMarket() {
  MEME_TOKENS.forEach((token, index) => {
    const market = state.sim.market[token.id];
    const drift = market.momentum * 0.008;
    const noise = (Math.random() * 2 - 1) * token.volatility * 0.35;
    const shock = Math.random() < 0.06 ? (Math.random() * 2 - 1) * token.volatility * 1.3 : 0;
    const deltaPct = clamp(drift + noise + shock, -0.24, 0.24);
    const nextPrice = Math.max(0.000001, market.priceUsd * (1 + deltaPct));
    market.priceUsd = nextPrice;
    market.volume24h = Math.max(50_000, market.volume24h * (0.93 + Math.random() * 0.18) + Math.abs(deltaPct) * 700_000);
    market.marketCap = Math.max(800_000, nextPrice * (2_900_000_000 + Math.random() * 2_100_000_000));
    market.momentum = clamp((market.momentum * 0.84) + deltaPct * 4 + (Math.random() * 2 - 1) * 0.2, -2.4, 2.4);
    market.updatedAt = new Date().toISOString();
    market.history = [...market.history.slice(-35), nextPrice];

    TIMEFRAMES.forEach((timeframe, tfIndex) => {
      const current = market.timeframeChanges[timeframe.id] || 0;
      const wave = Math.sin(Date.now() / 1000 / (6 + tfIndex) + index) * 1.4;
      const next = current * 0.84 + (deltaPct * 100 * timeframe.multiplier * 1.5) + wave;
      market.timeframeChanges[timeframe.id] = clamp(next, -96, 320);
    });
  });

  saveAll().then(render);
}

function addCash() {
  const account = getSimulatorAccount();
  account.balances['fiat-usd'] = (account.balances['fiat-usd'] || 0) + 5000;
  account.balances['fiat-aud'] = (account.balances['fiat-aud'] || 0) + 7500;
  pushActivity({
    label: 'Cash Added',
    details: 'Added buying power to the account.',
    fromAssetId: 'fiat-usd',
    toAssetId: 'fiat-aud'
  });
  saveAll().then(() => {
    render();
    showToast('Cash added.');
  });
}

async function submitTrade(event) {
  event.preventDefault();
  const fromAssetId = state.selectedFromAssetId;
  const toAssetId = state.selectedToAssetId;
  const amount = parseAmountInput(dom.tradeAmountInput.value);
  const quote = getTradeQuote();

  if (!fromAssetId || !toAssetId || fromAssetId === toAssetId) {
    showToast('Choose two different assets.');
    return;
  }
  if (!amount || amount <= 0) {
    showToast('Enter a trade amount.');
    return;
  }
  if (amount > quote.available) {
    showToast(`Only ${formatAmount(quote.available)} ${describeAsset(fromAssetId)} available.`);
    return;
  }
  if (!quote.receiveAmount || !quote.valid) {
    showToast('Trade quote unavailable.');
    return;
  }
  if (isSolanaTradeAsset(toAssetId) && !isSolanaTradeAsset(fromAssetId)) {
    showToast('Solana coins can only be bought with SOL or another held Solana coin.');
    return;
  }

  setAssetBalance(fromAssetId, quote.available - amount);
  setAssetBalance(toAssetId, getAssetBalance(toAssetId) + quote.receiveAmount);

  const fromAsset = ALL_ASSETS_BY_ID[fromAssetId];
  const toAsset = ALL_ASSETS_BY_ID[toAssetId];
  pushActivity({
    label: `${fromAsset.symbol} to ${toAsset.symbol}`,
    details: `${formatAmount(amount)} ${fromAsset.symbol} swapped for ${formatAmount(quote.receiveAmount)} ${toAsset.symbol}.`,
    fromAssetId,
    toAssetId
  });

  dom.tradeAmountInput.value = '';
  await saveAll();
  render();
  showToast('Trade executed.');
}

function copyCurrentAddress() {
  const address = getCurrentAccount().address;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(address).then(
      () => showToast('Wallet address copied.'),
      () => showToast('Unable to copy address.')
    );
    return;
  }
  showToast('Clipboard unavailable.');
}

function openCoinPage(assetId) {
  const url = new URL('coin.html', window.location.href);
  url.searchParams.set('asset', assetId);
  url.searchParams.set('tf', state.activeTimeframe);
  window.location.href = url.toString();
}

function closeChartModal() {
  state.isChartModalOpen = false;
  renderChartModal();
}

function bindEvents() {
  dom.marketsTabButton.addEventListener('click', () => {
    state.activeTab = 'markets';
    renderTabs();
  });

  dom.portfolioTabButton.addEventListener('click', () => {
    state.activeTab = 'portfolio';
    renderTabs();
  });

  dom.timeframeRow.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-timeframe]');
    if (!button) return;
    state.activeTimeframe = button.dataset.timeframe;
    render();
  });

  dom.marketFilterRow.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    state.marketFilter = button.dataset.filter;
    renderMarketList();
  });

  dom.coinList.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-asset-id]');
    if (!button) return;
    state.selectedAssetId = button.dataset.assetId;
    state.selectedToAssetId = state.selectedAssetId;
    openCoinPage(state.selectedAssetId);
  });

  dom.chartModalTimeframeRow.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-timeframe]');
    if (!button) return;
    state.activeTimeframe = button.dataset.timeframe;
    render();
  });

  dom.chartModalBackdrop.addEventListener('click', closeChartModal);
  dom.closeChartModalButton.addEventListener('click', closeChartModal);

  dom.fromAssetSelect.addEventListener('change', () => {
    state.selectedFromAssetId = dom.fromAssetSelect.value;
    render();
  });

  dom.toAssetSelect.addEventListener('change', () => {
    state.selectedToAssetId = dom.toAssetSelect.value;
    renderTradePreview();
  });

  dom.tradeAmountInput.addEventListener('input', () => {
    dom.tradeAmountInput.value = sanitizeDecimal(dom.tradeAmountInput.value);
    renderTradePreview();
  });

  dom.maxTradeButton.addEventListener('click', () => {
    dom.tradeAmountInput.value = String(Number(getAssetBalance(state.selectedFromAssetId).toFixed(6)));
    renderTradePreview();
  });

  document.querySelectorAll('[data-quick-amount]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedFromAssetId = 'fiat-usd';
      renderAssetSelectors();
      dom.tradeAmountInput.value = button.dataset.quickAmount || '0';
      renderTradePreview();
    });
  });

  dom.tradeForm.addEventListener('submit', submitTrade);
  dom.refreshButton.addEventListener('click', () => syncPrices());
  dom.seedCashButton.addEventListener('click', addCash);
  dom.copyAddressButton.addEventListener('click', copyCurrentAddress);
  dom.copySidebarAddressButton.addEventListener('click', copyCurrentAddress);
  dom.accountSwitcherButton.addEventListener('click', () => showToast('Switch accounts from the Shadow wallet popup.'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.isChartModalOpen) {
      closeChartModal();
    }
  });

  if (globalThis.chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[STORAGE_KEY]?.newValue) {
        state.wallet = migrateWalletShape(changes[STORAGE_KEY].newValue);
        ensureSimulatorAccount();
        render();
      }
      if (changes[SIM_STORAGE_KEY]?.newValue) {
        state.sim = migrateSimState(changes[SIM_STORAGE_KEY].newValue);
        ensureSimulatorAccount();
        render();
      }
    });
  }
}

async function initialize() {
  const [wallet, prices, sim] = await Promise.all([
    storageGet(STORAGE_KEY),
    storageGet(PRICE_KEY),
    storageGet(SIM_STORAGE_KEY)
  ]);

  state.wallet = migrateWalletShape(wallet || createDefaultWallet());
  state.wallet.currentAccountId = state.wallet.currentAccountId || state.wallet.accounts[0].id;
  state.prices = prices || {};
  state.sim = migrateSimState(sim);
  ensureSimulatorAccount();
  syncWalletAccountFromSimulator();

  const firstAsset = getMarketAssets()[0];
  state.selectedAssetId = firstAsset.id;
  state.selectedToAssetId = firstAsset.id;
  state.syncStatus = relativeSyncLabel(state.wallet.lastSynced);

  bindEvents();
  render();

  if (!Object.keys(state.prices).length) {
    await syncPrices({ silent: true });
  } else {
    render();
  }

  setInterval(() => {
    state.syncStatus = state.wallet.lastSynced
      ? relativeSyncLabel(state.wallet.lastSynced)
      : 'Live price sync unavailable';
    render();
  }, 15_000);

  setInterval(() => syncPrices({ silent: true }), REFRESH_MS);
  setInterval(tickMemeMarket, MARKET_TICK_MS);
}

initialize();
