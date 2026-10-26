document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applicationForm");
  const modal = document.getElementById("successModal");
  const closeBtn = document.querySelector(".close-btn");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Fermer le menu de navigation"
          : "Ouvrir le menu de navigation",
      );
      menuToggle.innerHTML = `<i class="fas fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
        menuToggle.innerHTML =
          '<i class="fas fa-bars" aria-hidden="true"></i>';
      });
    });
  }

  // Écoute de la soumission du formulaire
  if (!(form instanceof HTMLFormElement) || !modal || !closeBtn) {
    return;
  }

  const applicationForm = form;
  const commitment = document.getElementById("commitment");

  applicationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Vérification basique supplémentaire si besoin (le HTML5 'required' fait le gros du travail)
    if (commitment instanceof HTMLInputElement && commitment.checked) {
      // Affichage de la modale de confirmation
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");

      // Réinitialisation du formulaire
      applicationForm.reset();
    }
  });

  // Fermeture de la modale au clic sur la croix
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  // Fermeture de la modale au clic en dehors de celle-ci
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
