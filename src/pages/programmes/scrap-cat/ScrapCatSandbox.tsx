import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench, ArrowRight, ArrowLeft, Check, Download, Clock,
  AlertTriangle, CheckCircle, XCircle, HelpCircle, Eye,
  Zap, Battery, Wifi, Volume2, Monitor, Smartphone, 
  Laptop, Bike, Gamepad2, Coffee, ChevronDown, ChevronUp,
  Lightbulb, Target, Award, RotateCcw, FileText, Calendar
} from 'lucide-react';
import './sandbox.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  emoji: string;
  description: string;
  commonFaults: string[];
}

interface Symptom {
  id: string;
  deviceId: string;
  name: string;
  description: string;
  questions: DiagnosticQuestion[];
}

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: DiagnosticOption[];
}

interface DiagnosticOption {
  id: string;
  text: string;
  nextQuestionId?: string;
  diagnosis?: Diagnosis;
}

interface Diagnosis {
  faultName: string;
  likelihood: 'high' | 'medium' | 'low';
  explanation: string;
  commonCauses: string[];
  toolsNeeded: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  estimatedTime: string;
  estimatedCost: string;
  repairSteps: string[];
  warnings: string[];
  canFixAtScrapCat: boolean;
  videoResources?: string[];
}

interface DiagnosticSession {
  deviceId: string;
  symptomId: string;
  answers: Record<string, string>;
  diagnosis: Diagnosis | null;
  completedAt?: Date;
}

// ============================================
// DATA
// ============================================

const DEVICE_TYPES: DeviceType[] = [
  {
    id: 'smartphone',
    name: 'Smartphone',
    icon: <Smartphone size={32} />,
    emoji: '📱',
    description: 'iPhones, Android phones, and tablets',
    commonFaults: ['Cracked screen', 'Battery drain', 'Charging issues', 'Speaker problems', 'Camera not working']
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: <Laptop size={32} />,
    emoji: '💻',
    description: 'Windows, Mac, and Chromebooks',
    commonFaults: ['Won\'t turn on', 'Slow performance', 'Overheating', 'Keyboard issues', 'Screen problems']
  },
  {
    id: 'ebike',
    name: 'E-Bike / Scooter',
    icon: <Bike size={32} />,
    emoji: '🚲',
    description: 'Electric bikes and scooters',
    commonFaults: ['Battery not charging', 'Motor issues', 'Display problems', 'Throttle issues', 'Range reduced']
  },
  {
    id: 'console',
    name: 'Gaming Console',
    icon: <Gamepad2 size={32} />,
    emoji: '🎮',
    description: 'PlayStation, Xbox, Nintendo',
    commonFaults: ['Won\'t turn on', 'Disc read errors', 'Overheating', 'Controller issues', 'HDMI problems']
  },
  {
    id: 'appliance',
    name: 'Small Appliance',
    icon: <Coffee size={32} />,
    emoji: '☕',
    description: 'Kettles, toasters, blenders, etc.',
    commonFaults: ['Won\'t turn on', 'Heating problems', 'Motor issues', 'Leaking', 'Strange noises']
  }
];

const SYMPTOMS: Record<string, Symptom[]> = {
  'smartphone': [
    {
      id: 'phone-wont-charge',
      deviceId: 'smartphone',
      name: 'Phone won\'t charge',
      description: 'Device doesn\'t charge or charges very slowly',
      questions: [
        {
          id: 'q1',
          question: 'What happens when you plug in the charger?',
          options: [
            { id: 'a', text: 'Nothing at all - no light, no sound, no icon', nextQuestionId: 'q2' },
            { id: 'b', text: 'Charging icon appears but percentage doesn\'t increase', nextQuestionId: 'q3' },
            { id: 'c', text: 'Charges very slowly (1% per hour or less)', nextQuestionId: 'q4' },
            { id: 'd', text: 'Charges sometimes, not others', nextQuestionId: 'q5' }
          ]
        },
        {
          id: 'q2',
          question: 'Have you tried a different charger and cable?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, same result with different charger/cable',
              diagnosis: {
                faultName: 'Charging Port Failure',
                likelihood: 'high',
                explanation: 'The charging port inside the phone is likely damaged or has debris blocking the connection.',
                commonCauses: ['Lint/debris in port', 'Bent pins', 'Water damage', 'Worn connector', 'Broken solder joints'],
                toolsNeeded: ['Plastic spudger', 'Compressed air', 'Magnifying glass', 'Possibly soldering equipment'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 2 hours',
                estimatedCost: '£0 (cleaning) - £50 (port replacement)',
                repairSteps: [
                  'Power off the device completely',
                  'Inspect port with flashlight for visible debris',
                  'Gently clean with plastic tool (never metal)',
                  'Use compressed air to blow out debris',
                  'Test with known-good charger',
                  'If still not working, port may need replacement'
                ],
                warnings: ['Never use metal tools in the port', 'Be gentle to avoid further damage'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, only tried my usual charger',
              diagnosis: {
                faultName: 'Faulty Charger or Cable',
                likelihood: 'high',
                explanation: 'Before assuming the phone is broken, we need to rule out the charger and cable.',
                commonCauses: ['Frayed cable', 'Damaged charger', 'Wrong wattage charger', 'Counterfeit accessories'],
                toolsNeeded: ['A known-good charger', 'A known-good cable'],
                difficultyLevel: 'beginner',
                estimatedTime: '5 minutes',
                estimatedCost: '£0 - £20',
                repairSteps: [
                  'Borrow a charger and cable that definitely works',
                  'Test with the known-good accessories',
                  'If it charges, replace your charger/cable',
                  'If still nothing, the phone port needs attention'
                ],
                warnings: ['Use manufacturer-approved chargers when possible'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q3',
          question: 'Does the phone get warm/hot while "charging"?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, it gets noticeably warm or hot',
              diagnosis: {
                faultName: 'Battery or Charging Circuit Issue',
                likelihood: 'high',
                explanation: 'Heat during charging without actual charging suggests a battery or charging IC problem.',
                commonCauses: ['Degraded battery', 'Damaged charging IC', 'Short circuit', 'Swollen battery'],
                toolsNeeded: ['Opening tools', 'Multimeter', 'Replacement battery (possibly)'],
                difficultyLevel: 'advanced',
                estimatedTime: '1-2 hours',
                estimatedCost: '£20-80',
                repairSteps: [
                  'IMPORTANT: If battery is swollen, stop using immediately',
                  'Open device carefully following proper procedure',
                  'Inspect battery for swelling or damage',
                  'Test battery voltage with multimeter',
                  'Replace battery if degraded',
                  'If problem persists, charging IC may need repair'
                ],
                warnings: ['Swollen batteries are a fire risk', 'Do not puncture or bend batteries', 'Dispose of old batteries properly'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, stays at normal temperature',
              diagnosis: {
                faultName: 'Software or Battery Calibration Issue',
                likelihood: 'medium',
                explanation: 'The phone may be charging but software isn\'t registering it correctly.',
                commonCauses: ['Software bug', 'Battery calibration off', 'Corrupted system files'],
                toolsNeeded: ['None (software fix)'],
                difficultyLevel: 'beginner',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£0',
                repairSteps: [
                  'Force restart the device',
                  'Let battery drain completely (if possible)',
                  'Charge while powered off for 2 hours',
                  'Power on and check battery health in settings',
                  'If persists, consider factory reset (backup first!)'
                ],
                warnings: ['Always backup before factory reset'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q4',
          question: 'Does the phone charge faster when powered off?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, much faster when off',
              diagnosis: {
                faultName: 'Background Process Drain',
                likelihood: 'high',
                explanation: 'Apps or processes are using power faster than the charger can provide.',
                commonCauses: ['Rogue apps', 'Background updates', 'Location services', 'Old charger with low wattage'],
                toolsNeeded: ['None (software fix)', 'Higher wattage charger (optional)'],
                difficultyLevel: 'beginner',
                estimatedTime: '15-30 mins',
                estimatedCost: '£0-30',
                repairSteps: [
                  'Check battery usage in settings to find power-hungry apps',
                  'Force stop or uninstall problematic apps',
                  'Disable location services and background refresh',
                  'Enable airplane mode while charging',
                  'Consider upgrading to a faster charger'
                ],
                warnings: ['Some apps restart themselves after force stop'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, still slow even when off',
              diagnosis: {
                faultName: 'Charging Port or Cable Issue',
                likelihood: 'high',
                explanation: 'A poor connection is limiting the charging speed.',
                commonCauses: ['Debris in port', 'Damaged cable', 'Worn port', 'Insufficient charger wattage'],
                toolsNeeded: ['Plastic cleaning tool', 'Known-good cable and charger'],
                difficultyLevel: 'beginner',
                estimatedTime: '15-30 mins',
                estimatedCost: '£0-20',
                repairSteps: [
                  'Clean the charging port thoroughly',
                  'Inspect cable for damage',
                  'Test with a higher wattage charger',
                  'Try a different cable',
                  'If no improvement, port may need replacement'
                ],
                warnings: ['Never use metal tools in the port'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q5',
          question: 'Does wiggling the cable affect charging?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, it charges at certain angles',
              diagnosis: {
                faultName: 'Loose Charging Port',
                likelihood: 'high',
                explanation: 'The charging port has become loose or damaged internally.',
                commonCauses: ['Worn port from repeated use', 'Pulled cable at angle', 'Dropped phone', 'Poor quality cables'],
                toolsNeeded: ['Phone opening tools', 'Soldering equipment (possibly)', 'Replacement port (possibly)'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£10-40',
                repairSteps: [
                  'First, try cleaning the port thoroughly',
                  'If cleaning doesn\'t help, port needs inspection',
                  'Open device following proper procedure',
                  'Check solder joints on port',
                  'Re-solder if joints are cracked',
                  'Replace port if damaged'
                ],
                warnings: ['Improper opening can damage the phone further', 'Some ports are soldered directly to motherboard'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, wiggling makes no difference',
              diagnosis: {
                faultName: 'Intermittent Connection Issue',
                likelihood: 'medium',
                explanation: 'Could be a software issue, faulty charger, or internal problem.',
                commonCauses: ['Software glitch', 'Faulty charger', 'Damaged cable', 'Moisture in port'],
                toolsNeeded: ['Known-good charger and cable', 'Isopropyl alcohol'],
                difficultyLevel: 'beginner',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£0-20',
                repairSteps: [
                  'Try a different charger and cable',
                  'Clean port with isopropyl alcohol (power off first!)',
                  'Let dry completely before testing',
                  'Force restart the phone',
                  'If problem persists, may need professional diagnosis'
                ],
                warnings: ['Never charge with moisture in the port'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phone-battery-drain',
      deviceId: 'smartphone',
      name: 'Battery drains quickly',
      description: 'Battery doesn\'t last as long as it used to',
      questions: [
        {
          id: 'q1',
          question: 'How old is the phone?',
          options: [
            { id: 'a', text: 'Less than 1 year', nextQuestionId: 'q2' },
            { id: 'b', text: '1-2 years', nextQuestionId: 'q3' },
            { 
              id: 'c', 
              text: 'More than 2 years',
              diagnosis: {
                faultName: 'Battery Degradation',
                likelihood: 'high',
                explanation: 'Lithium batteries naturally degrade over time. After 2+ years and hundreds of charge cycles, capacity is significantly reduced.',
                commonCauses: ['Normal chemical aging', 'High charge cycle count', 'Heat exposure', 'Fast charging wear'],
                toolsNeeded: ['Phone opening tools', 'Replacement battery', 'Adhesive'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£15-50',
                repairSteps: [
                  'Check battery health in settings (if available)',
                  'If below 80% capacity, replacement recommended',
                  'Research your specific model for replacement procedure',
                  'Order correct replacement battery',
                  'Follow proper opening procedure',
                  'Carefully disconnect and remove old battery',
                  'Install new battery and reassemble'
                ],
                warnings: ['Use quality replacement batteries, not cheap knockoffs', 'Be careful with battery adhesive', 'Never puncture batteries'],
                canFixAtScrapCat: true,
                videoResources: ['iFixit has model-specific guides']
              }
            }
          ]
        },
        {
          id: 'q2',
          question: 'Did the problem start suddenly or gradually?',
          options: [
            { 
              id: 'a', 
              text: 'Suddenly, after an update or new app',
              diagnosis: {
                faultName: 'Software-Related Battery Drain',
                likelihood: 'high',
                explanation: 'A recent software change is likely causing excessive battery use.',
                commonCauses: ['Buggy app update', 'OS update issues', 'Rogue background process', 'Malware'],
                toolsNeeded: ['None (software fix)'],
                difficultyLevel: 'beginner',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£0',
                repairSteps: [
                  'Check battery usage in settings',
                  'Identify apps using unusual amounts of battery',
                  'Uninstall recently installed apps',
                  'Update or reinstall problematic apps',
                  'If after OS update, wait for bug fix or factory reset'
                ],
                warnings: ['Backup before factory reset'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Suddenly, for no apparent reason',
              nextQuestionId: 'q3'
            }
          ]
        },
        {
          id: 'q3',
          question: 'Check Settings > Battery. What\'s using the most power?',
          options: [
            { 
              id: 'a', 
              text: 'Screen is the top user (normal)',
              diagnosis: {
                faultName: 'High Screen-On Time or Brightness',
                likelihood: 'medium',
                explanation: 'The screen is naturally the biggest battery drain. If it\'s using more than 30-40%, usage patterns or settings may be the issue.',
                commonCauses: ['High screen brightness', 'Long screen-on time', 'High refresh rate', 'Always-on display'],
                toolsNeeded: ['None (settings adjustment)'],
                difficultyLevel: 'beginner',
                estimatedTime: '10 mins',
                estimatedCost: '£0',
                repairSteps: [
                  'Enable auto-brightness',
                  'Reduce screen timeout to 30 seconds',
                  'Lower refresh rate if available',
                  'Disable always-on display',
                  'Use dark mode on OLED screens'
                ],
                warnings: [],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'An app I don\'t recognize or rarely use',
              diagnosis: {
                faultName: 'Rogue App or Malware',
                likelihood: 'high',
                explanation: 'An app is running excessively in the background, possibly malicious.',
                commonCauses: ['Malware', 'Poorly coded app', 'Stuck process', 'App not closing properly'],
                toolsNeeded: ['None (software fix)'],
                difficultyLevel: 'beginner',
                estimatedTime: '15-30 mins',
                estimatedCost: '£0',
                repairSteps: [
                  'Force stop the problematic app immediately',
                  'Check what permissions the app has',
                  'Uninstall if you don\'t need it',
                  'Run a security scan if available',
                  'Check for and remove any recently installed suspicious apps'
                ],
                warnings: ['Some malware reinstalls itself - may need factory reset'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'c', 
              text: 'System or Android/iOS taking lots of battery',
              diagnosis: {
                faultName: 'System Process Issue',
                likelihood: 'medium',
                explanation: 'System processes are using more power than normal, possibly due to corruption or stuck processes.',
                commonCauses: ['Stuck system process', 'Corrupted cache', 'OS bug', 'Background sync issues'],
                toolsNeeded: ['None (software fix)'],
                difficultyLevel: 'beginner',
                estimatedTime: '30 mins - 2 hours',
                estimatedCost: '£0',
                repairSteps: [
                  'Force restart the phone',
                  'Clear system cache (method varies by phone)',
                  'Disable background sync for apps you don\'t need',
                  'Check for system updates',
                  'If persists, consider factory reset (backup first!)'
                ],
                warnings: ['Always backup before factory reset'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phone-no-sound',
      deviceId: 'smartphone',
      name: 'No sound from speaker',
      description: 'Can\'t hear calls, media, or notifications',
      questions: [
        {
          id: 'q1',
          question: 'Is the phone stuck in headphone mode?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, shows headphone icon but nothing plugged in',
              diagnosis: {
                faultName: 'Stuck Headphone Jack Detection',
                likelihood: 'high',
                explanation: 'The phone thinks headphones are connected, routing all audio there.',
                commonCauses: ['Debris in headphone jack', 'Moisture in jack', 'Broken detection pin', 'Software glitch'],
                toolsNeeded: ['Flashlight', 'Plastic pick', 'Compressed air', 'Isopropyl alcohol'],
                difficultyLevel: 'beginner',
                estimatedTime: '15-30 mins',
                estimatedCost: '£0',
                repairSteps: [
                  'Power off the phone',
                  'Inspect headphone jack with flashlight for debris',
                  'Gently clean with plastic pick or compressed air',
                  'If moisture suspected, let dry completely',
                  'Force restart phone',
                  'If persists, headphone jack may need repair'
                ],
                warnings: ['Never use metal in the jack', 'Be gentle to avoid pushing debris deeper'],
                canFixAtScrapCat: true
              }
            },
            { id: 'b', text: 'No, no headphone icon showing', nextQuestionId: 'q2' }
          ]
        },
        {
          id: 'q2',
          question: 'Check volume - is it turned up and not on silent/vibrate?',
          options: [
            { id: 'a', text: 'Yes, volume is up and not on silent', nextQuestionId: 'q3' },
            { 
              id: 'b', 
              text: 'That was it - it was on silent!',
              diagnosis: {
                faultName: 'Silent Mode Enabled',
                likelihood: 'high',
                explanation: 'The phone was simply on silent or vibrate mode.',
                commonCauses: ['Accidentally toggled', 'Do Not Disturb enabled', 'Volume button pressed'],
                toolsNeeded: ['None'],
                difficultyLevel: 'beginner',
                estimatedTime: '1 minute',
                estimatedCost: '£0',
                repairSteps: [
                  'Disable silent/vibrate mode',
                  'Check Do Not Disturb settings',
                  'Verify all volume sliders are up'
                ],
                warnings: [],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q3',
          question: 'Does the phone work on speaker during calls?',
          options: [
            { 
              id: 'a', 
              text: 'No, no sound on speaker phone either',
              diagnosis: {
                faultName: 'Speaker Hardware Failure',
                likelihood: 'high',
                explanation: 'The speaker itself is likely damaged or disconnected.',
                commonCauses: ['Water damage', 'Drop damage', 'Blown speaker', 'Loose connection'],
                toolsNeeded: ['Phone opening tools', 'Replacement speaker (possibly)'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£10-30',
                repairSteps: [
                  'Try playing audio at low and high volumes',
                  'Check for any crackling (indicates partial failure)',
                  'Open device following proper procedure',
                  'Check speaker connection to motherboard',
                  'Reseat or replace speaker',
                  'Test before fully reassembling'
                ],
                warnings: ['Some phones have multiple speakers', 'Be careful with ribbon cables'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Speaker phone works, but earpiece doesn\'t',
              diagnosis: {
                faultName: 'Earpiece Speaker Failure',
                likelihood: 'high',
                explanation: 'The small earpiece speaker (used for calls) is damaged while the main speaker works.',
                commonCauses: ['Blocked by debris', 'Water damage', 'Worn from use', 'Loose connection'],
                toolsNeeded: ['Soft brush', 'Phone opening tools (for repair)'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£5-20',
                repairSteps: [
                  'Gently clean earpiece grille with soft brush',
                  'Test with Bluetooth headphones (rules out software)',
                  'If still no sound, earpiece needs replacement',
                  'Open device following model-specific guide',
                  'Replace earpiece speaker'
                ],
                warnings: ['Earpiece is often integrated with proximity sensor'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    }
  ],
  'laptop': [
    {
      id: 'laptop-wont-start',
      deviceId: 'laptop',
      name: 'Laptop won\'t turn on',
      description: 'No response when pressing power button',
      questions: [
        {
          id: 'q1',
          question: 'Are there any lights or sounds when you press power?',
          options: [
            { id: 'a', text: 'No lights, no sounds, nothing at all', nextQuestionId: 'q2' },
            { id: 'b', text: 'Lights come on briefly then turn off', nextQuestionId: 'q3' },
            { id: 'c', text: 'Lights on, fan spins, but no display', nextQuestionId: 'q4' }
          ]
        },
        {
          id: 'q2',
          question: 'Is the charger plugged in and does it have an indicator light?',
          options: [
            { 
              id: 'a', 
              text: 'Charger light is on',
              diagnosis: {
                faultName: 'DC Jack or Motherboard Issue',
                likelihood: 'medium',
                explanation: 'Power is reaching the charger but not getting to the laptop properly.',
                commonCauses: ['Loose DC jack', 'Broken power jack', 'Motherboard power circuit failure', 'Power button failure'],
                toolsNeeded: ['Multimeter', 'Laptop opening tools', 'Soldering equipment (possibly)'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-3 hours',
                estimatedCost: '£0-50',
                repairSteps: [
                  'Try holding power button for 30 seconds',
                  'Remove battery (if removable) and try with AC only',
                  'Open laptop and check DC jack connection',
                  'Test DC jack with multimeter',
                  'Check for visual damage on motherboard',
                  'Reseat RAM and other connections'
                ],
                warnings: ['Static damage is possible - ground yourself', 'Some laptops have sealed batteries'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No light on charger',
              diagnosis: {
                faultName: 'Faulty Charger or Power Outlet',
                likelihood: 'high',
                explanation: 'The charger isn\'t providing power at all.',
                commonCauses: ['Dead charger', 'Damaged cable', 'Faulty outlet', 'Tripped breaker'],
                toolsNeeded: ['Different charger', 'Different outlet'],
                difficultyLevel: 'beginner',
                estimatedTime: '5-15 mins',
                estimatedCost: '£0-50',
                repairSteps: [
                  'Try a different power outlet',
                  'Check the cable for damage',
                  'Try a different charger if available',
                  'If charger is dead, replace it'
                ],
                warnings: ['Use correct wattage charger for your laptop'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q3',
          question: 'Does it try to start then stop, or make beeping sounds?',
          options: [
            { 
              id: 'a', 
              text: 'Tries to start then dies immediately',
              diagnosis: {
                faultName: 'Power Circuit or Short Circuit',
                likelihood: 'high',
                explanation: 'The laptop is detecting a problem and shutting down to protect itself.',
                commonCauses: ['Short circuit', 'Faulty component', 'Overheating protection', 'RAM problem'],
                toolsNeeded: ['Laptop opening tools', 'Thermal paste (possibly)', 'Compressed air'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£0-30',
                repairSteps: [
                  'Remove battery and hold power for 30 seconds',
                  'Open laptop and check for visible damage',
                  'Reseat RAM modules',
                  'Clean dust from fans and heatsinks',
                  'Check for swollen capacitors',
                  'Try starting with minimum components'
                ],
                warnings: ['Work on anti-static surface', 'Don\'t force any connections'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Makes beeping sounds',
              diagnosis: {
                faultName: 'POST Error (Beep Code)',
                likelihood: 'high',
                explanation: 'Beep codes indicate specific hardware failures. The pattern matters.',
                commonCauses: ['RAM failure', 'Graphics failure', 'BIOS corruption', 'Hardware not detected'],
                toolsNeeded: ['Model-specific beep code list', 'Replacement components'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-3 hours',
                estimatedCost: 'Varies',
                repairSteps: [
                  'Count the beep pattern (e.g., 3 short, 1 long)',
                  'Look up beep codes for your laptop brand',
                  'Most commonly: reseat or replace RAM',
                  'Try removing one RAM stick at a time',
                  'If graphics beeps, may need motherboard repair'
                ],
                warnings: ['Beep codes vary by manufacturer'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q4',
          question: 'Does an external monitor work?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, external monitor shows display',
              diagnosis: {
                faultName: 'Failed LCD Screen or Cable',
                likelihood: 'high',
                explanation: 'The laptop works but the internal display isn\'t receiving signal.',
                commonCauses: ['Failed LCD panel', 'Damaged display cable', 'Loose connection', 'Backlight failure'],
                toolsNeeded: ['Laptop opening tools', 'Replacement screen or cable'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£30-150',
                repairSteps: [
                  'Check if screen is completely black or very dim (backlight issue)',
                  'Open laptop and check display cable connection',
                  'Reseat display cable',
                  'If still nothing, screen likely needs replacement',
                  'Order correct replacement panel for your model'
                ],
                warnings: ['Display cables are fragile', 'Some screens have different connectors'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, external monitor also shows nothing',
              diagnosis: {
                faultName: 'GPU or Motherboard Failure',
                likelihood: 'high',
                explanation: 'The graphics processor or motherboard has failed.',
                commonCauses: ['GPU failure', 'Overheating damage', 'Failed solder joints', 'Motherboard failure'],
                toolsNeeded: ['Possibly reballing equipment', 'Heat gun', 'Replacement motherboard'],
                difficultyLevel: 'advanced',
                estimatedTime: '2-5 hours',
                estimatedCost: '£50-200+',
                repairSteps: [
                  'Try resetting CMOS/BIOS',
                  'Check for visual damage on motherboard',
                  'Some GPUs can be reflowed (temporary fix)',
                  'May need motherboard replacement',
                  'Consider if repair cost is worth it vs. replacement'
                ],
                warnings: ['GPU reflow is temporary', 'Motherboard replacement is expensive'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    },
    {
      id: 'laptop-overheating',
      deviceId: 'laptop',
      name: 'Laptop overheating',
      description: 'Runs hot, fans loud, possibly shutting down',
      questions: [
        {
          id: 'q1',
          question: 'How old is the laptop?',
          options: [
            { 
              id: 'a', 
              text: 'Less than 1 year',
              diagnosis: {
                faultName: 'Poor Ventilation or Demanding Software',
                likelihood: 'high',
                explanation: 'A new laptop shouldn\'t overheat unless being pushed hard or blocked.',
                commonCauses: ['Blocking vents', 'Heavy software load', 'Manufacturing defect', 'Poor thermal design'],
                toolsNeeded: ['Laptop stand', 'Task manager'],
                difficultyLevel: 'beginner',
                estimatedTime: '15 mins',
                estimatedCost: '£0-20',
                repairSteps: [
                  'Ensure vents are not blocked',
                  'Use on hard surface, not bed/blanket',
                  'Check what\'s using CPU (Task Manager)',
                  'Close unnecessary programs',
                  'Consider a laptop cooling stand',
                  'If still overheating, may be warranty issue'
                ],
                warnings: ['Don\'t open a new laptop - may void warranty'],
                canFixAtScrapCat: true
              }
            },
            { id: 'b', text: '1-3 years', nextQuestionId: 'q2' },
            { 
              id: 'c', 
              text: 'More than 3 years',
              diagnosis: {
                faultName: 'Dust Buildup and Thermal Paste Degradation',
                likelihood: 'high',
                explanation: 'After years of use, dust clogs cooling and thermal paste dries out.',
                commonCauses: ['Dust in fans and heatsinks', 'Dried thermal paste', 'Worn fan bearings', 'Accumulated lint'],
                toolsNeeded: ['Compressed air', 'Laptop opening tools', 'Thermal paste', 'Isopropyl alcohol'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£5-15',
                repairSteps: [
                  'Open laptop and access cooling system',
                  'Blow out dust from fans and heatsinks',
                  'Remove heatsink and clean off old thermal paste',
                  'Apply new thermal paste (pea-sized amount)',
                  'Reassemble and test temperatures',
                  'This can drop temps by 10-20°C'
                ],
                warnings: ['Don\'t use too much thermal paste', 'Note screw positions during disassembly'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q2',
          question: 'Is the fan spinning at all?',
          options: [
            { 
              id: 'a', 
              text: 'No, fan is silent even when hot',
              diagnosis: {
                faultName: 'Failed Fan',
                likelihood: 'high',
                explanation: 'The cooling fan has stopped working, causing heat buildup.',
                commonCauses: ['Worn bearings', 'Dust jamming', 'Electrical failure', 'Loose connection'],
                toolsNeeded: ['Laptop opening tools', 'Replacement fan', 'Compressed air'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£10-30',
                repairSteps: [
                  'Open laptop and locate fan',
                  'Check if fan is jammed with dust',
                  'Try spinning fan by hand (should spin freely)',
                  'Check fan cable connection',
                  'If fan is dead, replace it',
                  'Fans are usually model-specific'
                ],
                warnings: ['Running without a fan will damage the CPU/GPU'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Yes, fan runs but laptop still hot',
              diagnosis: {
                faultName: 'Clogged Heatsink or Failed Thermal Paste',
                likelihood: 'high',
                explanation: 'The fan works but heat isn\'t being transferred away from the CPU.',
                commonCauses: ['Dust-clogged heatsink fins', 'Dried/cracked thermal paste', 'Blocked exhaust vent'],
                toolsNeeded: ['Compressed air', 'Thermal paste', 'Isopropyl alcohol', 'Opening tools'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£5-15',
                repairSteps: [
                  'Check exhaust vent for dust',
                  'Open laptop and inspect heatsink',
                  'Clean dust from heatsink fins',
                  'Remove heatsink and inspect thermal paste',
                  'If paste is dry/cracked, clean and reapply',
                  'Reassemble and monitor temperatures'
                ],
                warnings: ['Don\'t bend heatsink pipes', 'Use quality thermal paste'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    }
  ],
  'ebike': [
    {
      id: 'ebike-no-power',
      deviceId: 'ebike',
      name: 'E-bike won\'t turn on',
      description: 'No display, no power assist, completely dead',
      questions: [
        {
          id: 'q1',
          question: 'Is the battery fully charged and locked in place?',
          options: [
            { id: 'a', text: 'Battery is charged and locked in', nextQuestionId: 'q2' },
            { 
              id: 'b', 
              text: 'Not sure if battery is charged',
              diagnosis: {
                faultName: 'Dead Battery',
                likelihood: 'high',
                explanation: 'E-bike batteries can fully discharge, especially if left unused.',
                commonCauses: ['Battery drained', 'Forgotten to charge', 'Left in cold storage', 'BMS shutdown'],
                toolsNeeded: ['Charger', 'Multimeter (optional)'],
                difficultyLevel: 'beginner',
                estimatedTime: '2-8 hours (charging)',
                estimatedCost: '£0',
                repairSteps: [
                  'Remove battery from bike',
                  'Connect to charger directly',
                  'Leave charging for several hours',
                  'Some deeply discharged batteries need special wake-up',
                  'If charger shows no activity, battery may be dead'
                ],
                warnings: ['Deeply discharged lithium batteries can be damaged', 'Don\'t force charge a swollen battery'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q2',
          question: 'Does the battery show any indicator lights?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, battery shows full/partial charge',
              diagnosis: {
                faultName: 'Connection or Controller Issue',
                likelihood: 'high',
                explanation: 'Battery has power but it\'s not reaching the bike systems.',
                commonCauses: ['Loose battery connection', 'Corroded contacts', 'Blown fuse', 'Controller failure'],
                toolsNeeded: ['Contact cleaner', 'Multimeter', 'Replacement fuse (possibly)'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 2 hours',
                estimatedCost: '£0-30',
                repairSteps: [
                  'Remove and reseat battery firmly',
                  'Inspect battery contacts for corrosion',
                  'Clean contacts with contact cleaner',
                  'Check main fuse on battery or controller',
                  'Check display cable connection',
                  'If fuse is blown, find out why before replacing'
                ],
                warnings: ['E-bike voltage is dangerous - don\'t work on wet bike', 'Some controllers fail short-circuit'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No lights on battery at all',
              diagnosis: {
                faultName: 'Battery BMS Failure or Dead Cells',
                likelihood: 'medium',
                explanation: 'The Battery Management System may have shut down to protect damaged cells.',
                commonCauses: ['Deep discharge damage', 'Failed BMS', 'Dead cell in pack', 'Overheating damage'],
                toolsNeeded: ['Multimeter', 'Charger', 'Possibly cell-level diagnosis tools'],
                difficultyLevel: 'advanced',
                estimatedTime: '1-4 hours',
                estimatedCost: '£0-200+',
                repairSteps: [
                  'Try charging for 30+ minutes even with no lights',
                  'Check battery voltage at terminals with multimeter',
                  'If voltage is very low (<30V for 36V pack), cells may be damaged',
                  'Some batteries can be "wake up" charged with bench supply',
                  'May need professional battery diagnosis',
                  'Replacement pack may be most practical'
                ],
                warnings: ['Lithium batteries can be dangerous if mistreated', 'Don\'t open battery pack without proper knowledge'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    },
    {
      id: 'ebike-reduced-range',
      deviceId: 'ebike',
      name: 'Range is much shorter',
      description: 'Battery doesn\'t last as long as it used to',
      questions: [
        {
          id: 'q1',
          question: 'How old is the battery?',
          options: [
            { id: 'a', text: 'Less than 1 year / under 200 charge cycles', nextQuestionId: 'q2' },
            { 
              id: 'b', 
              text: 'More than 2 years / 500+ charge cycles',
              diagnosis: {
                faultName: 'Normal Battery Degradation',
                likelihood: 'high',
                explanation: 'E-bike batteries naturally lose capacity over time. 500+ cycles typically means 70-80% original capacity.',
                commonCauses: ['Chemical aging', 'Cycle count', 'Deep discharging', 'Temperature extremes'],
                toolsNeeded: ['Battery capacity tester (optional)', 'Replacement battery'],
                difficultyLevel: 'beginner',
                estimatedTime: 'N/A',
                estimatedCost: '£200-500',
                repairSteps: [
                  'Accept that batteries have limited lifespan',
                  'Some batteries can be recelled (advanced)',
                  'Research replacement battery options',
                  'Consider higher capacity replacement',
                  'Dispose of old battery properly'
                ],
                warnings: ['Some generic replacement batteries are poor quality', 'Match voltage to your bike'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q2',
          question: 'Did the range drop suddenly or gradually?',
          options: [
            { 
              id: 'a', 
              text: 'Suddenly dropped',
              diagnosis: {
                faultName: 'Single Cell Failure or BMS Issue',
                likelihood: 'high',
                explanation: 'A sudden drop often indicates one cell group has failed or BMS is limiting output.',
                commonCauses: ['Failed cell group', 'BMS malfunction', 'Loose connection in pack', 'Water ingress'],
                toolsNeeded: ['Multimeter', 'Battery diagnostic tools'],
                difficultyLevel: 'advanced',
                estimatedTime: '1-3 hours',
                estimatedCost: 'Varies',
                repairSteps: [
                  'Fully charge battery and note if it stops early',
                  'Check for error codes on display',
                  'If comfortable, measure cell group voltages',
                  'Large imbalance indicates failed cells',
                  'Professional repair or replacement needed'
                ],
                warnings: ['Opening battery packs is dangerous without proper training'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Gradually over months',
              diagnosis: {
                faultName: 'Normal Degradation + Usage Factors',
                likelihood: 'high',
                explanation: 'Even newer batteries degrade, but other factors may be accelerating it.',
                commonCauses: ['Normal use', 'Storing at full charge', 'Hot storage', 'Frequent deep discharge'],
                toolsNeeded: ['None (behavior change)', 'Battery capacity tester (optional)'],
                difficultyLevel: 'beginner',
                estimatedTime: 'N/A',
                estimatedCost: '£0',
                repairSteps: [
                  'Store battery at 50-80% charge when not using',
                  'Don\'t leave fully charged for extended periods',
                  'Avoid draining to 0% regularly',
                  'Store in cool location (not freezing)',
                  'Charge more frequently in small amounts'
                ],
                warnings: ['Bad habits permanently damage battery capacity'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    }
  ],
  'console': [
    {
      id: 'console-wont-start',
      deviceId: 'console',
      name: 'Console won\'t turn on',
      description: 'No power, no lights, completely dead',
      questions: [
        {
          id: 'q1',
          question: 'When you press power, what happens?',
          options: [
            { 
              id: 'a', 
              text: 'Nothing at all',
              nextQuestionId: 'q2'
            },
            { 
              id: 'b', 
              text: 'Beeps once and dies immediately',
              diagnosis: {
                faultName: 'Power Supply Failure',
                likelihood: 'high',
                explanation: 'The power supply is detecting a problem and shutting down.',
                commonCauses: ['Failed PSU', 'Overheating protection', 'Short circuit', 'Power surge damage'],
                toolsNeeded: ['Multimeter', 'Replacement PSU', 'Torx screwdrivers'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£20-50',
                repairSteps: [
                  'Unplug and leave for 30 minutes (reset protection)',
                  'Try again - if same, PSU likely failed',
                  'Open console and check for visible damage',
                  'Test PSU output with multimeter',
                  'Replace PSU if faulty'
                ],
                warnings: ['Don\'t open PSU itself - dangerous capacitors inside', 'Use correct replacement PSU'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'c', 
              text: 'Light comes on, fan spins, but no video',
              diagnosis: {
                faultName: 'GPU or APU Failure',
                likelihood: 'high',
                explanation: 'The console powers on but can\'t output video - usually GPU related.',
                commonCauses: ['GPU failure', 'HDMI port damage', 'Failed APU solder joints', 'Overheating damage'],
                toolsNeeded: ['Torx screwdrivers', 'HDMI cable test', 'Heat gun (advanced)'],
                difficultyLevel: 'advanced',
                estimatedTime: '2-4 hours',
                estimatedCost: '£0-100+',
                repairSteps: [
                  'Try a different HDMI cable and TV',
                  'Check HDMI port for damage',
                  'If HDMI port is damaged, can be replaced',
                  'If port is fine, GPU/APU likely failed',
                  'Reballing/reflowing is possible but temporary',
                  'Motherboard replacement may be needed'
                ],
                warnings: ['HDMI port replacement requires good soldering skills', 'GPU failure often means console is economically unrepairable'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q2',
          question: 'Have you tried a different power cable and outlet?',
          options: [
            { 
              id: 'a', 
              text: 'Yes, still nothing',
              diagnosis: {
                faultName: 'Dead Power Supply or Motherboard',
                likelihood: 'high',
                explanation: 'Internal power circuitry has failed.',
                commonCauses: ['Power surge', 'Failed PSU', 'Blown fuse', 'Motherboard failure'],
                toolsNeeded: ['Torx screwdrivers', 'Multimeter', 'Replacement PSU'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: '£20-60',
                repairSteps: [
                  'Open console (void warranty if still valid)',
                  'Check for visible damage or blown fuses',
                  'Test PSU output with multimeter',
                  'If PSU dead, replace it',
                  'If PSU works, motherboard may be dead'
                ],
                warnings: ['Modern consoles have special security screws'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'No, only tried one',
              diagnosis: {
                faultName: 'Faulty Cable or Outlet',
                likelihood: 'medium',
                explanation: 'Always rule out simple things first.',
                commonCauses: ['Bad outlet', 'Damaged cable', 'Extension lead problem'],
                toolsNeeded: ['Different cable', 'Different outlet'],
                difficultyLevel: 'beginner',
                estimatedTime: '5 mins',
                estimatedCost: '£0-15',
                repairSteps: [
                  'Try a different power outlet',
                  'Borrow a known-working power cable',
                  'Test outlet with another device',
                  'If still dead, the console needs opening'
                ],
                warnings: [],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    }
  ],
  'appliance': [
    {
      id: 'appliance-no-power',
      deviceId: 'appliance',
      name: 'Appliance won\'t turn on',
      description: 'No response when switched on',
      questions: [
        {
          id: 'q1',
          question: 'What type of appliance is it?',
          options: [
            { id: 'a', text: 'Kettle or toaster (heating element)', nextQuestionId: 'q2' },
            { id: 'b', text: 'Blender or mixer (motor)', nextQuestionId: 'q3' },
            { id: 'c', text: 'Coffee machine (complex)', nextQuestionId: 'q4' }
          ]
        },
        {
          id: 'q2',
          question: 'When you plug it in, does the power light come on (if it has one)?',
          options: [
            { 
              id: 'a', 
              text: 'No light at all',
              diagnosis: {
                faultName: 'Failed Thermal Fuse or Element',
                likelihood: 'high',
                explanation: 'Kettles and toasters have thermal fuses that blow to prevent fires.',
                commonCauses: ['Blown thermal fuse', 'Broken element', 'Failed switch', 'Damaged cord'],
                toolsNeeded: ['Screwdriver', 'Multimeter', 'Replacement fuse'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£2-10',
                repairSteps: [
                  'UNPLUG and let cool completely',
                  'Open appliance (usually screws underneath)',
                  'Locate thermal fuse (near element)',
                  'Test fuse continuity with multimeter',
                  'If open circuit, replace fuse',
                  'Also check element continuity'
                ],
                warnings: ['Never work on plugged-in appliances', 'Thermal fuses blow for a reason - check for underlying issue'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Light on but doesn\'t heat',
              diagnosis: {
                faultName: 'Failed Heating Element',
                likelihood: 'high',
                explanation: 'Power reaches the appliance but the heating element has failed.',
                commonCauses: ['Burned out element', 'Corroded connections', 'Limescale buildup'],
                toolsNeeded: ['Screwdriver', 'Multimeter', 'Replacement element'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£5-20',
                repairSteps: [
                  'Unplug and disassemble',
                  'Test element with multimeter (should show resistance)',
                  'If infinite resistance, element is broken',
                  'Replace element or consider new appliance',
                  'For kettles, also check for limescale damage'
                ],
                warnings: ['Replacement elements must match voltage and wattage'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q3',
          question: 'Does the motor make any noise when switched on?',
          options: [
            { 
              id: 'a', 
              text: 'Silent, no response',
              diagnosis: {
                faultName: 'Motor or Switch Failure',
                likelihood: 'high',
                explanation: 'Power isn\'t reaching the motor or the motor has failed.',
                commonCauses: ['Failed motor', 'Broken switch', 'Internal fuse', 'Damaged cord'],
                toolsNeeded: ['Screwdriver', 'Multimeter'],
                difficultyLevel: 'intermediate',
                estimatedTime: '30 mins - 1 hour',
                estimatedCost: '£0-30',
                repairSteps: [
                  'Unplug and disassemble',
                  'Check for internal fuses',
                  'Test switch continuity',
                  'Test motor by applying power directly',
                  'If motor dead, replacement may not be cost-effective'
                ],
                warnings: ['Motor capacitors can hold charge'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Hums but doesn\'t spin',
              diagnosis: {
                faultName: 'Jammed Motor or Failed Capacitor',
                likelihood: 'high',
                explanation: 'The motor is trying to run but is blocked or can\'t start.',
                commonCauses: ['Jammed blade/mechanism', 'Failed start capacitor', 'Seized bearings', 'Overload protection'],
                toolsNeeded: ['Screwdriver', 'WD-40 or similar'],
                difficultyLevel: 'beginner',
                estimatedTime: '15-30 mins',
                estimatedCost: '£0-10',
                repairSteps: [
                  'Unplug immediately (humming motor = overheating)',
                  'Check if blade/beater can spin freely by hand',
                  'Remove any jamming material',
                  'Oil bearings if accessible',
                  'If not jammed, capacitor may need replacement'
                ],
                warnings: ['Humming motor can overheat and become a fire risk'],
                canFixAtScrapCat: true
              }
            }
          ]
        },
        {
          id: 'q4',
          question: 'Does the machine respond at all (lights, sounds)?',
          options: [
            { 
              id: 'a', 
              text: 'Completely dead',
              diagnosis: {
                faultName: 'Power Supply or Control Board',
                likelihood: 'medium',
                explanation: 'Coffee machines have complex electronics that can fail.',
                commonCauses: ['Failed power board', 'Blown fuse', 'Damaged cord', 'Safety switch triggered'],
                toolsNeeded: ['Screwdriver', 'Multimeter'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-2 hours',
                estimatedCost: 'Varies widely',
                repairSteps: [
                  'Check for reset buttons',
                  'Ensure water tank is seated (many have safety switch)',
                  'Open and check for fuses',
                  'Test power at input',
                  'Control boards can be expensive to replace'
                ],
                warnings: ['Coffee machines combine electricity and water - extra care needed'],
                canFixAtScrapCat: true
              }
            },
            { 
              id: 'b', 
              text: 'Some lights but doesn\'t brew',
              diagnosis: {
                faultName: 'Pump, Valve, or Heating Issue',
                likelihood: 'medium',
                explanation: 'Electronics work but mechanical components have failed.',
                commonCauses: ['Limescale blockage', 'Failed pump', 'Stuck valve', 'Thermostat failure'],
                toolsNeeded: ['Descaling solution', 'Screwdriver', 'Multimeter'],
                difficultyLevel: 'intermediate',
                estimatedTime: '1-3 hours',
                estimatedCost: '£0-50',
                repairSteps: [
                  'Run descaling cycle first',
                  'Check if pump makes noise when brewing',
                  'If pump silent, it may have failed',
                  'Check thermostat and heating element',
                  'Clear any blockages in tubes'
                ],
                warnings: ['Descale regularly to prevent issues', 'Steam systems hold pressure - let cool before opening'],
                canFixAtScrapCat: true
              }
            }
          ]
        }
      ]
    }
  ]
};

// ============================================
// HELPER COMPONENTS
// ============================================

const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors: Record<string, string> = {
    'beginner': '#10b981',
    'intermediate': '#f59e0b',
    'advanced': '#ef4444',
    'professional': '#7c3aed'
  };

  return (
    <span className="difficulty-badge" style={{ backgroundColor: colors[level] || '#6b7280' }}>
      {level}
    </span>
  );
};

const LikelihoodIndicator: React.FC<{ likelihood: string }> = ({ likelihood }) => {
  return (
    <span className={`likelihood-indicator ${likelihood}`}>
      {likelihood === 'high' && <CheckCircle size={16} />}
      {likelihood === 'medium' && <HelpCircle size={16} />}
      {likelihood === 'low' && <AlertTriangle size={16} />}
      {likelihood} likelihood
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const ScrapCatSandbox: React.FC = () => {
  // State
  const [step, setStep] = useState<'device' | 'symptom' | 'diagnosis' | 'result'>('device');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [savedDiagnoses, setSavedDiagnoses] = useState<DiagnosticSession[]>([]);

  // Get current question
  const getCurrentQuestion = (): DiagnosticQuestion | null => {
    if (!selectedSymptom) return null;
    
    if (currentQuestionIndex === 0) {
      return selectedSymptom.questions[0];
    }
    
    // Find the question based on answer chain
    const answerKeys = Object.keys(answers);
    if (answerKeys.length === 0) return selectedSymptom.questions[0];
    
    const lastAnswer = answers[answerKeys[answerKeys.length - 1]];
    const lastQuestion = selectedSymptom.questions.find(q => 
      q.options.some(o => o.id === lastAnswer)
    );
    
    if (!lastQuestion) return null;
    
    const selectedOption = lastQuestion.options.find(o => o.id === lastAnswer);
    if (!selectedOption) return null;
    
    if (selectedOption.diagnosis) {
      return null; // We have a diagnosis
    }
    
    if (selectedOption.nextQuestionId) {
      return selectedSymptom.questions.find(q => q.id === selectedOption.nextQuestionId) || null;
    }
    
    return null;
  };

  // Handle answer selection
  const handleAnswer = (questionId: string, optionId: string) => {
    const question = selectedSymptom?.questions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === optionId);
    
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (option?.diagnosis) {
      setDiagnosis(option.diagnosis);
      setStep('result');
    } else if (option?.nextQuestionId) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Reset
  const reset = () => {
    setStep('device');
    setSelectedDevice(null);
    setSelectedSymptom(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setDiagnosis(null);
    setExpandedSection(null);
  };

  // Save diagnosis
  const saveDiagnosis = () => {
    if (!selectedDevice || !selectedSymptom || !diagnosis) return;
    
    const session: DiagnosticSession = {
      deviceId: selectedDevice.id,
      symptomId: selectedSymptom.id,
      answers,
      diagnosis,
      completedAt: new Date()
    };
    
    setSavedDiagnoses(prev => [...prev, session]);
  };

  // Download report
  const downloadReport = () => {
    if (!selectedDevice || !selectedSymptom || !diagnosis) return;

    const content = `
SCRAP CAT DIAGNOSTIC REPORT
============================

Device: ${selectedDevice.name}
Symptom: ${selectedSymptom.name}
Date: ${new Date().toLocaleDateString()}

DIAGNOSIS
---------
Fault: ${diagnosis.faultName}
Likelihood: ${diagnosis.likelihood}
Difficulty: ${diagnosis.difficultyLevel}

EXPLANATION
-----------
${diagnosis.explanation}

COMMON CAUSES
-------------
${diagnosis.commonCauses.map(c => `• ${c}`).join('\n')}

TOOLS NEEDED
------------
${diagnosis.toolsNeeded.map(t => `• ${t}`).join('\n')}

REPAIR STEPS
------------
${diagnosis.repairSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${diagnosis.warnings.length > 0 ? `
⚠️ WARNINGS
-----------
${diagnosis.warnings.map(w => `• ${w}`).join('\n')}
` : ''}

ESTIMATES
---------
Time: ${diagnosis.estimatedTime}
Cost: ${diagnosis.estimatedCost}
Can fix at Scrap Cat: ${diagnosis.canFixAtScrapCat ? 'Yes' : 'No'}

---
Generated by Wembley Wonders Scrap Cat
wembleywonders.org/scrap-cat
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrapcat-diagnosis-${selectedDevice.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sandbox-container scrap-cat-sandbox">
      {/* Header */}
      <div className="sandbox-header">
        <div className="sandbox-breadcrumb">
          <Link to="/programmes">Programmes</Link>
          <span className="separator">/</span>
          <Link to="/programmes/scrap-cat">Scrap Cat</Link>
          <span className="separator">/</span>
          <span className="current">Device Diagnostic Tool</span>
        </div>
        <h1 className="sandbox-title">
          <span className="sandbox-icon">🔧</span>
          Device Diagnostic Tool
        </h1>
        <p className="sandbox-subtitle">
          Learn troubleshooting logic on virtual devices. 
          Build diagnostic skills before touching real equipment.
        </p>
      </div>

      {/* Progress */}
      <div className="sandbox-progress">
        <div className={`progress-step ${step === 'device' ? 'active' : 'completed'}`}>
          <div className="step-number">1</div>
          <span>Select Device</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'symptom' ? 'active' : ['diagnosis', 'result'].includes(step) ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <span>Describe Problem</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'diagnosis' ? 'active' : step === 'result' ? 'completed' : ''}`}>
          <div className="step-number">3</div>
          <span>Answer Questions</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'result' ? 'active' : ''}`}>
          <div className="step-number">4</div>
          <span>Get Diagnosis</span>
        </div>
      </div>

      {/* Step 1: Select Device */}
      {step === 'device' && (
        <div className="sandbox-step device-step">
          <h2>What device needs diagnosing?</h2>
          <p className="step-intro">
            Select the type of device you want to troubleshoot. 
            This is practice - no real device required.
          </p>

          <div className="devices-grid">
            {DEVICE_TYPES.map(device => (
              <button
                key={device.id}
                className="device-card"
                onClick={() => {
                  setSelectedDevice(device);
                  setStep('symptom');
                }}
              >
                <div className="device-icon">{device.icon}</div>
                <h3>{device.name}</h3>
                <p>{device.description}</p>
                <div className="device-faults">
                  <span className="faults-label">Common issues:</span>
                  <span className="faults-preview">
                    {device.commonFaults.slice(0, 2).join(', ')}...
                  </span>
                </div>
                <ArrowRight size={20} className="device-arrow" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Symptom */}
      {step === 'symptom' && selectedDevice && (
        <div className="sandbox-step symptom-step">
          <button className="back-btn" onClick={() => setStep('device')}>
            <ArrowLeft size={18} />
            Different Device
          </button>

          <div className="device-header">
            <span className="device-emoji">{selectedDevice.emoji}</span>
            <div>
              <h2>{selectedDevice.name} Diagnosis</h2>
              <p>What's the main symptom?</p>
            </div>
          </div>

          <div className="symptoms-grid">
            {(SYMPTOMS[selectedDevice.id] || []).map(symptom => (
              <button
                key={symptom.id}
                className="symptom-card"
                onClick={() => {
                  setSelectedSymptom(symptom);
                  setStep('diagnosis');
                }}
              >
                <h3>{symptom.name}</h3>
                <p>{symptom.description}</p>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>

          {(!SYMPTOMS[selectedDevice.id] || SYMPTOMS[selectedDevice.id].length === 0) && (
            <div className="no-symptoms">
              <AlertTriangle size={48} />
              <h3>Diagnostics Coming Soon</h3>
              <p>We're building diagnostic flows for {selectedDevice.name}. Check back soon!</p>
              <button onClick={() => setStep('device')}>Try Another Device</button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Diagnostic Questions */}
      {step === 'diagnosis' && selectedDevice && selectedSymptom && (
        <div className="sandbox-step diagnosis-step">
          <button className="back-btn" onClick={() => {
            setAnswers({});
            setCurrentQuestionIndex(0);
            setStep('symptom');
          }}>
            <ArrowLeft size={18} />
            Different Symptom
          </button>

          <div className="diagnosis-header">
            <div className="diagnosis-device">
              <span>{selectedDevice.emoji}</span>
              {selectedDevice.name}
            </div>
            <div className="diagnosis-symptom">
              {selectedSymptom.name}
            </div>
          </div>

          {getCurrentQuestion() && (
            <div className="question-card">
              <div className="question-number">
                Question {Object.keys(answers).length + 1}
              </div>
              <h3>{getCurrentQuestion()!.question}</h3>
              
              <div className="options-list">
                {getCurrentQuestion()!.options.map(option => (
                  <button
                    key={option.id}
                    className="option-btn"
                    onClick={() => handleAnswer(getCurrentQuestion()!.id, option.id)}
                  >
                    <span className="option-text">{option.text}</span>
                    <ArrowRight size={18} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Show previous answers */}
          {Object.keys(answers).length > 0 && (
            <div className="answers-history">
              <h4>Your Answers</h4>
              {Object.entries(answers).map(([qId, aId], i) => {
                const question = selectedSymptom.questions.find(q => q.id === qId);
                const answer = question?.options.find(o => o.id === aId);
                return (
                  <div key={qId} className="answer-item">
                    <span className="answer-number">{i + 1}</span>
                    <div className="answer-content">
                      <span className="answer-question">{question?.question}</span>
                      <span className="answer-response">{answer?.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Result */}
      {step === 'result' && diagnosis && selectedDevice && selectedSymptom && (
        <div className="sandbox-step result-step">
          <div className="result-header">
            <div className="result-icon">
              <Wrench size={48} />
            </div>
            <div>
              <h2>Diagnosis Complete</h2>
              <p>{selectedDevice.name} → {selectedSymptom.name}</p>
            </div>
          </div>

          {/* Main Diagnosis Card */}
          <div className="diagnosis-result-card">
            <div className="diagnosis-title">
              <h3>{diagnosis.faultName}</h3>
              <div className="diagnosis-badges">
                <LikelihoodIndicator likelihood={diagnosis.likelihood} />
                <DifficultyBadge level={diagnosis.difficultyLevel} />
              </div>
            </div>

            <p className="diagnosis-explanation">{diagnosis.explanation}</p>

            <div className="diagnosis-estimates">
              <div className="estimate-item">
                <Clock size={18} />
                <div>
                  <span className="estimate-label">Time</span>
                  <span className="estimate-value">{diagnosis.estimatedTime}</span>
                </div>
              </div>
              <div className="estimate-item">
                <span className="pound-icon">£</span>
                <div>
                  <span className="estimate-label">Cost</span>
                  <span className="estimate-value">{diagnosis.estimatedCost}</span>
                </div>
              </div>
              <div className="estimate-item">
                <Wrench size={18} />
                <div>
                  <span className="estimate-label">Scrap Cat</span>
                  <span className="estimate-value">
                    {diagnosis.canFixAtScrapCat ? '✓ Can fix here' : '✗ Professional needed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="diagnosis-sections">
            {/* Common Causes */}
            <div className="diagnosis-section">
              <button 
                className="section-header"
                onClick={() => setExpandedSection(expandedSection === 'causes' ? null : 'causes')}
              >
                <Lightbulb size={20} />
                <span>Common Causes</span>
                {expandedSection === 'causes' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSection === 'causes' && (
                <div className="section-content">
                  <ul>
                    {diagnosis.commonCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tools Needed */}
            <div className="diagnosis-section">
              <button 
                className="section-header"
                onClick={() => setExpandedSection(expandedSection === 'tools' ? null : 'tools')}
              >
                <Wrench size={20} />
                <span>Tools Needed</span>
                {expandedSection === 'tools' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSection === 'tools' && (
                <div className="section-content">
                  <ul>
                    {diagnosis.toolsNeeded.map((tool, i) => (
                      <li key={i}>{tool}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Repair Steps */}
            <div className="diagnosis-section">
              <button 
                className="section-header"
                onClick={() => setExpandedSection(expandedSection === 'steps' ? null : 'steps')}
              >
                <Target size={20} />
                <span>Repair Steps</span>
                {expandedSection === 'steps' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSection === 'steps' && (
                <div className="section-content">
                  <ol className="repair-steps">
                    {diagnosis.repairSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Warnings */}
            {diagnosis.warnings.length > 0 && (
              <div className="diagnosis-section warnings">
                <button 
                  className="section-header"
                  onClick={() => setExpandedSection(expandedSection === 'warnings' ? null : 'warnings')}
                >
                  <AlertTriangle size={20} />
                  <span>Warnings</span>
                  {expandedSection === 'warnings' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'warnings' && (
                  <div className="section-content warning-content">
                    <ul>
                      {diagnosis.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button className="download-btn" onClick={downloadReport}>
              <Download size={18} />
              Download Report
            </button>
            <button className="save-btn" onClick={saveDiagnosis}>
              <FileText size={18} />
              Save to History
            </button>
            <button className="reset-btn" onClick={reset}>
              <RotateCcw size={18} />
              New Diagnosis
            </button>
          </div>

          {/* Next Steps */}
          <div className="result-next-steps">
            <h3>Ready to Fix Real Devices?</h3>
            <div className="next-steps-grid">
              <Link to="/sessions" className="next-step-card">
                <Calendar size={24} />
                <div>
                  <strong>Join a Scrap Cat Session</strong>
                  <span>Practice on donated equipment</span>
                </div>
                <ArrowRight size={20} />
              </Link>
              <Link to="/programmes/stemgeneers" className="next-step-card">
                <Zap size={24} />
                <div>
                  <strong>Explore STEMgeneers</strong>
                  <span>Take repairs to paid work</span>
                </div>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Saved Diagnoses */}
      {savedDiagnoses.length > 0 && step !== 'result' && (
        <div className="saved-diagnoses">
          <h3>Your Diagnostic History</h3>
          <div className="saved-list">
            {savedDiagnoses.map((session, i) => {
              const device = DEVICE_TYPES.find(d => d.id === session.deviceId);
              return (
                <div key={i} className="saved-item">
                  <span className="saved-device">{device?.emoji}</span>
                  <div className="saved-info">
                    <strong>{session.diagnosis?.faultName}</strong>
                    <span>{device?.name}</span>
                  </div>
                  <span className="saved-date">
                    {session.completedAt?.toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="sandbox-footer">
        <p>
          <strong>Scrap Cat:</strong> Learn repair logic without risk. 
          Break it virtually, fix it in real life.
        </p>
      </div>
    </div>
  );
};

export default ScrapCatSandbox;