---
title: "What predictive maintenance actually predicts"
description: "Not magic that guesses failures in advance, but the work of reading early signs in data. How predictive maintenance really operates."
pubDate: 2026-07-30
updatedDate: 2026-07-31
author: "Refinery Team"
tags: ["predictive maintenance", "AI agents", "operations"]
lang: "en"
---

The moment equipment stops, losses start accumulating. So plants work hard to prevent
failures in advance — but setting the standard for "in advance" is not easy. Predictive
maintenance is an attempt to set that standard from data rather than instinct.

## The limits of preventive maintenance

Many sites still maintain to a calendar: replace and inspect parts every few months. It is
safe, but wasteful. Parts with life left get thrown away, and equipment still fails
suddenly between service intervals. Time, as a criterion, has nothing to do with the actual
condition of the machine.

## Predictive maintenance reads the early signs

Predictive maintenance is not magic that guesses failures in advance. It is closer to
reading, in data, the signs a machine leaves on its way toward failure. As a bearing wears,
the vibration pattern shifts gradually; as a motor is strained, current and temperature
trace a different course than usual. These changes show up in the trend, not in any single
reading.

## What has to be in place for prediction to work

The quality of a prediction depends more on the data beneath it than on the model. First
you need history of how that machine normally behaves — without a baseline to compare
against, you cannot even tell whether the current value is unusual. And you need context
for which machine a signal belongs to and what it connects to — an ontology — before a
cause can be narrowed down. If data is scattered and its provenance unclear, even a good
model will chase the wrong thing.

## Measuring vibration with wireless sensors

If vibration is the signal that reveals early signs first, the next question is how to
measure it consistently. Sending someone around with a handheld meter is hard to do often,
and the records vary from person to person. Wiring a sensor to every machine, meanwhile,
is no small amount of construction.

So we use wireless vibration sensors. A sensor like the Advantech WISE-2410 simply mounts
on the motor — with no wiring work it can go onto equipment that is already running. A
built-in 3-axis accelerometer measures vibration along with temperature, and the data goes
out over LoRaWAN. Because LoRaWAN is low-power, the battery lasts and the signal carries
far, so sensors spread across a large plant can be collected by one or two gateways such
as the WISE-6610.

The measured 3-axis values are assessed against an international standard such as ISO
20816. That lets you say whether "this much vibration is normal" against a benchmark
rather than a hunch. The sensor itself is built to an IP66 rating across a wide
temperature range, so it holds up in humid, hot and dusty conditions.

Wireless sensors lower the threshold for predictive maintenance considerably. With no
wiring and no walking rounds, vibration data starts accumulating simply by attaching a
sensor to the machine you want to watch.

## In a form a person can act on

A risk score alone does not move anyone. More than "this pump is at 0.87 risk", it is a
sentence like "vibration is rising in a pattern similar to the run-up to the last failure;
bearing wear is suspected; inspection recommended" that produces action. An AI agent turns
the analysis back into human language like this, and presents the data and history the
judgment rests on alongside it.

## Where to start

Do not try to cover every machine at once. It is more realistic to pick a single machine
with a clear failure history and a high cost of stopping. Put that machine’s history in
order, connect the related signals through an ontology, confirm that early signs are
actually being caught, and widen the scope from there.

## In closing

Predictive maintenance is, in the end, a data problem. Once trustworthy history and
context are in place, prediction follows naturally on top. How data becomes an asset is
covered in
[five principles for turning industrial data into an asset](/en/blog/industrial-data-best-practices),
and how AI helps decide with evidence continues in the
[industrial AI agents](/whitepapers/ai-agent) whitepaper.
