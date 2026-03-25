import { TaskDefinition } from '../types/task';

export const TASKS: TaskDefinition[] = [
  {
    id: 'accommodation',
    title: 'Accommodation Details',
    description: 'Store and track your housing information in Germany. This is essential for your address registration (Anmeldung).',
    category: 'housing',
    daysToComplete: 14,
    fields: [
      { id: 'address', label: 'Full Address', type: 'text', placeholder: 'Street, Number, PLZ, City' },
      { id: 'landlord_name', label: 'Landlord Name', type: 'text' },
      { id: 'move_in_date', label: 'Move-in Date', type: 'date' },
      { id: 'monthly_rent', label: 'Monthly Rent (€)', type: 'number' },
      { id: 'deposit_amount', label: 'Deposit Amount (€)', type: 'number' }
    ],
    documents: [
      { id: 'rent_contract', name: 'Rent Contract (Mietvertrag)', detail: 'Signed by both parties.' },
      { id: 'landlord_conf', name: 'Landlord Confirmation', detail: 'Wohnungsgeberbestätigung form.' },
      { id: 'housing_proof', name: 'Housing Proof', detail: 'Required for some visa types.' }
    ],
    steps: [
      { id: 's1', name: 'Review Contract', detail: 'Check for hidden costs (Nebenkosten) and notice period.' },
      { id: 's2', name: 'Sign Contract', detail: 'Keep a physical copy for registration.' },
      { id: 's3', name: 'Collect Confirmation', detail: 'Ask your landlord for the signed Wohnungsgeberbestätigung.' }
    ]
  },
  {
    id: 'anmeldung',
    title: 'Address Registration',
    description: 'Registering your address at the Bürgeramt is legally required within 14 days of moving in.',
    category: 'essential',
    daysToComplete: 14,
    fields: [
      { id: 'city', label: 'City of Registration', type: 'text' },
      { id: 'registration_date', label: 'Planned Date', type: 'date' },
      { id: 'appointment_date', label: 'Appointment Date', type: 'date' }
    ],
    documents: [
      { id: 'passport', name: 'Passport / ID', detail: 'Original and valid.' },
      { id: 'visa', name: 'Visa or Residence Permit', detail: 'Original document.' },
      { id: 'reg_form', name: 'Registration Form', detail: 'Anmeldeformular (completed).' },
      { id: 'landlord_conf', name: 'Landlord Confirmation', detail: 'Wohnungsgeberbestätigung.' },
      { id: 'rent_contract', name: 'Rent Contract', detail: 'Optional but recommended.' }
    ],
    steps: [
      { id: 's1', name: 'Book Appointment', detail: 'Check the Bürgeramt portal early, especially in big cities.' },
      { id: 's2', name: 'Prepare Forms', detail: 'Fill out the registration form in German.' },
      { id: 's3', name: 'Attend Appointment', detail: 'Receive your Meldebescheinigung (Registration Certificate).' }
    ],
    officeInfo: {
      name: 'Bürgeramt',
      address: 'City dependent',
      details: 'Check your local city portal (e.g., service.berlin.de).'
    }
  },
  {
    id: 'blocked-account',
    title: 'Blocked Account',
    description: 'Activate your blocked account to receive your monthly allowance and provide financial proof.',
    category: 'finance',
    daysToComplete: 10,
    fields: [
      { id: 'provider', label: 'Provider', type: 'select', options: ['Expatrio', 'Fintiba', 'Coracle', 'Deutsche Bank'] },
      { id: 'amount', label: 'Total Blocked Amount (€)', type: 'number' },
      { id: 'monthly_release', label: 'Monthly Release (€)', type: 'number' },
      { id: 'iban', label: 'Payout IBAN', type: 'text' }
    ],
    documents: [
      { id: 'confirmation', name: 'Blocked Account Confirmation', detail: 'Required for visa/residence permit.' },
      { id: 'financial_proof', name: 'Financial Proof', detail: 'Sperrkonto activation record.' }
    ],
    steps: [
      { id: 's1', name: 'Arrival Sync', detail: 'Upload your address registration to the provider.' },
      { id: 's2', name: 'Open Payout Account', detail: 'You need a standard bank account (IBAN) for payouts.' },
      { id: 's3', name: 'Start Payouts', detail: 'Trigger the monthly release via the provider app.' }
    ]
  },
  {
    id: 'bank-account',
    title: 'German Bank Account',
    description: 'Open a local bank account for rent, utilities, and blocked account payouts.',
    category: 'finance',
    daysToComplete: 5,
    fields: [
      { id: 'bank_name', label: 'Bank Name', type: 'text' },
      { id: 'iban', label: 'IBAN', type: 'text' },
      { id: 'bic', label: 'BIC', type: 'text' },
      { id: 'open_date', label: 'Opening Date', type: 'date' }
    ],
    documents: [
      { id: 'acc_conf', name: 'Account Confirmation', detail: 'Official letter with your IBAN.' },
      { id: 'statement', name: 'Bank Statement', detail: 'Optional for some offices.' }
    ],
    steps: [
      { id: 's1', name: 'Compare Options', detail: 'N26, Revolut, Sparkasse, or Deutsche Bank.' },
      { id: 's2', name: 'Identity Check', detail: 'VideoIdent or in-branch verification.' },
      { id: 's3', name: 'Activate App', detail: 'Set up online banking and mobile alerts.' }
    ]
  },
  {
    id: 'health-insurance',
    title: 'Health Insurance',
    description: 'Mandatory for enrollment and residency. Choose between public or private options.',
    category: 'essential',
    daysToComplete: 7,
    fields: [
      { id: 'provider', label: 'Insurance Provider', type: 'text' },
      { id: 'ins_type', label: 'Type', type: 'select', options: ['Public (GKV)', 'Private (PKV)'] },
      { id: 'ins_number', label: 'Insurance Number', type: 'text' },
      { id: 'start_date', label: 'Coverage Start Date', type: 'date' }
    ],
    documents: [
      { id: 'certificate', name: 'Insurance Certificate', detail: 'Required for university enrollment.' },
      { id: 'card', name: 'Insurance Card', detail: 'Electronic health card (eGK).' }
    ],
    steps: [
      { id: 's1', name: 'Select Provider', detail: 'TK, AOK, and Barmer are popular public choices.' },
      { id: 's2', name: 'Upload Photo', detail: 'Needed for your physical health card.' },
      { id: 's3', name: 'Inform Uni', detail: 'Most public insurances sync directly with universities.' }
    ]
  },
  {
    id: 'university-enrollment',
    title: 'University Enrollment',
    description: 'Officially join your program. Required to get your student ID and transit pass.',
    category: 'university',
    daysToComplete: 21,
    fields: [
      { id: 'uni_name', label: 'University Name', type: 'text' },
      { id: 'program', label: 'Program Name', type: 'text' },
      { id: 'student_id', label: 'Student ID Number', type: 'text' },
      { id: 'deadline', label: 'Enrollment Deadline', type: 'date' }
    ],
    documents: [
      { id: 'passport', name: 'Passport', detail: 'Original and copy.' },
      { id: 'admission', name: 'Admission Letter', detail: 'Zulassungsbescheid.' },
      { id: 'degree', name: 'Degree Certificate', detail: 'Originals from previous studies.' },
      { id: 'language', name: 'Language Certificate', detail: 'German or English proficiency proof.' },
      { id: 'fee_proof', name: 'Semester Fee Payment', detail: 'Proof of bank transfer.' }
    ],
    steps: [
      { id: 's1', name: 'Pay Semester Fee', detail: 'Usually €200–€400 including transit ticket.' },
      { id: 's2', name: 'Submit Documents', detail: 'Via post or online portal as required.' },
      { id: 's3', name: 'Collect ID', detail: 'Receive your physical or digital Semesterticket.' }
    ]
  },
  {
    id: 'residence-permit',
    title: 'Residence Permit',
    description: 'Convert your entry visa into a long-term residence permit (Aufenthaltstitel).',
    category: 'legal',
    daysToComplete: 90,
    fields: [
      { id: 'city', label: 'Immigration Office City', type: 'text' },
      { id: 'appointment_date', label: 'Appointment Date', type: 'date' },
      { id: 'permit_expiry', label: 'Visa/Permit Expiry Date', type: 'date' },
      { id: 'permit_number', label: 'Permit Number', type: 'text' }
    ],
    documents: [
      { id: 'passport', name: 'Passport', detail: 'Valid for the duration of stay.' },
      { id: 'photo', name: 'Biometric Photo', detail: 'Must be current (last 6 months).' },
      { id: 'health_ins', name: 'Health Insurance Proof', detail: 'Member certificate.' },
      { id: 'reg_cert', name: 'Address Registration', detail: 'Meldebescheinigung.' },
      { id: 'uni_proof', name: 'Enrollment Certificate', detail: 'Current Immatrikulationsbescheinigung.' }
    ],
    steps: [
      { id: 's1', name: 'Book Slot', detail: 'Appointments at the Ausländerbehörde are very hard to get.' },
      { id: 's2', name: 'Prepare Portfolio', detail: 'Organize all documents in a folder.' },
      { id: 's3', name: 'Interview', detail: 'Attend the appointment and provide fingerprints.' }
    ]
  },
  {
    id: 'sim-card',
    title: 'German SIM Card',
    description: 'Get a local number for appointments and daily logistics.',
    category: 'lifestyle',
    daysToComplete: 3,
    fields: [
      { id: 'provider', label: 'Provider', type: 'select', options: ['Telekom', 'Vodafone', 'O2', 'Aldi Talk', 'Lidl Connect'] },
      { id: 'phone_number', label: 'New Phone Number', type: 'text' },
      { id: 'plan_cost', label: 'Monthly Cost (€)', type: 'number' }
    ],
    documents: [
      { id: 'contract', name: 'SIM Contract', detail: 'For postpaid plans.' },
      { id: 'activation', name: 'Activation Confirmation', detail: 'Email or physical receipt.' }
    ],
    steps: [
      { id: 's1', name: 'Choose Plan', detail: 'Prepaid (flexible) vs Postpaid (needs bank account).' },
      { id: 's2', name: 'Identity Check', detail: 'Process via VideoIdent or at a store.' },
      { id: 's3', name: 'Set up Data', detail: 'Configure APN settings for internet access.' }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities Setup',
    description: 'Set up electricity, gas, and internet if renting a private flat.',
    category: 'housing',
    daysToComplete: 7,
    fields: [
      { id: 'elec_provider', label: 'Electricity Provider', type: 'text' },
      { id: 'meter_number', label: 'Meter Number', type: 'text' },
      { id: 'start_date', label: 'Contract Start Date', type: 'date' }
    ],
    documents: [
      { id: 'contract', name: 'Utility Contract', detail: 'Check for early bird discounts.' },
      { id: 'reading', name: 'Meter Reading Record', detail: 'Übergabeprotokoll photographes.' }
    ],
    steps: [
      { id: 's1', name: 'Check Comparison Sites', detail: 'Use Check24 or Verivox for best rates.' },
      { id: 's2', name: 'Switch Provider', detail: 'Grundversorger is usually more expensive.' },
      { id: 's3', name: 'Provide Meter Reading', detail: 'Submit readings on the move-in day.' }
    ]
  }
];
