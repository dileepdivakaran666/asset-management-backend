const express = require('express')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const assetCategoryRoutes = require('./routes/assetCategory.route');
const subcategoryRoutes = require('./routes/assetSubcategory.route');
const branchRoutes = require('./routes/branch.route');
const vendorRoutes = require('./routes/vendor.route');
const manufacturerRoutes = require('./routes/manufacturer.route');
const grnRoutes = require('./routes/grn.route');




const connectDB = require('./config/db')
dotenv.config()
connectDB()

const app = express()

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/asset-categories', assetCategoryRoutes);
app.use('/api/v1/asset-subcategories', subcategoryRoutes);
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/vendors', vendorRoutes);
app.use('/api/v1/manufacturers', manufacturerRoutes);
app.use('/api/v1/grns', grnRoutes);

app.listen(process.env.PORT || 5000, ()=>console.log(`Server running on PORT ${process.env.PORT}`))