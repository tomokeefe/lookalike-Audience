import { Audience } from "@/hooks/useAudiences";

// CSV Export Functions
export const generateAudienceCSV = (audiences: Audience[]): string => {
  const headers = [
    "ID",
    "Name",
    "Source",
    "Size",
    "Status",
    "Created",
    "Reach",
  ];

  const csvContent = [
    headers.join(","),
    ...audiences.map((audience) =>
      [
        audience.id,
        `"${audience.name}"`,
        `"${audience.source}"`,
        audience.size,
        audience.status,
        audience.created,
        audience.reach || 0,
      ].join(","),
    ),
  ].join("\n");

  return csvContent;
};

export const generatePerformanceCSV = (data: any[]): string => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");

  return csvContent;
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// PDF Export Functions (using HTML canvas for charts)
export const generateAudienceReport = async (
  audience: Audience,
  performanceData: any[],
): Promise<string> => {
  const reportDate = new Date().toLocaleDateString();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Audience Report - ${audience.name}</title>
      <style>
        body { 
          font-family: 'Open Sans', Arial, sans-serif; 
          margin: 40px; 
          color: #374151;
          line-height: 1.6;
        }
        .header { 
          border-bottom: 3px solid #00997B; 
          padding-bottom: 20px; 
          margin-bottom: 30px; 
        }
        .title { 
          font-size: 28px; 
          font-weight: bold; 
          color: #00997B; 
          margin: 0;
        }
        .subtitle { 
          color: #6B7280; 
          margin: 5px 0;
        }
        .metrics-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 20px; 
          margin: 30px 0; 
        }
        .metric-card { 
          background: #F9FAFB; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #00997B;
        }
        .metric-label { 
          font-size: 14px; 
          color: #6B7280; 
          margin-bottom: 5px;
        }
        .metric-value { 
          font-size: 24px; 
          font-weight: bold; 
          color: #111827;
        }
        .section { 
          margin: 40px 0; 
        }
        .section-title { 
          font-size: 20px; 
          font-weight: 600; 
          color: #111827; 
          margin-bottom: 15px;
        }
        .table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0;
        }
        .table th, .table td { 
          border: 1px solid #E5E7EB; 
          padding: 12px; 
          text-align: left;
        }
        .table th { 
          background: #F9FAFB; 
          font-weight: 600;
        }
        .footer { 
          margin-top: 50px; 
          padding-top: 20px; 
          border-top: 1px solid #E5E7EB; 
          font-size: 12px; 
          color: #6B7280;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-active {
          background: #D1FAE5;
          color: #065F46;
        }
        .status-processing {
          background: #FEF3C7;
          color: #92400E;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">Audience Performance Report</h1>
        <div class="subtitle">Generated on ${reportDate}</div>
      </div>

      <div class="section">
        <h2 class="section-title">Audience Overview</h2>
        <table class="table">
          <tr>
            <td><strong>Audience Name</strong></td>
            <td>${audience.name}</td>
          </tr>
          <tr>
            <td><strong>Source</strong></td>
            <td>${audience.source}</td>
          </tr>
          <tr>
            <td><strong>Size</strong></td>
            <td>${audience.size}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>
              <span class="status-badge status-${audience.status}">
                ${audience.status.charAt(0).toUpperCase() + audience.status.slice(1)}
              </span>
            </td>
          </tr>
          <tr>
            <td><strong>Created</strong></td>
            <td>${audience.created}</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2 class="section-title">Key Performance Metrics</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Reach</div>
            <div class="metric-value">${(audience.reach || 0).toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Match Rate</div>
            <div class="metric-value">87.3%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Engagement Rate</div>
            <div class="metric-value">6.8%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Conversion Rate</div>
            <div class="metric-value">3.4%</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Performance Data</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reach</th>
              <th>Engagement</th>
              <th>Conversions</th>
            </tr>
          </thead>
          <tbody>
            ${performanceData
              .map(
                (row) => `
              <tr>
                <td>${row.date}</td>
                <td>${row.reach?.toLocaleString() || 0}</td>
                <td>${row.engagement?.toLocaleString() || 0}</td>
                <td>${row.conversions?.toLocaleString() || 0}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>This report was generated automatically by the Audience Management System.</p>
        <p>For questions or support, please contact your system administrator.</p>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
};

export const downloadPDF = async (
  htmlContent: string,
  filename: string,
): Promise<void> => {
  // Create a new window for printing
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }
};

// Utility to format data for different export types
export const formatDataForExport = (
  audiences: Audience[],
  includePerformance: boolean = false,
) => {
  return audiences.map((audience) => ({
    ...audience,
    reach_formatted: (audience.reach || 0).toLocaleString(),
    ...(includePerformance && {
      match_rate: "87.3%",
      engagement_rate: "6.8%",
      conversion_rate: "3.4%",
    }),
  }));
};

// Real-time export trigger
export const exportAudienceData = async (
  audiences: Audience[],
  format: "csv" | "pdf",
  includePerformance: boolean = false,
) => {
  const timestamp = new Date().toISOString().split("T")[0];

  if (format === "csv") {
    const formattedData = formatDataForExport(audiences, includePerformance);
    const csvContent = generateAudienceCSV(formattedData);
    downloadCSV(csvContent, `audiences-export-${timestamp}.csv`);
  } else if (format === "pdf" && audiences.length > 0) {
    // For PDF, export the first audience as a detailed report
    const audience = audiences[0];
    const performanceData = [
      { date: "Jan 1", reach: 1200000, engagement: 85000, conversions: 2400 },
      { date: "Jan 8", reach: 1350000, engagement: 92000, conversions: 2800 },
      { date: "Jan 15", reach: 1500000, engagement: 105000, conversions: 3200 },
    ];

    const htmlContent = await generateAudienceReport(audience, performanceData);
    await downloadPDF(
      htmlContent,
      `audience-report-${audience.name}-${timestamp}.pdf`,
    );
  }
};
