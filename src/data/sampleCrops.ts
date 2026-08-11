import { SampleCrop } from '../types';

export const SAMPLE_CROPS: SampleCrop[] = [
  {
    id: 'tomato-late-blight',
    cropName: 'Tomato Leaf',
    issueName: 'Possible Late Blight',
    description: 'Dark water-soaked spots with white fuzzy fungal growth on undersides during high moisture.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a80?auto=format&fit=crop&w=800&q=80',
    confidence: 89,
    severity: 'High',
    presetAnalysis: {
      cropType: 'Tomato',
      conditionName: 'Late Blight (Phytophthora infestans)',
      scientificName: 'Phytophthora infestans',
      confidence: 89,
      severity: 'High',
      summary: 'Late Blight is a fast-spreading fungal-like water mold that forms dark brown water-soaked patches on leaves and stems.',
      symptoms: [
        'Dark grey or brown water-soaked lesions on upper leaf surfaces',
        'White cottony spore growth on the underside of leaves in damp air',
        'Dark lesions on tomato stems and firm brown rot on fruits'
      ],
      recommendedActions: [
        {
          category: 'Immediate',
          title: 'Prune Infected Leaves',
          description: 'Cut off affected lower leaves immediately and dispose of them far from the field in sealed bags. Do NOT compost.'
        },
        {
          category: 'Watering',
          title: 'Switch to Root Drip Irrigation',
          description: 'Avoid overhead sprinkler watering. Wet foliage allows mold spores to germinate within 4 to 6 hours.'
        },
        {
          category: 'Sanitation',
          title: 'Disinfect Pruning Tools',
          description: 'Sanitize shears with 70% alcohol or diluted bleach between plants to prevent spreading spores.'
        },
        {
          category: 'Prevention',
          title: 'Improve Canopy Ventilation',
          description: 'Stake tomato vines securely and prune non-fruiting suckers to increase air flow and dry out wet leaves quickly.'
        }
      ],
      weatherAdvisory: {
        urgency: 'Act Within 12 Hours',
        urgencyLevel: 'critical',
        title: 'High Moisture & Rain Forecasted',
        detail: 'Current humidity above 80% and predicted rainfall in 24 hours create ideal conditions for rapid late blight spore explosions. Prune and apply protective organic copper fungicide BEFORE rains begin.',
        actionTimeframe: 'Before rain starts in 12–24 hours'
      },
      disclaimerNote: 'Note: AI analysis is an advisory tool and not 100% infallible. Please consult your local county agricultural officer or extension service for serious crop damage.',
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    id: 'maize-common-rust',
    cropName: 'Corn / Maize Leaf',
    issueName: 'Possible Common Rust',
    description: 'Small reddish-brown powdery pustules scattered on both upper and lower leaf surfaces.',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    confidence: 86,
    severity: 'Moderate',
    presetAnalysis: {
      cropType: 'Corn / Maize',
      conditionName: 'Common Rust (Puccinia sorghi)',
      scientificName: 'Puccinia sorghi',
      confidence: 86,
      severity: 'Moderate',
      summary: 'Common Rust causes small oval reddish-brown spots filled with rusty spores that break through the leaf surface.',
      symptoms: [
        'Oval to elongated reddish-brown pustules on leaves',
        'Dusty rust-colored spores that rub off onto fingers',
        'Premature yellowing and drying of heavily spotty leaves'
      ],
      recommendedActions: [
        {
          category: 'Immediate',
          title: 'Remove Severely Affected Lower Leaves',
          description: 'Pluck lower yellowing leaves near the ground to lower spore burden in the field canopy.'
        },
        {
          category: 'Nutrition',
          title: 'Avoid Excessive Nitrogen',
          description: 'Over-fertilization with pure nitrogen creates lush tender tissue easily penetrated by rust spores. Balance with Potassium.'
        },
        {
          category: 'Prevention',
          title: 'Plant Rust-Resistant Hybrids',
          description: 'For the next planting cycle, select certified rust-resistant maize seed strains.'
        }
      ],
      weatherAdvisory: {
        urgency: 'Act Today',
        urgencyLevel: 'warning',
        title: 'Cool Dewy Mornings Ahead',
        detail: 'Temperatures between 16°C–23°C with heavy morning dew promote spore germination. Inspect crop daily and remove infected leaves during dry afternoon hours.',
        actionTimeframe: 'During dry afternoon today'
      },
      disclaimerNote: 'Note: AI analysis provides a preliminary advisory. Always verify with your local agricultural specialist before applying chemicals.',
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    id: 'rice-bacterial-blight',
    cropName: 'Rice Leaf',
    issueName: 'Possible Bacterial Leaf Blight',
    description: 'Wavy yellow to light-brown lesions starting from leaf tips and margins.',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    confidence: 84,
    severity: 'High',
    presetAnalysis: {
      cropType: 'Rice',
      conditionName: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      confidence: 84,
      severity: 'High',
      summary: 'Bacterial Blight causes water-soaked streaks that turn yellow and wilt rapidly from leaf edges towards the center stem.',
      symptoms: [
        'Yellowish-green to white wavy stripes along leaf margins',
        'Milky bacterial droplets visible on young leaves in early morning',
        'Drying and death of entire leaf canopy ("kresek" stage)'
      ],
      recommendedActions: [
        {
          category: 'Immediate',
          title: 'Drain Standing Water Temporarily',
          description: 'Drain excess field water for 2–3 days if weather allows to break bacterial spread through irrigation channels.'
        },
        {
          category: 'Watering',
          title: 'Manage Field Flow',
          description: 'Avoid letting water flow directly from infected paddy fields into healthy adjacent plots.'
        },
        {
          category: 'Sanitation',
          title: 'Clear Weeds around Levees',
          description: 'Clear wild host grasses on field borders that harbor bacterial colonies.'
        }
      ],
      weatherAdvisory: {
        urgency: 'Act Within 12 Hours',
        urgencyLevel: 'critical',
        title: 'High Humidity & Wind Hazard',
        detail: 'Strong winds and high humidity cause leaf friction, opening microscopic plant wounds where bacteria enter. Drain fields and stop nitrogen top-dressing immediately.',
        actionTimeframe: 'Immediate field drainage within 12h'
      },
      disclaimerNote: 'Note: AI diagnosis is an automated recommendation. Consult your local agricultural extension service for official disease management.',
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    id: 'healthy-crop',
    cropName: 'Healthy Crop Leaf',
    issueName: 'No Visual Disease Detected',
    description: 'Vibrant green leaf with uniform color, intact margins, and clean cellular structure.',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    confidence: 95,
    severity: 'Healthy',
    presetAnalysis: {
      cropType: 'Healthy Crop Leaf',
      conditionName: 'Healthy Leaf (No Significant Pest or Pathogen Damage)',
      confidence: 95,
      severity: 'Healthy',
      summary: 'Your crop leaf shows healthy green pigmentation, strong cell turgor, and no active fungal or bacterial spots.',
      symptoms: [
        'Uniform green chlorophyll distribution',
        'Clean leaf margins without yellow wilting or brown halos',
        'No visible insect feeding holes or mold patches'
      ],
      recommendedActions: [
        {
          category: 'Prevention',
          title: 'Maintain Consistent Soil Moisture',
          description: 'Keep soil evenly moist with mulch layer to reduce plant stress during sunny peak hours.'
        },
        {
          category: 'Nutrition',
          title: 'Balanced Organic Compost',
          description: 'Apply well-composted organic manure or balanced fertilizer according to current crop growth stage.'
        },
        {
          category: 'Prevention',
          title: 'Weekly Field Scouting',
          description: 'Inspect undersides of 10 random leaves twice a week to catch early pest or spore arrivals early.'
        }
      ],
      weatherAdvisory: {
        urgency: 'Routine Maintenance',
        urgencyLevel: 'success',
        title: 'Favorable Weather Conditions',
        detail: 'Current weather is ideal for healthy plant photosynthesis. Continue routine irrigation and monitoring.',
        actionTimeframe: 'Continue regular field schedule'
      },
      disclaimerNote: 'Note: AI screening checks visible leaf surfaces. Keep scouting root zones and stem bases for overall plant health.',
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }
];
