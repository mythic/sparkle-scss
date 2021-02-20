<!doctype html>
{% set project_title = "SassDoc" %}

{% if package.name %}
  {% set project_title = package.name %}
{% endif %}

{% if package.title %}
  {% set project_title = package.title %}
{% endif %}

<html lang="en">
<head>
  {# Include head content #}
  {% include "../includes/partials/head.html.swig" %}
</head>
<body>
  {# Sidebar #}
  <aside class="sidebar" role="nav">
    {% block sidebar %}{% endblock %}
  </aside>

  {# Main container #}
  <article class="main" role="main">

    {# Include top navbar #}
    {% include "../includes/partials/header.html.swig" %}

    {# Include description #}
    {% include "../includes/partials/description.html.swig" %}

    {# Main content block #}
    {% block content %}{% endblock %}

    {# Include footer #}
    {% include "../includes/partials/footer.html.swig" %}
  </article>


  {# Include scripts #}
  {% include "../includes/partials/scripts.html.swig" %}
</body>
</html>
