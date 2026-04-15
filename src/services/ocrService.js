/**
 * Mock OCR service - simulates AI prescription recognition.
 * In production, replace with real OCR API (e.g. Tesseract, Azure Vision, 腾讯OCR).
 */

const MOCK_PRESCRIPTIONS = [
  {
    medicines: [
      { name: '阿莫西林胶囊', spec: '0.25g', quantity: '24粒', dosage: '每次2粒，每日3次' },
      { name: '布洛芬缓释胶囊', spec: '300mg', quantity: '20粒', dosage: '每次1粒，每日2次' },
      { name: '头孢克肟颗粒', spec: '50mg', quantity: '12袋', dosage: '每次1袋，每日2次' },
    ],
  },
  {
    medicines: [
      { name: '盐酸二甲双胍片', spec: '0.5g', quantity: '60片', dosage: '每次1片，每日3次' },
      { name: '阿托伐他汀钙片', spec: '20mg', quantity: '14片', dosage: '每次1片，每日1次' },
    ],
  },
  {
    medicines: [
      { name: '感冒灵颗粒', spec: '10g', quantity: '10袋', dosage: '每次1袋，每日3次' },
      { name: '连花清瘟胶囊', spec: '0.35g', quantity: '24粒', dosage: '每次4粒，每日3次' },
      { name: '维生素C片', spec: '100mg', quantity: '100片', dosage: '每次2片，每日3次' },
    ],
  },
];

function recognizePrescription(base64Image) {
  // Simulate processing delay and pick a mock result based on image size
  const idx = base64Image ? base64Image.length % MOCK_PRESCRIPTIONS.length : 0;
  const result = MOCK_PRESCRIPTIONS[idx];

  return {
    success: true,
    confidence: (0.88 + Math.random() * 0.1).toFixed(2),
    medicines: result.medicines,
    raw_text: result.medicines.map(m => `${m.name} ${m.spec} x${m.quantity} 用法：${m.dosage}`).join('\n'),
  };
}

module.exports = { recognizePrescription };
