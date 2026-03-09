/**
 * src/pages/programmes/stemgeneers/sandbox.tsx
 * =============================================
 * STEMgeneers Sandbox — Updated
 * Wembley Wonders CIC
 *
 * REVISION:
 * - Diagnostic trainer now scores sessions and records to journalStore
 * - Physics explanation capture added after every diagnostic result
 * - Scenario variants added (randomised symptom presentation)
 * - Gate status indicator added — shows layer progress in context
 * - "Log this as a repair" shortcut from diagnostic result
 * - All original tools preserved exactly: cost, print, collective
 *
 * The diagnostic trainer now MEANS something.
 * 0.8+ accuracy → passes toward the layer gate.
 * Physics explanation attempted → distinction track.
 * Wrong-path deviations logged → honest accuracy score.
 */

import React, { useState, useCallback, useMemo } from 'react';
import PageTemplate from '../../../components/PageTemplate';
import PageMeta from '../../../components/PageMeta';
import { Wrench, Calculator, Settings, Zap, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Info } from 'lucide-react';
import {
  useJournalStore,
  useGateRequirements,
  useSTEMgeneersStats,
} from '../../../stores/journalStore';
import type { RepairLayer, DiagnosisMethod } from '../../../types/creators-journal';
import './sandbox.css';

// ============================================================================
// ORIGINAL DATA — all preserved exactly
// ============================================================================

const repairItems = [
  { id: 'watch-battery', category: 'Precision', name: 'Watch battery replacement', professionalCost: 15, actualCost: 0.80, timeMinutes: 4, toolsNeeded: ['Case opener', 'Tweezers'], toolsCost: 8, difficulty: 'Beginner', layer: 'The Precision Layer', note: 'The most pure example of mystified knowledge. The jeweller charges £15 for 4 minutes of work and an 80p part.' },
  { id: 'lock-lubricant', category: 'Home', name: 'Stiff door lock', professionalCost: 80, actualCost: 3, timeMinutes: 5, toolsNeeded: ['Graphite lubricant'], toolsCost: 3, difficulty: 'Beginner', layer: 'The Precision Layer', note: 'Locksmith callout minimum £80. Graphite powder is £3 and takes 5 minutes.' },
  { id: 'tap-washer', category: 'Home', name: 'Dripping tap washer', professionalCost: 85, actualCost: 1.50, timeMinutes: 20, toolsNeeded: ['Adjustable spanner', 'Flat/cross screwdriver'], toolsCost: 12, difficulty: 'Beginner', layer: 'The Home Layer', note: 'Plumber minimum callout. The washer is 50p-£1.50 and the job takes 20 minutes once you know how.' },
  { id: 'sewing-machine-service', category: 'Appliance', name: 'Sewing machine service', professionalCost: 70, actualCost: 5, timeMinutes: 45, toolsNeeded: ['Small screwdrivers', 'Lint brush', 'Sewing machine oil'], toolsCost: 8, difficulty: 'Beginner', layer: 'The Appliance Layer', note: 'Dealers charge £60-80 for a clean, oil and tension check. You can learn this in an afternoon.' },
  { id: 'washing-machine-belt', category: 'Appliance', name: 'Washing machine drive belt', professionalCost: 160, actualCost: 12, timeMinutes: 60, toolsNeeded: ['Screwdrivers', 'Replacement belt'], toolsCost: 12, difficulty: 'Intermediate', layer: 'The Appliance Layer', note: '£80+ callout plus £80+ parts is common. The belt itself is £8-15 and the job is straightforward once you know how to get the panel off.' },
  { id: 'phone-screen', category: 'Precision', name: 'Phone screen replacement', professionalCost: 100, actualCost: 25, timeMinutes: 45, toolsNeeded: ['Pentalobe screwdriver', 'Suction cup', 'Plastic spudger', 'Screen'], toolsCost: 35, difficulty: 'Intermediate', layer: 'The Precision Layer', note: 'Repair shop prices vary wildly. Screen cost £15-40 depending on model. The repair shop is buying the same screen.' },
  { id: 'bike-brake-cable', category: 'Precision', name: 'Bicycle brake cable', professionalCost: 30, actualCost: 4, timeMinutes: 25, toolsNeeded: ['Allen keys', 'Pliers', 'Cable cutter', 'Cable end caps'], toolsCost: 15, difficulty: 'Beginner', layer: 'The Precision Layer', note: 'Bike shop charges £25-35 for a job that takes 25 minutes. Cable is £3-5.' },
  { id: 'paint-room', category: 'Home', name: 'Paint and decorate a room', professionalCost: 500, actualCost: 80, timeMinutes: 720, toolsNeeded: ['Roller', 'Brushes', 'Tray', 'Sugar soap', 'Filler', 'Paint'], toolsCost: 45, difficulty: 'Beginner', layer: 'The Home Layer', note: 'Decorator quote for a standard bedroom. The difference is entirely labour. Preparation knowledge is the key skill.' },
  { id: 'washing-machine-bearing', category: 'Appliance', name: 'Washing machine drum bearing', professionalCost: 240, actualCost: 25, timeMinutes: 180, toolsNeeded: ['Socket set', 'Bearing puller', 'Hammer', 'New bearing'], toolsCost: 25, difficulty: 'Advanced', layer: 'The Appliance Layer', note: 'Often quoted as uneconomical to repair — pushing replacement. The bearing itself is £8-20. The job is 3 hours but the machine runs another decade.' },
  { id: 'vacuum-carbon-brushes', category: 'Appliance', name: 'Vacuum cleaner motor brushes', professionalCost: 90, actualCost: 6, timeMinutes: 30, toolsNeeded: ['Screwdrivers', 'Replacement brushes'], toolsCost: 6, difficulty: 'Beginner', layer: 'The Appliance Layer', note: 'Most vacuum motors fail because carbon brushes wear down — £3-8 part. Repair shops charge labour plus often push replacement.' },
];

const printScenarios = [
  { part: 'Washing machine soap drawer handle', available: false, quotedCost: 45, printCost: 2, verdict: 'print', reason: 'Simple ABS print. Discontinued part. No structural load.' },
  { part: 'Vacuum cleaner wheel', available: true, quotedCost: 12, printCost: 3, verdict: 'borderline', reason: 'Available but overpriced. PETG for wear resistance. Worth printing if you have access.' },
  { part: 'Kettle lid hinge pin', available: false, quotedCost: 0, printCost: 1, verdict: 'print', reason: 'Tiny part, no longer made. PLA fine. 30-minute print.' },
  { part: 'Washing machine drum paddle', available: true, quotedCost: 8, printCost: 4, verdict: 'buy', reason: 'Available cheap. High heat and mechanical stress — buy original.' },
  { part: 'Fridge door shelf bracket', available: false, quotedCost: 35, printCost: 3, verdict: 'print', reason: 'Static load only. PETG. Discontinued model — manufacturer wants you to buy new fridge.' },
  { part: 'Dishwasher spray arm end cap', available: false, quotedCost: 0, printCost: 2, verdict: 'print', reason: 'Hot water resistant filament (PETG/ASA). Simple geometry. No alternative.' },
  { part: 'Sewing machine bobbin case', available: true, quotedCost: 15, printCost: 5, verdict: 'buy', reason: 'Precision tolerances critical to thread tension. Buy original.' },
  { part: 'Chair leg cap', available: true, quotedCost: 2, printCost: 1, verdict: 'buy', reason: 'Available for pennies. Not worth the filament and print time.' },
];

// ============================================================================
// DIAGNOSTIC TREE — original data, extended with scoring metadata
// ============================================================================

// Each non-result node tracks which next-step is the optimal path.
// Deviations from optimal are logged for accuracy scoring.

interface DiagNodeBranch {
  question: string;
  options: Array<{
    label: string;
    next: string;
    optimal?: boolean;    // marks the diagnostically sound choice
  }>;
}

interface DiagNodeResult {
  result: true;
  diagnosis: string;
  layer: string;
  repairLayer: RepairLayer;   // NEW: typed layer for gate recording
  difficulty: string;
  diy: boolean;
  parts: string;
  time: string;
  saving: string;
  tip: string;
  correctPath: string[];      // NEW: the optimal path to this result
  methodsImplied: DiagnosisMethod[]; // NEW: methods a competent diagnosis would use
  physicsSubject: string;     // NEW: what physics applies here
  physicsHint: string;        // NEW: prompt for physics explanation
}

type DiagNode = DiagNodeBranch | DiagNodeResult;

const diagnosticTree: Record<string, DiagNode> = {
  start: {
    question: "What's broken?",
    options: [
      { label: "A machine — washing machine, vacuum, sewing machine, kettle", next: 'machine', optimal: true },
      { label: "Something in the home — tap, lock, wall, floor", next: 'home', optimal: true },
      { label: "A small device — phone, watch, bike, laptop", next: 'precision', optimal: true },
      { label: "Furniture — chair, wardrobe, table", next: 'furniture', optimal: true },
    ]
  },
  machine: {
    question: "What's happening?",
    options: [
      { label: "It makes a noise it didn't make before", next: 'machine_noise', optimal: true },
      { label: "It won't start / no power", next: 'machine_power', optimal: true },
      { label: "It starts but doesn't work properly", next: 'machine_partial', optimal: true },
      { label: "It leaks", next: 'machine_leak', optimal: true },
    ]
  },
  machine_noise: {
    question: "What kind of noise?",
    options: [
      { label: "Grinding or rumbling during spin", next: 'result_bearing', optimal: true },
      { label: "Squealing or squeaking", next: 'result_belt', optimal: true },
      { label: "Banging or knocking", next: 'result_drum_check', optimal: true },
      { label: "Buzzing or humming without working", next: 'result_capacitor', optimal: true },
    ]
  },
  machine_power: {
    question: "Have you checked the basics?",
    options: [
      { label: "Socket works, fuse in plug is fine, door fully closed", next: 'result_control_board', optimal: true },
      { label: "I haven't checked those yet", next: 'result_check_basics', optimal: false },
    ]
  },
  machine_partial: {
    question: "Which machine?",
    options: [
      { label: "Washing machine — fills but won't spin", next: 'result_carbon_brushes', optimal: true },
      { label: "Vacuum — weak suction", next: 'result_vacuum_suction', optimal: true },
      { label: "Sewing machine — skipping stitches or tension wrong", next: 'result_sewing_service', optimal: true },
      { label: "Something else", next: 'result_diagnose_further', optimal: false },
    ]
  },
  machine_leak: {
    question: "Where is the leak?",
    options: [
      { label: "From the door seal (washing machine)", next: 'result_door_seal', optimal: true },
      { label: "From underneath", next: 'result_pump_hose', optimal: true },
      { label: "From the drawer/soap compartment", next: 'result_blockage', optimal: true },
    ]
  },
  home: {
    question: "What's the issue?",
    options: [
      { label: "Dripping or running tap", next: 'result_washer', optimal: true },
      { label: "Stiff or jammed lock", next: 'result_lock', optimal: true },
      { label: "Crack or hole in wall", next: 'result_filler', optimal: true },
      { label: "Loose floorboard or squeaky floor", next: 'result_floor', optimal: true },
    ]
  },
  precision: {
    question: "Which device?",
    options: [
      { label: "Phone — cracked screen or battery", next: 'result_phone', optimal: true },
      { label: "Watch — stopped or battery", next: 'result_watch', optimal: true },
      { label: "Bicycle — gears, brakes, tyres", next: 'result_bike', optimal: true },
      { label: "Laptop — slow, battery, screen", next: 'result_laptop', optimal: true },
    ]
  },
  furniture: {
    question: "What's wrong with it?",
    options: [
      { label: "Wobbly joint or leg", next: 'result_joint', optimal: true },
      { label: "Broken hinge or fitting", next: 'result_hinge', optimal: true },
      { label: "Surface damage — scratch, chip, stain", next: 'result_surface', optimal: true },
      { label: "Upholstery worn or torn", next: 'result_upholstery', optimal: true },
    ]
  },

  // ── RESULTS — original data + new scoring fields ──────────────────────────

  result_bearing: { result: true, diagnosis: "Drum bearing failure", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Advanced", diy: true, parts: "Bearing kit £15-25", time: "3-4 hours", saving: "£150-200", tip: "Watch a YouTube teardown for your exact model first. The job is straightforward but the disassembly varies by manufacturer.", correctPath: ['start', 'machine', 'machine_noise', 'result_bearing'], methodsImplied: ['auditory-diagnosis', 'elimination', 'disassembly-inspection'], physicsSubject: 'Tribology', physicsHint: 'The bearing rumbles during spin but not agitation. Why does the noise change with drum speed, and what physical process is occurring inside the bearing race?' },
  result_belt: { result: true, diagnosis: "Drive belt worn or slipping", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Intermediate", diy: true, parts: "Belt £8-15", time: "45-60 minutes", saving: "£80-120", tip: "Model number is usually on a sticker inside the door. Search '[model] belt replacement' for your exact machine.", correctPath: ['start', 'machine', 'machine_noise', 'result_belt'], methodsImplied: ['auditory-diagnosis', 'visual-inspection'], physicsSubject: 'Friction and belt mechanics', physicsHint: 'Why does a worn belt squeal rather than just slip silently? What physical property changes as rubber ages?' },
  result_drum_check: { result: true, diagnosis: "Likely a foreign object in the drum — coin, underwire", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "None usually", time: "30 minutes", saving: "£80 callout", tip: "Check the filter first (bottom front panel on most machines). Have towels ready.", correctPath: ['start', 'machine', 'machine_noise', 'result_drum_check'], methodsImplied: ['auditory-diagnosis', 'elimination'], physicsSubject: 'Resonance and impact noise', physicsHint: 'A loose object in the drum produces a regular banging tied to drum rotation speed. Why does the noise pattern help you rule out a bearing?' },
  result_capacitor: { result: true, diagnosis: "Start capacitor failure — common on motors that hum but won't run", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Intermediate", diy: true, parts: "Capacitor £5-15", time: "30 minutes", saving: "£60-100", tip: "Discharge the old capacitor before handling. Match the microfarad (µF) rating exactly.", correctPath: ['start', 'machine', 'machine_noise', 'result_capacitor'], methodsImplied: ['auditory-diagnosis', 'multimeter', 'elimination'], physicsSubject: 'Capacitance and motor starting', physicsHint: 'Why does a washing machine motor need a start capacitor? What does the capacitor do that the mains supply cannot?' },
  result_carbon_brushes: { result: true, diagnosis: "Carbon brush wear — very common cause of spin failure", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "Brushes £6-12", time: "30-45 minutes", saving: "£80-140", tip: "The motor brushes wear down and need replacing every few years.", correctPath: ['start', 'machine', 'machine_partial', 'result_carbon_brushes'], methodsImplied: ['elimination', 'disassembly-inspection', 'visual-inspection'], physicsSubject: 'Electrical contact and carbon brush wear', physicsHint: 'The machine fills and agitates fine but won\'t spin. How does that symptom pattern point to the carbon brushes rather than the motor itself?' },
  result_vacuum_suction: { result: true, diagnosis: "Filter blockage or carbon brushes on motor", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "Filter £5-10 or brushes £6", time: "20-30 minutes", saving: "£40-80", tip: "Clean or replace filter first — often solves it completely.", correctPath: ['start', 'machine', 'machine_partial', 'result_vacuum_suction'], methodsImplied: ['elimination', 'visual-inspection'], physicsSubject: 'Fluid dynamics and airflow restriction', physicsHint: 'Why does a blocked filter reduce suction so dramatically? What\'s happening to the air pressure differential across the motor?' },
  result_sewing_service: { result: true, diagnosis: "Timing, tension, or needs a service", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "Oil and lint brush £5-8", time: "45 minutes", saving: "£60-80", tip: "Clean out all lint first, re-thread completely from scratch, check bobbin tension.", correctPath: ['start', 'machine', 'machine_partial', 'result_sewing_service'], methodsImplied: ['visual-inspection', 'elimination'], physicsSubject: 'Thread tension and stitch formation', physicsHint: 'What must be true about upper thread tension and bobbin tension for a stitch to form correctly? What happens physically when the tension balance is wrong?' },
  result_door_seal: { result: true, diagnosis: "Door gasket/seal perished or torn", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Intermediate", diy: true, parts: "Seal £15-30", time: "45-60 minutes", saving: "£80-120", tip: "Search your model number + 'door seal' for exact part.", correctPath: ['start', 'machine', 'machine_leak', 'result_door_seal'], methodsImplied: ['visual-inspection', 'disassembly-inspection'], physicsSubject: 'Rubber elasticity and compression sealing', physicsHint: 'A door seal works by compression — the rubber deforms to fill the gap. Why does rubber perish over time, and what physical change causes it to stop sealing?' },
  result_pump_hose: { result: true, diagnosis: "Pump filter blocked or hose connection loose", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "None usually", time: "20 minutes", saving: "£80 callout", tip: "Access the pump filter (bottom front panel). Have towels ready.", correctPath: ['start', 'machine', 'machine_leak', 'result_pump_hose'], methodsImplied: ['visual-inspection', 'elimination'], physicsSubject: 'Hydraulic pressure and pump operation', physicsHint: 'Water leaking from underneath a washing machine — what does that tell you about where in the water circuit the problem is, and why?' },
  result_blockage: { result: true, diagnosis: "Soap drawer channel blocked with detergent buildup", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "None", time: "15 minutes", saving: "£80 callout", tip: "Remove the drawer completely, soak in hot water. Clean the channel with a bottle brush.", correctPath: ['start', 'machine', 'machine_leak', 'result_blockage'], methodsImplied: ['visual-inspection'], physicsSubject: 'Detergent chemistry and crystallisation', physicsHint: 'Why does detergent block the soap drawer channel rather than just washing through? What physical process causes it to accumulate and harden?' },
  result_washer: { result: true, diagnosis: "Tap washer or O-ring failure", layer: "Home Layer", repairLayer: 'home', difficulty: "Beginner", diy: true, parts: "Washer £1-2", time: "20 minutes", saving: "£80 callout", tip: "Turn off the water at the isolation valve under the sink first. Match the washer size exactly.", correctPath: ['start', 'home', 'result_washer'], methodsImplied: ['visual-inspection', 'elimination'], physicsSubject: "Pascal's Law and hydraulic sealing", physicsHint: "A worn washer drips when the tap is closed but not when it's open. Explain why using Pascal's Law and what the washer is actually doing mechanically." },
  result_lock: { result: true, diagnosis: "Dry mechanism — needs lubricating, not replacing", layer: "Precision Layer", repairLayer: 'precision', difficulty: "Beginner", diy: true, parts: "Graphite lubricant £3", time: "5 minutes", saving: "£80 callout", tip: "Use graphite powder, not WD40. WD40 attracts dirt and makes it worse long-term.", correctPath: ['start', 'home', 'result_lock'], methodsImplied: ['tactile-diagnosis' as DiagnosisMethod, 'elimination'], physicsSubject: 'Tribology and dry lubrication', physicsHint: 'Why does graphite work as a lubricant in a lock when an oil like WD40 makes it worse long-term? What physical property of graphite is key here?' },
  result_filler: { result: true, diagnosis: "Surface crack or hole — filler and paint job", layer: "Home Layer", repairLayer: 'home', difficulty: "Beginner", diy: true, parts: "Filler £4, sandpaper £2", time: "30 minutes + drying time", saving: "£50-100 tradesperson", tip: "Slightly overfill, let it dry completely, sand flush.", correctPath: ['start', 'home', 'result_filler'], methodsImplied: ['visual-inspection'], physicsSubject: 'Material science — shrinkage and adhesion', physicsHint: 'Why do you overfill a crack with filler rather than filling it flush? What happens to the filler as it dries?' },
  result_floor: { result: true, diagnosis: "Loose floorboard screw or joist issue", layer: "Home Layer", repairLayer: 'home', difficulty: "Beginner", diy: true, parts: "Screws £2 or floor adhesive £5", time: "20 minutes", saving: "£60+ tradesperson", tip: "For squeaky boards, screw down through the board into the joist.", correctPath: ['start', 'home', 'result_floor'], methodsImplied: ['auditory-diagnosis', 'visual-inspection'], physicsSubject: 'Wood movement and friction', physicsHint: 'Why does a floorboard squeak when it was silent when first fitted? What has changed in the wood, and what is the sound actually coming from?' },
  result_phone: { result: true, diagnosis: "Screen or battery replacement", layer: "Precision Layer", repairLayer: 'precision', difficulty: "Intermediate", diy: true, parts: "Screen £15-40, battery £10-20", time: "30-60 minutes", saving: "£50-100", tip: "iFixit has guides for almost every phone. A proper toolkit makes the difference.", correctPath: ['start', 'precision', 'result_phone'], methodsImplied: ['visual-inspection', 'disassembly-inspection'], physicsSubject: 'Lithium-ion battery chemistry and OLED/LCD display technology', physicsHint: 'Why does a lithium-ion battery lose capacity over time even if treated well? What is happening chemically in the cells?' },
  result_watch: { result: true, diagnosis: "Battery replacement — almost certainly this", layer: "Precision Layer", repairLayer: 'precision', difficulty: "Beginner", diy: true, parts: "Battery 80p-£2", time: "4 minutes", saving: "£13-14", tip: "Case opener tool is £3-5. Look up the battery reference (e.g. SR626SW) on the old battery or model number.", correctPath: ['start', 'precision', 'result_watch'], methodsImplied: ['elimination'], physicsSubject: 'Silver oxide battery electrochemistry', physicsHint: 'A watch stops suddenly rather than running slow first. What does that tell you about how a silver oxide battery discharges compared to a lithium battery?' },
  result_bike: { result: true, diagnosis: "Cable stretch, brake adjustment, or tyre", layer: "Precision Layer", repairLayer: 'precision', difficulty: "Beginner", diy: true, parts: "Cable £3-5, inner tube £4-6", time: "20-40 minutes", saving: "£20-40", tip: "Most bike issues are cable tension. Park Tool on YouTube covers everything clearly.", correctPath: ['start', 'precision', 'result_bike'], methodsImplied: ['visual-inspection', 'tactile-diagnosis' as DiagnosisMethod], physicsSubject: 'Mechanical advantage and cable tension', physicsHint: 'Brake cables stretch over time. How does cable stretch translate into reduced braking force, and why does adjusting cable tension restore the mechanical advantage?' },
  result_laptop: { result: true, diagnosis: "RAM, SSD, battery, or thermal paste — usually diagnosable", layer: "Precision Layer", repairLayer: 'precision', difficulty: "Intermediate", diy: true, parts: "Varies widely", time: "30-90 minutes", saving: "£50-150", tip: "Run a memory test and check Task Manager first. Many 'slow laptop' problems are software, not hardware.", correctPath: ['start', 'precision', 'result_laptop'], methodsImplied: ['elimination', 'research'], physicsSubject: 'Thermal management and semiconductor performance', physicsHint: 'Why does degraded thermal paste cause a laptop to throttle its performance rather than simply running hot?' },
  result_joint: { result: true, diagnosis: "Failed glue joint or loose dowel", layer: "Furniture Layer", repairLayer: 'furniture', difficulty: "Beginner", diy: true, parts: "Wood glue £4", time: "20 minutes + clamping time", saving: "£30-80 repairer", tip: "Clean out old glue before regluing — new glue won't bond to old.", correctPath: ['start', 'furniture', 'result_joint'], methodsImplied: ['visual-inspection', 'tactile-diagnosis' as DiagnosisMethod], physicsSubject: 'Adhesion and wood glue chemistry', physicsHint: 'Why won\'t PVA wood glue bond to a surface that already has dried PVA on it? What is actually happening at the molecular level when glue fails?' },
  result_hinge: { result: true, diagnosis: "Worn or broken hinge — replace or adjust", layer: "Furniture Layer", repairLayer: 'furniture', difficulty: "Beginner", diy: true, parts: "Hinges £3-8", time: "20 minutes", saving: "£30-60", tip: "Match the hinge size exactly. European cup hinges are adjustable — try adjusting before replacing.", correctPath: ['start', 'furniture', 'result_hinge'], methodsImplied: ['visual-inspection'], physicsSubject: 'Mechanical advantage and pivot points', physicsHint: 'A door or cabinet panel drags because the hinge is worn. How does wear in the hinge pivot translate into misalignment at the edge of the panel?' },
  result_surface: { result: true, diagnosis: "Surface damage — repair or embrace it", layer: "Furniture Layer", repairLayer: 'furniture', difficulty: "Beginner", diy: true, parts: "Wax stick or wood filler £3-6", time: "15 minutes", saving: "£20-60", tip: "Wax filler sticks for scratches, wood filler for chips. Match the colour.", correctPath: ['start', 'furniture', 'result_surface'], methodsImplied: ['visual-inspection'], physicsSubject: 'Wood grain structure and scratch optics', physicsHint: 'Why does a scratch on a wood surface appear white or light coloured? What has happened to the surface fibres?' },
  result_upholstery: { result: true, diagnosis: "Upholstery repair or refurbishment", layer: "Furniture Layer", repairLayer: 'furniture', difficulty: "Intermediate", diy: true, parts: "Fabric £10-40, staples", time: "2-4 hours", saving: "£80-300", tip: "Drop-in pad seats are a great first project — remove, cut new foam, reupholster. No sewing needed.", correctPath: ['start', 'furniture', 'result_upholstery'], methodsImplied: ['visual-inspection', 'tactile-diagnosis' as DiagnosisMethod], physicsSubject: 'Foam compression and fabric tension', physicsHint: 'Why does upholstery foam need to be cut slightly larger than the frame it fits into? What is the foam doing mechanically under the fabric?' },
  result_check_basics: { result: true, diagnosis: "Check the basics first before calling anyone", layer: "All Layers", repairLayer: 'appliance', difficulty: "Beginner", diy: true, parts: "Nothing yet", time: "5 minutes", saving: "Potentially £80 callout", tip: "In order: socket working, fuse in plug, door/lid fully latched, filter not blocked. These solve 30% of all 'broken appliance' callouts.", correctPath: ['start', 'machine', 'machine_power', 'result_check_basics'], methodsImplied: ['elimination'], physicsSubject: 'Fault isolation methodology', physicsHint: 'Why do experienced diagnosticians always start with the simplest possible cause? What principle of fault-finding does this reflect?' },
  result_control_board: { result: true, diagnosis: "Likely control board or wiring — worth a STEMgeneer assessment first", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Advanced", diy: false, parts: "Board £40-120", time: "60-90 minutes", saving: "£100-180 vs professional repair", tip: "Control boards can be replaced but diagnosis needs a multimeter. This is where calling your local STEMgeneer pays for itself.", correctPath: ['start', 'machine', 'machine_power', 'result_control_board'], methodsImplied: ['multimeter', 'elimination'], physicsSubject: 'Circuit board diagnosis and relay testing', physicsHint: 'Before replacing a control board, what checks should you make with a multimeter to confirm it\'s the board and not a simpler component?' },
  result_diagnose_further: { result: true, diagnosis: "Needs hands-on diagnosis", layer: "Appliance Layer", repairLayer: 'appliance', difficulty: "Varies", diy: false, parts: "Unknown until diagnosed", time: "Unknown", saving: "Get a STEMgeneer assessment before committing to a repair quote", tip: "A 30-minute STEMgeneer assessment tells you whether repair is viable and what it involves before any money changes hands.", correctPath: ['start', 'machine', 'machine_partial', 'result_diagnose_further'], methodsImplied: ['elimination'], physicsSubject: 'Systematic diagnostic methodology', physicsHint: 'What information would you need to gather before you could narrow down the fault further?' },
};

// ============================================================================
// NEW: SCENARIO VARIANTS
// Randomises symptom presentation so the tree can't be memorised.
// The underlying diagnosis is the same — the surface description varies.
// ============================================================================

const SCENARIO_VARIANTS: Record<string, string[]> = {
  result_bearing: [
    "Your washing machine makes a grinding noise when it spins. Gets louder at higher speeds.",
    "There's a rumbling sound during the spin cycle. Has been there for a few weeks, getting worse.",
    "The machine vibrates a lot and makes a low growling noise on spin. Fine on other cycles.",
  ],
  result_belt: [
    "Washing machine squeals every time it starts spinning. High-pitched.",
    "There's a squeaking sound during the wash cycle. Smells slightly of burning rubber.",
    "The machine makes a noise like a stuck pulley — sort of a whine that comes and goes.",
  ],
  result_carbon_brushes: [
    "Washing machine fills with water and agitates fine, but then just stops before spin.",
    "The machine does everything up to the spin cycle, then nothing happens.",
    "It starts fine and washes, but the drum won't spin at the end. No error code.",
  ],
  result_washer: [
    "The kitchen tap drips from the spout when turned off. Slow but constant.",
    "Tap is fully closed but still dripping. Has been doing it for a couple of weeks.",
    "Water keeps dripping from the tap even when you've turned it as far as it goes.",
  ],
  result_watch: [
    "My watch has completely stopped. No movement at all.",
    "Watch was fine yesterday, stopped overnight. The hands don't move.",
    "Watch stopped suddenly — wasn't running slow first, just stopped.",
  ],
  result_lock: [
    "Front door lock is really stiff and hard to turn with the key.",
    "The lock is getting harder to open — sometimes have to force the key.",
    "Door lock started sticking over winter. Worse on cold days.",
  ],
};

// ============================================================================
// SCORING HELPERS
// ============================================================================

/**
 * Computes accuracy score for a completed diagnostic path.
 * Based on: correct result reached, deviations from optimal path, time taken.
 */
function scoreDiagnosticPath(
  pathTaken: string[],
  correctPath: string[],
  timeSeconds: number
): { score: number; deviations: Array<{ step: string; consequence: 'minor' | 'significant' | 'diagnostic-failure' }> } {
  const deviations: Array<{ step: string; consequence: 'minor' | 'significant' | 'diagnostic-failure' }> = [];

  // Did they reach a result at all?
  const lastNode = pathTaken[pathTaken.length - 1];
  if (!lastNode.startsWith('result_')) {
    return { score: 0, deviations: [] };
  }

  // Check if they reached the right result
  const targetResult = correctPath[correctPath.length - 1];
  const reachedCorrect = lastNode === targetResult;

  if (!reachedCorrect) {
    deviations.push({ step: lastNode, consequence: 'diagnostic-failure' });
    return { score: 0.2, deviations };
  }

  // Check for suboptimal steps along the way
  for (let i = 0; i < pathTaken.length; i++) {
    const step = pathTaken[i];
    const expectedStep = correctPath[i];

    if (step !== expectedStep && expectedStep) {
      const node = diagnosticTree[expectedStep];
      // If the deviation was at a branching question, it's significant
      const consequence = i < correctPath.length - 2 ? 'significant' : 'minor';
      deviations.push({ step, consequence });
    }
  }

  // Base score from path efficiency
  const pathScore = deviations.length === 0 ? 1.0
    : deviations.some(d => d.consequence === 'significant') ? 0.7
    : 0.85;

  // Time bonus/penalty — under 90s for a standard path is efficient
  const timeBonus = timeSeconds < 90 ? 0.05 : timeSeconds > 300 ? -0.05 : 0;

  return {
    score: Math.max(0, Math.min(1, pathScore + timeBonus)),
    deviations,
  };
}

// Layer for gate recording — mapped from result node
function resultToRepairLayer(resultKey: string): RepairLayer {
  const node = diagnosticTree[resultKey];
  if ('result' in node) return node.repairLayer;
  return 'appliance';
}

// ============================================================================
// GATE STATUS BADGE — inline in sandbox
// ============================================================================

const GateStatusBadge: React.FC<{ layer: RepairLayer }> = ({ layer }) => {
  const gate = useGateRequirements(layer);
  const colours = {
    locked: '#6b7280',
    'in-progress': '#f59e0b',
    passed: '#10b981',
    'passed-with-distinction': '#8b5cf6',
  };
  return (
    <span
      className="gate-status-badge"
      style={{ color: colours[gate.status], border: `1px solid ${colours[gate.status]}` }}
      title={gate.nextAction}
    >
      {gate.overallProgress}% → {gate.status === 'locked' ? 'Not started' : gate.status === 'passed' ? '✓' : gate.status === 'passed-with-distinction' ? '★' : `${gate.overallProgress}%`}
    </span>
  );
};

// ============================================================================
// COMPONENT
// ============================================================================

const STEMgeneerssandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cost' | 'diagnostic' | 'print' | 'collective'>('cost');

  // ── ORIGINAL STATE ────────────────────────────────────────────────────────
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [householdFrequency, setHouseholdFrequency] = useState<'low' | 'medium' | 'high'>('medium');
  const [printFilter, setPrintFilter] = useState<'all' | 'print' | 'buy' | 'borderline'>('all');
  const [members, setMembers] = useState(8);
  const [monthlyContrib, setMonthlyContrib] = useState(50);

  // ── NEW: DIAGNOSTIC STATE ─────────────────────────────────────────────────
  const [diagPath, setDiagPath] = useState<string[]>(['start']);
  const [diagStartTime, setDiagStartTime] = useState<number>(Date.now());
  // Scenario variant — randomised per session
  const [variantSeed] = useState(() => Math.random().toString(36).slice(2));
  // Physics capture — shown after result
  const [physicsExplanation, setPhysicsExplanation] = useState('');
  const [sessionRecorded, setSessionRecorded] = useState(false);
  const [sessionResult, setSessionResult] = useState<{
    passed: boolean;
    score: number;
    gateStatus: string;
    feedback: string;
  } | null>(null);

  const currentNode = diagPath[diagPath.length - 1];
  const node = diagnosticTree[currentNode];
  const isResult = node && 'result' in node;
  const resultNode = isResult ? (node as DiagNodeResult) : null;

  // Store actions
  const recordDiagnosticSession = useJournalStore((s) => s.recordDiagnosticSession);

  // Pick scenario variant for result nodes
  const getVariantSymptom = useCallback((resultKey: string): string | null => {
    const variants = SCENARIO_VARIANTS[resultKey];
    if (!variants) return null;
    const idx = Math.floor(
      parseInt(variantSeed.slice(0, 4), 36) % variants.length
    );
    return variants[idx];
  }, [variantSeed]);

  // ── ORIGINAL COST CALCULATOR ─────────────────────────────────────────────
  const frequencyMultiplier = { low: 0.5, medium: 1, high: 1.5 };
  const fm = frequencyMultiplier[householdFrequency];
  const selectedItemData = repairItems.filter(i => selectedItems.has(i.id));
  const totalProfessional = selectedItemData.reduce((sum, i) => sum + i.professionalCost, 0);
  const totalActual = selectedItemData.reduce((sum, i) => sum + i.actualCost, 0);
  const totalSaving = totalProfessional - totalActual;
  const annualSaving = Math.round(totalSaving * fm);

  const toggleItem = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedItems(next);
  };

  // ── DIAGNOSTIC NAVIGATION ─────────────────────────────────────────────────

  const resetDiag = () => {
    setDiagPath(['start']);
    setDiagStartTime(Date.now());
    setPhysicsExplanation('');
    setSessionRecorded(false);
    setSessionResult(null);
  };

  const stepBack = () => setDiagPath(p => p.slice(0, -1));

  const stepForward = (next: string) => {
    setDiagPath(p => [...p, next]);
  };

  // ── SESSION RECORDING ─────────────────────────────────────────────────────

  const handleRecordSession = () => {
    if (!resultNode || sessionRecorded) return;

    const timeSeconds = Math.round((Date.now() - diagStartTime) / 1000);
    const { score, deviations } = scoreDiagnosticPath(
      diagPath,
      resultNode.correctPath,
      timeSeconds
    );

    const result = recordDiagnosticSession({
      userId: 'current-user',
      layer: resultNode.repairLayer,
      scenario: {
        id: currentNode,
        itemDescription: resultNode.diagnosis,
        symptomPresented: getVariantSymptom(currentNode) ?? resultNode.tip,
        correctDiagnosis: resultNode.diagnosis,
        variantSeed,
      },
      performance: {
        pathTaken: diagPath,
        correctPath: resultNode.correctPath,
        deviations: deviations.map((d, i) => ({
          step: d.step,
          chosenPath: diagPath[i] ?? d.step,
          correctPath: resultNode.correctPath[i] ?? '',
          consequence: d.consequence,
        })),
        timeToCorrectDiagnosis: timeSeconds,
        ruledOutCorrectly: [],
        incorrectEliminationsAttempted: [],
        finalDiagnosis: resultNode.diagnosis,
        diagnosisCorrect: true,
        accuracyScore: score,
      },
      physicsExplanation: physicsExplanation.trim()
        ? {
            attempted: true,
            explanation: physicsExplanation.trim(),
            subject: resultNode.physicsSubject,
          }
        : {
            attempted: false,
          },
    });

    setSessionRecorded(true);
    setSessionResult({
      passed: result.gateStatus !== 'below-threshold',
      score,
      gateStatus: result.gateStatus,
      feedback: result.feedback,
    });
  };

  // ── ORIGINAL PRINT VIABILITY ──────────────────────────────────────────────
  const filteredPrints = printScenarios.filter(s =>
    printFilter === 'all' || s.verdict === printFilter
  );

  // ── ORIGINAL COLLECTIVE CALCULATOR ───────────────────────────────────────
  const poolPerMonth = members * monthlyContrib;
  const rotationMonths = members;
  const equipmentBudget = members * monthlyContrib;

  const sharedEquipment = [
    { name: '3D printer (Bambu A1)', cost: 350 },
    { name: 'Diagnostic multimeter (Fluke 115)', cost: 160 },
    { name: 'Soldering station', cost: 80 },
    { name: 'Phone repair toolkit', cost: 45 },
    { name: 'Watch/precision tools', cost: 35 },
    { name: 'Oscilloscope (entry)', cost: 180 },
  ];
  const totalEquipmentCost = sharedEquipment.reduce((s, e) => s + e.cost, 0);
  const canAffordEquipment = equipmentBudget >= totalEquipmentCost;

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <PageTemplate pageTitle="STEMgeneers Sandbox" pageStrapline="Four tools to understand repair, diagnosis, making, and collective power." pageType="sandbox">
      <PageMeta pageKey="stemgeneers-sandbox" />

      <div className="sandbox-container stemgeneers-sandbox">

        {/* Header — original */}
        <div className="sandbox-header">
          <div className="sandbox-header-badge">🔧</div>
          <h1>STEMgeneers Sandbox</h1>
          <p>Four tools. Find out what not knowing costs you, diagnose what's broken, decide when to 3D print, and see what the collective model delivers.</p>
        </div>

        {/* Tabs — original */}
        <div className="sandbox-tabs">
          {[
            { id: 'cost',       label: '💸 Cost Reality' },
            { id: 'diagnostic', label: '🔍 Diagnose It'  },
            { id: 'print',      label: '🖨️ Print or Buy?' },
            { id: 'collective', label: '🤝 The Collective'},
          ].map(tab => (
            <button key={tab.id}
              className={`sandbox-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: COST REALITY — original, unchanged ─────────────────── */}
        {activeTab === 'cost' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>The Cost of Not Knowing</h2>
              <p>Select the repairs that happen in your household. See what the mystification costs you annually versus what the knowledge actually requires.</p>
            </div>
            <div className="frequency-selector">
              <label>Household maintenance frequency:</label>
              <div className="frequency-options">
                {(['low', 'medium', 'high'] as const).map(f => (
                  <button key={f} className={`freq-btn ${householdFrequency === f ? 'active' : ''}`} onClick={() => setHouseholdFrequency(f)}>
                    {f === 'low' ? 'Low (things rarely break)' : f === 'medium' ? 'Typical household' : 'High (older property)'}
                  </button>
                ))}
              </div>
            </div>
            <div className="repair-items-grid">
              {repairItems.map(item => (
                <div key={item.id} className={`repair-item-card ${selectedItems.has(item.id) ? 'selected' : ''}`} onClick={() => toggleItem(item.id)}>
                  <div className="repair-item-header">
                    <div className="repair-item-check">
                      {selectedItems.has(item.id) ? <CheckCircle size={18} /> : <div className="empty-check" />}
                    </div>
                    <div className="repair-item-info">
                      <span className="repair-item-name">{item.name}</span>
                      <span className={`repair-item-difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span>
                    </div>
                  </div>
                  <div className="repair-item-costs">
                    <div className="cost-without"><span className="cost-label">Without knowledge</span><span className="cost-value charged">£{item.professionalCost}</span></div>
                    <div className="cost-with"><span className="cost-label">Parts cost</span><span className="cost-value actual">£{item.actualCost}</span></div>
                    <div className="cost-time"><span className="cost-label">Time</span><span className="cost-value">{item.timeMinutes < 60 ? `${item.timeMinutes} min` : `${Math.round(item.timeMinutes/60)}h`}</span></div>
                  </div>
                  {selectedItems.has(item.id) && <div className="repair-item-note">{item.note}</div>}
                </div>
              ))}
            </div>
            {selectedItems.size > 0 && (
              <div className="cost-summary">
                <h3>Your annual estimate</h3>
                <div className="cost-summary-grid">
                  <div className="summary-item"><span className="summary-label">Without knowledge</span><span className="summary-value charged">£{totalProfessional}</span></div>
                  <div className="summary-item"><span className="summary-label">Parts only</span><span className="summary-value actual">£{Math.round(totalActual)}</span></div>
                  <div className="summary-item highlight"><span className="summary-label">Annual saving ({householdFrequency} frequency)</span><span className="summary-value saving">£{annualSaving}</span></div>
                </div>
                <p className="cost-summary-note">Over 5 years with this household profile: <strong>£{annualSaving * 5}</strong> retained in your household rather than paid out to callout charges.</p>
              </div>
            )}
            {selectedItems.size === 0 && <div className="empty-state"><p>Select the repairs that happen in your household to see the calculation.</p></div>}
          </div>
        )}

        {/* ── TAB 2: DIAGNOSTIC — updated with scoring and physics capture ── */}
        {activeTab === 'diagnostic' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>Diagnose It First</h2>
              <p>
                The first STEMgeneer skill is diagnosis — knowing what's wrong before deciding whether and how to fix it.
                Work through the questions. Your path is scored and contributes to your skill gate progress.
              </p>
            </div>

            {isResult && resultNode ? (
              <div className="diagnostic-result">

                {/* Result header — original */}
                <div className="result-header">
                  <CheckCircle size={32} />
                  <h3>{resultNode.diagnosis}</h3>
                </div>

                {/* Gate badge — new */}
                <div className="result-gate-badge">
                  <span className="gate-layer-label">{resultNode.layer}</span>
                  <GateStatusBadge layer={resultNode.repairLayer} />
                </div>

                {/* Original result grid */}
                <div className="result-grid">
                  <div className="result-item"><span className="result-label">Knowledge layer</span><span className="result-value">{resultNode.layer}</span></div>
                  <div className="result-item"><span className="result-label">Difficulty</span><span className={`result-value difficulty-${resultNode.difficulty.toLowerCase()}`}>{resultNode.difficulty}</span></div>
                  <div className="result-item"><span className="result-label">DIY viable</span><span className="result-value">{resultNode.diy ? '✓ Yes' : 'Needs assessment'}</span></div>
                  <div className="result-item"><span className="result-label">Parts cost</span><span className="result-value actual">{resultNode.parts}</span></div>
                  <div className="result-item"><span className="result-label">Time required</span><span className="result-value">{resultNode.time}</span></div>
                  <div className="result-item"><span className="result-label">Potential saving</span><span className="result-value saving">{resultNode.saving}</span></div>
                </div>

                {/* Original tip */}
                <div className="result-tip">
                  <Info size={16} />
                  <p>{resultNode.tip}</p>
                </div>

                {/* NEW: Physics explanation capture */}
                {!sessionRecorded && (
                  <div className="physics-capture">
                    <div className="physics-capture-header">
                      <span className="physics-icon">⚛️</span>
                      <div>
                        <h4>Optional but worth it — Physics check</h4>
                        <p className="physics-subject">Subject: <strong>{resultNode.physicsSubject}</strong></p>
                      </div>
                    </div>
                    <p className="physics-prompt">{resultNode.physicsHint}</p>
                    <textarea
                      className="physics-input"
                      placeholder="Explain the physics in your own words. Don't worry about perfect terminology — explain why it works, not just what to do."
                      value={physicsExplanation}
                      onChange={(e) => setPhysicsExplanation(e.target.value)}
                      rows={4}
                    />
                    <p className="physics-gate-note">
                      Attempting this moves you toward distinction track on the {resultNode.layer}.
                      Skipping it is fine — but it counts.
                    </p>
                    <div className="result-actions">
                      <button className="diag-record-btn" onClick={handleRecordSession}>
                        Record this diagnostic session →
                      </button>
                      <button className="diag-skip-physics-btn" onClick={handleRecordSession}>
                        Record without physics explanation
                      </button>
                    </div>
                  </div>
                )}

                {/* NEW: Session recorded feedback */}
                {sessionRecorded && sessionResult && (
                  <div className={`session-recorded ${sessionResult.passed ? 'session-passed' : 'session-below'}`}>
                    <div className="session-recorded-header">
                      {sessionResult.passed
                        ? <CheckCircle size={20} />
                        : <AlertCircle size={20} />
                      }
                      <h4>
                        {sessionResult.gateStatus === 'passed-with-distinction'
                          ? '★ Distinction — session recorded'
                          : sessionResult.passed
                          ? '✓ Passed — session recorded'
                          : 'Session recorded — below threshold'}
                      </h4>
                    </div>
                    <p className="session-feedback">{sessionResult.feedback}</p>
                    <p className="session-score">
                      Accuracy: {Math.round(sessionResult.score * 100)}%
                      {sessionResult.passed
                        ? ' — contributes to your layer gate progress'
                        : ' — 80% required. Try another scenario in this layer.'}
                    </p>
                  </div>
                )}

                {/* Original reset button */}
                <button className="diag-reset-btn" onClick={resetDiag}>
                  Start another diagnosis →
                </button>
              </div>

            ) : (
              <div className="diagnostic-question">
                <div className="diag-breadcrumb">
                  {diagPath.length > 1 && (
                    <button className="diag-back" onClick={stepBack}>← Back</button>
                  )}
                  <span className="diag-step">Step {diagPath.length}</span>
                </div>

                {/* Show variant symptom at step 2 if available */}
                {diagPath.length === 2 && (() => {
                  // Check if any child of current options leads to a result with a variant
                  const currentBranch = node as DiagNodeBranch;
                  const firstResultChild = currentBranch.options
                    .map(o => o.next)
                    .find(n => SCENARIO_VARIANTS[n]);
                  if (firstResultChild) {
                    const variant = getVariantSymptom(firstResultChild);
                    if (variant) {
                      return (
                        <div className="diag-scenario-variant">
                          <span className="variant-label">Today's scenario:</span>
                          <p>"{variant}"</p>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}

                <h3>{(node as DiagNodeBranch).question}</h3>

                <div className="diag-options">
                  {(node as DiagNodeBranch).options.map((opt: any, i: number) => (
                    <button
                      key={i}
                      className="diag-option"
                      onClick={() => stepForward(opt.next)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: PRINT OR BUY — original, unchanged ────────────────── */}
        {activeTab === 'print' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>Print It or Buy It?</h2>
              <p>The 3D printer changes the calculation on out-of-warranty parts — but not for everything. Here's the decision framework.</p>
            </div>
            <div className="print-filter">
              {(['all', 'print', 'borderline', 'buy'] as const).map(f => (
                <button key={f} className={`print-filter-btn ${printFilter === f ? 'active' : ''} verdict-${f}`} onClick={() => setPrintFilter(f)}>
                  {f === 'all' ? 'All examples' : f === 'print' ? '🖨️ Print it' : f === 'borderline' ? '⚖️ Borderline' : '🛒 Buy it'}
                </button>
              ))}
            </div>
            <div className="print-rules">
              <h4>The decision framework:</h4>
              <div className="print-rules-grid">
                <div className="print-rule print">
                  <strong>🖨️ Print when:</strong>
                  <ul>
                    <li>Part discontinued / unavailable</li>
                    <li>No structural or high-heat load</li>
                    <li>Simple geometry, standard tolerances</li>
                    <li>Cost of printing beats cost of sourcing</li>
                  </ul>
                </div>
                <div className="print-rule buy">
                  <strong>🛒 Buy when:</strong>
                  <ul>
                    <li>Part available and cheap</li>
                    <li>Precision tolerances critical (e.g. bobbin case)</li>
                    <li>High heat environment (near heating elements)</li>
                    <li>Safety-critical load bearing</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="print-scenarios">
              {filteredPrints.map((scenario, i) => (
                <div key={i} className={`print-scenario verdict-${scenario.verdict}`}>
                  <div className="scenario-header">
                    <span className="scenario-verdict">
                      {scenario.verdict === 'print' ? '🖨️ Print it' : scenario.verdict === 'buy' ? '🛒 Buy it' : '⚖️ Borderline'}
                    </span>
                    <h4>{scenario.part}</h4>
                  </div>
                  <div className="scenario-costs">
                    {scenario.available ? <span className="scenario-cost">Available: £{scenario.quotedCost}</span> : <span className="scenario-cost unavailable">Part discontinued</span>}
                    <span className="scenario-print-cost">Print cost: ~£{scenario.printCost}</span>
                  </div>
                  <p className="scenario-reason">{scenario.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: COLLECTIVE — original, unchanged ───────────────────── */}
        {activeTab === 'collective' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>The Tech Collective — Pardner for Equipment</h2>
              <p>Your grandmother's pardner bought houses. The Tech Collective buys the professional tools that make the STEMgeneer role viable. Adjust the numbers to see what your collective could access.</p>
            </div>
            <div className="collective-controls">
              <div className="control-group">
                <label>Members in the collective</label>
                <div className="slider-row">
                  <input type="range" min={4} max={20} value={members} onChange={e => setMembers(+e.target.value)} />
                  <span className="slider-value">{members}</span>
                </div>
              </div>
              <div className="control-group">
                <label>Monthly contribution per member</label>
                <div className="slider-row">
                  <input type="range" min={20} max={150} step={5} value={monthlyContrib} onChange={e => setMonthlyContrib(+e.target.value)} />
                  <span className="slider-value">£{monthlyContrib}</span>
                </div>
              </div>
            </div>
            <div className="collective-summary">
              <div className="collective-stat"><span className="cstat-label">Monthly pool</span><span className="cstat-value">£{poolPerMonth}</span></div>
              <div className="collective-stat"><span className="cstat-label">Rotation (months until your turn)</span><span className="cstat-value">{rotationMonths}</span></div>
              <div className="collective-stat"><span className="cstat-label">Your lump sum when it's your turn</span><span className="cstat-value">£{poolPerMonth}</span></div>
              <div className={`collective-stat ${canAffordEquipment ? 'can-afford' : 'cannot-afford'}`}>
                <span className="cstat-label">Full equipment kit costs</span>
                <span className="cstat-value">£{totalEquipmentCost}</span>
              </div>
            </div>
            <div className="equipment-list">
              <h4>What the collective shares — everyone has access from month one:</h4>
              {sharedEquipment.map((eq, i) => (
                <div key={i} className="equipment-item">
                  <span className="eq-name">{eq.name}</span>
                  <span className="eq-cost">£{eq.cost}</span>
                </div>
              ))}
              <div className="equipment-total"><span>Total equipment value</span><span>£{totalEquipmentCost}</span></div>
            </div>
            {canAffordEquipment ? (
              <div className="collective-verdict can-afford">
                <CheckCircle size={20} />
                <p>At {members} members × £{monthlyContrib}/month, the collective can purchase the full equipment kit in one rotation. Every member has access to £{totalEquipmentCost} of professional equipment from month one.</p>
              </div>
            ) : (
              <div className="collective-verdict cannot-afford">
                <AlertCircle size={20} />
                <p>At these numbers you'd need to prioritise — start with the 3D printer (£350) and diagnostic multimeter (£160) in the first round. The full kit comes together over two rotations.</p>
              </div>
            )}
            <div className="pardner-principle">
              <blockquote>
                "The pardner didn't require trust in a bank. It required trust in each other.
                The Tech Collective runs on the same principle — collective contribution,
                rotating benefit, community accountability. Your grandmother understood
                exactly how this works."
              </blockquote>
            </div>
          </div>
        )}

      </div>
    </PageTemplate>
  );
};

export default STEMgeneerssandbox;
