export const generateCSVTemplate = (type: "customer-list" | "lookalike") => {
  const customerListTemplate = `MADID,Email,Hashed_Email,First_Name,Last_Name
MAD12345678,john@example.com,5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5,John,Doe
MAD87654321,jane@example.com,2e99758548972a8e8822ad47fa1017ff72f06f3ff6a016851f45c398732bc50c,Jane,Smith
MAD11223344,bob@example.com,be178c0543eb17f5f3043021c9e5fcf30285e557a4fc309cce97ff9ca6182912,Bob,Johnson`;

  const lookalikeTemplate = `User_ID,Purchase_Value,Engagement_Score,Frequency,Recency
USER001,150.50,8.5,12,7
USER002,89.99,6.2,8,14
USER003,299.99,9.1,15,3`;

  return type === "customer-list" ? customerListTemplate : lookalikeTemplate;
};

export const downloadCSV = (content: string, filename: string) => {
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

export const validateCSVFile = (
  file: File,
): Promise<{ valid: boolean; errors: string[]; preview?: any[] }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const errors: string[] = [];

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          errors.push(
            "CSV file must contain at least a header row and one data row",
          );
        }

        const headers = lines[0].split(",").map((h) => h.trim());
        const requiredHeaders = ["MADID", "Email"];
        const missingHeaders = requiredHeaders.filter(
          (h) => !headers.includes(h),
        );

        if (missingHeaders.length > 0) {
          errors.push(`Missing required columns: ${missingHeaders.join(", ")}`);
        }

        // Validate email format in first few rows
        const dataRows = lines.slice(1, Math.min(6, lines.length));
        const emailColumnIndex = headers.indexOf("Email");

        if (emailColumnIndex !== -1) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          dataRows.forEach((row, index) => {
            const columns = row.split(",");
            const email = columns[emailColumnIndex]?.trim();
            if (email && !emailRegex.test(email)) {
              errors.push(`Invalid email format in row ${index + 2}: ${email}`);
            }
          });
        }

        // Create preview data
        const preview = dataRows.slice(0, 3).map((row) => {
          const columns = row.split(",").map((col) => col.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = columns[index] || "";
          });
          return obj;
        });

        resolve({
          valid: errors.length === 0,
          errors,
          preview,
        });
      } catch (error) {
        resolve({
          valid: false,
          errors: ["Failed to parse CSV file. Please check the file format."],
        });
      }
    };

    reader.onerror = () => {
      resolve({
        valid: false,
        errors: ["Failed to read the file. Please try again."],
      });
    };

    reader.readAsText(file);
  });
};
