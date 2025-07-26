const reportService = require('../services/assetSummeryReport.service');

exports.getAssetSummary = async (req, res) => {
  try {
    const result = await reportService.getAssetSummary();
    res.status(200).json(result);
  } catch (error) {
    console.error('Asset Summary Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.exportAssetSummary = async (req, res) => {
  try {
    const stream = await reportService.exportAssetSummary();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=asset_summary.xlsx');

    stream.xlsx.write(res).then(() => res.end());
  } catch (error) {
    console.error('Excel Export Error:', error);
    res.status(500).json({ message: 'Export Failed' });
  }
};
