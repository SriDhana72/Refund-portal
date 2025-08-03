// Get references to the step buttons and main content sections
const step1Button = document.getElementById('step-1');
const step2Button = document.getElementById('step-2');
const step1Content = document.getElementById('step-1-content');
const step2Content = document.getElementById('step-2-content');

// Get reference to the refresh button
const refreshButton = document.getElementById('refresh-button');

// Get references to the new buttons
const customDowngradeButton = document.getElementById('custom-downgrade-button');
const proceedButton = document.getElementById('proceed-button');

// Function to update the active step
function setActiveStep(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    activeButton.classList.remove('bg-white', 'text-gray-500');
    inactiveButton.classList.remove('active');
    inactiveButton.classList.add('bg-white', 'text-gray-500');
}

// Add click event listeners to step buttons to switch between steps
step1Button.addEventListener('click', () => {
    setActiveStep(step1Button, step2Button);
    step1Content.classList.remove('hidden');
    step2Content.classList.add('hidden');
});

step2Button.addEventListener('click', () => {
    setActiveStep(step2Button, step1Button);
    step1Content.classList.add('hidden');
    step2Content.classList.remove('hidden');
});

// Function to reset all form fields and hidden sections to their initial state
function resetPage() {
    // Reset main elements
    setActiveStep(step1Button, step2Button);
    step1Content.classList.remove('hidden');
    step2Content.classList.add('hidden');
    
    // Reset customer email input
    document.getElementById('customer-email').value = '';

    // Reset service dropdown
    document.getElementById('selected-option-text').textContent = 'Choose a service';
    crmFieldsContainer.classList.add('hidden');
    booksFieldsContainer.classList.add('hidden');
    
    // Reset CRM fields
    document.getElementById('selected-portal-text-crm').textContent = 'Select a portal';
    document.getElementById('zuid-input-crm').value = 'ZUID-0001';
    greenMessageCrm.classList.add('hidden');
    redMessage.classList.add('hidden');
    downgradeOptionsCrm.classList.add('hidden');
    accountTransactionsCrm.classList.add('hidden');
    
    // Reset Books fields
    document.getElementById('selected-portal-text-books').textContent = 'Select a portal';
    document.getElementById('zuid-input-books').value = 'ZUID-0002';
    greenMessageBooks.classList.add('hidden');
    downgradeOptionsBooks.classList.add('hidden');
    accountTransactionsBooks.classList.add('hidden');
    
    // Reset radio buttons and checkboxes
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    
    // Reset selected total amounts
    document.getElementById('selected-total-amount-crm').textContent = '$0';
    document.getElementById('selected-total-amount-books').textContent = '$0';
    
    // Disable the new buttons
    customDowngradeButton.disabled = true;
    proceedButton.disabled = true;
}

// Add event listener for the refresh button with a simulated quick load
if (refreshButton) {
    refreshButton.addEventListener('click', () => {
        // Show a loading state (e.g., spin the icon)
        refreshButton.disabled = true;
        refreshButton.classList.add('animate-spin');

        // Simulate a fast data refresh
        setTimeout(() => {
            resetPage();
            // Stop the loading state
            refreshButton.disabled = false;
            refreshButton.classList.remove('animate-spin');
        }, 500); // Simulated 0.5-second load time
    });
}

// Initialize the active state and page content on page load
document.addEventListener('DOMContentLoaded', () => {
    resetPage();
});

// --- Custom Dropdown Logic for "Select Service" ---
const serviceSelectButton = document.getElementById('custom-select-button');
const serviceSelectDropdown = document.getElementById('custom-select-dropdown');
const selectedServiceText = document.getElementById('selected-option-text');
const crmFieldsContainer = document.getElementById('crm-fields');
const booksFieldsContainer = document.getElementById('books-fields');
const redMessage = document.getElementById('red-message');
const greenMessageCrm = document.getElementById('green-message-crm');
const greenMessageBooks = document.getElementById('green-message-books');
const downgradeOptionsCrm = document.getElementById('downgrade-options-crm');
const downgradeOptionsBooks = document.getElementById('downgrade-options-books');
const accountTransactionsCrm = document.getElementById('account-transactions-crm');
const accountTransactionsBooks = document.getElementById('account-transactions-books');

// Toggle the dropdown menu visibility when the button is clicked
serviceSelectButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the body click from immediately closing the menu
    serviceSelectDropdown.classList.toggle('hidden');
});

// Handle clicking on an option inside the dropdown
serviceSelectDropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedValue = e.target.getAttribute('data-value');

        // Update the text of the main button and hide the dropdown
        selectedServiceText.textContent = e.target.textContent;
        serviceSelectDropdown.classList.add('hidden');

        // Show or hide specific fields based on service selection
        redMessage.classList.add('hidden');

        if (selectedValue === 'crm') {
            crmFieldsContainer.classList.remove('hidden');
            booksFieldsContainer.classList.add('hidden');
            greenMessageCrm.classList.remove('hidden');
            greenMessageBooks.classList.add('hidden');
            redMessage.classList.remove('hidden'); // Show red message for CRM
        } else if (selectedValue === 'books') {
            booksFieldsContainer.classList.remove('hidden');
            crmFieldsContainer.classList.add('hidden');
            greenMessageBooks.classList.remove('hidden');
            greenMessageCrm.classList.add('hidden');
            redMessage.classList.remove('hidden'); // Show red message for Books
        } else {
            crmFieldsContainer.classList.add('hidden');
            booksFieldsContainer.classList.add('hidden');
            greenMessageCrm.classList.add('hidden');
            greenMessageBooks.classList.add('hidden');
        }
    }
});

// Close the dropdown if the user clicks anywhere else on the page
window.addEventListener('click', () => {
    if (!serviceSelectDropdown.classList.contains('hidden')) {
        serviceSelectDropdown.classList.add('hidden');
    }
});

// --- Custom Dropdown Logic for "Select Portal" - CRM ---
const portalSelectButtonCrm = document.getElementById('portal-select-button-crm');
const portalSelectDropdownCrm = document.getElementById('portal-select-dropdown-crm');
const selectedPortalTextCrm = document.getElementById('selected-portal-text-crm');

portalSelectButtonCrm.addEventListener('click', (e) => {
    e.stopPropagation();
    portalSelectDropdownCrm.classList.toggle('hidden');
});

portalSelectDropdownCrm.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedValue = e.target.getAttribute('data-value');
        selectedPortalTextCrm.textContent = e.target.textContent;
        portalSelectDropdownCrm.classList.add('hidden');
        
        if (selectedValue === 'crm-12345') {
            downgradeOptionsCrm.classList.remove('hidden');
            // Enable the action buttons
            customDowngradeButton.disabled = false;
            proceedButton.disabled = false;
        } else {
            downgradeOptionsCrm.classList.add('hidden');
            accountTransactionsCrm.classList.add('hidden');
            // Disable the action buttons
            customDowngradeButton.disabled = true;
            proceedButton.disabled = true;
        }
    }
});

// --- Custom Dropdown Logic for "Select Portal" - Books (UPDATED) ---
const portalSelectButtonBooks = document.getElementById('portal-select-button-books');
const portalSelectDropdownBooks = document.getElementById('portal-select-dropdown-books');
const selectedPortalTextBooks = document.getElementById('selected-portal-text-books');

if (portalSelectButtonBooks) {
    portalSelectButtonBooks.addEventListener('click', (e) => {
        e.stopPropagation();
        portalSelectDropdownBooks.classList.toggle('hidden');
    });
}

if (portalSelectDropdownBooks) {
    portalSelectDropdownBooks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const selectedValue = e.target.getAttribute('data-value');
            selectedPortalTextBooks.textContent = e.target.textContent;
            portalSelectDropdownBooks.classList.add('hidden');
            
            // Show downgrade options if a portal is selected for Books
            if (selectedValue) {
                 downgradeOptionsBooks.classList.remove('hidden');
                 // Enable the action buttons
                 customDowngradeButton.disabled = false;
                 proceedButton.disabled = false;
            } else {
                 downgradeOptionsBooks.classList.add('hidden');
                 accountTransactionsBooks.classList.add('hidden');
                 // Disable the action buttons
                 customDowngradeButton.disabled = true;
                 proceedButton.disabled = true;
            }
        }
    });
}

// Close dropdowns if the user clicks anywhere else
window.addEventListener('click', () => {
    if (!portalSelectDropdownCrm.classList.contains('hidden')) {
        portalSelectDropdownCrm.classList.add('hidden');
    }
    if (portalSelectDropdownBooks && !portalSelectDropdownBooks.classList.contains('hidden')) {
        portalSelectDropdownBooks.classList.add('hidden');
    }
});

// --- Downgrade Option Radio Button and Checkbox Logic - CRM ---
const downgradeRadiosCrm = document.querySelectorAll('input[name="downgrade-type-crm"]');
const transactionHeaderCrm = document.getElementById('transactions-header-crm');
const transactionCheckboxesCrm = document.querySelectorAll('#account-transactions-crm input[type="checkbox"]');
const selectedTotalAmountCrm = document.getElementById('selected-total-amount-crm');

function updateSelectedTotalCrm() {
    let total = 0;
    transactionCheckboxesCrm.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.getAttribute('data-value'));
        }
    });
    selectedTotalAmountCrm.textContent = `$${total.toLocaleString()}`;
}

transactionCheckboxesCrm.forEach(checkbox => {
    checkbox.addEventListener('change', () => updateSelectedTotalCrm());
});

downgradeRadiosCrm.forEach(radio => {
    radio.addEventListener('change', (e) => {
        accountTransactionsCrm.classList.remove('hidden');
        transactionCheckboxesCrm.forEach(checkbox => checkbox.checked = false);
        updateSelectedTotalCrm();

        if (e.target.value === 'complete') {
            transactionHeaderCrm.textContent = 'Account Transactions';
            transactionCheckboxesCrm.forEach(checkbox => checkbox.style.display = 'none');
            selectedTotalAmountCrm.parentElement.classList.add('hidden');
        } else if (e.target.value === 'partial') {
            transactionHeaderCrm.textContent = 'Select Features to Downgrade';
            transactionCheckboxesCrm.forEach(checkbox => checkbox.style.display = 'block');
            selectedTotalAmountCrm.parentElement.classList.remove('hidden');
        }
    });
});

// --- Downgrade Option Radio Button and Checkbox Logic - Books ---
const downgradeRadiosBooks = document.querySelectorAll('input[name="downgrade-type-books"]');
const transactionHeaderBooks = document.getElementById('transactions-header-books');
const transactionCheckboxesBooks = document.querySelectorAll('#account-transactions-books input[type="checkbox"]');
const selectedTotalAmountBooks = document.getElementById('selected-total-amount-books');

function updateSelectedTotalBooks() {
    let total = 0;
    transactionCheckboxesBooks.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.getAttribute('data-value'));
        }
    });
    selectedTotalAmountBooks.textContent = `$${total.toLocaleString()}`;
}

transactionCheckboxesBooks.forEach(checkbox => {
    checkbox.addEventListener('change', () => updateSelectedTotalBooks());
});

downgradeRadiosBooks.forEach(radio => {
    radio.addEventListener('change', (e) => {
        accountTransactionsBooks.classList.remove('hidden');
        transactionCheckboxesBooks.forEach(checkbox => checkbox.checked = false);
        updateSelectedTotalBooks();

        if (e.target.value === 'complete') {
            transactionHeaderBooks.textContent = 'Account Transactions';
            transactionCheckboxesBooks.forEach(checkbox => checkbox.style.display = 'none');
            selectedTotalAmountBooks.parentElement.classList.add('hidden');
        } else if (e.target.value === 'partial') {
            transactionHeaderBooks.textContent = 'Select Features to Downgrade';
            transactionCheckboxesBooks.forEach(checkbox => checkbox.style.display = 'block');
            selectedTotalAmountBooks.parentElement.classList.remove('hidden');
        }
    });
});

// --- New Logic for the Custom Downgrade Button ---
if (customDowngradeButton) {
    customDowngradeButton.addEventListener('click', () => {
        // Determine the active service based on which fields are visible
        if (!crmFieldsContainer.classList.contains('hidden')) {
            // It's the CRM service, select the partial downgrade radio button
            const partialRadioCrm = document.getElementById('partial-downgrade-crm');
            if (partialRadioCrm) {
                partialRadioCrm.checked = true;
                partialRadioCrm.dispatchEvent(new Event('change'));
            }
        } else if (!booksFieldsContainer.classList.contains('hidden')) {
            // It's the Books service, select the partial downgrade radio button
            const partialRadioBooks = document.getElementById('partial-downgrade-books');
            if (partialRadioBooks) {
                partialRadioBooks.checked = true;
                partialRadioBooks.dispatchEvent(new Event('change'));
            }
        }
    });
}

// --- Step 1 to Step 2 Transition Logic ---
const backToDowngradeButton = document.getElementById('back-to-downgrade-button');

// Event listener for the "Proceed with Downgrade" button
proceedButton.addEventListener('click', () => {
    // Disable the button and show a processing state
    proceedButton.disabled = true;
    customDowngradeButton.disabled = true; // Disable the other button too
    proceedButton.textContent = 'Processing...';

    // Simulate a network request or processing time
    setTimeout(() => {
        // Change button state back
        proceedButton.disabled = false;
        customDowngradeButton.disabled = false;
        proceedButton.textContent = 'Proceed with Downgrade';

        // Transition to Step 2
        setActiveStep(step2Button, step1Button);
        step1Content.classList.add('hidden');
        step2Content.classList.remove('hidden');

        // Update the visual of Step 1 to show it's completed (if needed, though it's already an icon)
        step1Button.classList.add('bg-white', 'text-gray-900');

    }, 2000); // 2-second delay
});

// Event listener for the "Back to Downgrade" button in Step 2
backToDowngradeButton.addEventListener('click', () => {
    setActiveStep(step1Button, step2Button);
    step1Content.classList.remove('hidden');
    step2Content.classList.add('hidden');
});

// --- Pop-up Modal Logic ---
const extendDaysButton = document.getElementById('extend-days-button');
const extendDaysModal = document.getElementById('extend-days-modal');
const closeModalButton = document.getElementById('close-modal-button');
const cancelExtendButton = document.getElementById('cancel-extend-button');
const confirmExtensionButton = document.getElementById('confirm-extension-button');

// Function to show the modal
function showModal() {
    extendDaysModal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    extendDaysModal.classList.add('hidden');
}

// Event listener to open the modal
if (extendDaysButton) {
    extendDaysButton.addEventListener('click', showModal);
}

// Event listeners to close the modal
if (closeModalButton) {
    closeModalButton.addEventListener('click', hideModal);
}

if (cancelExtendButton) {
    cancelExtendButton.addEventListener('click', hideModal);
}

// Add functionality for the confirm button (optional)
if (confirmExtensionButton) {
    confirmExtensionButton.addEventListener('click', () => {
        console.log("Extend Days confirmed!");
        hideModal();
        // You can add more logic here, like a fetch call to an API
    });
}
