// src/utils/filterContacts.js

/**
 * Filters contacts based on a search term.
 * 
 * @param {Array} contacts - Array of contact objects.
 * @param {string} searchTerm - The search string.
 * @returns {Array} Filtered contacts.
 */
export function filterContacts(contacts, searchTerm) {
    if (!searchTerm) return contacts;
  
    const search = searchTerm.toLowerCase();
  
    return contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const email = contact.email?.toLowerCase() || "";
      const country = contact.country?.toLowerCase() || "";
  
      return (
        fullName.includes(search) ||
        email.includes(search) ||
        country.includes(search)
      );
    });
  }
  