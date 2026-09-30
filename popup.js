const urlInput = document.getElementById("url");
const countInput = document.getElementById("count");
const openButton = document.getElementById("open");
const status = document.getElementById("status");

const COLORS = [
  "blue",
  "turquoise",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple"
];

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = type;
}

function normalizeUrl(value) {
  let url = value.trim();

  if (!url) {
    throw new Error("Please enter a website URL.");
  }

  // Conveniently allow "example.com" without requiring the user
  // to type https://.
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error();
    }

    return parsed.href;
  } catch {
    throw new Error("Please enter a valid http:// or https:// URL.");
  }
}

async function getOrCreateContainer(index) {
  const name = `Script Container ${index}`;

  const existing = await browser.contextualIdentities.query({
    name
  });

  if (existing.length > 0) {
    return existing[0];
  }

  return await browser.contextualIdentities.create({
    name,
    color: COLORS[(index - 1) % COLORS.length],
    icon: "fingerprint"
  });
}

async function openContainers(url, count) {
  for (let i = 1; i <= count; i++) {
    setStatus(`Creating container ${i} of ${count}...`);

    const container = await getOrCreateContainer(i);

    await browser.tabs.create({
      url,
      cookieStoreId: container.cookieStoreId,
      active: false
    });
  }
}

openButton.addEventListener("click", async () => {
  openButton.disabled = true;
  setStatus("");

  try {
    const url = normalizeUrl(urlInput.value);

    const count = Number.parseInt(countInput.value, 10);

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      throw new Error("Number of tabs must be between 1 and 100.");
    }

    await openContainers(url, count);

    setStatus(
      `Opened ${count} container tab${count === 1 ? "" : "s"}.`,
      "success"
    );

    // Remember the last URL.
    await browser.storage.local.set({
      url,
      count
    });
  } catch (error) {
    console.error(error);

    setStatus(
      error.message || "Something went wrong.",
      "error"
    );
  } finally {
    openButton.disabled = false;
  }
});

async function restoreSettings() {
  try {
    const settings = await browser.storage.local.get([
      "url",
      "count"
    ]);

    if (settings.url) {
      urlInput.value = settings.url;
    }

    if (settings.count) {
      countInput.value = settings.count;
    }
  } catch (error) {
    console.error("Could not restore settings:", error);
  }

  urlInput.focus();
}

restoreSettings();

