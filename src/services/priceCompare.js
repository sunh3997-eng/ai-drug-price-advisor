/**
 * Mock 比价服务 - 模拟多平台药品价格查询
 * 生产环境替换为真实爬虫/API
 */

const PRICE_DATABASE = {
  '阿莫西林胶囊': {
    meituan: { price: 12.80, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 9.90, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 15.50, stock: true, delivery: '到店自取', shop: '海王星辰' },
    ali: { price: 11.20, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '布洛芬缓释胶囊': {
    meituan: { price: 18.50, stock: true, delivery: '30分钟送达', shop: '海王星辰' },
    jd: { price: 15.80, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 22.00, stock: true, delivery: '到店自取', shop: '老百姓大药房' },
    ali: { price: 16.50, stock: false, delivery: '-', shop: '阿里健康' },
  },
  '蒙脱石散': {
    meituan: { price: 25.00, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 21.50, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 28.00, stock: true, delivery: '到店自取', shop: '益丰大药房' },
    ali: { price: 22.80, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '二甲双胍缓释片': {
    meituan: { price: 35.00, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 28.90, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 32.00, stock: true, delivery: '到店自取', shop: '大参林' },
    ali: { price: 30.50, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '阿卡波糖片': {
    meituan: { price: 68.00, stock: true, delivery: '30分钟送达', shop: '海王星辰' },
    jd: { price: 59.90, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 75.00, stock: true, delivery: '到店自取', shop: '老百姓大药房' },
    ali: { price: 62.00, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '缬沙坦胶囊': {
    meituan: { price: 42.50, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 38.00, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 45.00, stock: true, delivery: '到店自取', shop: '益丰大药房' },
    ali: { price: 39.90, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '奥美拉唑肠溶胶囊': {
    meituan: { price: 28.00, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 22.50, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 30.00, stock: true, delivery: '到店自取', shop: '海王星辰' },
    ali: { price: 24.80, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '多潘立酮片': {
    meituan: { price: 22.00, stock: true, delivery: '30分钟送达', shop: '海王星辰' },
    jd: { price: 18.50, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 25.00, stock: true, delivery: '到店自取', shop: '大参林' },
    ali: { price: 19.90, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
  '铝碳酸镁咀嚼片': {
    meituan: { price: 32.00, stock: true, delivery: '30分钟送达', shop: '叮当快药' },
    jd: { price: 26.80, stock: true, delivery: '次日达', shop: '京东大药房' },
    offline: { price: 35.00, stock: true, delivery: '到店自取', shop: '老百姓大药房' },
    ali: { price: 28.50, stock: true, delivery: '次日达', shop: '阿里健康' },
  },
};

function comparePrices(drugNames) {
  const results = drugNames.map(name => {
    const prices = PRICE_DATABASE[name];
    if (!prices) {
      return {
        drug_name: name,
        found: false,
        platforms: [],
        recommendation: '未收录该药品',
      };
    }

    const platforms = Object.entries(prices).map(([platform, info]) => ({
      platform: getPlatformName(platform),
      platform_id: platform,
      ...info,
    }));

    // Sort by price
    const available = platforms.filter(p => p.stock).sort((a, b) => a.price - b.price);
    const cheapest = available[0];
    const mostExpensive = available[available.length - 1];
    const savings = mostExpensive ? (mostExpensive.price - cheapest.price).toFixed(2) : '0';

    return {
      drug_name: name,
      found: true,
      platforms,
      recommendation: cheapest 
        ? `推荐在${cheapest.platform}购买（¥${cheapest.price}），比最贵渠道省 ¥${savings}`
        : '暂无库存',
      lowest_price: cheapest?.price,
      highest_price: mostExpensive?.price,
    };
  });

  // Calculate total savings
  const totalLowest = results.reduce((sum, r) => sum + (r.lowest_price || 0), 0);
  const totalHighest = results.reduce((sum, r) => sum + (r.highest_price || 0), 0);

  return {
    success: true,
    data: {
      drugs: results,
      summary: {
        total_drugs: drugNames.length,
        found: results.filter(r => r.found).length,
        total_lowest: totalLowest.toFixed(2),
        total_highest: totalHighest.toFixed(2),
        max_savings: (totalHighest - totalLowest).toFixed(2),
      },
      query_time: new Date().toISOString(),
      note: '⚠️ Mock 数据，实际价格以各平台为准',
    },
  };
}

function getPlatformName(id) {
  const names = {
    meituan: '美团买药',
    jd: '京东健康',
    offline: '线下药房',
    ali: '阿里健康',
  };
  return names[id] || id;
}

module.exports = { comparePrices };
