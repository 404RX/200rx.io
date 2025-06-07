<<<<<<< HEAD
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
+++
=======
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---

>>>>>>> main
