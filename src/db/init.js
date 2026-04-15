const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/reminders.json');

function initDB() {
  // Ensure data dir exists
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  // Load or init
  let data = { reminders: [], nextId: 1 };
  if (fs.existsSync(DB_PATH)) {
    try { data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); } catch {}
  }

  const save = () => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  return {
    all() { return data.reminders; },
    get(id) { return data.reminders.find(r => r.id === id); },
    insert(reminder) {
      const r = { id: data.nextId++, ...reminder, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      data.reminders.push(r);
      save();
      return r;
    },
    update(id, fields) {
      const idx = data.reminders.findIndex(r => r.id === id);
      if (idx === -1) return null;
      data.reminders[idx] = { ...data.reminders[idx], ...fields, updated_at: new Date().toISOString() };
      save();
      return data.reminders[idx];
    },
    remove(id) {
      const idx = data.reminders.findIndex(r => r.id === id);
      if (idx === -1) return false;
      data.reminders.splice(idx, 1);
      save();
      return true;
    },
  };
}

module.exports = { initDB };
