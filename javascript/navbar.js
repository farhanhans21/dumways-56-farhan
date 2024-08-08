const redirectToWhatsApp = async () => {
  try {
    window.location.href = "https://wa.me/6285218494144";
  } catch (error) {
    console.error("Error loading to WhatsApp:", error);
  }
};
