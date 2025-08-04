document.addEventListener('DOMContentLoaded', () => {
    const step1Button = document.getElementById('step-1');
    const step2Button = document.getElementById('step-2');
    const step1Content = document.getElementById('step-1-content');
    const step2Content = document.getElementById('step-2-content');
    const refreshButton = document.getElementById('refresh-button');
    const proceedButton = document.getElementById('proceed-button');
    const serviceSelectButton = document.getElementById('custom-select-button');
    const serviceSelectDropdown = document.getElementById('custom-select-dropdown');
    const crmFieldsContainer = document.getElementById('crm-fields');
    const booksFieldsContainer = document.getElementById('books-fields');

    function setActiveStep(activeButton, inactiveButton) {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    }

    function resetPage() {
        setActiveStep(step1Button, step2Button);
        step1Content.classList.remove('hidden');
        step2Content.classList.add('hidden');
        
        document.getElementById('customer-email').value = '';
        document.getElementById('selected-option-text').textContent = 'Choose a service';
        crmFieldsContainer.classList.add('hidden');
        booksFieldsContainer.classList.add('hidden');
        
        resetServiceSection('crm');
        resetServiceSection('books');
        
        document.getElementById('red-message').classList.add('hidden');
        proceedButton.disabled = true;
    }

    function resetServiceSection(service) {
        document.getElementById(`selected-portal-text-${service}`).textContent = 'Select a portal';
        document.getElementById(`zuid-input-${service}`).value = service === 'crm' ? 'ZUID-0001' : 'ZUID-0002';
        document.getElementById(`green-message-${service}`).classList.add('hidden');
        document.getElementById(`downgrade-options-${service}`).classList.add('hidden');
        document.getElementById(`complete-downgrade-list-${service}`).classList.add('hidden');
        document.getElementById(`partial-downgrade-tabs-${service}`).classList.add('hidden');
        
        document.querySelectorAll(`input[name="downgrade-type-${service}"]`).forEach(radio => radio.checked = false);
        document.querySelectorAll(`#partial-downgrade-tabs-${service} input[type="checkbox"]`).forEach(checkbox => checkbox.checked = false);
        
        updateSelectedTotal(service);
        resetTabs(service);
    }

    function resetTabs(service) {
        const tabButtons = document.querySelectorAll(`#partial-downgrade-tabs-${service} .tab-button`);
        const tabContents = document.querySelectorAll(`#partial-downgrade-tabs-${service} .tab-content`);
        tabButtons.forEach((button, index) => {
            if (index === 0) {
                button.classList.add('active');
                document.getElementById(button.dataset.tabTarget).classList.remove('hidden');
            } else {
                button.classList.remove('active');
                 document.getElementById(button.dataset.tabTarget).classList.add('hidden');
            }
        });
    }

    function updateSelectedTotal(service) {
        let total = 0;
        document.querySelectorAll(`#partial-downgrade-tabs-${service} input[type="checkbox"]:checked`).forEach(checkbox => {
            total += parseInt(checkbox.dataset.value);
        });
        document.getElementById(`selected-total-amount-${service}`).textContent = `$${total.toLocaleString()}`;
    }

    refreshButton.addEventListener('click', resetPage);
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

    serviceSelectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        serviceSelectDropdown.classList.toggle('hidden');
    });

    serviceSelectDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const selectedValue = e.target.dataset.value;
            document.getElementById('selected-option-text').textContent = e.target.textContent;
            serviceSelectDropdown.classList.add('hidden');

            crmFieldsContainer.classList.toggle('hidden', selectedValue !== 'crm');
            booksFieldsContainer.classList.toggle('hidden', selectedValue !== 'books');
            
            if (selectedValue) {
                 document.getElementById(`green-message-${selectedValue}`).classList.remove('hidden');
                 document.getElementById('red-message').classList.remove('hidden');
            }
        }
    });

    function setupServiceSection(service) {
        const portalSelectButton = document.getElementById(`portal-select-button-${service}`);
        const portalSelectDropdown = document.getElementById(`portal-select-dropdown-${service}`);
        const downgradeRadios = document.querySelectorAll(`input[name="downgrade-type-${service}"]`);
        const completeList = document.getElementById(`complete-downgrade-list-${service}`);
        const partialTabs = document.getElementById(`partial-downgrade-tabs-${service}`);
        const tabButtons = document.querySelectorAll(`#partial-downgrade-tabs-${service} .tab-button`);

        portalSelectButton.addEventListener('click', (e) => {
            e.stopPropagation();
            portalSelectDropdown.classList.toggle('hidden');
        });

        portalSelectDropdown.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                document.getElementById(`selected-portal-text-${service}`).textContent = e.target.textContent;
                portalSelectDropdown.classList.add('hidden');
                document.getElementById(`downgrade-options-${service}`).classList.remove('hidden');
                proceedButton.disabled = false;
            }
        });

        downgradeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isPartial = e.target.value === 'partial';
                partialTabs.classList.toggle('hidden', !isPartial);
                completeList.classList.toggle('hidden', isPartial);
                if(isPartial) resetTabs(service);
            });
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTabId = e.target.dataset.tabTarget;
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                document.querySelectorAll(`#partial-downgrade-tabs-${service} .tab-content`).forEach(content => content.classList.add('hidden'));
                document.getElementById(targetTabId).classList.remove('hidden');
            });
        });
        
        document.querySelectorAll(`#partial-downgrade-tabs-${service} input[type="checkbox"]`).forEach(checkbox => {
            checkbox.addEventListener('change', () => updateSelectedTotal(service));
        });
    }

    setupServiceSection('crm');
    setupServiceSection('books');

    document.getElementById('back-to-downgrade-button').addEventListener('click', () => {
        setActiveStep(step1Button, step2Button);
        step1Content.classList.remove('hidden');
        step2Content.classList.add('hidden');
    });

    proceedButton.addEventListener('click', () => {
        proceedButton.textContent = 'Processing...';
        proceedButton.disabled = true;
        setTimeout(() => {
            proceedButton.textContent = 'Proceed with Downgrade';
            proceedButton.disabled = false;
            setActiveStep(step2Button, step1Button);
            step1Content.classList.add('hidden');
            step2Content.classList.remove('hidden');
        }, 1500);
    });
    
    const extendDaysModal = document.getElementById('extend-days-modal');
    document.getElementById('extend-days-button').addEventListener('click', () => extendDaysModal.classList.remove('hidden'));
    document.getElementById('close-modal-button').addEventListener('click', () => extendDaysModal.classList.add('hidden'));
    document.getElementById('cancel-extend-button').addEventListener('click', () => extendDaysModal.classList.add('hidden'));
    
    window.addEventListener('click', (e) => {
        if (!serviceSelectButton.contains(e.target)) serviceSelectDropdown.classList.add('hidden');
        if (!document.getElementById('portal-select-button-crm').contains(e.target)) document.getElementById('portal-select-dropdown-crm').classList.add('hidden');
        if (!document.getElementById('portal-select-button-books').contains(e.target)) document.getElementById('portal-select-dropdown-books').classList.add('hidden');
    });

    resetPage();
});
