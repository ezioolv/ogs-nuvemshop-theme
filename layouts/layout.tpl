<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page_title }}</title>
  {% if page_description %}<meta name="description" content="{{ page_description }}">{% endif %}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,300;0,400;0,600;0,800;0,900;1,400;1,600&family=Archivo+Black&family=Outfit:wght@400;600;800;900&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  {{ 'css/ogs.css' | static_url | css_tag }}
  <script>(function(){try{var s=localStorage.getItem('ogs-theme');if(s==='light'||s==='dark')document.documentElement.setAttribute('data-theme',s)}catch(e){}})();</script>
</head>
<body class="ogs template-{{ template }}">
  {{ back_to_admin }}
  {% include 'snipplets/header.tpl' %}
  <main>{% template_content %}</main>
  {% include 'snipplets/footer.tpl' %}
  {{ 'js/ogs.js' | static_url | script_tag }}
</body>
</html>

