const ExcelJS = require('exceljs');
const grnReporstService = require('../services/grnReport.service');

exports.getGRNReport = async (req, res) => {
  try {
    const result = await grnReporstService.fetchGRNReport(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportGRNReport = async (req, res) => {
  try {
    const filters = req.query;
    const grns = await grnReporstService.fetchGRNReport(filters);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('GRN Report');

    // ✅ 1. Add Company Name (Title Row)
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Stacker Asset Management GRN Report';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true, color: { argb: '1F4E78' } };

    // ✅ 2. Add Empty Row
    worksheet.addRow([]);

    // ✅ 3. Add Column Headers (Manual)
    const headerLabels = [
      'GRN Number',
      'GRN Date',
      'Invoice Number',
      'Vendor Name',
      'Branch',
      'Total Amount',
    ];
    const headerRow = worksheet.addRow(headerLabels);

    // ✅ 4. Style the Header Row
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // ✅ 5. Insert Data Rows
    grns.forEach((grn) => {
      worksheet.addRow([
        grn.grnNumber,
        new Date(grn.grnDate).toLocaleDateString(),
        grn.invoiceNumber,
        grn.vendorId?.name,
        grn.branchId?.name,
        grn.grandTotal,
      ]);
    });

    // ✅ 6. Set Column Widths
    worksheet.columns = [
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 25 },
      { width: 25 },
      { width: 20 },
    ];

    // ✅ 7. Optional: Freeze Header and Enable Filters
    worksheet.views = [{ state: 'frozen', ySplit: 3 }];
    worksheet.autoFilter = {
      from: 'A3',
      to: 'F3',
    };

    // ✅ 8. Send Excel as Download
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=GRN_Report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Export Error:', err);
    res.status(500).json({ message: 'Failed to export GRN report' });
  }
};
