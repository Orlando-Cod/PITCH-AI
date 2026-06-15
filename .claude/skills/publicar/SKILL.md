---
description: Despliega el proyecto a producción — merge staging→main, push y deploy en Vercel. Activar cuando el usuario diga "publicar", "subir a producción", "prod", "main", "online", "la web", "que los usuarios puedan verlo".
name: Publicar a producción
---

# Skill: Publicar a producción

Cuando el usuario pide publicar o subir a producción, sigue estos pasos **en orden** sin saltarte ninguno.

## Pasos obligatorios

### 1. Verificar que estás en staging
```bash
git branch --show-current
```
Si NO estás en `staging`, detente y avisa al usuario antes de continuar.

### 2. Verificar que TypeScript compila sin errores
```bash
npx tsc --noEmit
```
Si hay errores, corrígelos primero. NO mergees con TypeScript roto.

### 3. Verificar que no hay cambios sin commitear
```bash
git status
```
Si hay cambios sin commitear, pregunta al usuario si quiere commitearlos antes de publicar.

### 4. Merge staging → main
```bash
git checkout main
git merge staging --no-edit
```

### 5. Push a main
```bash
git push origin main
```

### 6. Volver a staging
```bash
git checkout staging
```
**Importante:** Siempre terminar en `staging`. Nunca dejar al usuario en `main`.

### 7. Confirmar el deploy
Informa al usuario:
- Que el push a `main` fue exitoso
- Que Vercel detecta el push automáticamente y desplegará en ~1-2 minutos
- Que puede seguir trabajando en `staging` con normalidad

## Reglas importantes

- **NUNCA** commitear directamente en `main`
- **NUNCA** hacer `git push --force` a main
- Si el merge falla por conflictos, resolverlos en `staging` antes de volver a intentar
- Después del merge, todos los commits nuevos siguen yendo en `staging`

## Qué decirle al usuario al terminar

"✓ Publicado en producción. Vercel desplegará los cambios en aproximadamente 1-2 minutos. Ya estás de vuelta en `staging` para seguir trabajando."
