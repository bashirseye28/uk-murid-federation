import ContactHero from '@/components/Contact/ContactHero'
import ContactInfo from '@/components/Contact/ContactInfo'
import ContactForm from '@/components/Contact/ContactForm'
import ContactCTA from '@/components/About/ContactCTA'


export default function Page() {
  return (
    <div>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </div>
  )
}