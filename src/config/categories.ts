import { CategoryConfig } from '@/types/simulator';

export const categories: CategoryConfig[] = [
  {
    slug: 'money',
    name: 'Money',
    description: 'Investment, savings, and financial planning simulators to project your wealth growth.',
    icon: 'money',
    color: '#16A34A',
    seoContent: `
## Ultimate Finance Calculators
Whether you are trying to figure out how much you need to retire, or simply want to know if you should pay off debt or invest, our comprehensive suite of **finance calculators** has you covered. We build the exact models that financial advisors use, completely free and simplified.

### Why Use Finance Calculators?
Investing without modeling your projections is like driving blindfolded. A simple SIP calculator can reveal that increasing your monthly investment by just ₹5,000 can shave 5 years off your retirement age. The power of **compound interest** is impossible to visualize in your head—you need a calculator to truly understand it.
    `,
    faqs: [
      { question: 'What is the best finance calculator for beginners?', answer: 'The SIP (Systematic Investment Plan) calculator is the best starting point. It shows you the magical effect of investing a small amount consistently over decades.' },
      { question: 'Are these investment projections guaranteed?', answer: 'No. Our calculators use historical averages (like 12% for index funds) to project future growth. Real-world returns will always fluctuate year over year.' }
    ]
  },
  {
    slug: 'career',
    name: 'Career',
    description: 'Explore job changes, relocations, salary negotiations, and career switches.',
    icon: 'career',
    color: '#2563EB',
    seoContent: `
## Career Progression Calculators
Should you take a higher paying job in an expensive city, or stay put? What is the actual financial value of negotiating a 5% raise today? Our **career calculators** strip away the emotion and give you the cold, hard numbers.

### The True Cost of Career Decisions
A common mistake professionals make is ignoring the impact of taxes and Cost of Living (COL) when evaluating job offers. Moving to Dubai might mean zero income tax, but if housing costs consume the difference, your net savings might be lower. Our purchasing power calculators do the math for you.
    `,
    faqs: [
      { question: 'Should I always negotiate my salary?', answer: 'Yes! A 5% raise negotiated at age 25 can compound into hundreds of thousands of dollars in extra wealth over a 30-year career due to subsequent percentage-based raises and compounding investments.' },
      { question: 'How do you calculate purchasing power parity (PPP)?', answer: 'We compare the relative cost of a standard basket of goods (housing, food, transportation) between two cities to determine what your equivalent lifestyle would cost.' }
    ]
  },
  {
    slug: 'health',
    name: 'Health',
    description: 'See the impact of fitness, diet, and lifestyle habits on your long-term health.',
    icon: 'health',
    color: '#DC2626',
    seoContent: `
## Health & Longevity Calculators
What if you quit smoking today? What if you start walking 10,000 steps every day? Our **health calculators** quantify the long-term impact of your daily habits. 

### Health is Compounding Wealth
Just like money, health compounds. Small, consistent actions (like sleeping 8 hours or cutting out added sugar) might seem insignificant today, but over 20 years, they drastically reduce the risk of chronic diseases and extend your healthspan.
    `,
    faqs: [
      { question: 'What are health calculators based on?', answer: 'Our models are based on population-level epidemiological studies that correlate specific habits (like smoking, sedentary lifestyle) with mortality and morbidity rates.' },
      { question: 'What is the most impactful health habit?', answer: 'According to longevity research, quitting smoking and engaging in daily cardiovascular exercise (like walking 10k steps) have the most profound impact on extending lifespan.' }
    ]
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Evaluate degrees, courses, certifications, and learning paths for ROI.',
    icon: 'education',
    color: '#9333EA',
    seoContent: `
## Education ROI Calculators
Higher education is one of the most expensive investments you will ever make. But does it always pay off? Our **education calculators** help you model the Return on Investment (ROI) of Master's degrees, Bootcamps, and professional certifications.

### Understanding Opportunity Cost
When you spend 2 years in a Master's program, your cost isn't just tuition—it's the 2 years of salary you *didn't* earn. Our models factor in both direct costs and opportunity costs to show you the true break-even point of your education.
    `,
    faqs: [
      { question: 'Is a Master degree always worth it?', answer: 'Not always. It depends heavily on the industry. A Master\'s in Computer Science often has a rapid ROI, whereas other degrees may never mathematically break even when factoring in opportunity cost.' },
      { question: 'What is opportunity cost in education?', answer: 'Opportunity cost is the income you forfeit by studying instead of working full-time.' }
    ]
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Model startup costs, revenue projections, and break-even timelines.',
    icon: 'business',
    color: '#EA580C',
    seoContent: `
## Business & Startup Calculators
Building a business is risky, but modeling it shouldn't be. Our **business calculators** help entrepreneurs and indie hackers project revenue, model SaaS churn, and calculate physical product profit margins.

### The Math Behind Startups
A successful business is simply a math equation where Customer Acquisition Cost (CAC) is lower than Lifetime Value (LTV). Our simulators help you visualize what happens when you tweak your pricing, churn rate, or conversion rate.
    `,
    faqs: [
      { question: 'What is churn rate?', answer: 'Churn rate is the percentage of customers who cancel their subscription in a given time period. It is the most critical metric for any subscription (SaaS) business.' },
      { question: 'How do you calculate a break-even point?', answer: 'Break-even is achieved when your total revenue equals your total fixed and variable costs. Any revenue beyond that point is profit.' }
    ]
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Explore living changes — housing, commute, relationships, and daily routines.',
    icon: 'lifestyle',
    color: '#0891B2',
    seoContent: `
## Lifestyle Optimization Calculators
How much time could you reclaim if you deleted social media? What if you hired a cleaner to buy back your weekends? Our **lifestyle calculators** measure the most valuable asset you have: Time.

### Time-to-Money Arbitrage
Sometimes spending money to buy back time (like taking a faster, more expensive commute) is mathematically the right decision if your hourly earning potential is high. We help you calculate these invisible tradeoffs.
    `,
    faqs: [
      { question: 'How do you value an hour of free time?', answer: 'A common heuristic is to value your free time at your hourly earning rate. If you earn $50/hr, any task you can outsource for less than $50/hr is technically a net positive.' }
    ]
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}
