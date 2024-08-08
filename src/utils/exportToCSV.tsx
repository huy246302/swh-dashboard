// src/utils/exportToCSV.ts

export function exportToCSV(data: any[], filename: string, headers: string[]) {
  const csvRows: string[] = [];
  
  // Add the headers
  csvRows.push(headers.join(','));

  // Add the rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header] ?? '';
      return `"${String(value).replace(/"/g, '""')}"`; // Escape double quotes
    });
    csvRows.push(values.join(','));
  }

  // Create a Blob and download it
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
