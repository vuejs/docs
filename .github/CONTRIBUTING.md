# Porady pracy z polskim tłumaczeniem dokumentacji Vue.js

## Jak wnieść swój wkład?

### Aktualizowanie polskiej dokumentacji

W przypadku aktualizacji polskiej dokumentacji o zmiany pojawiające się na branchu `main` repozytorium głównego, w repozytorium polskiego tłumaczenia automatycznie będą pojawiać się adekwatne issues dzięki workflow narzędzia Ryu Cho.

1. Issues możemy znaleźć w następującym miejscu: https://github.com/monterail/vue3-docs-pl/issues
2. Szukamy nieprzydzielonego do nikogo issue i deklarujemy chęć pracy, najlepiej komentarzem (np. "Hej, chciałbym zająć się tym issue :)"). Opiekunowie repozytorium mogą przydzielić się sami używając funkcji `assign yourself`, w innym wypadku po zobaczeniu Twojego komentarza, któryś z opiekunów przydzieli Tobie issue.
3. Utwórz fork tego repozytorium, zapoznaj się z `README.md` oraz odpowiednimi poradnikami.
4. Utwórz feature branch odbijając się od brancha `main` (np. `git branch my-branch main`).
5. Utwórz commit z ze zmianami (np. `git commit -am 'docs: fix typo'`).
6. Wypchnij zmiany do swojego forka (np. `git push origin my-branch`).
7. Utwórz pull request aby dodać zmiany ze swojego brancha do brancha main tego repozytorium. Warto zawrzeć w nim tekst `resolve #123` (gdzie 123 to numer odpowiedniego issue) - w ten sposób pull request zostanie podlinkowany do issue.
8. W przypadku uwag podczas code review - zaadresuj je i poproś o ponowne review. Upewnij się, że zaadresowano wszystkie komentarze/uwagi.
9. Jeśli wszystko jest, otrzymasz zielone światło, a Twoje zmiany zostaną zmerge'owane do repozytorium :tada:

### Wskazywanie poprawek/literówek

1. Utwórz nowy issue w repozytorium opisujący problem.
2. Jeśli to możliwe warto wskazać link i/lub plik źródłowy w którym występuje błąd.
3. Jeśli chcesz również naprawić wskazany problem - dodaj stosowny komentarz i podąrzaj krokami powyżej. Opiekunowie repozytorium przydzielą Tobie utworzony przez Ciebie issue.

## Styl i sposób tłumaczeń

### Terminologia i słownictwo

* Nie tłumaczymy terminów "na siłę" na język polski - terminy takie jak `composables` są jak najbardziej OK do zostawienia w języku angielskim i będą brzmiały naturalnie

## Inne

### Nie dodawaj ani nie usuwaj linii

Utrzymanie jednolitej ilości linii i numerów wierszy ułatwia aktualizowanie polskiego tłumaczenia o zmiany zachodzące w oryginalnym tekście po angielsku.
Prosimy więc nie dodawać nowych linii i nie usuwać pustych linii w plikach.

Oryginalny tekst:

```text
Vue is a mature and battle-tested framework. It is one of the most widely used JavaScript frameworks ...

Vue is used in production by renowned organizations in varying capacities all around the world, including ...
```

Źle, nowe zdanie w nowej linii ❌

```text
Vue to dojrzały i sprawdzony w boju framework.
Jest to jeden z najbardziej popularnych frameworków JavaScript ...

Vue jest używany produkcyjnie róznym stopniu na całym świecie przez wiele różnych organizacji, wliczając ...
```


Źle, usunięta pusta linia ❌

```text
Vue to dojrzały i sprawdzony w boju framework. Jest to jeden z najbardziej popularnych frameworków JavaScript...
Vue jest używany produkcyjnie róznym stopniu na całym świecie przez wiele różnych organizacji, wliczając ...
```


OK, linie pozostawione bez zmian ✔️

```text
Vue to dojrzały i sprawdzony w boju framework. Jest to jeden z najbardziej popularnych frameworków JavaScript...

Vue jest używany produkcyjnie róznym stopniu na całym świecie przez wiele różnych organizacji, wliczając ...
```
