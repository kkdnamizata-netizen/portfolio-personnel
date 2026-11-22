$(document).ready(function () {

    $("nav a, .presentation a").on("click", function (event) {
        const cible = $(this).attr("href");

        if (cible && cible.startsWith("#")) {
            const section = $(cible);

            if (section.length) {
                event.preventDefault();

                $("html, body").animate({
                    scrollTop: section.offset().top
                }, 700);
            }
        }
    });

    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        const formulaire = $(this);
        const bouton = formulaire.find('button[type="submit"]');

        bouton.prop("disabled", true).text("Envoi en cours...");

        $.ajax({
            url: "https://formsubmit.co/ajax/kkdnamizata@gmail.com",
            method: "POST",
            dataType: "json",
            accepts: "application/json",

            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                message: $("#message").val(),
                _subject: "Nouveau message depuis mon portfolio",
                _template: "table"
            },

            success: function (data) {
                if (data.success === "true" || data.success === true) {
                    alert("Ton message a été envoyé avec succès !");
                    formulaire[0].reset();
                } else {
                    alert("L'envoi a échoué : " + (data.message || "Vérifie ton adresse e-mail."));
                }
            },

            error: function (xhr) {
                alert("Erreur lors de l'envoi. Vérifie ta connexion et réessaie.");
                console.log(xhr.responseText);
            },

            complete: function () {
                bouton.prop("disabled", false).text("Envoyer");
            }
        });
    });

    $(".carte-projet").hover(
        function () {
            $(this).css("transform", "translateY(-5px)");
        },
        function () {
            $(this).css("transform", "translateY(0)");
        }
    );

    $(".carte-competence").hover(
        function () {
            $(this).css("transform", "scale(1.04)");
        },
        function () {
            $(this).css("transform", "scale(1)");
        }
    );

    console.log("Portfolio chargé avec succès !");

});