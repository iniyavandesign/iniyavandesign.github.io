/* Dashboard Data & Logic */

// State
const state = {
    currentUser: {
        name: 'Rajesh Kumar',
        role: 'Foreman'
    },
    stats: {
        activeGroups: 12,
        totalValue: 2450000,
        nextAuction: 'Today, 4 PM',
        members: 148
    },
    groups: [
        { id: 1, name: 'Friends Circle Alpha', month: 5, totalMonths: 20, value: 50000, nextAuction: '12th Oct', status: 'Active' },
        { id: 2, name: 'Business Growth B', month: 2, totalMonths: 12, value: 100000, nextAuction: '15th Oct', status: 'Active' },
        { id: 3, name: 'Family Savings', month: 12, totalMonths: 12, value: 25000, nextAuction: 'Completed', status: 'Settlement' },
        { id: 4, name: 'Techie Chit Fund', month: 8, totalMonths: 24, value: 200000, nextAuction: '18th Oct', status: 'Active' },
        { id: 5, name: 'Neighborhood Kitty', month: 1, totalMonths: 10, value: 10000, nextAuction: '20th Oct', status: 'Active' },
        { id: 6, name: 'Traders Union', month: 18, totalMonths: 20, value: 500000, nextAuction: '22nd Oct', status: 'Active' },
        { id: 7, name: 'Golden Years', month: 24, totalMonths: 24, value: 100000, nextAuction: 'Closed', status: 'Closed' },
        { id: 8, name: 'Rapid Returns', month: 3, totalMonths: 6, value: 50000, nextAuction: '25th Oct', status: 'Active' },
        { id: 9, name: 'Women Entrepreneurs', month: 6, totalMonths: 15, value: 150000, nextAuction: '28th Oct', status: 'Active' },
        { id: 10, name: 'College Fund', month: 10, totalMonths: 36, value: 300000, nextAuction: '30th Oct', status: 'Active' }
    ],
    members: [
        { id: 101, name: 'Magesh', email: 'magesh@example.com', phone: '9876543210', groupName: 'Friends Circle Alpha', status: 'Active' },
        { id: 102, name: 'Anita Desai', email: 'anita@example.com', phone: '9123456780', groupName: 'Business Growth B', status: 'Active' },
        { id: 103, name: 'Karthik S', email: 'karthik@example.com', phone: '9988776655', groupName: 'Family Savings', status: 'Pending' },
        { id: 104, name: 'Sarah Thomas', email: 'sarah.t@example.com', phone: '9845123456', groupName: 'Techie Chit Fund', status: 'Active' },
        { id: 105, name: 'Rahim Khan', email: 'rahim.k@example.com', phone: '9888112233', groupName: 'Traders Union', status: 'Active' },
        { id: 106, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '9765432109', groupName: 'Women Entrepreneurs', status: 'Active' },
        { id: 107, name: 'Arjun Singh', email: 'arjun.singh@example.com', phone: '9900112233', groupName: 'Techie Chit Fund', status: 'Active' },
        { id: 108, name: 'Lakshmi Menon', email: 'lakshmi.m@example.com', phone: '9555666777', groupName: 'Neighborhood Kitty', status: 'Active' },
        { id: 109, name: 'David Wilson', email: 'david.w@example.com', phone: '9333444555', groupName: 'Rapid Returns', status: 'Delayed' },
        { id: 110, name: 'Fatima Bi', email: 'fatima.b@example.com', phone: '9222333444', groupName: 'Women Entrepreneurs', status: 'Active' }
    ],
    transactions: [
        { id: 'TXN001', member: 'Magesh', group: 'Friends Circle Alpha', amount: 2500, date: '2023-10-01', type: 'Credit' },
        { id: 'TXN002', member: 'Anita Desai', group: 'Business Growth B', amount: 8000, date: '2023-10-02', type: 'Credit' },
        { id: 'TXN003', member: 'Karthik S', group: 'Family Savings', amount: 2000, date: '2023-10-03', type: 'Credit' },
        { id: 'TXN004', member: 'Sarah Thomas', group: 'Techie Chit Fund', amount: 10000, date: '2023-10-04', type: 'Credit' },
        { id: 'TXN005', member: 'Rahim Khan', group: 'Traders Union', amount: 25000, date: '2023-10-04', type: 'Credit' },
        { id: 'TXN006', member: 'Priya Sharma', group: 'Women Ent...', amount: 10000, date: '2023-10-05', type: 'Credit' },
        { id: 'TXN007', member: 'System', group: 'Golden Years', amount: 100000, date: '2023-10-05', type: 'Debit (Payout)' },
        { id: 'TXN008', member: 'Arjun Singh', group: 'Techie Chit Fund', amount: 10000, date: '2023-10-06', type: 'Credit' }
    ]
};

// Utils
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Render Functions
function renderStats() {
    document.getElementById('stat-groups').textContent = state.stats.activeGroups;
    document.getElementById('stat-value').textContent = formatCurrency(state.stats.totalValue);
    document.getElementById('stat-auction').textContent = state.stats.nextAuction;
    document.getElementById('stat-members').textContent = state.stats.members;
}

function renderGroups() {
    const rows = state.groups.map(g => `
        <tr>
            <td>${g.name}</td>
            <td>${g.month} / ${g.totalMonths}</td>
            <td>${formatCurrency(g.value)}</td>
            <td>${g.nextAuction}</td>
            <td><span class="status ${g.status === 'Active' ? 'active' : 'pending'}">${g.status}</span></td>
            <td><button class="btn btn-primary" onclick="viewGroup(${g.id})" style="padding: 0.4rem 1rem; font-size: 0.8rem">View</button></td>
        </tr>
    `).join('');

    const summaryTable = document.getElementById('groups-table-body');
    const fullTable = document.getElementById('groups-table-body-full');

    if (summaryTable) summaryTable.innerHTML = rows;
    if (fullTable) fullTable.innerHTML = rows;
}

// View Group Details Logic
window.viewGroup = function (groupId) {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return;

    // Populate Modal Info
    document.getElementById('modal-group-name').textContent = group.name;
    document.getElementById('modal-group-value').textContent = formatCurrency(group.value);
    document.getElementById('modal-group-date').textContent = group.nextAuction;
    document.getElementById('modal-group-status').textContent = group.status;

    // Mock Members for this group
    const groupMembers = state.members.filter(m => Math.random() > 0.3 || m.id === 101);

    const tbody = document.getElementById('modal-members-body');
    tbody.innerHTML = groupMembers.map(m => `
        <tr>
            <td>
                <div style="font-weight: 500">${m.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${m.email}</div>
            </td>
            <td>${m.phone}</td>
            <td>Subscriber</td>
            <td><span class="status ${m.status === 'Active' ? 'active' : 'pending'}">${m.status}</span></td>
        </tr>
    `).join('');

    document.getElementById('group-details-modal').classList.add('active');
}

// Member Management Logic
window.openMemberModal = function (id = null) {
    const modal = document.getElementById('member-modal');
    const title = document.getElementById('member-modal-title');
    const form = document.getElementById('member-form');
    const groupSelect = document.getElementById('member-group-select');

    // Populate Groups in Dropdown
    groupSelect.innerHTML = '<option value="">Select a Group...</option>' +
        state.groups.map(g => `<option value="${g.name}">${g.name}</option>`).join('');

    // Reset Form
    form.reset();
    document.getElementById('member-id').value = '';

    if (id) {
        // Edit Mode - Pre-fill Data
        const member = state.members.find(m => m.id === id);
        if (member) {
            title.textContent = 'Edit Member';
            document.getElementById('member-id').value = member.id;
            document.getElementById('member-name').value = member.name;
            document.getElementById('member-email').value = member.email;
            document.getElementById('member-phone').value = member.phone;
            groupSelect.value = member.groupName;
        }
    } else {
        // Add Mode
        title.textContent = 'Add New Member';
    }

    modal.classList.add('active');
}

// Edit Trigger
window.editMember = function (id) {
    openMemberModal(id);
}

// Member Form Handler
document.getElementById('member-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('member-id').value;
    const name = document.getElementById('member-name').value;
    const email = document.getElementById('member-email').value;
    const phone = document.getElementById('member-phone').value;
    const groupName = document.getElementById('member-group-select').value;

    if (id) {
        // Update Existing
        const index = state.members.findIndex(m => m.id == id);
        if (index !== -1) {
            state.members[index] = { ...state.members[index], name, email, phone, groupName };
        }
    } else {
        // Add New
        state.members.push({
            id: Date.now(),
            name,
            email,
            phone,
            groupName,
            status: 'Active'
        });

        // Update Stats
        state.stats.members++;
        renderStats();
    }

    renderMembers();
    closeModals();
});

// Update Member Render to include OnClick
members: [
    { id: 101, name: 'Magesh', email: 'magesh@example.com', phone: '9876543210', groupName: 'Friends Circle Alpha', status: 'Active' },
    { id: 102, name: 'Anita Desai', email: 'anita@example.com', phone: '9123456780', groupName: 'Business Growth B', status: 'Active' },
    { id: 103, name: 'Karthik S', email: 'karthik@example.com', phone: '9988776655', groupName: 'Family Savings', status: 'Pending' }
],

    // ... (skipping lines) ...

    // Update Member Render to include OnClick
    function renderMembers() {
        const tbody = document.getElementById('members-table-body');
        tbody.innerHTML = state.members.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.email}</td>
            <td>${m.phone}</td>
            <td>${m.groupName || '-'}</td>
            <td><span class="status ${m.status === 'Active' ? 'active' : 'pending'}">${m.status}</span></td>
            <td><button class="btn btn-outline" onclick="editMember(${m.id})" style="padding: 0.4rem 1rem; font-size: 0.8rem">Edit</button></td>
        </tr>
    `).join('');
    }

function renderTransactions() {
    const tbody = document.getElementById('payments-table-body');
    tbody.innerHTML = state.transactions.map(t => `
        <tr>
            <td>${t.id}</td>
            <td>${t.member}</td>
            <td>${t.group}</td>
            <td>${formatCurrency(t.amount)}</td>
            <td>${t.date}</td>
            <td><span class="status active">Success</span></td>
        </tr>
    `).join('');
}

// Navigation Logic
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Update Menu UI
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Show Section
        const sectionId = item.getAttribute('data-section');
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        // Refresh Data if needed
        if (sectionId === 'groups') renderGroups();
        if (sectionId === 'members') renderMembers();
        if (sectionId === 'reports') renderTransactions();
    });
});

// Modal Logic
function openAddGroupModal() {
    document.getElementById('add-group-modal').classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// Form Handlers
document.getElementById('add-group-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('group-name').value;
    const value = parseInt(document.getElementById('group-value').value);

    // Add new group
    state.groups.unshift({
        id: Date.now(),
        name: name,
        month: 1,
        totalMonths: 20, // Default
        value: value,
        nextAuction: 'Upcoming',
        status: 'Active'
    });

    // Update Stats
    state.stats.activeGroups++;
    state.stats.totalValue += value;

    renderStats();
    renderGroups();
    closeModals();

    // Switch to groups view
    document.querySelector('[data-section="groups"]').click();
});

// Auction Logic
function renderAuctions() {
    const tbody = document.getElementById('auctions-table-body');
    // Using filtered groups as auction data for now
    const upcomingAuctions = state.groups.filter(g => g.status === 'Active');

    tbody.innerHTML = upcomingAuctions.map(g => `
        <tr>
            <td>${g.name}</td>
            <td>${g.nextAuction}</td>
            <td>${formatCurrency(g.value)}</td>
            <td><span class="status pending">Upcoming</span></td>
            <td><button class="btn btn-outline" style="padding: 0.4rem 1rem; font-size: 0.8rem">Manage</button></td>
        </tr>
    `).join('');
}

window.openAuctionModal = function () {
    document.getElementById('auction-room-modal').classList.add('active');
}

window.placeManualBid = function () {
    const input = document.getElementById('manual-bid-amount');
    const amount = parseInt(input.value);

    if (!amount || amount <= 0) {
        alert('Please enter a valid bid amount');
        return;
    }

    // Update Display
    document.getElementById('current-bid-display').textContent = formatCurrency(amount);
    document.getElementById('current-bidder-display').textContent = 'Held by: You (Manual)';

    // Add to History
    const historyList = document.getElementById('bid-history');
    const newBidHTML = `
        <div class="bid-item" style="animation: fadeIn 0.3s ease; background: rgba(21, 128, 61, 0.05);">
            <span>You (Manual)</span>
            <span class="bid-amount">${formatCurrency(amount)}</span>
        </div>
    `;
    historyList.insertAdjacentHTML('afterbegin', newBidHTML);

    // Clear and Focus
    input.value = '';
    input.focus();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderGroups();
    renderMembers();
    renderTransactions();
    renderAuctions();
});
