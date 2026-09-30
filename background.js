browser.runtime.onMessage.addListener(async (message) => {
  if (message.action !== "open") {
    return;
  }

  const url = message.url;
  const count = Number(message.count);

  if (!url || !Number.isInteger(count) || count < 1) {
    throw new Error("Invalid URL or count");
  }

  for (let i = 1; i <= count; i++) {
    const name = `Script Container ${i}`;

    let containers = await browser.contextualIdentities.query({ name });
    let container;

    if (containers.length > 0) {
      container = containers[0];
    } else {
      const colors = [
        "blue", "turquoise", "green", "yellow",
        "orange", "red", "pink", "purple"
      ];

      container = await browser.contextualIdentities.create({
        name,
        color: colors[(i - 1) % colors.length],
        icon: "fingerprint"
      });
    }

    await browser.tabs.create({
      url,
      cookieStoreId: container.cookieStoreId,
      active: false
    });
  }

  return { success: true, count };
});
