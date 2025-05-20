import { donationCampaigns, DonationCampaign, DonationItem } from '../data/donationCampaigns';

/**
 * getCurrentCampaign returns the donation campaign active based on today's date.
 * Dates are inclusive of startDate and endDate.
 */
export function getCurrentCampaign(): DonationCampaign {
  const today = new Date();

  // Find a campaign where today's date is between start and end
  const active = donationCampaigns.find((camp) => {
    const start = new Date(camp.startDate + 'T00:00:00');
    const end = new Date(camp.endDate + 'T23:59:59');
    return today >= start && today <= end;
  });

  // Fallback to the last campaign (social) if none match
  if (active) {
    return active;
  }
  return donationCampaigns[donationCampaigns.length - 1];
}

/**
 * getAllCampaigns returns all defined donation campaigns.
 */
export function getAllCampaigns(): DonationCampaign[] {
  return donationCampaigns;
}

/**
 * findCampaignById returns a specific campaign by its ID.
 */
export function findCampaignById(id: string): DonationCampaign | undefined {
  return donationCampaigns.find((camp) => camp.id === id);
}