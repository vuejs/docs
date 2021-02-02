# Mécanismes de rendu et optimisations

> Cette page n'est pas obligatoire pour apprendre à bien utiliser Vue, mais elle fournit plus d'informations, si vous êtes curieux de savoir comment le rendu fonctionne sous le capot.

## DOM Virtuel

Maintenant que nous savons comment les observateurs mettent à jour les composants, vous pouvez vous demander comment ces modifications parviennent finalement au DOM! Vous avez peut-être déjà entendu parler du DOM virtuel, de nombreux frameworks, y compris Vue, utilisent ce paradigme pour s'assurer que nos interfaces reflètent efficacement les changements que nous mettons à jour dans JavaScript.

<div class="reactivecontent">
  <common-codepen-snippet title="How does the Virtual DOM work?" slug="RwwQapa" tab="result" theme="light" :height="500" :team="false" user="sdras" name="Sarah Drasner" :editable="false" :preview="false" />
</div>

Nous faisons une copie du DOM en JavaScript appelée le DOM virtuel, nous le faisons parce que toucher le DOM avec JavaScript est coûteux en calcul. Bien que l'exécution de mises à jour en JavaScript soit moins couteux, trouver les nœuds du DOM requis et les mettre à jour avec JS est couteux en calcul. Donc, nous groupons les appels et changeons le DOM en même temps.

Le DOM virtuel est un objet JavaScript léger, créé par une fonction de rendu. Il prend trois arguments: l'élément, un objet avec des données, des propriétés, des attrs etc., et un tableau. Le tableau est l'endroit où nous passons les enfants, qui ont également tous ces arguments, et eux aussi peuvent avoir des enfants et ainsi de suite, jusqu'à ce que nous construisions un arbre complet d'éléments.

Si nous devons mettre à jour les éléments de la liste, nous le faisons en JavaScript, en utilisant la réactivité que nous avons mentionnée précédemment. Nous apportons ensuite toutes les modifications à la copie JavaScript, le DOM virtuel, et effectuons une différence entre celui-ci et le DOM réel. Ce n'est qu'alors que nous mettons à jour ce qui a changé. Le DOM virtuel nous permet d'effectuer des mises à jour performantes de nos interfaces utilisateur!
