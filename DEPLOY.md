# 🚀 INSTRUCCIONES DE DESPLIEGUE - BARCELONA DASHBOARD

## ✅ ESTADO ACTUAL

El código está **100% listo** y commitado en:
📁 `/Users/cristiangutierrez/db/barcelona-dashboard-app/`

**Commit realizado:**
- ✅ 69 restaurantes con soporte bilingüe (ES/EN)
- ✅ Traducción completa de todos los elementos
- ✅ Todos los archivos actualizados y listos

---

## 📋 PASOS PARA DESPLEGAR (5 minutos)

### Paso 1: Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name**: `barcelona-dashboard-app`
3. **Description**: `Barcelona travel dashboard with restaurant guide`
4. **Visibility**: Public
5. **NO marques** "Initialize with README" (ya tenemos uno)
6. Click **"Create repository"**

### Paso 2: Conectar y Subir el Código

Después de crear el repo, GitHub te mostrará comandos. Copia y pega estos en tu terminal:

```bash
cd /Users/cristiangutierrez/db/barcelona-dashboard-app

# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/barcelona-dashboard-app.git

# Subir el código
git branch -M main
git push -u origin main
```

### Paso 3: Desplegar en Vercel

1. Ve a: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Selecciona el repositorio `barcelona-dashboard-app` que acabas de crear
4. Click **"Import"**
5. **Framework Preset**: Vite
6. Click **"Deploy"**

¡Listo! Vercel desplegará automáticamente en 1-2 minutos.

---

## 🔗 URLs Finales

Después del despliegue, tu dashboard estará en:
- **Producción**: `https://barcelona-dashboard-app.vercel.app`
- **Dining**: `https://barcelona-dashboard-app.vercel.app/dining`
- **English**: `https://barcelona-dashboard-app.vercel.app/dining?lang=en`

---

## ✨ Cambios Incluidos

### Nuevos Restaurantes (13)
1. Shunka
2. Carlota Akaneya
3. Robata
4. Kamikaze
5. Disfrutar
6. Paradiso
7. Sips
8. Feroz Barcelona
9. Sagardi
10. Come by Paco Méndez
11. Parking Pizza
12. Can Culleretes
13. Casa Leopoldo

### Restaurante Eliminado
- DiverXO

### Total de Restaurantes
- **69 restaurantes** (confirmado)

---

## 🧪 Verificación Post-Despliegue

Una vez desplegado, verifica:

1. ✅ Contador: 69 restaurantes visibles
2. ✅ Español: Todo en español por defecto
3. ✅ Inglés: Click en el globo → todo cambia a inglés
4. ✅ URL param: `?lang=en` carga directamente en inglés

---

## ❓ ¿Problemas?

Si tienes algún error:
1. Verifica que el repositorio se creó correctamente en GitHub
2. Asegúrate de que Vercel detectó el framework como "Vite"
3. Revisa los logs de despliegue en Vercel

---

**Última actualización**: 2026-02-12 02:25  
**Commit hash**: 07aa6b7  
**Archivos listos**: ✅
