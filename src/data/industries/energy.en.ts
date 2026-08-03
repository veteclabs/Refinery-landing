import type { IndustryData } from './types';

// 영어 산업 데이터. slug는 한국어(energy.ts)와 동일하게 맞춘다.
// ⚠️ 초안(원어민 검수 전).
export const energyEn: IndustryData = {
  slug: 'energy',
  name: 'Energy & Utilities',
  pageTitle: 'Refinery for energy & utilities: unified control, predictive maintenance, automated ESG',
  description:
    'Connect energy data scattered across SCADA, EMS and meters into one structure, let an AI agent catch anomalies first, and automate ESG reporting. Refinery for generation, transmission and utility operations.',
  hero: {
    eyebrow: 'INDUSTRIES · ENERGY & UTILITIES',
    title: 'Connecting distributed energy sites\ninto a single intelligence',
    lede: 'Data scattered across SCADA, EMS and smart meters is connected through an ontology, and an AI agent catches anomalies first and explains the cause. From unified control to predictive maintenance and automated ESG reporting.',
  },
  challenges: {
    title: 'Challenges on energy sites',
    subtitle: 'The problems that come up again and again in generation, transmission and utility operations.',
    items: [
      {
        title: 'The data sits apart',
        description:
          'Generation, substation and meter data live in SCADA, EMS and billing systems, so seeing the whole picture at once is difficult.',
      },
      {
        title: 'Failures are known too late',
        description:
          'Equipment anomalies are often understood only after they have already caused a stoppage or an incident, leaving little room to act preventively.',
      },
      {
        title: 'ESG and regulatory reports are manual',
        description:
          'Emissions and consumption figures for regulatory reports are gathered by hand, which takes time and leaves room for error.',
      },
      {
        title: 'Real-time response lags',
        description:
          'Adjusting consumption to demand, tariffs and weather requires several screens and several judgements, so the response arrives late.',
      },
    ],
  },
  useCases: {
    title: 'Representative use cases',
    subtitle: 'What Refinery actually does on an energy site.',
    items: [
      {
        title: 'Unified control of distributed assets',
        problem: 'SCADA, EMS and meter data are separate, so there is no integrated view.',
        approach: 'Site data is connected through an ontology, defining assets, grids and locations in one structure.',
        outcome: 'Generation, transmission and consumption status and alarms monitored live on one screen.',
      },
      {
        title: 'Predictive maintenance',
        problem: 'Response only comes after an anomaly has grown into a stoppage or incident.',
        approach: 'Patterns that differ from the norm are learned from time-series data to catch early signs.',
        outcome: 'Acting before failure reduces unplanned stoppages and downtime.',
      },
      {
        title: 'Energy efficiency and peak optimization',
        problem: 'Consumption patterns are invisible, so waste and peak charges build up.',
        approach: 'Consumption is analysed by asset and segment, with adjustments proposed against tariff and demand signals.',
        outcome: 'Lower peaks and better efficiency reduce operating cost.',
      },
      {
        title: 'Automated ESG and carbon reporting',
        problem: 'Aggregating emissions and consumption for regulatory reports is manual work.',
        approach: 'Emissions and consumption metrics are aggregated automatically from site data and turned into reports.',
        outcome: 'Regulatory reports produced automatically, with every figure traceable to its source.',
      },
      {
        title: 'Real-time anomaly detection and alerts',
        problem: 'Anomalous signals are missed, or noticed too late.',
        approach: 'An AI agent detects anomalies in live data and proposes both the likely cause and the next action.',
        outcome: 'Problems recognised early, with an evidence-backed next step already in hand.',
      },
    ],
  },
  architecture: {
    title: 'How it fits together',
    subtitle: 'How site data gains meaning and turns into a decision.',
    steps: [
      { label: 'Site', detail: 'Generation and substation assets · smart meters · sensors' },
      { label: 'Connect', detail: 'SCADA·EMS · Modbus·OPC-UA·DNP3·IEC 61850' },
      { label: 'Refinery', detail: 'Ontology · AI agent · rules and automation' },
      { label: 'Use', detail: 'Unified dashboard · alerts · ESG reports' },
    ],
    note: 'Where SCADA or EMS already exists, Refinery sits on top of it and integrates both ways rather than replacing it. Where none exists, collection is built from the ground up.',
  },
  benefits: {
    title: 'What you gain',
    subtitle: 'Benefits across operations, engineering and management.',
    items: [
      {
        title: 'Early anomaly detection',
        description: 'Signals that differ from the norm are caught in real time, reducing stoppage and incident risk.',
      },
      {
        title: 'Unified control',
        description: 'Distributed assets and grids are monitored on one screen and in one structure.',
      },
      {
        title: 'Energy efficiency',
        description: 'Waste and peaks are found on the evidence of consumption patterns, cutting operating cost.',
      },
      {
        title: 'ESG automation',
        description: 'Emissions and consumption reports are aggregated automatically, with sources traceable.',
      },
      {
        title: 'Site security',
        description: 'With on-premises deployment, data never leaves your network and the OT/IT boundary stays protected.',
      },
      {
        title: 'Integrate or build new',
        description: 'Where legacy SCADA, EMS or ERP exists, Refinery layers on top and integrates both ways. Where none exists, it is built from scratch.',
      },
    ],
  },
  integrations: {
    title: 'Systems we connect to',
    subtitle: 'The systems and protocols commonly used on energy sites.',
    systems: ['SCADA', 'EMS', 'Smart meters · AMI', 'Modbus', 'OPC-UA', 'DNP3', 'IEC 61850', 'ERP'],
    note: 'Systems not listed here can still be connected over standard protocols and APIs. Get in touch and we will walk through it.',
  },
  cta: {
    title: 'Let’s find the answer that fits\nyour energy operation, together.',
    buttonLabel: 'Request a demo',
  },
};
