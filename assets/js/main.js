/* MBB Training & Development — site behaviour (no dependencies). */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setNav(false);
    });
  }

  /* ---------- Header search ----------
     On small screens the search collapses to an icon; the first tap opens it.
     Searches are sent to the blog page, which filters posts by the query. */
  var search = document.querySelector(".site-search");
  if (search) {
    var searchInput = search.querySelector("input");
    var compact = window.matchMedia("(max-width: 1099px)");
    search.addEventListener("submit", function (e) {
      if (compact.matches && !search.classList.contains("is-open")) {
        e.preventDefault();
        search.classList.add("is-open");
        searchInput.focus();
        return;
      }
      if (!searchInput.value.trim()) {
        e.preventDefault();
        searchInput.focus();
      }
    });
    searchInput.addEventListener("blur", function () {
      if (!searchInput.value) search.classList.remove("is-open");
    });
  }

  /* ---------- Blog search results ---------- */
  var postList = document.querySelector("[data-post-list]");
  if (postList) {
    var query = new URLSearchParams(window.location.search).get("q");
    if (query) {
      var q = query.trim().toLowerCase();
      var shown = 0;
      postList.querySelectorAll(".post-card").forEach(function (card) {
        var match = card.textContent.toLowerCase().indexOf(q) !== -1;
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (searchInput) searchInput.value = query;
      var note = document.createElement("p");
      note.className = "blog-empty";
      note.setAttribute("role", "status");
      note.textContent = shown
        ? shown + " result" + (shown === 1 ? "" : "s") + " for “" + query + "”"
        : "No posts match “" + query + "”.";
      postList.prepend(note);
    }
  }

  /* ---------- Portfolio filters ---------- */
  document.querySelectorAll("[data-filters]").forEach(function (group) {
    var grid = document.getElementById(group.getAttribute("aria-controls"));
    if (!grid) return;
    var buttons = group.querySelectorAll("button[data-filter]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        grid.querySelectorAll("[data-category]").forEach(function (item) {
          item.hidden = filter !== "all" && item.getAttribute("data-category") !== filter;
        });
      });
    });
  });

  /* ---------- Video buttons ----------
     Add data-video="https://…" to a .play-btn to open a video. */
  document.querySelectorAll(".play-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-video");
      if (url) window.open(url, "_blank", "noopener");
    });
  });

  /* ---------- Forms ----------
     Front-end validation only. Submissions are logged to the console until a
     backend (e.g. Formspree, Netlify Forms or an API endpoint) is connected:
     set the form's `action` attribute and remove `data-mock`. */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setStatus(form, message, ok) {
    var status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-success", !!ok);
    status.classList.toggle("is-error", !ok);
  }

  function validateField(field) {
    var input = field.querySelector("input, textarea");
    var error = field.querySelector(".field__error");
    var value = input.value.trim();
    var message = "";
    if (input.required && !value) message = "This field is required.";
    else if (input.type === "email" && value && !EMAIL.test(value)) message = "Please enter a valid email address.";
    field.classList.toggle("is-invalid", !!message);
    input.setAttribute("aria-invalid", String(!!message));
    if (error) error.textContent = message;
    return !message;
  }

  document.querySelectorAll("form[data-mock]").forEach(function (form) {
    form.setAttribute("novalidate", "");
    var fields = form.querySelectorAll(".field");

    fields.forEach(function (field) {
      var input = field.querySelector("input, textarea");
      input.addEventListener("blur", function () { validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;

      if (fields.length) {
        fields.forEach(function (field) { ok = validateField(field) && ok; });
      } else {
        var email = form.querySelector("input[type=email]");
        ok = EMAIL.test(email.value.trim());
        email.setAttribute("aria-invalid", String(!ok));
      }

      if (!ok) {
        setStatus(form, "Please check the highlighted fields.", false);
        var firstInvalid = form.querySelector("[aria-invalid=true]");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      console.info("[MBB] " + form.getAttribute("data-mock") + " submission (mock):", data);
      setStatus(form, form.getAttribute("data-success") || "Thank you!", true);
      form.reset();
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
