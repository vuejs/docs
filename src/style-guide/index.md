---
outline: deep
---

# Przewodnik po stylach

:::warning Uwaga
Przewodnik po stylach jest obecnie nieco przestarzały. Większość przykładów dotyczy tylko Options API i nie ma żadnych reguł dotyczących `<script setup>` i Composition API. W przyszłości planujemy to poprawić.
:::

Jeśli używasz Vue w swoim projekcie, jest to świetny punkt odniesienia, który pozwoli Ci uniknąć błędów, bikesheddingu i anty-patternów. Jednak, nie wierzymy, że jakikolwiek przewodnik stylu jest idealny dla wszystkich zespołów lub projektów, dlatego zachęcamy do rozważnych odstępstw w oparciu o wcześniejsze doświadczenia, otaczający stos technologii i osobiste wartości.

W większości przypadków unikamy też sugestii dotyczących JavaScript lub HTML w ogóle. Nie obchodzi nas, czy używasz średników czy przecinków. Nie obchodzi nas, czy w HTML-u używasz pojedynczych czy podwójnych cudzysłowów dla wartości atrybutów. Istnieją jednak pewne wyjątki, w przypadku których stwierdziliśmy, że dany wzorzec jest przydatny w kontekście Vue.

Ostatecznie podzieliliśmy reguły na cztery kategorie:

## Kategorie reguł

### Priorytet A: Podstawowe (Zapobieganie błędom)

Te reguły pomagają zapobiegać błędom, więc naucz się ich i przestrzegaj za wszelką cenę. Wyjątki mogą istnieć, ale powinny być bardzo rzadkie i powinny być stosowane tylko przez osoby posiadające specjalistyczną wiedzę na temat JavaScript i Vue.

- [Zobacz wszystkie reguły priorytetu A](./rules-essential)

### Priorytet B: Silnie zalecane

W większości projektów reguły te poprawiają czytelność i/lub komfort pracy programisty. Jeśli je naruszysz, Twój kod będzie nadal działał, jeśli je naruszysz, ale naruszenia powinny być rzadkie i dobrze uzasadnione.

- [Zobacz wszystkie reguły priorytetu B](./rules-strongly-recommended)

### Priorytet C: Zalecane

Tam, gdzie istnieje wiele równie dobrych opcji, można dokonać arbitralnego wyboru, aby zapewnić spójność. W niniejszych regułach opisujemy każdą dopuszczalną opcję i sugerujemy wybór domyślny. Oznacza to, że możesz swobodnie dokonać innego wyboru we własnej bazie kodu, o ile jesteś konsekwentny i masz dobry powód. Dostosowując się do standardu społeczności, będziesz:

1. Łatwiej przetwarzał większość kodu napisanego przez społeczność,
2. W stanie skopiować i wkleić większość przykładów kodu napisanego przez społeczność bez jego modyfikacji,
3. Szybciej wdrożysz nowo zatrudnione osoby przyzwyczajone do tego stylu pisania kodu.

- [Zobacz wszystkie reguły priorytetu C](./rules-recommended)

### Priorytet D: Do użytku z zachowaniem ostrożności

Niektóre funkcje Vue istnieją po to, aby obsłużyć rzadkie przypadki brzegowe lub ułatwić migrację ze starszej bazy kodu. Jeśli jednak są one nadużywane, mogą utrudnić utrzymanie kodu lub nawet stać się źródłem błędów. Te reguły rzucają światło na potencjalnie ryzykowne funkcje, opisując kiedy i dlaczego należy ich unikać.

- [Zobacz wszystkie reguły priorytetu D](./rules-use-with-caution)
