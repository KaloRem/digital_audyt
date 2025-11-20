// const main = document.getElementById("content");

// // Prosty cache pobranych fragmentów
// const fragmentCache = new Map();

// // Dozwolone routy - mapa klucz -> plik w src/html
// const routes = {
//   home: "home.html",
//   brief: "brief.html",
//   etap_i: "etap_i.html",
//   etap_ii: "etap_ii.html",
//   etap_iii: "etap_iii.html",
//   etap_iv: "etap_iv.html",
// };

// async function loadPage(file) {
//   try {
//     // walidacja: czy mamy taki plik w routach
//     const key = file.replace(/\.html$/i, "");
//     if (!routes[key]) {
//       console.warn(`Unknown route requested: ${file}`);
//       main.innerHTML = "<p>Nieznana strona.</p>";
//       return;
//     }

//     if (fragmentCache.has(file)) {
//       main.innerHTML = fragmentCache.get(file);
//       return;
//     }

//     const res = await fetch(`/html/${file}`);
//     if (!res.ok) {
//       console.warn(
//         `Fetch failed ${res.status} ${res.statusText} for /html/${file}`
//       );
//       throw new Error(`HTTP ${res.status}`);
//     }

//     const text = await res.text();

//     // Guard: jeśli serwer zwróci pełny dokument HTML (index.html), nie wstawiaj go do main
//     if (/<!doctype\s+html/i.test(text) || /<\s*html/i.test(text)) {
//       console.error(
//         "Server returned full document instead of fragment for",
//         file
//       );
//       main.innerHTML =
//         "<p>Nie udało się wczytać strony (server returned full document).</p>";
//       return;
//     }

//     fragmentCache.set(file, text);
//     main.innerHTML = text;
//   } catch (err) {
//     main.innerHTML = "<p>Nie udało się wczytać strony.</p>";
//     console.error("loadPage error:", err);
//   }
// }

// // Event delegation: nasłuch na document i obsługa kliknięć dla a[data-page]
// document.addEventListener("click", (e) => {
//   const a = e.target.closest && e.target.closest("a[data-page]");
//   if (!a) return;
//   e.preventDefault();
//   const pageKey = a.dataset.page;
//   if (!pageKey) return;
//   const file = `${pageKey}.html`;
//   loadPage(file);
//   history.pushState({ page: file }, "", `/${pageKey}`);
// });

// // Obsługa przycisków wstecz/dalej w przeglądarce
// window.addEventListener("popstate", (e) => {
//   if (e.state && e.state.page) {
//     loadPage(e.state.page);
//   } else {
//     // jeśli nie ma stanu, spróbuj wczytać stronę z URL (np. /etap_i)
//     // usuń prowadzące slash i ewentualne rozszerzenie .html
//     let p = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
//     p = p.replace(/\.html$/i, "");
//     if (p) {
//       const file = `${p}.html`;
//       loadPage(file);
//       history.replaceState({ page: file }, "", `/${p}`);
//     } else {
//       loadPage("home.html"); // domyślna strona
//       history.replaceState({ page: "home.html" }, "", "/");
//     }
//   }
// });

// // Start - jeśli użytkownik wszedł bezpośrednio na /etap_i, wczytaj odpowiedni fragment
// (() => {
//   let p = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
//   p = p.replace(/\.html$/i, "");
//   if (p) {
//     const file = `${p}.html`;
//     loadPage(file);
//     // ustaw pushState żeby mieć spójny stan historii
//     history.replaceState({ page: file }, "", `/${p}`);
//   } else {
//     loadPage("home.html");
//     history.replaceState({ page: "home.html" }, "", "/");
//   }
// })();
