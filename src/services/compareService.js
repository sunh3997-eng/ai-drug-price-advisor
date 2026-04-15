/**
 * Mock price comparison service.
 * In production, integrate with 美团买药API、京东健康API、药品数据库 etc.
 */

const PLATFORM_PRICES = {
  '阿莫西林胶囊': [
    { platform: '美团买药', price: 12.8, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 11.5, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 15.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 13.2, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '布洛芬缓释胶囊': [
    { platform: '美团买药', price: 8.9, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 7.5, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 10.5, delivery: '到店自取', stock: false, url: '#' },
    { platform: '阿里健康', price: 9.0, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '头孢克肟颗粒': [
    { platform: '美团买药', price: 22.5, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 19.9, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 25.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 21.0, delivery: '2小时送达', stock: false, url: '#' },
  ],
  '盐酸二甲双胍片': [
    { platform: '美团买药', price: 6.5, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 5.8, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 8.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 6.2, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '阿托伐他汀钙片': [
    { platform: '美团买药', price: 35.0, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 29.9, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 42.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 32.5, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '感冒灵颗粒': [
    { platform: '美团买药', price: 9.8, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 8.5, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 11.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 9.2, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '连花清瘟胶囊': [
    { platform: '美团买药', price: 28.5, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 25.0, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 32.0, delivery: '到店自取', stock: false, url: '#' },
    { platform: '阿里健康', price: 27.8, delivery: '2小时送达', stock: true, url: '#' },
  ],
  '维生素C片': [
    { platform: '美团买药', price: 5.5, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: 4.9, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: 7.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: 5.2, delivery: '2小时送达', stock: true, url: '#' },
  ],
};

function DEFAULT_PRICES(name) {
  const base = 10 + (name.charCodeAt(0) % 30);
  return [
    { platform: '美团买药', price: base + 1.2, delivery: '30分钟送达', stock: true, url: '#' },
    { platform: '京东健康', price: base - 0.5, delivery: '次日达', stock: true, url: '#' },
    { platform: '线下药房', price: base + 4.0, delivery: '到店自取', stock: true, url: '#' },
    { platform: '阿里健康', price: base + 2.0, delivery: '2小时送达', stock: false, url: '#' },
  ];
}

function comparePrices(medicineNames) {
  const results = medicineNames.map(name => {
    const prices = (PLATFORM_PRICES[name] || DEFAULT_PRICES(name)).map(p => ({
      ...p,
      // Add slight random variation to simulate live pricing
      price: +(p.price + (Math.random() - 0.5) * 0.5).toFixed(1),
    }));

    const available = prices.filter(p => p.stock);
    const cheapest = available.length
      ? available.reduce((a, b) => (a.price < b.price ? a : b))
      : null;

    return {
      medicine: name,
      prices,
      recommendation: cheapest
        ? { platform: cheapest.platform, price: cheapest.price, reason: '有货且价格最低' }
        : { platform: null, price: null, reason: '暂无有货平台' },
    };
  });

  const totalMin = results.reduce((sum, r) => sum + (r.recommendation.price || 0), 0);

  return {
    results,
    summary: {
      total_min_price: +totalMin.toFixed(1),
      advice: `共识别 ${medicineNames.length} 种药品，按推荐平台购买合计约 ¥${totalMin.toFixed(1)}，可节省约 ¥${(totalMin * 0.15).toFixed(1)}`,
    },
  };
}

module.exports = { comparePrices };
