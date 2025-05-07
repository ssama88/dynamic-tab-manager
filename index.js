const emptyTabUrl = "chrome://newtab/";

const checkForDuplicateTabs = async () => {
  chrome.storage.sync.get({ closeEmptyDuplicateTabs: false }, (items) => {
    const tabObjs = [];
    const closeEmptyDuplicates = items.closeEmptyDuplicateTabs;
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        const ogTab = tabObjs?.find((openTab) => tab?.url === openTab?.url);
        if (!ogTab) {
          tabObjs.push({
            url: tab?.url,
            id: tab?.id,
            lastAccessed: tab?.lastAccessed,
          });
        } else if (!(!closeEmptyDuplicates && tab?.url === emptyTabUrl)) {
          const tabToDelete =
            ogTab?.lastAccessed > tab?.lastAccessed ? tab : ogTab;
          chrome.tabs.remove(tabToDelete?.id);
        }
      });
    });
  });
};

chrome.tabs.onCreated.addListener(async (e) => {
  checkForDuplicateTabs();
});

chrome.tabs.onUpdated.addListener(() => {
  checkForDuplicateTabs();
});
