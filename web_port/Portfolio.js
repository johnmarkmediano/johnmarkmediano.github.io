(function () {
        var r = document.documentElement;
  var currentYear = document.querySelector("[data-current-year]");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
  document.querySelectorAll(".driver-track").forEach(function (track) {
    var group = track.querySelector(".driver-group");
    var viewport = track.parentElement;
    var duplicate = group.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    track.appendChild(duplicate);
    viewport.classList.add("is-looping");
  });
        var sidebarToggle = document.querySelector(".side-toggle");
        if (sidebarToggle) {
          var setSidebarCollapsed = function (collapsed) {
            r.setAttribute("data-sidebar", collapsed ? "collapsed" : "expanded");
            sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
            sidebarToggle.setAttribute(
              "aria-label",
              collapsed ? "Expand sidebar" : "Collapse sidebar",
            );
            sidebarToggle.title = collapsed ? "Expand sidebar" : "Collapse sidebar";
            try {
              localStorage.setItem("sidebar-collapsed", String(collapsed));
            } catch (e) {}
          };
          try {
            if (localStorage.getItem("sidebar-collapsed") === "true") {
              setSidebarCollapsed(true);
            }
          } catch (e) {}
          sidebarToggle.addEventListener("click", function () {
            setSidebarCollapsed(
              r.getAttribute("data-sidebar") !== "collapsed",
            );
          });
        }
        try {
          var s = localStorage.getItem("theme");
          if (s) r.setAttribute("data-theme", s);
        } catch (e) {}
        document.querySelectorAll(".themeBtn").forEach(function (b) {
          b.addEventListener("click", function () {
            var dark = r.getAttribute("data-theme")
              ? r.getAttribute("data-theme") === "dark"
              : matchMedia("(prefers-color-scheme: dark)").matches;
            var n = dark ? "light" : "dark";
            r.setAttribute("data-theme", n);
            try {
              localStorage.setItem("theme", n);
            } catch (e) {}
          });
        });
        var motionButtons = document.querySelectorAll(".motion-toggle");
        var motionPaused = false;
        motionButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            motionPaused = !motionPaused;
            document.querySelectorAll(".tl, .mt").forEach(function (viewport) {
              viewport.classList.toggle("motion-paused", motionPaused);
            });
            motionButtons.forEach(function (control) {
              var action = motionPaused ? "Resume" : "Pause";
              control.textContent = action;
              control.setAttribute("aria-pressed", String(motionPaused));
              control.setAttribute(
                "aria-label",
                action + " daily drivers animation",
              );
            });
          });
        });
        var lastHomePress = 0;
        document.querySelectorAll('a[href="#home"]').forEach(function (a) {
          a.addEventListener("click", function (event) {
            var now = Date.now();
            if (now - lastHomePress < 650) {
              event.preventDefault();
              location.reload();
              return;
            }
            lastHomePress = now;
            event.preventDefault();
            window.history.replaceState(window.history.state, "", "#home");
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            });
          });
        });
        var navLinks = document.querySelectorAll("nav.menu a, nav.bar a");
        var sections = [
          { id: "home", element: document.querySelector(".top") },
          { id: "about", element: document.getElementById("about") },
          { id: "services", element: document.getElementById("services") },
          { id: "projects" },
          {
            id: "credentials",
            element: document.getElementById("credentials"),
          },
          { id: "showcase", element: document.getElementById("showcase") },
          { id: "contact", element: document.getElementById("contact") },
        ];
        var updateNavigation = function () {
          var marker = window.innerHeight * 0.35;
          var activeId = "home";
          sections.forEach(function (section) {
            var element =
              section.id === "projects"
                ? document.getElementById(
                    matchMedia("(max-width: 860px)").matches
                      ? "projects-m"
                      : "projects",
                  )
                : section.element;
            if (
              element &&
              element.getClientRects().length &&
              element.getBoundingClientRect().top <= marker
            ) {
              activeId = section.id;
            }
          });
          if (
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 80
          ) {
            activeId = "contact";
          }
          navLinks.forEach(function (link) {
            var targetId = link.getAttribute("href").slice(1);
            var current =
              targetId === activeId ||
              (targetId === "projects-m" &&
                (activeId === "projects" || activeId === "credentials"));
            link.classList.toggle("on", current);
            if (current) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        };
        window.addEventListener("scroll", updateNavigation, { passive: true });
        window.addEventListener("resize", updateNavigation);
        updateNavigation();
      })();
