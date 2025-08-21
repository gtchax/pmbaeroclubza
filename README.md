# PMB Aero Club Website

A complete enterprise-level redesign of the PMB Aero Club website (pmbaeroclub.co.za) built with Next.js 14, TypeScript, Tailwind CSS, and modern web technologies.

## 🚁 About PMB Aero Club

PMB Aero Club is one of South Africa's oldest aviation institutions, established in 1938. Located at Pietermaritzburg Airport, we provide professional flight training, aircraft rental, and foster a vibrant aviation community.

## ✨ Features

### 🎨 Design System

- **Brand Colors**: Gold (#f6d57f), White (#fff), Charcoal (#262626)
- **Modern Aviation Aesthetic**: Professional, trustworthy design suitable for flight training
- **Mobile-First Responsive**: Optimized for all devices and screen sizes
- **Accessibility**: WCAG 2.1 AA compliant with proper focus states and keyboard navigation

### 🏗️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Custom UI components built with shadcn/ui patterns
- **Animations**: Framer Motion for smooth, engaging interactions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography

### 📱 Pages & Sections

#### Homepage (/)

- **Hero Section**: Compelling aviation hero with dual CTAs
- **Flight Training Programs**: Overview of training courses with pricing
- **About Us**: Rich history since 1938 and achievements
- **Testimonials**: Student success stories and reviews
- **Contact Information**: Multiple contact methods and location

#### SEAMS System (/seams)

- **Smart Electronic Aviation Management System**: Complete operations automation
- **Flight Operations**: Real-time scheduling, conflict detection, and dispatch management
- **Maintenance Tracking**: Predictive maintenance, work orders, and compliance logging
- **Crew Management**: Scheduling, qualifications, and payroll integration
- **Safety & Compliance**: Incident reporting, audits, and regulatory compliance
- **Analytics Dashboard**: Real-time metrics, performance tracking, and predictive insights

#### Flight School (/flight-school)

- **Training Programs**: Detailed course information (PPL, Night Rating, Instrument Rating, CPL)
- **Instructors**: Meet the certified flight instructors
- **Aircraft Fleet**: Training aircraft specifications and features
- **Requirements**: Clear prerequisites for each program

#### Contact (/contact)

- **Contact Form**: Validated form with React Hook Form and Zod
- **Contact Methods**: Phone, email, address, and office hours
- **Quick Actions**: Book discovery flight, schedule training, join club
- **Location**: Pietermaritzburg Airport information

### 🎯 Key Components

#### Navigation

- Sticky navigation with dropdown menus
- Mobile-responsive hamburger menu
- Branded logo with aviation icon
- Clear call-to-action buttons

#### Hero Sections

- Aviation-themed backgrounds
- Compelling headlines and subheadings
- Trust indicators and statistics
- Smooth scroll animations

#### Cards & Content

- Training program cards with pricing
- Instructor profiles with specializations
- Aircraft specifications
- Testimonial cards with ratings

#### Forms

- Contact form with validation
- Interest-based form fields
- Real-time error feedback
- Success states and confirmation

### 🚀 Performance Features

- **Optimized Images**: Next.js Image component for optimal loading
- **Smooth Animations**: Framer Motion with performance considerations
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Accessibility**: ARIA labels, focus management, and screen reader support

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pmbaeroclub
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build Commands

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 📁 Project Structure

```
pmbaeroclub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── contact/           # Contact page
│   │   ├── flight-school/     # Flight school page
│   │   ├── globals.css        # Global styles and design tokens
│   │   ├── layout.tsx         # Root layout with navigation/footer
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components (Button, Card, etc.)
│   │   ├── layout/           # Layout components (Navigation, Footer)
│   │   ├── sections/         # Page sections (Hero, About, etc.)
│   │   └── forms/            # Form components (ContactForm)
│   └── lib/                  # Utility functions and helpers
├── public/                   # Static assets
├── components.json           # shadcn/ui configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Design Philosophy

### Brand Identity

- **Trust & Safety**: Professional design that instills confidence in flight training
- **Heritage**: Honoring 85+ years of aviation excellence
- **Accessibility**: Welcoming design for all age groups and experience levels
- **Modern Aviation**: Contemporary design while maintaining traditional values

### User Experience

- **Clear Navigation**: Intuitive site structure and user flows
- **Compelling CTAs**: Strategic call-to-action placement
- **Progressive Disclosure**: Information presented in digestible sections
- **Mobile Optimization**: Seamless experience across all devices

## 🔧 Customization

### Brand Colors

Update the brand colors in `src/app/globals.css`:

```css
:root {
  --pmb-gold: 45 85% 72%; /* #f6d57f */
  --pmb-charcoal: 0 0% 15%; /* #262626 */
  --pmb-white: 0 0% 100%; /* #fff */
}
```

### Content Updates

- Training programs: Update `src/components/sections/flight-training.tsx`
- Testimonials: Modify `src/components/sections/testimonials.tsx`
- Contact information: Edit `src/components/sections/contact.tsx`

### Adding New Pages

1. Create new page in `src/app/[page-name]/page.tsx`
2. Add navigation link in `src/components/layout/navigation.tsx`
3. Update footer links in `src/components/layout/footer.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Compatible with Next.js static export
- **AWS Amplify**: Full-stack deployment support
- **Traditional Hosting**: Build and upload static files

## 🔍 SEO & Performance

### SEO Features

- Meta tags and Open Graph data
- Structured data for local business
- XML sitemap generation
- Robots.txt optimization
- Local SEO for Pietermaritzburg area

### Performance Targets

- Lighthouse score: 90+ on all metrics
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Mobile-first responsive design
- Optimized images and assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to PMB Aero Club. All rights reserved.

## 📞 Support

For technical support or questions about the website:

- Email: info@pmbaeroclub.co.za
- Phone: +27 33 123 4567

---

**Built with ❤️ for the aviation community**

_Established in 1938 - Where Aviation Dreams Take Flight_
