(() => {
  const number = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
  const dollars = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const moneyGel = value => `${number.format(value)} ₾`;
  const moneyUsd = (value, decimals = false) => {
    const formatted = decimals ? dollars.format(Math.abs(value)) : number.format(Math.abs(value));
    return `${value < 0 ? '-' : ''}$${formatted}`;
  };
  const readNonnegative = (input, limit = 1000000) => {
    const value = Number.parseFloat(input.value);
    return Number.isFinite(value) ? Math.max(0, Math.min(limit, value)) : 0;
  };
  const ordersLabel = value => {
    const category = new Intl.PluralRules('ru-RU').select(value);
    return `${number.format(value)} ${category === 'one' ? 'заказ' : category === 'few' ? 'заказа' : 'заказов'}`;
  };

  const ops = document.querySelector('.ops-demo-tool');
  if (ops) {
    const inputs = Object.fromEntries(['orders', 'price', 'cogs', 'cost', 'fixed'].map(key => [key, ops.querySelector(`[data-demo-input="${key}"]`)]));
    const results = Object.fromEntries(['revenue', 'cogs', 'expenses', 'fixed', 'balance', 'margin', 'breakEven', 'unitContribution'].map(key => [key, ops.querySelector(`[data-demo-result="${key}"]`)]));
    const bars = Object.fromEntries(['revenue', 'expenses'].map(key => [key, ops.querySelector(`[data-demo-bar="${key}"]`)]));
    const chartValues = Object.fromEntries(['revenue', 'expenses'].map(key => [key, ops.querySelector(`[data-demo-chart-value="${key}"]`)]));
    const total = ops.querySelector('.ops-tool-total');
    const meter = ops.querySelector('[data-demo-meter]');

    if (Object.values(inputs).every(Boolean) && Object.values(results).every(Boolean) && Object.values(bars).every(Boolean) && Object.values(chartValues).every(Boolean) && total && meter) {
      const calculateOperations = () => {
        const orders = Math.floor(readNonnegative(inputs.orders, 100000));
        const price = readNonnegative(inputs.price);
        const unitCost = readNonnegative(inputs.cogs);
        const additionalUnitCost = readNonnegative(inputs.cost);
        const fixed = readNonnegative(inputs.fixed);

        const revenue = orders * price;
        const cogs = orders * unitCost;
        const expenses = orders * additionalUnitCost;
        const allExpenses = cogs + expenses + fixed;
        const balance = revenue - allExpenses;
        const contributionPerOrder = price - unitCost - additionalUnitCost;
        const margin = revenue > 0 ? 100 * balance / revenue : null;
        const maxBarValue = Math.max(1, revenue, allExpenses);

        results.revenue.textContent = moneyGel(revenue);
        results.cogs.textContent = moneyGel(cogs);
        results.expenses.textContent = moneyGel(expenses);
        results.fixed.textContent = moneyGel(fixed);
        results.balance.textContent = moneyGel(balance);
        results.margin.textContent = margin === null ? 'Маржа: нет выручки' : `${number.format(margin)}% от выручки`;
        results.unitContribution.textContent = contributionPerOrder > 0
          ? `С заказа остаётся ${moneyGel(contributionPerOrder)} до постоянных расходов`
          : contributionPerOrder < 0
            ? `Каждый заказ приносит ${moneyGel(-contributionPerOrder)} убытка ещё до постоянных расходов`
            : 'Каждый заказ покрывает только свои переменные расходы';
        const breakEven = contributionPerOrder > 0 ? Math.ceil(fixed / contributionPerOrder) : fixed === 0 && contributionPerOrder === 0 ? 0 : null;
        results.breakEven.textContent = breakEven === null ? 'Не достигается' : ordersLabel(breakEven);

        total.classList.toggle('is-negative', balance < 0);
        meter.style.width = `${Math.min(100, Math.max(0, margin ?? 0))}%`;
        bars.revenue.style.width = `${revenue / maxBarValue * 100}%`;
        bars.expenses.style.width = `${allExpenses / maxBarValue * 100}%`;
        chartValues.revenue.textContent = moneyGel(revenue);
        chartValues.expenses.textContent = moneyGel(allExpenses);
      };
      Object.values(inputs).forEach(input => input.addEventListener('input', calculateOperations));
      calculateOperations();
    }
  }

  const mono = document.querySelector('[data-mono-calculator]');
  if (mono) {
    const inputs = Object.fromEntries(['balance', 'obligations', 'reserve'].map(key => [key, mono.querySelector(`[data-mono-input="${key}"]`)]));
    const result = mono.querySelector('[data-mono-result]');
    const status = mono.querySelector('[data-mono-status]');
    const segments = Object.fromEntries(['obligations', 'reserve', 'available'].map(key => [key, mono.querySelector(`[data-mono-segment="${key}"]`)]));
    const phone = document.querySelector('.mono-card-phone');
    const phoneValue = document.querySelector('[data-mono-phone-value]');
    const phoneReserve = document.querySelector('[data-mono-phone-reserve]');
    if (Object.values(inputs).every(Boolean) && Object.values(segments).every(Boolean) && result && status && phone && phoneValue && phoneReserve) {
      const calculateMono = () => {
        const balance = readNonnegative(inputs.balance, 100000000);
        const obligations = readNonnegative(inputs.obligations, 100000000);
        const reserve = readNonnegative(inputs.reserve, 100000000);
        const free = balance - obligations - reserve;
        const shortage = free < 0;

        result.textContent = moneyUsd(free);
        phoneValue.textContent = moneyUsd(free, true);
        phoneReserve.textContent = moneyUsd(reserve);
        status.textContent = shortage
          ? `Платежи и резервы превышают доступную сумму на ${moneyUsd(-free)}`
          : 'Остаток после обязательных платежей и резерва';
        mono.classList.toggle('is-deficit', shortage);
        phone.classList.toggle('is-deficit', shortage);

        const obligationPercent = balance > 0 ? Math.min(100, obligations / balance * 100) : 0;
        const reservePercent = balance > 0 ? Math.min(100 - obligationPercent, reserve / balance * 100) : 0;
        segments.obligations.style.width = `${obligationPercent}%`;
        segments.reserve.style.width = `${reservePercent}%`;
        segments.available.style.width = `${Math.max(0, 100 - obligationPercent - reservePercent)}%`;
      };
      Object.values(inputs).forEach(input => input.addEventListener('input', calculateMono));
      calculateMono();
    }
  }
})();
