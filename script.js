const STORAGE_KEYS = {
  records: "bulkUpTrackerRecords",
  meals: "bulkUpTrackerMeals",
  presets: "bulkUpTrackerFoodPresets",
  purchases: "bulkUpTrackerPurchases",
  settings: "bulkUpTrackerSettings",
  monthlyGoals: "bulkUpTrackerMonthlyGoals",
  importedHistory: "bulkUpTrackerImportedHistory"
};

const SUPABASE_URL = "https://jgzrwnrnvmpvdsgdhupc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnenJ3bnJudm1wdmRzZ2RodXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDc1MjcsImV4cCI6MjA5NDUyMzUyN30.ZyiXX1B7YTtXjLZPkL3vgj7SmxEQwjJIuYVqBrEgzws";
const CLOUD_TABLE = "tracker_data";

const DEFAULT_GOALS = {
  goalWeight: 75,
  monthlyBudget: 45000,
  goalBench: 100,
  goalPullUps: 10
};

const IMPORTED_HISTORY = {
  records: [
    { id: "xlsx-record-2026-04-14", date: "2026-04-14", weight: 70.2, benchPress: 40, pullUps: 0, memo: "ベンチ 10x3 / Start" },
    { id: "xlsx-record-2026-04-15", date: "2026-04-15", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-16", date: "2026-04-16", weight: 0, benchPress: 40, pullUps: 0, memo: "ベンチ 10x3" },
    { id: "xlsx-record-2026-04-17", date: "2026-04-17", weight: 0, benchPress: 0, pullUps: 0, memo: "TOPIK＋駐車場" },
    { id: "xlsx-record-2026-04-18", date: "2026-04-18", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-19", date: "2026-04-19", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-20", date: "2026-04-20", weight: 0, benchPress: 0, pullUps: 0, memo: "日焼け止めと洗剤買った" },
    { id: "xlsx-record-2026-04-21", date: "2026-04-21", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-22", date: "2026-04-22", weight: 70.4, benchPress: 35, pullUps: 1, memo: "ベンチ 10x3" },
    { id: "xlsx-record-2026-04-23", date: "2026-04-23", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-24", date: "2026-04-24", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-25", date: "2026-04-25", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-26", date: "2026-04-26", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-27", date: "2026-04-27", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-28", date: "2026-04-28", weight: 71.6, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-04-29", date: "2026-04-29", weight: 0, benchPress: 0, pullUps: 0, memo: "5日分食べ物まとめ買い" },
    { id: "xlsx-record-2026-04-30", date: "2026-04-30", weight: 0, benchPress: 50, pullUps: 2, memo: "ベンチ 5 / 夜食べる前に寝てしまった" },
    { id: "xlsx-record-2026-05-01", date: "2026-05-01", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-05-02", date: "2026-05-02", weight: 0, benchPress: 0, pullUps: 0, memo: "" },
    { id: "xlsx-record-2026-05-03", date: "2026-05-03", weight: 0, benchPress: 0, pullUps: 0, memo: "" }
  ],
  meals: [
    { id: "xlsx-meal-2026-04-15", date: "2026-04-15", type: "1日合計", name: "Excel記録の合計", calories: 3532, protein: 0 },
    { id: "xlsx-meal-2026-04-16", date: "2026-04-16", type: "1日合計", name: "Excel記録の合計", calories: 3660, protein: 147 },
    { id: "xlsx-meal-2026-04-17", date: "2026-04-17", type: "1日合計", name: "Excel記録の合計", calories: 2923, protein: 122 },
    { id: "xlsx-meal-2026-04-18", date: "2026-04-18", type: "1日合計", name: "Excel記録の合計", calories: 3220, protein: 118 },
    { id: "xlsx-meal-2026-04-19", date: "2026-04-19", type: "1日合計", name: "Excel記録の合計", calories: 3587, protein: 155 },
    { id: "xlsx-meal-2026-04-20", date: "2026-04-20", type: "1日合計", name: "Excel記録の合計", calories: 3450, protein: 110 },
    { id: "xlsx-meal-2026-04-21", date: "2026-04-21", type: "1日合計", name: "Excel記録の合計", calories: 3340, protein: 105 },
    { id: "xlsx-meal-2026-04-22", date: "2026-04-22", type: "1日合計", name: "Excel記録の合計", calories: 3450, protein: 156 },
    { id: "xlsx-meal-2026-04-23", date: "2026-04-23", type: "1日合計", name: "Excel記録の合計", calories: 3620, protein: 126.9 },
    { id: "xlsx-meal-2026-04-24", date: "2026-04-24", type: "1日合計", name: "Excel記録の合計", calories: 3750, protein: 138 },
    { id: "xlsx-meal-2026-04-25", date: "2026-04-25", type: "1日合計", name: "Excel記録の合計", calories: 3877, protein: 149 },
    { id: "xlsx-meal-2026-04-26", date: "2026-04-26", type: "1日合計", name: "Excel記録の合計", calories: 3713, protein: 143 },
    { id: "xlsx-meal-2026-04-27", date: "2026-04-27", type: "1日合計", name: "Excel記録の合計", calories: 4031, protein: 107 },
    { id: "xlsx-meal-2026-04-28", date: "2026-04-28", type: "1日合計", name: "Excel記録の合計", calories: 3838, protein: 168.7 },
    { id: "xlsx-meal-2026-04-29", date: "2026-04-29", type: "1日合計", name: "Excel記録の合計", calories: 2848, protein: 101.5 },
    { id: "xlsx-meal-2026-04-30", date: "2026-04-30", type: "1日合計", name: "Excel記録の合計", calories: 2610, protein: 122 },
    { id: "xlsx-meal-2026-05-01", date: "2026-05-01", type: "1日合計", name: "Excel記録の合計", calories: 3320, protein: 164 },
    { id: "xlsx-meal-2026-05-02", date: "2026-05-02", type: "1日合計", name: "Excel記録の合計", calories: 3767, protein: 149.5 },
    { id: "xlsx-meal-2026-05-03", date: "2026-05-03", type: "1日合計", name: "Excel記録の合計", calories: 3618, protein: 146 }
  ],
  purchases: [
    { id: "xlsx-purchase-food-2026-04-17", date: "2026-04-17", category: "食費", amount: 2348, memo: "" },
    { id: "xlsx-purchase-other-2026-04-17", date: "2026-04-17", category: "その他", amount: 20000, memo: "TOPIK＋駐車場" },
    { id: "xlsx-purchase-food-2026-04-18", date: "2026-04-18", category: "食費", amount: 1030, memo: "" },
    { id: "xlsx-purchase-food-2026-04-19", date: "2026-04-19", category: "食費", amount: 1863, memo: "" },
    { id: "xlsx-purchase-food-2026-04-20", date: "2026-04-20", category: "食費", amount: 2700, memo: "日焼け止めと洗剤買った" },
    { id: "xlsx-purchase-food-2026-04-21", date: "2026-04-21", category: "食費", amount: 2584, memo: "" },
    { id: "xlsx-purchase-food-2026-04-22", date: "2026-04-22", category: "食費", amount: 2200, memo: "" },
    { id: "xlsx-purchase-food-2026-04-23", date: "2026-04-23", category: "食費", amount: 2036, memo: "" },
    { id: "xlsx-purchase-food-2026-04-24", date: "2026-04-24", category: "食費", amount: 1500, memo: "" },
    { id: "xlsx-purchase-food-2026-04-25", date: "2026-04-25", category: "食費", amount: 2838, memo: "" },
    { id: "xlsx-purchase-food-2026-04-26", date: "2026-04-26", category: "食費", amount: 2373, memo: "" },
    { id: "xlsx-purchase-food-2026-04-27", date: "2026-04-27", category: "食費", amount: 2700, memo: "" },
    { id: "xlsx-purchase-food-2026-04-28", date: "2026-04-28", category: "食費", amount: 1980, memo: "" },
    { id: "xlsx-purchase-food-2026-04-29", date: "2026-04-29", category: "食費", amount: 6000, memo: "5日分食べ物まとめ買い" },
    { id: "xlsx-purchase-tobacco-2026-04-29", date: "2026-04-29", category: "たばこ", amount: 620, memo: "" },
    { id: "xlsx-purchase-tobacco-2026-05-01", date: "2026-05-01", category: "たばこ", amount: 620, memo: "" },
    { id: "xlsx-purchase-food-2026-05-02", date: "2026-05-02", category: "食費", amount: 940, memo: "" },
    { id: "xlsx-purchase-food-2026-05-03", date: "2026-05-03", category: "食費", amount: 1200, memo: "" },
    { id: "xlsx-purchase-tobacco-2026-05-03", date: "2026-05-03", category: "たばこ", amount: 620, memo: "" }
  ]
};

const LIST_LIMIT = 5;
const MEAL_TYPE_ORDER = ["朝食", "昼食", "夕食", "間食", "プロテイン"];

const state = {
  records: readStorage(STORAGE_KEYS.records, []),
  meals: readStorage(STORAGE_KEYS.meals, []),
  presets: readStorage(STORAGE_KEYS.presets, []),
  purchases: readStorage(STORAGE_KEYS.purchases, []),
  legacySettings: readStorage(STORAGE_KEYS.settings, {}),
  monthlyGoals: readStorage(STORAGE_KEYS.monthlyGoals, {}),
  goalMonth: calendarMonthKeyForDate(todayString()),
  listFilters: {
    details: { month: calendarMonthKeyForDate(todayString()) }
  },
  detailView: "daily",
  detailTabs: {},
  expandedLists: {
    details: false,
    presets: false
  },
  charts: {},
  user: null,
  syncReady: false,
  syncBusy: false
};

const $ = (selector) => document.querySelector(selector);
const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
let supabaseClient = null;
let cloudSaveTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  seedPresets();
  seedImportedHistory();
  seedCurrentGoal();
  setDefaultDates();
  bindEvents();
  initSupabase();
  hydrateGoalForm();
  renderAll();
});

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage() {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(state.records));
  localStorage.setItem(STORAGE_KEYS.meals, JSON.stringify(state.meals));
  localStorage.setItem(STORAGE_KEYS.presets, JSON.stringify(state.presets));
  localStorage.setItem(STORAGE_KEYS.purchases, JSON.stringify(state.purchases));
  localStorage.setItem(STORAGE_KEYS.monthlyGoals, JSON.stringify(state.monthlyGoals));
  queueCloudSave();
}

function seedPresets() {
  if (state.presets.length) return;
  state.presets = [
    { id: crypto.randomUUID(), name: "白米 300g", calories: 468, protein: 7.5 },
    { id: crypto.randomUUID(), name: "鶏むね肉 200g", calories: 216, protein: 44.6 },
    { id: crypto.randomUUID(), name: "プロテイン 1杯", calories: 120, protein: 24 }
  ];
  writeStorage();
}

function seedImportedHistory() {
  let changed = false;
  changed = mergeById(state.records, IMPORTED_HISTORY.records) || changed;
  changed = mergeById(state.meals, IMPORTED_HISTORY.meals) || changed;
  changed = mergeById(state.purchases, IMPORTED_HISTORY.purchases) || changed;
  if (changed) writeStorage();
  localStorage.setItem(STORAGE_KEYS.importedHistory, "bench-tracker-final-v2");
}

function seedCurrentGoal() {
  const month = calendarMonthKeyForDate(todayString());
  if (state.monthlyGoals[month]) return;
  state.monthlyGoals[month] = { ...DEFAULT_GOALS, ...state.legacySettings };
  writeStorage();
}

function mergeById(target, source) {
  const existingIds = new Set(target.map((item) => item.id));
  const additions = source.filter((item) => !existingIds.has(item.id));
  target.push(...additions);
  return additions.length > 0;
}

function setDefaultDates() {
  const today = todayString();
  $("#mealDate").value = today;
  $("#recordDate").value = today;
  $("#purchaseDate").value = today;
}

function bindEvents() {
  $("#mealForm").addEventListener("submit", saveMeal);
  $("#dailyForm").addEventListener("submit", saveRecord);
  $("#purchaseForm").addEventListener("submit", savePurchase);
  $("#presetForm").addEventListener("submit", savePreset);
  $("#goalForm").addEventListener("submit", saveGoal);
  $("#mealDate").addEventListener("change", renderDailyDetails);
  $("#presetSelect").addEventListener("change", applyPresetToMeal);
  $("#exportJsonBtn").addEventListener("click", exportJson);
  $("#exportCsvBtn").addEventListener("click", exportCsv);
  $("#importJsonInput").addEventListener("change", importJson);
  $("#loginBtn").addEventListener("click", loginWithEmail);
  $("#logoutBtn").addEventListener("click", logout);
  $("#syncNowBtn").addEventListener("click", () => loadCloudData({ merge: true, silent: false }));

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.jump).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-toggle-list]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.toggleList;
      state.expandedLists[key] = !state.expandedLists[key];
      renderAll();
    });
  });

  document.querySelectorAll("[data-page-target]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.pageTarget));
  });

  document.querySelectorAll("[data-input-mode]").forEach((button) => {
    button.addEventListener("click", () => switchInputMode(button.dataset.inputMode));
  });

  document.querySelectorAll("[data-detail-view]").forEach((button) => {
    button.addEventListener("click", () => switchDetailView(button.dataset.detailView));
  });

  document.querySelectorAll("[data-list-month]").forEach((select) => {
    select.addEventListener("change", () => {
      const key = select.dataset.listMonth;
      state.listFilters[key].month = select.value;
      renderAll();
    });
  });

  $("#goalMonth").addEventListener("change", () => {
    state.goalMonth = $("#goalMonth").value;
    hydrateGoalForm();
  });
}

async function initSupabase() {
  if (!window.supabase) {
    setSyncStatus("Local");
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  state.syncReady = true;

  const { data } = await supabaseClient.auth.getSession();
  await applySession(data.session);

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    applySession(session);
  });
}

async function applySession(session) {
  state.user = session?.user || null;
  renderAuthState();

  if (state.user) {
    await loadCloudData({ merge: true, silent: true });
  } else {
    setSyncStatus(state.syncReady ? "Local" : "Local");
  }
}

function renderAuthState() {
  const signedIn = Boolean(state.user);
  $("#authEmail").hidden = signedIn;
  $("#loginBtn").hidden = signedIn;
  $("#syncNowBtn").hidden = !signedIn;
  $("#logoutBtn").hidden = !signedIn;
  if (signedIn) {
    $("#authEmail").value = state.user.email || "";
  }
}

async function loginWithEmail() {
  if (!supabaseClient) {
    toast("Supabaseを読み込めませんでした");
    return;
  }

  const email = $("#authEmail").value.trim();
  if (!email) {
    toast("メールアドレスを入力してください");
    return;
  }

  setSyncStatus("Login mail");
  const redirectTo = window.location.href.split("#")[0];
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
  });

  if (error) {
    setSyncStatus("Login error");
    toast("ログインメールの送信に失敗しました");
    return;
  }

  setSyncStatus("Check mail");
  toast("ログインメールを送信しました");
}

async function logout() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  state.user = null;
  renderAuthState();
  setSyncStatus("Local");
  toast("ログアウトしました");
}

function hydrateGoalForm() {
  renderGoalMonthOptions();
  const goals = goalsForMonth(state.goalMonth);
  Object.entries(goals).forEach(([key, value]) => {
    const input = $(`#${key}`);
    if (input) input.value = value;
  });
  $("#goalMonth").value = state.goalMonth;
}

function saveMeal(event) {
  event.preventDefault();
  const meal = {
    id: crypto.randomUUID(),
    date: $("#mealDate").value,
    type: $("#mealType").value,
    name: $("#foodName").value.trim(),
    calories: numberValue("calories"),
    protein: numberValue("protein")
  };
  state.meals.push(meal);
  writeStorage();
  $("#mealForm").reset();
  $("#mealDate").value = meal.date;
  $("#presetSelect").value = "";
  renderAll();
  toast("食事を追加しました");
}

function saveRecord(event) {
  event.preventDefault();
  const date = $("#recordDate").value;
  const existingIndex = state.records.findIndex((record) => record.date === date);
  const record = {
    id: existingIndex >= 0 ? state.records[existingIndex].id : crypto.randomUUID(),
    date,
    weight: numberValue("weight"),
    benchPress: numberValue("benchPress"),
    pullUps: numberValue("pullUps"),
    memo: $("#memo").value.trim()
  };

  if (existingIndex >= 0) {
    state.records[existingIndex] = record;
  } else {
    state.records.push(record);
  }

  writeStorage();
  $("#dailyForm").reset();
  $("#recordDate").value = date;
  renderAll();
  toast("日別記録を保存しました");
}

function savePreset(event) {
  event.preventDefault();
  const id = $("#presetId").value || crypto.randomUUID();
  const preset = {
    id,
    name: $("#presetName").value.trim(),
    calories: numberValue("presetCalories"),
    protein: numberValue("presetProtein")
  };
  const index = state.presets.findIndex((item) => item.id === id);
  if (index >= 0) {
    state.presets[index] = preset;
  } else {
    state.presets.push(preset);
  }
  writeStorage();
  $("#presetForm").reset();
  $("#presetId").value = "";
  renderAll();
  toast("プリセットを保存しました");
}

function applyPresetToMeal() {
  const preset = state.presets.find((item) => item.id === $("#presetSelect").value);
  if (!preset) return;
  $("#foodName").value = preset.name;
  $("#calories").value = preset.calories;
  $("#protein").value = preset.protein;
}

function savePurchase(event) {
  event.preventDefault();
  const purchase = {
    id: crypto.randomUUID(),
    date: $("#purchaseDate").value,
    category: $("#purchaseCategory").value,
    amount: numberValue("purchaseAmount"),
    memo: $("#purchaseMemo").value.trim()
  };
  state.purchases.push(purchase);
  writeStorage();
  $("#purchaseForm").reset();
  $("#purchaseDate").value = purchase.date;
  renderAll();
  toast("買い物を追加しました");
}

function saveGoal(event) {
  event.preventDefault();
  const month = $("#goalMonth").value;
  state.goalMonth = month;
  state.monthlyGoals[month] = {
    goalWeight: numberValue("goalWeight"),
    monthlyBudget: numberValue("monthlyBudget"),
    goalBench: numberValue("goalBench"),
    goalPullUps: numberValue("goalPullUps")
  };
  writeStorage();
  renderAll();
  toast("目標を保存しました");
}

function renderAll() {
  sortState();
  renderListFilters();
  renderGoalMonthOptions();
  renderDashboard();
  renderTodayPreview();
  renderPresets();
  renderDailyDetails();
  renderCharts();
}

function renderListFilters() {
  Object.entries(state.listFilters).forEach(([key, filter]) => {
    const months = availableMonthsForList(key);
    if (!months.includes(filter.month)) {
      filter.month = months[0] || defaultMonthForList(key);
    }

    const monthSelect = document.querySelector(`[data-list-month="${key}"]`);
    if (!monthSelect) return;

    monthSelect.innerHTML = months
      .map((month) => `<option value="${month}">${formatListMonthLabel(key, month)}</option>`)
      .join("");
    monthSelect.value = filter.month;
  });
}

function renderGoalMonthOptions() {
  const select = $("#goalMonth");
  if (!select) return;
  const months = availableGoalMonths();
  if (!months.includes(state.goalMonth)) {
    state.goalMonth = calendarMonthKeyForDate(todayString());
  }
  select.innerHTML = months
    .map((month) => `<option value="${month}">${formatCalendarMonthLabel(month)}</option>`)
    .join("");
  select.value = state.goalMonth;
}

function sortState() {
  state.records.sort((a, b) => b.date.localeCompare(a.date));
  state.meals.sort((a, b) => b.date.localeCompare(a.date));
  state.purchases.sort((a, b) => b.date.localeCompare(a.date));
}

function availableMonthsForList(key) {
  const itemsByKey = {
    details: [...state.meals, ...state.purchases, ...state.records]
  };
  const items = itemsByKey[key] || [];
  const months = [...new Set(items.map((item) => calendarMonthKeyForDate(item.date)).filter(Boolean))].sort().reverse();
  return months.length ? months : [defaultMonthForList(key)];
}

function availableGoalMonths() {
  const months = new Set([
    calendarMonthKeyForDate(todayString()),
    ...Object.keys(state.monthlyGoals),
    ...state.records.map((record) => calendarMonthKeyForDate(record.date)),
    ...state.meals.map((meal) => calendarMonthKeyForDate(meal.date))
  ].filter(Boolean));
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  months.add(calendarMonthKeyForDate(dateStringFromParts(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1)));
  return [...months].sort().reverse();
}

function goalsForMonth(month) {
  return { ...DEFAULT_GOALS, ...state.legacySettings, ...(state.monthlyGoals[month] || {}) };
}

function filterBySelectedMonth(key, items) {
  const filter = state.listFilters[key];
  if (!filter) return items;
  return items.filter((item) => item.date?.startsWith(filter.month));
}

function visibleListItems(key, items) {
  return state.expandedLists[key] ? items : items.slice(0, LIST_LIMIT);
}

function renderListFooter(key, total, visible, statusId) {
  const status = $(`#${statusId}`);
  const button = document.querySelector(`[data-toggle-list="${key}"]`);
  const hidden = Math.max(total - visible, 0);
  status.textContent = total === 0
    ? "表示する記録はありません"
    : `${visible} / ${total} 件を表示`;
  button.textContent = state.expandedLists[key] ? "5件まで閉じる" : "全部一覧を開く";
  button.disabled = total === 0;
  if (hidden === 0 && !state.expandedLists[key]) {
    status.textContent = total === 0 ? "表示する記録はありません" : `${total} 件を表示`;
  }
}

function renderDashboard() {
  const today = todayString();
  const billingMonth = billingMonthKeyForDate(today);
  const goalMonth = calendarMonthKeyForDate(today);
  const goals = goalsForMonth(goalMonth);
  const todayMeals = state.meals.filter((meal) => meal.date === today);
  const todayPurchases = state.purchases.filter((purchase) => purchase.date === today);
  const monthPurchases = state.purchases.filter((purchase) => isInBillingPeriod(purchase.date, billingMonth));
  const latest = [...state.records].filter((record) => record.weight).sort((a, b) => b.date.localeCompare(a.date))[0];
  const bestBench = Math.max(0, ...state.records.map((record) => record.benchPress || 0));
  const bestPullUps = Math.max(0, ...state.records.map((record) => record.pullUps || 0));
  const todayTotals = sumMeals(todayMeals);
  const foodCost = sum(monthPurchases.filter((purchase) => purchase.category === "食費"), "amount");
  const tobaccoCost = sum(monthPurchases.filter((purchase) => purchase.category === "たばこ"), "amount");
  const totalCost = sum(monthPurchases, "amount");
  const todayExpense = sum(todayPurchases, "amount");
  const todayFood = sum(todayPurchases.filter((purchase) => purchase.category === "食費"), "amount");
  const todayTobacco = sum(todayPurchases.filter((purchase) => purchase.category === "たばこ"), "amount");
  const todayOther = todayExpense - todayFood - todayTobacco;
  const budgetRemain = goals.monthlyBudget - foodCost;

  $("#todayCalories").textContent = `${round(todayTotals.calories)} kcal`;
  $("#todayProtein").textContent = `P ${round(todayTotals.protein)}g`;
  $("#todayExpense").textContent = yen.format(todayExpense);
  $("#todayExpenseDetail").textContent = `食費 ${yen.format(todayFood)} / たばこ ${yen.format(todayTobacco)} / その他 ${yen.format(todayOther)}`;
  $("#monthFoodCost").textContent = yen.format(foodCost);
  $("#budgetStatus").textContent = `残り ${yen.format(budgetRemain)}`;
  $("#latestWeight").textContent = latest ? `${latest.weight} kg` : "- kg";
  $("#weightDiff").textContent = latest ? `目標まで ${round(goals.goalWeight - latest.weight)} kg` : "目標まで - kg";
  $("#strengthSummary").textContent = `${bestBench || "-"} kg / ${bestPullUps || "-"} 回`;
  $("#strengthGoalSummary").textContent = `目標 ${goals.goalBench}kg / ${goals.goalPullUps}回`;
  $("#monthTotalCost").textContent = yen.format(totalCost);
  $("#currentMonthLabel").textContent = formatBillingPeriodLabel(billingMonth);
}

function renderTodayPreview() {
  const today = todayString();
  const todayMeals = state.meals
    .filter((meal) => meal.date === today)
    .sort((a, b) => mealTypeRank(a.type) - mealTypeRank(b.type));
  const todayPurchases = state.purchases.filter((purchase) => purchase.date === today);
  const todayRecords = state.records.filter((record) => record.date === today);

  $("#todayPreviewDate").textContent = today;
  $("#todayMealTable").innerHTML = todayMeals.length ? todayMeals.map((meal) => `
    <tr>
      <td>${escapeHtml(meal.type)}</td>
      <td>${escapeHtml(meal.name)}</td>
      <td>${round(meal.calories)}</td>
      <td>${round(meal.protein)}</td>
    </tr>
  `).join("") : emptyRow(4);

  $("#todayPurchaseTable").innerHTML = todayPurchases.length ? todayPurchases.map((purchase) => `
    <tr>
      <td>${escapeHtml(purchase.category)}</td>
      <td>${yen.format(purchase.amount || 0)}</td>
      <td>${escapeHtml(purchase.memo || "")}</td>
    </tr>
  `).join("") : emptyRow(3);

  $("#todayRecordTable").innerHTML = todayRecords.length ? todayRecords.map((record) => `
    <tr>
      <td>${record.weight || ""}</td>
      <td>${record.benchPress || ""}</td>
      <td>${record.pullUps || ""}</td>
      <td>${escapeHtml(record.memo || "")}</td>
    </tr>
  `).join("") : emptyRow(4);
}

function switchPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle("active", isActive);
    page.hidden = !isActive;
  });
  document.querySelectorAll("[data-page-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.pageTarget === pageId);
  });
  if (pageId === "detailPage") {
    renderListFilters();
    renderPresets();
    renderDailyDetails();
    renderCharts();
  }
}

function switchInputMode(formId) {
  document.querySelectorAll(".input-mode-panel").forEach((panel) => {
    const isActive = panel.id === formId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
  document.querySelectorAll("[data-input-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.inputMode === formId);
  });
}

function switchDetailView(viewId) {
  state.detailView = viewId;
  document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
    const isActive = panel.dataset.detailPanel === viewId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
  document.querySelectorAll("[data-detail-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.detailView === viewId);
  });
  if (viewId === "charts") {
    renderCharts();
  }
}

function renderPresets() {
  $("#presetSelect").innerHTML = `<option value="">手入力</option>` + state.presets
    .map((preset) => `<option value="${preset.id}">${escapeHtml(preset.name)}</option>`)
    .join("");

  const visiblePresets = visibleListItems("presets", state.presets);

  $("#presetTable").innerHTML = visiblePresets.length ? visiblePresets.map((preset) => `
    <tr>
      <td>${escapeHtml(preset.name)}</td>
      <td>${round(preset.calories)}</td>
      <td>${round(preset.protein)}</td>
      <td class="row-actions">
        <button class="icon-btn" data-edit-preset="${preset.id}">編集</button>
        <button class="icon-btn danger-btn" data-delete-preset="${preset.id}">削除</button>
      </td>
    </tr>
  `).join("") : emptyRow(4, "食品プリセットはまだありません");
  renderListFooter("presets", state.presets.length, visiblePresets.length, "presetListStatus");

  document.querySelectorAll("[data-edit-preset]").forEach((button) => {
    button.addEventListener("click", () => editPreset(button.dataset.editPreset));
  });
  document.querySelectorAll("[data-delete-preset]").forEach((button) => {
    button.addEventListener("click", () => deletePreset(button.dataset.deletePreset));
  });
}

function renderDailyDetails() {
  const month = state.listFilters.details.month;
  const filteredMeals = filterBySelectedMonth("details", state.meals);
  const filteredPurchases = filterBySelectedMonth("details", state.purchases);
  const filteredRecords = filterBySelectedMonth("details", state.records);
  const dates = [...new Set([
    ...filteredMeals.map((meal) => meal.date),
    ...filteredPurchases.map((purchase) => purchase.date),
    ...filteredRecords.map((record) => record.date)
  ])].filter(Boolean).sort().reverse();
  const visibleDates = visibleListItems("details", dates);

  $("#dailyDetailList").innerHTML = visibleDates.length
    ? visibleDates.map((date) => renderDailyDetailGroup({
      date,
      meals: filteredMeals.filter((meal) => meal.date === date),
      purchases: filteredPurchases.filter((purchase) => purchase.date === date),
      records: filteredRecords.filter((record) => record.date === date)
    })).join("")
    : `<p class="empty-state">${formatCalendarMonthLabel(month)}の入力記録はありません</p>`;
  renderDayListFooter(dates.length, visibleDates.length);

  document.querySelectorAll("[data-delete-purchase]").forEach((button) => {
    button.addEventListener("click", () => deletePurchase(button.dataset.deletePurchase));
  });
  document.querySelectorAll("[data-delete-meal]").forEach((button) => {
    button.addEventListener("click", () => deleteMeal(button.dataset.deleteMeal));
  });

  document.querySelectorAll("[data-edit-record]").forEach((button) => {
    button.addEventListener("click", () => editRecord(button.dataset.editRecord));
  });
  document.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", () => deleteRecord(button.dataset.deleteRecord));
  });
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailTabs[button.dataset.detailDate] = button.dataset.detailTab;
      renderDailyDetails();
    });
  });
}

function renderDailyDetailGroup({ date, meals, purchases, records }) {
  const mealTotals = sumMeals(meals);
  const purchaseTotal = sum(purchases, "amount");
  const record = records[0];
  const tabs = [
    { key: "meals", label: "食事", count: meals.length },
    { key: "purchases", label: "買い物", count: purchases.length },
    { key: "records", label: "記録", count: records.length }
  ];
  const activeTab = tabs.some((tab) => tab.key === state.detailTabs[date])
    ? state.detailTabs[date]
    : tabs.find((tab) => tab.count > 0)?.key || "meals";

  return `
    <article class="daily-detail-group">
      <header class="daily-detail-header">
        <div>
          <h3>${date}</h3>
        </div>
      </header>
      <div class="daily-summary-row">
        <div class="daily-summary-metrics">
          <span><strong>${round(mealTotals.calories)}</strong> kcal</span>
          <span><strong>P ${round(mealTotals.protein)}</strong> g</span>
          <span><strong>${yen.format(purchaseTotal)}</strong> 支出</span>
          <span><strong>${record?.weight || "-"}</strong> kg</span>
        </div>
        <div class="daily-tab-buttons" role="tablist" aria-label="${date}の入力カテゴリー">
          ${tabs.map((tab) => `
            <button class="icon-btn${activeTab === tab.key ? " active" : ""}" type="button" data-detail-date="${date}" data-detail-tab="${tab.key}">
              ${tab.label}<span>${tab.count}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="daily-category-grid">
        <section class="daily-category${activeTab === "meals" ? " active" : ""}">
          ${meals.length ? `
            <div class="table-wrap compact">
              <table>
                <thead><tr><th>区分</th><th>食品</th><th>kcal</th><th>P</th><th></th></tr></thead>
                <tbody>${meals
                  .sort((a, b) => mealTypeRank(a.type) - mealTypeRank(b.type))
                  .map((meal) => `
                    <tr>
                      <td>${escapeHtml(meal.type)}</td>
                      <td>${escapeHtml(meal.name)}</td>
                      <td>${round(meal.calories)}</td>
                      <td>${round(meal.protein)}</td>
                      <td><button class="icon-btn danger-btn" data-delete-meal="${meal.id}">削除</button></td>
                    </tr>
                  `).join("")}</tbody>
              </table>
            </div>
          ` : `<p class="category-empty">食事なし</p>`}
        </section>
        <section class="daily-category${activeTab === "purchases" ? " active" : ""}">
          ${purchases.length ? `
            <div class="table-wrap compact">
              <table>
                <thead><tr><th>カテゴリー</th><th>金額</th><th>内容</th><th></th></tr></thead>
                <tbody>${purchases.map((purchase) => `
                  <tr>
                    <td>${escapeHtml(purchase.category)}</td>
                    <td>${yen.format(purchase.amount || 0)}</td>
                    <td>${escapeHtml(purchase.memo || "")}</td>
                    <td><button class="icon-btn danger-btn" data-delete-purchase="${purchase.id}">削除</button></td>
                  </tr>
                `).join("")}</tbody>
              </table>
            </div>
          ` : `<p class="category-empty">買い物なし</p>`}
        </section>
        <section class="daily-category${activeTab === "records" ? " active" : ""}">
          ${record ? `
            <div class="table-wrap compact">
              <table>
                <thead><tr><th>体重</th><th>ベンチ</th><th>懸垂</th><th>メモ</th><th></th></tr></thead>
                <tbody>
                  <tr>
                    <td>${record.weight || ""}</td>
                    <td>${record.benchPress || ""}</td>
                    <td>${record.pullUps || ""}</td>
                    <td>${escapeHtml(record.memo || "")}</td>
                    <td class="row-actions">
                      <button class="icon-btn" data-edit-record="${record.id}">編集</button>
                      <button class="icon-btn danger-btn" data-delete-record="${record.id}">削除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ` : `<p class="category-empty">記録なし</p>`}
        </section>
      </div>
    </article>
  `;
}

function renderDayListFooter(total, visible) {
  const status = $("#detailListStatus");
  const button = document.querySelector('[data-toggle-list="details"]');
  status.textContent = total === 0
    ? "表示する記録はありません"
    : state.expandedLists.details || total === visible
      ? `${total} 日を表示`
      : `${visible} / ${total} 日を表示`;
  button.textContent = state.expandedLists.details ? "5日まで閉じる" : "全部一覧を開く";
  button.disabled = total === 0;
}

function renderCharts() {
  const labels = [...new Set([
    ...state.records.map((record) => record.date),
    ...state.meals.map((meal) => meal.date),
    ...state.purchases.map((purchase) => purchase.date)
  ])].sort().slice(-30);
  const mealByDate = labels.map((date) => sumMeals(state.meals.filter((meal) => meal.date === date)));
  const recordByDate = labels.map((date) => state.records.find((record) => record.date === date) || {});
  const purchaseByDate = labels.map((date) => sum(state.purchases.filter((purchase) => purchase.date === date), "amount"));

  drawChart("weightChart", "体重 kg", labels, recordByDate.map((record) => record.weight || null), "#21c7a8");
  drawChart("calorieChart", "摂取 kcal", labels, mealByDate.map((meal) => meal.calories), "#f0b429");
  drawChart("costChart", "支出 円", labels, purchaseByDate, "#6ea8fe");
}

function drawChart(canvasId, label, labels, data, color) {
  if (!window.Chart) return;
  if (state.charts[canvasId]) state.charts[canvasId].destroy();
  const context = $(`#${canvasId}`);
  state.charts[canvasId] = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        fill: true,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#f7fbff" } } },
      scales: {
        x: { ticks: { color: "#9fb2c7" }, grid: { color: "#203752" } },
        y: { ticks: { color: "#9fb2c7" }, grid: { color: "#203752" } }
      }
    }
  });
}

function editPreset(id) {
  const preset = state.presets.find((item) => item.id === id);
  if (!preset) return;
  $("#presetId").value = preset.id;
  $("#presetName").value = preset.name;
  $("#presetCalories").value = preset.calories;
  $("#presetProtein").value = preset.protein;
  $("#presetName").focus();
}

function deletePreset(id) {
  state.presets = state.presets.filter((item) => item.id !== id);
  writeStorage();
  renderAll();
}

function editRecord(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  switchPage("mainPage");
  switchInputMode("dailyForm");
  $("#recordDate").value = record.date;
  $("#weight").value = record.weight || "";
  $("#benchPress").value = record.benchPress || "";
  $("#pullUps").value = record.pullUps || "";
  $("#memo").value = record.memo || "";
  $("#dailyForm").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deletePurchase(id) {
  state.purchases = state.purchases.filter((item) => item.id !== id);
  writeStorage();
  renderAll();
}

function deleteRecord(id) {
  state.records = state.records.filter((item) => item.id !== id);
  writeStorage();
  renderAll();
}

function deleteMeal(id) {
  state.meals = state.meals.filter((item) => item.id !== id);
  writeStorage();
  renderAll();
}

function currentPayload() {
  return {
    records: state.records,
    meals: state.meals,
    presets: state.presets,
    purchases: state.purchases,
    settings: state.legacySettings,
    monthlyGoals: state.monthlyGoals
  };
}

function applyPayload(data) {
  state.records = Array.isArray(data.records) ? data.records : [];
  state.meals = Array.isArray(data.meals) ? data.meals : [];
  state.presets = Array.isArray(data.presets) ? data.presets : [];
  state.purchases = Array.isArray(data.purchases) ? data.purchases : [];
  state.legacySettings = { ...state.legacySettings, ...(data.settings || {}) };
  state.monthlyGoals = data.monthlyGoals || {};
}

function mergePayload(base, incoming) {
  return {
    records: mergeItems(base.records, incoming.records),
    meals: mergeItems(base.meals, incoming.meals),
    presets: mergeItems(base.presets, incoming.presets),
    purchases: mergeItems(base.purchases, incoming.purchases),
    settings: { ...(base.settings || {}), ...(incoming.settings || {}) },
    monthlyGoals: { ...(base.monthlyGoals || {}), ...(incoming.monthlyGoals || {}) }
  };
}

function mergeItems(base = [], incoming = []) {
  const itemsById = new Map();
  [...base, ...incoming].forEach((item) => {
    if (!item?.id) return;
    itemsById.set(item.id, item);
  });
  return [...itemsById.values()];
}

function queueCloudSave() {
  if (!state.user || !supabaseClient) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => saveCloudData({ silent: true }), 500);
}

async function saveCloudData({ silent = false } = {}) {
  if (!state.user || !supabaseClient || state.syncBusy) return;
  state.syncBusy = true;
  setSyncStatus("Saving");

  const { error } = await supabaseClient
    .from(CLOUD_TABLE)
    .upsert({
      user_id: state.user.id,
      data: currentPayload(),
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

  state.syncBusy = false;
  if (error) {
    setSyncStatus("Sync error");
    if (!silent) toast("クラウド保存に失敗しました");
    return;
  }

  setSyncStatus("Synced");
  if (!silent) toast("クラウドに保存しました");
}

async function loadCloudData({ merge = true, silent = false } = {}) {
  if (!state.user || !supabaseClient || state.syncBusy) return;
  state.syncBusy = true;
  setSyncStatus("Loading");

  const { data, error } = await supabaseClient
    .from(CLOUD_TABLE)
    .select("data")
    .eq("user_id", state.user.id)
    .maybeSingle();

  if (error) {
    state.syncBusy = false;
    setSyncStatus("Sync error");
    if (!silent) toast("クラウド読み込みに失敗しました");
    return;
  }

  const shouldMerge = merge && !hasCloudMigration(state.user.id);
  const nextPayload = data?.data
    ? shouldMerge
      ? mergePayload(data.data, currentPayload())
      : data.data
    : currentPayload();

  applyPayload(nextPayload);
  writeStorage();
  markCloudMigration(state.user.id);
  hydrateGoalForm();
  renderAll();
  state.syncBusy = false;
  await saveCloudData({ silent: true });
  if (!silent) toast("同期しました");
}

function cloudMigrationKey(userId) {
  return `${STORAGE_KEYS.importedHistory}:cloud:${userId}`;
}

function hasCloudMigration(userId) {
  return localStorage.getItem(cloudMigrationKey(userId)) === "1";
}

function markCloudMigration(userId) {
  localStorage.setItem(cloudMigrationKey(userId), "1");
}

function setSyncStatus(label) {
  const status = $("#syncStatus");
  if (status) status.textContent = label;
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    ...currentPayload()
  };
  download("bulk-up-tracker.json", JSON.stringify(payload, null, 2), "application/json");
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      applyPayload(data);
      writeStorage();
      hydrateGoalForm();
      renderAll();
      toast("JSONをインポートしました");
    } catch {
      toast("JSONの読み込みに失敗しました");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function exportCsv() {
  const rows = [
    ["type", "date", "category", "name", "amount", "calories", "protein", "weight", "benchPress", "pullUps", "memo"],
    ...state.meals.map((meal) => ["meal", meal.date, meal.type, meal.name, "", meal.calories, meal.protein, "", "", "", ""]),
    ...state.records.map((record) => ["record", record.date, "", "", "", "", "", record.weight, record.benchPress, record.pullUps, record.memo]),
    ...state.purchases.map((purchase) => ["purchase", purchase.date, purchase.category, "", purchase.amount, "", "", "", "", "", purchase.memo])
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  download("bulk-up-tracker.csv", csv, "text/csv;charset=utf-8");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function sumMeals(meals) {
  return meals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0),
    protein: acc.protein + (meal.protein || 0)
  }), { calories: 0, protein: 0 });
}

function mealTypeRank(type) {
  const index = MEAL_TYPE_ORDER.indexOf(type);
  return index >= 0 ? index : MEAL_TYPE_ORDER.length;
}

function sum(items, key) {
  return items.reduce((total, item) => total + (Number(item[key]) || 0), 0);
}

function emptyRow(colspan, message = "今日の入力はありません") {
  return `<tr><td colspan="${colspan}">${message}</td></tr>`;
}

function numberValue(id) {
  return Number($(`#${id}`).value) || 0;
}

function todayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthLabel(month) {
  const [year, monthNumber] = month.split("-");
  return `${year}年${Number(monthNumber)}月`;
}

function formatCalendarMonthLabel(month) {
  return formatMonthLabel(month);
}

function formatBillingPeriodLabel(month) {
  const start = billingPeriodStart(month);
  const end = billingPeriodEnd(month);
  return `${formatMonthLabel(month)}（${formatShortDate(start)}〜${formatShortDate(end)}）`;
}

function formatListMonthLabel(key, month) {
  return formatCalendarMonthLabel(month);
}

function defaultMonthForList(key) {
  return calendarMonthKeyForDate(todayString());
}

function calendarMonthKeyForDate(dateString) {
  return dateString ? dateString.slice(0, 7) : "";
}

function billingMonthKeyForDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1, day);
  if (day < 16) {
    date.setMonth(date.getMonth() - 1);
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isInBillingPeriod(dateString, month) {
  if (!dateString || !month) return false;
  return dateString >= billingPeriodStart(month) && dateString <= billingPeriodEnd(month);
}

function billingPeriodStart(month) {
  const [year, monthNumber] = month.split("-").map(Number);
  return dateStringFromParts(year, monthNumber, 16);
}

function billingPeriodEnd(month) {
  const [year, monthNumber] = month.split("-").map(Number);
  const date = new Date(year, monthNumber, 15);
  return dateStringFromParts(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function formatShortDate(dateString) {
  const [, month, day] = dateString.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function dateStringFromParts(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function round(value) {
  return Math.round((Number(value) || 0) * 10) / 10;
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
}
