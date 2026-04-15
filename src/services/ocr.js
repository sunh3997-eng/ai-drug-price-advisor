/**
 * Mock OCR 服务 - 模拟处方单药品识别
 * 生产环境替换为腾讯云 OCR API
 */

const MOCK_PRESCRIPTIONS = [
  {
    drugs: [
      { name: '阿莫西林胶囊', spec: '0.5g×24粒', dosage: '每次1粒，每日3次', category: '抗生素' },
      { name: '布洛芬缓释胶囊', spec: '0.3g×20粒', dosage: '每次1粒，每日2次', category: '解热镇痛' },
      { name: '蒙脱石散', spec: '3g×10袋', dosage: '每次1袋，每日3次', category: '止泻' },
    ],
    confidence: 0.95,
  },
  {
    drugs: [
      { name: '二甲双胍缓释片', spec: '0.5g×30片', dosage: '每次1片，每日2次', category: '降糖药' },
      { name: '阿卡波糖片', spec: '50mg×30片', dosage: '每次1片，每日3次', category: '降糖药' },
      { name: '缬沙坦胶囊', spec: '80mg×7粒', dosage: '每次1粒，每日1次', category: '降压药' },
    ],
    confidence: 0.92,
  },
  {
    drugs: [
      { name: '奥美拉唑肠溶胶囊', spec: '20mg×14粒', dosage: '每次1粒，每日1次', category: '胃药' },
      { name: '多潘立酮片', spec: '10mg×30片', dosage: '每次1片，每日3次', category: '促胃动力' },
      { name: '铝碳酸镁咀嚼片', spec: '0.5g×30片', dosage: '每次2片，每日3次', category: '抗酸药' },
    ],
    confidence: 0.88,
  },
];

function recognizePrescription(imageBase64) {
  // Mock: randomly select a prescription
  const idx = Math.floor(Math.random() * MOCK_PRESCRIPTIONS.length);
  const result = MOCK_PRESCRIPTIONS[idx];
  
  return {
    success: true,
    data: {
      drugs: result.drugs,
      confidence: result.confidence,
      scan_time: new Date().toISOString(),
      note: '⚠️ 当前为 Mock 模式，实际部署需接入腾讯云 OCR API',
    },
  };
}

module.exports = { recognizePrescription };
