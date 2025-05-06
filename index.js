const emptyTabUrl = "chrome://newtab/";

const checkForDuplicateTabs = async () => {
  const tabUrls = [];
  chrome.storage.sync.get({ closeEmptyDuplicateTabs: false }, (items) => {
    const closeEmptyDuplicates = items.closeEmptyDuplicateTabs;
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tabUrls?.findIndex((openTab) => tab?.url === openTab?.url) === -1) {
          tabUrls.push({ url: tab?.url, id: tab?.id });
        } else if (!(!closeEmptyDuplicates && tab?.url === emptyTabUrl)) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
  });
};

chrome.tabs.onCreated.addListener(() => {
  checkForDuplicateTabs();
});

chrome.tabs.onUpdated.addListener(() => {
  checkForDuplicateTabs();
});
