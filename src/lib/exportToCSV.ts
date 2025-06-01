type DonationCSVRow = {
  donor_name: string;
  donor_email: string;
  phone?: string;
  dahira_city?: string;
  children_under_16?: string | number;
  donation_date: string;
  campaign: string;
  item_title: string;
  amount_gbp: string;
  is_anonymous: boolean;
};

type CSVExportOptions = {
  data: DonationCSVRow[];
  filename?: string;
};

/**
 * Exports donation data as a clean, professional CSV file.
 */
export function exportToCSV({
  data,
  filename,
}: CSVExportOptions) {
  if (!data || data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const headers: Record<keyof DonationCSVRow, string> = {
    donor_name: "Donor Name",
    donor_email: "Email",
    phone: "Phone Number",
    dahira_city: "Dahira / City",
    children_under_16: "Children Under 16",
    donation_date: "Date",
    campaign: "Campaign",
    item_title: "Reference",
    amount_gbp: "Amount (£)",
    is_anonymous: "Anonymous",
  };

  const csvHeaders = Object.values(headers);

  const csvRows = data.map((row) => {
    return (Object.keys(headers) as (keyof DonationCSVRow)[])
      .map((field) => {
        let value = row[field];

        if (field === "donation_date" && value) {
          const date = new Date(value as string);
          value = date.toLocaleDateString("en-GB");
        }

        if (field === "is_anonymous") {
          value = value ? "Yes" : "No";
        }

        if (
          ["phone", "dahira_city", "children_under_16"].includes(field) &&
          (value === undefined || value === null || value === "")
        ) {
          value = "Not provided";
        }

        const safeValue =
          typeof value === "string" ? value.replace(/"/g, '""') : value;

        return `"${safeValue ?? ""}"`;
      })
      .join(",");
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const csvWithBOM = "\uFEFF" + csvContent;

  const today = new Date().toISOString().slice(0, 10);
  const finalFilename = filename || `donations_${today}.csv`;

  const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", finalFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}