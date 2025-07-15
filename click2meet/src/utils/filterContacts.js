 

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
  