const radioButtons = document.querySelectorAll("input[name=conditional]");

radioButtons?.forEach((button) => {
  button.addEventListener("change", (e) => {
    const closeEmptyDuplicates = e.target.id === "yes" && e.target.checked;
    chrome.storage.sync.set({ closeEmptyDuplicateTabs: closeEmptyDuplicates });
  });
});

const loadSavedOptions = () => {
  chrome.storage.sync.get({ closeEmptyDuplicateTabs: false }, (items) => {
    document.getElementById("yes").checked = items.closeEmptyDuplicateTabs;
    document.getElementById("no").checked = !items.closeEmptyDuplicateTabs;
  });
};

document.addEventListener("DOMContentLoaded", loadSavedOptions);
