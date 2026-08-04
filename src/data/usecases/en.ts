import type { UseCase } from './types';

// 영어 유즈케이스 데이터. slug와 순서는 한국어(index.ts)와 1:1로 맞춘다.
// ⚠️ 초안(원어민 검수 전). related는 영어 블로그 글로 연결한다.
export const useCasesEn: UseCase[] = [
  {
    slug: 'predictive-maintenance',
    name: 'Predictive maintenance',
    tagline: 'Read the early signs of motor failure with wireless vibration sensors, and cut unplanned downtime.',
    problem:
      'Calendar-based maintenance either discards parts that still have life left, or misses the sudden failure that happens between service intervals. Time simply has nothing to do with the actual condition of the equipment. Yet sending someone around the plant to take readings by hand, or wiring a sensor to every machine, carries a real cost of its own.',
    how: [
      { title: 'Attach a wireless sensor', desc: 'Mount the sensor on the motor — no conduit, no wiring work. It sends 3-axis vibration and temperature over LoRaWAN in real time. Installation is simple enough to fit equipment that is already running.' },
      { title: 'Judge against ISO 20816', desc: '3-axis vibration is evaluated against the international standard (ISO 20816), so you can see at a glance whether a machine is normal or needs attention.' },
      { title: 'Catch the trend, not the spike', desc: 'Anomalies are read from the trend rather than a single reading, which cuts false alarms and alert fatigue while catching early signs sooner.' },
      { title: 'Act on evidence', desc: 'AI proposes a likely cause and the next action, together with the data and history behind it.' },
    ],
    signals: ['3-axis vibration', 'Temperature', 'Current', 'Runtime history'],
    template: {
      badge: 'Wireless vibration · LoRaWAN',
      title: 'Start without wiring, using the WISE-2410 wireless sensor',
      desc: 'Mounting is all it takes. The Advantech WISE-2410 wireless vibration sensor measures 3-axis vibration and temperature, and the WISE-6610 gateway collects it over LoRaWAN. With no wiring work, installation stays simple, the battery lasts, and the hardware holds up in harsh industrial conditions.',
      includes: ['No wiring · mount-on install', 'LoRaWAN wireless · up to 5 km', 'Up to 2-year battery life', 'Built-in 3-axis accelerometer + temperature', 'ISO 20816 vibration assessment', 'IP66 · −20 to 85°C'],
    },
    related: { label: 'What predictive maintenance actually predicts', href: '/en/blog/predictive-maintenance' },
    seo: {
      title: 'Predictive maintenance · wireless vibration monitoring (WISE-2410) | Refinery',
      description: 'Measure 3-axis vibration without wiring using WISE-2410 wireless sensors (LoRaWAN), and assess motor condition against ISO 20816. Catch early signs sooner and reduce downtime.',
    },
  },
  {
    slug: 'sensor-monitoring',
    name: 'Multi-sensor monitoring',
    tagline: 'Vibration, temperature, power, environment — bring scattered sensors into one structure and watch them together.',
    problem:
      'Every machine comes with its own sensors and protocols, so the data is never readable from one place. When signals stay scattered, it is hard to put them together and judge what is actually happening.',
    how: [
      { title: 'Collect from many sources', desc: 'From IoT sensors to existing instrumentation, diverse sources are standardized and gathered in one place.' },
      { title: 'Connect through the ontology', desc: 'Each signal is given meaning — which asset it belongs to and what it measures — so it can be interpreted alongside the others.' },
      { title: 'Watch in real time', desc: 'See multiple signals on one screen and catch combinations that differ from the norm.' },
    ],
    signals: ['Vibration', 'Temperature', 'Humidity', 'Power', 'Pressure', 'Flow'],
    related: { label: 'Five principles for turning industrial data into an asset', href: '/en/blog/industrial-data-best-practices' },
    seo: {
      title: 'Multi-sensor monitoring (IoT) | Refinery',
      description: 'Standardize and gather scattered sensors — from IoT devices to existing instrumentation — and connect them through an ontology for real-time monitoring.',
    },
  },
  {
    slug: 'power-management',
    name: 'Power management',
    tagline: 'See when, where and how much you use — and bring down both cost and risk.',
    problem:
      'An electricity bill shows a total and a few peak figures. What it does not show is which equipment used that power, at what hour, and why. Metering is fragmented across machines and records are scattered, so when the bill goes up the response is usually an instruction to use less rather than a search for the cause. Exceeding contracted demand and paying peak charges is often discovered only afterwards, from the bill.',
    how: [
      { title: 'Make usage visible', desc: 'Look at power with equipment, area and time of day side by side. Once you can see which machine draws how much and when, consumption that felt vague starts to take shape.' },
      { title: 'Manage peaks', desc: 'Find the moments when several machines run at once and create a peak. Staggering start times or splitting the load brings down both contracted demand and peak charges.' },
      { title: 'Detect abnormal use', desc: 'Catch consumption that departs from the usual pattern — equipment running when it should be off, or standby draw that crept up unnoticed.' },
      { title: 'Check power factor and load', desc: 'A falling power factor or load concentrated on one side affects both cost and equipment life. Those points are flagged with room to improve.' },
    ],
    template: {
      title: 'Start from a power management template',
      desc: 'If this is the first time you are looking at power closely, it is hard to know what to measure and how to read it. The power management template, built up across many sites, already contains how to structure metering per asset and what thresholds to apply to peaks and power factor. Fill in your own equipment list and contract terms, and you can start looking without designing the structure from scratch.',
      includes: ['Metering structure by asset and area', 'Peak and contracted-demand thresholds', 'Power factor · load factor dashboard', 'Abnormal-use alert rules'],
    },
    signals: ['Active/reactive power', 'Power factor', 'Load factor', 'Hourly consumption', 'Peak'],
    related: { label: 'Where the waste hides: starting with energy optimization', href: '/en/blog/energy-optimization' },
    seo: {
      title: 'Power management | Refinery',
      description: 'Make power use visible by asset, area and time of day, manage peaks, and detect abnormal consumption early to reduce electricity cost and risk.',
    },
  },
  {
    slug: 'power-quality',
    name: 'Power quality',
    tagline: 'Watch voltage variation, harmonics and momentary interruptions as they happen.',
    problem:
      'Sometimes equipment stops for no apparent reason, or defects rise on a line that was running fine. Search long enough and power quality often turns out to be the culprit. A momentary voltage dip or harmonic distortion is neither visible nor long-lived, so unless it is monitored continuously there is little trace left afterwards. That is why "why did it stop right then" so often stays unanswered.',
    how: [
      { title: 'Monitor quality metrics', desc: 'Voltage, frequency, harmonics and imbalance are watched in real time, so the moment a threshold is crossed is not missed.' },
      { title: 'Record events automatically', desc: 'Fleeting events — sags, swells, brief interruptions — are recorded automatically, leaving evidence you can go back to.' },
      { title: 'Connect to causes', desc: 'Overlay when and where a quality event occurred with operating and failure history. Checking whether the timing lines up with a stoppage or a defect turns a vague suspicion into evidence.' },
      { title: 'Separate what mattered', desc: 'Distinguish the events that actually caused problems from the ones that passed harmlessly, so you know what to fix first.' },
    ],
    template: {
      title: 'Start from a power quality monitoring template',
      desc: 'What to monitor and against which thresholds differs a little from site to site, but the outline is much the same. The power quality template used across several sites already sets out the key metrics, the judgment criteria, and the event types that commonly cause trouble. Connect your measurement points and assets, and you can skip the design stage and start monitoring.',
      includes: ['Voltage · frequency · harmonic monitoring items', 'Sag/swell and interruption thresholds', 'Asset-history linked view', 'Quality event alert rules'],
    },
    signals: ['Voltage', 'Frequency', 'Harmonics (THD)', 'Imbalance', 'Sag/swell'],
    related: { label: 'Five principles for turning industrial data into an asset', href: '/en/blog/industrial-data-best-practices' },
    seo: {
      title: 'Power quality monitoring | Refinery',
      description: 'Monitor voltage, frequency, harmonics and imbalance in real time, and record momentary events automatically to uncover the hidden cause of failures and defects.',
    },
  },
  {
    slug: 'factory-energy',
    name: 'Factory energy management',
    tagline: 'See the whole plant’s energy flow in one place, and cut both waste and emissions.',
    problem:
      'A plant runs on several forms of energy at once — electricity, gas, steam, water. That consumption is recorded separately by department, by asset and by time of day, so where it goes, how much, and why is never visible at a glance. Without the whole picture it is hard to justify where to cut, and savings come down to instinct. Aggregating figures for ESG reporting turns into manual work, every time.',
    how: [
      { title: 'Meter everything together', desc: 'Electricity, gas, steam and water alongside per-asset consumption are brought into one structure, so the plant’s energy flow sits on a single screen.' },
      { title: 'Analyze energy intensity', desc: 'Compare energy used against output to find the periods and areas that spend more for the same work.' },
      { title: 'Manage peak and load', desc: 'Identify when machines cluster and create a peak, spread the load, and bring down contracted demand and peak charges.' },
      { title: 'Aggregate ESG automatically', desc: 'Consumption and emissions are aggregated with their sources, so reports are produced without manual work and the figures stay traceable.' },
    ],
    template: {
      title: 'Start quickly from an energy management system template',
      desc: 'A new site does not have to design the structure from scratch. The energy management system (EnMS) template, refined across sites over thirty years, already includes the metering structure, intensity KPIs, ESG report formats, and anomaly and peak alert rules. Adjust it to your own assets and targets and you can begin operating on a proven structure right away.',
      includes: ['Metering structure by energy source and asset', 'Energy intensity KPIs · dashboard', 'ESG report formats', 'Abnormal consumption · peak alert rules'],
    },
    signals: ['Electricity · gas · steam · water', 'Output', 'Emissions', 'Energy intensity', 'Peak'],
    related: { label: 'Where the waste hides: starting with energy optimization', href: '/en/blog/energy-optimization' },
    seo: {
      title: 'Factory energy management (FEMS) | Refinery',
      description: 'Meter electricity, gas, steam and water across the plant, analyze energy intensity to find waste, and aggregate ESG reports automatically.',
    },
  },
  {
    slug: 'energy-optimization',
    name: 'Energy optimization',
    tagline: 'Find hidden waste and peaks in the data, and do the same work for less.',
    problem:
      'Waste tends to sit scattered in places that draw less attention than the large machines. Looking only at totals will not show you where to start.',
    how: [
      { title: 'Uncover waste', desc: 'Overlay consumption patterns on the work context to find inefficiency.' },
      { title: 'Reduce peaks', desc: 'Identify when peaks form and spread the load.' },
      { title: 'Keep it from returning', desc: 'Track the effect of each improvement so savings do not leak back.' },
    ],
    signals: ['Hourly consumption', 'Peak', 'Energy intensity'],
    related: { label: 'Where the waste hides: starting with energy optimization', href: '/en/blog/energy-optimization' },
    seo: {
      title: 'Energy optimization | Refinery',
      description: 'Find hidden waste and peaks in the data to reduce energy cost — overlaying consumption patterns on work context to uncover inefficiency.',
    },
  },
  {
    slug: 'quality-prediction',
    name: 'Quality prediction',
    tagline: 'Read the early signs of a defect in process data, and catch it before the part is finished.',
    problem:
      'By the time a defect is found at final inspection, the material and the time have already gone into it. And looking at the finished part alone rarely tells you why.',
    how: [
      { title: 'Link process to quality', desc: 'Connect process conditions with inspection results to see which conditions correlate with defects.' },
      { title: 'Detect early signs', desc: 'Read the early signs of a defect in small shifts of temperature, pressure and material properties.' },
      { title: 'Warn in advance', desc: 'When a run enters a risky range, the alert comes with the evidence and a recommended action.' },
    ],
    signals: ['Temperature', 'Pressure', 'Material lot', 'Process conditions', 'Inspection results'],
    related: { label: 'Before the defect appears: what quality prediction really looks like', href: '/en/blog/quality-prediction' },
    seo: {
      title: 'Quality prediction | Refinery',
      description: 'Read the early signs of a defect in process data and catch it before the part is finished, connecting process conditions with inspection results.',
    },
  },
];

export const findUseCaseEn = (slug: string) => useCasesEn.find((u) => u.slug === slug);
