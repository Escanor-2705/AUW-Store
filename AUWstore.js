const NUMERO_WHATSAPP = "242067079825";

function ouvrirWhatsApp(message) {
    window.open("https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank");
}

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("actif");
}

// Boutons "Commander sur WhatsApp" (produits)
document.querySelectorAll(".js-commander").forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        const choix = document.getElementById(bouton.dataset.taille).value;
        const label = bouton.dataset.label || "Taille";
        ouvrirWhatsApp(
            "Salut AUW ! Je veux commander :\n" +
            "- " + bouton.dataset.produit + " (" + bouton.dataset.prix + ")\n" +
            "- " + label + " : " + choix + "\n" +
            "- Mode de paiement (Mobile Money / Airtel Money / NDYC Paiement Advanced) : ?\n" +
            "- Quartier de livraison : ?"
        );
    });
});

// Autres boutons WhatsApp (message dans data-msg)
document.querySelectorAll(".js-wa").forEach(function (lien) {
    lien.addEventListener("click", function (e) {
        e.preventDefault();
        ouvrirWhatsApp(lien.dataset.msg);
    });
});

// Crop top : l'image change avec la couleur
const couleurCrop = document.getElementById("couleur-crop");
if (couleurCrop) {
    couleurCrop.addEventListener("change", function () {
        document.getElementById("img-crop").src = "crop-top-" + couleurCrop.value + ".jpg";
    });
}

// Installation comme application (PWA)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js");
    });
}
