import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSalesReport,
  fetchInventoryReport,
  fetchDashboardMetrics,
  generateCustomReport,
  fetchTopSellingProducts,
  fetchRevenueByCategory,
  fetchCustomerAcquisitionReport,
  fetchProfitMarginReport
} from '../../actions/reportsAndAnalyticsActions';
import { Line, Bar, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportsAndAnalytics = () => {
  const dispatch = useDispatch();
  const [selectedReport, setSelectedReport] = useState('sales');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [customReportType, setCustomReportType] = useState('sales');

  const {
    salesReport,
    inventoryReport,
    dashboardMetrics,
    customReport,
    topSellingProducts,
    revenueByCategory,
    customerAcquisitionReport,
    profitMarginReport,
    loading,
    error
  } = useSelector(state => state.reportsAndAnalytics);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  const handleReportSelection = (reportType) => {
    setSelectedReport(reportType);
    switch (reportType) {
      case 'sales':
        dispatch(fetchSalesReport());
        break;
      case 'inventory':
        dispatch(fetchInventoryReport());
        break;
      case 'topSelling':
        dispatch(fetchTopSellingProducts());
        break;
      case 'revenueByCategory':
        dispatch(fetchRevenueByCategory());
        break;
      case 'customerAcquisition':
        dispatch(fetchCustomerAcquisitionReport());
        break;
      case 'profitMargin':
        dispatch(fetchProfitMarginReport());
        break;
      default:
        break;
    }
  };

  const handleCustomReportSubmit = (e) => {
    e.preventDefault();
    dispatch(generateCustomReport({
      type: customReportType,
      startDate,
      endDate
    }));
  };

  const renderChart = () => {
    switch (selectedReport) {
      case 'sales':
        return salesReport ? (
          <Line
            data={{
              labels: salesReport.labels,
              datasets: [{
                label: 'Sales',
                data: salesReport.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }}
          />
        ) : null;
      case 'inventory':
        return inventoryReport ? (
          <Bar
            data={{
              labels: inventoryReport.labels,
              datasets: [{
                label: 'Inventory Levels',
                data: inventoryReport.data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              }]
            }}
          />
        ) : null;
      case 'revenueByCategory':
        return revenueByCategory ? (
          <Pie
            data={{
              labels: revenueByCategory.labels,
              datasets: [{
                data: revenueByCategory.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              }]
             }}
          />
        ) : null;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="reports-and-analytics">
      <h1>Reports and Analytics</h1>

      <div className="dashboard-metrics">
        <h2>Dashboard Metrics</h2>
        {dashboardMetrics && (
          <div>
            <p>Total Sales: ${dashboardMetrics.totalSales}</p>
            <p>Total Revenue: ${dashboardMetrics.totalRevenue}</p>
            <p>Total Customers: {dashboardMetrics.totalCustomers}</p>
          </div>
        )}
      </div>

      <div className="report-selection">
        <h2>Select Report</h2>
        <button onClick={() => handleReportSelection('sales')}>Sales Report</button>
        <button onClick={() => handleReportSelection('inventory')}>Inventory Report</button>
        <button onClick={() => handleReportSelection('topSelling')}>Top Selling Products</button>
        <button onClick={() => handleReportSelection('revenueByCategory')}>Revenue by Category</button>
        <button onClick={() => handleReportSelection('customerAcquisition')}>Customer Acquisition</button>
        <button onClick={() => handleReportSelection('profitMargin')}>Profit Margin</button>
      </div>

      <div className="report-display">
        <h2>{selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report</h2>
        {renderChart()}
      </div>

      <div className="custom-report">
        <h2>Generate Custom Report</h2>
        <form onSubmit={handleCustomReportSubmit}>
          <label>
            Report Type:
            <select value={customReportType} onChange={(e) => setCustomReportType(e.target.value)}>
              <option value="sales">Sales</option>
              <option value="inventory">Inventory</option>
              <option value="revenueByCategory">Revenue by Category</option>
            </select>
          </label>
          <br />
          <label>
            Start Date:
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </label>
          <br />
          <label>
            End Date:
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </label>
          <br />
          <button type="submit">Generate Report</button>
        </form>
        {customReport && (
          <div>
            <h3>Custom Report</h3>
            <pre>{JSON.stringify(customReport, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;