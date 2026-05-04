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
  { id: '5m', label: '5M', points: 6 },
  { id: '1h', label: '1H', points: 14 },
  { id: '1d', label: '1D', points: 26 },
  { id: '1w', label: '1W', points: 46 },
  { id: '1m', label: '1M', points: 72 }
];

const ALL_MARKET_ASSETS = [...TOKENS, ...MEME_TOKENS];
const ALL_ASSETS = [...FIAT_ASSETS, ...ALL_MARKET_ASSETS];
const ALL_ASSETS_BY_ID = Object.fromEntries(ALL_ASSETS.map((asset) => [asset.id, asset]));
const MEMES_BY_ID = Object.fromEntries(MEME_TOKENS.map((token) => [token.id, token]));

const STORAGE_KEY = 'shadow-wallet-state';
const PRICE_KEY = 'shadow-wallet-prices';
const SIM_STORAGE_KEY = 'shadow-simulator-state-v1';
const TRADE_FEE = 0.0025;
const HISTORY_LIMIT = 72;
const TRANSACTION_LIMIT = 80;
const MARKET_TICK_MS = 2600;

const dom = {
  accountSwitcherButton: document.getElementById('accountSwitcherButton'),
  accountEmoji: document.getElementById('accountEmoji'),
  accountName: document.getElementById('accountName'),
  backToMarketsButton: document.getElementById('backToMarketsButton'),
  refreshButton: document.getElementById('refreshButton'),
  copyAddressButton: document.getElementById('copyAddressButton'),
  coinHeader: document.getElementById('coinHeader'),
  coinTopStats: document.getElementById('coinTopStats'),
  timeframeRow: document.getElementById('timeframeRow'),
  chartModeRow: document.getElementById('chartModeRow'),
  coinChart: document.getElementById('coinChart'),
  coinDetailStats: document.getElementById('coinDetailStats'),
  marketProfileCard: document.getElementById('marketProfileCard'),
  fromAssetPickerButton: document.getElementById('fromAssetPickerButton'),
  toAssetPickerButton: document.getElementById('toAssetPickerButton'),
  fromAssetLabel: document.getElementById('fromAssetLabel'),
  fromAssetHint: document.getElementById('fromAssetHint'),
  toAssetLabel: document.getElementById('toAssetLabel'),
  toAssetHint: document.getElementById('toAssetHint'),
  tradeAmountInput: document.getElementById('tradeAmountInput'),
  maxTradeButton: document.getElementById('maxTradeButton'),
  availableBalance: document.getElementById('availableBalance'),
  tradeRate: document.getElementById('tradeRate'),
  receiveAmount: document.getElementById('receiveAmount'),
  tradeFee: document.getElementById('tradeFee'),
  tradeForm: document.getElementById('tradeForm'),
  activityList: document.getElementById('activityList'),
  toast: document.getElementById('toast'),
  walletModal: document.getElementById('walletModal'),
  walletModalBackdrop: document.getElementById('walletModalBackdrop'),
  walletModalCloseButton: document.getElementById('walletModalCloseButton'),
  walletModalSubtitle: document.getElementById('walletModalSubtitle'),
  walletLoadingState: document.getElementById('walletLoadingState'),
  walletLoadingTitle: document.getElementById('walletLoadingTitle'),
  walletLoadingCopy: document.getElementById('walletLoadingCopy'),
  walletConfirmState: document.getElementById('walletConfirmState'),
  walletRequestSummary: document.getElementById('walletRequestSummary'),
  walletAllowanceValue: document.getElementById('walletAllowanceValue'),
  walletFeeValue: document.getElementById('walletFeeValue'),
  walletRejectButton: document.getElementById('walletRejectButton'),
  walletApproveButton: document.getElementById('walletApproveButton'),
  assetPickerModal: document.getElementById('assetPickerModal'),
  assetPickerBackdrop: document.getElementById('assetPickerBackdrop'),
  assetPickerCloseButton: document.getElementById('assetPickerCloseButton'),
  assetPickerTitle: document.getElementById('assetPickerTitle'),
  assetPickerSubtitle: document.getElementById('assetPickerSubtitle'),
  assetPickerList: document.getElementById('assetPickerList')
};

const state = {
  wallet: null,
  prices: {},
  sim: null,
  selectedAssetId: 'solana',
  selectedFromAssetId: 'fiat-usd',
  activeTimeframe: '5m',
  chartMode: 'line',
  toastTimer: null,
  marketTimer: null,
  pickerMode: null,
  walletStageTimer: null,
  pendingTrade: null
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomString(length) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join('');
}

function randomHex(length) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (value) => (value % 16).toString(16)).join('');
}

function createAddress() {
  return `Shadow${randomString(36)}`;
}

function createMarketAddress() {
  return `0x${randomHex(40)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 4
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

function formatAmount(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: value >= 100 ? 2 : 6
  }).format(value);
}

function formatSignedPct(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatChartAxisPrice(value) {
  return value >= 1 ? formatUsd(value) : formatTinyUsd(value);
}

function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 1000 ? 1 : 0
  }).format(value);
}

function sanitizeDecimal(value) {
  return value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
}

function parseAmountInput(value) {
  return Number(String(value).replaceAll(',', ''));
}

function isMemeAsset(assetId) {
  return Boolean(MEMES_BY_ID[assetId]);
}

function isSolanaTradeAsset(assetId) {
  return assetId === 'solana' || isMemeAsset(assetId);
}

function getAssetVolatility(assetId) {
  return MEMES_BY_ID[assetId]?.volatility || 0.018;
}

function getChartTimeLabels(timeframeId) {
  switch (timeframeId) {
    case '5m': return ['5m ago', '3m', '1m', 'Now'];
    case '1h': return ['1h ago', '40m', '20m', 'Now'];
    case '1d': return ['24h ago', '16h', '8h', 'Now'];
    case '1w': return ['7d ago', '5d', '2d', 'Now'];
    case '1m': return ['30d ago', '20d', '10d', 'Now'];
    default: return ['Start', 'Mid', 'Now'];
  }
}

function buildOhlcSeries(values) {
  const points = Array.isArray(values) && values.length ? values : [1, 1, 1, 1];
  return points.map((close, index) => {
    const previous = index === 0 ? close : points[index - 1];
    const open = previous;
    const volatility = Math.abs(close - open) || close * 0.006 || 0.000001;
    const high = Math.max(open, close) + volatility * (0.4 + ((index % 5) * 0.12));
    const low = Math.min(open, close) - volatility * (0.38 + ((index % 4) * 0.1));
    const volume = Math.max(1, ((high - low) / Math.max(close, 0.000001)) * 100000);
    return { open, high, low, close, volume };
  });
}

function createDefaultWallet() {
  const address = createAddress();
  return {
    accounts: [{
      id: `acct-${randomString(8)}`,
      name: 'Account 1',
      emoji: 'Acct',
      address,
      qrPayload: address,
      fiatBalances: { usd: 0, aud: 0 },
      holdings: [],
      activity: []
    }],
    currentAccountId: null,
    lastSynced: null
  };
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

function buildSeedHistory(base, volatility, seed) {
  const history = [];
  let price = base;
  for (let i = 0; i < HISTORY_LIMIT; i += 1) {
    const drift = Math.sin(seed * 0.77 + i * 0.2) * volatility * 0.08;
    const wave = Math.cos(seed * 1.11 + i * 0.15) * volatility * 0.05;
    price = Math.max(base * 0.22, price * (1 + drift + wave));
    history.push(price);
  }
  return history;
}

function calculateTimeframeChanges(history) {
  const safeHistory = Array.isArray(history) && history.length ? history : [1, 1];
  const latest = safeHistory[safeHistory.length - 1] || 1;
  return Object.fromEntries(TIMEFRAMES.map((timeframe) => {
    const lookbackIndex = Math.max(0, safeHistory.length - timeframe.points);
    const previous = safeHistory[lookbackIndex] || latest;
    const change = previous ? ((latest - previous) / previous) * 100 : 0;
    return [timeframe.id, clamp(change, -96, 320)];
  }));
}

function createSeedTransactions(asset, priceUsd, historySeed, count = 24) {
  const trades = [];
  let runningPrice = priceUsd;
  for (let index = count - 1; index >= 0; index -= 1) {
    const buyBias = Math.sin(historySeed + index * 0.6);
    const side = buyBias >= 0 ? 'buy' : 'sell';
    const sizeBase = isMemeAsset(asset.id) ? 12_000 : 140;
    const amount = Math.max(1, Math.abs(buyBias) * sizeBase + 1 + index * 0.35);
    const usdValue = amount * runningPrice;
    trades.push({
      id: `seed-${asset.id}-${index}`,
      timestamp: new Date(Date.now() - index * 210000).toISOString(),
      side,
      address: createMarketAddress(),
      amount,
      usdValue,
      priceUsd: runningPrice
    });
    runningPrice *= 1 + (side === 'buy' ? 1 : -1) * 0.0005;
  }
  return trades.reverse();
}

function createMarketEntry(asset, index, basePrice) {
  const safeBasePrice = Math.max(basePrice || 1, asset.id === 'bitcoin' ? 1000 : 0.00001);
  const history = buildSeedHistory(safeBasePrice, getAssetVolatility(asset.id), index + 1);
  const priceUsd = history[history.length - 1];
  return {
    priceUsd,
    marketCap: Math.max(1_000_000, safeBasePrice * (isMemeAsset(asset.id) ? 8_000_000_000 : 120_000_000)),
    volume24h: Math.max(90_000, safeBasePrice * (isMemeAsset(asset.id) ? 280_000_000 : 6_500_000)),
    history,
    transactions: createSeedTransactions(asset, priceUsd, index + 1),
    timeframeChanges: calculateTimeframeChanges(history),
    updatedAt: new Date().toISOString()
  };
}

function createDefaultSimState() {
  const market = Object.fromEntries(
    MEME_TOKENS.map((asset, index) => [asset.id, createMarketEntry(asset, index, 0.00042 + index * 0.00018)])
  );
  return { version: 3, market, accounts: {} };
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
    accounts: [{
      id: `acct-${randomString(8)}`,
      name: 'Account 1',
      emoji: 'Acct',
      address,
      qrPayload: rawWallet.qrPayload || address,
      fiatBalances: rawWallet.fiatBalances || { usd: 0, aud: 0 },
      holdings: rawWallet.holdings || [],
      activity: rawWallet.activity || []
    }],
    currentAccountId: null,
    lastSynced: rawWallet.lastSynced || null
  };
}

function migrateSimState(rawSim) {
  const base = createDefaultSimState();
  if (!rawSim || typeof rawSim !== 'object') return base;
  return {
    ...base,
    ...rawSim,
    market: { ...base.market, ...(rawSim.market || {}) },
    accounts: rawSim.accounts || {}
  };
}

function storageGet(key) {
  if (globalThis.chrome?.storage?.local) {
    return new Promise((resolve) => chrome.storage.local.get(key, (result) => resolve(result[key])));
  }
  return Promise.resolve(JSON.parse(localStorage.getItem(key) || 'null'));
}

function storageSet(values) {
  if (globalThis.chrome?.storage?.local) {
    return new Promise((resolve) => chrome.storage.local.set(values, resolve));
  }
  Object.entries(values).forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
  return Promise.resolve();
}

function getCurrentAccount() {
  return state.wallet.accounts.find((account) => account.id === state.wallet.currentAccountId) || state.wallet.accounts[0];
}

function getSimulatorAccount() {
  const account = getCurrentAccount();
  if (!state.sim.accounts[account.id]) state.sim.accounts[account.id] = createSimulatorAccount();
  if (!state.sim.accounts[account.id].balances) state.sim.accounts[account.id].balances = {};
  if (!Array.isArray(state.sim.accounts[account.id].activity)) state.sim.accounts[account.id].activity = [];
  return state.sim.accounts[account.id];
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

function getAudPerUsd() {
  const pricedToken = Object.values(state.prices).find((price) => price?.usd && price?.aud);
  return pricedToken ? pricedToken.aud / pricedToken.usd : 1.55;
}

function getBasePriceUsd(assetId) {
  if (assetId === 'fiat-usd') return 1;
  if (assetId === 'fiat-aud') return 1 / getAudPerUsd();
  if (state.prices[assetId]?.usd) return state.prices[assetId].usd;
  if (isMemeAsset(assetId)) return state.sim.market[assetId]?.priceUsd || 0.0004;
  return state.sim.market[assetId]?.priceUsd || 1;
}

function ensureMarketEntries() {
  ALL_MARKET_ASSETS.forEach((asset, index) => {
    const existing = state.sim.market[asset.id];
    const basePrice = getBasePriceUsd(asset.id);
    if (!existing) {
      state.sim.market[asset.id] = createMarketEntry(asset, index, basePrice);
      return;
    }
    let history = Array.isArray(existing.history) && existing.history.length
      ? existing.history.slice(-HISTORY_LIMIT)
      : buildSeedHistory(basePrice, getAssetVolatility(asset.id), index + 1);
    let priceUsd = existing.priceUsd || history[history.length - 1] || basePrice;
    if (asset.type === 'major' && state.prices[asset.id]?.usd) {
      const drift = Math.abs(priceUsd - basePrice) / Math.max(basePrice, 0.000001);
      if (drift > 0.4) {
        history = buildSeedHistory(basePrice, getAssetVolatility(asset.id), index + 1);
        priceUsd = history[history.length - 1] || basePrice;
      }
    }
    const transactions = Array.isArray(existing.transactions) ? existing.transactions.slice(0, TRANSACTION_LIMIT) : createSeedTransactions(asset, priceUsd, index + 1);
    state.sim.market[asset.id] = {
      ...createMarketEntry(asset, index, basePrice),
      ...existing,
      priceUsd,
      history,
      transactions,
      timeframeChanges: calculateTimeframeChanges(history)
    };
  });
}

function getAssetPriceUsd(assetId) {
  if (assetId === 'fiat-usd' || assetId === 'fiat-aud') return getBasePriceUsd(assetId);
  return state.sim.market[assetId]?.priceUsd || getBasePriceUsd(assetId);
}

function getAssetTimeframeChange(assetId, timeframeId) {
  if (assetId === 'fiat-usd' || assetId === 'fiat-aud') return 0;
  return state.sim.market[assetId]?.timeframeChanges?.[timeframeId] || 0;
}

function getAssetHistory(assetId) {
  return state.sim.market[assetId]?.history || [1, 1, 1];
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

function buildDetailedChart(values, strokeColor, timeframeId, chartMode) {
  const points = Array.isArray(values) && values.length ? values : [1, 1, 1];
  const ohlc = buildOhlcSeries(points);
  const width = 1400;
  const height = 760;
  const padLeft = 86;
  const padRight = 40;
  const padTop = 66;
  const padBottom = 96;
  const plotWidth = width - padLeft - padRight;
  const volumeHeight = 108;
  const plotHeight = height - padTop - padBottom - volumeHeight;
  const allValues = chartMode === 'candles'
    ? ohlc.flatMap((candle) => [candle.high, candle.low])
    : points;
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const coords = points.map((value, index) => {
    const x = padLeft + (index / Math.max(points.length - 1, 1)) * plotWidth;
    const y = padTop + (1 - ((value - min) / range)) * plotHeight;
    return [x, y];
  });
  const line = coords.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const areaFloor = padTop + plotHeight;
  const area = `${line} L ${padLeft + plotWidth} ${areaFloor} L ${padLeft} ${areaFloor} Z`;
  const priceGrid = Array.from({ length: 7 }, (_, index) => {
    const y = padTop + (plotHeight / 6) * index;
    const value = max - (range / 6) * index;
    return `
      <line class="grid" x1="${padLeft}" y1="${y.toFixed(2)}" x2="${(padLeft + plotWidth).toFixed(2)}" y2="${y.toFixed(2)}"></line>
      <text class="axis-label" x="${padLeft - 14}" y="${(y + 6).toFixed(2)}" text-anchor="end">${escapeHtml(formatChartAxisPrice(value))}</text>
    `;
  }).join('');
  const sessionGrid = Array.from({ length: 6 }, (_, index) => {
    const x = padLeft + (plotWidth / 5) * index;
    return `<line class="grid vertical" x1="${x.toFixed(2)}" y1="${padTop}" x2="${x.toFixed(2)}" y2="${(padTop + plotHeight).toFixed(2)}"></line>`;
  }).join('');
  const volumeMax = Math.max(...ohlc.map((candle) => candle.volume), 1);
  const volumeTop = padTop + plotHeight + 18;
  const volumeBars = ohlc.map((candle, index) => {
    const x = padLeft + (index / Math.max(ohlc.length - 1, 1)) * plotWidth;
    const candleWidth = Math.max(6, plotWidth / Math.max(ohlc.length, 1) * 0.55);
    const barHeight = (candle.volume / volumeMax) * (volumeHeight - 26);
    const y = volumeTop + (volumeHeight - 26 - barHeight);
    const positive = candle.close >= candle.open;
    return `<rect class="volume-bar ${positive ? 'up' : 'down'}" x="${(x - candleWidth / 2).toFixed(2)}" y="${y.toFixed(2)}" width="${candleWidth.toFixed(2)}" height="${barHeight.toFixed(2)}"></rect>`;
  }).join('');
  const candles = ohlc.map((candle, index) => {
    const x = padLeft + (index / Math.max(ohlc.length - 1, 1)) * plotWidth;
    const candleWidth = Math.max(6, plotWidth / Math.max(ohlc.length, 1) * 0.58);
    const openY = padTop + (1 - ((candle.open - min) / range)) * plotHeight;
    const closeY = padTop + (1 - ((candle.close - min) / range)) * plotHeight;
    const highY = padTop + (1 - ((candle.high - min) / range)) * plotHeight;
    const lowY = padTop + (1 - ((candle.low - min) / range)) * plotHeight;
    const bodyY = Math.min(openY, closeY);
    const bodyHeight = Math.max(2, Math.abs(closeY - openY));
    const positive = candle.close >= candle.open;
    return `
      <line class="candle-wick ${positive ? 'up' : 'down'}" x1="${x.toFixed(2)}" y1="${highY.toFixed(2)}" x2="${x.toFixed(2)}" y2="${lowY.toFixed(2)}"></line>
      <rect class="candle-body ${positive ? 'up' : 'down'}" x="${(x - candleWidth / 2).toFixed(2)}" y="${bodyY.toFixed(2)}" width="${candleWidth.toFixed(2)}" height="${bodyHeight.toFixed(2)}"></rect>
    `;
  }).join('');
  const latestX = coords[coords.length - 1]?.[0] || padLeft;
  const latestY = coords[coords.length - 1]?.[1] || padTop;
  const latestValue = points[points.length - 1] || 0;
  const firstValue = points[0] || latestValue;
  const netChangePct = firstValue ? ((latestValue - firstValue) / firstValue) * 100 : 0;
  const rangeLow = Math.min(...ohlc.map((candle) => candle.low));
  const rangeHigh = Math.max(...ohlc.map((candle) => candle.high));
  const volumeText = formatUsd(ohlc.reduce((sum, candle) => sum + candle.volume * candle.close * 0.015, 0));
  const latestGuide = `
    <line class="latest-guide" x1="${padLeft}" y1="${latestY.toFixed(2)}" x2="${(padLeft + plotWidth).toFixed(2)}" y2="${latestY.toFixed(2)}"></line>
    <circle class="latest-dot" cx="${latestX.toFixed(2)}" cy="${latestY.toFixed(2)}" r="5"></circle>
    <rect class="latest-label-bg" x="${(padLeft + plotWidth - 112).toFixed(2)}" y="${(latestY - 14).toFixed(2)}" width="108" height="28" rx="8"></rect>
    <text class="latest-label" x="${(padLeft + plotWidth - 58).toFixed(2)}" y="${(latestY + 6).toFixed(2)}" text-anchor="middle">${escapeHtml(formatChartAxisPrice(latestValue))}</text>
  `;
  const labels = getChartTimeLabels(timeframeId);
  const xLabels = labels.map((label, index) => {
    const x = padLeft + (plotWidth / Math.max(labels.length - 1, 1)) * index;
    const anchor = index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle';
    return `<text class="axis-label" x="${x.toFixed(2)}" y="${(height - 22).toFixed(2)}" text-anchor="${anchor}">${escapeHtml(label)}</text>`;
  }).join('');
  return `
    <div class="chart-wrap advanced-chart">
      <div class="chart-topline">
        <div class="chart-legend">
          <span>O</span><strong>${escapeHtml(formatChartAxisPrice(ohlc[ohlc.length - 1]?.open || latestValue))}</strong>
          <span>H</span><strong>${escapeHtml(formatChartAxisPrice(ohlc[ohlc.length - 1]?.high || latestValue))}</strong>
          <span>L</span><strong>${escapeHtml(formatChartAxisPrice(ohlc[ohlc.length - 1]?.low || latestValue))}</strong>
          <span>C</span><strong>${escapeHtml(formatChartAxisPrice(ohlc[ohlc.length - 1]?.close || latestValue))}</strong>
        </div>
        <div class="chart-range-summary">
          <span class="${netChangePct >= 0 ? 'positive' : 'negative'}">${escapeHtml(formatSignedPct(netChangePct))}</span>
          <span>Range ${escapeHtml(formatChartAxisPrice(rangeLow))} - ${escapeHtml(formatChartAxisPrice(rangeHigh))}</span>
          <span>Vol ${escapeHtml(volumeText)}</span>
        </div>
      </div>
      <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(125, 241, 199, 0.28)"></stop>
            <stop offset="100%" stop-color="rgba(125, 241, 199, 0.02)"></stop>
          </linearGradient>
        </defs>
        <rect class="chart-surface" x="${padLeft}" y="${padTop}" width="${plotWidth}" height="${plotHeight}"></rect>
        ${priceGrid}
        ${sessionGrid}
        <line class="volume-divider" x1="${padLeft}" y1="${(volumeTop - 10).toFixed(2)}" x2="${(padLeft + plotWidth).toFixed(2)}" y2="${(volumeTop - 10).toFixed(2)}"></line>
        <text class="volume-label" x="${padLeft}" y="${(volumeTop - 16).toFixed(2)}">Volume</text>
        <text class="watermark" x="${(padLeft + plotWidth / 2).toFixed(2)}" y="${(padTop + plotHeight / 2).toFixed(2)}" text-anchor="middle">${escapeHtml(chartMode === 'candles' ? 'CANDLE VIEW' : 'LINE VIEW')}</text>
        ${chartMode === 'candles' ? candles : `<path class="area" d="${area}"></path><path class="line" d="${line}" stroke="${strokeColor}"></path>${latestGuide}`}
        ${chartMode === 'candles' ? latestGuide : ''}
        ${volumeBars}
        ${xLabels}
      </svg>
    </div>
  `;
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.remove('hidden');
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 2200);
}

function delay(ms) {
  return new Promise((resolve) => {
    state.walletStageTimer = setTimeout(resolve, ms);
  });
}

function getTradeQuote() {
  const fromAssetId = state.selectedFromAssetId;
  const toAssetId = state.selectedAssetId;
  const amount = parseAmountInput(dom.tradeAmountInput.value);
  const available = getSimulatorAccount().balances[fromAssetId] || 0;
  const fromPriceUsd = getAssetPriceUsd(fromAssetId);
  const toPriceUsd = getAssetPriceUsd(toAssetId);

  if (!amount || amount <= 0 || !fromPriceUsd || !toPriceUsd) {
    return { available, receiveAmount: 0, rateText: '-', feeUsd: 0, valid: false };
  }

  const grossUsd = amount * fromPriceUsd;
  const netUsd = grossUsd * (1 - TRADE_FEE);
  return {
    available,
    receiveAmount: netUsd / toPriceUsd,
    rateText: `1 ${ALL_ASSETS_BY_ID[fromAssetId]?.symbol || fromAssetId} = ${formatAmount(fromPriceUsd / toPriceUsd)} ${ALL_ASSETS_BY_ID[toAssetId]?.symbol || toAssetId}`,
    feeUsd: grossUsd - netUsd,
    valid: amount <= available
  };
}

function pushAccountActivity(entry) {
  const account = getSimulatorAccount();
  account.activity.unshift({
    id: `trade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry
  });
  account.activity = account.activity.slice(0, 40);
}

function buildMarketTransaction(assetId, side, usdValue, priceUsd, timestamp = new Date().toISOString(), address = createMarketAddress()) {
  const safeUsdValue = Math.max(usdValue, 25);
  const safePrice = Math.max(priceUsd, 0.0000001);
  return {
    id: `tx-${assetId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp,
    side,
    address,
    amount: safeUsdValue / safePrice,
    usdValue: safeUsdValue,
    priceUsd: safePrice
  };
}

function addTransactionToMarket(assetId, transaction) {
  const market = state.sim.market[assetId];
  market.transactions.unshift(transaction);
  market.transactions = market.transactions.slice(0, TRANSACTION_LIMIT);
}

function recordMarketPoint(assetId, nextPrice, usdValueBoost) {
  const market = state.sim.market[assetId];
  market.priceUsd = Math.max(nextPrice, 0.0000001);
  market.history.push(market.priceUsd);
  market.history = market.history.slice(-HISTORY_LIMIT);
  market.volume24h = Math.max(5000, market.volume24h * 0.92 + usdValueBoost);
  market.marketCap = Math.max(250000, market.marketCap * (0.985 + Math.random() * 0.02) + usdValueBoost * 18);
  market.timeframeChanges = calculateTimeframeChanges(market.history);
  market.updatedAt = new Date().toISOString();
}

function applyMarketTrade(assetId, side, usdValue, actorAddress) {
  const market = state.sim.market[assetId];
  const currentPrice = market.priceUsd || getBasePriceUsd(assetId);
  const isMeme = isMemeAsset(assetId);
  const liquidityBase = isMeme ? 36_000 : 4_500_000;
  const direction = side === 'buy' ? 1 : -1;
  const sizePressure = usdValue / liquidityBase;
  const noise = (Math.random() - 0.5) * getAssetVolatility(assetId) * (isMeme ? 0.11 : 0.15);
  const impactMultiplier = isMeme ? (1.8 + Math.random() * 0.9) : (0.8 + Math.random() * 0.5);
  const impact = clamp(direction * sizePressure * impactMultiplier + noise, isMeme ? -0.24 : -0.12, isMeme ? 0.28 : 0.14);
  const nextPrice = currentPrice * (1 + impact);
  const transaction = buildMarketTransaction(assetId, side, usdValue, nextPrice, new Date().toISOString(), actorAddress);
  addTransactionToMarket(assetId, transaction);
  recordMarketPoint(assetId, nextPrice, usdValue);
}

function generateRandomMarketTrades(assetId) {
  const tradesThisTick = 1 + Math.floor(Math.random() * 3);
  for (let index = 0; index < tradesThisTick; index += 1) {
    const sideBias = Math.sin(Date.now() / 240000 + index + assetId.length);
    const side = Math.random() + sideBias * 0.18 > 0.54 ? 'buy' : 'sell';
    let usdValue;
    if (isMemeAsset(assetId)) {
      const eventRoll = Math.random();
      if (eventRoll < 0.015) {
        usdValue = 100_000 + Math.random() * 120_000;
      } else if (eventRoll < 0.05) {
        usdValue = 10_000 + Math.random() * 35_000;
      } else {
        usdValue = 10 + Math.random() * 490;
      }
    } else {
      usdValue = 5000 + Math.random() * 240000;
    }
    applyMarketTrade(assetId, side, usdValue, createMarketAddress());
  }
}

function getTimeframeHistory(assetId, timeframeId) {
  const history = getAssetHistory(assetId);
  const timeframe = TIMEFRAMES.find((item) => item.id === timeframeId) || TIMEFRAMES[2];
  return history.slice(-timeframe.points);
}

function renderSelectors() {
  const balances = getSimulatorAccount().balances;
  const funding = ALL_ASSETS.filter((asset) => asset.id !== state.selectedAssetId && (balances[asset.id] || 0) > 0 && getAssetPriceUsd(asset.id) > 0);
  if (!funding.some((asset) => asset.id === state.selectedFromAssetId)) {
    state.selectedFromAssetId = funding[0]?.id || 'fiat-usd';
  }

  const fromAsset = ALL_ASSETS_BY_ID[state.selectedFromAssetId];
  const toAsset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  dom.fromAssetLabel.textContent = fromAsset ? `${fromAsset.name} (${fromAsset.symbol})` : 'Select funding asset';
  dom.fromAssetHint.textContent = fromAsset ? `${formatAmount(balances[fromAsset.id] || 0)} ${fromAsset.symbol} available` : 'Available balance updates live';
  dom.toAssetLabel.textContent = toAsset ? `${toAsset.name} (${toAsset.symbol})` : 'Selected market';
  dom.toAssetHint.textContent = toAsset ? `${formatTinyUsd(getAssetPriceUsd(toAsset.id))} current mark` : 'Execution follows current market price';
}

function renderTradePreview() {
  const quote = getTradeQuote();
  const fromAsset = ALL_ASSETS_BY_ID[state.selectedFromAssetId];
  const toAsset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  dom.availableBalance.textContent = fromAsset ? `${formatAmount(quote.available)} ${fromAsset.symbol}` : '0';
  dom.tradeRate.textContent = quote.rateText;
  dom.receiveAmount.textContent = toAsset ? `${formatAmount(quote.receiveAmount)} ${toAsset.symbol}` : '0';
  dom.tradeFee.textContent = `${(TRADE_FEE * 100).toFixed(2)}% (${formatUsd(quote.feeUsd)})`;
}

function getFundingAssets() {
  const balances = getSimulatorAccount().balances;
  return ALL_ASSETS.filter((asset) => {
    if (asset.id === state.selectedAssetId) return false;
    if ((balances[asset.id] || 0) <= 0 || getAssetPriceUsd(asset.id) <= 0) return false;
    if (isSolanaTradeAsset(state.selectedAssetId)) {
      return isSolanaTradeAsset(asset.id);
    }
    return true;
  });
}

function openAssetPicker(mode) {
  state.pickerMode = mode;
  const isFunding = mode === 'from';
  dom.assetPickerTitle.textContent = isFunding ? 'Choose Funding Asset' : 'Receive Asset';
  dom.assetPickerSubtitle.textContent = isFunding
    ? 'Pick the asset you want to trade from.'
    : 'The receive side follows the current market.';

  const assets = isFunding ? getFundingAssets() : [ALL_ASSETS_BY_ID[state.selectedAssetId]];
  dom.assetPickerList.innerHTML = assets.map((asset) => {
    const selected = isFunding
      ? asset.id === state.selectedFromAssetId
      : asset.id === state.selectedAssetId;
    const balance = getSimulatorAccount().balances[asset.id] || 0;
    return `
      <button class="picker-item${selected ? ' active' : ''}" type="button" data-picker-asset-id="${asset.id}">
        <div class="picker-item-main">
          ${renderTokenVisual(asset, 'token-logo')}
          <div>
            <strong>${escapeHtml(asset.name)}</strong>
            <span>${escapeHtml(asset.symbol)}</span>
          </div>
        </div>
        <div class="picker-item-side">
          <strong>${isFunding ? `${formatAmount(balance)} ${escapeHtml(asset.symbol)}` : formatTinyUsd(getAssetPriceUsd(asset.id))}</strong>
          <span>${isFunding ? 'Available' : 'Current price'}</span>
        </div>
      </button>
    `;
  }).join('');
  dom.assetPickerModal.classList.remove('hidden');
}

function closeAssetPicker() {
  state.pickerMode = null;
  dom.assetPickerModal.classList.add('hidden');
}

function closeWalletModal() {
  if (state.walletStageTimer) {
    clearTimeout(state.walletStageTimer);
    state.walletStageTimer = null;
  }
  state.pendingTrade = null;
  dom.walletModal.classList.add('hidden');
  dom.walletConfirmState.classList.add('hidden');
  dom.walletLoadingState.classList.remove('hidden');
  dom.walletModalCloseButton.classList.add('hidden');
}

function renderWalletRequest(tradeIntent) {
  const fromAsset = ALL_ASSETS_BY_ID[tradeIntent.fromAssetId];
  const toAsset = ALL_ASSETS_BY_ID[tradeIntent.toAssetId];
  dom.walletRequestSummary.innerHTML = `
    <div class="wallet-request-token">
      ${renderTokenVisual(toAsset)}
      <div>
        <strong>Approve ${escapeHtml(fromAsset.symbol)} and confirm swap</strong>
        <span>${formatAmount(tradeIntent.amount)} ${escapeHtml(fromAsset.symbol)} to ${formatAmount(tradeIntent.quote.receiveAmount)} ${escapeHtml(toAsset.symbol)}</span>
      </div>
    </div>
    <div class="wallet-request-price">
      <strong>${formatUsd(tradeIntent.amount * getAssetPriceUsd(fromAsset.id))}</strong>
      <span>${escapeHtml(formatAddress(getCurrentAccount().address))}</span>
    </div>
  `;
  dom.walletAllowanceValue.textContent = `${formatAmount(tradeIntent.amount)} ${fromAsset.symbol}`;
  dom.walletFeeValue.textContent = formatUsd(tradeIntent.quote.feeUsd);
}

async function openWalletFlow(tradeIntent) {
  state.pendingTrade = tradeIntent;
  dom.walletModal.classList.remove('hidden');
  dom.walletModalSubtitle.textContent = 'Preparing trade';
  dom.walletLoadingTitle.textContent = 'Opening Shadow';
  dom.walletLoadingCopy.textContent = 'Routing request to your wallet extension.';
  dom.walletModalCloseButton.classList.add('hidden');
  dom.walletConfirmState.classList.add('hidden');
  dom.walletLoadingState.classList.remove('hidden');

  await delay(850);
  if (!state.pendingTrade) return;
  dom.walletLoadingTitle.textContent = 'Building contract request';
  dom.walletLoadingCopy.textContent = `Checking allowance for ${ALL_ASSETS_BY_ID[tradeIntent.fromAssetId].symbol}.`;

  await delay(900);
  if (!state.pendingTrade) return;
  dom.walletModalSubtitle.textContent = 'Review request';
  renderWalletRequest(tradeIntent);
  dom.walletLoadingState.classList.add('hidden');
  dom.walletConfirmState.classList.remove('hidden');
  dom.walletModalCloseButton.classList.remove('hidden');
}

async function executeConfirmedTrade() {
  const tradeIntent = state.pendingTrade;
  if (!tradeIntent) return;

  dom.walletModalSubtitle.textContent = 'Confirming';
  dom.walletLoadingTitle.textContent = 'Submitting approval';
  dom.walletLoadingCopy.textContent = 'Awaiting wallet signature.';
  dom.walletConfirmState.classList.add('hidden');
  dom.walletLoadingState.classList.remove('hidden');
  dom.walletModalCloseButton.classList.add('hidden');

  await delay(1150);
  if (!state.pendingTrade) return;
  dom.walletLoadingTitle.textContent = 'Finalizing swap';
  dom.walletLoadingCopy.textContent = `Executing ${ALL_ASSETS_BY_ID[tradeIntent.toAssetId].symbol} purchase.`;

  await delay(950);
  if (!state.pendingTrade) return;

  const balances = getSimulatorAccount().balances;
  balances[tradeIntent.fromAssetId] = Math.max(0, (balances[tradeIntent.fromAssetId] || 0) - tradeIntent.amount);
  if (balances[tradeIntent.fromAssetId] <= 0) delete balances[tradeIntent.fromAssetId];
  balances[tradeIntent.toAssetId] = (balances[tradeIntent.toAssetId] || 0) + tradeIntent.quote.receiveAmount;

  const usdNotional = tradeIntent.amount * getAssetPriceUsd(tradeIntent.fromAssetId);
  applyMarketTrade(tradeIntent.toAssetId, 'buy', usdNotional, getCurrentAccount().address);
  pushAccountActivity({
    label: `${ALL_ASSETS_BY_ID[tradeIntent.fromAssetId].symbol} to ${ALL_ASSETS_BY_ID[tradeIntent.toAssetId].symbol}`,
    details: `${formatAmount(tradeIntent.amount)} ${ALL_ASSETS_BY_ID[tradeIntent.fromAssetId].symbol} swapped for ${formatAmount(tradeIntent.quote.receiveAmount)} ${ALL_ASSETS_BY_ID[tradeIntent.toAssetId].symbol}.`,
    fromAssetId: tradeIntent.fromAssetId,
    toAssetId: tradeIntent.toAssetId
  });

  dom.tradeAmountInput.value = '';
  await saveAll();
  renderPage();
  closeWalletModal();
  showToast('Trade confirmed.');
}

function renderTransactions() {
  const transactions = state.sim.market[state.selectedAssetId]?.transactions || [];
  dom.activityList.innerHTML = transactions.length ? transactions.map((item) => `
    <div class="activity-row">
      <div class="activity-left">
        <div class="trade-side-badge ${item.side === 'buy' ? 'buy' : 'sell'}">${item.side === 'buy' ? 'B' : 'S'}</div>
        <div>
          <strong>${item.side === 'buy' ? 'Buy' : 'Sell'} ${escapeHtml(ALL_ASSETS_BY_ID[state.selectedAssetId].symbol)}</strong>
          <span>${escapeHtml(formatAddress(item.address))}</span>
        </div>
      </div>
      <div class="activity-right">
        <strong>${formatUsd(item.usdValue)}</strong>
        <span>${formatTinyUsd(item.priceUsd)} · ${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  `).join('') : '<div class="empty">No market transactions yet.</div>';
}

function renderMarketProfile() {
  const asset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  const market = state.sim.market[state.selectedAssetId];
  const transactions = market.transactions || [];
  const priceUsd = getAssetPriceUsd(asset.id);
  const solPrice = getAssetPriceUsd('solana') || 1;
  const priceSol = priceUsd / solPrice;
  const liquidity = Math.max(24_000, market.marketCap * 0.14);
  const fdv = Math.max(market.marketCap * 1.02, market.marketCap + 1200);
  const uniqueTraders = new Set(transactions.map((item) => item.address)).size;
  const buys = transactions.filter((item) => item.side === 'buy');
  const sells = transactions.filter((item) => item.side === 'sell');
  const buyVolume = buys.reduce((sum, item) => sum + item.usdValue, 0);
  const sellVolume = sells.reduce((sum, item) => sum + item.usdValue, 0);
  const totalVolume = buyVolume + sellVolume;
  const buyPct = totalVolume ? (buyVolume / totalVolume) * 100 : 50;
  const sellPct = 100 - buyPct;
  const chainLabel = isSolanaTradeAsset(asset.id) ? 'Solana' : 'Multi-chain';
  const venueLabel = isSolanaTradeAsset(asset.id) ? 'Raydium' : 'Shadow Route';
  const protocolLabel = isMemeAsset(asset.id) ? 'CPMM' : 'Orderbook';
  const accent = MEMES_BY_ID[asset.id]?.theme || ['#d7ff64', '#ff8f52'];

  dom.marketProfileCard.innerHTML = `
    <div class="market-profile-head">
      <div class="market-profile-title">
        ${renderTokenVisual(asset)}
        <div>
          <div class="market-profile-name">${escapeHtml(asset.name)}</div>
          <div class="market-profile-symbol">${escapeHtml(asset.symbol)} / SOL</div>
        </div>
      </div>
      <button class="ghost-icon market-profile-menu" type="button" aria-label="Market actions">
        <svg viewBox="0 0 24 24"><path d="M12 5.5v.01"></path><path d="M12 12v.01"></path><path d="M12 18.5v.01"></path></svg>
      </button>
    </div>
    <div class="market-profile-chain-row">
      <span>${escapeHtml(chainLabel)}</span>
      <span>${escapeHtml(venueLabel)}</span>
      <span>${escapeHtml(protocolLabel)}</span>
    </div>
    <div class="market-profile-banner" style="--banner-a:${accent[0]}; --banner-b:${accent[1]};">
      <div class="market-profile-banner-mark">${escapeHtml(asset.symbol)}</div>
      <div>
        <strong>${escapeHtml(asset.name)}</strong>
      </div>
    </div>
    <div class="market-profile-links">
      <button type="button">Website</button>
      <button type="button">Twitter</button>
      <button type="button">Telegram</button>
    </div>
    <div class="market-profile-grid">
      <div class="market-metric-card">
        <span>Price USD</span>
        <strong>${formatTinyUsd(priceUsd)}</strong>
      </div>
      <div class="market-metric-card">
        <span>Price</span>
        <strong>${priceSol.toFixed(priceSol < 0.01 ? 8 : 5)} SOL</strong>
      </div>
      <div class="market-metric-card">
        <span>Liquidity</span>
        <strong>$${formatCompactNumber(liquidity)}</strong>
      </div>
      <div class="market-metric-card">
        <span>FDV</span>
        <strong>$${formatCompactNumber(fdv)}</strong>
      </div>
      <div class="market-metric-card">
        <span>Mkt Cap</span>
        <strong>$${formatCompactNumber(market.marketCap)}</strong>
      </div>
    </div>
    <div class="market-timeframe-strip">
      <div><span>5M</span><strong class="${getAssetTimeframeChange(asset.id, '5m') >= 0 ? 'positive' : 'negative'}">${formatSignedPct(getAssetTimeframeChange(asset.id, '5m'))}</strong></div>
      <div><span>1H</span><strong class="${getAssetTimeframeChange(asset.id, '1h') >= 0 ? 'positive' : 'negative'}">${formatSignedPct(getAssetTimeframeChange(asset.id, '1h'))}</strong></div>
      <div><span>6H</span><strong class="${getAssetTimeframeChange(asset.id, '1d') * 0.5 >= 0 ? 'positive' : 'negative'}">${formatSignedPct(getAssetTimeframeChange(asset.id, '1d') * 0.5)}</strong></div>
      <div><span>24H</span><strong class="${getAssetTimeframeChange(asset.id, '1d') >= 0 ? 'positive' : 'negative'}">${formatSignedPct(getAssetTimeframeChange(asset.id, '1d'))}</strong></div>
    </div>
    <div class="market-flow-grid">
      <div class="market-flow-stat"><span>Txns</span><strong>${formatCompactNumber(transactions.length)}</strong></div>
      <div class="market-flow-stat"><span>Buys</span><strong>${formatCompactNumber(buys.length)}</strong></div>
      <div class="market-flow-stat"><span>Sells</span><strong>${formatCompactNumber(sells.length)}</strong></div>
      <div class="market-flow-stat"><span>Volume</span><strong>$${formatCompactNumber(totalVolume)}</strong></div>
      <div class="market-flow-stat"><span>Buy Vol</span><strong>$${formatCompactNumber(buyVolume)}</strong></div>
      <div class="market-flow-stat"><span>Sell Vol</span><strong>$${formatCompactNumber(sellVolume)}</strong></div>
      <div class="market-flow-stat"><span>Traders</span><strong>${formatCompactNumber(uniqueTraders)}</strong></div>
      <div class="market-flow-stat"><span>Buyers</span><strong>${formatCompactNumber(Math.max(1, Math.round(uniqueTraders * (buyPct / 100))))}</strong></div>
      <div class="market-flow-stat"><span>Sellers</span><strong>${formatCompactNumber(Math.max(1, Math.round(uniqueTraders * (sellPct / 100))))}</strong></div>
    </div>
    <div class="market-flow-bars">
      <div class="market-flow-bar-labels"><span>Buy Pressure</span><strong>${buyPct.toFixed(0)}%</strong></div>
      <div class="market-flow-bar"><span class="buy" style="width:${buyPct.toFixed(2)}%"></span><span class="sell" style="width:${sellPct.toFixed(2)}%"></span></div>
    </div>
  `;
}

function renderPage() {
  const account = getCurrentAccount();
  const asset = ALL_ASSETS_BY_ID[state.selectedAssetId];
  const price = getAssetPriceUsd(asset.id);
  const history = getTimeframeHistory(asset.id, state.activeTimeframe);
  const activeChange = getAssetTimeframeChange(asset.id, state.activeTimeframe);
  const fiveMinute = getAssetTimeframeChange(asset.id, '5m');
  const oneHour = getAssetTimeframeChange(asset.id, '1h');
  const oneDay = getAssetTimeframeChange(asset.id, '1d');
  const oneWeek = getAssetTimeframeChange(asset.id, '1w');
  const oneMonth = getAssetTimeframeChange(asset.id, '1m');
  const market = state.sim.market[asset.id];
  const strokeColor = activeChange >= 0 ? '#7df1c7' : '#ff8b6e';

  dom.accountEmoji.textContent = account.emoji || 'Acct';
  dom.accountName.textContent = account.name || 'Account';

  dom.coinHeader.innerHTML = `
    <div class="coin-meta-left coin-header-block">
      ${renderTokenVisual(asset)}
      <div class="coin-header-copy">
        <div class="detail-name">${escapeHtml(asset.name)}</div>
        <div class="detail-subline">${escapeHtml(asset.symbol)} · Live market</div>
        <div class="coin-header-price ${activeChange >= 0 ? 'positive' : 'negative'}">${formatTinyUsd(price)}</div>
        <div class="coin-header-move ${activeChange >= 0 ? 'positive' : 'negative'}">
          ${formatSignedPct(activeChange)} · ${TIMEFRAMES.find((item) => item.id === state.activeTimeframe)?.label || '5M'}
        </div>
      </div>
    </div>
  `;

  dom.coinTopStats.innerHTML = `
    <div class="chart-modal-stat">
      <span>Price</span>
      <strong class="${activeChange >= 0 ? 'positive' : 'negative'}">${formatTinyUsd(price)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>5M</span>
      <strong class="${fiveMinute >= 0 ? 'positive' : 'negative'}">${formatSignedPct(fiveMinute)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>1H</span>
      <strong class="${oneHour >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneHour)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>1D</span>
      <strong class="${oneDay >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneDay)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>1W</span>
      <strong class="${oneWeek >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneWeek)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>1M</span>
      <strong class="${oneMonth >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneMonth)}</strong>
    </div>
    <div class="chart-modal-stat">
      <span>Volume</span>
      <strong>${formatUsd(market.volume24h)}</strong>
    </div>
  `;

  dom.timeframeRow.querySelectorAll('[data-timeframe]').forEach((button) => {
    button.classList.toggle('active', button.dataset.timeframe === state.activeTimeframe);
  });
  dom.chartModeRow.querySelectorAll('[data-chart-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.chartMode === state.chartMode);
  });

  dom.coinChart.innerHTML = buildDetailedChart(history, strokeColor, state.activeTimeframe, state.chartMode);
  dom.coinDetailStats.innerHTML = `
    <div class="detail-stat">
      <div class="detail-label">Price</div>
      <strong>${formatTinyUsd(price)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">Balance</div>
      <strong>${formatAmount(getSimulatorAccount().balances[asset.id] || 0)} ${escapeHtml(asset.symbol)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">24H</div>
      <strong class="${oneDay >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneDay)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">Mkt Cap</div>
      <strong>${formatUsd(market.marketCap)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">1W</div>
      <strong class="${oneWeek >= 0 ? 'positive' : 'negative'}">${formatSignedPct(oneWeek)}</strong>
    </div>
    <div class="detail-stat">
      <div class="detail-label">Last Trade</div>
      <strong>${market.transactions[0] ? formatUsd(market.transactions[0].usdValue) : '-'}</strong>
    </div>
  `;

  renderMarketProfile();
  renderSelectors();
  renderTradePreview();
  renderTransactions();
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
    ensureMarketEntries();
    await saveAll();
    renderPage();
    if (!silent) showToast('Prices refreshed.');
  } catch {
    if (!silent) showToast('Unable to refresh prices right now.');
  }
}

async function submitTrade(event) {
  event.preventDefault();
  const amount = parseAmountInput(dom.tradeAmountInput.value);
  const quote = getTradeQuote();
  const fromAssetId = state.selectedFromAssetId;
  const toAssetId = state.selectedAssetId;

  if (!amount || amount <= 0) {
    showToast('Enter a trade amount.');
    return;
  }
  if (amount > quote.available) {
    showToast(`Only ${formatAmount(quote.available)} ${ALL_ASSETS_BY_ID[fromAssetId]?.symbol || fromAssetId} available.`);
    return;
  }
  if (!quote.valid || !quote.receiveAmount) {
    showToast('Trade quote unavailable.');
    return;
  }
  if (isSolanaTradeAsset(toAssetId) && !isSolanaTradeAsset(fromAssetId)) {
    showToast('Solana coins can only be bought with SOL or another held Solana coin.');
    return;
  }
  await openWalletFlow({
    amount,
    quote,
    fromAssetId,
    toAssetId
  });
}

async function tickMarket() {
  generateRandomMarketTrades(state.selectedAssetId);
  renderPage();
  await saveAll();
}

function bindEvents() {
  dom.backToMarketsButton.addEventListener('click', () => {
    window.location.href = new URL('index.html', window.location.href).toString();
  });

  dom.refreshButton.addEventListener('click', () => syncPrices());

  dom.copyAddressButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getCurrentAccount().address);
      showToast('Wallet address copied.');
    } catch {
      showToast('Unable to copy address.');
    }
  });

  dom.timeframeRow.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-timeframe]');
    if (!button) return;
    state.activeTimeframe = button.dataset.timeframe;
    renderPage();
  });
  dom.chartModeRow.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-chart-mode]');
    if (!button) return;
    state.chartMode = button.dataset.chartMode;
    renderPage();
  });

  dom.fromAssetPickerButton.addEventListener('click', () => openAssetPicker('from'));
  dom.toAssetPickerButton.addEventListener('click', () => openAssetPicker('to'));

  dom.assetPickerCloseButton.addEventListener('click', closeAssetPicker);
  dom.assetPickerBackdrop.addEventListener('click', closeAssetPicker);
  dom.assetPickerList.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-picker-asset-id]');
    if (!button) return;
    const assetId = button.getAttribute('data-picker-asset-id');
    if (!assetId) return;
    if (state.pickerMode === 'from') {
      state.selectedFromAssetId = assetId;
      renderSelectors();
      renderTradePreview();
    }
    closeAssetPicker();
  });

  dom.tradeAmountInput.addEventListener('input', () => {
    dom.tradeAmountInput.value = sanitizeDecimal(dom.tradeAmountInput.value);
    renderTradePreview();
  });

  dom.maxTradeButton.addEventListener('click', () => {
    dom.tradeAmountInput.value = String(Number((getSimulatorAccount().balances[state.selectedFromAssetId] || 0).toFixed(6)));
    renderTradePreview();
  });

  document.querySelectorAll('[data-quick-amount]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedFromAssetId = 'fiat-usd';
      dom.tradeAmountInput.value = button.dataset.quickAmount || '0';
      renderPage();
    });
  });

  dom.tradeForm.addEventListener('submit', submitTrade);
  dom.walletRejectButton.addEventListener('click', () => {
    closeWalletModal();
    showToast('Trade rejected.');
  });
  dom.walletApproveButton.addEventListener('click', () => {
    executeConfirmedTrade().catch(() => {
      closeWalletModal();
      showToast('Unable to complete trade right now.');
    });
  });
  dom.walletModalCloseButton.addEventListener('click', () => {
    closeWalletModal();
    showToast('Trade cancelled.');
  });
  dom.walletModalBackdrop.addEventListener('click', () => {
    if (!dom.walletConfirmState.classList.contains('hidden')) {
      closeWalletModal();
      showToast('Trade cancelled.');
    }
  });
  dom.accountSwitcherButton.addEventListener('click', () => showToast('Switch accounts from the Shadow wallet popup.'));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dom.assetPickerModal.classList.contains('hidden')) {
      closeAssetPicker();
    }
    if (event.key === 'Escape' && !dom.walletModal.classList.contains('hidden') && !dom.walletConfirmState.classList.contains('hidden')) {
      closeWalletModal();
      showToast('Trade cancelled.');
    }
  });
}

async function initialize() {
  const params = new URLSearchParams(window.location.search);
  const requestedAsset = params.get('asset');
  const requestedTimeframe = params.get('tf');
  const [wallet, prices, sim] = await Promise.all([
    storageGet(STORAGE_KEY),
    storageGet(PRICE_KEY),
    storageGet(SIM_STORAGE_KEY)
  ]);

  state.wallet = migrateWalletShape(wallet || createDefaultWallet());
  state.wallet.currentAccountId = state.wallet.currentAccountId || state.wallet.accounts[0].id;
  state.prices = prices || {};
  state.sim = migrateSimState(sim);
  state.selectedAssetId = ALL_ASSETS_BY_ID[requestedAsset] && !FIAT_ASSETS.some((asset) => asset.id === requestedAsset) ? requestedAsset : 'solana';
  state.activeTimeframe = TIMEFRAMES.some((item) => item.id === requestedTimeframe) ? requestedTimeframe : '5m';

  ensureMarketEntries();
  syncWalletAccountFromSimulator();
  bindEvents();
  renderPage();

  if (!Object.keys(state.prices).length) {
    await syncPrices({ silent: true });
  } else {
    await saveAll();
  }

  if (state.marketTimer) clearInterval(state.marketTimer);
  state.marketTimer = setInterval(() => {
    tickMarket().catch(() => {});
  }, MARKET_TICK_MS);
}

window.addEventListener('beforeunload', () => {
  if (state.marketTimer) clearInterval(state.marketTimer);
  if (state.walletStageTimer) clearTimeout(state.walletStageTimer);
});

initialize();
