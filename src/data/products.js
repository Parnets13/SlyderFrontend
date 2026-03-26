import pr1 from '../assets/pr1.png'
import pr2 from '../assets/pr2.png'
import pr3 from '../assets/pr3.jpg'
import pr4 from '../assets/pr4.png'
import pr5 from '../assets/pr5.png'
import cor1 from '../assets/cor1.png'
import cor2 from '../assets/cor2.jpg'

export const products = [
  {
    slug: 'slyder-hotel-lock',
    name: 'Slyder Hotel Lock',
    category: 'Hotel Lock',
    image: pr1,
    descType: 'bullets',
    description: [
      'RFID Mifare card technology for secure access',
      'Compatible with 30mm door thickness',
      'Real-time Transaction Alert SMS feature',
      'Durable zinc alloy body with anti-corrosion finish',
      'Low battery indicator and emergency power input',
      'Easy installation with standard door preparation',
    ],
  },
  {
    slug: 'rfid-reader',
    name: 'Made in India RFID Reader',
    category: 'RFID Reader',
    image: pr2,
    descType: 'table',
    specs: [
      { spec: 'Model', desc: 'SLY-RFID-01' },
      { spec: 'Item', desc: 'RFID Reader and Writer' },
      { spec: 'Interface', desc: 'USB Full Speed' },
      { spec: 'Operating Frequency', desc: '13.56 MHz' },
      { spec: 'Supply Current', desc: '200mA (operating); 50mA (Standby)' },
      { spec: 'Dimension', desc: '98mm(L)*65mm(W)*12.8mm(H)' },
      { spec: 'Software', desc: 'Supporting' },
      { spec: 'Weight', desc: '70g' },
    ],
  },
  {
    slug: 'lock-management-software',
    name: 'Lock Management Software',
    category: 'Software',
    image: pr3,
    descType: 'bullets',
    description: [
      "India's first hotel Lock RFID management software",
      'Centralized control and real-time monitoring',
      'Transaction Alert SMS notifications',
      'Multi-user access with role-based permissions',
      'Detailed audit logs and reporting',
      'Compatible with all Slyder hotel lock models',
    ],
  },
  {
    slug: 'encoder',
    name: 'Encoder',
    category: 'Encoder',
    image: pr4,
    descType: 'table',
    specs: [
      { spec: 'Model', desc: 'ACR122U' },
      { spec: 'Item', desc: 'NFC Reader and Writer' },
      { spec: 'Interface', desc: 'USB Full Speed' },
      { spec: 'Operating Frequency', desc: '13.56 MHz' },
      { spec: 'Supply Current', desc: '200mA (operating); 50mA (Standby)' },
      { spec: 'Dimension', desc: '98mm(L)*65mm(W)*12.8mm(H)' },
      { spec: 'Software', desc: 'Supporting' },
      { spec: 'Weight', desc: '70g' },
    ],
  },
  {
    slug: 'key-cylinder',
    name: 'Key Cylinder',
    category: 'Accessories',
    image: pr5,
    descType: 'bullets',
    description: [
      'High-grade brass construction for durability',
      'Anti-pick and anti-drill security pins',
      'Available in multiple sizes to fit standard doors',
      'Smooth key operation with precision engineering',
      'Corrosion-resistant finish for long service life',
    ],
  },
  {
    slug: 'power-saving-switch',
    name: 'Power Saving Switch',
    category: 'Accessories',
    image: cor1,
    descType: 'bullets',
    description: [
      'Card-activated energy management system',
      'Cuts power automatically when guest leaves room',
      'Compatible with all standard Mifare cards',
      'Reduces hotel energy consumption significantly',
      'Easy retrofit installation in existing rooms',
    ],
  },
  {
    slug: 'dnd-electronic-panels',
    name: 'DND Electronic Panels',
    category: 'DND Panel',
    image: cor2,
    descType: 'table',
    specs: [
      { spec: 'Size', desc: '130*200MM' },
      { spec: 'Frame', desc: 'Silver Metal Frame + Black Tempered Glass' },
      { spec: 'Power', desc: 'AC 220V' },
      { spec: 'Functions', desc: 'Logo + Room Number, DND, Laundry, Bell' },
      { spec: 'Category', desc: 'Made in India PCB' },
    ],
  },
]
