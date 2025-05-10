'use client'

import { useState, useRef } from 'react'
import DonateHero from '@/components/Donate/DonateHero'
import DonateGrid from '@/components/Donate/DonationGrid'
import PaymentSection from '@/components/Donate/PaymentSection'
import { donationCampaigns } from '@/data/donationCampaigns'

export default function DonatePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const paymentRef = useRef<HTMLDivElement>(null)

  const currentCampaignKey = 'bambaDay' // Can be 'addiya' or 'social'
  const { name, items } = donationCampaigns[currentCampaignKey]

  const handleDonate = (itemTitle: string) => {
    setSelectedItem(itemTitle)
    // Smooth scroll to payment section
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <DonateHero campaignName={name} />
      <DonateGrid items={items} campaignName={name} onDonate={handleDonate} />
      <div ref={paymentRef}>
        {selectedItem && <PaymentSection selectedItem={selectedItem} />}
      </div>
    </>
  )
}