# Society Maintenance App - Business Logic Documentation

## 📋 Overview

You are an expert renowned UI UX developer with extensive business knowledge of real-estate administration management (Hausverwaltung in Germany).
In the existing project you should read in-depth and understand the already done pattern of svelte coding, routes, components for repeated usage etc. 
This document captures the core business logic, API patterns, and domain knowledge of the Society Maintenance Application backend for frontend development purposes.
Then wait for my wait for my input before implementing new feature additions in this svelte ui frontend project.
## 🏗️ Core Business Concepts

### **Entity Hierarchy**
```
├── Users (just a registered user. may or may not society user)
├── Societies
│    ├── Society Fund (Collective balance. Its sum of all residence funds.)
│    ├── Users (with role on the society as ADMIN(can view as well as update society, residence, expense, distributions etc) or MEMBER (view details of society residence expense maintenace etc))
│    ├── Residences (Apartments/Houses within a society)
│    │   ├── Users (Residents can view the assigned residences details, view residence maintenance, maintenance payments done on that residence, not of others. Subset of the society level residences.)
│    │   └── Residence Fund (fund of this residence contributing towards the total society fund)
│    ├── Expenses (Monthly costs to distribute)
│    │   └── Expense Distributions (How to split costs across residences with one or more calculation modes)
│    ├── Calculations (Triggered by admin on society level all expenses page for a current or future yearMonth(selectable from drop down menu). It is per (expense, yearMonth, residence) amount to pay (summing over all distributions))
│    ├── Maintenance Records (Monthly bills per residence. Triggered by admin on society level all residences page for a current yearMonth, after triggering expenses calculations. It generates per (residence, yearMonth) invoice or maintenance to be paid summing over all calculations for the residence from previous step + carry over unpaid amounts from previous month + interest on that if defined in society field)
│    ├── Maintenance Payment (input recorded by admin only inside residence page. Can be viewed all payments made in accordion manner with yearMonth as the title of the accordion.)
│    └── Expense Payment (input recorded by admin only inside expense page. Can be viewed all payments made in accordion manner with yearMonth as the title of the accordion.)
└── Advertisements
  
```

### **Key Business Rules**

#### **1. Expense Distribution Logic**
Expenses are distributed across residences using multiple calculation modes:

- **`AMOUNT_PER_OWNERSHIP_PERCENTAGE`**: Based on ownership percentage (must sum to 100%)
- **`AMOUNT_PER_RESIDENCE`**: Equal split among all residences
- **`AMOUNT_PER_SQUARE_AREA`**: Proportional to apartment area
- **`AMOUNT_PER_RESIDENT`**: Proportional to number of residents
- **`AMOUNT_PER_RESIDENT_PER_FLOOR_COUNT`**: Complex formula (residents × floors)

**Special Rules for Floor Count:**
- Residences with `floorCount = 0` are excluded from `PER_RESIDENT_PER_FLOOR_COUNT` distribution
- Empty apartments (`residentsCount = 0` but `floorCount > 0`) are treated as having 1 resident minimum

#### **2. Financial Flow**
```
Maintenance Payment for a residence by admin → Residence Fund increases → Society Fund increases. Next month's maintenance carry over balance will check all mainteance payments done towards previous yearMonth.
Expense Payment towards external expense serivce provider by admin -> Society Fun reduces -> Existing calculations of that (expense, yearMonth) for all active residences will now be updated with distribution wise expensePaid amount for that residence and residence fund would be reduced by that distributed amount. 
```

- **Fund Validation**: `Society Fund = Sum of all Residence Funds` (always enforced during payments done)
- **Last Cent Reconciliation**: Applied to ensure exact amount matching due to half up rounding of distribution calculations.

#### **3. State Management**
- **Active Maintenance**: Only one "current" maintenance record per residence, which is the latest current yearMonth if triggered.
- **Calculation Updates**: Only allowed trigger for current and future months provided no expenses were paid to that (expense, yearMonth)
- **System State Versioning**: JSON snapshots of calculation context for audit trails (not needed on front-end to show)

## 🔌 API Endpoints & Patterns

### **Base URL Structure**
```
https://gigrandom.com/api-docs
https://gigrandom.com/swagger-ui/index.html
```

### **Authentication**
- JWT token required for all protected endpoints (check api-docs or swagger-ui)
- Header: `Authorization: Bearer <token>`



## 🔄 Business Workflows

### **1. Monthly Calculation Workflow**
```
1. Admin creates/updates expenses → 
2. Admin sets expense distributions (must sum to 100%) → 
3. System validates distributions → 
4. Admin triggers calculation for all expenses in expense page → 
5. System calculates per-expense-yearMonth-residence amounts → 
6. System applies last-cent reconciliation → 
7. Calculations ready for maintenance trigger
```

### **2. Maintenance Generation Workflow**
```
1. Admin triggers maintenance for all residences in residences page → 
2. System sums all expense calculations for yearMonth → 
3. System reads mainteance payemnts done towards residence and yearMonth. Prepares previous unpaid balance + fines → 
4. System creates new maintenance record for current yearMonth being triggered → 
5. System deactivates previous maintenance so that no payment can be made towards that yearMonth after the new invoice has been generated → 
6. Residents can now make payments for the new yearMonth maintenance. Until the new one has been generated, the preivous mainteance was still acitve and hence could have paid there.
```

### **3. Payment Processing Workflow**
```
1. Resident makes maintenance payment → 
2. System increases residence fund → 
3. System increases society fund → 
4. System validates fund consistency → 
5. Payment recorded successfully
```

### **4. Expense Payment Workflow**
```
1. Admin records expense payment → 
2. System decreases society fund → 
3. System calculates distribution per residence with last-cent reconciliation to take care of half up rounding → 
4. System decreases individual residence funds by corresponding distribution expese paid amount → 
6. System marks calculation records as "expense paid" by the same distribution expense paid amount
```

## ⚠️ Critical Business Rules for Frontend

### **Validation Rules**
1. **Expense Distributions**: Must sum to exactly 100%
2. **Fund Consistency**: Society fund must equal sum of residence funds
3. **Calculation trigger**: Only allowed for current/future months or unpaid expenses
4. **Year-Month Format**: Always use YYYYMM integer format (e.g., 202507)
5. **Ownership Percentage**: Required for `AMOUNT_PER_OWNERSHIP_PERCENTAGE` distributions

### **UI Workflow Constraints**
1. **Cannot delete expenses** that have calculations marked with some expense paid already. can only deactive so that next month it's not picked up for calculations and maintenances.
2. **Cannot modify distributions** after expense payment on that parent expense.
3. **Can trigger maintenance** even after payment made towards that yearMonth. Because any delta will be taken care of in the next month.
4. **Must trigger calculations** before generating maintenance for a given yearMonth
5. **Must validate fund consistency** after payments

### **Error Handling Patterns**
- **400 Bad Request**: Validation errors (show user-friendly message)
- **409 Conflict**: State conflicts (calculation already paid, etc.)
- **422 Unprocessable Entity**: Business rule violations
- **500 Internal Server Error**: System errors (show generic message of the error message)

## 💰 Financial Calculations

### **Last Cent Reconciliation**
Nothing to do on UI. Due to rounding (HALF_UP), distributed amounts may not sum exactly to the base amount. The backend system automatically adjusts the residence with smallest/largest amount to ensure perfect balance.

**Example:**
```
Base Amount: 100.00
Calculated Distribution:
- Residence A: 33.33
- Residence B: 33.33  
- Residence C: 33.34
Total: 100.00 ✓ (after reconciliation)
```

### **Fine Calculation**
```
Fine = (Previous Unpaid Amount) × (Society Fine Rate) ÷ 100
```

### **Maintenance Formula**
```
Total Amount = Previous Balance + Fine + This yearMonth Calculations sum for the given residence across all expenses.
```

## 🔧 Frontend Development Guidelines

### **Required State Management**
- Current society context
- User authentication state
- Active year-month is current yearMonth
- Calculation: accordion on the latest yearMonth with all records expense unpaid are updatable green, rest previous yearMonth accordions are grey.
- Maintenance: accordion on the latest yearMonth with isActive = true is green, rest previosu yearMonth accordions are grey.

### **Key User Flows to be Present**
1. **User logged in Dashboard**: All societies part of (with role on that society), all advertisements created by self. done already.
2. **Expense Management**: Create, edit, distribute expenses. done already.
3. **Calculation Trigger**: Monthly calculation trigger. done already in expenses page.
4. **Maintenance Generation**: Per-residence maintenance trigger. done already in residences page.
5. **Payment Processing**: not yet done. Record payments of maintenance type inside a residence page, payment of expense type inside expense page. Also should read them in yearMonth accordion wise in descending order of yearMonth. 
6. **Financial Reports**: Fund value in society and residence level are done. Payment histories not yet done. 

### **Recommended Tech Stack Integration**
- **Form Validation**: Client-side validation matching backend rules
- **Error Boundaries**: Graceful handling of business rule violations
- **State Persistence**: Cache frequently accessed data (societies, residences)
- **Optimistic Updates**: For non-critical operations

---

## 🐛 Bug Resolution & Development Lessons Learned

### **Maintenance Payment Implementation - Key Lessons**

#### **Critical Mistakes Made & How to Avoid Them:**

1. **API Data Structure Mismatch**
   - **Mistake**: Assumed maintenance payment used `maintenanceId` field like expense payment uses `expenseId`
   - **Reality**: Maintenance payment API requires `residenceId` field instead
   - **Lesson**: ALWAYS verify API data structure by checking swagger docs or existing working examples BEFORE implementing
   - **Fix Applied**: Changed form data from `maintenanceId` to `residenceId`

2. **Field Name Assumptions Based on Entity Names**
   - **Mistake**: Used `maintenance.isActive` field assuming it matched expense patterns
   - **Reality**: Maintenance entity uses `isCurrent` field, not `isActive` 
   - **Lesson**: Never assume field names - always check actual API response structure first
   - **Fix Applied**: Updated all references from `m.isActive` to `m.isCurrent`

3. **Component Date Parsing Issues**
   - **Mistake**: Used `RelativeDate` component without checking if dates were valid
   - **Reality**: RelativeDate component fails with "RangeError: Invalid time value" on some date formats
   - **Lesson**: Test date components with actual API data, not just hardcoded test data
   - **Fix Applied**: Replaced `<RelativeDate dateString={payment.transactionDate} />` with simple `Date: {payment.transactionDate}`

4. **Missing Required Props**
   - **Mistake**: Created payment form without passing required `residenceId` prop
   - **Reality**: Form needed residence ID from parent page component, not from maintenance object
   - **Lesson**: Trace data flow from parent to child components carefully
   - **Fix Applied**: Added `residenceId={id}` prop to MaintenancePaymentForm component

#### **Proper Development Workflow for New Features:**

**Step 1: Research Existing Patterns**
```bash
# Find similar working implementations first
grep -r "createExpensePayment" src/
grep -r "payment-form" src/
# Study the working expense payment flow completely
```

**Step 2: Verify API Structure**
- Check swagger docs at `/api-docs`
- Test API manually with correct data structure
- Compare request/response with working similar endpoints

**Step 3: Component Implementation Order**
1. API methods in `api.svelte.js` (copy exact pattern from working examples)
2. Form component (copy structure from working form)
3. List/display components (copy accordion pattern from working lists)
4. Integration in page component (copy prop passing pattern)

**Step 4: Data Structure Validation**
- Log all data being sent to API
- Verify field names match API expectations exactly
- Test with real data, not placeholder data

**Step 5: Component Integration Testing**
- Test each component individually first
- Test data flow between parent/child components
- Verify all props are passed correctly

#### **API Integration Best Practices:**

1. **Always Copy Working Patterns Exactly**
   ```javascript
   // GOOD: Copy exact working pattern
   async createMaintenancePayment(paymentData) {
     const res = await client.apis.payments.addMaintenancePayment({}, { requestBody: paymentData });
     return res.body;
   }
   
   // BAD: Guess endpoint names or try multiple variations
   ```

2. **Data Structure Validation**
   ```javascript
   // ALWAYS log the exact data being sent
   console.log('Sending payment data:', paymentData);
   // Verify it matches the working manual API test
   ```

3. **Field Name Verification**
   ```javascript
   // DON'T assume field names
   residenceId: maintenance?.residenceId // WRONG
   
   // DO verify actual field requirements
   residenceId: residenceId // CORRECT - from parent component
   ```

#### **Component Pattern Replication Rules:**

1. **Form Components**: Copy exact prop structure, form fields, validation from working forms
2. **List Components**: Copy exact accordion pattern, date handling, currency formatting
3. **API Integration**: Copy exact endpoint calling pattern, error handling, response processing
4. **Parent-Child Data Flow**: Copy exact prop passing, effect patterns, state management

#### **Debugging Strategy When Things Don't Work:**

1. **Check Console Logs Appear**: If no console logs show, error is before your code runs
2. **Verify API Endpoint Exists**: 500 errors often mean wrong endpoint name
3. **Compare Data Structures**: Match your request exactly to known working requests
4. **Test Components in Isolation**: Don't integrate until individual pieces work
5. **Check Parent-Child Prop Flow**: Missing props cause silent failures

#### **Quick Reference - Working Payment Pattern:**
```javascript
// API Method (in api.svelte.js)
async createMaintenancePayment(paymentData) {
  const client = await this.getClient();
  const res = await client.apis.payments.addMaintenancePayment({}, { requestBody: paymentData });
  return res.body;
}

// Data Structure
const paymentData = {
  residenceId: residenceId, // NOT maintenanceId!
  amount: parseFloat(amount),
  transactionDate: new Date(date).toISOString(),
  yearMonth: 202507, // YYYYMM format
  description: description,
  userId: userState.user?.id
};

// Component Props
<MaintenancePaymentForm 
  maintenance={latestActiveMaintenance} 
  residenceId={id}  // REQUIRED: Pass from parent
  onSuccess={onMaintenancePaymentSuccess} 
/>
```

---
