# Software Requirements Specification (SRS) & Standard Operating Procedure (SOP)
## Project Name: Doormeets On-Demand Home Services & Product Marketplace

---

# 1. Project Overview

### Project Vision
**Doormeets** is designed to build a highly structured, reliable, and transaction-safe marketplace ecosystem for on-demand home services, spare parts, and specialized merchant referrals. By bridging the gap between customers, service vendors, and referral shop owners, Doormeets standardizes local home services like plumbing, cleaning, painting, scrap collection, and appliance repair. The vision is to replace unorganized local service markets with a digital-first platform offering upfront pricing, automated wave-based vendor dispatch, dynamic parts catalog, real-time location tracking, emergency SOS alerts, and automated financial settlements.

### Business Objectives
*   **Market Standardization:** Guarantee consistent pricing, verified quality, and background-checked service vendors.
*   **Operational Optimization:** Maximize resource utilization for vendors through intelligent geo-spatial routing and wave-based scheduling.
*   **Financial Integrity:** Standardize platform commissions, dynamic tax calculations, and real-time cash collection control.
*   **Community Referral Network:** Incentivize local merchants and shop owners to refer vendors, creating a decentralized supply onboarding loop.
*   **Emergency Safety:** Provide built-in SOS geolocation systems for customer and vendor security during active services.

### Target Audience
1.  **End Consumers (Customers):** Urban residents, homeowners, and renters looking for immediate or scheduled home services and replacement products.
2.  **Vendors (Service Providers / Agencies):** Local service business owners or independent service operators executing the service.
3.  **Shop Owners (Merchants / Referrers):** Local brick-and-mortar merchants who sign up to refer vendors to the platform and earn commissions.
4.  **Platform Administrators:** Operations and support teams monitoring platform efficiency, processing payments, and configuring the service catalog.

### Project Scope
*   **Phase 1 (Core MVP):** User/Vendor OTP login, Shop Owner password registration/login, service/product search & cart, basic booking, manual/automated vendor wave dispatch, and cash/online payments.
*   **Phase 2 (Ops Scaling):** In-app wallet, spare parts billing, painting estimations, SOS emergency logging, training videos & quizzes, vendor settlement portal, and live status updates.
*   **Phase 3 (Enterprise Grade):** AI-based route optimization, advanced CMS, platform subscription management, and detailed GST/financial compliance reports.

---

# 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT APPLICATIONS                           │
├───────────────────┬───────────────────┬────────────────┬───────────────┤
│     User App      │    Vendor App     │   Shop Panel   │  Admin Panel  │
│    (React PWA)    │    (React PWA)    │  (React PWA)   │  (React SPA)  │
└─────────┬─────────┴─────────┬─────────┴────────┬───────┴───────┬───────┘
          │                   │                  │               │
          └───────────────────┴────────┬─────────┴───────────────┘
                                       │
                            ┌──────────▼──────────┐
                            │    API Gateway      │
                            │   (Express.js)      │
                            │   - Rate Limiting   │
                            │   - CORS            │
                            │   - Helmet Security │
                            └──────────┬──────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            │                          │                          │
  ┌─────────▼────────┐      ┌──────────▼──────────┐    ┌──────────▼──────────┐
  │   REST API       │      │    Socket.io        │    │   Firebase Cloud    │
  │   Endpoints      │      │   Real-time Server  │    │   Messaging (FCM)   │
  │                  │      │                     │    │                     │
  │ - Auth Routes    │      │ - Location Updates  │    │ - Push Notifs       │
  │ - User Routes    │      │ - Booking Alerts    │    │ - Background Msgs   │
  │ - Shop Routes    │      │ - Live Statuses     │    │                     │
  │ - Admin Routes   │      │ - SOS Events        │    │                     │
  └─────────┬────────┘      └──────────┬──────────┘    └─────────────────────┘
            │                          │
            └────────────┬─────────────┘
                         │
            ┌────────────▼────────────┐
            │      MongoDB Atlas      │
            │    (Primary Database)   │
            │                         │
            │ - Users, Vendors, Shops │
            │ - Bookings, Quotations  │
            │ - SOS, Bids, Catalog    │
            └────────────┬────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼───┐      ┌─────▼─────┐    ┌─────▼─────┐
    │ Redis │      │Cloudinary │    │ Razorpay  │
    │ Cache │      │  (Media)  │    │ (Payments)│
    └───────┘      └───────────┘    └───────────┘
```

### Technical Component Specifications
*   **Mobile & Web Clients:** React.js 19 with Tailwind CSS 4. Powered by Leaflet/Google Maps for location handling and Framer Motion for smooth transitions.
*   **Backend Application:** Node.js + Express.js API gateway. Features rate limiting, CORS configuration, and security headers via Helmet.
*   **Database:** MongoDB Atlas instance using Mongoose. Structured around collections for Users, Vendors, Bookings, Transactions, ShopOwners, Scrap, SOSAlerts, and Settings.
*   **Real-time Communication:** Socket.io server running concurrently with Express. Broadcasts live location coordinates of vendors, and dispatches booking request waves and emergency SOS triggers.
*   **Push Notifications:** Firebase Admin SDK (FCM) sending mobile/browser foreground and background push messages.
*   **Cloud Storage:** Cloudinary integration for handling profile pictures, vendor verification PDFs, identity cards, and category icons.
*   **Caching & Scheduling:** Redis memory store (optional) for OTP rate-limiting, session states, and active scheduler state configuration.
*   **Payment Gateway:** Razorpay API integration for checkout orders, webhooks verification, and Dynamic QR code generation for on-site payment collections.

---

# 3. User Roles

### A. End Consumer (User / Customer)
*   **Purpose:** Search, book, pay for, and review local home services and purchase replacement products/parts, request scrap pick-ups, and trigger SOS alarms.
*   **Permissions:** View public service catalog, manage personal profile/addresses, create and modify cart (services + product items), create scrap pickup listings, pay via wallet or Razorpay online gateway, cancel bookings within policy limits, check notifications, trigger emergency SOS triggers, rate vendors.
*   **Restrictions:** Cannot view vendor financial records, shop owner referral details, or modify category catalog.
*   **Responsibilities:** Provide accurate location coordinates, input a valid contact phone number, pay for extra material charges, and share the completion OTP with the vendor only upon satisfactory work delivery.
*   **Dashboard Features:** Address manager, current booking status tracking card, cart summary, booking history list, scrap status list, profile photo editor, wallet balance, active SOS trigger button.

### B. Vendor (Service Provider)
*   **Purpose:** Manage service listings, accept bookings, execute services, add catalog parts, request settlements, upload verification/training details, and update progress.
*   **Permissions:** Manage business profile, verify bookings, update service pricing/configurations within limits, view assigned bids, take pre-qualification training videos/quizzes, initiate billing with extra materials/parts, request settlement withdrawals.
*   **Restrictions:** Cannot edit platform categories, suspend other vendors, process direct platform refunds, or view platform overall financial accounts.
*   **Responsibilities:** Respond to wave requests within the time window, coordinate with customers, execute services professionally, add genuine replacement parts with transparent pricing, take training quizzes, pay commission dues to the admin.
*   **Dashboard Features:** Live job board, training portal, active bookings list, revenue analytics charts, settlement request panel, service catalog pricing settings, emergency SOS trigger button.

### C. Shop Owner (Merchant / Referrer)
*   **Purpose:** Onboard and refer vendors to the platform, and monitor referral earnings.
*   **Permissions:** View personal referral program details, generate referral links/codes, track referred vendor onboarding states (pending verification, active, rejected), view earnings wallet details.
*   **Restrictions:** Cannot assign bookings, view customer details, edit catalog, or execute services.
*   **Responsibilities:** Introduce verified, skilled local vendors to the platform; explain platform guidelines to vendors.
*   **Dashboard Features:** Referral code generator, referred vendor list (status tracker), wallet balance tracker, payout request history list.

### D. System Administrator
*   **Purpose:** Overall governance, catalog curation, dispute resolution, manual fallback assignment, training setup, and settlement audits.
*   **Permissions:** Full CRUD on users, vendors, shop owners, categories, parts, training modules, and services. Toggle block status on users, approve/reject vendor onboarding KYC, modify platform global configuration variables, manually assign/force-assign any booking to any vendor (online or offline), handle emergency SOS flags, execute payouts.
*   **Restrictions:** Highly secure operations logged to immutable logs; cannot delete transaction history records.
*   **Responsibilities:** Maintain platform uptime, verify vendor licensing documents, manually route bookings when vendors are offline, monitor emergency SOS alerts, settle disputes fairly.
*   **Dashboard Features:** System status console, user/vendor search manager, pending verification queues, manual assignment console for offline/unclaimed bookings, emergency SOS monitor alert console, financial settlement control board, app configuration variables manager.

---

# 4. Panels

## A. Customer Application Panel
*   **Overview:** Clean, mobile-first Web interface to discover local repair services and purchase parts.
*   **Authentication:** Phone number entry -> SMS OTP sent -> verification -> automatic profile setup or dashboard redirection.
*   **Dashboard:** Dynamic hero banners, quick categories layout, active booking status tracking, search bar.
*   **Profile:** Details editor, multiple saved addresses (Home, Office, Other) with Leaflet-supported map picker.
*   **Features:** Multi-item cart, calendar slot picker, coupon/offer apply, live vendor tracking page.
*   **Reports:** Detailed Invoice download (PDF), Booking History logs.
*   **Notifications:** Push notifications and in-app alerts on booking state updates.
*   **Wallet:** Balance recharge, credit tracking, payment via wallet.
*   **Settings:** Toggle notification preferences, delete account request, customer support ticketing interface.
*   **Permissions:** Read-only access to catalogs, write access to own bookings.
*   **Security:** JWT verification header with short expiry, device-level session checks.
*   **Flow:** Choose service/product -> Add to Cart -> Select Slot & Address -> Pay -> Wait for Vendor -> Verify OTP -> Rate.

## B. Vendor Application Panel
*   **Overview:** Dashboard designed to help vendor business owners manage bookings and scale operations.
*   **Authentication:** SMS OTP with secondary email check. Requires admin verification and training attempts clearance before dashboard unlocks.
*   **Dashboard:** Active alerts list, active bookings count, monthly earnings chart, pending settlements.
*   **Profile:** Business legal documents (GSTIN, PAN, Aadhar), owner contact info, store front images, operational range.
*   **Features:** Accept/Reject wave requests, receive override notifications from Admin, set custom pricing on catalog services, browse spare parts lists, manage travel settings.
*   **Reports:** Service history metrics, custom CSV monthly payout exports.
*   **Notifications:** Socket sound alarm on new wave request or manual assignment, push notifications.
*   **Wallet:** Commission settlement tracker, pending payment dues counter, withdrawal request utility.
*   **Settings:** Set service radius, operational timings, payment modes accepted.
*   **Permissions:** Manage own service listings and bookings.
*   **Security:** Role-based JWT token with security tags `role: vendor`.
*   **Flow:** Receive Wave socket alert OR Manual Admin Force-Assignment -> Accept -> Navigate & Execute -> Add extra charges -> Generate Bill/QR -> Verify Customer OTP -> Track Settlement.

## C. Shop Owner Panel (Merchant Panel)
*   **Overview:** Simplified desktop/mobile panel for referred vendors tracking.
*   **Authentication: Phone and password login (No OTP).** Secure registration via business details and password creation.
*   **Dashboard:** Total referred vendors, verification status cards (Pending, Approved, Suspended), referred vendor lifetime earnings commission, current balance.
*   **Profile:** Merchant details, shop name, bank details for payouts.
*   **Features:** Generate code button, add vendor referral wizard, support ticketing system.
*   **Wallet:** Referral earnings ledger, withdraw history.
*   **Permissions:** Manage referrals and check earnings.
*   **Security:** Password hashed via bcrypt, session JWT verification.
*   **Flow:** Login via Phone/Password -> Share referral code -> View referred vendor verification updates -> Request withdrawal payouts.

## D. Admin Panel
*   **Overview:** Dual-theme desktop console managing the entire ecosystem.
*   **Authentication:** Strong password + Google Authenticator TOTP.
*   **Dashboard:** Core platform metrics (Total GMV, Bookings, Active Users/Vendors ratio), real-time alarm panel for bookings waiting for manual assignment.
*   **Profile:** Admin account credentials.
*   **Features:** KYC approval workspace, category manager (Drag-and-Drop builder), parts inventory catalog manager, global settings manager, booking dispatcher portal (to filter and force-assign any vendor).
*   **Reports:** Platform-wide financial reports, settlement reports, audit trails.
*   **Notifications:** Immediate dashboard updates and alerts when bookings enter the `PENDING_ADMIN_ASSIGNMENT` fallback state.
*   **Wallet:** Main payout accounts monitoring.
*   **Settings:** Global settings config (wave timings, platform commission rate, cash limits).
*   **Permissions:** Complete system access, including manual override booking dispatcher.
*   **Security:** Full encryption, session expiry within 1 hour, IP filtering option.
*   **Flow:** Review flags -> Approve Vendors -> Audit unclaimed bookings -> Manually assign booking to a vendor (online or offline) -> Run Payout Settlements -> Modify configs.

---

# 5. Module-Wise Features

## Module 1: Booking Wave Dispatch Scheduler & Admin Manual Fallback
*   **Purpose:** Allocate a new booking to the closest available vendor dynamically, with a fallback route to the Admin when no vendors are online or accept.
*   **Workflow:**
    1.  Customer creates a booking.
    2.  If **no online vendors** are registered in the area, system bypasses waves and immediately sets booking status to `PENDING_ADMIN_ASSIGNMENT` and notifications are fired to Admin.
    3.  If online vendors exist, they are sorted by distance and rating.
    4.  *Wave 1:* The closest 3 vendors are alerted. A socket signal is sent, and `BookingRequest` is created.
    5.  Scheduler waits 20 seconds. If no vendor accepts:
    6.  *Wave 2:* The next 3 vendors are alerted.
    7.  If 1 minute passes and no vendor accepts: Instead of cancelling, the system transitions status to `PENDING_ADMIN_ASSIGNMENT`.
    8.  **Admin Assignment:** Admin opens the dispatcher panel, views details, searches all registered vendors (online or offline), selects a vendor, and clicks "Force Assign".
    9.  The target vendor receives a high-priority Socket notification, SMS, and Push Notification: "Admin has assigned a booking to you".
*   **Validations:**
    *   For automatic waves: Vendor must be online and active.
    *   For admin manual override: Admin can assign any vendor regardless of status, as long as the vendor account is verified and not blocked.
*   **Business Rules:** Wave size = 3, wave delay = 20s. Search fallback triggers at 60s or immediately on 0 online vendors.
*   **Edge Cases:**
    *   *Vendor is offline when assigned:* System flags a warning to admin but proceeds to notify and place booking in vendor's active job card.
*   **Database Impact:** Updates `Booking` and inserts `BookingRequest` documents.
*   **API Requirement:** `POST /api/bookings`, `POST /api/bookings/:id/accept`, `POST /api/admin/bookings/:id/force-assign`.

## Module 2: Product & Spare Parts Billing Module
*   **Purpose:** Allow vendors to dynamically add physical products or replacement parts from the centralized catalog to the customer's active booking during on-site execution.
*   **Workflow:**
    1.  Vendor arrives at the client's home and begins inspection.
    2.  Vendor identifies that a part (e.g. "Compressor capacitor" or "1-inch Copper pipe") needs to be replaced.
    3.  Vendor opens their app, clicks "Add Material/Bill Details", and browses the pre-configured `VendorPartsCatalog`.
    4.  Vendor selects the part, sets the quantity, and saves.
    5.  The backend recalculates the booking's `finalAmount` by combining the service fee and the dynamic part pricing.
    6.  The backend applies GST/HSN tax rules to the selected parts.
    7.  Customer receives a real-time push/socket update on their app showing the updated bill details.
*   **Validations:**
    *   Part price and quantities must be positive.
    *   Parts must be active in the catalog system.
*   **Business Rules:** Recalculated totals must include standard HSN-based tax splits. Platform commission applies to the service price, whereas parts are settled based on platform agreements.
*   **Edge Cases:**
    *   *Item is out of stock in vendor inventory:* Vendor can report a custom manual item, subject to approval or validation checks.
*   **Database Impact:** Modifies `Booking` fields (`extraCharges`, `extraChargesTotal`, and `workDoneDetails`).
*   **API Requirement:** `GET /api/vendor-catalog/parts`, `POST /api/payments/generate-dynamic-qr`.

## Module 3: Emergency SOS System
*   **Purpose:** Ensure the physical safety of customers and vendors while services are being executed.
*   **Workflow:**
    1.  During an active service window, the user or vendor encounters an emergency and triggers the in-app "SOS" floating button.
    2.  The client app fetches current GPS coordinates and posts them immediately to `/api/sos/alert`.
    3.  Socket.io broadcasts a high-priority emergency event with coordinates to all active Admin dashboards.
    4.  The system alerts designated security or operations staff via SMS and push notifications.
    5.  Once the issue is handled, the Admin marks the SOS record as resolved.
*   **Validations:** Coordinates must be valid numeric lat/lng points.
*   **Database Impact:** Inserts a document in the `SOSAlert` collection.
*   **API Requirement:** `POST /api/sos/alert`, `POST /api/admin/sos/:id/resolve`.

## Module 4: Scrap Disposal & Collection Module
*   **Purpose:** Allow users to request eco-friendly collection of recyclable materials/scrap and receive direct payouts.
*   **Workflow:**
    1.  User clicks "Scrap Disposal", uploads item descriptions, photos, selects pickup slot, and sets coordinates.
    2.  Booking enters the `Scrap` system with `pending` status.
    3.  Nearby vendors inspect the listing and bid (`Bid.js` model) or accept the collection request.
    4.  Once accepted, the vendor visits the location, weighs/verifies items, inputs final payment price, and completes pickup via OTP confirmation.
*   **Database Impact:** Inserts/updates `Scrap` and `Bid` collections.
*   **API Requirement:** `POST /api/scrap/request`, `GET /api/scrap/history`, `POST /api/scrap/:id/bid`.

## Module 5: Vendor Onboarding Pre-qualification & Training
*   **Purpose:** Standardize service quality by requiring vendors to complete training videos and pass quizzes before accepting bookings.
*   **Workflow:**
    1.  Vendor registers. Dashboard is locked under `PENDING_TRAINING` state.
    2.  Vendor must watch platform training videos (`TrainingVideo` model).
    3.  Upon watching, the vendor takes an interactive quiz with multiple-choice questions (`TrainingQuestion` model).
    4.  The system records their quiz attempt (`TrainingAttempt` model). If score >= passing threshold, the account status moves to pending admin KYC verification.
*   **Database Impact:** Updates `Vendor.status` and logs quiz performance in `TrainingAttempt`.
*   **API Requirement:** `GET /api/vendor/training/videos`, `POST /api/vendor/training/submit-quiz`.

---

# 6. Booking & Service Flow (End-to-End)

```
[Customer Login via OTP]
      │
[Browse Catalog & Add Services/Products to Cart]
      │
[Select Address & Scheduled Time]
      │
[Checkout & Select Payment Mode (Online / Wallet / Cash)]
      │
[Booking Initiated: Check Online Vendors]
      ├─────────────────────────────────────────┐
      │ (Online Vendors Exist)                  │ (No Online Vendors / Waves Timeout)
[Waves Dispatch Scheduler Starts]          [Status: PENDING_ADMIN_ASSIGNMENT]
      ├───────────────────────┐                 │
      │ (Vendor Accepts)      │ (No Accept)     │
      │                       └────────────────>│
      │                                         │
      │                                    [Admin Manually Assigns Vendor]
      │                                    [(Any Vendor - Online or Offline)]
      │                                         │
      └───────────────────┬─────────────────────┘
                          ▼
              [Vendor Receives Alert & Navigates]
                          │
              [Vendor Arrives & Begins Work]
                          │
              [Extra charges / Replacement parts added from Catalog]
                          │
              [Billing & Dynamic QR Displayed]
                          │
              [Customer Pays & Receives OTP]
                          │
              [Vendor inputs OTP in App]
                          │
              [Status: Completed & Settled]
```

---

# 7. Complete Business Logic

*   **Wave Scheduling & Delay:** Delay is 20 seconds. Total booking lookup loop lasts for 60 seconds.
*   **Admin Fallback Allocation:** Triggers if no vendors are online or waves run out of candidates. Changes state to `PENDING_ADMIN_ASSIGNMENT`.
*   **Admin Force Assignment:** Admin override bypasses status restrictions, permitting direct assignment of offline vendors.
*   **Shop Referral Commissions:** 
    *   referred vendors are tied to a `referredBy` shop owner ID.
    *   Whenever a referred vendor completes a booking, the referring Shop Owner earns a reward/commission (e.g. 2% of the base booking amount), updated in `ShopOwner.wallet`.
*   **Product/Material Pricing & HSN Tax Logic:** Products and parts pull pricing from `VendorPartsCatalog.price` with GST (18%) and HSN mapping.
*   **Dynamic Pricing:**
    $$\text{Final Price} = \text{Base Price} + \text{Material Charges} + \text{Convenience Fee} + \text{GST (18\%)}$$
*   **Vendor Cash Limits:** Vendors have a limit of ₹10,000 cash collection. Once reached, they cannot accept COD jobs until they settle.
*   **Cancellation Policy:** Free cancellation within 10 minutes. ₹100 penalty after dispatch.

---

# 8. Notification Matrix

| Trigger Event | Receiver | Channel | Content | Type |
| :--- | :--- | :--- | :--- | :--- |
| Booking Created | Nearby Vendors | Push, Socket, In-App | "New Service request in your area!" | Alert |
| SOS Emergency Triggered | Admin | Socket, SMS, Push | "Emergency SOS triggered by [User/Vendor] at [Coord]" | Alert |
| Offline Fallback Triggered | Admin | Socket, Dashboard, Email | "Booking #[Number] requires manual vendor assignment" | Action |
| Admin Force Assigns | Vendor | Push, Socket, SMS | "Admin has assigned Booking #[Number] to you" | Action |
| Vendor Adds Material | Customer | Socket, Push | "Vendor added [Item] (₹[Price]) to your bill" | Info |
| Vendor Accepted | Customer | Push, In-App | "Your booking is confirmed with [Vendor]!" | Status |
| Vendor Dispatched | Customer | Push, SMS | "Vendor is heading to your location." | Tracking |
| QR Code Paid | Vendor & User | Socket, Push | "Payment of ₹X verified successfully." | Financial |
| Low Cash Wallet | Vendor | Email, Push | "Your outstanding dues exceed limit. Please settle."| Action |

---

# 9. Database Modules (Mongoose Schema Reference)

### User Collection (`User.js`)
*   `_id`: ObjectId (Primary Key)
*   `name`: String, `phone`: String (Unique, Indexed), `email`: String
*   `walletBalance`: Number, `addresses`: Array, `fcmTokens`: Array

### Vendor Collection (`Vendor.js`)
*   `_id`: ObjectId (Primary key)
*   `businessName`: String, `ownerName`: String, `phone`: String (Unique)
*   `isOnline`: Boolean, `isVerified`: Boolean, `walletDues`: Number
*   `referredBy`: ObjectId (Ref: ShopOwner)

### ShopOwner Collection (`ShopOwner.js`)
*   `_id`: ObjectId (Primary Key)
*   `name`: String, `phone`: String (Unique), `email`: String, `businessName`: String
*   `password`: String (Hashed password for login)
*   `referralCode`: String (Unique code like `SH-XXXXXX`)
*   `wallet`: `{ balance, commissionsEarned }`

### SOSAlert Collection (`SOSAlert.js`)
*   `_id`: ObjectId (Primary Key)
*   `userId`: ObjectId, `vendorId`: ObjectId, `userType`: String (`user` or `vendor`)
*   `lat`: Number, `lng`: Number, `status`: String (`pending` or `resolved`)

### Scrap Collection (`Scrap.js`)
*   `_id`: ObjectId (Primary Key)
*   `userId`: ObjectId, `title`: String, `images`: Array, `address`: Object, `status`: String, `finalPrice`: Number

---

# 10. API Modules

### User & Vendor Authentication (OTP Based)
*   `POST /api/users/auth/send-otp`
*   `POST /api/users/auth/verify-otp`
*   `POST /api/vendors/auth/send-otp`

### Shop Owner Authentication (Password Based - No OTP)
*   `POST /api/shop/auth/register` (Fields: name, phone, email, businessName, password)
*   `POST /api/shop/auth/login` (Fields: phone, password)
*   `GET /api/shop/auth/profile`

### Emergency SOS APIs
*   `POST /api/sos/alert`
*   `POST /api/admin/sos/:id/resolve`

### Scrap Disposal APIs
*   `POST /api/scrap/request`
*   `POST /api/scrap/:id/bid`

---

# 11. Security Controls

*   **Shop Password Authentication:** Hashed password entries using `bcryptjs` algorithms (stored on `ShopOwner.password`).
*   **JSON Web Tokens (JWT):** Signed using HS256 with a 7-day expiration time. Saved securely on the client.
*   **Role-Based Access Control (RBAC):** Middleware checks `req.user.role` matches routes endpoint authorization requirement.
*   **Input Validation:** Sanitize headers and fields using express-validator to block NoSQL Injection.
