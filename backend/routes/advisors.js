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
    email: 'sarah@studentadvisor.com',
    bio: 'Expert in business strategy and academic planning with 15+ years of experience.',
    availability: 'Mon-Fri, 9AM-5PM'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    specialty: 'Engineering & Technology',
    rating: 4.8,
    reviews: 98,
    email: 'michael@studentadvisor.com',
    bio: 'Specialized in technical education and career development in tech industry.',
    availability: 'Tue-Thu, 10AM-6PM'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Liberal Arts & Sciences',
    rating: 4.9,
    reviews: 156,
    email: 'emily@studentadvisor.com',
    bio: 'Passionate about interdisciplinary education and student success.',
    availability: 'Mon-Fri, 8AM-4PM'
  },
  {
    id: 4,
    name: 'Prof. David Rodriguez',
    specialty: 'STEM & Research',
    rating: 4.7,
    reviews: 87,
    email: 'david@studentadvisor.com',
    bio: 'Focused on research opportunities and graduate school preparation.',
    availability: 'Wed-Fri, 11AM-7PM'
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Health & Medical Sciences',
    rating: 4.9,
    reviews: 142,
    email: 'lisa@studentadvisor.com',
    bio: 'Expert advisor for pre-med and health science students.',
    availability: 'Mon, Tue, Thu, Fri'
  },
  {
    id: 6,
    name: 'Prof. James Wilson',
    specialty: 'Arts & Humanities',
    rating: 4.8,
    reviews: 110,
    email: 'james@studentadvisor.com',
    bio: 'Specializing in creative fields and liberal arts education.',
    availability: 'Mon-Wed, 1PM-6PM'
  }
];

// Get all advisors
router.get('/', (req, res) => {
  try {
    console.log('✅ GET /advisors called');
    res.json(advisors);
  } catch (error) {
    console.error('❌ Error in GET /advisors:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get single advisor
router.get('/:id', (req, res) => {
  try {
    const advisor = advisors.find(a => a.id === parseInt(req.params.id));
    if (!advisor) {
      return res.status(404).json({ message: 'Advisor not found' });
    }
    console.log('✅ GET /advisors/:id called - returned', advisor.name);
    res.json(advisor);
  } catch (error) {
    console.error('❌ Error in GET /advisors/:id:', error.message);
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
    console.log('✅ POST /advisors called');
    res.status(201).json(newAdvisor);
  } catch (error) {
    console.error('❌ Error in POST /advisors:', error.message);
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
    console.log('✅ PUT /advisors/:id called');
    res.json(advisor);
  } catch (error) {
    console.error('❌ Error in PUT /advisors/:id:', error.message);
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
    console.log('✅ DELETE /advisors/:id called');
    res.json({ message: 'Advisor deleted', advisor: deletedAdvisor[0] });
  } catch (error) {
    console.error('❌ Error in DELETE /advisors/:id:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;