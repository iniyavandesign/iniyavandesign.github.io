# Implementation Plan

## Phase 1: Core Setup (Current)
- [x] Project Structure
- [x] Landing Page (UI/UX)
- [x] Authentication Modals (Frontend)

## Phase 2: Backend Development (PHP/MySQL)
- [ ] Database Connection Class
- [ ] User Authentication (Login/Register)
- [ ] Session Management

## Phase 3: Dashboard Features
- [ ] **Foreman Dashboard**:
    - Create Group (Amount, Months, Members)
    - View Active Groups
    - Manage Auctions
- [ ] **Subscriber Dashboard**:
    - View Joined Groups
    - Bid in Auction
    - View Payment History

## Phase 4: Core Logic Implementation
- [ ] Calculate Monthly Pool
- [ ] Auction Logic (Validating bids)
- [ ] Dividend Calculation Formula: `(Total Discount - Commission) / (Total Members - 1)`
- [ ] Cycle Transition

## Phase 5: Testing & Polish
- [ ] UI Responsiveness Check
- [ ] Security Audits (SQL Injection, XSS)
