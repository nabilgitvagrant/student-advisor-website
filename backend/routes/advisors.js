const express = require('express');
const router = express.Router();

// Mock advisors data
const advisors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Business & Economics',
    rating: 4.9,
    reviews: 124,
    bio: 'Expert in business strategy and academic planning with 15+ years of experience.',
    availability: 'Mon-Fri, 9AM-5PM',
    email: 'sarah.johnson@studentadvisor.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    specialty: 'Engineering & Technology',
    rating: 4.8,
    reviews: 98,
    bio: 'Specialized in technical education and career development in tech industry.',
    availability: 'Tue-Thu, 10AM-6PM',
    email: 'michael.chen@studentadvisor.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Liberal Arts & Sciences',
    rating: 4.9,
    reviews: 156,
    bio: 'Passionate about interdisciplinary education and student success.',
    availability: 'Mon-Fri, 8AM-4PM',
    email: 'emily.williams@studentadvisor.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'Prof. David Rodriguez',
    specialty: 'STEM & Research',
    rating: 4.7,
    reviews: 87,
    bio: 'Focused on research opportunities and graduate school preparation.',
    availability: 'Wed-Fri, 11AM-7PM',
    email: 'david.rodriguez@studentadvisor.com',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Health & Medical Sciences',
    rating: 4.9,
    reviews: 142,
    bio: 'Expert advisor for pre-med and health science students.',
    availability: 'Mon, Tue, Thu, Fri',
    email: 'lisa.anderson@studentadvisor.com',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    name: 'Prof. James Wilson',
    specialty: 'Arts & Humanities',
    rating: 4.8,
    reviews: 110,
    bio: 'Specializing in creative fields and liberal arts education.',
    availability: 'Mon-Wed, 1PM-6PM',
    email: 'james.wilson@studentadvisor.com',
    phone: '+1 (555) 678-9012'
  }
];

// Get all advisors
router.get('/', (req, res) => {
  try {
    console.log('✅ GET /advisors called - returning', advisors.length, 'advisors');
    res.json(advisors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single advisor by ID
router.get('/:id', (req, res) => {
  try {
    const advisor = advisors.find(a => a.id === parseInt(req.params.id));
    if (!advisor) {
      return res.status(404).json({ message: 'Advisor not found' });
    }
    console.log('✅ GET /advisors/:id called - returning advisor', req.params.id);
    res.json(advisor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create advisor
router.post('/', (req, res) => {
  try {
    const newAdvisor = {
      id: advisors.length + 1,
      ...req.body
    };
    advisors.push(newAdvisor);
    console.log('✅ POST /advisors called - created new advisor');
    res.status(201).json(newAdvisor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update advisor
router.put('/:id', (req, res) => {
  try {
    const advisor = advisors.find(a => a.id === parseInt(req.params.id));
    if (!advisor) {
      return res.status(404).json({ message: 'Advisor not found' });
    }
    Object.assign(advisor, req.body);
    console.log('✅ PUT /advisors/:id called - updated advisor', req.params.id);
    res.json(advisor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete advisor
router.delete('/:id', (req, res) => {
  try {
    const index = advisors.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Advisor not found' });
    }
    const deletedAdvisor = advisors.splice(index, 1);
    console.log('✅ DELETE /advisors/:id called - deleted advisor', req.params.id);
    res.json({ message: 'Advisor deleted', advisor: deletedAdvisor[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;