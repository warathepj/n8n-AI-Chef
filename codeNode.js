// Get the first item input (assumes 1 item with .text field)
const inputText = items[0].json.text;

// Use regex or splitting to extract each menu block
const menus = inputText.split('## เมนูที่ ').slice(1); // split into 2 menus (skip before first menu)

// Process each menu block
const output = menus.map(menuText => {
  const lines = menuText.split('\n').map(line => line.trim()).filter(Boolean);
  const menu = {};

  // Extract menu number and name
  const menuHeader = lines.shift();
  menu.menuNumber = parseInt(menuHeader.split(':')[0]);
  menu.menuName = (lines.shift() || '').replace('### ชื่อเมนู: ', '');

  // Sections we're expecting
  const sections = {
    '### ส่วนผสม:': 'ingredients',
    '### สิ่งที่ต้องซื้อเพิ่ม:': 'toBuy',
    '### ขั้นตอนการทำโดยย่อ:': 'steps'
  };

  let currentSection = '';
  menu.ingredients = [];
  menu.toBuy = [];
  menu.steps = [];

  for (const line of lines) {
    if (sections[line]) {
      currentSection = sections[line];
    } else {
      if (currentSection === 'steps') {
        // Remove number and space from steps
        const step = line.replace(/^\d+\.\s*/, '');
        menu.steps.push(step);
      } else if (currentSection) {
        // Remove list markers like "*"
        const item = line.replace(/^[*•\-]\s*/, '');
        menu[currentSection].push(item);
      }
    }
  }

  return { json: menu };
});

return output;
